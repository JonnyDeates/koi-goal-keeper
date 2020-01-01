import React from 'react';
import './Home.css';
import GoalList from '../GoalList/GoalList';
import {SettingsContext} from "../Settings/SettingsContext";
class Home extends React.Component {
    static contextType = SettingsContext;
    render() {
        return (
            <main className="home">
                <h1>{this.context.nickname}'s Goals </h1>
                {this.props.allGoals.length === 0 ? <h2>No Current Goals</h2> : ''}
                {this.props.allGoals.map((Goal, i) => <GoalList key={i} showChecked={true} deleteGoal={this.props.deleteGoal} pushGoal={this.props.pushGoal} goalId={Goal.id} handleChecked={this.props.handleChecked}
                                                                isEditable={false} showCompleted={true} goals={Goal.goals} type={Goal.type} date={Goal.date} checkedamt={Goal.checkedamt}/>)}
            </main>
        )
    }
}

export default Home;