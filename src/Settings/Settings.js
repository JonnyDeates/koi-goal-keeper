import React from 'react';
import AuthApiService from "../services/auth-api-service";
import './Settings.css';
import {SettingsContext} from "./SettingsContext";
import {toast} from "react-toastify";
import UserService from "../services/user-api-service";

class Settings extends React.Component {
    static contextType = SettingsContext;
    constructor(props) {
        super(props);
        this.state = {
            selectedNotification: 'All',
            isUsernameEditable: false,
            isEmailEditable: false,
            isPasswordEditable: false,
            newEmail: '',
            newEmailCheck: '',
            newNickname: ''
        }
    }

    handleOptionChange(e) {
        this.setState({
            selectedNotification: e.target.value
        });
    }
    changeEmail(e){
        this.setState({newEmail: e.target.value})
    }
    changeEmailCheck(e){
        this.setState({newEmailCheck: e.target.value})
    }
    submitEmail(){
        if(this.state.newEmail.trim().length === 0 || this.state.newEmailCheck.trim().length === 0){
            toast.warn('Please Enter an Email');
            return null;
        }
        if(this.state.newEmail === this.state.newEmailCheck) {
            this.context.updateEmail(this.state.newEmail);
            this.setState({isEmailEditable: false});
            UserService.saveUser(JSON.stringify({
                nickname: this.context.nickname,
                username: this.context.username,
                email: this.state.newEmail,
                id: UserService.getUser().id
            }));
            AuthApiService.patchUser({
                nickname: this.context.nickname,
                username: this.context.username,
                email: this.state.newEmail
            });
            toast.success(`Email changed to: ${this.state.newEmail}`)
        } else {
            toast.error(`The Emails aren't matching`)
        }
    }
    changeNickname(e){
        this.setState({newNickname: e.target.value})
    }
    submitNickname(){
        if(this.state.newNickname.trim().length > 0){
        this.context.updateNickname(this.state.newNickname);
        this.setState({isUsernameEditable:false});
            UserService.saveUser(JSON.stringify({
                nickname: this.state.newNickname,
                username: this.context.username,
                email: this.context.email,
                id: UserService.getUser().id
            }));
        AuthApiService.patchUser({nickname: this.state.newNickname, username: this.context.username, email: this.context.email})
        toast.success(`Nickname changed to: ${this.state.newNickname}`)
    } else {
    toast.error(`Nickname is Empty`)
}
    }


    render() {
        return (
            <div className="home">
                <h1>Profile</h1>
                <div>
                    <h2>{this.context.username}</h2>
                    <label>Nickname: {(this.state.isUsernameEditable) ? <input type='text'
                                                                               onChange={(e) => this.changeNickname(e)}
                                                                               value={this.state.newNickname}
                                                                               onKeyPress={e => {
                                                                                   if (e.key === 'Enter') {
                                                                                       e.preventDefault();
                                                                                       this.submitNickname();
                                                                                   }
                                                                               }}/> :
                        <span onClick={() => this.setState({isUsernameEditable: true})}>{this.context.nickname}</span>}</label>
                </div>
                <div>
                    <label>{(this.state.isEmailEditable) ? <div>
                        <div>Old Email: {this.context.email}</div>
                        <div>New Email: <input type='text'
                                               onChange={(e) => this.changeEmail(e)}
                                               value={this.state.newEmail}
                                               onKeyPress={e => {
                                                   if (e.key === 'Enter') {
                                                       e.preventDefault();
                                                   }
                                               }}/></div>
                        <div>Confirm Email: <input type='text'
                                                   onChange={(e) => this.changeEmailCheck(e)}
                                                   value={this.state.newEmailCheck}
                                                   onKeyPress={e => {
                                                       if (e.key === 'Enter') {
                                                           e.preventDefault();
                                                           this.submitEmail();
                                                       }
                                                   }}/></div>
                    </div> : <p onClick={() => this.setState({isEmailEditable: true})}>Change Email {this.context.email}</p>}</label>
                </div>
                <div>
                    <label>{(this.state.isPasswordEditable) ? <div>
                            <div>Old Password<input type='text'/></div>
                            <div>New Password<input type='text'/></div>
                            <div>Confirm Password<input type='text'/></div>
                        </div> : <p onClick={() => this.setState({isPasswordEditable: true})}>Change Password</p>}</label>
                </div>
                <h1>Settings</h1>
                <div className='dropdown-types'>
                    <p>{this.context.currentTheme}</p>
                    <ul>
                        {this.context.themes.map((theme, i) => <li key={i}
                                                                 className={(this.context.currentTheme === theme) ? 'tinted' : ''}
                                                                 onClick={() => this.context.setTheme(theme)}>{theme}</li>)}
                    </ul>
                </div>
                <h3>Notifications</h3>
                <div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="All"
                                   checked={this.state.selectedNotification === 'All'}
                                   onChange={(e) => this.handleOptionChange(e)}/>
                            All Email & Phone
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="Mid"
                                   checked={this.state.selectedNotification === 'Mid'}
                                   onChange={(e) => this.handleOptionChange(e)}/>
                            Just Phone
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="None"
                                   checked={this.state.selectedNotification === 'None'}
                                   onChange={(e) => this.handleOptionChange(e)}/>
                            Off
                        </label>
                    </div>
                </div>
                <h3>Automatic Daily Archiver</h3>
                <div onClick={()=>this.context.toggleArchiving()}>
                    <div className="radio2">
                        {(this.context.autoArchiving) ? <p>Yes</p>:<p>No</p>}
                    </div>
                </div>
                <button>Delete Account</button>
            </div>
        )
    }
}

export default Settings;