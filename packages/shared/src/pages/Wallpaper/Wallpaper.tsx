
import React, {type ReactNode} from "react";
import './Wallpaper.css';
import { Outlet } from "react-router-dom";

interface WallpaperProps {children?: ReactNode}

export function Wallpaper({children}: WallpaperProps) {

  return <div className='Wallpaper'>
    {children}
    <Outlet />
    </div>;
}