import request from '~/utils/request'

const api = {
  RecommendIndex(params) {
    return request.post('/index/recommendIndex')
  }
}

export default api
