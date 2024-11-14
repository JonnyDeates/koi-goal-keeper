import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import {Button} from "koi-pool";
import {Title} from "@repo/shared";

function LandingPage() {

  return <main className="Login">
    <div className={'LoginContent'}>
      <Title/>
      <div className="LandingPageButtons">
        <Link to="/login">
          <Button variant="accept">
            Login
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button variant="accept">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>

  </main>;
}

export default LandingPage;