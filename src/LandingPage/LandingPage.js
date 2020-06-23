import React, {Component} from "react";
import {ParallaxBanner} from "react-scroll-parallax/cjs";
import {ParallaxProvider} from "react-scroll-parallax";
import "./LandingPage.css";
import goalList1 from "../assets/banner/goallist1.png"
import goalList2 from "../assets/banner/goallist2.png"
import goalList3 from "../assets/banner/goallist3.png"
import goalList4 from "../assets/banner/goallist4.png"
import goalList5 from "../assets/banner/goallist5.png"
import Yin from "../assets/banner/Yin.png"
import Yang from "../assets/banner/Yang.png"
import addPage from "../assets/images/koigoalkeeper-addpagev2.png"
import homePage from "../assets/images/koigoalkeeper-hompagev2.png"
import homePageUC from "../assets/images/koigoalkeeper-hompage-ultra-compactedv2.png"
import phoneAddPage from "../assets/images/koigoalkeeper-phone-addpagev2.png"
import settingsPage from "../assets/images/koigoalkeeper-settingsv2.png"
import compImpr from "../assets/images/compoundingImprovements.png"
import {Link} from "react-router-dom";
import Footer from "./Footer/Footer"
import ImageCoursel from "./ImageCarousel/ImageCoursel";
import LandingPageSection from "./LandingPageSection/LandingPageSection";
import MeetTheDeveloper from "./MeetTheDeveloper/MeetTheDeveloper";
import TrackVisibility from "../Utils/TrackVisibility";

class LandingPage extends Component {

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
                'the use of a daily goal checklist is important! That’s the need this fills.  ']
            },
            pageData: [{
                header: 'How it Will Help',
                description: ['The Koi Goal Keeper app is a tool derived for growth. Being able to plan out your day to \n ' +
                    'day, is vastly important for maintaining consistent personal growth. Each day is an opportunity, \n' +
                    'the best way to attain the most of that opportunity is to know the priorities for that day. \n' +
                    'Deadlines will be met, and growth will prosper. The solution is simple but time-tested. Plan \n' +
                    'Your Days. The Koi Goal Keeper app is the tool you need to do just that. The quick and easy \n' +
                    'solution to planning each day, and following through to your eventual goals. It allows for easy \n' +
                    'goal creation, tracking and archiving.']
            }, {
                header: 'Plan of Success',
                description: ['The idea of the app is for quick access to the priority checklist for your life, and \n' +
                'the perpetual creation of that list. To maintain a good timeline and to plan quickly and accordingly \n' +
                'the app must be used daily. When is the best time to start planning your days? Today, that’s when. \n' +
                'Every day you are not moving forward you are taking steps backward in your life. This is shown through \n' +
                'simple math: ', '1% Better Every Day for 1 Year. 1.01 ^ (365) = 37.78',
                    '1% Worse Every Day for 1 Year. 0.99 ^ (365) = 00.03', 'So the best time to make the difference you \n' +
                    'need to make is Today. Getting started is easy, after creating an account it is recommended to think \n' +
                    'of stretch dream goals, that you could see yourself having in 5 - Years Time, reasonable, achievable goals \n' +
                    'is a must. Then plan downward.', 'Ask What do I need to do with-in this Year to make sure I am on track for my 5 - Year Goals? \n' +
                    'Then Repeat for the shorter Goals. What do I need to do with-in this Quarter? What about this \n' +
                    'Month? What about this Week? And what do I need to do Today?', 'Eventual Success and meeting of \n' +
                    'those goals will become a normal occurrence, so change your life starting today!'],
                image: compImpr,
                imageDesc: 'The effects of even the smallest habits compound over time. For example, if you get just 1\n' +
                    ' percent better each day, you’ll end up with results that are nearly 37 times better after a single year.'
            }]
        }
    }


    render() {
        return (
            <main className={'landing-page-wrapper'}>
                <div className={'landing-page'}>
                    <ParallaxProvider>
                        <header>
                            <nav><Link to={'/register'}>Register</Link><Link to={'/login'}>LogIn</Link> </nav>
                            <ParallaxBanner layers={[
                                {image: Yin, amount: 0.3},
                                {image: Yang, amount: 1.2},
                                {image: goalList1, amount: 0.8},
                                {image: goalList2, amount: 0.6},
                                {image: goalList3, amount: 0.4},
                                {image: goalList4, amount: 0.2},
                                {image: goalList5, amount: 0.9},

                            ]}
                                            style={{minHeight: '60vh', maxHeight: '6l0vh'}}>
                                <h1>{this.state.title}</h1>
                            </ParallaxBanner>
                        </header>

                        <section>
                            <TrackVisibility onVisible={()=> this.setState({animationRun: true})}>
                            <LandingPageSection header={this.state.topSection.header} animationRun={this.state.animationRun}
                                                description={this.state.topSection.description}/>
                            </TrackVisibility>
                            <ImageCoursel imageUrls={this.state.imageCoursel}/>
                            {this.state.pageData.map((sect, i) => <TrackVisibility onVisible={()=> this.setState({[`animationSection${i+1}`]: true})}><LandingPageSection key={i} header={sect.header}
                                                                                      description={sect.description} image={sect.image} imageDesc={sect.imageDesc} animationRun={this.state[`animationSection${i+1}`]}/></TrackVisibility>)}
                            <TrackVisibility onVisible={()=> this.setState({meetTheDeveloperAnimation: true})}>
                                <MeetTheDeveloper animation={this.state.meetTheDeveloperAnimation}/>
                            </TrackVisibility>
                        </section>
                    </ParallaxProvider>
                </div>
                <Footer/>
            </main>)
    }
}

export default LandingPage;
