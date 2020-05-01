import React from 'react';
import './Home.css';
import GoalList from '../GoalList/GoalList';
import {SettingsContext} from "../Settings/SettingsContext";
import SearchFilter from "../SearchFilter/SearchFilter";
import {getColor, getThemeColors} from "../Utils/Utils";

class Home extends React.Component {
    static contextType = SettingsContext;

    constructor(props) {
        super(props);
        this.state = {
            currentGoals: []
        };
        this.changeFilter = this.changeFilter.bind(this);
        this.searchGoals = this.searchGoals.bind(this);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.goalListContext !== this.props.goalListContext) {
            this.setState({currentGoals: this.props.goalListContext.currentGoals});
        }
    }

    componentDidMount() {
        if (this.props.goalListContext) {
            this.props.goalListContext.fetchData(() => this.setState({currentGoals: this.props.goalListContext.currentGoals}));
            this.searchGoals('');
        }
        document.body.style.backgroundColor = getThemeColors().pColor;
    }


    changeFilter(type) {
        this.context.setType(type);
        this.setState({
            currentGoals: (type !== 'All')
                ? this.props.goalListContext.currentGoals.filter((pg) => pg.type === type)
                : this.props.goalListContext.currentGoals
        })
    }

    searchGoals(search) {
        let currentGoals = (this.context.currentType !== 'All')
            ? this.props.goalListContext.currentGoals.filter((pg) => pg.type === this.context.currentType)
            : this.props.goalListContext.currentGoals;
        if (search.trim().length !== 0) {
            this.setState({
                currentGoals: currentGoals.filter((data) => data.goals.find(g => (g.obj.toLowerCase()).includes(search.toLowerCase())))
            });
        } else {
            this.setState({currentGoals: currentGoals})
        }

    }

    render() {
        const type = (this.context.currentType !== 'All') ? this.context.currentType : '';
        return (
            <main className="home">
                <h1 style={{color: getThemeColors().headerColor}}>{this.context.nickname}'s {type} Goals </h1>
                <div className='bar-indicator-top' style={getColor(type)}/>
                <p style={{color: getThemeColors().fontColor}} className='even-space noselect'
                   onClick={this.context.toggleShowDelete}>Show
                    Delete
                    <span
                        style={{color: getThemeColors().headerColor}}>{(this.context.showDelete) ? 'Yes' : 'No'}</span>
                </p>
                <p style={{color: getThemeColors().fontColor}} className='even-space noselect'
                   onClick={this.context.toggleCompacted}>Compacted
                    <span style={{color: getThemeColors().headerColor}}>{this.context.compacted}</span></p>
                <SearchFilter changeFilter={this.changeFilter} searchGoals={this.searchGoals} types={this.context.types}
                              currentType={this.context.currentType}/>
                {this.state.currentGoals.length === 0 ? <h2>No Current {type} Goals</h2> : ''}
                {this.state.currentGoals.map((Goal, i) => <GoalList key={i} showChecked={true}
                                                                    deleteGoal={this.props.goalListContext.deleteGoal}
                                                                    pushGoal={this.props.goalListContext.pushGoal}
                                                                    goalId={Goal.id}
                                                                    handleChecked={this.props.goalListContext.handleChecked}
                                                                    isEditable={true} showCompleted={true}
                                                                    goals={Goal.goals} type={Goal.type}
                                                                    handleEditGoal={this.props.goalListContext.handleEditGoal}
                                                                    date={Goal.date} checkedamt={Goal.checkedamt}
                                                                    showDelete={this.context.showDelete}
                                                                    compacted={this.context.compacted}
                                                                    handleObjectiveClone={this.props.goalListContext.handleObjectiveClone}/>)}
            </main>
        )
    }
}

export default Home;
