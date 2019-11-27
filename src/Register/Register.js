import React from 'react';
import AuthApiService from "../services/auth-api-service";
import {Button, Input, Required} from "../Utils/Utils";

class Register extends React.Component {
    state = { error: null };

    handleSubmit = ev => {
        ev.preventDefault();
        const {email, nickname, username, password} = ev.target;

        this.setState({error: null});
        AuthApiService.postUser({
            username: username.value,
            password: password.value,
            email: email.value,
            nickname: nickname.value,
        })
            .then(user => {
                email.value = '';
                nickname.value = '';
                username.value = '';
                password.value = '';
                window.location.replace('/login');
            })
            .catch(res => {
                this.setState({error: res.error})
            })
    }

    render() {
        const {error} = this.state
        return (
            <div>
                <h1>Register</h1>

                <form
                    className='RegistrationForm'
                    onSubmit={this.handleSubmit}
                >
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='full_name'>
                        <label htmlFor='RegistrationForm__email'>
                            Email <Required/>
                        </label>
                        <Input
                            name='email'
                            type='text'
                            required
                            id='RegistrationForm__email'>
                        </Input>
                    </div>
                    <div className='username'>
                        <label htmlFor='RegistrationForm__username'>
                            User name <Required/>
                        </label>
                        <Input
                            name='username'
                            type='text'
                            required
                            id='RegistrationForm__username'>
                        </Input>
                    </div>
                    <div className='password'>
                        <label htmlFor='RegistrationForm__password'>
                            Password <Required/>
                        </label>
                        <Input
                            name='password'
                            type='password'
                            required
                            id='RegistrationForm__password'>
                        </Input>
                    </div>
                    <div className='nickname'>
                        <label htmlFor='RegistrationForm__nickname'>
                            Nickname
                        </label>
                        <Input
                            name='nickname'
                            type='text'
                            required
                            id='RegistrationForm__nickname'>
                        </Input>
                    </div>
                    <Button type='button' onClick={()=>window.location.replace('/login')}>
                        Back
                    </Button>
                    <Button type='submit'>
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

export default Register;