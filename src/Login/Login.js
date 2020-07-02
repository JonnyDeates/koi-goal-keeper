import React from 'react';
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import {Button, Input, validateEmail} from "../Utils/Utils";
import './Login.css';
import UserService from "../services/user-api-service";
import {Link} from "react-router-dom";
import SettingsService from "../Local Services/settings-service";
import {GoogleLogin} from "react-google-login";

class Login extends React.Component {
    state = {error: null};

    handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        this.setState({error: null});
        const {username, password} = ev.target;

        this.handleSubmit(username, password)

    };

    handleSubmit = (username, password) => {
        if (validateEmail(username.value))
            AuthApiService.postLogin({
                username: username.value,
                password: password.value,
            })
                .then(res => {
                    username.value = '';
                    password.value = '';
                    const {theme, type_list, type_selected, id: settingid, show_delete, notifications, auto_archiving, compacted} = res.payload.settings;
                    const {id, nickname, email} = res.payload.payload;
                    TokenService.saveAuthToken(res.authToken);
                    UserService.saveUser({id, nickname, email, username: res.payload.payload.username});
                    SettingsService.saveSettings({
                        theme, type_list, type_selected, id: settingid,
                        types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', '6-Month', 'Yearly', '3-Year', '5-Year', 'Distant'],
                        show_delete, notifications, auto_archiving, compacted
                    });
                    window.location.reload();
                })
                .catch(res => {
                    this.setState({error: res.error})
                })
        else
            this.setState({error: 'Email not properly formatted'})
    }

    onSignIn(googleUser) {
        if (googleUser) {
            let profile = googleUser.getBasicProfile();
            let handleSubmit = (username, password) => {
                AuthApiService.postLogin({
                    username: username.value,
                    password: password.value,
                })
                    .then(res => {
                        const {theme, type_list, type_selected, id: settingid, show_delete, notifications, auto_archiving, compacted} = res.payload.settings;
                        const {id, nickname, email} = res.payload.payload;
                        TokenService.saveAuthToken(res.authToken);
                        UserService.saveUser({id, nickname, email, username: res.payload.payload.username});
                        SettingsService.saveSettings({
                            theme, type_list, type_selected, id: settingid,
                            types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', '6-Month', 'Yearly', '3-Year', '5-Year', 'Distant'],
                            show_delete, notifications, auto_archiving, compacted
                        });
                        window.location.reload();
                    })
                    .catch(e => {
                        window.location.reload();
                    })
                    .catch(res => {
                        this.setState({error: res.error})
                    });
            };
            AuthApiService
                .postGoogleLogin({
                    username: profile.getEmail(),
                    nickname: profile.getGivenName(),
                    token: googleUser.getAuthResponse().id_token
                })
                .then(res => {
                        handleSubmit({value: res.username}, {value: '******'})
                    }
                )
                .catch(res => {
                    this.setState({error: res.error})
                });
        }
        ;
    }

    render() {
        const {error} = this.state;
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <h1 onClick={() => window.location.replace('/')}>The Koi Goal Keeper</h1>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='username'>
                    <label htmlFor='LoginForm__username'>
                        Email
                    </label>
                    <Input
                        required
                        name='username'
                        id='LoginForm__username'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm__password'>
                        Password
                    </label>
                    <Input
                        required
                        name='password'
                        type='password'
                        id='LoginForm__password'>
                    </Input>
                </div>
                <Button type='button' onClick={() => window.location.replace('/')}>
                    Back
                </Button>
                <Button type='submit'>
                    Login
                </Button>
                <p><Link to={'/register'}>Sign Up?</Link></p>
                <GoogleLogin
                    clientId={'210398171394-4tvu2p5580kl3d959vidn4avuif5p53n.apps.googleusercontent.com'}
                    buttonText={'Sign-in'}
                    onFailure={this.onSignIn}
                    onSuccess={this.onSignIn}
                    isSignedIn={true}
                />
            </form>
        )
    }
}

export default Login;
