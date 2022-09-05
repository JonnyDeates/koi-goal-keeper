import React from 'react';
import "./Navigation.css";
import {Link} from "react-router-dom"
import {useLocation} from "react-router";
import Home from '../../assets/icons/home.ico';
import archive from '../../assets/icons/archive.ico';
import User from '../../assets/icons/user.ico';
import logoutIcon from '../../assets/icons/exit.ico'
import LocalDataService from "../../services/local/local-storage-service";
import TokenService from "../../services/local/token-service";

export const Navigation = ({color}) => {
    const links = [{to: "/", name: "Home", img: Home},
        {to: "/past-goals", name: "Past Goals", img: archive},
        {to: "/settings", name: "Settings", img: User}]

    const logout = () => {
        TokenService.clearAuthToken();
        LocalDataService.clearAllLocalData();
        window.location.reload();
    };
    const { pathname } = useLocation();

    return <nav style={color}>
        {links.map(({to,name, img}, i) =>
            <Link to={to} key={'navigation'+name+i}
                  className={pathname === to ? 'active' : ''}
                  style={color}>
                {img ? <img src={img} alt={name}/>: name}
            </Link>)}
        <Link to={'/login'} key={'navigation-logout'}
              activeclassname={'active'} className={'logout'}
              style={color}>
            <img src={logoutIcon} alt='Log Out' onClick={logout}/></Link>
    </nav>}
