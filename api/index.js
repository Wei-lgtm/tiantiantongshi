import request from '~/utils/request'

const api = {
  login(params) {
    return request.post('/blog/login', params)
  },
  register(params) {
    return request.post('/blog/register', params)
  }
}

export default api
