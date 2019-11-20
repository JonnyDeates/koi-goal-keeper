import React from 'react';
import './Home.css';
import GoalList from '../GoalList/GoalList';
class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{'.'}</h1>
                <h1>Current Goals</h1>
                {this.props.allGoals.map((Goal, i) => <GoalList key={i} showChecked={true} deleteGoal={this.props.deleteGoal} goalId={Goal.id} handleChecked={this.props.handleChecked}
                                                                isEditable={true} showCompleted={true} goals={Goal.goals} type={Goal.type} date={Goal.date}/>)}
            </div>
        )
    }
}

export default Home;