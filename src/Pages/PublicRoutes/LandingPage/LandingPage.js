import React, {useState} from "react";
import {ParallaxBanner} from "react-scroll-parallax/cjs";
import {ParallaxProvider} from "react-scroll-parallax";
import Yin from "../../../assets/banner/Yin.png"
import Yang from "../../../assets/banner/Yang.png"
import compImpr from "../../../assets/images/compoundingImprovements.png"
import {Link} from "react-router-dom";
import Footer from "./Footer/Footer"
import LandingPageSection from "./LandingPageSection/LandingPageSection";
import MeetTheDeveloper from "./MeetTheDeveloper/MeetTheDeveloper";
import TrackVisibility from "../../../Utils/TrackVisibility";
import Feedback from "./Feedback/Feedback";
import "./LandingPage.css";

const LandingPage = () => {
    const [animateTopSection, setAnimateTopSection] = useState(false);
    const [animatePageContent, setAnimatePageContent] = useState(false);
    const [animateCallToAction, setAnimateCallToAction] = useState(false);
    const [animateMeetTheDeveloper, setAnimateMeetTheDeveloper] = useState(false);
    const topSection = {
        header: 'What is it?',
        description: ['A minimalistic easy to use daily tool for goal tracking, creating, and achieving. \n' +
        'The pursuit of a better self is achieved through your daily activities, to maximize this potential, \n' +
        'the use of a daily goal checklist is important! That’s the need this fills.  ', 'The Koi Goal Keeper app is a tool derived for growth. Being able to plan out your day to \n ' +
        'day, is vastly important for maintaining consistent personal growth. Each day is an opportunity, \n' +
        'the best way to attain the most of that opportunity is to know the priorities for that day. \n' +
        'Deadlines will be met, and growth will prosper. The solution is simple but time-tested. Plan \n' +
        'Your Days. The Koi Goal Keeper app is the tool you need to do just that. The quick and easy \n' +
        'solution to planning each day, and following through to your eventual goals. It allows for easy \n' +
        'goal creation, tracking and archiving.']
    };

    const pageContent = {
        header: 'Plan of Success',
        description: ['The idea of the app is for quick access to the priority checklist for your life, and \n' +
        'the perpetual creation of that list. To maintain a good timeline and to plan quickly and accordingly \n' +
        'the app must be used daily. When is the best time to start planning your days? Today, that’s when. \n' +
        'Everyday you are not moving forward you are taking steps backward in your life. This is shown through \n' +
        'simple math: ', '1% Better Every Day for 1 Year. 1.01 ^ (365) = 37.78',
            '1% Worse Every Day for 1 Year. 0.99 ^ (365) = 00.03', 'So the best time to make the difference you \n' +
            'need to make is Today. Eventual Success and meeting of \n' +
            'your goals will become a normal occurrence, so change your life starting today!'],
        image: compImpr,
        imageDesc: 'The effects of even the smallest habits compound over time. For example, if you get just 1\n' +
            ' percent better each day, you’ll end up with results that are nearly 37 times better after a single year.'
    };

    const callToAction = {
        header: 'You Deserve Goals!',
        description: ['The Koi Goal Keeper is an app meant for those serious about changing their Lives.',
            'We each have limitless potential and can achieve anything we set our minds too.',
            'Tracking your goals is necessary part towards staying on track to becoming your best self.'],
    }
    return <main className={'landing-page-wrapper'}>
        <div className={'landing-page'}>
            <ParallaxProvider>
                <nav>
                    <Link to={'/sign-up'}>Sign Up</Link>
                    <Link to={'/login'}>LogIn</Link>
                </nav>
                <ParallaxBanner layers={[{image: Yin, amount: 0.3}, {image: Yang, amount: 0.1}]}
                                style={{backgroundColor: '#7bc9ff'}}>
                    <h1>The Koi Goal Keeper</h1>
                    <iframe src="https://www.youtube.com/embed/N_O9w0blhlw" frameBorder="0" title={'The Koi Goal Keeper'} allowFullScreen/>
                    <div className="page-wrapper">
                        <TrackVisibility onVisible={() => setAnimateTopSection(true)}>
                            <LandingPageSection header={topSection.header} style={{backgroundColor: '#d10300aa'}}
                                                animationRun={animateTopSection} indexes={[6, 7, 8, 10, 12, 13]}
                                                fishCount={3}
                                                description={topSection.description}/>
                        </TrackVisibility>
                        <TrackVisibility onVisible={() => setAnimatePageContent(true)}>
                            <LandingPageSection header={pageContent.header} description={pageContent.description}
                                                image={pageContent.image} imageDesc={pageContent.imageDesc}
                                                style={{backgroundColor: '#e2b521aa'}}
                                                indexes={[1, 3, 4, 5, 10, 11, 13]} fishCount={6}
                                                animationRun={animatePageContent}/>
                        </TrackVisibility>
                        <TrackVisibility onVisible={() => setAnimateCallToAction(true)}>
                            <LandingPageSection
                                header={callToAction.header}
                                description={callToAction.description}
                                image={callToAction.image}
                                imageDesc={callToAction.imageDesc}
                                style={{backgroundColor: '#84adeaaa'}} indexes={[0, 2, 9]} fishCount={3}
                                animationRun={animateCallToAction}/>
                        </TrackVisibility>
                        <TrackVisibility onVisible={() => setAnimateMeetTheDeveloper(true)}>
                            <MeetTheDeveloper animation={animateMeetTheDeveloper}
                                              style={{backgroundColor: '#0cc61faa'}}/>
                        </TrackVisibility>
                    </div>
                </ParallaxBanner>
                <Feedback/>
            </ParallaxProvider>
        </div>
        <Footer/>
    </main>
}

export default LandingPage;
