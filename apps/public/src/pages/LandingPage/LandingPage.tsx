import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import {Button} from "koi-pool";
import {Title} from "@repo/shared";
import TextAnimation from "./components/TextAnimation/TextAnimation";
import {Parallax} from "react-scroll-parallax";
import HorizontalSlide from "./components/HorizontalSlide/HorizontalSlide";

function LandingPage() {

  const PERCENTILE = '92%';
  const PERCENTILE_TEXT = "of Goals Go Unfinished";
  const PERCENTILE__SOLUTION_TEXT = "We're the solution to fix that.";

  const [scrolledAmount, setScrolledAmount] = useState(0);

  useEffect(()=>{
    addEventListener("scroll", (e)=> {
      const scrollAmount = window.scrollY;
      setScrolledAmount(scrollAmount);
    });
  }, []);

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
    <div className={"ParallaxHorizontalSection"}>
      <div className={"ParallaxHorizontal"} >
        <HorizontalSlide bufferAmount={200} scrolledAmount={scrolledAmount} startAmount={150}>
          <div className={"ParallaxHeader"}>
            <h1>
              Our Mission
            </h1>
          </div>
        </HorizontalSlide>
        <HorizontalSlide bufferAmount={75} scrolledAmount={scrolledAmount} startAmount={200}>
            <h3>
              Stop struggling with vague deadlines and procrastination. The Koi Goal Keeper makes achieving your goals
              simple with actionable due dates set for you - today, tomorrow, next week, and beyond.
              Each goal is a stepping stone, with vast functionality jam-packed into it.
            </h3>
        </HorizontalSlide>
        <HorizontalSlide bufferAmount={200} scrolledAmount={scrolledAmount} startAmount={400}>
            <h3>

            </h3>
        </HorizontalSlide>
        <HorizontalSlide bufferAmount={75} scrolledAmount={scrolledAmount} startAmount={450}>
            <h1>
              Our Value
            </h1>
        </HorizontalSlide>
        <HorizontalSlide bufferAmount={200} scrolledAmount={scrolledAmount} startAmount={850}>
            <h3>
              Stop struggling with vague deadlines and procrastination. The Koi Goal Keeper makes achieving your goals
              simple with actionable due dates set for you - today, tomorrow, next week, and beyond.
              Each goal is a stepping stone, with vast functionality jam-packed into it.
            </h3>
        </HorizontalSlide>
        </div>

      </div>


    {/*  <div className={"ParallaxHorizontalSection"}>*/}

    {/*  <ParallaxBanner style={{aspectRatio: "4 / 3"}} className={"ParallaxHorizontal"}>*/}
    {/*    <ParallaxBannerLayer className={""} translateX={['-100%', '0%']} translateY={[30, 30]}>*/}
    {/*      <h1 style={{*/}
    {/*        fontSize: "4rem",*/}
    {/*        color: "white",*/}
    {/*        display: 'flex',*/}
    {/*        textWrap: 'no-wrap',*/}
    {/*        textShadow: "1px 0px black, -1px 0px black, 0px 1px black, 0px -1px black"*/}
    {/*      }}*/}
    {/*          className={"ParallaxHeader"}*/}
    {/*      >*/}
    {/*        Test*/}
    {/*      </h1>*/}
    {/*    </ParallaxBannerLayer>*/}
    {/*  </ParallaxBanner>*/}
    {/*</div>*/}

    {/*<div className={'ParallaxSection'}>*/}
    {/*  <div className={'ParallaxThird'}>*/}
    {/*    <h1>*/}
    {/*      */}
    {/*    </h1>*/}
    {/*  </div>*/}
    {/*  <div className={"ParallaxTwoThirds"}>*/}

    {/*  </div>*/}
    {/*</div>*/}

    {/*<div className={'ParallaxSection'}>*/}
    {/*  "Intelligent goal scheduling to keep you on track."*/}
    {/*  "Achievable timeframes: from tomorrow to a year and beyond."*/}
    {/*  "A proven system to help you finally reach your dreams."*/}
    {/*</div>*/}

    {/*<div className={'ParallaxSection'}>*/}
    {/*  <div className={"ParallaxTwoThirds"}>*/}
    {/*    <ParallaxBanner style={{aspectRatio: "16 / 9"}}>*/}
    {/*      <ParallaxBannerLayer image={yinYang as string} speed={-20}>*/}
    {/*        <h1 style={{top: "50%", display: "block", color: 'red', position: "absolute", fontSize: "4rem"}}>*/}
    {/*          Our Mission*/}

    {/*        </h1>*/}
    {/*      </ParallaxBannerLayer>*/}
    {/*    </ParallaxBanner>*/}
    {/*  </div>*/}
    {/*  <div className={'ParallaxThird'}>*/}
    {/*    <h1>*/}
    {/*      Stop struggling with vague deadlines and procrastination. The Koi Goal Keeper makes achieving your goals*/}
    {/*      simple with actionable due dates set for you - today, tomorrow, next week, and beyond.*/}
    {/*      Each goal is a stepping stone, with vast functionality jam-packed into it.*/}
    {/*    </h1>*/}
    {/*  </div>*/}
    {/*</div>*/}
  </main>;
}

export default LandingPage;