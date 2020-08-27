import React from 'react';
import AuthApiService from "../../services/database/auth-api-service";
import {Button, Input, validateEmail} from "../../Utils/Utils";
import {Link} from "react-router-dom";

class ForgotPassword extends React.Component {
    state = {error: null, showVerification: false};

    handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        this.setState({error: null});
        const {username, password} = ev.target;
        if (!this.state.showVerification) {
            this.handleSubmit(username, password)
        } else {
            const {token, password2} = ev.target;
            if (password.value !== password2.value)
                return this.setState({error: 'Passwords do not Match'})

            this.handleSubmitVerification(username, token, password)
        }
    };

    handleSubmit = (username) => {
        if (validateEmail(username.value)) {
            AuthApiService.postForgotPassword({
                username: username.value,
            }).catch(res => {
                this.setState({error: res.error})
            });
            this.setState({showVerification: true})
        } else
            this.setState({error: 'Email not properly formatted'})
    };

    handleSubmitVerification = (username, token, password) => {
        if (validateEmail(username.value)) {
            AuthApiService.postVerification({
                username: username.value,
                token: token.value,
                password: password.value,
            }).then((res)=> {
                window.location.replace('/login')
            }).catch(res => {
                this.setState({error: res.error})
            });
        } else
            this.setState({error: 'Email not properly formatted'})
    }

    render() {
        const {error} = this.state;
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <h1 onClick={() => window.location.replace('/')}>The Koi Goal Keeper</h1>
                <h3>{(this.state.showVerification) ? 'Enter Token & Your New Password' : 'Enter Email Associated with Account' }</h3>
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
                {(this.state.showVerification ?
                    <>
                        <div className='password'>
                            <label htmlFor='LoginForm__token'>
                                Token
                            </label>
                            <Input
                                required
                                name='token'
                                id='LoginForm__token'>
                            </Input>
                        </div>
                        <div className='password'>
                            <label htmlFor='LoginForm__password'>
                                New Password
                            </label>
                            <Input
                                required
                                name='password'
                                type='password'
                                id='LoginForm__password'>
                            </Input>
                        </div>
                        <div className='password'>
                            <label htmlFor='LoginForm__password2'>
                                Confirm New Password
                            </label>
                            <Input
                                required
                                name='password2'
                                type='password'
                                id='LoginForm__password2'>
                            </Input>
                        </div>
                    </> : '')}
                <Button type='button' onClick={() => window.location.replace('/login')}>
                    Back
                </Button>
                <Button type='submit'>
                    {(this.state.showVerification) ? 'Verify' : 'Submit' }
                </Button>
                <p><Link to={'/login'}>Login /</Link><Link to={'/register'}>Sign Up</Link></p>
            </form>
        )
    }
}

export default ForgotPassword;
