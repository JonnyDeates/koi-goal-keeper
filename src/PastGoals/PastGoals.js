import React from 'react';
import GoalList from "../GoalList/GoalList";

class PastGoals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type
        }
    }
    render(){
        return (<div>
            <h1>{this.state.type}</h1>
            {this.props.pastGoals.map((pg,i)=><GoalList key={i} goalId={pg.id} deleteGoal={this.props.deleteGoal} showChecked={false}
                                                        isEditable={false} showCompleted={false} date={pg.date} type={pg.type}
                                                        goals={pg.goals} past={true}/>)}
        </div>);
    }
}
export default PastGoals;