const LocalDataService = {
    serializeData(data) {
        return JSON.stringify(data)
    },
    saveLocalData(local, data) {
        window.localStorage.setItem(local, this.serializeData(data))
    },
    getLocalData(local) {
        return window.localStorage.getItem(local)
    },
    getSafeLocalData(local){
        try {
            return window.localStorage.getItem(local)
        } catch (e) {
            console.log(e);
        }
    },
    clearAllLocalData() {
        window.localStorage.clear()
    },
    clearLocalData(local) {
        window.localStorage.removeItem(local)
    },
    hasLocalData(local) {
        return !!this.getLocalData(local)
    },
    hasSafeLocalData(local) {
        return !!this.getSafeLocalData(local)
    },
};
// Local is the Local Storage Data Packet Name
// Data is the data object being stored
export default LocalDataService
