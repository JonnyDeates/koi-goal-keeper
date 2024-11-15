import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import React from "react";
import {Wallpaper, Page404} from "@repo/shared";
import GoalListProvider from "../contexts/GoalListProvider/GoalListProvider";
import {Navigation} from "../components/Navigation/Navigation";
import Home from "./Home/Home";
import Settings from "./Settings/Settings";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={
            <Wallpaper>
                <Navigation/>
            </Wallpaper>
        }
               errorElement={
                   <Wallpaper>
                       <Page404/>
                   </Wallpaper>
               }>
            <Route path='' element={
                <GoalListProvider>
                    <Home/>
                </GoalListProvider>}
            />
            <Route path='/settings' element={<Settings/>}
            />
        </Route>
    )
);
export default router;