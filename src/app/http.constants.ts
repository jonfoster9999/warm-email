const env = 'dev';

const URLS = {
    backend: {
        dev: 'http://localhost:3000',
        prod: 'https://warm-email-backend.herokuapp.com'
    },
    frontend: {
        dev: 'http://localhost:4200',
        prod: null
    }
};

export const API_URL= URLS.backend[env];
export const FRONT_END_URL = URLS.frontend[env];