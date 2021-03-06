const GoalService = {
    serializeGoals(goals){
        return JSON.stringify({goals})
    },
    getAllGoals() {
        try {
            return JSON.parse(window.localStorage.getItem('goals')).goals;
        } catch(error){
            console.log(error);
            return null;
        }},
    getGoal(goalId) {
        const goals = GoalService.getAllGoals();
        return goals.find((goal) => goal.id === goalId)
    },
    saveGoals(goals) {
        window.localStorage.setItem('goals', this.serializeGoals(goals))
    },
    hasGoals() {
        return !!GoalService.getAllGoals()
    },
    clearGoals(){
        window.localStorage.removeItem('goals')
    }
};

export default GoalService
