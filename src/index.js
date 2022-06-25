import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {SettingsProvider} from "./Pages/PrivateRoutes/Settings/SettingsContext";
import {BrowserRouter as Router} from "react-router-dom";
import './fonts/Cabin-Regular.ttf';
import KoiApp from "./KoiApp/KoiApp";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Router>
        <SettingsProvider>
            <KoiApp/>
        </SettingsProvider>
    </Router>);
