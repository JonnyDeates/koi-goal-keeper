import React from 'react';
import './GoalList.css'
import GoalItem from "./GoalItem/GoalItem";
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
        if(prevProps.goalId !== this.props.goalId) {
            this.setState({goalId: this.props.goalId})
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


                <div className="goallist-title">
                    <p>{this.state.type}</p>
                    <p>{new Date(this.state.date).toLocaleDateString()}</p>
                    {(this.state.checkedamt === this.state.goals.length && !this.state.past) ? <img src={pushIco} alt="Push Goals" width='50px' height='50px' onClick={()=> this.props.pushGoal(this.state.goalId)}/> : <></>}
                    {(this.state.showCompleted) ? <p>{this.state.checkedamt}</p> : ''}
                </div>
                <ul>
                    {this.state.goals.map((goal, i) => <GoalItem key={i} goalId={this.state.goalId} goal={goal.goal} checked={goal.checked}
                                                                 handleChecked={this.props.handleChecked} id={goal.id}
                                                                 bgColor={(i % 2) ? 'tinted' : ''}
                                                                 isEditable={this.state.isEditable}
                                                                 handleEditGoal={this.handleEditGoal}
                                                                 deleteGoal={this.state.deleteGoal}
                                                                 showChecked={this.state.showChecked}
                                                                 past={this.state.past}
                    />)}
                </ul>
            </div>
        );
    }

}


export default GoalList;

