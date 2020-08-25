const PastGoalService = {
    serializePastGoals(goals){
        return JSON.stringify({goals})
    },
    getAllPastGoals() {
        try {
            return JSON.parse(window.localStorage.getItem('past-goals')).goals;
        } catch(error){
            console.log(error);
            return null;
        }},
    getPastGoal(goalId) {
        const goals = PastGoalService.getAllPastGoals();
        return goals.find((goal) => goal.id === goalId)
    },
    savePastGoals(goals) {
        window.localStorage.setItem('past-goals', this.serializePastGoals(goals))
    },
    hasPastGoals() {
        return !!PastGoalService.getAllPastGoals()
    }
};

export default PastGoalService
