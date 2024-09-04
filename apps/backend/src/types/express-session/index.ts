import {SessionData as SessionDataType} from "@repo/types";
import "express-session"

declare module 'express-session' {
    interface SessionData {
        user: SessionDataType;
    }
}