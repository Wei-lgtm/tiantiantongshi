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
  }, 
  //系统消息
  systemMessage(params) {
    return request.post('/message/mineList',params)
  }
}

export default api
