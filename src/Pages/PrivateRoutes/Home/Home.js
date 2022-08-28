import React, {useEffect} from 'react';
import './Home.css';
import {getColor, getCurrentThemeColors} from "../../../Utils/Utils";
// import TryPremium from "../../../Components/Checkout/TryPremium";
import {useSetting, useTextColor} from "../Settings/SettingsContext";
import {getBgColor} from "../../../Utils/Theming";


function Home(){

    const theme = useSetting('theme')
    const darkmode = useSetting('dark_mode') === 1
    const nickname = useSetting('nickname')


    const bgColor = getBgColor({theme, darkmode})
    const textColor = useTextColor();
    useEffect(()=>{
        document.body.style.backgroundColor = getCurrentThemeColors().pColor;

    },[])


    return <main className="home">
            <h1 style={{...bgColor, ...textColor}} className='title tab'>{nickname}'s Goals</h1>
            <form>

            </form>
            {/*<h1 style={{color: getCurrentThemeColors().headerColor}}>{this.context.nickname}'s {type} Goals {<TryPremium/>}</h1>*/}
        {/*                 <div className='bar-indicator-top' style={getColor(type)}/>*/}
        {/*                 <p style={{color: getCurrentThemeColors().fontColor}} className='even-space noselect'*/}
        {/*                    onClick={this.context.toggleShowDelete}>Show*/}
        {/*                     Delete*/}
        {/*                     <span*/}
        {/*                         style={{color: getCurrentThemeColors().headerColor}}>{(this.context.showDelete) ? 'Yes' : 'No'}</span>*/}
        {/*                 </p>*/}
        {/*                 <p style={{color: getCurrentThemeColors().fontColor}} className='even-space noselect'*/}
        {/*                    onClick={this.context.toggleCompacted}>Compacted*/}
        {/*                     <span style={{color: getCurrentThemeColors().headerColor}}>{this.context.compacted}</span></p>*/}
        {/*                 <SortFilter updateGoals={this.updateGoals}/>*/}
        {/*<SearchFilter changeFilter={this.changeFilter} searchGoals={this.changSearch} search={this.state.search} types={this.context.types}*/}
        {/*                               currentType={this.context.currentType} clearSearch={()=> this.setState({search: '', goalChange: true})}/>*/}
        {/*                 {this.state.currentGoals.length === 0 ? <h2>No Current {type} Goals</h2> : ''}*/}
        {/*                 {this.state.currentGoals.map((Goal, i) => <GoalList key={i} showChecked={true} showCloneGoalList={true}*/}
        {/*                                                                     deleteGoal={this.props.goalListContext.deleteGoal}*/}
        {/*                                                                     pushGoal={this.props.goalListContext.pushGoal} showDeleteGoalList={true}*/}
        {/*                                                                     goalId={Goal.id} handleAddObjective={this.props.goalListContext.handleAddObjective}*/}
        {/*                                                                     handleChecked={this.props.goalListContext.handleChecked}*/}
        {/*                                                                     isEditable={true} showCompleted={true}*/}
        {/*                                                                     goals={Goal.goals} type={Goal.type} deleteGoalList={this.props.goalListContext.deleteGoalList}*/}
        {/*                                                                     handleEditGoal={this.props.goalListContext.handleEditGoal}*/}
        {/*                                                                     date={Goal.date} checkedamt={Goal.checkedamt}*/}
        {/*                                                                     showDelete={this.context.showDelete} handleGoalListClone={this.props.goalListContext.handleGoalListClone}*/}
        {/*                                                                     compacted={this.context.compacted} showAdd={true}*/}
        {/*                                                                     handleObjectiveClone={this.props.goalListContext.handleObjectiveClone}/>)}*/}
                     </main>
}

