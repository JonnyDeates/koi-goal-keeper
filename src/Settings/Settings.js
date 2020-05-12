import React from 'react';
import AuthApiService from "../services/auth-api-service";
import './Settings.css';
import {SettingsContext} from "./SettingsContext";
import {toast} from "react-toastify";
import {getColor, getThemeColors} from "../Utils/Utils";
import DeleteModel from "./DeleteModel/DeleteModel";

class Settings extends React.Component {
    static contextType = SettingsContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedNotification: 'All',
            isUsernameEditable: false,
            isEmailEditable: false,
            isPasswordEditable: false,
            deleteModel: false,
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
            toast.success(`Nickname changed to: ${this.state.newNickname}`)
        } else {
            toast.error(`Nickname is Empty`)
        }
    }


    setTheme(theme) {
        this.context.setTheme(theme);
        document.body.style.backgroundColor = getThemeColors().pColor;
    }

    componentDidMount() {
        document.body.style.backgroundColor = getThemeColors().pColor;
    }

    render() {
        return (
            <main className="settings">
                <h1 style={{color: getThemeColors().headerColor}}>Profile</h1>
                <div className='bar-indicator-top' style={getColor(this.context.currentType)}/>
                <section>
                    <h2 title={'UserId'} style={{color: getThemeColors().headerColor}}>{this.context.username}</h2>
                    {(this.state.isUsernameEditable)
                        ? <form onSubmit={(e) => this.submitNickname(e)}>
                            <label className='even-space' style={{color: getThemeColors().fontColor}}
                                   title={'Nickname'}>Nickname:
                                <input type='text' onChange={(e) => this.changeNickname(e)}
                                       value={this.state.newNickname} title={'New Nickname Input'}
                                       onKeyPress={e => {
                                           if (e.key === 'Enter') {
                                               e.preventDefault();
                                               this.submitNickname(e);
                                           }
                                       }}/> </label>
                            <div className='even-space'>
                                <button onClick={() => this.setState({isUsernameEditable: false})}
                                        type='button' title={'Cancel Nickname Changes'}>Cancel
                                </button>
                                <button type='submit' title={'Submit Changes'}>Submit</button>
                            </div>
                        </form>
                        :
                        <p className='even-space' title={'Click to Change Nickname'}
                           style={{color: getThemeColors().fontColor}}
                           onClick={() => this.setState({isUsernameEditable: true})}>Nickname: <span
                            style={{color: getThemeColors().headerColor}}
                            title={this.context.nickname}>{this.context.nickname}</span>
                        </p>
                    }

                </section>
                <section>
                    <form onSubmit={(e) => this.submitEmail(e)}>{(this.state.isEmailEditable) ? <>
                        <label className='even-space' title={'Old Email'} style={{color: getThemeColors().fontColor}}>Old
                            Email: <span
                                title={this.context.email}
                                style={{color: getThemeColors().fontColor}}>{this.context.email}</span></label>
                        <label className='even-space' title={'New Email'} style={{color: getThemeColors().fontColor}}>New
                            Email: <input type='text'
                                          title={'New Email Input'}
                                          onChange={(e) => this.changeEmail(e)}
                                          value={this.state.newEmail}
                                          onKeyPress={e => {
                                              if (e.key === 'Enter') {
                                                  e.preventDefault();
                                              }
                                          }}/></label>
                        <label className='even-space' title={'Confirm New Email'}
                               style={{color: getThemeColors().fontColor}}>Confirm Email: <input type='text'
                                                                                                 title={'Confirm New Email Input'}
                                                                                                 onChange={(e) => this.changeEmailCheck(e)}
                                                                                                 value={this.state.newEmailCheck}
                                                                                                 onKeyPress={e => {
                                                                                                     if (e.key === 'Enter') {
                                                                                                         e.preventDefault();
                                                                                                         this.submitEmail(e);
                                                                                                     }
                                                                                                 }}/></label>
                        <div className='even-space'>
                            <button onClick={() => this.setState({isEmailEditable: false})}
                                    title={'Cancel Email Changes'}>Cancel
                            </button>
                            <button type='submit' title={'Submit Changes'}>Submit</button>
                        </div>
                    </> : <p className='even-space' onClick={() => this.setState({isEmailEditable: true})}
                             style={{color: getThemeColors().fontColor}}
                             title={'Click to Change Email'}>Change
                        Email <span style={{color: getThemeColors().headerColor}}>{this.context.email}</span></p>}
                    </form>
                </section>
                <section>
                    {(this.state.isPasswordEditable) ? <form onSubmit={(e) => this.submitPassword(e)}>
                        <label className='even-space' title={'Old Password'}
                               style={{color: getThemeColors().fontColor}}>Old Password<input type='password'
                                                                                              title={'Old Password Input'}
                                                                                              onChange={(e) => this.changeOldPasswordCheck(e)}
                                                                                              value={this.state.oldPasswordCheck}
                                                                                              onKeyPress={e => {
                                                                                                  if (e.key === 'Enter') {
                                                                                                      e.preventDefault();
                                                                                                  }
                                                                                              }}/></label>
                        <label className='even-space' title={'New Password'}
                               style={{color: getThemeColors().fontColor}}>New Password<input type='password'
                                                                                              title={'New Password Input'}
                                                                                              onChange={(e) => this.changePassword(e)}
                                                                                              value={this.state.newPassword}
                                                                                              onKeyPress={e => {
                                                                                                  if (e.key === 'Enter') {
                                                                                                      e.preventDefault();
                                                                                                  }
                                                                                              }}/></label>
                        <label className='even-space' title={'Confirm New Password'}
                               style={{color: getThemeColors().fontColor}}>Confirm Password<input
                            type='password' title={'Confirm New Password Input'}
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
                                    type='button' title={'Cancel Password Changes'}>Cancel
                            </button>
                            <button type='submit' title={'Submit Changes'}>Submit</button>
                        </div>
                    </form> : <p className='even-space' title={'Click To Change Password'}
                                 style={{color: getThemeColors().fontColor}}
                                 onClick={() => this.setState({isPasswordEditable: true})}>Change
                        Password<span style={{color: getThemeColors().headerColor}}>*******</span></p>}
                </section>
                {/*<h1>Settings</h1>*/}
                <div className={'even-space'}>
                    <p title={'Theme'} style={{color: getThemeColors().fontColor}}>Theme</p>
                    <section className={'theme-list'}>
                        <div className={'dropdown-wrapper'}>
                            <div className='dropdown-types dropdown-types-settings'
                                 style={{backgroundColor: getThemeColors().tColor, color: getThemeColors().fontColor}}>
                                <p>{this.context.theme}</p>
                                <ul className={'dropdown-list'}>
                                    {this.context.themes.map((theme, i) => <li key={i}
                                                                               className={(this.context.currentTheme === theme) ? 'tinted' : ''}
                                                                               style={{backgroundColor: getThemeColors().tColor}}
                                                                               onClick={() => this.setTheme(theme)}>{theme}</li>)}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
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
                <section>
                    <label className='even-space' onClick={() => this.context.toggleArchiving()}
                           title={'Click To Toggle The Automatic Daily Archiver'}
                           style={{color: getThemeColors().fontColor}}>
                        Automatic Daily Archiver
                        <span
                            style={{color: getThemeColors().headerColor}}>{(this.context.autoArchiving) ? 'On' : 'Off'}</span></label>
                </section>
                <section>
                    <p className='even-space noselect' onClick={() => this.context.toggleType()}
                           title={'Click To Toggle Through The Types List'} style={{color: getThemeColors().fontColor}}>
                        Types List
                        <span
                            style={{color: getThemeColors().headerColor}}>{this.context.typeListSelected}</span></p>
                </section>
                <button className='delete' onClick={() => this.setState({deleteModel: true})}
                        style={{backgroundColor: getThemeColors().tColor, color: getThemeColors().fontColor+'77'}}>Suspend
                    Account
                </button>
                {(this.state.deleteModel) ? <DeleteModel closeModel={() => this.setState({deleteModel: false})}/> : ''}
            </main>
        )
    }
}

export default Settings;
