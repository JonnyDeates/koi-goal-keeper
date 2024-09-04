import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";
import {Button} from "koi-pool";
import {Title} from "@repo/shared";

const Home = () => {

    const handleLogout = () => {
        window.location.href = "/auth/logout"
    }

    return <main className={"LandingPage"}>
        <h1>Koi Goal Keeper Logged In</h1>
        <div className={'links'}>
                <Button variant={'accept'}
                        onClick={handleLogout}
                >
                    Logout
                </Button>
        </div>
    </main>;
};
export default Home;