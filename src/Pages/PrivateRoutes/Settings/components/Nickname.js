import React, {useEffect, useState} from "react";
import {handleEnter} from "../../../../Utils/Utils";
import {getAccentColor} from "../../../../Utils/Theming";
import {useTheme} from "../SettingsContext";


const Nickname = ({nickname, dispatch}) => {

    const [newNickname, setNewNickname] = useState('')
    const [error, setError] = useState(null)
    const [isEditable, setIsEditable] = useState(false);
    const toggleIsEditable = () => setIsEditable(!isEditable)

    const handleNickname = (e) => {
        setNewNickname(e.target.value)
    }
    const submitNickname = (e) => {
        e.preventDefault();
        if (newNickname.trim().length > 0) {
            const callback = (res) => {
                if(!res.ok){
                    return setError(res.json().error)
                }
            }
            dispatch({value: newNickname, type: 'patchUserNickname', callback});
            setNewNickname('')
            setError(null)
            toggleIsEditable();
            // toast.success(`Nickname changed to: ${this.state.newNickname}`)
        } else {
            setError('No Nickname Entered')
        }

    }

    useEffect(()=> {
        setNewNickname(nickname)
    }, [nickname])

    const currentTheme = useTheme();
    const accentColor = {backgroundColor: getAccentColor(currentTheme)};

    return isEditable
        ? <form onSubmit={submitNickname}>
            <label className='setting-label'
                   title={'Nickname'}>Nickname:
                <input type='text' onChange={handleNickname}
                       value={newNickname} title={'New Nickname Input'}
                       onKeyPress={e => handleEnter(e, submitNickname)}/> </label>
            {error && <p className='error'>{error}</p>}
            <div className='setting-buttons'>
                <button onClick={toggleIsEditable} style={accentColor} className={'cancel'}
                        type='button' title={'Cancel Nickname Changes'}>Cancel
                </button>
                <button className={'submit'} style={accentColor} type='submit' title={'Submit Changes'}>Submit</button>
            </div>
        </form>
        : <p className='setting-label' title={'Click to Change Nickname'} onClick={toggleIsEditable}>
            Nickname:
            <span title={nickname}>{nickname}</span>
        </p>
}

export default Nickname