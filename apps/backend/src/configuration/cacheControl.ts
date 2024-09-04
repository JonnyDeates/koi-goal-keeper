import cacheControl from "express-cache-controller";

const cacheControlConfig = () => {
  return cacheControl({ noCache: true })
};
export default cacheControlConfig;