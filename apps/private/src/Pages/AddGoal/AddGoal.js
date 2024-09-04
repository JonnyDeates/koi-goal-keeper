import React from 'react';
import "./AddGoal.css";
import GoalList from "../../Components/GoalList/GoalList";
import {toast} from 'react-toastify';
import {SettingsContext} from "../Settings/SettingsContext";
import {formatDate, getColor, getCurrentThemeColors, getTime} from "../../Utils/Utils";
import TryPremium from "../../Components/Checkout/TryPremium";

class AddGoal extends React.Component {
    static contextType = SettingsContext;

    constructor(props) {
        super(props);
        let today = new Date();
        today.setDate(today.getDate() + 1);
        this.state = {
            value: '',
            currentGoal: {
                type: 'Daily',
                goals: [],
                date: today
            },
            goalListLength: 0,
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
        if (!!this.props.goalListContext) {
            this.setState({
                currentGoal: this.props.goalListContext.currentGoal,
                handleSubmit: this.props.goalListContext.handleSubmitAdd,
                handleChecked: this.props.goalListContext.handleChecked,
                handleEditGoal: this.props.goalListContext.handleEditCurrentGoal
            }, () => this.changeDate(this.props.goalListContext.currentGoal.type))
        }
        if(this.state.currentGoal.goals.length){
            this.handleGoalListLength()
        }
        document.body.style.backgroundColor = getCurrentThemeColors().pColor;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.goalListContext.currentGoal !== this.props.goalListContext.currentGoal) {
            this.setState({
                currentGoal: {
                    type: this.props.goalListContext.currentGoal.type,
                    goals: this.props.goalListContext.currentGoal.goals,
                    date: this.props.goalListContext.currentGoal.date
                }
            }, ()=> this.handleGoalListLength())

        }
    }

    changeDate(type) {
        this.props.goalListContext.handleGoalAdd({
            date: getTime(type).toLocaleDateString(),
            type,
            goals: this.state.currentGoal.goals
        });
    }
    handleGoalListLength = () => this.setState({goalListLength: this.state.currentGoal.goals.length});
    deleteObjective(neat, ID) {
        let newGoals = this.props.goalListContext.currentGoal.goals.filter(g => g.id !== ID);
        newGoals.forEach((goal, i) => goal.id = i);
        toast.warn('Objective Deleted', {autoClose: 2000});
        let newGL = {type: this.state.currentGoal.type, date: this.state.currentGoal.date, goals: newGoals};
        this.setState({currentGoal: newGL},()=> this.handleGoalListLength());
        this.props.goalListContext.handleGoalAdd(newGL);
    }

    handleInput(e) {
        this.setState({value: e.target.value})
    }

    handleAdd(e) {
        let {goals, type, date} = this.props.goalListContext.currentGoal;
        if (this.state.value.trim() === '') {
            toast.warn(`Can't Add Empty Objective`);
        } else {
            let objective = {obj: this.state.value.trim(), id: goals.length};
            goals.push(objective);
            this.setState({value: ''}, ()=> this.handleGoalListLength());
            this.props.goalListContext.handleGoalAdd({date, type, goals: this.state.currentGoal.goals})
        }
    }

    handleObjectiveClone(neat, ID) {
        let GoalList = this.props.goalListContext.currentGoal;
        let obj = {
            obj: GoalList.goals.find(goal => goal.id === ID).obj,
            id: this.props.goalListContext.currentGoal.goals.length
        };
        GoalList.goals.push(obj);
        this.props.goalListContext.handleGoalAdd(GoalList);
        toast.success(`Objective Cloned`);
        this.setState({value: ''}, ()=> this.handleGoalListLength());
    }

    handleOtherDate(e) {
        let tempDate = new Date(e.target.value);
        try {
            let {goals, type} = this.props.goalListContext.currentGoal;
            this.setState({otherDate: tempDate});
            this.props.goalListContext.handleGoalAdd({type, goals, date: tempDate});
        } catch (e) {
            return;
        }
    }

