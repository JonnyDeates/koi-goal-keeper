import React from 'react';
import './Modal.css'

const Modal = ({header, children, isOpen, handleClose}) => {
    return isOpen ? <>
        <div className='modal-wrapper' onClick={handleClose}/>
        <main className='modal-front'>
            {header && <h1>{header}</h1>}
            {children}
            <button onClick={handleClose}>X</button>
        </main>
    </> : null

}
export default Modal;