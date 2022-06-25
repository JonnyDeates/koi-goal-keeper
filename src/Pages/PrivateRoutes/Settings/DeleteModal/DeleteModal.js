import React, {useState} from 'react';
import './DeleteModal.css'

const DeleteModal = ({state, deleteData, closeModal}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null)

    const updateEmail = e => setEmail(e.target.value)

    const confirmDeletion = (e) => {
        e.preventDefault();
        if(state.email === email) {
            deleteData(e,state.email);
        } else if(email !== '' && email !== state.email){
            setError('Email Incorrect')
        } else {
            setError('Please Enter Your Email')
        }
    }
    const confirmationText = 'Enter Your Email to Delete Your Account'

    return <>
            <div className={'modal-wrapper'} onClick={closeModal}/>
            <form className={'modal-delete'} onSubmit={confirmDeletion}>
                <h2 title={confirmationText}>{confirmationText}</h2>
                <p className={'error'}>{error}</p>
                <p className={'old-email'} s><i>*Your Email is <b>{state.email}</b></i></p>
                <label title={'Email'}>Email: <input title={'Update Email Input'} type={'text'} onChange={updateEmail} value={email}/></label>
                <div className={'even-space'}>
                    <button className={'modal-cancel'} type='button' onClick={closeModal}>Cancel</button>
                    <button type='submit'>Confirm</button>
                </div>
            </form>
        </>
}
export default DeleteModal;