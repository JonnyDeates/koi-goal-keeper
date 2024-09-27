import { Link } from "react-router-dom";
import React from "react";
import KoiGoalKeeperIcon from "./placeholder-image.webp";
import "./Title.css";

export function Title() {
  return <Link className="Title" to="/">
  <img src={KoiGoalKeeperIcon as string} alt="Koi Goal Keeper Icon" />
  <h1>Koi Goal Keeper</h1>
</Link>;
}
