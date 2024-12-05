import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import {Button} from "koi-pool";
import {Title} from "@repo/shared";
import TextAnimation from "./components/TextAnimation/TextAnimation";
import {ParallaxBanner, ParallaxBannerLayer} from "react-scroll-parallax";
import yinYang from './assets/YinYangBg.webp'
function LandingPage() {

  const PERCENTILE = '92%';
  const PERCENTILE_TEXT = "of Goals Go Unfinished";
  const PERCENTILE__SOLUTION_TEXT = "We're the solution to fix that.";

  return <main className="Login LandingPage">

    <div className={'LoginContent'}>
      <Title/>
      <div className={"PercentileWrapper"}>
        <h1 className={'Percentile'}>
          {PERCENTILE}
        </h1>
        <TextAnimation textToAnimate={PERCENTILE_TEXT} delayInSeconds={1} className={'PercentileMeaning'}/>
        <TextAnimation textToAnimate={PERCENTILE__SOLUTION_TEXT} delayInSeconds={PERCENTILE_TEXT.length * .05}/>
        <h2 className={'PercentileFix'}>
        </h2>
      </div>
      <div className="LandingPageButtons">
        <Link to="/sign-up">
          <Button style={{width: '120px'}} variant="accept">
            Get Started Today
          </Button>
        </Link>

      </div>
    </div>
    <div className={'ParallaxSection'}>
      <div className={'ParallaxHalf'}>
        <h1>
          W
        </h1>
      </div>
      <div className={"ParallaxHalf"}>
        <ParallaxBanner style={{aspectRatio: "16 / 9"}}>
          <ParallaxBannerLayer image={yinYang as string} speed={-20} />
        </ParallaxBanner>
      </div>
    </div>

  </main>;
}

export default LandingPage;