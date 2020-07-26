import * as React from "react";
import UserService from "../services/local/user-api-service";
import SettingsService from "../services/local/settings-service";
import {uuid} from "../Utils/Utils";

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
            nickname: '',
            id: '',
            theme: 'Default',
            currentType: 'All',
            typeList: ['Today List', 'Short List', "Normal List", "Extended List", "Full List"],
            typeListSelected: '',
            autoArchiving: true,
            showDelete: false,
            paidAccount: false,
            colorStyle: '',
            compacted: 'No',
            types: []
        }
    }

    componentDidMount() {
        if (UserService.hasUserInfo()) {
            this.setState({
                nickname: UserService.getUser().nickname,
                id: UserService.getUser().id
            })
        } else {
            let user = {nickname: 'Koi Fry', id: uuid()};
            this.setState({}, (UserService.saveUser(user)))
        }
        if (SettingsService.hasSettings()) {
            let {type_list, type_selected, auto_archiving, show_delete, dark_mode, paid_account, color_style, compacted, theme, notifications} = SettingsService.getSettings();
            this.setState({
                typeListSelected: type_list,
                currentType: type_selected,
                autoArchiving: auto_archiving || false,
                showDelete: show_delete || false,
                darkMode: dark_mode || false,
                paidAccount: paid_account || false,
                colorStyle: color_style,
                compacted,
                theme,
                notifications: notifications || false,
            }, () => this.updateTypes())
        } else {
            let settings = {
                id: 1,
                type_list: 'Normal List',
                theme: 'Default',
                type_selected: 'All',
                auto_archiving: false,
                show_delete: false,
                notifications: true,
                compacted: 'No',
                paid_account: false,
                dark_mode: false,
                color_style: 'standard'
            };
            this.setState({
                typeListSelected: settings.type_list,
                currentType: settings.type_selected,
                autoArchiving: settings.auto_archiving,
                showDelete: settings.show_delete,
                darkMode: settings.dark_mode,
                paidAccount: false,
                colorStyle: settings.color_style,
                compacted: settings.compacted,
                theme: settings.theme
            }, () => SettingsService.saveSettings(settings));
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
            compacted: this.state.compacted,
            toggleArchiving: () => this.setState({autoArchiving: !this.state.autoArchiving}, () => {
                SettingsService.saveSettings({auto_archiving: this.state.autoArchiving});
            }),
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
                this.setState({compacted: compactedTemp});
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
                this.setState({typeListSelected: newTypeSelected}, () => {
                        SettingsService.saveSettings({type_list: newTypeSelected});
                        this.updateTypes();
                    }
                );
            },
            toggleDarkMode: () => this.setState({darkMode: !this.state.darkMode}, () => SettingsService.saveSettings({dark_mode: !this.state.darkMode})),
            toggleShowDelete: () => this.setState({showDelete: !this.state.showDelete}, () => SettingsService.saveSettings({show_delete: !this.state.showDelete})),
            setTheme: (e) => this.setState({theme: e}, () => SettingsService.saveSettings({theme: e})),
            setType: (e) => this.setState({currentType: e}, () => SettingsService.saveSettings({type_selected: e})),
            updateNickname: (nickname) => this.setState({nickname}, () => UserService.saveUser({nickname})),
        };
        return (
            <SettingsContext.Provider value={value}>
                {this.props.children}
            </SettingsContext.Provider>
        )
    }
}
