import React, {Component} from 'react';
import SettingsService from "../../services/local/settings-service";
import {getCurrentThemeColors} from "../../Utils/Utils";

export default class LocalStorageModel extends Component {
    render() {
        const validation = () => {
            this.props.toggleLocal();
            this.props.closeModel()
        };
        const warningText = 'Warning';
        const confirmationText = (SettingsService.isLocal())
            ? 'You are About to Disconnect From The Database. Reconnecting to the Database Will Require the Data on the Database to be Cleared. Are You Sure You Want to Continue?'
            : 'You are About to Connect To The Database. This Will Clear The Database Data, and Replace It With Your Local Storage Data. Are You Sure You Want to Continue?';

        return <><div className={'model-wrapper'} onClick={this.props.closeModel}/>
            <div className={'model-delete'} style={{backgroundColor: getCurrentThemeColors().pColor}}>
                <h2 title={warningText} style={{color: getCurrentThemeColors().headerColor}}>{warningText}</h2>
                <p title={confirmationText} style={{color: getCurrentThemeColors().fontColor+'cc'}}><b>{confirmationText}</b></p>
                <div className={'even-space'}>
                    <button onClick={this.props.closeModel}>Cancel</button>
                    <button onClick={validation}>Confirm</button>
                </div>
            </div>
        </>
    }
}
