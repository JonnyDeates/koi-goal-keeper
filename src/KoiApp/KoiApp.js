import './App.css';
import PrivateRoutes from "../Pages/PrivateRoutes/PrivateRoutes";
import PublicRoutes from "../Pages/PublicRoutes/PublicRoutes";
import TokenService from "../services/local/token-service";

const KoiApp = () => !!TokenService.hasAuthToken() ? PrivateRoutes() : PublicRoutes();

export default KoiApp;
