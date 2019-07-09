import axios from 'axios'
import md5 from 'js-md5'
import sha256 from 'js-sha256'
import { aesEncrypt, aesDecrypt } from '@/utils/crypto'

var server = axios.create({})

// server.defaults.baseURL = process.client ? (process.env.NODE_ENV == 'development' ? '/qasschool' : 'http://qasschoolapi.lumibayedu.com/') : 'http://qasschoolapi.lumibayedu.com/'
server.defaults.baseURL = process.client ? (process.env.NODE_ENV == 'development' ? '/qasschool' : 'https://schoolapi.lumibayedu.com/') : 'https://schoolapi.lumibayedu.com/'
server.defaults.timeout = 60000
server.defaults.withCredentials = false
server.defaults.crossDomain = true

const time = new Date().getTime()
let sign = time + md5('@@@www.lumibayedu.com!@#')
sign = sha256(md5(sign))

server.defaults.headers.common['platform'] = 'pc_teach'
server.defaults.headers.common['version'] = '1.0.0'
server.defaults.headers.common['accessTime'] = time
server.defaults.headers.common['sign'] = sign
// server.defaults.headers.common['uid'] = 0

server.interceptors.request.use(
    config => {
        if (config.method == 'get') {
            config.data = true
        }
        let userInfo = {uid:0}
        if(sessionStorage.getItem("SUCCESS")){
            userInfo = JSON.parse( aesDecrypt(sessionStorage.getItem("SUCCESS") , 'abc') )
        }
        // if(sessionStorage.getItem("sign")){
        //     config.headers.common['sign'] = sessionStorage.getItem("sign")
        // }else{
        //     config.headers.common['sign'] = 'error'
        // }
        config.headers.common['accessToken'] = sessionStorage.getItem("token") || '';
        config.headers.common['uid'] =  userInfo.uid
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

server.interceptors.response.use(
    response => {
        if(response.data.code == 20106){
            $nuxt.$store.commit('setTokenbool',false)
        }
        if(response.data.code == 20201){
            $nuxt.$store.commit('setLoginbool',false)
        }
        //console.log(response.data)
        return response.data
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default server
