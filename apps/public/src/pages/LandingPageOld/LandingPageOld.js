import React, {Component} from "react";
import {ParallaxBanner} from "react-scroll-parallax/cjs";
import {ParallaxProvider} from "react-scroll-parallax";
import "./LandingPageOld.css";
import Yin from "../../assets/banner/Yin.png"
import Yang from "../../assets/banner/Yang.png"
import addPage from "../../assets/images/koigoalkeeper-addpagev2.png"
import homePage from "../../assets/images/koigoalkeeper-hompagev2.png"
import homePageUC from "../../assets/images/koigoalkeeper-hompage-ultra-compactedv2.png"
import phoneAddPage from "../../assets/images/koigoalkeeper-phone-addpagev2.png"
import settingsPage from "../../assets/images/koigoalkeeper-settingsv2.png"
import compImpr from "../../assets/images/compoundingImprovements.png"
import {Link} from "react-router-dom";
import Footer from "./Footer/Footer"
import LandingPageSection from "./LandingPageSection/LandingPageSection";
import MeetTheDeveloper from "./MeetTheDeveloper/MeetTheDeveloper";
import TrackVisibility from "../../Utils/TrackVisibility";
import Feedback from "./Feedback/Feedback";

class LandingPageOld extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageCoursel: [{img: addPage, alt: 'Add Page'}, {img: homePage, alt: 'Home Page'}, {
                img: homePageUC,
                alt: 'Home Page Ultra Compacted'
            }, {img: phoneAddPage, alt: 'Phone Add Page'}, {img: settingsPage, alt: 'Settings Page'}],
            title: 'The Koi Goal Keeper',
            runAnimation: false,
            topSection: {
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
            },
            pageData: {
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
            },
            callToAction: {
                header: 'You Deserve Goals!',
                description: ['The Koi Goal Keeper is an app meant for those serious about changing their Lives.',
                    'We each have limitless potential and can achieve anything we set our minds too.',
                    'Tracking your goals is necessary part towards staying on track to becoming your best self.'],
            }
        }
    }


    render() {
        return (
            <main className={'landing-page-wrapper'}>
                <div className={'landing-page'}>
                    <ParallaxProvider>
                        <nav><Link to={'/register'}>Register</Link><Link to={'/login'}>LogIn</Link></nav>
                        <ParallaxBanner layers={[
                            {image: Yin, amount: 0.3},
                            {image: Yang, amount: 0.1}
                        ]}
                                        style={{backgroundColor: '#7bc9ff'}}>
                            <h1>{this.state.title}</h1>
                            <iframe src="https://www.youtube.com/embed/N_O9w0blhlw"
                                    frameBorder="0" title={'The Koi Goal Keeper'}
                                    allowFullScreen/>
                            <div className="page-wrapper">
                                <TrackVisibility onVisible={() => this.setState({animationRun: true})}>
                                    <LandingPageSection header={this.state.topSection.header}
                                                        style={{backgroundColor: '#d10300aa'}}
                                                        animationRun={this.state.animationRun}
                                                        indexes={[6, 7, 8, 10, 12, 13]} fishCount={3}
                                                        description={this.state.topSection.description}/>
                                </TrackVisibility>
                                <TrackVisibility
                                    onVisible={() => this.setState({animationSection: true})}><LandingPageSection
                                    header={this.state.pageData.header} description={this.state.pageData.description}
                                    image={this.state.pageData.image} imageDesc={this.state.pageData.imageDesc}
                                    style={{backgroundColor: '#e2b521aa'}} indexes={[1, 3, 4, 5, 10, 11, 13]}
                                    fishCount={6}
                                    animationRun={this.state.animationSection}/>
                                </TrackVisibility>
                                <TrackVisibility
                                    onVisible={() => this.setState({animationSection2: true})}>
                                    <LandingPageSection
                                        header={this.state.callToAction.header}
                                        description={this.state.callToAction.description}
                                        image={this.state.callToAction.image}
                                        imageDesc={this.state.callToAction.imageDesc}
                                        style={{backgroundColor: '#84adeaaa'}} indexes={[0, 2, 9]} fishCount={3}
                                        animationRun={this.state.animationSection2}/>
                                </TrackVisibility>
                                <TrackVisibility onVisible={() => this.setState({meetTheDeveloperAnimation: true})}>
                                    <MeetTheDeveloper animation={this.state.meetTheDeveloperAnimation}
                                                      style={{backgroundColor: '#0cc61faa'}}/>
                                </TrackVisibility>
                            </div>
                        </ParallaxBanner>
                        <Feedback/>
                    </ParallaxProvider>
                </div>
                <Footer/>
            </main>)
    }
}

export default LandingPageOld;
