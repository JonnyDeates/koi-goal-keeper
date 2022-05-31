import React, {useEffect, useState} from 'react';
import chibi1 from '../../../../../assets/Chibi/chibi-floral1.gif'
import chibi2 from '../../../../../assets/Chibi/Chibi-floral2.gif'
import chibi3 from '../../../../../assets/Chibi/Chibi-floral3.gif'
import chibi4 from '../../../../../assets/Chibi/Chibi-pattern1.gif'
import chibi5 from '../../../../../assets/Chibi/Chibi-pattern2.gif'
import chibi6 from '../../../../../assets/Chibi/Chibi-pattern3.gif'
import './Chibi.css';

const Chibi = () => {

    const outfitCount = 6;
    const [chibiOutfit, setChibiOutfit] = useState()

    useEffect(()=>{
        randomWavingOutfit();
    },[])

   const randomWavingOutfit = () => {
        let rand = Math.floor(Math.random() * outfitCount);
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

        setChibiOutfit(outfit);
    };

        return <div className='chibi-frame'>
                    {!!chibiOutfit && <img onClick={()=> window.open('https://jonnydeates.com')} className='chibi' alt='Jonnys Chibi Waving' src={chibiOutfit} />}
            </div>;
}

export default Chibi;
