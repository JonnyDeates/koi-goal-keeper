
import express from "express";
import usersService from "./usersService";
import {isPasswordValid} from "../authentication/AuthValidator";
import Bcrypt from "../utils/bcrypt/Bcrypt";
import {SessionData} from "@repo/types";
import validKeysInRequest from "../utils/validKeysInRequest/validKeysInRequest";
import {requireUserLoggedIn} from "./UserValidator";

const usersController = express.Router();

usersController
  .all("/", requireUserLoggedIn)
  .get("", (req, res) => {
      const user = req.session.user as SessionData;
      res.status(200).send(user);
    }
  )
  .delete("", async (req, res) => {
      const { id } = req.session.user as SessionData;

      await usersService.remove(req, id);
      return res.status(204).end();
    }
  )
  .patch('', validKeysInRequest('name'), (req, res, next) => {
    const { name } = req.body;
    const { id } = req.session.user as SessionData;


    usersService.setNameOnUser(req, id, name)
      .then(() => res.status(204).end())
      .catch(next);
  })
  .patch("/password", validKeysInRequest('password', 'oldPassword'), isPasswordValid, async (req, res) => {
    const { oldPassword, password } = req.body;
    const { id } = req.session.user as SessionData;

    const foundUser = await usersService.findUserById(req, id);
    if (!foundUser) {
      return res.status(404).json({ error: "No User Found" });
    }

    const passwordComparison = Bcrypt.compare(foundUser.password, oldPassword);
    if (!passwordComparison) {
      res.status(400).json({ error: "Invalid previous password." });
    }
    await usersService.setPasswordOnUser(req, id, password);

    return res.status(201).json("Password Updated");
  });
export default usersController;
