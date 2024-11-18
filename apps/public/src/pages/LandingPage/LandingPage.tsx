import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import {Button} from "koi-pool";
import {Title} from "@repo/shared";
import TextAnimation from "./components/TextAnimation/TextAnimation";

function LandingPage() {

  const PERCENTILE = '92%';
  const PERCENTILE_TEXT = "of people who attempt their goals fail to meet them.";

  return <main className="Login LandingPage">

    <div className={'LoginContent'}>
      <Title/>
      <div className={"PercentileWrapper"}>
        <h1 className={'Percentile'}>
          {PERCENTILE}
        </h1>
        <TextAnimation textToAnimate={PERCENTILE_TEXT} delayInSeconds={1} className={'PercentileMeaning'}/>
        <TextAnimation textToAnimate={"We're the solution to fix that."} delayInSeconds={PERCENTILE_TEXT.length * .05}/>
        <h2 className={'PercentileFix'}>
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