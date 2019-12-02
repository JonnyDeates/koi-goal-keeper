import React from 'react';
import "./AddGoal.css";
import GoalList from "../GoalList/GoalList";
import cuid from 'cuid';
import {toast} from 'react-toastify';

class AddGoal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            types: this.props.types,
            selectedType: 'Daily',
            currentGoal: {
                type: 'Daily',
                goals: [],
                date: new Date().toISOString()
            }
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
                tempDate.setMonth(tempDate.getMonth() + 5 * 12);
                break;
            default:
                break;
        }
        this.setState({
            selectedType: type,
            currentGoal: {date: tempDate.toISOString(), type: type, goals: this.state.currentGoal.goals}
        })
    }

    deleteGoal(neat, ID) {
        let newGoals = this.state.currentGoal.goals.filter(g => g.id !== ID);
        toast.warn('Objective Deleted', {autoClose: 2000})
        this.setState({
            currentGoal: {
                type: this.state.currentGoal.type, date: this.state.currentGoal.date,
                goals: newGoals
            }
        })
    }

    handleInput(e) {
        this.setState({value: e.target.value})
    }

    handleAdd(e) {
        let {goals, type, date} = this.state.currentGoal;
        let Goals = goals;
        if(this.state.value.trim() === '') {
            toast.warn(`Can't Add Empty Objective`);
        } else if(this.state.value.includes('"')) {
            toast.warn(`Can't Add the Objective due to ""`);
        } else {
            Goals.push({goal: this.state.value.trim(), id: cuid(), checked: false});
            this.setState({value: '', currentGoal: {goals: Goals, type: type, date: date}});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.currentGoal.goals.length > 0) {
            this.props.addGoal(this.state.currentGoal);
            toast.success(`${this.state.currentGoal.type} Goal Added!`);
            this.setState({
                currentGoal: {
                    type: 'Daily',
                    goals: [],
                    date: new Date().toISOString()
                }
            });
        } else {
            toast.error(`The ${this.state.currentGoal.type} Goal is Missing Objectives.`)
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1> Create Goal </h1>
                <div className="addition-wrapper">
                    <div className='dropdown-types'>
                        <p>{this.state.selectedType}</p>
                        <ul>
                            {this.state.types.map((type, i) => <li key={i}
                                                                   className={(this.state.selectedType === type) ? 'tinted' : ''}
                                                                   onClick={() => this.changeDate(type)}>{type}</li>)}
                        </ul>
                    </div>
                    <div className='add-input'>
                        <input value={this.state.value} onChange={this.handleInput} onKeyPress={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                this.handleAdd(e);
                            }
                        }}/>
                        <button type="button" onClick={this.handleAdd}>+</button>
                    </div>
                </div>
                <GoalList goalId={this.state.currentGoal.id} isEditable={true} showCompleted={false}
                          date={this.state.currentGoal.date} type={this.state.currentGoal.type}
                          showChecked={false} handleChecked={this.props.handleChecked}
                          deleteGoal={this.deleteGoal} goals={this.state.currentGoal.goals}/>
                <div>
                    <button className='submit-goals' type='submit' onClick={this.handleSubmit} onKeyPress={e => {
                        if (e.key === 'Enter') e.preventDefault();
                    }}>+
                    </button>
                </div>
            </form>
        )
    }
}

export default AddGoal;