import path from "node:path";
import { type Request, type Response } from "express";

const VALID_ROUTES = {
    public: ['/', '/login', '/sign-up', '/forgot-password', '/forgot-password/token'],
    private: ['/', '/budget', '/saving-goals', '/settings']
  };

const routesConfig = async (req: Request, res: Response) => {
  const directoryToBuild = __dirname;
  const routing = await req.session.user ? 'private' : 'public';
  const isValidRoute = VALID_ROUTES[routing].includes(req.path);

  if (isValidRoute) {
    res.status(200).sendFile(path.join(directoryToBuild, routing, `index-${routing}.html`));
  } else {
    // If the path is not valid, send a 404 response
    res.status(404).sendFile(path.join(directoryToBuild, routing, `index-${routing}.html`));
  }
};
export const ALL_ROUTES = [...new Set([...VALID_ROUTES.private, ...VALID_ROUTES.public])];

export default routesConfig;