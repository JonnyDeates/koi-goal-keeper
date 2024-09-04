import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import {Button} from "koi-pool";

const LandingPage = () => {

    return <main className={"LandingPage"}>
        <div className={"header"}>
            <h1>Koi Goal Keeper</h1>
        </div>
        <div className={'links'}>
            <Link to={"/login"}>
                <Button variant={'accept'}>
                    Login
                </Button>
            </Link>
            <Link to={"/sign-up"}>
                <Button variant={'accept'}>
                    Sign Up
                </Button>
            </Link>
        </div>
    </main>;
};
export default LandingPage;