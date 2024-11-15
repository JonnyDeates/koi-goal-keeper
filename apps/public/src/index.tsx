import React from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {ParallaxProvider} from "react-scroll-parallax";
import router from "./pages/LandingPageOld/router";
import './index.css';

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
    <ParallaxProvider>
        <RouterProvider router={router}/>
    </ParallaxProvider>
);

