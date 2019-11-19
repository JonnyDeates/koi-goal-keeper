import React from 'react';
import "./AddGoal.css";
import GoalList from "../GoalList/GoalList";
import cuid from 'cuid';

class AddGoal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', '5-Year'],
            selectedType: 'Daily',
            currentGoal: {
                type: 'Daily',
                goals: [],
                date: new Date().toISOString()
            }
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    changeDate(type) {
        let tempDate = new Date();
        switch (type) {
            case 'Daily':
                break;
            case 'Weekly':
                tempDate.setDate(tempDate.getDate() + 7);
                break;
            case 'Monthly':
                tempDate.setMonth(tempDate.getMonth() + 1);
                break;
            case 'Quarterly':
                tempDate.setMonth(tempDate.getMonth() + 3);
                break;
            case 'Yearly':
                tempDate.setMonth(tempDate.getMonth() + 12);
                break;
            case '5-Year':
                tempDate.setMonth(tempDate.getMonth() + 5*12);
                break;
            default:
                break;
        }
        this.setState({currentType: type, currentGoal: {date: tempDate.toISOString(), type: type, goals: this.state.currentGoal.goals}})
    }
    handleInput(e){
        this.setState({value: e.target.value})
    }
    handleAdd(e) {
        let {goals, type, date} = this.state.currentGoal;
        let Goals = goals;
        Goals.push({goal: this.state.value, id: cuid(), checked: false});
        this.setState({value: '', currentGoal: {goals: Goals, type: type, date: date}})
        console.log(this.state)
    }
    handleSubmit(e){
        e.preventDefault();
        //this.setState({value: '', goals: [...this.state.goals, {goal: this.state.value, checked: false, id: cuid()} ]});
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>{this.state.currentType}</p>
                <ul>
                    {this.state.types.map((type, i) => <li key={i} onClick={() => this.changeDate(type)}>{type}</li>)}
                </ul>
                <input value={this.state.value} onChange={this.handleInput}/>
                <button onClick={this.handleAdd}>+</button>
                <GoalList showCompleted={false} date={this.state.currentGoal.date} type={this.state.currentGoal.type} goals={this.state.currentGoal.goals}/>
                <div>
                    <button>+</button></div>
            </form>
        )
    }
}

export default AddGoal;