import React from 'react';
import {Link} from 'react-router-dom'
import './TopNav.css';
import TokenService from "../services/token-service";
import UserService from "../services/user-api-service";
import home from '../assets/icons/home.ico';
import document from '../assets/icons/document.ico';
import archive from '../assets/icons/archive.ico';
import user from '../assets/icons/user.ico';
import {getThemeColors} from "../Utils/Utils";

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [{to: '/koi/', name: 'Home', src: home}, {to: '/koi/add', name: 'Add', src: document},
                {to: '/koi/past-goals', name: 'Past Goals', src: archive}, {
                    to: '/koi/settings',
                    name: 'Settings',
                    src: user
                }]
        };
    }


    render() {
        const logout = () => {
            try {
                let auth2 = window.gapi.auth2.getAuthInstance();
                if (auth2)
                    auth2.signOut();
            } catch (e) {
                console.log('Not the main Domain is it my guy? Im watching you <.<'
                )
            }
            TokenService.clearAuthToken();
            UserService.clearUser();
            window.location.reload();
        };
        return (
            <nav className='nav' style={{backgroundColor: getThemeColors().sColor}}>
                {this.state.links.map((link, index) => <div key={index} onClick={() => {
                    window.scrollTo(0, 0);
                    this.forceUpdate();
                }
                }><Link to={link.to} className={(link.to === this.props.currentActive.pathname) ? 'active' : ''}
                        style={{
                            backgroundColor: getThemeColors().sColor,
                        }}>
                    <img src={link.src} alt={link.name}/></Link></div>)}
                <img src={require(`../assets/icons/exit.ico`)} alt='Log Out' width='60px' height='60px'
                     style={{
                         backgroundColor: getThemeColors().sColor,
                     }} className={'nav-logout'} onClick={logout}/>
            </nav>
        );
    }
}

export default TopNav;
