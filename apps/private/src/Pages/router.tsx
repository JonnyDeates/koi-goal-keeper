import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import React from "react";
import {Page404, Wallpaper} from "@repo/shared";
import GoalListProvider from "../contexts/GoalListProvider/GoalListProvider";
import {Navigation} from "../components/Navigation/Navigation";
import Home from "./Home/Home";
import Settings from "./Settings/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={
      <GoalListProvider>
        <Wallpaper>
          <Navigation/>
        </Wallpaper>
      </GoalListProvider>
    }
           errorElement={
             <Wallpaper>
               <Page404/>
             </Wallpaper>
           }>
      <Route path='' element={
        <Home/>
      }
      />
      <Route path='/settings' element={<Settings/>}/>
    </Route>
  )
);
export default router;