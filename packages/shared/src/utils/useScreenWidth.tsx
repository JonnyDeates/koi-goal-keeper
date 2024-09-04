import {useEffect, useState} from "react";
import {debounce} from "@repo/utils"

export enum SCREEN_WIDTH { "mobile" , "tablet" , "720p" ,"1080p" ,"2k" ,"4k" }

export const useScreenWidth = (): SCREEN_WIDTH => {

        const getCurrentScreenSize = (): SCREEN_WIDTH => {
            if (window.innerWidth < 480) {
                return SCREEN_WIDTH.mobile
            } else if (window.innerWidth < 720) {
                return SCREEN_WIDTH.tablet
            } else if (window.innerWidth < 1080) {
                return SCREEN_WIDTH["720p"]
            } else if (window.innerWidth < 1440) {
                return SCREEN_WIDTH["1080p"]
            } else if (window.innerWidth < 2160) {
                return SCREEN_WIDTH["2k"]
            } else {
                return SCREEN_WIDTH["4k"]
            }
        }
        const [screenSize, setScreenSize] = useState<SCREEN_WIDTH>(getCurrentScreenSize());

        useEffect(() => {
            const processChange = debounce(() =>  setScreenSize(getCurrentScreenSize()), 100);
            window.addEventListener('resize', processChange);
            processChange();
            return () => window.removeEventListener('resize', processChange);
        }, []);

        return screenSize;
};
