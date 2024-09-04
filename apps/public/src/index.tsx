import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {ParallaxProvider} from "react-scroll-parallax";
import router from "./pages/router";
import './index.css';

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
    <ParallaxProvider>
        <RouterProvider router={router}/>
    </ParallaxProvider>
);

