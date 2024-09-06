import React from "react";
import "./LandingPage.css";
import {Button} from "koi-pool";
import AuthenticationClient from "../../clients/AuthenticationClient";

const Home = () => {

  return <main className={"LandingPage"}>
    <h1>Koi Goal Keeper Logged In</h1>
    <div className={'links'}>
      <Button variant={'accept'}
              onClick={AuthenticationClient.handleLogout}
      >
        Logout
      </Button>
    </div>
  </main>;
};
export default Home;