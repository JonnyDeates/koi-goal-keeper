import React from 'react';
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import {Button, Input} from "../Utils/Utils";
import {toast} from "react-toastify"
import './Login.css';
import UserService from "../services/user-api-service";
class Login extends React.Component {
    state = { error: null };

    handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        this.setState({ error: null });
        const { username, password } = ev.target;

        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = '';
                password.value = '';
                console.log({username: res.username, email: res.email, id: res.id,
                    nickname: res.nickname, notifications: res.notifications, autoArchiving: res.autoarchiving || null})
                TokenService.saveAuthToken(res.authToken);
                UserService.saveUser({username: res.username, email: res.email, id: res.id,
                    nickname: res.nickname, notifications: res.notifications, autoArchiving: res.autoarchiving || null});
                window.location.reload();
                toast.success(`Welcome Back ${(res.nickname) ? res.nickname : res.username}!`);
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    };

    render() {
        const { error } = this.state;
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <h1>The Koi Goal Keeper</h1>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='username'>
                    <label htmlFor='LoginForm__username'>
                        Username
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
                <Button type='button' onClick={()=>window.location.replace('/register')}>
                    Register
                </Button>
                <Button type='submit'>
                    Login
                </Button>
            </form>
        )
    }
}
export default Login;