import request from '~/utils/request'

const api = {
  RecommendIndex() {
    return request.post('/index/recommendIndex')
  },
  usernameLogin(params) {
    return request.post('/user/usernameLogin', params)
  }
}

export default api
