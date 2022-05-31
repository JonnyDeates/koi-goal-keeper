import React, {useState} from 'react';
import AuthApiService from "../../../services/database/auth-api-service";
import {validateEmail} from "../../../Utils/Utils";
import "./Register.css";
import {Link} from "react-router-dom";
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy'
import Modal from "./Modal/Modal";
import TermsConditions from "./TermsAndConditions/TermsConditions";
import {useNavigate} from "react-router";
import Title from "../../../Components/Title/Title";


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [isPrivacyModalShown, setIsPrivacyModalShown] = useState(false)
    const [isTermsModal, setIsTermsModalShown] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const changeEmail = (e) => setEmail(e.target.value);
    const changeNickname = (e) => setNickname(e.target.value);
    const changePassword = (e) => setPassword(e.target.value);
    const changeCPassword = (e) => setCPassword(e.target.value);
    const toggleAcceptTerms = () => setAcceptTerms(!acceptTerms);
    const togglePrivacyModal = () => setIsPrivacyModalShown(!isPrivacyModalShown);
    const toggleTermsModal = () => setIsTermsModalShown(!isTermsModal);

    const handleSubmit = event => {
        event.preventDefault();
        setError('');

        if (validateEmail(email))
            if (password === cPassword) {
                if(acceptTerms) {

                AuthApiService.postUser({
                    username: email.toLowerCase(),
                    password: password,
                    nickname: nickname,
                })
                    .then(() => {
                        setEmail('');
                        setNickname('');
                        setPassword('');
                        setCPassword('');
                        navigate('/login');
                    })
                    .catch(res => setError(res.error))
                } else setError( 'Please Accept Terms & Conditions');
            } else setError( 'Passwords dont Match');
        else setError( 'Email not properly formatted');
    }

    return (
        <div className={'login-page'}>
            <form className={'login-inputs'} onSubmit={handleSubmit}>
                <Title/>
                <label>Name: <input value={nickname} type={'text'} onChange={changeNickname}/></label>
                <label>Email: <input value={email} type={'text'} onChange={changeEmail}/></label>
                <label>Password: <input value={password} type={'password'} onChange={changePassword}/></label>
                <label>Confirm Password: <input value={cPassword} type={'password'} onChange={changeCPassword}/></label>
                <PrivacyPolicy toggleRead={toggleAcceptTerms}/>
                <div className='checkbox-privacy'>
                    <label>
                        By completing this form, I agree to the
                        <span title={'Open Terms & Conditions Modal'} onClick={toggleTermsModal}>Terms</span>
                        and
                        <span title={'Open Privacy Policy Modal'} onClick={() => {togglePrivacyModal(); setAcceptTerms(true);}}> Privacy Policy. </span>
                    </label>
                </div>
                <label className={'accept-terms'}>Accept Terms & Conditions <input value={acceptTerms} type={'checkbox'} onChange={toggleAcceptTerms}/></label>
                {error && error.length > 0 && <p className={'error'}>{error}</p>}
                <div className={'loginButtons'}>
                    <Link to={'/login'}>
                        <button type='button'>Back</button>
                    </Link>
                    <button className={!acceptTerms ? 'disabled' : ''} disabled={!acceptTerms} type='submit'>Submit</button>
                </div>
            </form>
            <Modal isOpen={isPrivacyModalShown} handleClose={togglePrivacyModal}>
                <PrivacyPolicy/>
            </Modal>
            <Modal isOpen={isTermsModal} handleClose={toggleTermsModal}>
                <TermsConditions/>
            </Modal>
        </div>
    )
}

export default SignUp;
