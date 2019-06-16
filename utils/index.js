
import method from './method'
import api from '~/api'
import des from './des'

class utils extends method {
  constructor() {
    super()
    this['api'] = api
    this['des'] = des
  }
}

export default new utils
