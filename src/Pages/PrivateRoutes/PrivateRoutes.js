import React from 'react'
import {Route, Routes} from 'react-router'
import Settings from "./Settings/Settings";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {getBgColor} from "../../Utils/Theming";
import {useTheme} from "./Settings/SettingsContext";
import Home from "./Home/Home";
import {Navigation} from "../../Components/Navigation/Navigation";

const PrivateRoutes = () => {
    const isMobile = window.innerWidth < 768
    const currentTheme = useTheme()
    const bgColor = isMobile ? {backgroundColor: '#00000000'} : getBgColor(currentTheme)


    return <>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={5000} hideProgressBar={false}
                        pauseOnHover={true} draggablePercent={60}/>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/past-goals'} element={<div/>}/>
            <Route path={'/settings'} element={<Settings bgColor={bgColor}/>}/>

        </Routes>
        <Navigation/>
        </>
}

export default PrivateRoutes;