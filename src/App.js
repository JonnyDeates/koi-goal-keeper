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
                .then((res) => this.setState({allGoals: this.breakApartAllGoalData(res)}))
                .then(() => this.state.allGoals.forEach(Goal => this.checkCurrentGoals(Goal.type, Goal.id, Goal.date)))
                .then(() => this.state.allGoals.sort((A, B)=> new Date(A.date) - new Date(B.date)));
            PastGoalService.getAllPastGoals()
                .then((res) => this.setState({pastGoals: this.breakApartAllGoalData(res)}));

        }

    }

    breakApartAllGoalData(data) {
        return data.map(Goal => Goal = this.breakApartGoalData(Goal))
    }

    breakApartGoalData(data) {
        let newData = {
            type: data.type,
            checkedamt: parseInt(data.checkedamt),
            id: data.id,
            userid: data.userid,
            date: data.date,
            goals: data.goals.map(x => {
                const textArr = x.split('"');
                const idArr = textArr[textArr.findIndex(text => text === 'id') + 2]
                const goalArr = textArr[textArr.findIndex(text => text === 'goal') + 2];
                const checkedArr = textArr[textArr.findIndex(text => text === 'checked') + 1];
                return {
                    goal: goalArr,
                    id: idArr,
                    checked: (checkedArr.substring(1, checkedArr.length - 1) === 'true')
                }
            })
        };
        return newData;
    }

    checkCurrentGoals(type, id, date) {
        let currentDate = new Date().getTime();
        if (new Date(date).getTime() < currentDate) {
            PastGoalService.postPastGoal(this.state.allGoals.find(g => g.id = id));
            GoalApiService.deleteGoal(id);
        }
        this.setState({
            allGoals: this.state.allGoals.filter((Goal) => (new Date(Goal.date).getTime()) >= currentDate)
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
        if (checked) {
            Goal.checkedamt = Goal.checkedamt - 1;
        }
        if (Goal.goals.length <= 0) {
            GoalApiService.deleteGoal(Goal.id)
                .then(() => this.setState({allGoals: this.state.allGoals.filter((G) => Goal.id !== G.id)}))
        } else {
            GoalApiService.patchGoal(Goal, goalID);
            this.setState({allGoals: this.state.allGoals});
        }
    }

    deletePastGoal(goalID, ID) {
        let Goal = this.state.pastGoals.find(g => g.id === goalID);
        console.log(Goal)
        let {checked} = Goal.goals.find(g => g.id === ID);
        Goal.goals = Goal.goals.filter(g => g.id !== ID);
        if (checked) {
            Goal.checkedamt = Goal.checkedamt - 1;
        }
        if (Goal.goals.length <= 0) {
            PastGoalService.deletePastGoal(Goal.id)
                .then(() => this.setState({pastGoals: this.state.pastGoals.filter((G) => Goal.id !== G.id)}))
        } else {
            PastGoalService.patchPastGoal(Goal, goalID);
            this.setState({pastGoals: this.state.pastGoals});
        }
        if (Goal.goals.length <= 0) {

        }
    }

    handleChecked(goalId, ID) {
        let currentGoalList = this.state.allGoals.find(G => G.id === goalId);
        let currentGoal = currentGoalList.goals.find(g => g.id === ID);
        let index = currentGoalList.goals.indexOf(currentGoal);
        currentGoalList.goals.splice(index, 1, {goal: currentGoal.goal, checked: !currentGoal.checked, id: ID});
        if (currentGoal.checked) {
            currentGoalList.checkedamt = currentGoalList.checkedamt - 1;
        } else {
            currentGoalList.checkedamt = currentGoalList.checkedamt + 1;
        }
        GoalApiService.patchGoal(currentGoalList, goalId);
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
                        <Route path={'/past-goals/'}
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
