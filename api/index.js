import request from '~/utils/request'

const api = {
  RecommendIndex() {
    return request.post('/index/recommendIndex')
  }
}

export default api
