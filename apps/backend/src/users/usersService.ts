import { type Request } from "express";
import { type User } from "@repo/types";
import Database from "../utils/database/Database";
import Bcrypt from "../utils/bcrypt/Bcrypt";
import usersRepo from "./usersRepo";

const usersService = {
  createUser: async (req: Request, password: string, email: string, name: string): Promise<Omit<User, "password" | "createdAt" | "updatedAt">> => {
    const database = Database.get(req);

    // Hashes the password
    const hashedPassword = await Bcrypt.hash(password);

    // Creates the new User
    const newUser: Omit<User,'id'> = {
      password: hashedPassword,
      email,
      name,
      paid_account: "basic"
    };

    return await usersRepo.save(database, newUser);
  },
  hasUserWithEmail: async (req: Request, email: string): Promise<boolean> => {
    const database = Database.get(req);

    return await usersRepo.hasUserWithEmail(database, email);
  },
  findUserByEmail: async (req: Request, email: string): Promise<User | undefined> => {
    const database = Database.get(req);

    return await usersRepo.findUserByEmail(database, email);
  },
  findUserById: async (req: Request, id: number): Promise<User | undefined> => {
    const database = Database.get(req);

    return await usersRepo.findUserById(database, id);
  },
  setNameOnUser: async (req: Request, id: number, name: string) => {
    const database = Database.get(req);

    await usersRepo.updateUser(database, id, { name });
  },
  setPasswordOnUser: async (req: Request, id: number, password: string) => {
    const database = Database.get(req);

    const hashedPassword = await Bcrypt.hash(password);

    await usersRepo.updateUser(database, id, { password: hashedPassword, token_expires: null, token: null});
  },
  setTokenOnUser: async (req: Request, id: number, token: string) => {
    const database = Database.get(req);

    const tokenExpires = new Date();
    tokenExpires.setMinutes(tokenExpires.getMinutes() + 15 );

    await usersRepo.updateUser(database, id, { token, token_expires: tokenExpires});
  },
  remove: async (req: Request, id: number) => {
    const database = Database.get(req);

    await usersRepo.deleteUser(database, id);
  }
};
export default usersService;