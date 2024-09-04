import { Link } from "react-router-dom";
// @ts-ignore
import KoiGoalKeeperIcon from "./placeholder-image.webp";
import React from "react";
import "./Title.css";

export const Title = () => <Link className={"Title"} to={"/"}>
  <img src={KoiGoalKeeperIcon} alt={"Koi Goal Keeper Icon"} />
  <h1>Koi Goal Keeper</h1>
</Link>;
