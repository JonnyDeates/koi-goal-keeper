import config from '../config'
import TokenService from "./token-service";

const PastGoalApiService = {
    getAllPastGoals() {
        return fetch(`${config.API_ENDPOINT}/pastgoals`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getPastGoal(goalId) {
        return fetch(`${config.API_ENDPOINT}/pastgoals/${goalId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    patchPastGoal(goal, id) {
        return fetch(`${config.API_ENDPOINT}/pastgoals/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                type: goal.type,
                goals: goal.goals,
                date: goal.date,
                checkedamt: goal.checkedamt
            }),
        })
    },
    postPastGoal(pastgoal) {
        return fetch(`${config.API_ENDPOINT}/pastgoals`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                type: pastgoal.type,
                goals: pastgoal.goals,
                date: pastgoal.date,
                checkedamt: pastgoal.checkedamt
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    deletePastGoal(id) {
        return fetch(`${config.API_ENDPOINT}/pastgoals/${id}`, {
            method: 'DELETE',
            headers: {'authorization': `bearer ${TokenService.getAuthToken()}`}
        })
    }
}

export default PastGoalApiService