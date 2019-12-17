import React from 'react';
import './App.css';
import Home from './Home/Home.js'
import TopNav from './TopNav/TopNav.js'
import AddGoal from './AddGoal/AddGoal.js'
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import {SettingsContext} from "./Settings/SettingsContext"
import PastGoals from "./PastGoals/PastGoals";
import PastGoalsLinks from "./PastGoals/PastGoalsLinks";
import Login from "./Login/Login";
import Register from "./Register/Register";
import GoalApiService from "./services/goals-api-service";
import TokenService from "./services/token-service";
import PastGoalService from "./services/pastgoals-api-service";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Settings from "./Settings/Settings";
import UserService from "./services/user-api-service";

class App extends React.Component {
    constructor(props) {
        super(props);
        let iconFolder = './assets/icons/';
        let dailyDate = new Date();
        dailyDate.setDate(dailyDate.getDate() + 1)
        this.state = {
            allGoals: [],
            pastGoals: [],
            selectedType: 'Daily',
            currentGoal: {
                type: 'Daily',
                goals: [],
                date: dailyDate.toISOString()
            },
            currentTheme: 'Blue / White',
            autoArchiving: true,
            links: [{to: '/', name: 'Home', src: require(`${iconFolder}home.ico`)}, {
                to: '/add', name: 'Add', src: require(`${iconFolder}document.ico`)
            }, {to: '/past-goals', name: 'Past Goals', src: require(`${iconFolder}archive.ico`)}, {
                to: '/settings',
                name: 'Settings',
                src: require(`${iconFolder}user.ico`)
            }],
            types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', '5-Year'],
            username: '',
            email: '',
            nickname: '',
            id: ''
        };
        this.addGoal = this.addGoal.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.deleteGoalAdd = this.deleteGoalAdd.bind(this);
        this.deletePastGoal = this.deletePastGoal.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.pushGoal = this.pushGoal.bind(this);
        this.changeSelectedType = this.changeSelectedType.bind(this);
        this.handleGoalAdd = this.handleGoalAdd.bind(this);

    }

    componentDidMount() {
        if (TokenService.getAuthToken()) {
            GoalApiService.getAllGoals()
                .then((res) => this.setState({allGoals: this.breakApartAllGoalData(res)}))
                .then(() => {
                    this.state.allGoals.forEach(Goal => this.checkCurrentGoals(Goal));
                    this.state.allGoals.sort((A, B) => new Date(A.date) - new Date(B.date));
                });
            PastGoalService.getAllPastGoals()
                .then((res) => this.setState({pastGoals: this.breakApartAllGoalData(res)}));

        }
        if (UserService.hasUserInfo()) {
            this.setState({username: UserService.getUser().username,
                email: UserService.getUser().email,
                nickname: UserService.getUser().nickname,
                id: UserService.getUser().id
            })
        }
    }

    breakApartAllGoalData(data) {
        return data.map(Goal => Goal = this.breakApartGoalData(Goal))
    }

