import morgan from 'morgan';
import config from '../config'

const morganOption = (config.NODE_ENV === 'production')
    ? 'tiny'
    : 'common';
const morganConfig = () => morgan(morganOption);

export default morganConfig;
