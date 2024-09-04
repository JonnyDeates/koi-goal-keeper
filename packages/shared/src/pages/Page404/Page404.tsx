import './Page404.css'
import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "koi-pool";


export const Page404 = () => {
    const navigate = useNavigate()

    return <div className={'Page404'}>

            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Button onClick={() => navigate('/')} className={'NavButton'}>Return To Home</Button>
        </div>
};