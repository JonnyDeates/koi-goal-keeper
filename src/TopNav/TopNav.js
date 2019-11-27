import React from 'react';
import {Link} from 'react-router-dom'
import './TopNav.css';
import TokenService from "../services/token-service";
class TopNav extends React.Component{

    render() {
        return (
            <div className='nav'>
                {this.props.links.map((link, index) => <Link key={index} to={link.to}
                                                             className={(link.to === this.props.currentActive.pathname)
                                                                  ? 'active' : ''}>{link.name}</Link>)}
                <button onClick={() => {
                    TokenService.clearAuthToken();
                    window.location.reload();
                }}>Log Out
                </button>
            </div>
        );
    }
}

export default TopNav;
