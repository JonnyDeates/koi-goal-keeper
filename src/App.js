import React from 'react';
import './App.css';
import Home from './Home/Home.js'
import TopNav from './TopNav/TopNav.js'
import AddGoal from './AddGoal/AddGoal.js'
import {Switch} from "react-router-dom";
import PastGoals from "./PastGoals/PastGoals";
import Settings from "./Settings/Settings";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from "./PublicRoute/PublicRoute";

class App extends React.Component {


    render() {
        return (
            <div className="App">
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} autoClose={5000} hideProgressBar={false}
                                pauseOnHover={true} draggablePercent={60}/>
                <div className={'App-Pages'}>
                    <section className="min-Width">
                        <PublicRoute path={'/'} component={TopNav}/>
                        </section>
                    <section className="min-Width-Two">
                        <Switch>
                            <PublicRoute exact path={'/'} component={Home}/>
                            <PublicRoute path={'/add'} component={AddGoal}/>
                            <PublicRoute path={'/past-goals'} component={PastGoals}/>
                            <PublicRoute path={'/settings'} component={Settings}/>
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
