import PaidRestrictions from "../../utils/PaidAccountRestrictionsUtils";

const SettingsService = {
    serializeSettings(setting){
        if(this.getSettings()) {
            let settingTemp = this.getSettings();
            let paidAccount = typeof setting.paid_account === 'boolean' ?  setting.paid_account : settingTemp.paid_account;
            return JSON.stringify({ // theme, type_list, type_selected, id, show_delete, notifications, auto_archiving, compacted
                id: (!!setting.id) ? setting.id : settingTemp.id,
                type_list: PaidRestrictions.seralizeTypeList(paidAccount,(!!setting.type_list) ? setting.type_list : settingTemp.type_list),
                types: (!!setting.types) ? setting.types : settingTemp.types,
                theme: PaidRestrictions.serializeTheme(paidAccount, (!!setting.theme) ? setting.theme : settingTemp.theme),
                sort_style: (!!setting.sort_style) ? setting.sort_style : settingTemp.sort_style,
                type_selected: (!!setting.type_selected) ? setting.type_selected : settingTemp.type_selected,
                color_style: PaidRestrictions.serializeColorStyle(paidAccount,(!!setting.color_style) ? setting.color_style : settingTemp.color_style),
                show_delete: typeof setting.show_delete === 'boolean' ? setting.show_delete : settingTemp.show_delete,
                notifications:  typeof setting.notifications !== 'boolean' ? settingTemp.notifications : setting.notifications,
                auto_archiving: typeof setting.auto_archiving !== 'boolean' ? settingTemp.auto_archiving : setting.auto_archiving,
                dark_mode: typeof setting.dark_mode !== 'boolean' ? settingTemp.dark_mode : setting.dark_mode,
                local_storage: typeof setting.local_storage !== 'boolean' ? settingTemp.local_storage : setting.local_storage,
                ascending: typeof setting.ascending !== 'boolean' ? settingTemp.ascending : setting.ascending,
                paid_account: paidAccount,
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
    isLocal(){
        return this.hasSettings() ? this.getSettings().local_storage : false
    },
    isPaid(){
        return this.hasSettings() ? this.getSettings().paid_account : false
    }
};

export default SettingsService
