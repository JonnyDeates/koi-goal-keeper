import * as React from "react";
import UserService from "../services/user-api-service";
import TokenService from "../services/token-service";
import GoalApiService from "../services/goals-api-service";
import PastGoalService from "../services/pastgoals-api-service";
import PastObjectivesApiService from "../services/pastobjectives-api-service";
import ObjectivesApiService from "../services/objectives-api-service";
import {toast} from "react-toastify";

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
    }

    fetchData(callback = () => {
    }) {
        if (TokenService.getAuthToken()) {
            GoalApiService.getAllGoals()
                .then((res) => this.setState({currentGoals: this.breakApartAllGoalData(res, false)}))
                .then(() => {
                    if (UserService.getUser().autoArchiving) {
                        this.state.currentGoals.forEach(Goal => this.checkCurrentGoals(Goal));
                    }
                    this.state.currentGoals.sort((A, B) => new Date(A.date) - new Date(B.date));
                    callback();
                });
            PastGoalService.getAllPastGoals()
                .then((res) => this.setState({pastGoals: this.breakApartAllGoalData(res, true)}));


        }
    }

    addGoal(goal) {
        GoalApiService.postGoal(goal)
            .then((res) => {
                this.state.currentGoal.goals.forEach((obj) =>
                    ObjectivesApiService.postObjective({obj: obj.obj, goalid: res.id}));
                this.setState({currentGoals: [...this.state.currentGoals, this.breakApartGoalData(res)]})
            }).then(() => this.forceUpdate())
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
        let GoalDate = new Date(Goal.date).getTime();
        if (GoalDate < currentDate) {
            const newPastGoalList = this.state.currentGoals.find(g => g.id = Goal.id);
            PastGoalService.postPastGoal(newPastGoalList)
                .then((res) =>
                    newPastGoalList.goals.map(pg => PastObjectivesApiService.postObjective({
                            obj: pg.obj,
                            checked: pg.checked,
                            goalid: res.id
                        })
                    ));
            GoalApiService.deleteGoal(Goal.id);
            this.setState({
                currentGoals: this.state.currentGoals.filter((Goal) => (new Date(Goal.date).getTime()) >= currentDate)
            });
        } else {
            Goal.type = this.updateTypeTimeline(Goal);
            this.forceUpdate();
        }
    }

    deleteGoal(goalID, ID) {
        let Goal = this.state.currentGoals.find(g => g.id === goalID);
        let {checked} = Goal.goals.find(g => g.id === ID);
        Goal.goals = Goal.goals.filter(g => g.id !== ID);

        if (checked) {
            Goal.checkedamt = Goal.checkedamt - 1;
        }
        if (Goal.goals.length <= 0) {
            toast.warn(`${Goal.type} Goal Deleted`);
            ObjectivesApiService.deleteObjective(ID);
            GoalApiService.deleteGoal(Goal.id)
                .then(() => this.setState({currentGoals: this.state.currentGoals.filter((G) => Goal.id !== G.id)}))
        } else {
            toast.warn('Objective Deleted', {autoClose: 2000});
            ObjectivesApiService.deleteObjective(ID);
            this.setState({currentGoals: this.state.currentGoals});
        }
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
        let allGoals = this.state.currentGoals;
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
        if (!!this.state.currentGoals.find(gl => gl.id === goalID)) {
            const allGoals = this.state.currentGoals;
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
            let newCurrentGoal = {type: this.state.currentGoal.type, goals, date};
            if(this.state.currentGoal.type === 'Other') { // Checks to see if the Type was Other
                newCurrentGoal.type = this.updateTypeTimeline(this.state.currentGoal);
                this.setState({currentGoal: newCurrentGoal})
            }
            // Posting The Goal with a Fetch Call
            GoalApiService.postGoal(newCurrentGoal)
                .then((res) => {
                    this.state.currentGoal.goals.forEach((obj) =>
                        // Posting Each Objective
                        ObjectivesApiService.postObjective({
                            obj: obj.obj,
                            goalid: res.id
                        }).then(() => this.forceUpdate()));
                    // Reseting The Date to be properly Formated
                    let newDate = new Date();
                    newDate = newDate.setDate(newDate.getDate() + 1);
                    newDate = new Date(newDate).toISOString();
                    this.setState({
                        currentGoals: [...this.state.currentGoals, this.breakApartGoalData(res)]
                            .sort((a, b) => new Date(a.date) - new Date(b.date)),
                        currentGoal: {
                            type: this.state.currentGoal.type,
                            goals: [],
                            date: newDate
                        }
                    });
                });
            toast.success(`${this.state.currentGoal.type} Goal Added!`);
        } else {
            toast.error(`The ${this.state.currentGoal.type} Goal is Missing Objectives.`)
        }
    }

    pushGoal(id) { // Pushes a Current Goal to The Past Goal
        let newPastGoal = this.state.currentGoals.find(g => g.id === id);
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
            currentGoals: this.state.currentGoals.filter((Goal) => Goal.id !== id),
            pastGoals: [...this.state.pastGoals, newPastGoal]
        });
    }

    updateTypeTimeline(Goal) {
        let GoalDate = new Date(Goal.date).getTime();
        let type = '';
        if (this.getTime('Daily') < GoalDate && this.getTime('Weekly') > GoalDate) {
            type = 'Daily';
        } else if (this.getTime('Weekly') < GoalDate && this.getTime('BiWeekly') > GoalDate) {
            type = 'Weekly';
        } else if (this.getTime('BiWeekly') < GoalDate && this.getTime('Monthly') > GoalDate) {
            type = 'BiWeekly';
        } else if (this.getTime('Monthly') < GoalDate && this.getTime('Quarterly') > GoalDate) {
            type = 'Monthly';
        } else if (this.getTime('Quarterly') < GoalDate && this.getTime('6-Month') > GoalDate) {
            type = 'Quarterly';
        } else if (this.getTime('6-Month') < GoalDate && this.getTime('Yearly') > GoalDate) {
            type = '6-Month';
        } else if (this.getTime('Yearly') < GoalDate && this.getTime('3-Year') > GoalDate) {
            type = 'Yearly';
        } else if (this.getTime('3-Year') < GoalDate && this.getTime('5-Year') > GoalDate) {
            type = '3-Year';
        } else if (this.getTime('5-Year') < GoalDate && this.getTime('10-Year') > GoalDate) {
            type = '5-Year';
        } else if (this.getTime('10-Year') < GoalDate && this.getTime('25-Year') > GoalDate) {
            type = '10-Year';
        } else if (this.getTime('25-Year') < GoalDate && this.getTime('Distant') > GoalDate) {
            type = '25-Year';
        } else {
            type = 'Distant';
        }
        return type;
    }

    getTime(type) {
        let tempDate = new Date();
        switch (type) {
            case 'Daily':
                tempDate.setDate(tempDate.getDate());
                break;
            case 'Weekly':
                tempDate.setDate(tempDate.getDate() + 7);
                break;
            case 'BiWeekly':
                tempDate.setDate(tempDate.getDate() + (7 * 2));
                break;
            case 'Monthly':
                tempDate.setMonth(tempDate.getMonth() + 1);
                break;
            case 'Quarterly':
                tempDate.setMonth(tempDate.getMonth() + 3);
                break;
            case '6-Month':
                tempDate.setMonth(tempDate.getMonth() + 6);
                break;
            case 'Yearly':
                tempDate.setMonth(tempDate.getMonth() + 10);
                break;
            case '3-Year':
                tempDate.setMonth(tempDate.getMonth() + (3 * 12));
                break;
            case '5-Year':
                tempDate.setMonth(tempDate.getMonth() + (5 * 12));
                break;
            case '10-Year':
                tempDate.setMonth(tempDate.getMonth() + (10 * 12));
                break;
            case '25-Year':
                tempDate.setMonth(tempDate.getMonth() + (25 * 12));
                break;
            case 'Distant':
                tempDate.setMonth(tempDate.getMonth() + (30 * 12));
                break;
            default:
                tempDate.setDate(tempDate.getDate());
                break;
        }
        return tempDate.getTime();
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