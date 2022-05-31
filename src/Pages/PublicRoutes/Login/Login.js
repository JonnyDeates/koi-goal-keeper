import React, {useState} from 'react';
import AuthApiService from "../../../services/database/auth-api-service";
import TokenService from "../../../services/local/token-service";
import {validateEmail} from "../../../Utils/Utils";
import './Login.css';
import UserService from "../../../services/local/user-api-service";
import {Link} from "react-router-dom";
import SettingsService from "../../../services/local/settings-service";
import exposePassword from '../../../assets/icons/eye.svg'
import Title from "../../../Components/Title/Title";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState();

    const changeEmail = (e) => setEmail(e.target.value);
    const changePassword = (e) => setPassword(e.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('')

        if (validateEmail(email))
            AuthApiService.postLogin({
                username: email.toLowerCase(),
                password: password,
            })
                .then(res => {
                    setEmail('');
                    setPassword('');
                    const {
                        theme,
                        type_list,
                        type_selected,
                        id: settingid,
                        show_delete,
                        notifications,
                        auto_archiving,
                        compacted,
                        local_storage,
                        dark_mode,
                        color_style,
                        paid_account,
                        ascending,
                        sort_style
                    } = res.payload.settings;
                    const {id, nickname, email} = res.payload.payload;
                    TokenService.saveAuthToken(res.authToken);
                    UserService.saveUser({id, nickname, email, username: res.payload.payload.username});
                    if (!SettingsService.isLocal())
                        SettingsService.saveSettings({
                            theme,
                            type_list,
                            type_selected,
                            id: settingid,
                            paid_account,
                            types: ['Daily', 'Weekly', 'Monthly', 'Quarterly', '6-Month', 'Yearly', '3-Year', '5-Year', 'Distant'],
                            show_delete,
                            notifications,
                            auto_archiving,
                            compacted,
                            local_storage,
                            dark_mode,
                            color_style,
                            ascending,
                            sort_style
                        });
                    else
                        SettingsService.saveSettings({paid_account})
                    window.location.replace('/')
                })
                .catch(res => setError(res.error))
        else setError('Email not properly formatted')
    }

    const passwordType = isPasswordVisible ? 'text' : 'password';


    return <div className={'login-page'}>
        <form className='login-inputs' onSubmit={handleSubmit}>
            <Title/>
            <label>Email: <input required value={email} type={'text'} onChange={changeEmail}/></label>
            <label className={'password'}>Password:
                <input required value={password} type={passwordType} onChange={changePassword}/>
                <img src={exposePassword} alt='Check Password'
                     onClick={() => setIsPasswordVisible(!isPasswordVisible)}/>
                <Link className='forgot-password' to={'/forgot-password'}>Forgot Password?</Link>
            </label>
            {error && error.length > 0 && <p className={'error'}>{error}</p>}
            <div className={'loginButtons'}>
                <Link to={'/sign-up'}>
                    <button type={'button'}>Sign Up</button>
                </Link>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
}

export default Login;
