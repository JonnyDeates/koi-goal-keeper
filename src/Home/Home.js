import React from 'react';
import './Home.css';
import GoalList from '../GoalList/GoalList';
import {SettingsContext} from "../Settings/SettingsContext";
import SearchFilter from "../SearchFilter/SearchFilter";
import {getColor} from "../Utils/Utils";
class Home extends React.Component {
    static contextType = SettingsContext;
    constructor(props){
        super(props);
        this.state = {
            currentGoals: this.props.allGoals.sort((a,b)=> (a.date > b.date) ? 0 : 1),
        };
        this.changeFilter = this.changeFilter.bind(this);
        this.searchGoals = this.searchGoals.bind(this);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props) {
           this.searchGoals('')
        }
    }
    componentDidMount() {
        this.searchGoals('');
    }
    changeFilter(type){
        this.context.setType(type);
        this.setState({currentGoals: (type !== 'All')
                ? this.props.allGoals.filter((pg) => pg.type === type)
                : this.props.allGoals
        })
    }

    searchGoals(search) {
        let currentGoals = (this.context.currentType !== 'All')
            ? this.props.allGoals.filter((pg) => pg.type === this.context.currentType)
            : this.props.allGoals;
        if(search.trim().length !== 0) {
            this.setState({currentGoals: currentGoals.filter((data)=> data.goals.find(g=> (g.goal.toLowerCase()).includes(search.toLowerCase())))
            });
        }else {
            this.setState({currentGoals: currentGoals.sort((a,b)=> (a.date > b.date) ? 0 : 1)})
        }

    }
    render() {
        const type = (this.context.currentType !== 'All') ? this.context.currentType : '';
        return (
            <main className="home">
                <h1>{this.context.nickname}'s {type} Goals </h1>
                <div className='bar-indicator-top' style={getColor(type)}/>
                <p className='even-space noselect' onClick={this.context.toggleShowDelete}>Show
                    Delete
                    <span>{(this.context.showDelete) ? 'Yes' : 'No'}</span></p>
                <p className='even-space noselect' onClick={this.context.toggleCompacted}>Compacted
                    <span>{this.context.compacted}</span></p>
                <SearchFilter changeFilter={this.changeFilter} searchGoals={this.searchGoals}/>
                {this.state.currentGoals.length === 0 ? <h2>No Current {type} Goals</h2> : ''}
                {this.state.currentGoals.map((Goal, i) => <GoalList key={i} showChecked={true} deleteGoal={this.props.deleteGoal}
                                                                pushGoal={this.props.pushGoal} goalId={Goal.id} handleChecked={this.props.handleChecked}
                                                                isEditable={false} showCompleted={true} goals={Goal.goals} type={Goal.type}
                                                                date={Goal.date} checkedamt={Goal.checkedamt} showDelete={this.context.showDelete}
                                                                compacted={this.context.compacted}/>)}
            </main>
        )
    }
}

export default Home;