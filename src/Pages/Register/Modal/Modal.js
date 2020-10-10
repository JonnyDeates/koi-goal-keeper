import React, {Component} from 'react';
import {Button} from "../../../Utils/Utils";
import './Modal.css'
class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            header: '',
            children: '',
            closeModal: ''
        };
    }
    componentDidMount(){
        if(this.props.header) {
            this.setState({header: this.props.header, children: this.props.children, closeModal: this.props.closeModal})
        }
    }
    render() {
        return (<main className='modal-wrapper'>

            <h1>{this.state.header}</h1>
            {this.state.children}
            <Button onClick={()=> this.state.closeModal()}>Close</Button>
        </main>
            )
    }
}
export default Modal;