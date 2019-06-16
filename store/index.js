import Vue from 'vue'
import Vuex from 'vuex'

import { aesEncrypt, aesDecrypt } from '@/utils/crypto'

Vue.use(Vuex)

const key = 'abc'

const store = () => new Vuex.Store({
  state:{
		userInfo: {},
		token: ''
  },
  mutations:{
		setUserInfo(state,userInfo){
			sessionStrorage.setItem('SUCCESS',aesEncrypt( JSON.stringify(userInfo) , key ))
			state.userInfo = userInfo
		},
		setTokeno(state,token){
      sessionStorage.setItem("token", token);
			state.token = token
		}
	},
	actions:{

	},
  getters:{
		userInfo:state => state.userInfo,
		token:state => state.token
	},
  modules:{
    
  }
})

export default store