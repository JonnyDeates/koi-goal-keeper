import React from 'react';
import './GoalList.css'
import './Compacted.css'
import GoalItem from "./GoalItem/GoalItem";
import {getColor, getCurrentThemeColors} from '../../Utils/Utils';
const pushIco = require("../../assets/icons/push.svg");
const addIco = require("../../assets/icons/plus.svg");
const copyIcon = require("../../assets/icons/copy.svg");
const trashIco = require("../../assets/icons/trash.svg");

class GoalList extends React.Component {
    state = {
        value: '',
        type: '',
        date: '',
        goals: [],
        goalId: '',
        showCompleted: false,
        showCloneGoalList: false,
        isEditable: false,
        showChecked: false,
        showDelete: false,
        showDeleteGoalList: true,
        showAdd: false,
        compacted: '',
        deleteGoal: '',
        past: false,
        checkedamt: 0,
    };

    constructor(props) {
        super(props);
        this.handleGoal = this.handleGoal.bind(this);

    }
    componentDidMount(){
        if(!!this.props.goals) {
            this.setState({
                type: this.props.type,
                date: this.props.date,
                goals: this.props.goals,
                goalId: this.props.goalId,
                showCloneGoalList: this.props.showCloneGoalList,
                showCompleted: this.props.showCompleted,
                isEditable: this.props.isEditable,
                showChecked: this.props.showChecked,
                showDelete: this.props.showDelete,
                showDeleteGoalList: this.props.showDeleteGoalList,
                compacted: this.props.compacted,
                deleteGoal: this.props.deleteGoal,
                past: this.props.past,
                checkedamt: this.props.checkedamt,
                showAdd: this.props.showAdd,
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props) {
            this.setState({
                type: this.props.type,
                date: this.props.date,
                goals: this.props.goals,
                goalId: this.props.goalId,
                showCloneGoalList: this.props.showCloneGoalList,
                showCompleted: this.props.showCompleted,
                isEditable: this.props.isEditable,
                showChecked: this.props.showChecked,
                showDelete: this.props.showDelete,
                showDeleteGoalList: this.props.showDeleteGoalList,
                compacted: this.props.compacted,
                deleteGoal: this.props.deleteGoal,
                past: this.props.past,
                checkedamt: this.props.checkedamt})
        }
    }

    handleGoal(e) {
        this.setState({value: e.target.value})
    }


    render() {
        let completed = this.state.checkedamt === this.state.goals.length;
        let checked = this.state.checkedamt >= 1;
        return (
            <div className={this.state.compacted + " goallist"}>
                <div className={'goallist-title'} style={{backgroundColor: getCurrentThemeColors().tColor,color: getCurrentThemeColors().fontColor}}>
                    <p>{this.state.type}</p>
                    <p style={{backgroundColor: getCurrentThemeColors().tColor}}>{new Date(this.state.date).toLocaleDateString()}</p>
                    {this.state.showDelete && this.state.compacted === 'No' && this.state.showDeleteGoalList
                        ? <img className="goallist-trash" src={trashIco} alt='Delete Goal-list' title="Delete All Objectives"
                                style={getColor(this.state.type)} onClick={()=>this.props.deleteGoalList(this.state.goalId)}/> : ''}
                    {this.state.showCloneGoalList && this.state.compacted === 'No'
                        ? <img className="goallist-clone" src={copyIcon} alt='Clone Goal-list' title="Clone All Objectives"
                        style={getColor(this.state.type)} onClick={()=>this.props.handleGoalListClone(this.state.goalId)}/> : ''}
                    <div className="circle-indicator-wrapper"><div className='circle-indicator' style={getColor(this.state.type)}/></div>
                </div>

                {this.state.goals !== 0 && (checked && !this.state.past)
                    ? <img src={pushIco} alt="Push Goals" title={'Archive Goal'} className={'goallist-push'}
                            style={{backgroundColor: completed ? getColor(this.state.type).backgroundColor : getCurrentThemeColors().tColor+'66',
                            animation: completed ? '1s ease infinite pulse' : '',

                        }}
                        onClick={()=> this.props.pushGoal(this.state.goalId)}/>
                    : ''}
                {(this.state.showCompleted && (this.state.goals.length > 1 || this.state.compacted !== 'Ultra Compacted')  && checked)
                    ? <p className={'goallist-count'} style={{backgroundColor: getColor(this.state.type).backgroundColor,
                        color: getCurrentThemeColors().headerColor}}>{this.state.checkedamt}
                        {(this.state.compacted === 'Ultra-Compacted') ? ('/' + this.state.goals.length) : ''}</p> : ''}
                <ul >
                    {this.state.goals.map((goal, i) => <GoalItem key={i} goalId={this.state.goalId} goal={goal.obj} checked={goal.checked} newObj={ (typeof goal.newObj === 'boolean' ? goal.newObj : false)}
                                                                handleChecked={this.props.handleChecked} id={goal.id}
                                                                bgColor={(i % 2) ? getCurrentThemeColors().tColor+'bb' : getCurrentThemeColors().tColor+'99'}
                                                                fontColor={getCurrentThemeColors().fontColor}
                                                                isEditable={this.state.isEditable} className={i === (this.state.goals.length-1) ? 'last-goal' : ''}
                                                                handleEditGoal={this.props.handleEditGoal}
                                                                deleteGoal={this.state.deleteGoal}
                                                                showChecked={this.state.showChecked}
                                                                showDelete={this.state.showDelete}
                                                                past={this.state.past} compacted={this.state.compacted}
                                                                handleObjectiveClone={this.props.handleObjectiveClone}

                    />)}
                    {this.state.showAdd ? <button className={'add-button'} onClick={()=>this.props.handleAddObjective(this.state.goalId)}
                                                style={{backgroundColor: getCurrentThemeColors().tColor+'66', color: getCurrentThemeColors().headerColor}}>
                        <img src={addIco} alt={'+'} width={'20px'} height={'20px'}
                        /></button> : ''}
                </ul>

            </div>
        );
    }

}


export default GoalList;

