import {Link} from "react-router-dom";
import KoiCoinIcon from "../../assets/icons/koigoalkeeper.png";
import React from "react";
import './Title.css'

const Title = () => <Link className={'title'} to={'/'}>
        <img src={KoiCoinIcon} alt={'Koi Coin Icon'}/>
        <h1>Koi Goal Keeper</h1>
    </Link>
export default Title;