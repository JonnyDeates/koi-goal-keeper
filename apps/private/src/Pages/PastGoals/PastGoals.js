import React from 'react';
import GoalList from "../../Components/GoalList/GoalList";
import "./PastGoals.css"
import {SettingsContext} from "../Settings/SettingsContext";
import SearchFilter from "../../Components/SearchFilter/SearchFilter";
import {getColor, getCurrentThemeColors} from "../../Utils/Utils";
import TryPremium from "../../Components/Checkout/TryPremium";
import SortFilter from '../../Components/SortFilter/SortFilter';

class PastGoals extends React.Component {
    static contextType = SettingsContext;

    constructor(props) {
        super(props);
        this.state = {
            currentGoals: [],
            goalChange: false,
            search: ''
        };
        this.changeFilter = this.changeFilter.bind(this);
        this.changSearch = this.changSearch.bind(this);
        this.searchGoals = this.searchGoals.bind(this);
        this.updateGoals = this.updateGoals.bind(this);
    }

    componentDidMount() {
        if (!!this.props.goalListContext) {
            this.searchGoals('');
            
            this.setState({currentGoals: this.context.sortGoals(this.filterGoals(this.searchGoals(this.props.goalListContext.pastGoals)))})
        }
        document.body.style.backgroundColor = getCurrentThemeColors().pColor;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.goalListContext !== this.props.goalListContext  || prevState.goalChange !== this.state.goalChange) {
            this.setState({currentGoals: this.context.sortGoals(this.filterGoals(this.searchGoals(this.props.goalListContext.pastGoals))), goalChange: false});
        }
    }

    changeFilter(type) {
        this.context.setType(type);
        this.setState({goalChange: true})
    }

    changSearch = (e) => this.setState({search: e.target.value, goalChange: true})

    searchGoals = (goals) => (this.state.search.trim().length !== 0) ? goals.filter((data) => data.goals.find(g => (g.obj.toLowerCase()).includes(this.state.search.toLowerCase()))) : goals

    filterGoals = (goals) => (this.context.currentType !== 'All') ? goals.filter((pg) => pg.type === this.context.currentType) : goals

    updateGoals = (callback) => {
        this.setState({goalChange: true})
        callback();
    }

    render() {
        const type = (this.context.currentType !== 'All') ? this.context.currentType : '';

        return (<main className='past-goals'>
            <h1 style={{color: getCurrentThemeColors().headerColor}}>Past {type} Goals {<TryPremium/>}</h1>
            <div className='bar-indicator-top' style={getColor(type)}/>
            <p style={{color: getCurrentThemeColors().fontColor}} className='even-space noselect' onClick={this.context.toggleShowDelete}>Show
                Delete
                <span style={{color: getCurrentThemeColors().headerColor}}>{(this.context.showDelete) ? 'Yes' : 'No'}</span></p>
            <p style={{color: getCurrentThemeColors().fontColor}} className='even-space noselect' onClick={this.context.toggleCompacted}>Compacted
                <span style={{color: getCurrentThemeColors().headerColor}}>{this.context.compacted}</span></p>
            <SortFilter updateGoals={this.updateGoals}/>
            <SearchFilter changeFilter={this.changeFilter} searchGoals={this.searchGoals} currentType={this.context.currentType} types={this.context.types}/>
            {this.state.currentGoals.map((pg, i) => <GoalList key={i} goalId={pg.id} showCloneGoalList={true}
                                                                    deleteGoal={this.props.goalListContext.deletePastGoal}
                                                                    deleteGoalList={this.props.goalListContext.deletePastGoalList}
                                                                    showChecked={false} isEditable={false}
                                                                    showCompleted={true}
                                                                    date={pg.date} type={pg.type} goals={pg.goals}
                                                                    past={true} showDeleteGoalList={true}
                                                                    showDelete={this.context.showDelete}
                                                                    checkedamt={pg.checkedamt} handleGoalListClone={this.props.goalListContext.handlePastGoalListClone}
                                                                    compacted={this.context.compacted}
                                                                    handleObjectiveClone={this.props.goalListContext.handlePastObjectiveClone}
                />)}
            {(this.state.currentGoals.length > 0) ? ''
                : <h2>Currently No Past {type} Goals</h2>}
        </main>);
    }
}

export default PastGoals;
