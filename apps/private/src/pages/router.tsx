import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import React from "react";
import Home from "./Home/Home";
import {Wallpaper, Page404} from "@repo/shared";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={
          <Wallpaper />
        }
               errorElement={
          <Wallpaper>
                   <Page404/>
          </Wallpaper>
               }>
            <Route path='' element={<Home/>}/>
        </Route>
    )
)
export default router;