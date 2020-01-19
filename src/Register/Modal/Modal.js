import React, {Component} from 'react';
import {Button} from "../../Utils/Utils";
import './Modal.css'
class Modal extends Component {
    render() {
        return (<main className='modal-wrapper'>

            <h1>{this.props.header}</h1>
            {this.props.children}
            <Button onClick={()=> this.props.closeModal()}>Close</Button>
        </main>
            )
    }
}
export default Modal;