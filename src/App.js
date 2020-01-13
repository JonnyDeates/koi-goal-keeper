import React from 'react';
import './App.css';
import Home from './Home/Home.js'
import TopNav from './TopNav/TopNav.js'
import AddGoal from './AddGoal/AddGoal.js'
import {Route, Switch, Redirect} from "react-router-dom";
import PastGoals from "./PastGoals/PastGoals";
import Login from "./Login/Login";
import Register from "./Register/Register";
import GoalApiService from "./services/goals-api-service";
import TokenService from "./services/token-service";
import PastGoalService from "./services/pastgoals-api-service";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Settings from "./Settings/Settings";
import ObjectivesApiService from "./services/objectives-api-service";
import PastObjectivesApiService from "./services/pastobjectives-api-service";
import UserService from "./services/user-api-service";
import LandingPage from "./LandingPage/LandingPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        let iconFolder = './assets/icons/';
        this.state = {
            allGoals: [],
            pastGoals: [],
            selectedType: 'Daily',
            currentGoal: {
                type: 'Daily',
                goals: [],
                date: new Date().toISOString()
            },
            links: [{to: '/', name: 'Home', src: require(`${iconFolder}home.ico`)}, {
                to: '/add', name: 'Add', src: require(`${iconFolder}document.ico`)
            }, {to: '/past-goals', name: 'Past Goals', src: require(`${iconFolder}archive.ico`)}, {
                to: '/settings',
                name: 'Settings',
                src: require(`${iconFolder}user.ico`)
            }]
        };
        this.addGoal = this.addGoal.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.deleteGoalAdd = this.deleteGoalAdd.bind(this);
        this.deletePastGoal = this.deletePastGoal.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.pushGoal = this.pushGoal.bind(this);
        this.changeSelectedType = this.changeSelectedType.bind(this);
        this.handleGoalAdd = this.handleGoalAdd.bind(this);
        this.handleObjectiveClone = this.handleObjectiveClone.bind(this);
        this.handleEditGoal = this.handleEditGoal.bind(this);
        this.handleEditCurrentGoal = this.handleEditCurrentGoal.bind(this);

    }

    componentDidMount() {
        if (TokenService.getAuthToken()) {
            GoalApiService.getAllGoals()
                .then((res) => this.setState({allGoals: this.breakApartAllGoalData(res, false)}))
                .then(() => {
                    if (UserService.getUser().autoArchiving) {
                        this.state.allGoals.forEach(Goal => this.checkCurrentGoals(Goal));
                    }
                    this.state.allGoals.sort((A, B) => new Date(A.date) - new Date(B.date));
                });
            PastGoalService.getAllPastGoals()
                .then((res) => this.setState({pastGoals: this.breakApartAllGoalData(res, true)}));

        }

    }

    breakApartAllGoalData(data, isPast) {
        return data.map(Goal => Goal = this.breakApartGoalData(Goal, isPast))
    }

    breakApartGoalData(data, isPast) {
        let x = {
            type: data.type,
            checkedamt: parseInt(data.checkedamt),
            id: data.id,
            userid: data.userid,
            date: data.date,
            goals: []
        };
        if (isPast) {
            PastObjectivesApiService.getObjectiveList(data.id).then(res => x.goals = res).then(() => this.forceUpdate());
        } else {
            ObjectivesApiService.getObjectiveList(data.id).then(res => x.goals = res).then(() => this.forceUpdate());
        }
        return x;
    }

    checkCurrentGoals(Goal) {
        let currentDate = new Date().getTime();
        if (new Date(Goal.date).getTime() < currentDate) {
            const newPastGoalList = this.state.allGoals.find(g => g.id = Goal.id)
            PastGoalService.postPastGoal(newPastGoalList)
                .then((res) =>
                    newPastGoalList.goals.map(pg => PastObjectivesApiService.postObjective({
                            obj: pg.obj,
                            checked: pg.checked,
                            goalid: res.id
                        })
                    ));
            GoalApiService.deleteGoal(Goal.id);
        }
        this.setState({
            allGoals: this.state.allGoals.filter((Goal) => (new Date(Goal.date).getTime()) >= currentDate)
        });
    }

    pushGoal(id) {
        let newPastGoal = this.state.allGoals.find(g => g.id === id);
        toast.success(`Archived ${newPastGoal.type} Goal`);
        PastGoalService.postPastGoal(newPastGoal)
            .then((res) =>
                newPastGoal.goals.map(pg => PastObjectivesApiService.postObjective({
                        obj: pg.obj,
                        checked: pg.checked,
                        goalid: res.id
                    })
                ));
        GoalApiService.deleteGoal(id);
        this.setState({
            allGoals: this.state.allGoals.filter((Goal) => Goal.id !== id)
                .sort((A, B) => new Date(A.date) - new Date(B.date)),
            pastGoals: [...this.state.pastGoals, newPastGoal]
        });
    }

    addGoal(goal) {
        GoalApiService.postGoal(goal)
            .then((res) => {
                this.state.currentGoal.goals.forEach((obj) =>
                    ObjectivesApiService.postObjective({obj: obj.obj, goalid: res.id}));
                this.setState({
                    allGoals: [...this.state.allGoals, this.breakApartGoalData(res)]
                        .sort((A, B) => new Date(A.date) - new Date(B.date))
                })
            }).then(() => this.forceUpdate())
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
            ObjectivesApiService.deleteObjective(ID);
            GoalApiService.deleteGoal(Goal.id)
                .then(() => this.setState({allGoals: this.state.allGoals.filter((G) => Goal.id !== G.id)}))
        } else {
            toast.warn('Objective Deleted', {autoClose: 2000});
            ObjectivesApiService.deleteObjective(ID);
            this.setState({allGoals: this.state.allGoals});
        }
    }

    deleteGoalAdd(neat, ID) {
        let newGoals = this.state.currentGoal.goals.filter(g => g.id !== ID);
        newGoals.forEach((goal, i) => {
            goal.id = (i);
        });
        console.log(this.state.currentGoal, newGoals)
        toast.warn('Objective Deleted', {autoClose: 2000});
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
        PastObjectivesApiService.deleteObjective(ID);
        if (Goal.goals.length <= 0) {
            toast.warn(`Past ${Goal.type} Goal Deleted`, {autoClose: 2000});
            PastGoalService.deletePastGoal(Goal.id)
                .then(() => this.setState({pastGoals: this.state.pastGoals.filter((G) => Goal.id !== G.id)}))
        } else {
            toast.warn('Past Objective Deleted', {autoClose: 2000});
            PastGoalService.patchPastGoal(Goal, Goal.id);
        }
        this.forceUpdate();
    }

    handleChecked(goalId, ID) {
        let allGoals = this.state.allGoals;
        let currentGoalList = allGoals.find(G => G.id === goalId);
        ObjectivesApiService.toggleChecked(ID).then((res) => {
            let x = currentGoalList.checkedamt;
            currentGoalList.checkedamt = (res.checked) ? x + 1 : x - 1;
            GoalApiService.patchGoal(currentGoalList, goalId);
            currentGoalList.goals.splice(currentGoalList.goals.findIndex((goal) => goal.id === res.id), 1, res);
            allGoals.splice(allGoals.findIndex(goal => goal.id === goalId), 1, currentGoalList);
            this.forceUpdate();
        })
    };

    handleGoalAdd(Goal) {
        this.setState({currentGoal: Goal});
    }

    handleObjectiveClone(goalID, id) {
        let goals = [...this.state.allGoals, ...this.state.pastGoals].find(goalList => goalList.id === goalID).goals;
        let newObj = {obj: goals.find(Obj => Obj.id === id).obj, id: this.state.currentGoal.goals.length || 0};
        toast.success('Objective Copied', {autoClose: 1500});
        this.setState({
            currentGoal:
                {
                    date: this.state.currentGoal.date, type: this.state.currentGoal.type,
                    goals: [newObj, ...this.state.currentGoal.goals]
                }
        });
    }

    handleEditCurrentGoal(obj, neat, ID) {
        if (obj.length === 0)
            return;
        let newObj = {obj, id: ID, checked: obj.checked};
        this.state.currentGoal.goals.splice(this.state.currentGoal.goals.findIndex((Obj) => Obj.id === ID), 1, newObj);
        this.forceUpdate();
    }

    handleEditGoal(OBJ, goalID, ID) {
        if (OBJ.length === 0)
            return;
        if (!!this.state.allGoals.find(gl => gl.id === goalID)) {
            const allGoals = this.state.allGoals;
            const GoalList = allGoals.find(goalList => goalList.id === goalID);
            const obj = GoalList.goals.find(Obj => Obj.id === ID);
            let newObj = {obj: OBJ, id: ID, checked: obj.checked};
            GoalList.goals.splice(GoalList.goals.findIndex((Obj) => Obj.id === obj.id), 1, newObj);
            ObjectivesApiService.patchObjective({obj: OBJ}, ID);

        } else {
            const pastGoals = this.state.pastGoals;
            const GoalList = pastGoals.find(goalList => goalList.id === goalID);
            const obj = GoalList.goals.find(Obj => Obj.id === ID);
            let newObj = {obj: OBJ, id: obj.id, checked: obj.checked};
            GoalList.goals.splice(GoalList.goals.findIndex(obj), 1, newObj);
            PastObjectivesApiService.patchObjective({obj: OBJ}, ID);
        }
        this.forceUpdate()
    }

    handleSubmitAdd(e) {
        e.preventDefault();
        if (this.state.currentGoal.goals.length > 0) {
            toast.success(`${this.state.currentGoal.type} Goal Added!`);
            let date = new Date(this.state.currentGoal.date);
            date = date.setDate(date.getDate() - 1)
            let x = new Date(date).toISOString();
            GoalApiService.postGoal(Object.assign(this.state.currentGoal, {date: x}))
                .then((res) => {
                    this.state.currentGoal.goals.forEach((obj) =>
                        ObjectivesApiService.postObjective({
                            obj: obj.obj,
                            goalid: res.id
                        }).then(() => this.forceUpdate()));
                    this.setState({
                        allGoals: [...this.state.allGoals, this.breakApartGoalData(res)]
                            .sort((a, b) => new Date(a.date) - new Date(b.date)),
                        currentGoal: {
                            type: this.state.selectedType,
                            goals: [],
                            date: new Date().toISOString()
                        }
                    });
                })
        } else {
            toast.error(`The ${this.state.currentGoal.type} Goal is Missing Objectives.`)
        }
    }

    changeSelectedType(type) {
        this.setState({selectedType: type})
    }

    render() {
        return (
            <div className="App">
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={5000} hideProgressBar={false}
                                pauseOnHover={true} draggablePercent={60}/>
                <Route exact path={'/home'}> {(TokenService.hasAuthToken()) ? <Redirect to={'/'}/> :
                    <LandingPage/>}</Route>
                <div className={'App-Pages'}>
                    <section className="min-Width">
                        <Route render={(routeProps) => !(TokenService.hasAuthToken()) ? '' :
                            <TopNav currentActive={routeProps.location}
                                    links={this.state.links}/>}/>
                    </section>
                    <section className="min-Width-Two">
                        <Switch>
                            <Route
                                exact path={'/'}>
                                {!(TokenService.hasAuthToken()) ? <Redirect to={'/home'}/> : <Home
                                    allGoals={this.state.allGoals} deleteGoal={this.deleteGoal} pushGoal={this.pushGoal}
                                    handleEditGoal={this.handleEditGoal}
                                    handleChecked={this.handleChecked}
                                    handleObjectiveClone={this.handleObjectiveClone}/>}
                            </Route>
                            <Route exact path={'/add'}>
                                {!(TokenService.hasAuthToken()) ? <Redirect to={'/home'}/> :
                                    <AddGoal selectedType={this.state.selectedType}
                                             currentGoal={this.state.currentGoal}
                                             addGoal={this.addGoal}
                                             deleteGoal={this.deleteGoal}
                                             changeSelectedType={this.changeSelectedType}
                                             handleSubmit={this.handleSubmitAdd}
                                             handleGoalAdd={this.handleGoalAdd}
                                             deleteGoalAdd={this.deleteGoalAdd}
                                             handleEditGoal={this.handleEditCurrentGoal}
                                             handleChecked={this.handleChecked}/>}
                            </Route>

                            <Route
                                exact path={'/past-goals'}>
                                {!(TokenService.hasAuthToken()) ? <Redirect to={'/home'}/> : <PastGoals
                                    types={this.state.types}
                                    deleteGoal={this.deletePastGoal}
                                    handleChecked={this.handleChecked}
                                    handleObjectiveClone={this.handleObjectiveClone}
                                    pastGoals={this.state.pastGoals.reverse()}/>}</Route>
                            <Route
                                exact path={'/settings'}>
                                {!(TokenService.hasAuthToken()) ? <Redirect to={'/login'}/> : <Settings/>}
                            </Route>
                            <Route path={'/login'}> {(TokenService.hasAuthToken()) ? <Redirect to={'/'}/> :
                                <Login/>}</Route>
                            <Route path={'/register'}> {(TokenService.hasAuthToken()) ? <Redirect to={'/'}/> :
                                <Register/>}</Route>

                        </Switch>
                    </section>
                    <section className="min-Width"/>
                </div>
            </div>

        )
            ;
    }
}

export default App;
