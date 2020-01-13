import React, {Component} from "react";
import {ParallaxBanner} from "react-scroll-parallax/cjs";
import {ParallaxProvider} from "react-scroll-parallax";
import "./LandingPage.css";
import goalList1 from "../assets/banner/goallist1.png"
import goalList2 from "../assets/banner/goallist2.png"
import goalList3 from "../assets/banner/goallist3.png"
import goalList4 from "../assets/banner/goallist4.png"
import goalList5 from "../assets/banner/goallist5.png"
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

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageCoursel: [{img: addPage, alt: 'Add Page'}, {img: homePage, alt: 'Home Page'}, {
                img: homePageUC,
                alt: 'Home Page Ultra Compacted'
            }, {img: phoneAddPage,alt:'Phone Add Page'}, {img: settingsPage, alt: 'Settings Page'}],
            pageData: [{header: 'How it Will Help', description: 'One boi tricked'}, {
                header: 'Plan of Success',
                description: 'Dope as fuck'
            }, {header: 'Meet the Developer', description: 'Hmm?'}]
        }
    }


    render() {
        return (
            <main className={'landing-page-wrapper'}>
                <div className={'landing-page'}>
                    <ParallaxProvider>
                        <header>
                            <nav><Link to={'/login'}>LogIn</Link> <Link to={'/register'}>Register</Link></nav>
                            <ParallaxBanner layers={[
                                {image: goalList1, amount: 0.8},
                                {image: goalList2, amount: 0.6},
                                {image: goalList3, amount: 0.4},
                                {image: goalList4, amount: 0.2},
                                {image: goalList5, amount: 0.9},
                            ]}
                                            style={{minHeight: '60vh', maxHeight: '6l0vh'}}>
                                <h1>The Koi Goal Keeper</h1>
                            </ParallaxBanner>
                        </header>

                        <div>
                            <h2>What is it?</h2>
                            <p>A simple and easy to use goal planner, that allows the user to easily plan out their
                                life.

                            </p>
                            <ImageCoursel imageUrls={this.state.imageCoursel}/>
                            {this.state.pageData.map((sect, i) => <LandingPageSection key={i} header={sect.header}
                                                                                      description={sect.description}
                                                                                      image={sect.image}
                                                                                      imageDesc={sect.imageDesc}/>)}
                        </div>
                        <Footer/>
                    </ParallaxProvider>
                </div>
            </main>)
    }
}

export default LandingPage;