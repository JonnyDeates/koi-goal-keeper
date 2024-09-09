import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import React from "react";
import Home from "./Home/Home";
import {Wallpaper, Page404} from "@repo/shared";
import GoalListProvider from "../contexts/GoalListProvider";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={
            <Wallpaper/>
        }
               errorElement={
                   <Wallpaper>
                       <Page404/>
                   </Wallpaper>
               }>
            <Route path='' element={
                <GoalListProvider>
                <Home/>
            </GoalListProvider>}/>
        </Route>
    )
)
export default router;