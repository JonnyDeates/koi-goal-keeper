import React from 'react';
import './GoalList.css'
import GoalItem from "./GoalItem/GoalItem";
import {getColor} from '../Utils/Utils';
const pushIco = require("../assets/icons/push.ico");

class GoalList extends React.Component {
    state = {
        value: '',
        type: this.props.type,
        date: this.props.date,
        goals: this.props.goals,
        goalId: this.props.goalId,
        showCompleted: this.props.showCompleted,
        isEditable: this.props.isEditable,
        showChecked: this.props.showChecked,
        showDelete: this.props.showDelete,
        compacted: this.props.compacted,
        deleteGoal: this.props.deleteGoal,
        past: this.props.past,
        checkedamt: this.props.checkedamt
    };

    constructor(props) {
        super(props);
        this.handleGoal = this.handleGoal.bind(this);

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props) {
            this.setState({
                type: this.props.type,
                date: this.props.date,
                goals: this.props.goals,
                goalId: this.props.goalId,
                showCompleted: this.props.showCompleted,
                isEditable: this.props.isEditable,
                showChecked: this.props.showChecked,
                showDelete: this.props.showDelete,
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
        return (
            <div className={this.state.compacted + " goallist"}>
                <div className={'goallist-title'}>
                    <p>{this.state.type}</p>
                    <p>{new Date(this.state.date).toLocaleDateString()}</p>
                    {(this.state.checkedamt === this.state.goals.length && !this.state.past) ? <img src={pushIco} alt="Push Goals" width='50px' height='50px' onClick={()=> this.props.pushGoal(this.state.goalId)}/> : <></>}
                    {(this.state.showCompleted && this.state.goals.length > 1) ? <p>{this.state.checkedamt}</p> : ''}
                    <div className='circle-indicator' style={getColor(this.state.type)}/>
                </div>
                <ul>
                    {this.state.goals.map((goal, i) => <GoalItem key={i} goalId={this.state.goalId} goal={goal.obj} checked={goal.checked}
                                                                 handleChecked={this.props.handleChecked} id={goal.id}
                                                                 bgColor={(i % 2) ? 'tinted' : ''}
                                                                 isEditable={this.state.isEditable}
                                                                 handleEditGoal={this.props.handleEditGoal}
                                                                 deleteGoal={this.state.deleteGoal}
                                                                 showChecked={this.state.showChecked}
                                                                 showDelete={this.state.showDelete}
                                                                 past={this.state.past}
                                                                 handleObjectiveClone={this.props.handleObjectiveClone}

                    />)}
                </ul>
            </div>
        );
    }

}


export default GoalList;

