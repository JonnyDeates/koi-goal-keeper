import React from 'react';
import {Link} from 'react-router-dom'
import './TopNav.css';
class TopNav extends React.Component{

    render() {
        return (
            <div className='nav'>
                {this.props.links.map((link, index) => <Link key={index} to={link.to}
                                                             className={(link.to === this.props.currentActive.pathname)
                                                                 ? 'active' : ''}>{link.name}</Link>)}
            </div>
        );
    }
}

export default TopNav;
