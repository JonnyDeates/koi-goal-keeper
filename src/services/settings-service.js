const SettingsService = {
    serializeSettings(setting){
        if(this.getSettings()) {
            let settingTemp = this.getSettings();
            return JSON.stringify({ // theme, type_list, type_selected, id, show_delete, notifications, auto_archiving, compacted
                id: (!!setting.id) ? setting.id : settingTemp.id,
                type_list: (!!setting.type_list) ? setting.type_list : settingTemp.type_list,
                types: (!!setting.types) ? setting.types : settingTemp.types,
                theme: (!!setting.theme) ? setting.theme : settingTemp.theme,
                type_selected: (!!setting.type_selected) ? setting.type_selected : settingTemp.type_selected,
                show_delete: setting.show_delete,
                notifications: setting.notifications,
                auto_archiving: setting.auto_archiving,
                compacted: (!!setting.compacted) ? setting.compacted : settingTemp.compacted,
            });
        } else {
            return JSON.stringify({...setting})
        }
    },
    saveSettings(setting) {
        window.localStorage.setItem('settings', this.serializeSettings(setting))
    },
    getSettings() {
        try {
            return JSON.parse(window.localStorage.getItem('settings'));
        } catch(error){
            console.log(error);
            return null;
        }},
    clearSettings() {
        window.localStorage.removeItem('settings')
    },
    hasSettings() {
        return !!SettingsService.getSettings()
    },
};

export default SettingsService
