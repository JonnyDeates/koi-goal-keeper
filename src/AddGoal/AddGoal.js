import React from 'react';
import "./AddGoal.css";
import GoalList from "../GoalList/GoalList";
import {toast} from 'react-toastify';
import {SettingsContext} from "../Settings/SettingsContext";
import {formatDate, getColor} from "../Utils/Utils";

class AddGoal extends React.Component {
    static contextType = SettingsContext;
    constructor(props) {
        super(props);
        let today = new Date();
        today.setDate(today.getDate()+1);
        this.state = {
            value: '',
            currentGoal: {
                type: 'Daily',
                goals: [],
                date: today.toISOString()
            },
            otherDate: today.toISOString(),
            today
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleObjectiveClone = this.handleObjectiveClone.bind(this);
        this.handleOtherDate = this.handleOtherDate.bind(this);
        this.deleteObjective = this.deleteObjective.bind(this);

    }
    componentDidMount() {
        if(this.props.goalListContext) {
            this.setState({
                currentGoal: this.props.goalListContext.currentGoal,
                handleSubmit: this.props.goalListContext.handleSubmitAdd,
                handleChecked:this.props.goalListContext.handleChecked,
                handleEditGoal:this.props.goalListContext.handleEditCurrentGoal
            });
            setTimeout(()=>this.changeDate(this.props.goalListContext.currentGoal.type),100);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.goalListContext.currentGoal !== this.props.goalListContext.currentGoal) {
            this.setState({currentGoal: {
                type: this.props.goalListContext.currentGoal.type,
                goals: this.props.goalListContext.currentGoal.goals,
                date: this.props.goalListContext.currentGoal.date
            }})
        }
    }

    changeDate(type) {
        let tempDate = new Date();
        switch (type) {
            case 'Other':
                tempDate = new Date(this.state.otherDate);
                break;
            case 'Daily':
                tempDate.setDate(tempDate.getDate() + 1);
                break;
            case 'Weekly':
                tempDate.setDate(tempDate.getDate() + 7);
                break;
            case 'BiWeekly':
                tempDate.setDate(tempDate.getDate() + (7 * 2));
                break;
            case 'Monthly':
                tempDate.setMonth(tempDate.getMonth() + 1);
                break;
            case 'Quarterly':
                tempDate.setMonth(tempDate.getMonth() + 3);
                break;
            case '6-Month':
                tempDate.setMonth(tempDate.getMonth() + 6);
                break;
            case 'Yearly':
                tempDate.setMonth(tempDate.getMonth() + 12);
                break;
            case '3-Year':
                tempDate.setMonth(tempDate.getMonth() + (3 * 12));
                break;
            case '5-Year':
                tempDate.setMonth(tempDate.getMonth() + (5 * 12));
                break;
            case '10-Year':
                tempDate.setMonth(tempDate.getMonth() + (10 * 12));
                break;
            case '25-Year':
                tempDate.setMonth(tempDate.getMonth() + (25 * 12));
                break;
            case 'Distant':
                tempDate.setMonth(tempDate.getMonth() + (50 * 12));
                break;
            default:
                tempDate.setDate(tempDate.getDate());
                break;
        }
        this.props.goalListContext.handleGoalAdd({date: tempDate.toISOString(), type, goals: this.state.currentGoal.goals});
    }
    deleteObjective(neat, ID) {
        let newGoals = this.props.goalListContext.goals.filter(g => g.id !== ID);
        newGoals.forEach((goal, i) => goal.id = i);
        toast.warn('Objective Deleted', {autoClose: 2000});
        let newGL = {type: this.state.currentGoal.type, date: this.state.currentGoal.date, goals: newGoals};
        this.setState({currentGoal: newGL});
        this.props.goalListContext.handleGoalAdd(newGL);
    }

    handleInput(e) {
        this.setState({value: e.target.value})
    }

    handleAdd(e) {
        let {goals, type, date} = this.props.goalListContext.currentGoal;
        if(this.state.value.trim() === '') {
            toast.warn(`Can't Add Empty Objective`);
        } else {
            let objective = {obj: this.state.value.trim(), id: goals.length};
            goals.push(objective);
            this.setState({value: ''});
            this.props.goalListContext.handleGoalAdd({date,type, goals: this.state.currentGoal.goals})
        }
    }

    handleObjectiveClone(neat, ID){
        let GoalList = this.props.goalListContext.currentGoal;
        let obj = {obj: GoalList.goals.find(goal=> goal.id === ID).obj, id: this.props.goalListContext.currentGoal.goals.length};
        GoalList.goals.push(obj);
        this.props.goalListContext.handleGoalAdd(GoalList);
        toast.success(`Objective Cloned`);
        this.setState({value: ''});
    }
    handleOtherDate(e) {
        let tempDate = new Date(e.target.value);
        try {
            let {goals, type} = this.props.goalListContext.currentGoal;
            this.setState({otherDate: tempDate.toISOString()});
            tempDate.setDate(tempDate.getDate()+1);
            this.props.goalListContext.handleGoalAdd({type, goals, date: tempDate.toISOString()});
        } catch (e) {
            return;
        }
    }

    render() {
        return (
            <form className='add-goal' onSubmit={this.state.handleSubmit}>
                <h1> Create {this.state.currentGoal.type} Goal </h1>
                <div className='bar-indicator-top' style={getColor(this.context.currentType)}/>
                <div className="addition-wrapper">
                    <div className='dropdown-types'>
                        <li>{this.state.currentGoal.type}<div className='bar-indicator-left' style={getColor(this.state.currentGoal.type)}/>
                            <div className='bar-indicator-right' style={getColor(this.state.currentGoal.type)}/></li>
                        <ul className='dropdown-list'>
                            {['Other',...this.context.types].map((type, i) => <li key={i}
                                                                   className={(this.state.currentGoal.type === type) ? 'tinted' : ''}
                                                                   onClick={() => this.changeDate(type)}>{type}
                                                                   <div className='bar-indicator-left' style={getColor(type)}/>
                                                                   <div className='bar-indicator-right' style={getColor(type)}/></li>)}
                        </ul>
                    </div>
                    {(this.state.currentGoal.type === 'Other') ? <input className={'date-input'} type='date'
                                                                        value={formatDate(new Date(this.state.otherDate))} min={formatDate(this.state.today)} onChange={this.handleOtherDate} /> : ''}
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
                    <button type='submit' onClick={(e)=> this.state.handleSubmit(e)} onKeyPress={e => {
                        if (e.key === 'Enter') e.preventDefault();
                    }}>Add Goal
                    </button>
                </div>
                {this.state.currentGoal.goals.length === 0 ? <div className='example-add'>Growth Worthy Goal</div> : ''}
                <GoalList goalId={this.state.currentGoal.id} isEditable={true} showCompleted={false}
                          date={this.state.currentGoal.date} type={this.state.currentGoal.type}
                          showChecked={false} handleChecked={this.state.handleChecked} handleEditGoal={this.state.handleEditCurrentGoal}
                          showDelete={true} handleObjectiveClone={this.handleObjectiveClone}
                          deleteGoal={this.deleteObjective} goals={this.state.currentGoal.goals}/>

            </form>
        )
    }
}

export default AddGoal;