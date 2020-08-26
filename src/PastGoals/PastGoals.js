import React from 'react';
import GoalList from "../GoalList/GoalList";
import "./PastGoals.css"
import {SettingsContext} from "../Settings/SettingsContext";
import SearchFilter from "../SearchFilter/SearchFilter";
import {getColor, getCurrentThemeColors} from "../Utils/Utils";
import TryPremium from "../Checkout/TryPremium";

class PastGoals extends React.Component {
    static contextType = SettingsContext;

    constructor(props) {
        super(props);
        this.state = {
            currentGoals: [],
        };
        this.changeFilter = this.changeFilter.bind(this);
        this.searchGoals = this.searchGoals.bind(this)
    }

    componentDidMount() {
        if (!!this.props.goalListContext) {
            this.searchGoals('');
            this.setState({currentGoals: this.props.goalListContext.pastGoals})
        }
        document.body.style.backgroundColor = getCurrentThemeColors().pColor;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({currentGoals: [...this.props.goalListContext.pastGoals.sort((A, B) => new Date(A.date) - new Date(B.date))]})

        }
    }

    changeFilter(type) {
        this.context.setType(type);
        this.setState({
            currentGoals: (type !== 'All')
                ? this.props.goalListContext.pastGoals.filter((pg) => pg.type === type)
                : this.props.goalListContext.pastGoals
        })
    }

    searchGoals(search) {
        let pastGoals = (this.context.currentType !== 'All')
            ? this.props.goalListContext.pastGoals.filter((pg) => pg.type === this.context.currentType)
            : this.props.goalListContext.pastGoals;
        pastGoals.sort((a, b) => (new Date(a.date).getTime() > new Date(b.date).getTime() ? 0 : 1)).reverse();
        if (search.trim().length !== 0) {
            this.setState({
                currentGoals: pastGoals.filter((data) => data.goals.find(g => (g.obj.toLowerCase()).includes(search.toLowerCase())))
            });
        } else {
            this.setState({currentGoals: pastGoals})
        }
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
            <SearchFilter changeFilter={this.changeFilter} searchGoals={this.searchGoals} currentType={this.context.currentType} types={this.context.types}/>
            {(this.context.currentType === 'All')
                ? this.state.currentGoals.map((pg, i) => <GoalList key={i} goalId={pg.id}
                                                                   deleteGoal={this.props.goalListContext.deletePastGoal}
                                                                   showChecked={false} isEditable={false}
                                                                   showCompleted={true}
                                                                   date={pg.date} type={pg.type} goals={pg.goals}
                                                                   past={true}
                                                                   showDelete={this.context.showDelete}
                                                                   checkedamt={pg.checkedamt}
                                                                   compacted={this.context.compacted}
                                                                   handleObjectiveClone={this.props.goalListContext.handlePastObjectiveClone}
                />)
                : this.state.currentGoals.map((pg, i) => <GoalList key={i} goalId={pg.id}
                                                                   deleteGoal={this.props.goalListContext.deletePastGoal}
                                                                   showChecked={false} isEditable={false}
                                                                   showCompleted={true}
                                                                   date={pg.date} showDelete={this.context.showDelete}
                                                                   type={pg.type}
                                                                   goals={pg.goals} past={true}
                                                                   checkedamt={pg.checkedamt}
                                                                   compacted={this.context.compacted}
                                                                   handleObjectiveClone={this.props.goalListContext.handlePastObjectiveClone}/>)
            }
            {(this.state.currentGoals.length > 0) ? ''
                : <h2>Currently No Past {type} Goals</h2>}
        </main>);
    }
}

export default PastGoals;
