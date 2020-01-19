import React, {Component} from 'react';
import './Chibi.css';
import chibi1 from '../../../assets/Chibi/chibi-floral1.gif'
import chibi2 from '../../../assets/Chibi/Chibi-floral2.gif'
import chibi3 from '../../../assets/Chibi/Chibi-floral3.gif'
import chibi4 from '../../../assets/Chibi/Chibi-pattern1.gif'
import chibi5 from '../../../assets/Chibi/Chibi-pattern2.gif'
import chibi6 from '../../../assets/Chibi/Chibi-pattern3.gif'
class Chibi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            outfits: 6,
            isWaving: true,
            image: null
        };
    }

    componentDidMount() {
        if(this.props.isWaving) {
            this.setState({isWaving: this.props.isWaving});
            this.randomWavingOutfit()
        } else {
            this.randomWavingOutfit()
        }
    }

    randomWavingOutfit = () => {
        let rand = Math.floor(Math.random() * this.state.outfits);
        let outfit = null;
        switch (rand) {
            case 0:
                outfit = chibi1;
                break;
            case 1:
                outfit = chibi2;
                break;
            case 2:
                outfit = chibi3;
                break;
            case 3:
                outfit = chibi4;
                break;
            case 4:
                outfit = chibi5;
                break;
            case 5:
                outfit = chibi6;
                break;
            default:
                outfit = chibi1;
                break;
        }

       this.setState({image:outfit});

    };

    render() {
        const { image } = this.state;
        return (
            <div className='chibi-frame'>
                    {!!image && ((this.state.isWaving) ? <img onClick={()=> window.open('https://jonnydeates.com')} className='chibi' alt='Jonnys Chibi Waving' src={image} /> : '')}
            </div>
        );
    }
}

export default Chibi;
