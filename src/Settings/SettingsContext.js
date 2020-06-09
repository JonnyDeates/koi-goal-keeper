import * as React from "react";
import UserService from "../services/user-api-service";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import SettingsService from "../services/settings-service";
import SettingsApiService from "../services/settings-api-service";

export const SettingsContext = React.createContext({
    themes: [],
    typeList: ['Today List', 'Short List', "Normal List", "Extended List", "Full List"],
    typeListSelected: 'Normal List',
    types: [],
    username: '',
    email: '',
    nickname: '',
    id: '',
    currentTheme: 'Light Mode',
    currentType: '',
    autoArchiving: true,
    showDelete: false,
    compacted: '',
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
    updateEmail: () => {
    }
});

export class SettingsProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            nickname: '',
            id: '',
            theme: 'Light Mode',
            currentType: 'All',
            typeList: ['Today List', 'Short List', "Normal List", "Extended List", "Full List"],
            typeListSelected: '',
            autoArchiving: true,
            showDelete: false,
            notifications: false,
            compacted: 'No',
            types: []
        }
    }

    componentDidMount() {
        if (TokenService.getAuthToken()) {
            if (UserService.hasUserInfo()) {
                this.setState({
                    username: UserService.getUser().username,
                    autoArchiving: UserService.getUser().autoArchiving,
                    // email: UserService.getUser().email,
                    nickname: UserService.getUser().nickname,
                    id: UserService.getUser().id
                })
            }
            if (SettingsService.hasSettings()) {
                this.setState({
                    typeListSelected: SettingsService.getSettings().type_list,
                    currentType: SettingsService.getSettings().type_selected,
                    autoArchiving: SettingsService.getSettings().auto_archiving || false,
                    showDelete: SettingsService.getSettings().show_delete || false,
                    compacted: SettingsService.getSettings().compacted,
                    theme: SettingsService.getSettings().theme,
                    notifications: SettingsService.getSettings().notifications || false,
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
                this.setState({types: ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly', '6-Month', 'Yearly', '2-Year', '3-Year', '5-Year', '10-Year', 'Distant']}, () => SettingsService.saveSettings({types: this.state.types}));
                break;
            case this.state.typeList[4]:
                this.setState({types: ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Quarterly', '6-Month', '9-Month', 'Yearly', '2-Year', '3-Year', '4-Year', '5-Year', '10-Year', '20-Year', '30-Year', 'Distant']}, () => SettingsService.saveSettings({types: this.state.types}));
                break;
            default :
                this.setState({types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', '6-Month', 'Yearly', '3-Year', '5-Year', 'Distant']}, () => SettingsService.saveSettings({types: this.state.types}));
        }
        this.setState({currentType: 'All'});

    }

    render() {
        const value = {
            themes: ['Light Mode', 'Dark Mode'], // , 'King Koi', 'Queen Koi', 'Red Koi', 'Blue Koi', 'Green Koi'],
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
            compacted: this.state.compacted,
            toggleArchiving: () => {
                this.setState({autoArchiving: !this.state.autoArchiving}, ()=> {
                    SettingsService.saveSettings({auto_archiving: this.state.autoArchiving});
                    SettingsApiService.toggleAutoArchiving(SettingsService.getSettings().id);
                })
            },
            toggleCompacted: () => {
                let compactedTemp = '';
                switch (this.state.compacted) {
                    case 'No':
                        compactedTemp = 'Compacted';
                        break;
                    case 'Compacted':
                        compactedTemp = 'Extra-Compacted';
                        break;
                    case 'Extra-Compacted':
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
                SettingsApiService.toggleCompacted(SettingsService.getSettings().id);
                this.setState({compacted: compactedTemp})
            },
            toggleType: () => {
                let newTypeSelected = '';
                switch (this.state.typeListSelected) {
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
                SettingsApiService.toggleTypeList(JSON.stringify(SettingsService.getSettings().id));
                this.setState({typeListSelected: newTypeSelected}, () => {
                        SettingsService.saveSettings({type_list: newTypeSelected});
                        this.updateTypes();
                    }
                )
            },
            toggleShowDelete: () => {
                SettingsApiService.toggleDelete(SettingsService.getSettings().id);
                SettingsService.saveSettings({show_delete: !this.state.showDelete});
                this.setState({showDelete: !this.state.showDelete})
            },
            setTheme: (e) => {
                SettingsApiService.patchSetting({theme: e}, SettingsService.getSettings().id);
                SettingsService.saveSettings({theme: e});
                this.setState({theme: e});
            },
            setType: (e) => {
                SettingsApiService.patchSetting({type_selected: e}, SettingsService.getSettings().id);
                SettingsService.saveSettings({type_selected: e});
                this.setState({currentType: e})
            },
            updateNickname: (nickname) => {
                UserService.saveUser({nickname});
                AuthApiService.patchUser({nickname: this.state.newNickname});
                this.setState({nickname})
            },
            // updateEmail: (email) => {
            //     UserService.saveUser({email});
            //     AuthApiService.patchUser({email});
            //     this.setState({email})
            // }
        };
        return (
            <SettingsContext.Provider value={value}>
                {this.props.children}
            </SettingsContext.Provider>
        )
    }
}
