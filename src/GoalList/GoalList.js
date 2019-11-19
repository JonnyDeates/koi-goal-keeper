import React from 'react';
import './GoalList.css'
import GoalItem from "./GoalItem/GoalItem";


class GoalList extends React.Component {
    state = {
        value: '',
        type: this.props.type,
        date: this.props.date,
        goals: this.props.goals,
        showCompleted: this.props.showCompleted,
        checkedAmt: 0
    };

    constructor(props) {
        super(props);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleGoal = this.handleGoal.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
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
    }

    handleChecked(ID) {
        let {goal, checked, id} = this.state.goals.find(g => g.id === ID);
        let index = this.state.goals.findIndex((g) => g.id === id);
        let newGoals = this.state.goals.filter(g => g.id !== id);
        newGoals.splice(index, 0, {goal: goal, checked: !checked, id: id});
        if (checked) {
            this.setState({goals: newGoals, checkedAmt: this.state.checkedAmt - 1})
        } else {
            this.setState({goals: newGoals, checkedAmt: this.state.checkedAmt + 1})
        }
    }

    handleGoal(e) {
        this.setState({value: e.target.value})
    }

    deleteGoal(ID) {
        let {checked, id} = this.state.goals.find(g => g.id === ID);
        if (checked) {
            this.setState({goals: this.state.goals.filter(g => g.id !== id), checkedAmt: this.state.checkedAmt - 1})
        } else {
            this.setState({goals: this.state.goals.filter(g => g.id !== id), checkedAmt: this.state.checkedAmt})
        }
    }

    render() {
        return (
            <div className="goallist">
                {(this.state.showCompleted) ? <p>Completed: {this.state.checkedAmt}</p> : ''}
                <div className="goallist-title">
                    <span>{this.state.type}</span>
                    <span>{this.state.date}</span>
                </div>
                <div>
                    {(this.state.goals) ? this.state.goals.map((goal, i) => <GoalItem key={i} goal={goal.goal} checked={goal.checked}
                                                                 handleChecked={this.handleChecked} id={goal.id}
                                                                 bgColor={(i % 2) ? 'tinted' : ''}
                                                                 deleteGoal={this.deleteGoal}/>) : ''}
                </div>
            </div>
        );
    }

}


export default GoalList;

