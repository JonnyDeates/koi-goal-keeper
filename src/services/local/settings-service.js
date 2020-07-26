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
                color_style: (!!setting.color_style) ? setting.color_style : settingTemp.color_style,
                show_delete: typeof setting.show_delete === 'boolean' ? setting.show_delete : settingTemp.show_delete,
                auto_archiving: typeof setting.auto_archiving !== 'boolean' ? settingTemp.auto_archiving : setting.auto_archiving,
                dark_mode: typeof setting.dark_mode !== 'boolean' ? settingTemp.dark_mode : setting.dark_mode,
                paid_account: typeof setting.paid_account !== 'boolean' ? settingTemp.paid_account : setting.paid_account,
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
    }
};

export default SettingsService
