import React from 'react';
import './App.css';
import Home from '../Pages/Home/Home.js'
import AddGoal from '../Pages/AddGoal/AddGoal.js'
import {Switch} from "react-router-dom";
import PastGoals from "../Pages/PastGoals/PastGoals";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Settings from "../Pages/Settings/Settings";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "../Routes/PrivateRoute/PrivateRoute";
import PublicRoute from "../Routes/PublicRoute/PublicRoute";
import LandingPage from "../Pages/LandingPage/LandingPage";
import ForgotPassword from "../Pages/Login/ForgotPassword/ForgotPassword";
import BottomNav from "../Components/BottomNav/BottomNav";

class App extends React.Component {

    componentDidMount() {
        // try {
        //     window.gapi.load('auth2', () => {
        //         this.auth2 = window.gapi.auth2.init({
        //             client_id: config.GOOGLE_TOKEN,
        //         })
        //     })
        // }
        // catch(e) {
        //     console.log('Hello There!')
        // }
    }

    render() {

        return (
            <div className="App">

                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={5000} hideProgressBar={false}
                                pauseOnHover={true} draggablePercent={60}/>
                <PublicRoute exact path={'/'} component={LandingPage}/>
                <div className={'App-Pages'}>
                    <section className="min-Width">
                        <PrivateRoute path={'/koi'} component={BottomNav}/>
                        </section>
                    <section className="min-Width-Two">
                        <Switch>
                            <PrivateRoute exact path={'/koi/'} component={Home}/>
                            <PrivateRoute path={'/koi/add'} component={AddGoal}/>
                            <PrivateRoute path={'/koi/past-goals'} component={PastGoals}/>
                            <PrivateRoute path={'/koi/settings'} component={Settings}/>
                            <PublicRoute exact path={'/login'} component={Login}/>
                            <PublicRoute path={'/login/forgot-password'} component={ForgotPassword}/>
                            <PublicRoute path={'/register'} component={Register}/>

                        </Switch>
                    </section>
                    <section className="min-Width"/>
                </div>
            </div>

        )
            ;
    }
}

export default App;
