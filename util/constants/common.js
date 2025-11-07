//REACT_ENV=prod
const REACT_ENV = 'dev'
const dev_url = 'http://192.168.1.16/beasconsultancy/backend/public/'
//const dev_url = 'http://192.168.1.16/beasconsultancy/backend/public/'
const prod_url = 'http://192.168.1.16/beasconsultancy/backend/public/'

const server_url = 'http://192.168.1.16/beasconsultancy/backend/public/'
const site_url = 'http://192.168.1.16:3000/'
const backend_domain = '192.168.1.16'

let prodObj = {
    BACKEND_DOMAIN: backend_domain,
    SERVER_URL: server_url,
    SITE_URL: site_url,
    API_BASE_URL: `${prod_url}api/`,
    BACKEND_BASE_URL: prod_url,
    ACCESS_TOKEN: "sHetF-JwtYi-kJtsE-TeuAa-nKwqP-LshNd-aXhwV-ZalBr",
    SITE_KEY: "6Le7mo4rAAAAAHp0irf1mq-EZntqBPN-n2Xwkjcz"
}
const devObj = {
    BACKEND_DOMAIN: backend_domain,
    SERVER_URL: server_url,
    SITE_URL: site_url,
    API_BASE_URL: `${dev_url}api/`,
    BACKEND_BASE_URL: dev_url,
    ACCESS_TOKEN: "sHetF-JwtYi-kJtsE-TeuAa-nKwqP-LshNd-aXhwV-ZalBr",
    SITE_KEY: "6Le7mo4rAAAAAHp0irf1mq-EZntqBPN-n2Xwkjcz"
}

const getEnv = () => {
    if (REACT_ENV == 'prod') {
        return prodObj
    } else if (REACT_ENV == 'dev') {
        return devObj
    }
}

module.exports.env = getEnv();