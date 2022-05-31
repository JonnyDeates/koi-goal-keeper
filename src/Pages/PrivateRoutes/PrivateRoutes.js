import React from 'react'
import {Route, Routes} from 'react-router'
import Home from "./Home/Home";
import AddGoal from "./AddGoal/AddGoal";
import PastGoals from "./PastGoals/PastGoals";
import Settings from "./Settings/Settings";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BottomNav from "../../Components/BottomNav/BottomNav";

const PrivateRoutes = () => {
    return <>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={5000} hideProgressBar={false}
                        pauseOnHover={true} draggablePercent={60}/>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/add'} element={<AddGoal/>}/>
            <Route path={'/past-goals'} element={<PastGoals/>}/>
            <Route path={'/settings'} element={<Settings/>}/>

        </Routes>
        <BottomNav/>
        </>
}

export default PrivateRoutes;