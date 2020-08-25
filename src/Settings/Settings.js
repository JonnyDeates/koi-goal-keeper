import React from 'react';
import AuthApiService from "../services/database/auth-api-service";
import './Settings.css';
import {SettingsContext} from "./SettingsContext";
import {toast} from "react-toastify";
import {
    findTypeColor, getSpecificType,
    getColor,
    getCurrentThemeColors,
    getThemes,
    getTypeColors,
    getTypeColorsAvailable
} from "../Utils/Utils";
import DeleteModel from "./DeleteModel/DeleteModel";
import GoalService from "../services/local/goals-service";
import GoalApiService from "../services/database/goals-api-service";
import ObjectivesApiService from "../services/database/objectives-api-service";
import PastGoalApiService from "../services/database/pastgoals-api-service";
import PastObjectivesApiService from "../services/database/pastobjectives-api-service";
import LocalStorageModel from "./LocalStorageModel/LocalStorageModel";
import SettingsService from "../services/local/settings-service";

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
            localStorageModel: false,
            newEmail: '',
            newEmailCheck: '',
            oldPasswordCheck: '',
            newPassword: '',
            newPasswordCheck: '',
            newNickname: ''
        };
        this.toggleLocal = this.toggleLocal.bind(this)
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
        document.body.style.backgroundColor = getCurrentThemeColors().pColor;
        // setTimeout(()=>document.body.style.backgroundColor = getCurrentThemeColors().pColor,100);
    }

    toggleLocal() {
        GoalService.saveGoals(this.props.goalListContext.currentGoals);
        this.context.toggleLocalStorage(() => {
            GoalApiService.purgeGoals();
            setTimeout(() => this.props.goalListContext.currentGoals.forEach((goal) => {
                GoalApiService.postGoal(goal).then((res) => {
                    goal.goals.forEach(obj => {
                        obj.goalid = res.id;
                        ObjectivesApiService.postObjective(obj)
                    })
                })
            }), 100);
            PastGoalApiService.purgePastGoals();
            setTimeout(() => this.props.goalListContext.pastGoals.forEach((goal) => {
                PastGoalApiService.postPastGoal(goal).then((res) => {
                    goal.goals.forEach(obj => {
                        obj.goalid = res.id;
                        PastObjectivesApiService.postObjective(obj)
                    })
                })
            }), 100);
        });

    }

    componentDidMount() {
        document.body.style.backgroundColor = getCurrentThemeColors().pColor;
    }


    render() {
        return (
            <main className="settings">
                <h1 style={{color: getCurrentThemeColors().headerColor}}>Profile</h1>
                <div className='bar-indicator-top' style={getColor(this.context.currentType)}/>
                <section>
                    <h2 title={'UserId'}
                        style={{color: getCurrentThemeColors().headerColor}}>{this.context.username}</h2>
                    {(this.state.isUsernameEditable)
                        ? <form onSubmit={(e) => this.submitNickname(e)}>
                            <label className='even-space' style={{color: getCurrentThemeColors().fontColor}}
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
                           style={{color: getCurrentThemeColors().fontColor}}
                           onClick={() => this.setState({isUsernameEditable: true})}>Nickname: <span
                            style={{color: getCurrentThemeColors().headerColor}}
                            title={this.context.nickname}>{this.context.nickname}</span>
                        </p>
                    }

                </section>
                <section>
                    {(this.state.isPasswordEditable) ? <form onSubmit={(e) => this.submitPassword(e)}>
                        <label className='even-space' title={'Old Password'}
                               style={{color: getCurrentThemeColors().fontColor}}>Old Password<input type='password'
                                                                                                     title={'Old Password Input'}
                                                                                                     onChange={(e) => this.changeOldPasswordCheck(e)}
                                                                                                     value={this.state.oldPasswordCheck}
                                                                                                     onKeyPress={e => {
                                                                                                         if (e.key === 'Enter') {
                                                                                                             e.preventDefault();
                                                                                                         }
                                                                                                     }}/></label>
                        <label className='even-space' title={'New Password'}
                               style={{color: getCurrentThemeColors().fontColor}}>New Password<input type='password'
                                                                                                     title={'New Password Input'}
                                                                                                     onChange={(e) => this.changePassword(e)}
                                                                                                     value={this.state.newPassword}
                                                                                                     onKeyPress={e => {
                                                                                                         if (e.key === 'Enter') {
                                                                                                             e.preventDefault();
                                                                                                         }
                                                                                                     }}/></label>
                        <label className='even-space' title={'Confirm New Password'}
                               style={{color: getCurrentThemeColors().fontColor}}>Confirm Password<input
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
                                 style={{color: getCurrentThemeColors().fontColor}}
                                 onClick={() => this.setState({isPasswordEditable: true})}>Change
                        Password<span style={{color: getCurrentThemeColors().headerColor}}>*******</span></p>}
                </section>
                <div className={'even-space theme-list-wrapper'}>
                    <label title={'Theme'} style={{color: getCurrentThemeColors().fontColor}}>Theme</label>
                    <section className={'theme-list'}>
                        <div className={'dropdown-wrapper'}>
                            <div className='dropdown-types dropdown-types-settings'
                                 style={{
                                     backgroundColor: getCurrentThemeColors().tColor,
                                     color: getCurrentThemeColors().fontColor
                                 }}>
                                <span>{this.context.theme}</span>
                                <ul className={'dropdown-list'}>
                                    {this.context.themes.map((theme, i) => <li key={i}
                                                                               className={((this.context.currentTheme === theme) ? 'tinted' : '') + (!SettingsService.isPaid() && (i >= 2) ? 'disabled' : '')}
                                                                               style={{
                                                                                   backgroundColor: getThemes().find((t) => t.name === theme).tColor,
                                                                                   color: getThemes().find((t) => t.name === theme).fontColor
                                                                               }}
                                                                               onClick={() => this.setTheme(theme)}>{theme}</li>)}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                <section>
                    <p className='even-space' onClick={() => this.context.toggleArchiving()}
                       title={'Click To Toggle The Automatic Daily Archiver'}
                       style={{color: getCurrentThemeColors().fontColor}}>
                        Automatic Daily Archiver
                        <span
                            style={{color: getCurrentThemeColors().headerColor}}>{(this.context.autoArchiving) ? 'On' : 'Off'}</span>
                    </p>
                </section>
                <section>
                    <p className='even-space' onClick={() => this.setState({localStorageModel: true})}
                       title={'Click To Toggle The Local Storage'}
                       style={{color: getCurrentThemeColors().fontColor}}>
                        Local Storage
                        <span
                            style={{color: getCurrentThemeColors().headerColor}}>{(this.context.localStorage) ? 'On' : 'Off'}</span>
                    </p>
                </section>
                <section>
                    <p className='even-space' onClick={() => {
                        this.context.toggleDarkMode();
                        document.body.style.backgroundColor = getCurrentThemeColors().pColor;
                    }}
                       title={'Click To Toggle Dark Mode'}
                       style={{color: getCurrentThemeColors().fontColor}}>
                        Dark Mode
                        <span
                            style={{color: getCurrentThemeColors().headerColor}}>{(this.context.darkMode) ? 'On' : 'Off'}</span>
                    </p>
                </section>
                <section>
                    <p className='even-space noselect' onClick={() => this.context.toggleType()}
                       title={'Click To Toggle Through The Types List'}
                       style={{color: getCurrentThemeColors().fontColor}}>
                        Types List
                        <span
                            style={{color: getCurrentThemeColors().headerColor}}>{this.context.typeListSelected}</span>
                    </p>
                </section>
                <section className={'color-style'}>
                    <div>
                        <li>{findTypeColor().colors.map((color, i) => <div key={i}
                                                                           style={{backgroundColor: (getTypeColorsAvailable().includes(i)) ? color : color + '11'}}
                                                                           title={getSpecificType(i)}>
                            <span
                                className={(getTypeColorsAvailable().includes(i)) ? '' : 'hidden'}>{getSpecificType(i)}</span>
                        </div>)} </li>
                        <div>
                            {getTypeColors().map((theme, i) => <li key={i} className={((!SettingsService.isPaid() && i!==0) ? 'disabled' : '')} onClick={() =>
                                this.context.updateColorStyle(theme.type)}>
                                {theme.colors.map((color, j) =>
                                    <div key={i + '' + j}
                                         style={{backgroundColor: (getTypeColorsAvailable().includes(j)) ? color : color + '11'}}/>)}</li>)}
                        </div>
                    </div>
                </section>
                <button className='delete' onClick={() => this.setState({deleteModel: true})}
                        style={{
                            backgroundColor: getCurrentThemeColors().tColor,
                            color: getCurrentThemeColors().fontColor + '77'
                        }}>Suspend
                    Account
                </button>
                {(this.state.deleteModel) ? <DeleteModel closeModel={() => this.setState({deleteModel: false})}/> : ''}
                {(this.state.localStorageModel) ?
                    <LocalStorageModel closeModel={() => this.setState({localStorageModel: false})}
                                       toggleLocal={this.toggleLocal}/> : ''}
            </main>
        )
    }
}

export default Settings;
