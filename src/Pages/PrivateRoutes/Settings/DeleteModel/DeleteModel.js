import React, {Component} from 'react';
import UserService from "../../../../services/local/user-api-service.js";
import AuthApiService from "../../../../services/database/auth-api-service.js"
import TokenService from "../../../../services/local/token-service";
import SettingsService from "../../../../services/local/settings-service";
import {getCurrentThemeColors} from "../../../../Utils/Utils";

export default class DeleteModel extends Component {
    constructor(props){
        super(props)
        this.state = { username: ''}
    }

    updateUsername = e => this.setState({username: e.target.value})

    validation = () => {
        if(this.state.username === UserService.getUser().username) {
            try {
                let auth2 = window.gapi.auth2.getAuthInstance();
                if (auth2)
                    auth2.signOut();
            } catch (e) {
                console.log('Not the main Domain is it my guy? Im watching you <.<'
                )
            }
            AuthApiService.deleteUser();
            setTimeout(()=>{
                UserService.clearUser();
                TokenService.clearAuthToken();
                SettingsService.clearSettings();
                window.location.reload()
            },1000)

        } else if(this.state.username !== '' && this.state.username !== UserService.getUser().username){
            this.setState({error: 'Email Incorrect'})
        } else {
            this.setState({error: 'Please Enter Your Email'})
        }
    }
    render() {
        const confirmationText = 'Enter Your Email to Delete Your Account'
        const username = UserService.getUser() ? UserService.getUser().username : ''
        return <><div className={'model-wrapper'} onClick={this.props.closeModel}/>
            <div className={'model-delete'} style={{backgroundColor: getCurrentThemeColors().pColor}}>
                <h2 title={confirmationText} style={{color: getCurrentThemeColors().headerColor}}>{confirmationText}</h2>
                <p className={'error'}>{this.state.error}</p>
                <p style={{color: getCurrentThemeColors().fontColor+'99'}}><i>*Your Email is <b>{username}</b></i></p>
                <label title={'Email'}>Email: <input title={'text'} type={'text'} onChange={this.updateUsername} value={this.state.username}/></label>
                <div className={'even-space'}>
                    <button onClick={this.props.closeModel}>Cancel</button>
                    <button onClick={this.validation}>Confirm</button>
                </div>
            </div>
        </>
    }
}
