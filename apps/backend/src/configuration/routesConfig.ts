import { Request, Response } from "express"; 
import path from "path";

const VALID_ROUTES = {
    public: ['/', '/login', '/sign-up', '/forgot-password', '/forgot-password/token'],
    private: ['/', '/budget', '/saving-goals', '/settings']
  };

const routesConfig = async (req: Request, res: Response) => {
  const directoryToBuild = path.join(__dirname.substring(0, __dirname.length - 17), 'build');
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

export default routesConfig