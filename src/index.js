import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import {SettingsProvider} from "./Pages/Settings/SettingsContext";
import {GoalListProvider} from "./Components/GoalList/GoalListContext";
import {BrowserRouter as Router} from "react-router-dom";
import './fonts/Cabin-Regular.ttf';
ReactDOM.render(
    <Router>
        <SettingsProvider>
        <GoalListProvider>
            <App/>
        </GoalListProvider>
        </SettingsProvider>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
