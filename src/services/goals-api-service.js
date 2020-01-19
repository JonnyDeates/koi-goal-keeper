import config from '../config'
import TokenService from "./token-service";

const GoalApiService = {
    getAllGoals() {
        return fetch(`${config.API_ENDPOINT}/goals`, {
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
    getGoal(goalId) {
        return fetch(`${config.API_ENDPOINT}/goals/${goalId}`, {
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
    patchGoal(goal, id) {
        return fetch(`${config.API_ENDPOINT}/goals/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                type: goal.type,
                date: goal.date,
                checkedamt: goal.checkedamt
            }),
        })
    },
    postGoal(goal) {
        return fetch(`${config.API_ENDPOINT}/goals`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                type: goal.type,
                goals: goal.goals,
                date: goal.date,
                checkedamt: 0
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    deleteGoal(id) {
        return fetch(`${config.API_ENDPOINT}/goals/${id}`, {
            method: 'DELETE',
            headers: {'authorization': `bearer ${TokenService.getAuthToken()}`}
        })
    }
};

export default GoalApiService