import React from 'react';
import './Home.css';
import GoalList from '../GoalList/GoalList';
class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <h1>Current Goals</h1>
                {this.props.allGoals.length === 0 ? <h2>No Current Goals</h2> : ''}
                {this.props.allGoals.map((Goal, i) => <GoalList key={i} showChecked={true} deleteGoal={this.props.deleteGoal} goalId={Goal.id} handleChecked={this.props.handleChecked}
                                                                isEditable={false} showCompleted={true} goals={Goal.goals} type={Goal.type} date={Goal.date} checkedamt={Goal.checkedamt}/>)}
            </div>
        )
    }
}

export default Home;