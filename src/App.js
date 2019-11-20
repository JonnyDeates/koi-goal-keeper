import React from 'react';
import './App.css';
import Home from './Home/Home.js'
import TopNav from './TopNav/TopNav.js'
import AddGoal from './AddGoal/AddGoal.js'
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import cuid from 'cuid';
import PastGoals from "./PastGoals/PastGoals";
import PastGoalsLinks from "./PastGoals/PastGoalsLinks";
import Login from "./Login/Login";
import Register from "./Register/Register";

class App extends React.Component {
    constructor(props) {
        super(props);
        let testDate = new Date();
        let testDatew = new Date();
        testDate.setDate(testDate.getDate() + 7);
        testDatew.setDate(testDatew.getDate() - 8);
        this.state = {
            allGoals: [{
                type: 'Daily',
                checkedAmt: 0,
                goals: [{goal: 'Yes', id: cuid(), checked: false}, {goal: 'Yeet', id: cuid(), checked: false}, {
                    goal: 'How it goes',
                    id: cuid(),
                    checked: false
                }],
                id: cuid(),
                date: new Date().toISOString()
            }, {
                type: 'Weekly',
                checkedAmt: 0,
                goals: [{goal: 'Cool', id: cuid(), checked: false}, {goal: 'Dope', id: cuid(), checked: false}],
                id: cuid(),
                date: testDate.toISOString()
            }, {
                type: 'Weekly',
                checkedAmt: 0,
                goals: [{goal: 'Cool', id: cuid(), checked: false}, {goal: 'Dope', id: cuid(), checked: false}],
                id: cuid(),
                date: testDatew.toISOString()
            }, {
                type: 'Quarterly',
                checkedAmt: 0,
                goals: [{goal: 'Cool', id: cuid(), checked: false}, {goal: 'Dope', id: cuid(), checked: false}],
                id: cuid(),
                date: testDatew.toISOString()
            }],
            pastGoals: [],
            links: [{to: '/', name: 'Home'}, {to: '/add', name: 'Add'}, {to: '/past-goals', name: 'Past Goals'}],
            types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', '5-Year']
        };
        this.addGoal = this.addGoal.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.deletePastGoal = this.deletePastGoal.bind(this);
        this.handleChecked = this.handleChecked.bind(this);

    }
    componentDidMount(){
        this.state.allGoals.forEach(Goal => this.checkCurrentGoals(Goal.id,Goal.type))
    }

    checkCurrentGoals(type) {
        let currentDate = new Date();
        switch (type) {
            case 'Daily':
                currentDate.setDate(currentDate.getDate() - 1);
                break;
            case 'Weekly':
                currentDate.setDate(currentDate.getDate() - 7);
                break;
            case 'Monthly':
                currentDate.setMonth(currentDate.getMonth() - 1);
                break;
                case 'Quarterly':
                currentDate.setMonth(currentDate.getMonth() - 3);
                break;
                case 'Yearly':
                currentDate.setMonth(currentDate.getMonth() - 12);
                break;
                case '5-Year':
                currentDate.setMonth(currentDate.getMonth() - 12 * 5);
                break;
                default:
                currentDate.setDate(currentDate.getDate() - 1);
                break;
        }
        this.setState({
            allGoals: this.state.allGoals.filter((Goal) => (new Date(Goal.date).getTime()) >= currentDate.getTime()),
            pastGoals: [...this.state.pastGoals, ...this.state.allGoals.filter((Goal) => (new Date(Goal.date).getTime()) < currentDate.getTime())]
        });
    }


    addGoal(goal) {
        this.setState({allGoals: [...this.state.allGoals, goal]})
    }
    deleteGoal(goalID, ID) {
        let Goal = this.state.allGoals.find(g => g.id === goalID);
        let {checked} = Goal.goals.find(g => g.id === ID);
        Goal.goals = Goal.goals.filter(g=> g.id !== ID);
        let newAllGoals = this.state.allGoals;
        if (checked) {
             Goal.checkedAmt = Goal.checkedAmt - 1;
        }
        console.log(newAllGoals.splice(this.state.allGoals.findIndex((g)=>g.id === goalID),1, Goal));
        this.setState({allGoals: newAllGoals});
        if(Goal.goals.length <= 0) {
            this.setState({allGoals: this.state.allGoals.filter((G)=> Goal.id !== G.id)})
        }
    }
    deletePastGoal(goalID, ID) {
        let Goal = this.state.pastGoals.find(g => g.id === goalID);
        let {checked} = Goal.goals.find(g => g.id === ID);
        Goal.goals = Goal.goals.filter(g=> g.id !== ID);
        let newAllGoals = this.state.pastGoals;
        if (checked) {
            Goal.checkedAmt = Goal.checkedAmt - 1;
        }
        this.setState({pastGoals: newAllGoals});
        if(Goal.goals.length <= 0) {
            this.setState({pastGoals: this.state.pastGoals.filter((G)=> Goal.id !== G.id)})
        }
    }
    handleChecked(goalId, ID) {
        let currentGoalList = this.state.allGoals.find(G => G.id === goalId);
        let currentGoal = currentGoalList.goals.find(g => g.id === ID);
        let index = currentGoalList.goals.indexOf(currentGoal);
        currentGoalList.goals.splice(index, 1, {goal: currentGoal.goal, checked: !currentGoal.checked, id: ID});
        if (currentGoal.checked) {
            currentGoalList.checkedAmt = currentGoalList.checkedAmt - 1;
        } else {
            currentGoalList.checkedAmt = currentGoalList.checkedAmt + 1;
        }
        let newGoalListIndex = this.state.allGoals.findIndex(G => G.id === goalId);
        let newGoalList = this.state.allGoals.filter((G) => G.id !== goalId);
        newGoalList.splice(newGoalListIndex, 0, currentGoalList);
        this.setState({allGoals: newGoalList})
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route render={(routeProps) => <TopNav currentActive={routeProps.location}
                                                           links={this.state.links}/>}/>
                    <Route exact path="/"><Home allGoals={this.state.allGoals} deleteGoal={this.deleteGoal} handleChecked={this.handleChecked}/></Route>
                    <Route exact path="/add"><AddGoal types={this.state.types} addGoal={this.addGoal} deleteGoal={this.deleteGoal} handleChecked={this.handleChecked}/></Route>
                    <Switch>
                        <Route exact path="/past-goals"><PastGoalsLinks types={this.state.types}/></Route>
                        <Route path="/past-goals/"
                               component={(routeProps) => <PastGoals type={routeProps.location.pathname.substring(12)} deleteGoal={this.deletePastGoal} handleChecked={this.handleChecked}
                                                                  pastGoals={this.state.pastGoals.filter((pg) => pg.type === routeProps.location.pathname.substring(12))}/>}/>
                    </Switch>
                    <Route exact path="/login"><Login/></Route>
                    <Route exact path="/register"><Register/></Route>
                    {/*<Route exact path="/settings"><Settings/></Route>*/}
                </div>
            </Router>
        );
    }
}

export default App;
