import React from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {ParallaxProvider} from "react-scroll-parallax";
import router from "./pages/router";
import './index.css';
import '@repo/fonts';

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
    <ParallaxProvider>
        <RouterProvider router={router}/>
    </ParallaxProvider>
);

