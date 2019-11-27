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
    postGoal(pastgoal) {
        return fetch(`${config.API_ENDPOINT}/pastgoal`, {
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
    }
}

export default PastGoalApiService