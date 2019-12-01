import React from 'react';
import './GoalList.css'
import GoalItem from "./GoalItem/GoalItem";


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
        deleteGoal: this.props.deleteGoal,
        past: this.props.past,
        checkedamt: this.props.checkedamt
    };

    constructor(props) {
        super(props);
        this.handleGoal = this.handleGoal.bind(this);
        this.handleEditGoal = this.handleEditGoal.bind(this);

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.type !== this.props.type) {
            this.setState({type: this.props.type})
        }
        if(prevProps.date !== this.props.date) {
            this.setState({date: this.props.date})
        }
        if(prevProps.goals !== this.props.goals) {
            this.setState({goals: this.props.goals})
        }
        if(prevProps.checkedamt !== this.props.checkedamt) {
            this.setState({checkedamt: this.props.checkedamt})
        }
    }
    handleGoal(e) {
        this.setState({value: e.target.value})
    }
    handleEditGoal(e, ID) {
        let goalIndex = this.state.goals.findIndex(g => g.id === ID);
        let newGoal = this.state.goals.find(g => g.id === ID);
        newGoal.goal = e.target.value;
        let Goals = this.state.goals;
        Goals.splice(goalIndex, 1, newGoal);
        this.setState({goals: Goals})
    }


    render() {
        return (
            <div className="goallist">

                {(this.state.showCompleted) ? <p>Completed: {this.state.checkedamt}</p> : ''}
                <div className="goallist-title">
                    <span>{this.state.type}</span>
                    <span>Complete By {new Date(this.state.date).toLocaleDateString()}</span>
                </div>
                <div>
                    {this.state.goals.map((goal, i) => <GoalItem key={i} goalId={this.state.goalId} goal={goal.goal} checked={goal.checked}
                                                                 handleChecked={this.props.handleChecked} id={goal.id}
                                                                 bgColor={(i % 2) ? 'tinted' : ''}
                                                                 isEditable={this.state.isEditable}
                                                                 handleEditGoal={this.handleEditGoal}
                                                                 deleteGoal={this.state.deleteGoal}
                                                                 showChecked={this.state.showChecked}
                                                                 past={this.state.past}
                    />)}
                </div>
            </div>
        );
    }

}


export default GoalList;

