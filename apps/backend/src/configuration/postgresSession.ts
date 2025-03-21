import {Pool} from 'pg';
import pgSimpleConnection from 'connect-pg-simple';
import session from 'express-session';
import config from 'src/config';

const pgStore = pgSimpleConnection(session);
const postgresSession = () => {
    const isDevelopment = config.NODE_ENV === "development";

  const pool = new Pool({
      host: config.DATABASE_IP,
      database: config.DATABASE_NAME,
      password: config.POSTGRES_PASSWORD,
      port: config.DATABASE_PORT,
      user: config.POSTGRES_USER,
  });
  pool.on('connect', ()=> {
      console.log("Connected Successfully to Database!")
  })
    pool.on('error', (err)=> {
        console.error("Failed to connect to the Database!", err )
    })
    return session({
        store: new pgStore({
           pool
          } ),
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: !isDevelopment, // if true only transmit cookie over https
          httpOnly: true, // if true prevent client side JS from reading the cookie
          maxAge: 1000 * 60 * 60, // session max age in miliseconds, is set to 1 hour
          sameSite: "strict"
        }
      });
};

export default postgresSession;