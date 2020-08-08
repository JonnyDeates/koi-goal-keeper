import config from '../../config'
import TokenService from "../local/token-service";
const ObjectivesApiService = {
    getObjectiveList(id) {
        return fetch(`${config.API_ENDPOINT}/objectives/goal-list/${id}`, {
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
    getObjective(objectiveId) {
        return fetch(`${config.API_ENDPOINT}/objectives/${objectiveId}`, {
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
    patchObjective(objective, id) {
        return fetch(`${config.API_ENDPOINT}/objectives/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(objective),
        })
    },
    postObjective(objective) {
        return fetch(`${config.API_ENDPOINT}/objectives`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                obj: objective.obj,
                goalid: objective.goalid
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    toggleChecked(id){
        return fetch(`${config.API_ENDPOINT}/objectives/toggle/${id}`, {
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
    deleteObjective(id) {
        return fetch(`${config.API_ENDPOINT}/objectives/${id}`, {
            method: 'DELETE',
            headers: {'authorization': `bearer ${TokenService.getAuthToken()}`}
        })
    }
};

export default ObjectivesApiService
