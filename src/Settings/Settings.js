import React from 'react';
import './Settings.css';
import {SettingsContext} from "./SettingsContext";
import {toast} from "react-toastify";
import {getColor, getCurrentThemeColors, getThemes} from "../Utils/Utils";
import DeleteModel from "./DeleteModel/DeleteModel";

class Settings extends React.Component {
    static contextType = SettingsContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedNotification: 'All',
            isUsernameEditable: false,
            deleteModel: false,
            newNickname: ''
        };
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
                    <h2 title={'UserId'} style={{color: getCurrentThemeColors().headerColor}}>{this.context.username}</h2>
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
                <div className={'even-space theme-list-wrapper'}>
                    <label title={'Theme'} style={{color: getCurrentThemeColors().fontColor}}>Theme</label>
                    <section className={'theme-list'}>
                        <div className={'dropdown-wrapper'}>
                            <div className='dropdown-types dropdown-types-settings'
                                 style={{backgroundColor: getCurrentThemeColors().tColor, color: getCurrentThemeColors().fontColor}}>
                                <span>{this.context.theme}</span>
                                <ul className={'dropdown-list'}>
                                    {this.context.themes.map((theme, i) => <li key={i}
                                                                               className={(this.context.currentTheme === theme) ? 'tinted' : ''}
                                                                               style={{backgroundColor:  getThemes().find((t)=> t.name === theme).tColor,
                                                                                   color: getThemes().find((t)=> t.name === theme).fontColor}}
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
                            style={{color: getCurrentThemeColors().headerColor}}>{(this.context.autoArchiving) ? 'On' : 'Off'}</span></p>
                </section>
                <section>
                    <p className='even-space' onClick={() => this.context.toggleDarkMode()}
                       title={'Click To Toggle Dark Mode'}
                       style={{color: getCurrentThemeColors().fontColor}}>
                        Dark Mode
                        <span
                            style={{color: getCurrentThemeColors().headerColor}}>{(this.context.darkMode) ? 'On' : 'Off'}</span></p>
                </section>
                <section>
                    <p className='even-space noselect' onClick={() => this.context.toggleType()}
                       title={'Click To Toggle Through The Types List'} style={{color: getCurrentThemeColors().fontColor}}>
                        Types List
                        <span
                            style={{color: getCurrentThemeColors().headerColor}}>{this.context.typeListSelected}</span></p>
                </section>
                <button className='delete' onClick={() => this.setState({deleteModel: true})}
                        style={{backgroundColor: getCurrentThemeColors().tColor, color: getCurrentThemeColors().fontColor+'77'}}>Suspend
                    Account
                </button>
                {(this.state.deleteModel) ? <DeleteModel closeModel={() => this.setState({deleteModel: false})}/> : ''}
            </main>
        )
    }
}

export default Settings;
