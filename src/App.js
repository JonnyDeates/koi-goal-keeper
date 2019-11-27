import React from 'react';
import './App.css';
import Home from './Home/Home.js'
import TopNav from './TopNav/TopNav.js'
import AddGoal from './AddGoal/AddGoal.js'
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import PastGoals from "./PastGoals/PastGoals";
import PastGoalsLinks from "./PastGoals/PastGoalsLinks";
import Login from "./Login/Login";
import Register from "./Register/Register";
import GoalApiService from "./services/goals-api-service";
import TokenService from "./services/token-service";
import PastGoalService from "./services/pastgoals-api-service";


class App extends React.Component {
    constructor(props) {
        super(props);
        let testDate = new Date();
        let testDatew = new Date();
        testDate.setDate(testDate.getDate() + 7);
        testDatew.setDate(testDatew.getDate() - 8);
        this.state = {
            allGoals: [],
            pastGoals: [],
            links: [{to: '/', name: 'Home'}, {to: '/add', name: 'Add'}, {to: '/past-goals', name: 'Past Goals'}],
            types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', '5-Year']
        };
        this.addGoal = this.addGoal.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.deletePastGoal = this.deletePastGoal.bind(this);
        this.handleChecked = this.handleChecked.bind(this);

    }

    componentDidMount() {
        if (TokenService.getAuthToken()) {
            GoalApiService.getAllGoals()
                .then((res) => this.setState({allGoals: this.breakApartAllGoalData(res)}));
            PastGoalService.getAllPastGoals()
                .then((res) => this.setState({pastGoals: this.breakApartAllGoalData(res)}));

        }
        // this.state.allGoals.forEach(Goal => this.checkCurrentGoals(Goal.id, Goal.type))
    }

    breakApartAllGoalData(data) {
        return data.map(Goal => Goal = this.breakApartGoalData(Goal))
    }

    breakApartGoalData(data) {
        let newData = {
            type: data.type,
            checkedAmt: parseInt(data.checkedamt),
            id: data.id,
            userid: data.userid,
            date: data.date,
            goals: data.goals.map(x => {
                const textArr = x.split(',');
                const goalText = textArr[0].substring('{"goal":"'.length);
                const idText = textArr[1].substring('"id":"'.length);
                const checkedText = textArr[2].substring('"checked":'.length);
                return {
                    goal: goalText.substring(0, goalText.length - 1),
                    id: idText.substring(0, idText.length - 1),
                    checked: (checkedText.substring(0, checkedText.length - 1) === 'true')
                }
            })
        };
        return newData;
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
        GoalApiService.postGoal(goal)
            .then((res) => this.setState({allGoals: [...this.state.allGoals, this.breakApartGoalData(res)]}));
    }

    deleteGoal(goalID, ID) {
        let Goal = this.state.allGoals.find(g => g.id === goalID);
        let {checked} = Goal.goals.find(g => g.id === ID);
        Goal.goals = Goal.goals.filter(g => g.id !== ID);
        let newAllGoals = this.state.allGoals;
        if (checked) {
            Goal.checkedAmt = Goal.checkedAmt - 1;
        }
        let newGoal = {checkedamt: Goal.checkedAmt, type: Goal.type, goals: Goal.goals, date: Goal.date}
        GoalApiService.patchGoal(newGoal, goalID);

        if (Goal.goals.length <= 0) {
            GoalApiService.deleteGoal(Goal.id)
                .then(() => this.setState({allGoals: this.state.allGoals.filter((G) => Goal.id !== G.id)}))
        } else {
            this.setState({allGoals: newAllGoals});
        }
    }

    deletePastGoal(goalID, ID) {
        let Goal = this.state.pastGoals.find(g => g.id === goalID);
        let {checked} = Goal.goals.find(g => g.id === ID);
        Goal.goals = Goal.goals.filter(g => g.id !== ID);
        let newAllGoals = this.state.pastGoals;
        if (checked) {
            Goal.checkedAmt = Goal.checkedAmt - 1;
        }
        this.setState({pastGoals: newAllGoals});
        if (Goal.goals.length <= 0) {
            this.setState({pastGoals: this.state.pastGoals.filter((G) => Goal.id !== G.id)})
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

        console.log(newGoalList.splice(newGoalListIndex, 0, currentGoalList), currentGoalList);
        this.setState({allGoals: newGoalList})
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route render={(routeProps) => !(TokenService.hasAuthToken()) ? '' :
                        <TopNav currentActive={routeProps.location}
                                links={this.state.links}/>}/>
                    <Switch>
                        <Route
                            exact path={'/'}>
                            {!(TokenService.hasAuthToken()) ? <Redirect to={'/login'}/> : <Home
                                allGoals={this.state.allGoals} deleteGoal={this.deleteGoal}
                                handleChecked={this.handleChecked}/>}
                        </Route>
                        <Route exact path={'/add'}>
                            {!(TokenService.hasAuthToken()) ? <Redirect to={'/login'}/> :
                                <AddGoal types={this.state.types}
                                         addGoal={this.addGoal}
                                         deleteGoal={this.deleteGoal}
                                         handleChecked={this.handleChecked}/>}
                        </Route>

                        <Route
                            exact path={'/past-goals'}>
                            {!(TokenService.hasAuthToken()) ? <Redirect to={'/login'}/> : <PastGoalsLinks
                                types={this.state.types}/>}</Route>
                        <Route
                            exact path={'/past-goals/'}
                            component={(routeProps) => !(TokenService.hasAuthToken()) ? <Redirect to={'/login'}/> :
                                <PastGoals
                                    type={routeProps.location.pathname.substring(12)}
                                    deleteGoal={this.deletePastGoal}
                                    handleChecked={this.handleChecked}
                                    pastGoals={this.state.pastGoals.filter((pg) => pg.type === routeProps.location.pathname.substring(12))}/>}/>
                        <Route path={'/login'}> {(TokenService.hasAuthToken()) ? <Redirect to={'/'}/> :
                            <Login/>}</Route>
                        <Route path={'/register'}> {(TokenService.hasAuthToken()) ? <Redirect to={'/'}/> :
                            <Register/>}</Route>
                    </Switch>

                    {/*<Route exact path="/settings"><Settings/></Route>*/}
                </div>
            </Router>
        )
            ;
    }
}

export default App;
