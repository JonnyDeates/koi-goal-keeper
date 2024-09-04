import React from "react";
import { Link } from "react-router-dom";
import KoiCoinIcon from "../../assets/icons/koicoin.svg";
import "./LandingPage.css";

const LandingPage = () => {

  const gotoFeedback = (e) => {
    e.preventDefault();
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSfLpDme3gULGas2KYeIbHM3Dqi82q28mh8tbI-Wn7M5iNi-zg/viewform?usp=sf_link");
  };

  return <main className={"content LandingPage"}>
    <div className={"header"}>
      <img src={KoiCoinIcon} alt={"Koi Coin Icon"} />
      <h1>Koi Coin Beta</h1>
    </div>
    <div className={'links'}>
      <Link to={"/login"}>Login</Link>
      <Link to={"/sign-up"}>Sign Up</Link>
    </div>
    <br />
    <div className="card">
    </div> 
      <h5 className={"description"}>
      THE calculator to help the causal figure out their priorities. User-centered design, with an ease to use, and
      minimalistic feel.
    </h5>
    <h2>Thank you for participating</h2>
  </main>;
};
export default LandingPage;