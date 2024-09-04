import express, {Request, Response, NextFunction} from "express";

// Configures SSR for react public and private applications
const publicRoutes = express.static("build/public/static");
const privateRoutes = express.static("build/private/static");


const staticConfig = async (req: Request, res: Response, next: NextFunction) => {
    if (await req.session.user) {
      privateRoutes(req, res, next);
    } else {
      publicRoutes(req, res, next);
    }
  }

  export default staticConfig;