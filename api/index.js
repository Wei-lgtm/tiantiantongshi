import request from '~/utils/request'

const api = {
  //获取授权token
  ApplyAccessToken(params){
    return request.post('/index/applyAccessToken',params)
  },
  //首页数据
  RecommendIndex() {
    return request.post('/index/recommendIndex')
  },
  //用户登陆
  usernameLogin(params) {
    return request.post('/user/usernameLogin', params)
  }
}

export default api
