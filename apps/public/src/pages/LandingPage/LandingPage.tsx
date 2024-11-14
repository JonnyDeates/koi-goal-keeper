import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import {Button} from "koi-pool";
import {Title} from "@repo/shared";

function LandingPage() {

  return <main className="Login">
    <div className={'LoginContent'}>
      <Title/>
      <div>
        <h2>
          Do you want to maximize your future?
        </h2>
        <h2>
          Do you have goals you need to plan out?
        </h2>
        <h2>
          Do you have a desire for growth?

        </h2>
      </div>

      <div className="LandingPageButtons">
        <Link to="/sign-up">
          <Button style={{width: '120px'}} variant="accept">
            Sign Up
          </Button>
        </Link>
        <Link to="/login">
          <Button style={{width: '120px'}} variant="accept">
            Login
          </Button>
        </Link>
      </div>
    </div>

  </main>;
}

export default LandingPage;