//REACT_ENV=prod
const REACT_ENV = 'prod'
// 
const backend_base_url_dev = 'http://192.168.1.111:8000/'
const frontend_base_url_dev = 'http://localhost:3000/'
const server_url_dev = 'http://192.168.1.111/'
const site_url_dev = 'http://localhost:3000/'
const backend_domain_dev = '192.168.1.111'
const access_token_dev = 'sHetF-JwtYi-kJtsE-TeuAa-nKwqP-LshNd-aXhwV-ZalBr'
const site_key_dev = '6Le7mo4rAAAAAHp0irf1mq-EZntqBPN-n2Xwkjcz'
// 
const backend_base_url_prod = 'http://api.beasconsultancy.com/'
const frontend_base_url_prod = 'http://localhost:3000/'
const server_url_prod = 'http://api.beasconsultancy.com/'
const site_url_prod = 'http://localhost:3000/'
const backend_domain_prod = 'api.beasconsultancy.com'
const access_token_prod = 'sHetF-JwtYi-kJtsE-TeuAa-nKwqP-LshNd-aXhwV-ZalBr'
const site_key_prod = '6Le7mo4rAAAAAHp0irf1mq-EZntqBPN-n2Xwkjcz'
// 
let prodObj = {
    BACKEND_DOMAIN: backend_domain_prod,
    SERVER_URL: server_url_prod,
    SITE_URL: site_url_prod,
    API_BASE_URL: `${backend_base_url_prod}api/`,
    BACKEND_BASE_URL: backend_base_url_prod,
    FRONTEND_BASE_URL: frontend_base_url_prod,
    ACCESS_TOKEN: access_token_prod,
    SITE_KEY: site_key_prod
}
const devObj = {
    BACKEND_DOMAIN: backend_domain_dev,
    SERVER_URL: server_url_dev,
    SITE_URL: site_url_dev,
    API_BASE_URL: `${backend_base_url_dev}api/`,
    BACKEND_BASE_URL: backend_base_url_dev,
    FRONTEND_BASE_URL: frontend_base_url_dev,
    ACCESS_TOKEN: access_token_dev,
    SITE_KEY: site_key_dev
}

const getEnv = () => {
    if (REACT_ENV == 'prod') {
        return prodObj
    } else if (REACT_ENV == 'dev') {
        return devObj
    }
}

module.exports.env = getEnv();