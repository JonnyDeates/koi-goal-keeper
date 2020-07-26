import React, {Component} from 'react';
import UserService from "../../services/local/user-api-service.js";
import SettingsService from "../../services/local/settings-service";
import {getCurrentThemeColors} from "../../Utils/Utils";

export default class DeleteModel extends Component {
    constructor(props){
        super(props);
        this.state = { username: ''}
    }

    updateUsername = e => this.setState({username: e.target.value})

    validation = () => {
        if(this.state.username === UserService.getUser().nickname) {
            UserService.clearUser();
            SettingsService.clearSettings();
            window.location.reload()
        } else if(this.state.username !== '' && this.state.username !== UserService.getUser().nickname){
            this.setState({error: 'Nickname Incorrect'})
        } else {
            this.setState({error: 'Please Enter Your Nickname'})
        }
    }

    componentDidMount() {
    }

    render() {
        const confirmationText = 'Enter Your Email to Delete Your Account'
        const username = UserService.getUser() ? UserService.getUser().nickname : ''
        return <><div className={'model-wrapper-delete'} onClick={this.props.closeModel}/>
            <div className={'model-delete'} style={{backgroundColor: getCurrentThemeColors().pColor}}>
                <h2 title={confirmationText} style={{color: getCurrentThemeColors().headerColor}}>{confirmationText}</h2>
                <p className={'error'}>{this.state.error}</p>
                <p style={{color: getCurrentThemeColors().fontColor+'99'}}><i>*Your Nickname is <b>{username}</b></i></p>
                <label title={'Nickname'}>Nickname: <input title={'text'} type={'text'} onChange={this.updateUsername} value={username}/></label>
                <div className={'even-space'}>
                    <button onClick={this.props.closeModel}>Cancel</button>
                    <button onClick={this.validation}>Confirm</button>
                </div>
            </div>
        </>
    }
}
