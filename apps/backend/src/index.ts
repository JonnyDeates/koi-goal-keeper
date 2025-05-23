import express from 'express';
import cacheControl from 'express-cache-controller';
import config from "./config";
import morganConfig from "./configuration/morgan";
import corsConfig from "./configuration/cors";
import helmetConfig from "./configuration/helmet";
import postgresSession from "./configuration/postgresSession";
import knexDatabase from "./configuration/knexDatabase";
import staticConfig from "./configuration/staticConfig";
import routesConfig, {ALL_ROUTES} from "./configuration/routesConfig";
import cacheControlConfig from "./configuration/cacheControl";
import authController from "./authentication/authController";
import usersController from "./users/usersController";
import goalsController from "./goals/goalsController";
import tasksController from "./tasks/tasksController";
import SettingsController from "./settings/settingsController";


const createServer = async () => {

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.set('trust proxy', true);
    app.use(cacheControlConfig());
    app.use(morganConfig());
    app.use(corsConfig());
    app.use(helmetConfig());

    // Configure Redis Session middleware
    app.use(postgresSession());
    // Sets up the Knex Postgres Database
    app.set("database", knexDatabase);

    // Static Files for the application
    app.use("/static", staticConfig);

    // The applications site mapping
    app.use("/sitemap.xml", async function (req, res, next) {
        express.static("build/sitemap.xml")(req, res, next);
    });


    app.use("/auth", authController);
    app.use("/api/user", usersController);
    app.use("/api/settings", SettingsController);
    app.use("/api/goals", goalsController);
    app.use("/api/tasks", tasksController);

    // Page Routing
    ALL_ROUTES.forEach(route => {
        app.get(route, cacheControl({ noStore: true }), routesConfig);
    });

    // 404 for site
    app.get("*", routesConfig);

    // Allows the app to accept network requests.
    app.listen(config.PORT, () => { console.log(`Listening on http://localhost:${config.PORT}`); });
};

createServer();
