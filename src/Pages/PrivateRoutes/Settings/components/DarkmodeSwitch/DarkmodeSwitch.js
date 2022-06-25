
import './DarkmodeSwitch.css'
import {blendColors} from "../../../../../Utils/Utils";
import {SettingsConsumer} from "../../../../../Contexts/SettingsContext";

const DarkmodeSwitch = ({color}) => {
    const containerStyle = (value) => ({backgroundColor: blendColors(color.backgroundColor, !value ? '#ffffff' : '#000000',.5)})

    return <SettingsConsumer>{({state, dispatch}) => (
        <div className='darkmode-wrapper'>
            <input type="checkbox" id="darkmode-switch" className="darkmode-input"
               onChange={()=> dispatch({type: "toggleSetting", darkmode: state.darkmode})} checked={state.darkmode}/>
            <label className="darkmode-container"  htmlFor="darkmode-switch" style={containerStyle(state.darkmode)}>
                <span className="darkmode-switch-bg"/>
            </label>
    </div>)}
    </SettingsConsumer>
}
export default DarkmodeSwitch;