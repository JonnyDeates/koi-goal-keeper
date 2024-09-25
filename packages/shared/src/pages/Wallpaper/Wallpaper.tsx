
import React, {ReactNode} from "react";
import './Wallpaper.css'
import { Outlet } from "react-router-dom";

type WallpaperProps = {children?: ReactNode}

export const Wallpaper = ({children}: WallpaperProps)=> {

  return <div className='Wallpaper'>
    {children}
    <Outlet />
    </div>
};