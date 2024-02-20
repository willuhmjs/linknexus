// edit this file to change the default values for the server
// import variables from config as needed
import { MONGO_URL, JWT_KEY, SAAS_RAW } from '$env/static/private';
export { MONGO_URL, JWT_KEY };
export const SAAS = SAAS_RAW === 'false' ? false : true;
