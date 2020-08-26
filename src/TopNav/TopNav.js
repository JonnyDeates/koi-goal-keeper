import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './TopNav.css';
import home from '../assets/icons/home.ico';
import document from '../assets/icons/document.ico';
import archive from '../assets/icons/archive.ico';
import user from '../assets/icons/user.ico';
import {getCurrentThemeColors} from "../Utils/Utils";
import {SettingsContext} from "../Settings/SettingsContext";
import SettingsApiService from "../services/database/settings-api-service";
import SettingsService from "../services/local/settings-service";
import Checkout from "../Checkout/checkout";


class TopNav extends Component {
    static contextType = SettingsContext;

    constructor(props) {
        super(props);
        this.state = {
            links: [{to: '/koi', name: 'Home', src: home}, {to: '/koi/add', name: 'Add', src: document},
                {to: '/koi/past-goals', name: 'Past Goals', src: archive}, {
                    to: '/koi/settings',
                    name: 'Settings',
                    src: user
                }],
            checkout: false
        };
    }


    render() {
        return (
            <nav className='nav' style={{backgroundColor: getCurrentThemeColors().sColor}}>
                {this.state.links.map((link, index) => <div key={index} onClick={() => {
                    window.scrollTo(0, 0);
                    this.forceUpdate();
                }
                }><Link to={link.to} className={(link.to === this.props.currentActive.pathname) ? 'active' : ''}
                        style={{
                            backgroundColor: getCurrentThemeColors().sColor,
                        }}>
                    <img src={link.src} alt={link.name}/></Link></div>)}
                <div onClick={() => SettingsApiService.togglePaidAccount(SettingsService.getSettings().id).then((res) => SettingsService.saveSettings({paid_account: typeof SettingsService.getSettings().paid_account === 'boolean' ? !SettingsService.getSettings().paid_account : true}))}>Toggle
                    Account {SettingsService.getSettings().paid_account ? 'On' : 'Off'}</div>
                {!SettingsService.isPaid() ? <div className={'checkout'}>
                    {<Checkout/>}
                </div> : ''}
            </nav>
        );
    }
}

export default TopNav;
