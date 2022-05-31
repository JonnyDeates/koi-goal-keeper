import React, {Component} from 'react'
import {SettingsContext} from "../../Pages/PrivateRoutes/Settings/SettingsContext";
import {getCurrentThemeColors} from "../../Utils/Utils";
import './SortFilter.css'
export default class SortFilter extends Component {
    static contextType = SettingsContext;

    render(){
        return <section style={{color: getCurrentThemeColors().fontColor}} className='even-space noselect sort'
        ><div style={{display: 'inline-flex'}} onClick={()=> this.props.updateGoals(this.context.toggleSortStyle)}>Sort</div>
            <span onClick={()=> this.props.updateGoals(this.context.toggleSortStyle)}
                style={{color: getCurrentThemeColors().headerColor}}>{this.context.sortStyle}
            </span>
            {this.context.sortStyle !== 'No' ? <div className={'ascending-btns'} onClick={()=> this.props.updateGoals(this.context.toggleAscending)}>
                <button style={{backgroundColor: !this.context.ascending ? 'rgba(117, 232, 139, 0.67)' : '#ffb9baaa', filter: this.context.ascending ? 'opacity(0.5)' : ''}}>ASC</button>
                <button style={{backgroundColor: this.context.ascending ? 'rgba(117, 232, 139, 0.67)' : '#ffb9baaa',
                    filter: !this.context.ascending ? 'opacity(0.5)' : ''
                }}>DES</button> 
            </div>: ''}</section>
    }
}