import React from "react";
import "./Navigation.css";
import {useLocation, useNavigate} from "react-router-dom"
import Home from "./assets/home.ico";
import User from "./assets/user.ico";
import Exit from "./assets/exit.ico"
import {IconButton} from "koi-pool";
import AuthenticationClient from "../../clients/AuthenticationClient";

type NavigationLink = { to: string, name: string, img: any };

export const Navigation = () => {
  const links: NavigationLink[] = [{to: "/", name: "Home", img: Home},
    {to: "/settings", name: "Settings", img: User}];

  const navigate = useNavigate();
  const handleNavigate = (to: string) => {
    navigate(to);
  };

  const {pathname} = useLocation();

  return <>
    <nav>
      {links.map(({to, name, img}, i) =>
        <IconButton src={img} alt={name} isActive={pathname === to} className={'NavButton'}
                    onClick={() => handleNavigate(to)} key={'nav' + name + i}
        />
      )}
      <IconButton src={Exit as string} alt={"Logout"} onClick={AuthenticationClient.handleLogout}
                  className={'NavButton'} variant={"cancel"}/>
    </nav>
    <div className={'NavBlocker'}/>
  </>
};