// class Home extends React.Component {
//     static contextType = SettingsContext;
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentGoals: [],
//             goalChange: false,
//             search: ''
//         };
//         this.changeFilter = this.changeFilter.bind(this);
//         this.changSearch = this.changSearch.bind(this);
//         this.searchGoals = this.searchGoals.bind(this);
//         this.updateGoals = this.updateGoals.bind(this);
//     }
//
//     componentDidMount() {
//         if (this.props.goalListContext) {
//             this.props.goalListContext.fetchData(() =>
//                 this.setState({currentGoals: this.context.sortGoals(this.filterGoals(this.searchGoals(this.props.goalListContext.currentGoals)))}));
//         }
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevProps.goalListContext !== this.props.goalListContext || prevState.goalChange !== this.state.goalChange) {
//             this.setState({currentGoals:
//                 this.context.sortGoals(this.filterGoals(this.searchGoals(this.props.goalListContext.currentGoals))),
//                 goalChange: false});
//         }
//     }
//
//
//
//     changeFilter(type) {
//         this.context.setType(type);
//         this.setState({goalChange: true})
//     }
//
//     changSearch = (e) => this.setState({search: e.target.value, goalChange: true})
//
//     searchGoals = (goals) => (this.state.search.trim().length !== 0) ? goals.filter((data) => data.goals.find(g => (g.obj.toLowerCase()).includes(this.state.search.toLowerCase()))) : goals
//
//     filterGoals = (goals) => (this.context.currentType !== 'All') ? goals.filter((pg) => pg.type === this.context.currentType) : goals
//
//
//     updateGoals = (callback) => {
//         this.setState({goalChange: true})
//         callback();
//     }
//
//     render() {
//         const type = (this.context.currentType !== 'All') ? this.context.currentType : '';
//         return (
//             <main className="home">
//                 <h1 style={{color: getCurrentThemeColors().headerColor}}>{this.context.nickname}'s {type} Goals {<TryPremium/>}</h1>
//                 <div className='bar-indicator-top' style={getColor(type)}/>
//                 <p style={{color: getCurrentThemeColors().fontColor}} className='even-space noselect'
//                    onClick={this.context.toggleShowDelete}>Show
//                     Delete
//                     <span
//                         style={{color: getCurrentThemeColors().headerColor}}>{(this.context.showDelete) ? 'Yes' : 'No'}</span>
//                 </p>
//                 <p style={{color: getCurrentThemeColors().fontColor}} className='even-space noselect'
//                    onClick={this.context.toggleCompacted}>Compacted
//                     <span style={{color: getCurrentThemeColors().headerColor}}>{this.context.compacted}</span></p>
//                 <SortFilter updateGoals={this.updateGoals}/>
//                 <SearchFilter changeFilter={this.changeFilter} searchGoals={this.changSearch} search={this.state.search} types={this.context.types}
//                               currentType={this.context.currentType} clearSearch={()=> this.setState({search: '', goalChange: true})}/>
//                 {this.state.currentGoals.length === 0 ? <h2>No Current {type} Goals</h2> : ''}
//                 {this.state.currentGoals.map((Goal, i) => <GoalList key={i} showChecked={true} showCloneGoalList={true}
//                                                                     deleteGoal={this.props.goalListContext.deleteGoal}
//                                                                     pushGoal={this.props.goalListContext.pushGoal} showDeleteGoalList={true}
//                                                                     goalId={Goal.id} handleAddObjective={this.props.goalListContext.handleAddObjective}
//                                                                     handleChecked={this.props.goalListContext.handleChecked}
//                                                                     isEditable={true} showCompleted={true}
//                                                                     goals={Goal.goals} type={Goal.type} deleteGoalList={this.props.goalListContext.deleteGoalList}
//                                                                     handleEditGoal={this.props.goalListContext.handleEditGoal}
//                                                                     date={Goal.date} checkedamt={Goal.checkedamt}
//                                                                     showDelete={this.context.showDelete} handleGoalListClone={this.props.goalListContext.handleGoalListClone}
//                                                                     compacted={this.context.compacted} showAdd={true}
//                                                                     handleObjectiveClone={this.props.goalListContext.handleObjectiveClone}/>)}
//             </main>
//         )
//     }
// }

export default Home;
