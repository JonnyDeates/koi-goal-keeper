import React, {Component} from 'react';
import UserService from "../../services/user-api-service.js";
import AuthApiService from "../../services/auth-api-service.js"
import TokenService from "../../services/token-service";
import SettingsService from "../../services/settings-service";
export default class DeleteModel extends Component {
    constructor(props){
        super(props)
        this.state = { username: ''}
    }

    updateUsername = e => this.setState({username: e.target.value})

    validation = () => {
        if(this.state.username === UserService.getUser().username) {
            AuthApiService.deleteUser();
            UserService.clearUser();
            TokenService.clearAuthToken();
            SettingsService.clearSettings();
            window.location.reload()
        } else if(this.state.username !== '' && this.state.username !== UserService.getUser().username){
            this.setState({error: 'Email Incorrect'})
        } else {
            this.setState({error: 'Please Enter Your Email'})
        }
    }
    render() {
        const confirmationText = 'Enter Your Email to Delete Your Account'
        const username = UserService.getUser() ? UserService.getUser().username : ''
        return <><div className={'model-wrapper-delete'} onClick={this.props.closeModel}/>
        <div className={'model-delete'}>
            <h2 title={confirmationText}>{confirmationText}</h2>
            <p className={'error'}>{this.state.error}</p>
            <p><i>*Your Email is <b>{username}</b></i></p>
            <label title={'Email'}>Email: <input title={'text'} type={'text'} onChange={this.updateUsername} value={this.state.username}/></label>
            <div className={'even-space'}>
                <button onClick={this.props.closeModel}>Cancel</button>
                <button onClick={this.validation}>Confirm</button>
            </div>
        </div>
        </>
    }
}
