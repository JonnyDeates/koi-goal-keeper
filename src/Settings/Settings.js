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
            oldPasswordCheck: '',
            newPassword: '',
            newPasswordCheck: '',
            newNickname: ''
        }
    }

    handleOptionChange(e) {
        this.setState({
            selectedNotification: e.target.value
        });
    }

    changeOldPasswordCheck(e) {
        this.setState({oldPasswordCheck: e.target.value})
    }

    changePassword(e) {
        this.setState({newPassword: e.target.value})
    }

    changePasswordCheck(e) {
        this.setState({newPasswordCheck: e.target.value})
    }

    submitPassword() {
        if (this.state.oldPasswordCheck.trim().length === 0 || this.state.newPassword.trim().length === 0 || this.state.newPasswordCheck.trim().length === 0) {
            toast.warn('Fill All Fields');
            return null;
        }
        if (this.state.newPassword === this.state.newPasswordCheck) {
            this.setState({isPasswordEditable: false});
            AuthApiService.patchPassword({password: this.state.newPassword, oldPassword: this.state.oldPasswordCheck})
                .then(() => {
                    this.setState({newPassword: '', oldPasswordCheck: '', newPasswordCheck: ''});
                    toast.success(`Password changed`)
                })
                .catch(error => {
                    toast.error(`${error.error}`)
                })

        } else {
            toast.error(`The Passwords aren't matching`)
        }
    }

    changeEmail(e) {
        this.setState({newEmail: e.target.value})
    }

    changeEmailCheck(e) {
        this.setState({newEmailCheck: e.target.value})
    }

    submitEmail(e) {
        e.preventDefault();
        if (this.state.newEmail.trim().length === 0 || this.state.newEmailCheck.trim().length === 0) {
            toast.warn('Please Enter an Email');
            return null;
        }
        if (this.state.newEmail === this.state.newEmailCheck) {
            this.context.updateEmail(this.state.newEmail);
            this.setState({isEmailEditable: false, newEmail: '', newEmailCheck: ''});
            UserService.saveUser(JSON.stringify({
                nickname: this.context.nickname,
                username: this.context.username,
                email: this.state.newEmail,
                id: UserService.getUser().id
            }));
            AuthApiService.patchUser({
                email: this.state.newEmail
            });
            toast.success(`Email changed to: ${this.state.newEmail}`)
        } else {
            toast.error(`The Emails aren't matching`)
        }
    }

    changeNickname(e) {
        this.setState({newNickname: e.target.value})
    }

    submitNickname(e) {
        e.preventDefault();
        if (this.state.newNickname.trim().length > 0) {
            this.context.updateNickname(this.state.newNickname);
            this.setState({isUsernameEditable: false});
            UserService.saveUser(JSON.stringify({
                nickname: this.state.newNickname,
                username: this.context.username,
                email: this.context.email,
                id: UserService.getUser().id
            }));
            AuthApiService.patchUser({nickname: this.state.newNickname});
            toast.success(`Nickname changed to: ${this.state.newNickname}`)
        } else {
            toast.error(`Nickname is Empty`)
        }
    }


    render() {
        return (
            <div className="settings">
                <h1>Profile</h1>
                <section>
                    <h2>{this.context.username}</h2>
                    {(this.state.isUsernameEditable)
                        ? <form onSubmit={(e) => this.submitNickname(e)}>
                            <label className='even-space'>Nickname:
                                <input type='text' onChange={(e) => this.changeNickname(e)}
                                       value={this.state.newNickname}
                                       onKeyPress={e => {
                                           if (e.key === 'Enter') {
                                               e.preventDefault();
                                               this.submitNickname(e);
                                           }
                                       }}/> </label>
                            <div className='even-space'>
                                <button onClick={() => this.setState({isUsernameEditable: false})}
                                        type='button'>Cancel
                                </button>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                        :
                        <p className='even-space'
                           onClick={() => this.setState({isUsernameEditable: true})}>Nickname: <span>{this.context.nickname}</span>
                        </p>
                    }

                </section>
                <section>
                    <form onSubmit={(e) => this.submitEmail(e)}>{(this.state.isEmailEditable) ? <>
                        <label className='even-space'>Old Email: <span>{this.context.email}</span></label>
                        <label className='even-space'>New Email: <input type='text'
                                                                        onChange={(e) => this.changeEmail(e)}
                                                                        value={this.state.newEmail}
                                                                        onKeyPress={e => {
                                                                            if (e.key === 'Enter') {
                                                                                e.preventDefault();
                                                                            }
                                                                        }}/></label>
                        <label className='even-space'>Confirm Email: <input type='text'
                                                                            onChange={(e) => this.changeEmailCheck(e)}
                                                                            value={this.state.newEmailCheck}
                                                                            onKeyPress={e => {
                                                                                if (e.key === 'Enter') {
                                                                                    e.preventDefault();
                                                                                    this.submitEmail(e);
                                                                                }
                                                                            }}/></label>
                        <div className='even-space'>
                            <button onClick={() => this.setState({isEmailEditable: false})}>Cancel</button>
                            <button type='submit'>Submit</button>
                        </div>
                    </> : <p className='even-space' onClick={() => this.setState({isEmailEditable: true})}>Change
                        Email <span>{this.context.email}</span></p>}
                    </form>
                </section>
                <section>
                    {(this.state.isPasswordEditable) ? <form onSubmit={(e) => this.submitPassword(e)}>
                        <label className='even-space'>Old Password<input type='password'
                                                                         onChange={(e) => this.changeOldPasswordCheck(e)}
                                                                         value={this.state.oldPasswordCheck}
                                                                         onKeyPress={e => {
                                                                             if (e.key === 'Enter') {
                                                                                 e.preventDefault();
                                                                             }
                                                                         }}/></label>
                        <label className='even-space'>New Password<input type='password'
                                                                         onChange={(e) => this.changePassword(e)}
                                                                         value={this.state.newPassword}
                                                                         onKeyPress={e => {
                                                                             if (e.key === 'Enter') {
                                                                                 e.preventDefault();
                                                                             }
                                                                         }}/></label>
                        <label className='even-space'>Confirm Password<input type='password'
                                                                             onChange={(e) => this.changePasswordCheck(e)}
                                                                             value={this.state.newPasswordCheck}
                                                                             onKeyPress={e => {
                                                                                 if (e.key === 'Enter') {
                                                                                     e.preventDefault();
                                                                                     this.submitPassword(e);
                                                                                 }
                                                                             }}/></label>
                        <div className='even-space'>
                            <button onClick={() => this.setState({isPasswordEditable: false})}
                                    type='button'>Cancel
                            </button>
                            <button type='submit'>Submit</button>
                        </div>
                    </form> : <p className='even-space'
                                 onClick={() => this.setState({isPasswordEditable: true})}>Change Password<span>*******</span></p>}
                </section>
                {/*<h1>Settings</h1>*/}
                {/*<div className={'dropdown-wrapper'}>*/}
                {/*<div className='dropdown-types dropdown-types-settings'>*/}
                {/*    <p>{this.context.currentTheme}</p>*/}
                {/*    <ul className={'dropdown-list'}>*/}
                {/*        {this.context.themes.map((theme, i) => <li key={i}*/}
                {/*                                                 className={(this.context.currentTheme === theme) ? 'tinted' : ''}*/}
                {/*                                                 onClick={() => this.context.setTheme(theme)}>{theme}</li>)}*/}
                {/*    </ul>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<h3>Notifications</h3>*/}
                {/*<div>*/}
                {/*    <div className="radio">*/}
                {/*        <label>*/}
                {/*            <input type="radio" value="All"*/}
                {/*                   checked={this.state.selectedNotification === 'All'}*/}
                {/*                   onChange={(e) => this.handleOptionChange(e)}/>*/}
                {/*            All Email & Phone*/}
                {/*        </label>*/}
                {/*    </div>*/}
                {/*    <div className="radio">*/}
                {/*        <label>*/}
                {/*            <input type="radio" value="Mid"*/}
                {/*                   checked={this.state.selectedNotification === 'Mid'}*/}
                {/*                   onChange={(e) => this.handleOptionChange(e)}/>*/}
                {/*            Just Phone*/}
                {/*        </label>*/}
                {/*    </div>*/}
                {/*    <div className="radio">*/}
                {/*        <label>*/}
                {/*            <input type="radio" value="None"*/}
                {/*                   checked={this.state.selectedNotification === 'None'}*/}
                {/*                   onChange={(e) => this.handleOptionChange(e)}/>*/}
                {/*            Off*/}
                {/*        </label>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <section >
                    <label className='even-space' onClick={() => this.context.toggleArchiving()}>
                        Automatic Daily Archiver
                        <span>{(this.context.autoArchiving) ? 'On' : 'Off'}</span></label>
                </section>
                <button className='delete' onClick={AuthApiService.deleteUser}>Suspend Account</button>
            </div>
        )
    }
}

export default Settings;