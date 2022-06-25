import config from '../../config'
import TokenService from "../local/token-service";

const SettingsApiService = {
    getSettings() {
        return fetch(`${config.API_ENDPOINT}/settings/`, {
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
    patchSetting(setting, id) {
        return fetch(`${config.API_ENDPOINT}/settings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(setting),
        })
    },
    patchAllSettings(setting, id) {
        return fetch(`${config.API_ENDPOINT}/settings/all/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(setting),
        })
    },
    toggleCompacted(id) {
    return fetch(`${config.API_ENDPOINT}/settings/toggle/compacted/${id}`, {
        method: 'GET',
        headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
    })
},
    toggleDelete(id) {
        return fetch(`${config.API_ENDPOINT}/settings/toggle/delete/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
    },
    toggleLocalStorage(id) {
        return fetch(`${config.API_ENDPOINT}/settings/toggle/local_storage/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
    },
    toggleDarkMode(id) {
        return fetch(`${config.API_ENDPOINT}/settings/toggle/dark_mode/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
    },
    toggleNotifications(id) {
        return fetch(`${config.API_ENDPOINT}/settings/toggle/notifications/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
    },
    toggleAscending(id) {
        return fetch(`${config.API_ENDPOINT}/settings/toggle/ascending/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
    },
    toggleAutoArchiving(id) {
        return fetch(`${config.API_ENDPOINT}/settings/toggle/auto_archiving/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
    },
    toggleTypeList(id) {
        return fetch(`${config.API_ENDPOINT}/settings/toggle/type_list/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
    },
    toggleSortStyle(id) {
        return fetch(`${config.API_ENDPOINT}/settings/toggle/sort_style/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
    },
    togglePaidAccount(id, Token) {
        return fetch(`${config.API_ENDPOINT}/settings/toggle/paid_account/${id}`, {
            method: 'Post',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(Token),
        })
    }
};

export default SettingsApiService;
