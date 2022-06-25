import React, { useState} from "react";
import {handleEnter as handleSubmitEnter, handleNextFocusEnter as handleEnter} from "../../../../Utils/Utils";
import {getAccentColor} from "../../../../Utils/Theming";
import Eye from "../../../../assets/icons/eye.svg"
import {useTheme} from "../SettingsContext";
import AuthApiService from "../../../../services/database/auth-api-service";

const Password = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newCheckPassword, setNewCheckPassword] = useState('')
    const [isVisible, setVisibility] = useState(false)
    const [error, setError] = useState(null)
    const [isEditable, setIsEditable] = useState(false);
    const toggleIsEditable = () => setIsEditable(!isEditable)

    const handleOldPassword = (e) => setOldPassword(e.target.value)
    const handleNewPassword = (e) => setNewPassword(e.target.value)
    const handleNewCheckPassword = (e) => setNewCheckPassword(e.target.value)
    const toggleVisiblity = () => setVisibility(!isVisible)

    const submitPassword = (e) => {
        e.preventDefault();
        if (oldPassword.trim().length > 0 && newPassword.trim().length > 0 && newCheckPassword.trim().length > 0) {
           if(newPassword === newCheckPassword) {
               const callback = (res) => {
                   if (!res.ok) {
                       return setError(res.error)
                   }
               }
               AuthApiService.patchPassword({oldPassword, password: newPassword})
                   .then((res)=> {
                       if(res.ok){
                           setOldPassword('')
                           setNewPassword('')
                           setNewCheckPassword('')
                           setError(null)
                           toggleIsEditable();
                       } else {
                           return res.json()
                       }
                   })
                   .then(body => body ? setError(body.error) : '')
                   .catch(callback)

               // toast.success(`Nickname changed to: ${this.state.newNickname}`)
           } else {
               setError('New Passwords do not Match')
           }
        } else {
            setError('No Password Entered')
        }

    }

    const currentTheme = useTheme();
    const accentColor = {backgroundColor: getAccentColor(currentTheme)};

    const type = isVisible ? 'text' : 'password';

    return isEditable
        ? <form onSubmit={submitPassword}>
            <label className='setting-label'
                   title={'Old Password'}>Old Password:
                <input type={type} onChange={handleOldPassword}
                       value={oldPassword} title={'Old Password Input'}
                       onKeyPress={handleEnter}/> </label>
            <label className='setting-label'
                   title={'New Password'}>New Password:
                <input type={type}  onChange={handleNewPassword}
                       value={newPassword} title={'New Password Input'}
                       onKeyPress={handleEnter}/> </label>
            <label className='setting-label'
                   title={'New Password Check'}>Check New Password:
                <input type={type}  onChange={handleNewCheckPassword}
                       value={newCheckPassword} title={'New Password Check Input'}
                       onKeyPress={e => handleSubmitEnter(e, submitPassword)}/> </label>
            {error && <p className='error'>{error}</p>}
            <div className='setting-buttons'>
                <button onClick={toggleIsEditable} style={accentColor} className={'cancel'}
                        type='button' title={'Cancel Nickname Changes'}>Cancel
                </button>
                <button  style={accentColor} type='button' onClick={toggleVisiblity} className={'visibility'} ><img src={Eye} title={'Show Passwords'} alt={'Show Passwords'}/></button>
                <button className={'submit'} style={accentColor} type='submit' title={'Submit Changes'}>Submit</button>
            </div>
        </form>
        : <p className='setting-label' title={'Click to Change Password'} onClick={toggleIsEditable}>
            Password:
            <span title={'Click to Change Password'}>******</span>
        </p>
}

export default Password