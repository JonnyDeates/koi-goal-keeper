import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import React from "react";
import {Page404, Wallpaper} from "@repo/shared";
import LandingPage from "../LandingPage/LandingPage";
import {Login} from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import {UserInputsProvider} from "../../contexts/UserInputsProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={
      <UserInputsProvider>
        <Wallpaper/>
      </UserInputsProvider>
    }
           errorElement={<Wallpaper>
             <Page404/>
           </Wallpaper>
           }>
      <Route path='' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path="/forgot-password">
        <Route path="" element={<ForgotPassword/>}/>
        <Route path="/forgot-password/token" element={<ForgotPassword isTokenPage/>}/>
      </Route>
    </Route>
  )
);
export default router;