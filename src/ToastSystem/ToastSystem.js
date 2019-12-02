import React from 'react';
import './ToastSystem.css';

class ToastSystem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timespan: this.props.timespan || 1000 * 2,
            interval: null,
            textList: this.props.textList || ['Yeet', 'Totally', 'TestData']
        }
    }

    componentDidMount() {
        this.setState({
            interval: setInterval(() => (this.state.textList.length > 0) ? this.setState({textList: this.state.textList.filter((txt, i) => i !== 0)}) : clearInterval(this.state.interval)
                , this.state.timespan)
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.textList !== this.props.textList) {
            this.setState({
                textList: this.props.textList,
                interval: setInterval(() => (this.state.textList.length > 0) ? this.setState({textList: this.state.textList.filter((txt, i) => i !== 0)}) : clearInterval(this.state.interval)
                    , this.state.timespan)
            })
        }
    }

    deleteToast(index) {
        this.setState({textList: this.state.textList.filter((txt, i) => i !== index)})
    }

    render() {
        return (
            <div className='jonnys-toastsystem'>
                {this.state.textList.map((txt, i) => <p key={i} onClick={() => this.deleteToast(i)}>{txt}</p>)}
            </div>
        );
    }
}

export default ToastSystem;
