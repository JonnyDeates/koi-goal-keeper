import * as React from "react";
import UserService from "../../services/local/user-api-service";
import AuthApiService from "../../services/database/auth-api-service";
import TokenService from "../../services/local/token-service";
import SettingsService from "../../services/local/settings-service";
import SettingsApiService from "../../services/database/settings-api-service";

export const SettingsContext = React.createContext({
    themes: [],
    typeList: ['Today List', 'Short List', "Normal List", "Extended List", "Full List"],
    typeListSelected: 'Normal List',
    types: [],
    username: '',
    email: '',
    nickname: '',
    id: '',
    currentTheme: 'Default',
    currentType: '',
    autoArchiving: true,
    showDelete: false,
    compacted: '',
    sortStyle: '',
    toggleArchiving: () => {
    },
    toggleShowDelete: () => {
    },
    toggleCompacted: () => {
    },
    setTheme: () => {
    },
    setType: () => {
    },
    updateNickname: () => {
    },
});

export class SettingsProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            nickname: '',
            id: '',
            theme: 'Default',
            currentType: 'All',
            typeList: ['Today List', 'Short List', "Normal List", "Extended List", "Full List"],
            typeListSelected: '',
            autoArchiving: true,
            showDelete: false,
            notifications: false,
            localStorage: false,
            paidAccount: false,
            checkoutModal: false,
            ascending: false,
            sortStyle: 'No',
            colorStyle: 'No',
            compacted: 'No',
            types: []
        }
    }

    componentDidMount() {
        if (TokenService.getAuthToken()) {
            if (UserService.hasUserInfo()) {
                this.setState({
                    username: UserService.getUser().username,
                    nickname: UserService.getUser().nickname,
                    id: UserService.getUser().id
                })
            }
            if (SettingsService.hasSettings()) {
                let {type_list, type_selected, auto_archiving, show_delete, local_storage, dark_mode, paid_account,
                    color_style, compacted, theme, notifications, sort_style, ascending} = SettingsService.getSettings();
                  
                this.setState({
                    typeListSelected: type_list,
                    currentType: type_selected,
                    autoArchiving: auto_archiving || false,
                    showDelete: show_delete || false,
                    localStorage: local_storage || false,
                    darkMode: dark_mode || false,
                    ascending: ascending || false,
                    paidAccount: paid_account || false,
                    colorStyle: color_style,
                    sortStyle: sort_style,
                    compacted,
                    theme,
                    notifications: notifications || false,
                }, () => this.updateTypes());
            }
        }
    }

    updateTypes() {
        switch (this.state.typeListSelected) {
            case this.state.typeList[0]:
                this.setState({types: ['Daily', 'Distant']}, () => SettingsService.saveSettings({types: this.state.types}));
                break;
            case this.state.typeList[1]:
                this.setState({types: ['Daily', 'Weekly', 'Monthly', 'Yearly', '5-Year', 'Distant']}, () => SettingsService.saveSettings({types: this.state.types}));
                break;
            case this.state.typeList[2]:
                this.setState({types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', '6-Month', 'Yearly', '3-Year', '5-Year', 'Distant']}, () => SettingsService.saveSettings({types: this.state.types}));
                break;
            case this.state.typeList[3]:
                this.setState({types: ['Daily', 'Weekly', 'BiWeekly', 'Monthly', 'Quarterly', '6-Month', 'Yearly', '2-Year', '3-Year', '5-Year', '10-Year', 'Distant']}, () => SettingsService.saveSettings({types: this.state.types}));
                break;
            case this.state.typeList[4]:
                this.setState({types: ['Daily', 'Weekly', 'BiWeekly', 'Monthly', 'Quarterly', '6-Month', '9-Month', 'Yearly', '2-Year', '3-Year', '4-Year', '5-Year', '10-Year', '20-Year', '30-Year', 'Distant']}, () => SettingsService.saveSettings({types: this.state.types}));
                break;
            default :
                this.setState({types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', '6-Month', 'Yearly', '3-Year', '5-Year', 'Distant']}, () => SettingsService.saveSettings({types: this.state.types}));
        }
        this.setState({currentType: 'All'});

    }

    render() {
        const value = {
            themes: ['Default', 'Bekko', 'Benigoi', 'Kigoi', 'Kin Showa', 'Lucki', 'Platinum', 'Sanke'],
            theme: this.state.theme,
            currentType: this.state.currentType,
            autoArchiving: this.state.autoArchiving,
            types: this.state.types,
            typeList: ['Today List', 'Short List', "Normal List", "Extended List", "Full List"],
            typeListSelected: this.state.typeListSelected,
            username: this.state.username,
            email: this.state.email,
            id: this.state.id,
            nickname: this.state.nickname,
            showDelete: this.state.showDelete,
            paidAccount: this.state.paidAccount,
            darkMode: this.state.darkMode,
            localStorage: this.state.localStorage,
            compacted: this.state.compacted,
            colorStyle: this.state.colorStyle,
            sortStyle: this.state.sortStyle,
            ascending: this.state.ascending,
            checkoutModal: this.state.checkoutModal,
            toggleAscending: () => {
                this.setState({ascending: !this.state.ascending}, () => {
                    SettingsService.saveSettings({ascending: this.state.ascending});
                });
                if (!SettingsService.isLocal()) {
                    SettingsApiService.toggleAscending(SettingsService.getSettings().id);
                }
            },
            toggleArchiving: () => {
                this.setState({autoArchiving: !this.state.autoArchiving}, () => {
                    SettingsService.saveSettings({auto_archiving: this.state.autoArchiving});
                });
                if (!SettingsService.isLocal()) {
                    SettingsApiService.toggleAutoArchiving(SettingsService.getSettings().id);
                }
            },
            toggleCheckoutModal: () => {
                this.setState({checkoutModal: !this.state.checkoutModal})
            },
            toggleCompacted: () => {
                let compactedTemp = '';

                switch (this.state.compacted) {
                    case 'No':
                        compactedTemp = 'Compacted';
                        break;
                    case 'Compacted':
                        compactedTemp = 'Ultra-Compacted';
                        break;
                    case 'Ultra-Compacted':
                        compactedTemp = 'No';
                        break;
                    default:
                        compactedTemp = 'No';
                        break;
                }
                SettingsService.saveSettings({compacted: compactedTemp});
                this.setState({compacted: compactedTemp});

                if (!SettingsService.isLocal()) {
                    SettingsApiService.toggleCompacted(SettingsService.getSettings().id);
                }
            },
            toggleType: () => {
                const currentType = this.state.typeListSelected;
                let newTypeSelected = '';
                if (!value.paidAccount) {
                    switch (currentType) {
                        case 'Short List':
                            newTypeSelected = 'Normal List';
                            break;
                        case 'Normal List':
                            newTypeSelected = 'Short List';
                            break;
                        default:
                            newTypeSelected = 'Normal List';
                            break;
                    }
                } else {
                    switch (currentType) {
                        case 'Today List':
                            newTypeSelected = 'Short List';
                            break;
                        case 'Short List':
                            newTypeSelected = 'Normal List';
                            break;
                        case 'Normal List':
                            newTypeSelected = 'Extended List';
                            break;
                        case 'Extended List':
                            newTypeSelected = 'Full List';
                            break;
                        case 'Full List':
                            newTypeSelected = 'Today List';
                            break;
                        default:
                            newTypeSelected = 'Normal List';
                            break;
                    }
                }
                this.setState({typeListSelected: newTypeSelected}, () => {
                        SettingsService.saveSettings({type_list: newTypeSelected});
                        this.updateTypes();
                    }
                );
                if (!SettingsService.isLocal()) {
                    SettingsApiService.patchSetting({type_list: newTypeSelected},SettingsService.getSettings().id);
                }
            },
            toggleSortStyle: () => {
                let sortTemp = '';

                switch (this.state.sortStyle) {
                    case 'No':
                        sortTemp = 'Latest';
                        break;
                    case 'Latest':
                        sortTemp = 'Amount';
                        break;
                    case 'Amount':
                        sortTemp = 'No';
                        break;
                    default:
                        sortTemp = 'No';
                        break;
                }
                SettingsService.saveSettings({sort_style: sortTemp});
                this.setState({sortStyle: sortTemp});

                if (!SettingsService.isLocal()) {
                    SettingsApiService.patchSetting({sort_style: sortTemp}, SettingsService.getSettings().id);
                }
            },
            toggleDarkMode: () => {
                SettingsService.saveSettings({dark_mode: !this.state.darkMode});
                this.setState({darkMode: !this.state.darkMode}, () => setTimeout(() => this.forceUpdate(), 100));
                if (!SettingsService.isLocal()) {
                    SettingsApiService.toggleDarkMode(SettingsService.getSettings().id);
                }
            },
            toggleShowDelete: () => {
                SettingsService.saveSettings({show_delete: !this.state.showDelete});
                this.setState({showDelete: !this.state.showDelete})
                if (!SettingsService.isLocal()) {
                    SettingsApiService.toggleDelete(SettingsService.getSettings().id);
                }
            },
            toggleLocalStorage: (callback) => {
                SettingsApiService.toggleLocalStorage(SettingsService.getSettings().id);
                SettingsService.saveSettings({local_storage: !this.state.localStorage});
                if (this.state.localStorage) {
                    const {type_list, theme, type_selected, color_style, sort_style, show_delete, notifications, auto_archiving, dark_mode, local_storage, compacted} = SettingsService.getSettings();
                    SettingsApiService.patchAllSettings({
                        type_list,
                        theme,
                        type_selected,
                        color_style,
                        sort_style,
                        show_delete,
                        notifications,
                        auto_archiving,
                        dark_mode,
                        local_storage,
                        compacted
                    }, SettingsService.getSettings().id).catch((e) => console.log(e));


                    callback();
                }
                this.setState({localStorage: !this.state.localStorage})
            },
            setTheme: (e) => {
                SettingsService.saveSettings({theme: e});
                this.setState({theme: e}, () => setTimeout(() => this.forceUpdate(), 100)
                );
                if (!SettingsService.isLocal()) {
                    SettingsApiService.patchSetting({theme: e}, SettingsService.getSettings().id);
                }
            },
            setType: (e) => {
                SettingsService.saveSettings({type_selected: e});
                this.setState({currentType: e})
                if (!SettingsService.isLocal()) {
                    SettingsApiService.patchSetting({type_selected: e}, SettingsService.getSettings().id);
                }
            },
            sortGoals: (goals) => {
                if(this.state.sortStyle === 'Latest'){
                    if(this.state.ascending){
                        return goals.sort((a, b) => new Date(b.date) - new Date(a.date))
                        
                    } else {
                        return goals.sort((a, b) => new Date(a.date) - new Date(b.date))
                    }
                } else if(this.state.sortStyle === 'Amount'){
                    if(this.state.ascending){
                        return goals.sort((a, b) => b.goals.length - a.goals.length)
                    } else {
                        return goals.sort((a, b) => a.goals.length - b.goals.length)
                        
                    }
                }
                else {
                    return goals
                }
            },
            updateNickname: (nickname) => {
                UserService.saveUser({nickname});
                this.setState({nickname})
                if (!SettingsService.isLocal()) {
                    AuthApiService.patchUser({nickname: this.state.newNickname});
                }
            },
            updateColorStyle: (color_style) => {
                SettingsService.saveSettings({color_style});
                this.setState({colorStyle: color_style})
                if (!SettingsService.isLocal()) {
                    SettingsApiService.patchSetting({color_style}, SettingsService.getSettings().id)
                }

            }
        };
        return (
            <SettingsContext.Provider value={value}>
                {this.props.children}
            </SettingsContext.Provider>
        )
    }
}
