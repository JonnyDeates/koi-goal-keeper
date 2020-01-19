import React from 'react';
import AuthApiService from "../services/auth-api-service";
import {Button, Input, Required} from "../Utils/Utils";
import "./Register.css";
import {Link} from "react-router-dom";
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy'
import Modal from "./Modal/Modal";
import TermsConditions from "./TermsAndConditions/TermsConditions";

class Register extends React.Component {
    state = {error: null, isRead: false, isSubmitable: false, isPrivacyModal: false, isTermsModal: false};

    constructor(props) {
        super(props);
        this.toggleRead = this.toggleRead.bind(this);
        this.toggleSubmitable = this.toggleSubmitable.bind(this);
        this.togglePrivacyModal = this.togglePrivacyModal.bind(this);
        this.toggleTermsModal = this.toggleTermsModal.bind(this);
    }

    toggleRead() {
        this.setState({isRead: !this.state.isRead})
    }

    toggleSubmitable() {
        this.setState({isSubmitable: !this.state.isSubmitable})
    }

    togglePrivacyModal() {
        this.setState({isPrivacyModal: !this.state.isPrivacyModal})
    }

    toggleTermsModal() {
        this.setState({isTermsModal: !this.state.isTermsModal})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            this.forceUpdate();
        }
    }

    handleSubmit = ev => {
        ev.preventDefault();
        const {email, nickname, username, password, confirmPassword} = ev.target;

        this.setState({error: null});
        if (password.value === confirmPassword.value) {
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
        } else {
            this.setState({error: 'Passwords dont Match'});
        }
    }

    render() {
        const {error} = this.state
        return (
            <main className={'register-page'}>
                <h1 onClick={() => window.location.replace('/home')}>The Koi Goal Keeper</h1>
                <h3>Register</h3>
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
                    <div className='password'>
                        <label htmlFor='RegistrationForm__confirmPassword'>
                            Confirm Password <Required/>
                        </label>
                        <Input
                            name='confirmPassword'
                            type='password'
                            required
                            id='RegistrationForm__confirmPassword'>
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
                    <PrivacyPolicy toggleRead={this.toggleRead}/>
                    <div className='checkbox-privacy'>
                        <label>
                            By completing this form, I agree to the <span title={'Open Terms & Conditions Modal'}
                                                                          onClick={this.toggleTermsModal}>Terms</span> and <span
                            title={'Open Privacy Policy Modal'}
                            onClick={this.togglePrivacyModal}> Privacy Policy. </span>
                        </label><input type='checkbox' disabled={!this.state.isRead}
                                       onChange={() => this.toggleSubmitable()}/>
                    </div>
                    <Button type='button' onClick={() => window.location.replace('/home')}>
                        Back
                    </Button>
                    {(this.state.isSubmitable) ? <Button type='submit'>
                        Submit
                    </Button> : <Button type={'button'} className={'disabled noselect'}>Submit</Button>}
                    <p><Link to={'/login'}>Already A User?</Link></p>
                </form>
                {(this.state.isPrivacyModal) ?
                    <Modal header={'Privacy Policy'} closeModal={this.togglePrivacyModal}><PrivacyPolicy/></Modal> : ''}
                {(this.state.isTermsModal) ? <Modal header={'Terms & Conditions'}
                                                    closeModal={this.toggleTermsModal}><TermsConditions/></Modal> : ''}
            </main>
        )
    }
}

export default Register;