    breakApartGoalData(data) {
        return {
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
    }

    checkCurrentGoals(Goal) {
        let currentDate = new Date().getTime();
        if (new Date(Goal.date).getTime() < currentDate) {
            PastGoalService.postPastGoal(this.state.allGoals.find(g => g.id = Goal.id));
            GoalApiService.deleteGoal(Goal.id);
        }
        this.setState({
            allGoals: this.state.allGoals.filter((Goal) => (new Date(Goal.date).getTime()) >= currentDate)
        });
    }

    pushGoal(id){
        let newPastGoal = this.state.allGoals.find(g => g.id === id);
        toast.success(`Archived ${newPastGoal.type} Goal`);
        PastGoalService.postPastGoal(newPastGoal);
        GoalApiService.deleteGoal(id);
        this.setState({
            allGoals: this.state.allGoals.filter((Goal) => Goal.id !== id),
            pastGoals: [...this.state.pastGoals, newPastGoal]
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
            toast.warn(`${Goal.type} Goal Deleted`);
            GoalApiService.deleteGoal(Goal.id)
                .then(() => this.setState({allGoals: this.state.allGoals.filter((G) => Goal.id !== G.id)}))
        } else {
            toast.warn('Objective Deleted', {autoClose: 2000});
            GoalApiService.patchGoal(Goal, goalID);
            this.setState({allGoals: this.state.allGoals});
        }
    }

    deleteGoalAdd(neat, ID) {
        let newGoals = this.state.currentGoal.goals.filter(g => g.id !== ID);
        toast.warn('Objective Deleted', {autoClose: 2000})
        this.setState({
            currentGoal: {
                type: this.state.currentGoal.type, date: this.state.currentGoal.date,
                goals: newGoals
            }
        })
    }

    deletePastGoal(goalID, ID) {
        let Goal = this.state.pastGoals.find(g => g.id === goalID);
        let {checked} = Goal.goals.find(g => g.id === ID);
        Goal.goals = Goal.goals.filter(g => g.id !== ID);
        if (checked) {
            Goal.checkedamt = Goal.checkedamt - 1;
        }
        if (Goal.goals.length <= 0) {
            toast.warn(`Past ${Goal.type} Goal Deleted`, {autoClose: 2000});
            PastGoalService.deletePastGoal(Goal.id)
                .then(() => this.setState({pastGoals: this.state.pastGoals.filter((G) => Goal.id !== G.id)}))
        } else {
            toast.warn('Past Objective Deleted', {autoClose: 2000});
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

        newGoalList.splice(newGoalListIndex, 0, currentGoalList);
        this.setState({allGoals: newGoalList})
    }

    handleGoalAdd(Goal){
        this.setState({currentGoal: Goal});
    }

    handleSubmitAdd(e) {
        e.preventDefault();
        if (this.state.currentGoal.goals.length > 0) {
            this.addGoal(this.state.currentGoal);
            toast.success(`${this.state.currentGoal.type} Goal Added!`);
            this.setState({
                currentGoal: {
                    type: this.state.selectedType,
                    goals: [],
                    date: new Date().toISOString()
                }
            });
        } else {
            toast.error(`The ${this.state.currentGoal.type} Goal is Missing Objectives.`)
        }
    }
    changeSelectedType(type){
        this.setState({selectedType: type})
    }
    render() {
        const value = {
            themes: ['Blue / White', 'Blue / Black', 'Red / White', 'Red / Black'],
            currentTheme: this.state.currentTheme,
            autoArchiving: this.state.autoArchiving,
            username: this.state.username,
            email: this.state.email,
            id: this.state.id,
            nickname: this.state.nickname,
            toggleArchiving: () => {
                this.setState({autoArchiving: !this.state.autoArchiving})
            },
            setTheme: (e) => {
                this.setState({currentTheme: e})
            },
            updateNickname: (e) => {
                //UserService.saveUser(JSON.stringify({username: this.context.username, nickname: this.context.nickname, email: this.context.email, id:this.context.id}));
                this.setState({nickname: e})
            },
            updateEmail: (e) => {
                this.setState({email: e})
            }
        };
        return (
            <Router>
                <SettingsContext.Provider value={value}>
                    <div className="App">
                        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={5000} hideProgressBar={false}
                                        pauseOnHover={true} draggablePercent={60}/>
                        <Route render={(routeProps) => !(TokenService.hasAuthToken()) ? '' :
                            <TopNav currentActive={routeProps.location}
                                    links={this.state.links}/>}/>
                        <Switch>
                            <Route
                                exact path={'/'}>
                                {!(TokenService.hasAuthToken()) ? <Redirect to={'/login'}/> : <Home
                                    allGoals={this.state.allGoals} deleteGoal={this.deleteGoal} pushGoal={this.pushGoal}
                                    handleChecked={this.handleChecked}/>}
                            </Route>
                            <Route exact path={'/add'}>
                                {!(TokenService.hasAuthToken()) ? <Redirect to={'/login'}/> :
                                    <AddGoal types={this.state.types}
                                             selectedType={this.state.selectedType}
                                             currentGoal={this.state.currentGoal}
                                             addGoal={this.addGoal}
                                             deleteGoal={this.deleteGoal}
                                             changeSelectedType={this.changeSelectedType}
                                             handleSubmit={this.handleSubmitAdd}
                                             handleGoalAdd={this.handleGoalAdd}
                                             deleteGoalAdd={this.deleteGoalAdd}
                                             handleChecked={this.handleChecked}/>}
                            </Route>

                            <Route
                                exact path={'/past-goals'}>
                                {!(TokenService.hasAuthToken()) ? <Redirect to={'/login'}/> : <PastGoalsLinks
                                    types={this.state.types}/>}</Route>
                            <Route path={'/past-goals/'}
                                   component={(routeProps) => !(TokenService.hasAuthToken()) ?
                                       <Redirect to={'/login'}/> :
                                       <PastGoals
                                           type={routeProps.location.pathname.substring(12)}
                                           deleteGoal={this.deletePastGoal}
                                           handleChecked={this.handleChecked}

                                           pastGoals={this.state.pastGoals.filter((pg) => pg.type === routeProps.location.pathname.substring(12))}/>}/>
                            <Route
                                exact path={'/settings'}>
                                {!(TokenService.hasAuthToken()) ? <Redirect to={'/login'}/> : <Settings/>}
                            </Route>
                            <Route path={'/login'}> {(TokenService.hasAuthToken()) ? <Redirect to={'/'}/> :
                                <Login/>}</Route>
                            <Route path={'/register'}> {(TokenService.hasAuthToken()) ? <Redirect to={'/'}/> :
                                <Register/>}</Route>
                        </Switch>
                        {/*<Route exact path="/settings"><Settings/></Route>*/}

                    </div>
                </SettingsContext.Provider>
            </Router>
        )
            ;
    }
}

export default App;
