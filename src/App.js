import React from 'react';
import './App.css';
import Home from './Home/Home.js'
import TopNav from './TopNav/TopNav.js'
import AddGoal from './AddGoal/AddGoal.js'
import {Route, BrowserRouter as Router} from "react-router-dom";

function App() {
    const links =
        [{to: '/', name: 'Home'}, {to: '/add', name: 'Add'}, {to: '/past-goals', name: 'Past Goals'}];

    return (
        <Router>
            <div className="App">
                <Route render={(routeProps) => <TopNav currentActive={routeProps.location} links={links}/>}/>
                <Route exact path="/"><Home/></Route>
                <Route exact path="/add"><AddGoal/></Route>
            </div>
        </Router>
    );
}

export default App;
