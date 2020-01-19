import * as React from "react";
import UserService from "../services/user-api-service";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
export const SettingsContext = React.createContext({
    themes: ['Blue / White', 'Blue / Black', 'Red / White', 'Red / Black'],
    types: [],
    username: '',
    email: '',
    nickname: '',
    id: '',
    currentTheme: 'Blue / White',
    currentType: '',
    autoArchiving: true,
    showDelete: false,
    compacted: '',
    toggleArchiving: () => {},
    toggleShowDelete: () => {},
    toggleCompacted: () => {},
    setTheme: () => {},
    setType: () => {},
    updateNickname: () => {},
    updateEmail: () => {}
});

export class SettingsProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            nickname: '',
            id: '',
            currentTheme: 'Blue / White',
            currentType: 'All',
            autoArchiving: true,
            showDelete: false,
            compacted: 'No',
        }
    }

    componentDidMount() {
        if (TokenService.getAuthToken()) {
            if (UserService.hasUserInfo()) {
                this.setState({
                    username: UserService.getUser().username,
                    autoArchiving: UserService.getUser().autoArchiving,
                    email: UserService.getUser().email,
                    nickname: UserService.getUser().nickname,
                    id: UserService.getUser().id
                })
            }
        }
    }

    render() {
        const value = {
            themes: ['Blue / White', 'Blue / Black', 'Red / White', 'Red / Black'],
            currentTheme: this.state.currentTheme,
            currentType: this.state.currentType,
            autoArchiving: this.state.autoArchiving,
            types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', '5-Year'],
            username: this.state.username,
            email: this.state.email,
            id: this.state.id,
            nickname: this.state.nickname,
            showDelete: this.state.showDelete,
            compacted: this.state.compacted,
            toggleArchiving: () => {
                UserService.saveUser({autoArchiving: !this.state.autoArchiving});
                AuthApiService.patchUser({auto_archiver: !this.state.autoArchiving});
                this.setState({autoArchiving: !this.state.autoArchiving})
            },
            toggleCompacted: () => {
                let compactedTemp = '';
                switch(this.state.compacted) {
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
                this.setState({compacted: compactedTemp})
            },
            toggleShowDelete: () => {
                this.setState({showDelete: !this.state.showDelete})
            },
            setTheme: (e) => {
                this.setState({currentTheme: e})
            },
            setType: (e) => {
                this.setState({currentType: e})
            },
            updateNickname: (nickname) => {
                UserService.saveUser({nickname});
                AuthApiService.patchUser({nickname: this.state.newNickname});
                this.setState({nickname})
            },
            updateEmail: (email) => {
                UserService.saveUser({email});
                AuthApiService.patchUser({email});
                this.setState({email})
            }
        };
        return (
            <SettingsContext.Provider value={value}>
                {this.props.children}
            </SettingsContext.Provider>
        )
    }
}