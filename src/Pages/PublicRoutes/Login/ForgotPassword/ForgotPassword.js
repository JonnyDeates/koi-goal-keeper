import React, {useState} from 'react';
import AuthApiService from "../../../../services/database/auth-api-service";
import {Button, validateEmail} from "../../../../Utils/Utils";
import Title from "../../../../Components/Title/Title";
import exposePassword from "../../../../assets/icons/eye.svg";
import {useNavigate} from "react-router";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [token, setToken] = useState('')
    const [showVerification, setShowVerification] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState()

    const navigate = useNavigate();
    const passwordType = isPasswordVisible ? 'text' : 'password';

    const changeEmail = (e) => setEmail(e.target.value);
    const changePassword = (e) => setPassword(e.target.value);
    const changeCPassword = (e) => setCPassword(e.target.value);
    const changeToken = (e) => setToken(e.target.value);

    const handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        setError(undefined);
        if (!showVerification) {
            handleSubmit()
        } else {
            if (password !== cPassword)
                return setError('Passwords do not Match')

            handleSubmitVerification()
        }
    };

    const handleSubmit = () => {
        if (validateEmail(email)) {
            AuthApiService.postForgotPassword({
                username: email,
            }).catch(res => setError(res.error));
            setShowVerification(true);
        } else setError('Email not properly formatted')
    };

    const handleSubmitVerification = () => {
        if (validateEmail(email)) {
            AuthApiService.postVerification({
                username: email,
                token: token,
                password: password,
            })
                .then(() => navigate('/login'))
                .catch(res => setError(res.error));
        } else setError('Email not properly formatted')
    }

    return <form className='login-inputs' onSubmit={handleSubmitJwtAuth}>
        <Title/>
        <h3>{(showVerification) ? 'Enter Token & Your New Password' : 'Enter Email Associated w/Account'}</h3>
        <label>Email: <input required value={email} type={'text'} onChange={changeEmail}/></label>
        {showVerification &&
        <>
            <label className={'password'}>Token:
                <input value={token} type={'text'} onChange={changeToken}/>
            </label>
            <label className={'password'}>Password:
                <input value={password} type={passwordType} onChange={changePassword}/>
                <img src={exposePassword} alt='Check Password'
                     onClick={() => setIsPasswordVisible(!isPasswordVisible)}/>
            </label>
            <label className={'password'}>Confirm Password:
                <input value={cPassword} type={passwordType} onChange={changeCPassword}/>
            </label>
        </>}
        {error && error.length > 0 && <p className={'error'}>{error}</p>}
        <Button type='button' onClick={() => navigate('/login')}>
            Back
        </Button>
        <Button type='submit'>
            {(showVerification) ? 'Verify' : 'Submit'}
        </Button>
    </form>
}

export default ForgotPassword;
