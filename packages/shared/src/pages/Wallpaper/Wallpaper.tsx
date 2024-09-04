
import React, {ReactNode} from "react";
import './Wallpaper.css'
import { Outlet } from "react-router-dom";

type WallpaperProps = {children?: ReactNode}

export const Wallpaper = ({children}: WallpaperProps)=> {

  const links =
    [{to: '/', name: 'Home'}, {to: '/projects', name: 'Projects'}, {to: '/contact', name: 'Contact'}];

  return <div className='Wallpaper'>
    {/*<TopNav links={links}/>*/}
    <Outlet />
    {children}
    </div>
};