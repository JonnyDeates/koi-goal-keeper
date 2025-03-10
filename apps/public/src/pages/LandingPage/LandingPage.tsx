import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import {Button} from "koi-pool";
import {Title} from "@repo/shared";
import TextAnimation from "./components/TextAnimation/TextAnimation";
import HorizontalSlide from "./components/HorizontalSlide/HorizontalSlide";

function LandingPage() {

    const PERCENTILE = '92%';
    const PERCENTILE_TEXT = "of Goals Go Unfinished";
    const PERCENTILE__SOLUTION_TEXT = "We're the solution to fix that.";

    const [scrolledAmount, setScrolledAmount] = useState(0);

    useEffect(() => {
        addEventListener("scroll", (e) => {
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
                    <Button variant="accept">
                        Get Started Today
                    </Button>
                </Link>

            </div>
        </div>
        <div className={"ParallaxHorizontalSection"}>
            <div className={"ParallaxHorizontal"}>
                <HorizontalSlide bufferAmount={200} scrolledAmount={scrolledAmount} startAmount={150}>
                    <div className={"ParallaxHeader"}>
                        <h1>
                            Our Mission
                        </h1>
                    </div>
                </HorizontalSlide>
                <HorizontalSlide bufferAmount={75} scrolledAmount={scrolledAmount} startAmount={200}>
                    <h3>
                        Stop struggling with vague deadlines and procrastination. The Koi Goal Keeper makes achieving
                        your goals
                        simple with actionable due dates set for you - today, tomorrow, next week, and beyond.
                        Each goal is a stepping stone, with vast functionality jam-packed into it.
                    </h3>
                </HorizontalSlide>
                <HorizontalSlide bufferAmount={125} scrolledAmount={scrolledAmount} startAmount={400}>
                    <div style={{margin: "10rem 0 0 1rem"}}>
                        <h3>
                            - Growth
                        </h3>
                        <h3>
                            - Determination
                        </h3>
                        <h3>
                            - Perseverance
                        </h3>
                        <h3>
                            - Dedication
                        </h3>
                    </div>
                </HorizontalSlide>
                <HorizontalSlide bufferAmount={75} scrolledAmount={scrolledAmount} startAmount={450}>
                    <h1>
                        Our Values
                    </h1>
                </HorizontalSlide>
                <HorizontalSlide bufferAmount={300} scrolledAmount={scrolledAmount} startAmount={700}>
                    <div>
                        <h1 style={{textAlign: 'center'}}>
                            TAKE ACTION TODAY!
                        </h1>
                        <div style={{top: '70px', position: 'relative', display: "flex", justifyContent: 'center'}}>
                            <Link to='/sign-up'>
                                <Button>Sign Up</Button>
                            </Link>
                            <Link to='/login'>
                                <Button>Log In</Button>
                            </Link>
                        </div>
                    </div>

                </HorizontalSlide>
            </div>

        </div>

    </main>;
}

export default LandingPage;