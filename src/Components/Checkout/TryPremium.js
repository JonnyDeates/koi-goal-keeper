import React from 'react';
import './TryPremium.css';
import {SettingsContext} from "../../Pages/PrivateRoutes/Settings/SettingsContext";
import SettingsService from "../../services/local/settings-service"
class TryPremium extends React.Component {
    static contextType = SettingsContext;
    render() {
        return (!SettingsService.isPaid() ? <span className={'try-premium'} onClick={this.context.toggleCheckoutModal}>Try Premium</span> : '')
    }
}

export default TryPremium;
 