    render() {
        return (
            <form className='add-goal' onSubmit={this.state.handleSubmit}>
                <h1 style={{color: getCurrentThemeColors().headerColor}}> Create {this.state.currentGoal.type} Goal {<TryPremium/>}</h1>
                <div className='bar-indicator-top' style={getColor(this.context.currentType)}/>
                <div className="addition-wrapper">
                    <div className='dropdown-types'>
                        <li style={{
                            backgroundColor: getCurrentThemeColors().tColor,
                            color: getCurrentThemeColors().fontColor
                        }}>{this.state.currentGoal.type}
                            <div className='bar-indicator-left' style={getColor(this.state.currentGoal.type)}/>
                            <div className='bar-indicator-right' style={getColor(this.state.currentGoal.type)}/>
                        </li>
                        <ul className='dropdown-list'  style={{
                            backgroundColor: getCurrentThemeColors().tColor,
                            color: getCurrentThemeColors().fontColor

                        }}>
                            {['Other', ...this.context.types].map((type, i) => <li key={i}
                                                                                   className={(this.state.currentGoal.type === type) ? 'tinted' : ''}
                                                                                   style={(i >= 4) ? {
                                                                                       padding: 16 * (1 / (i - 4)) + 'px 0px',
                                                                                       color: getCurrentThemeColors().fontColor,
                                                                                       backgroundColor: getCurrentThemeColors().tColor
                                                                                   } : {
                                                                                       color: getCurrentThemeColors().fontColor,
                                                                                       backgroundColor: getCurrentThemeColors().tColor,
                                                                                   }}
                                                                                   onClick={() => this.changeDate(type)}>{type}
                                <div className='bar-indicator-left' style={getColor(type)}/>
                                <div className='bar-indicator-right' style={getColor(type)}/>
                            </li>)}
                        </ul>
                        {(this.state.currentGoal.type === 'Other') ? <input className={'date-input'} type='date'
                                                                            value={formatDate(new Date(this.state.otherDate))}
                                                                            min={formatDate(this.state.today)}
                                                                            onChange={this.handleOtherDate}/> : ''}
                    </div>

                    <section className='add-input'>
                        <input value={this.state.value} onChange={this.handleInput} onKeyPress={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                this.handleAdd(e);
                            }
                        }}/>
                        <div className='even-space'>
                            <button onClick={() => this.setState({value: ''})} style={{
                                backgroundColor: getCurrentThemeColors().tColor,
                                color: getCurrentThemeColors().fontColor
                            }}
                                    type='button'>Cancel
                            </button>
                            <button onClick={this.handleAdd} type='button' style={{
                                backgroundColor: getCurrentThemeColors().tColor,
                                color: getCurrentThemeColors().fontColor
                            }}>Submit
                            </button>
                        </div>
                    </section>
                </div>
                <div className='submit-goals' style={{animation: (this.state.goalListLength >= 1) ? '1s pulse infinite' : ''}}>
                    <button type='submit' className='dropdown-current' onClick={(e) => this.state.handleSubmit(e)}
                            onKeyPress={e => {
                                if (e.key === 'Enter') e.preventDefault();
                            }} style={{
                        backgroundColor: getCurrentThemeColors().tColor + 'aa',
                        color: getCurrentThemeColors().fontColor
                    }}>Add Goal
                    </button>
                </div>
                {this.state.currentGoal.goals.length === 0 ? <div className='example-add' style={{
                    color: getCurrentThemeColors().fontColor
                }}>Growth Worthy Goal</div> : ''}
                <GoalList goalId={this.state.currentGoal.id} isEditable={true} showCompleted={false}
                          date={this.state.currentGoal.date} type={this.state.currentGoal.type}
                          showChecked={false} handleChecked={this.state.handleChecked} showCloneGoalList={false}
                          handleEditGoal={this.state.handleEditGoal} compacted={'No'} showDeleteGoalList={false}
                          showDelete={true} handleObjectiveClone={this.handleObjectiveClone}
                          deleteGoal={this.deleteObjective} goals={this.state.currentGoal.goals}/>

            </form>
        )
    }
}

export default AddGoal;
