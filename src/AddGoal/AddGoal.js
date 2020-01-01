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
            currentGoal: this.props.currentGoal,
            deleteGoal: this.props.deleteGoalAdd,
            handleSubmit: this.props.handleSubmit,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.currentGoal !== this.props.currentGoal) {
            this.setState({currentGoal: this.props.currentGoal})
        }
    }

    changeDate(type) {
        let tempDate = new Date();
        switch (type) {
            case 'Daily':
                tempDate.setDate(tempDate.getDate() + 1);
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
                tempDate.setDate(tempDate.getDate() + 1);
                break;
        }
        this.props.changeSelectedType(type);
        this.props.handleGoalAdd({date: tempDate.toISOString(), type: type, goals: this.state.currentGoal.goals});
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




    render() {
        return (
            <form className='add-goal' onSubmit={this.state.handleSubmit}>
                <h1> Create Goal </h1>
                <div className="addition-wrapper">
                    <div className='dropdown-types'>
                        <p>{this.props.selectedType}</p>
                        <ul className='dropdown-list'>
                            {this.props.types.map((type, i) => <li key={i}
                                                                   className={(this.props.selectedType === type) ? 'tinted' : ''}
                                                                   onClick={() => this.changeDate(type)}>{type}</li>)}
                        </ul>
                    </div>
                    <section className='add-input'>
                        <input value={this.state.value} onChange={this.handleInput} onKeyPress={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                this.handleAdd(e);
                            }
                        }}/>
                        <div className='even-space'>
                            <button onClick={() => this.setState({value: ''})}
                                    type='button'>Cancel
                            </button>
                            <button onClick={this.handleAdd} type='button'>Submit</button>
                        </div>
                    </section>
                </div>
                <div className='submit-goals' >
                    <button type='submit' onClick={this.handleSubmit} onKeyPress={e => {
                        if (e.key === 'Enter') e.preventDefault();
                    }}>Add Goal
                    </button>
                </div>
                <GoalList goalId={this.state.currentGoal.id} isEditable={true} showCompleted={false}
                          date={this.state.currentGoal.date} type={this.state.currentGoal.type}
                          showChecked={false} handleChecked={this.props.handleChecked}
                          deleteGoal={this.state.deleteGoal} goals={this.state.currentGoal.goals}/>

            </form>
        )
    }
}

export default AddGoal;