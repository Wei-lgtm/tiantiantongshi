import axios from 'axios'

var server = axios.create({})

server.defaults.baseURL = process.client ? (process.env.NODE_ENV == 'development' ? '/api' : 'http://qasapi.lumibayedu.com/') : 'http://qasapi.lumibayedu.com/'
server.defaults.timeout = 60000
server.defaults.withCredentials = true
server.defaults.crossDomain = true

server.interceptors.request.use(
    config => {
        if (config.method == 'get') {
            config.data = true
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

server.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default server
