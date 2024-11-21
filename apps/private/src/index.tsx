import React from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {ParallaxProvider} from "react-scroll-parallax";
import router from "./Pages/router";
import './index.css';
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import ToastProvider from "./contexts/ToastProvider/ToastProvider";
import SettingsProvider from "./contexts/SettingsProvider/SettingsProvider";
import '@repo/fonts';

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found!");
}

const root = createRoot(container);

root.render(
  <ParallaxProvider>
    <ToastProvider>
      <AuthProvider>
        <SettingsProvider>
          <RouterProvider router={router}/>

        </SettingsProvider>
      </AuthProvider>
    </ToastProvider>
  </ParallaxProvider>
);

