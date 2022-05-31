import React from 'react'
import {Route, Routes} from 'react-router';
import ForgotPassword from "./Login/ForgotPassword/ForgotPassword";
import Register from "./Register/Register";
import Login from "./Login/Login";
import LandingPage from "./LandingPage/LandingPage";

const PublicRoutes = () => {
    return <Routes>
        <Route path={'/*'} element={<LandingPage/>}/>
        <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
        <Route path={'/sign-up'} element={<Register/>}/>
        <Route exact path={'/login'} element={<Login/>}/>
    </Routes>

}
export default PublicRoutes;