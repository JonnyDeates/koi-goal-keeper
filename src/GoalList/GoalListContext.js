import * as React from "react";
import TokenService from "../services/local/token-service";
import GoalApiService from "../services/database/goals-api-service";
import PastGoalApiService from "../services/database/pastgoals-api-service";
import PastObjectivesApiService from "../services/database/pastobjectives-api-service";
import ObjectivesApiService from "../services/database/objectives-api-service";
import {toast} from "react-toastify";
import SettingsService from "../services/local/settings-service";
import {getTime, uuid} from "../Utils/Utils";
import GoalService from "../services/local/goals-service";
import PastGoalService from "../services/local/pastgoals-service";

export const GoalListContext = React.createContext({
    currentGoals: [],
    pastGoals: [],
    selectedType: '',
    selectedDate: null,
    currentGoal: {
        type: 'Daily',
        goals: [],
        date: new Date().toISOString()
    },
    toggleArchiving: () => {
    },
    toggleShowDelete: () => {
    },
    toggleCompacted: () => {
    },
    setTheme: () => {
    },
    setType: () => {
    },
    updateNickname: () => {
    },
    updateEmail: () => {
    }
});

export class GoalListProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGoals: [],
            pastGoals: [],
            selectedType: '',
            selectedDate: null,
            currentGoal: {
                type: 'Daily',
                goals: [],
                date: new Date().toISOString()
            },
        };
        this.addGoal = this.addGoal.bind(this);
        this.breakApartAllGoalData = this.breakApartAllGoalData.bind(this);
        this.breakApartGoalData = this.breakApartGoalData.bind(this);
        this.checkCurrentGoals = this.checkCurrentGoals.bind(this);
        this.deleteGoal = this.deleteGoal.bind(this);
        this.deletePastGoal = this.deletePastGoal.bind(this);
        this.handleAddObjective = this.handleAddObjective.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleEditCurrentGoal = this.handleEditCurrentGoal.bind(this);
        this.handleEditGoal = this.handleEditGoal.bind(this);
        this.handleGoalAdd = this.handleGoalAdd.bind(this);
        this.handleObjectiveClone = this.handleObjectiveClone.bind(this);
        this.handlePastObjectiveClone = this.handlePastObjectiveClone.bind(this);
        this.handleSelectedType = this.handleSelectedType.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.pushGoal = this.pushGoal.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.updateTypeTimeline = this.updateTypeTimeline.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        if (window.gapi) {
            window.gapi.load('auth2', () => {
                this.auth2 = window.gapi.auth2.init({
                    client_id: '210398171394-4tvu2p5580kl3d959vidn4avuif5p53n.apps.googleusercontent.com',
                })
            })
        }
    }

    fetchData() {
        if (TokenService.getAuthToken()) { // Checks to see if the user has a webtoken
            if (!SettingsService.isLocal()) {
                GoalApiService.getAllGoals() // Gets all of the current goals from the server
                    .then((res) => this.setState({currentGoals: this.breakApartAllGoalData(res, false)}, () =>
                        setTimeout(() => { // Time out is to ensure that the current Goal lists have the goals mapped on
                            if (!!SettingsService.getSettings().auto_archiving)  // Checks to see if the user has auto archiving enabled
                                this.state.currentGoals.forEach(Goal => this.checkCurrentGoals(Goal));
                        }, 200)
                    ));
                PastGoalApiService.getAllPastGoals() // Gets all of the current goals from the server
                    .then((res) => this.setState({pastGoals: this.breakApartAllGoalData(res, true)}));
            } else {
                if (GoalService.hasGoals())
                    this.setState({currentGoals: GoalService.getAllGoals()}, () =>
                        (!!SettingsService.getSettings().auto_archiving) ? this.state.currentGoals.forEach(Goal => this.checkCurrentGoals(Goal)) : '')
                if (PastGoalService.hasPastGoals())
                    this.setState({pastGoals: PastGoalService.getAllPastGoals()})
            }
        }
    }

    addGoal(goal) {
        this.setState({currentGoals: [...this.state.currentGoals, goal]}, () => GoalService.saveGoals(this.state.currentGoals));

        if (!SettingsService.isLocal()) {
            GoalApiService.postGoal(goal)
                .then((res) => {
                    this.state.currentGoal.goals.forEach((obj) =>
                        ObjectivesApiService.postObjective({obj: obj.obj, goalid: res.id}));
                })
        }
    }

    breakApartAllGoalData(data, isPast) {
        return data.map((Goal, i) => Goal = this.breakApartGoalData(Goal, isPast));
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
        let newType = this.updateTypeTimeline(x);
        if (x.type !== newType) {
            x.type = newType;
            GoalApiService.patchGoal({type: newType, checkedamt: x.checkedamt, date: x.date}, x.id)
        }

        if (isPast) {
            PastObjectivesApiService.getObjectiveList(data.id).then(res => x.goals = res).then(() => this.forceUpdate())
        } else {
            ObjectivesApiService.getObjectiveList(data.id).then(res => x.goals = res)
                .then(() => {
                        if (x.goals.length === 0) {
                            // Figure it out here
                            GoalApiService.deleteGoal(x.id)
                        }
                        return this.forceUpdate()
                    }
                )
        }

        return x;
    }

    checkCurrentGoals(Goal) {
        let currentDate = new Date().getTime(); // Gets the Current Local Date
        let GoalDate = new Date(Goal.date).getTime(); // Gets the Current Date of the Goal
        if (GoalDate < currentDate) { // Checks to see if the current goal date is before the current Date
            if (Goal && Goal.goals && Goal.goals.length > 0) {
                if (!SettingsService.isLocal()) {
                    PastGoalApiService.postPastGoal(Goal).then((res) =>
                        Goal.goals.map(pg => PastObjectivesApiService.postObjective({
                                obj: pg.obj,
                                checked: pg.checked,
                                goalid: res.id
                            })
                        )).then(() => this.setState({pastGoals: [Goal, ...this.state.pastGoals]}));
                    GoalApiService.deleteGoal(Goal.id);
                } else {
                    let previousGoals = this.state.currentGoals.filter((Goal) => (new Date(Goal.date).getTime()) < currentDate);
                    previousGoals.forEach((pastGoal) => pastGoal.id = uuid());
                    this.setState({pastGoals: [...previousGoals, ...this.state.pastGoals]}, () => PastGoalService.savePastGoals(this.state.pastGoals))
                }
            }
            this.setState({
                currentGoals: this.state.currentGoals.filter((Goal) => (new Date(Goal.date).getTime()) >= currentDate),
            }, () => GoalService.saveGoals(this.state.currentGoals));
        }
    }

    deleteGoal(goalID, ID) {
        let Goal = this.state.currentGoals.find(g => g.id === goalID);
        let {checked} = Goal.goals.find(g => g.id === ID);
        Goal.goals = Goal.goals.filter(g => g.id !== ID);
        let goalLength = Goal.goals.length <= 0;
        if (checked) {
            Goal.checkedamt = Goal.checkedamt - 1;
        }
        if (goalLength) {
            toast.warn(`${Goal.type} Goal Deleted`);
            this.setState({currentGoals: this.state.currentGoals.filter((G) => Goal.id !== G.id)}, () => GoalService.saveGoals(this.state.currentGoals))
        } else {
            toast.warn('Objective Deleted', {autoClose: 2000});
            this.setState({currentGoals: this.state.currentGoals}, () => GoalService.saveGoals(this.state.currentGoals));
        }
        if (!SettingsService.isLocal()) { // Handles Local Check
            if (goalLength) { // Checks to see if Goal Length Exists & is not 0
                GoalApiService.deleteGoal(Goal.id) // Deletes Goal List
            } else {
                GoalApiService.patchGoal(Goal, Goal.id)
            }
            ObjectivesApiService.deleteObjective(ID);  // Deletes Objective
        }
    }

    deletePastGoal(goalID, ID) {
        let Goal = this.state.pastGoals.find(g => g.id === goalID);
        let {checked} = Goal.goals.find(g => g.id === ID);
        Goal.goals = Goal.goals.filter(g => g.id !== ID);
        let goalLength = Goal.goals.length <= 0;
        if (checked) {
            Goal.checkedamt = Goal.checkedamt - 1;
        }

        if (goalLength) {
            toast.warn(`Past ${Goal.type} Goal Deleted`, {autoClose: 2000});
            this.setState({pastGoals: this.state.pastGoals.filter((G) => Goal.id !== G.id)}, () => PastGoalService.savePastGoals(this.state.pastGoals))

        } else {
            toast.warn('Past Objective Deleted', {autoClose: 2000});
            this.setState({pastGoals: this.state.pastGoals}, () => PastGoalService.savePastGoals(this.state.pastGoals));
        }
        if (!SettingsService.isLocal()) { // Handles Local Check
            if (goalLength) { // Checks to see if Goal Length Exists & is not 0
                PastGoalApiService.deletePastGoal(Goal.id)
                    .then(() => this.setState({pastGoals: this.state.pastGoals.filter((G) => Goal.id !== G.id)}))
            } else {
                PastGoalApiService.patchPastGoal(Goal, Goal.id);
            }
            PastObjectivesApiService.deleteObjective(ID);
        }
    }

    handleAddObjective(Id) {
        let objective = {obj: '', id: uuid(), goalid: Id, checked: false, newObj: true}
        let AllGoals = this.state.currentGoals;
        let currentGoal = AllGoals.find((goallist) => goallist.id === Id);

        currentGoal.goals.push(objective)

        this.setState({currentGoals: AllGoals})
    }

    handleChecked(goalId, ID) {
        let allGoals = this.state.currentGoals;
        let currentGoalList = allGoals.find(G => G.id === goalId);
        let checkedAmt = currentGoalList.checkedamt;
        let currentObj = currentGoalList.goals.find((obj) => obj.id === ID);

        if (typeof currentGoalList.checkedamt === 'undefined' || typeof currentGoalList.checkedamt === 'NaN') { // Handles Local Storage Bug
            checkedAmt = 0
        }
        currentGoalList.checkedamt = !(currentObj.checked) ? checkedAmt + 1 : checkedAmt - 1; // Sets The Goalist's Checked Amount
        currentObj.checked = !currentObj.checked; // Reverses the Current Goals Checked

        this.setState({currentGoals: allGoals}, () => GoalService.saveGoals(this.state.currentGoals)); // Sets the State & Saves

        if (!SettingsService.isLocal()) { // Checks to see if Local
            ObjectivesApiService.toggleChecked(ID); // Updates The Objective Checked
            GoalApiService.patchGoal(currentGoalList, currentGoalList.id); // Updates the Current Goals Checked Amount
        }
    }

    handleEditCurrentGoal(obj, neat, ID) {
        if (obj.length === 0)
            return;
        let newObj = {obj, id: ID, checked: obj.checked};
        this.state.currentGoal.goals.splice(this.state.currentGoal.goals.findIndex((Obj) => Obj.id === ID), 1, newObj);
        this.forceUpdate();
    }

    handleEditGoal(str, goalID, ID) {
        if (str.length === 0)
            return;

        const allGoals = this.state.currentGoals;
        const GoalList = allGoals.find(goalList => goalList.id === goalID);
        const obj = GoalList.goals.find(Obj => Obj.id === ID);
        let newObj = {obj: str, id: ID, checked: obj.checked};
        GoalList.goals.splice(GoalList.goals.findIndex((Obj) => Obj.id === obj.id), 1, newObj);

        this.setState({currentGoals: allGoals}, () => GoalService.saveGoals(this.state.currentGoals));
        if (!SettingsService.isLocal()) {
            if(obj.newObj){
                let newObj = {obj: str, goalid: goalID};
                ObjectivesApiService.postObjective(newObj).then((obj)=> {
                    newObj.id = obj.id;
                    newObj.checked = obj.checked;
                    GoalList.goals.splice(GoalList.goals.findIndex((Obj) => Obj.id === obj.id), 1, newObj);
                    this.setState({currentGoals: allGoals}, () => GoalService.saveGoals(this.state.currentGoals));
                })
            } else {
                ObjectivesApiService.patchObjective({obj: str}, ID);
            }
        }
    }

    handleGoalAdd(Goal) {
        this.setState({currentGoal: Goal});
    }

    handleObjectiveClone(goalID, id) {
        let goals = this.state.currentGoals.find(goalList => goalList.id === goalID).goals;
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

    handlePastObjectiveClone(goalID, id) {
        let goals = this.state.pastGoals.find(goalList => goalList.id === goalID).goals;
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

    handleSelectedType(type) {
        this.setState({selectedType: type})
    }

    handleSubmitAdd(e) {
        e.preventDefault();
        if (this.state.currentGoal.goals.length > 0) {
            const {goals, date} = this.state.currentGoal;
            let newCurrentGoal = {type: this.state.currentGoal.type, goals, date, id: uuid()};
            if (this.state.currentGoal.type === 'Other') { // Checks to see if the Type was Other
                newCurrentGoal.type = this.updateTypeTimeline(this.state.currentGoal);
                this.setState({currentGoal: newCurrentGoal})
            }
            // Checks to see if it is only local content
            if (!SettingsService.isLocal()) {
                let goals = this.state.currentGoal.goals;
                // Posting The Goal with a Fetch Call
                GoalApiService.postGoal(newCurrentGoal)
                    .then((res) => {
                        console.log(res)
                        goals.forEach((obj) =>
                            // Posting Each Objective
                            ObjectivesApiService.postObjective({
                                obj: obj.obj,
                                goalid: res.id
                            }))
                    });
            }
            this.setState({
                currentGoals: [...this.state.currentGoals, newCurrentGoal]
                    .sort((a, b) => new Date(a.date) - new Date(b.date)),
                currentGoal: {
                    type: this.state.currentGoal.type,
                    goals: [],
                    date: this.state.currentGoal.date
                }
            }, () => GoalService.saveGoals(this.state.currentGoals));
            toast.success(`${this.state.currentGoal.type} Goal Added!`);
        } else {
            toast.error(`The ${this.state.currentGoal.type} Goal is Missing Objectives.`)
        }
    }

    pushGoal(id) { // Pushes a Current Goal to The Past Goal
        let newPastGoal = this.state.currentGoals.find(g => g.id === id);
        this.setState({
            currentGoals: this.state.currentGoals.filter((Goal) => Goal.id !== id),
            pastGoals: [...this.state.pastGoals, newPastGoal]
        }, () => {
            GoalService.saveGoals(this.state.currentGoals);
            PastGoalService.savePastGoals(this.state.pastGoals);
        });
        toast.success(`Archived ${newPastGoal.type} Goal`);
        if (!SettingsService.isLocal()) {
            PastGoalApiService.postPastGoal(newPastGoal)
                .then((res) =>
                    newPastGoal.goals.map(pg => PastObjectivesApiService.postObjective({
                            obj: pg.obj,
                            checked: pg.checked,
                            goalid: res.id
                        })
                    ));
            GoalApiService.deleteGoal(id);
        }
    }

    updateTypeTimeline(Goal) {
        let GoalDate = new Date(Goal.date).getTime();
        let types = (SettingsService.getSettings().types);
        for (let x = 0; x < types.length; x++) {
            if (GoalDate <= getTime(types[x]).getTime()) {
                return types[x]
            }
        }
        return 'Distant'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            this.forceUpdate();
        }
    }

    render() {
        const value = {
            currentGoals: this.state.currentGoals,
            pastGoals: this.state.pastGoals,
            selectedType: this.state.selectedType,
            selectedDate: this.state.selectedDate,
            currentGoal: this.state.currentGoal,
            addGoal: this.addGoal,
            breakApartAllGoalData: this.breakApartAllGoalData,
            breakApartGoalData: this.breakApartGoalData,
            checkCurrentGoals: this.checkCurrentGoals,
            deleteGoal: this.deleteGoal,
            deletePastGoal: this.deletePastGoal,
            handleAddObjective: this.handleAddObjective,
            handleChecked: this.handleChecked,
            handleEditCurrentGoal: this.handleEditCurrentGoal,
            handleEditGoal: this.handleEditGoal,
            handleGoalAdd: this.handleGoalAdd,
            handleObjectiveClone: this.handleObjectiveClone,
            handlePastObjectiveClone: this.handlePastObjectiveClone,
            handleSelectedType: this.handleSelectedType,
            handleSubmitAdd: this.handleSubmitAdd,
            pushGoal: this.pushGoal,
            fetchData: this.fetchData,
            updateTypeTimeline: this.updateTypeTimeline,
        };
        return (
            <GoalListContext.Provider value={value}>
                {this.props.children}
            </GoalListContext.Provider>
        )
    }
}
