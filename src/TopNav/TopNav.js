import React from 'react';
import {Link} from 'react-router-dom'
import './TopNav.css';
import TokenService from "../services/token-service";
import UserService from "../services/user-api-service";
class TopNav extends React.Component{

    render() {
        return (
            <div className='nav'>
                {this.props.links.map((link, index) => <Link key={index} to={link.to}
                                                             className={(link.to === this.props.currentActive.pathname)
                                                                  ? 'active' : ''}><img src={link.src} alt={link.name}/></Link>)}
                <img src={require(`../assets/icons/exit.ico`)} alt='Log Out' width='60px' height='60px' onClick={() => {
                    TokenService.clearAuthToken();
                    UserService.clearUser();
                    window.location.reload();
                }}/>
                </div>
        );
    }
}

export default TopNav;
