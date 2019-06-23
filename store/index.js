import Vue from 'vue'
import Vuex from 'vuex'

import { aesEncrypt, aesDecrypt } from '@/utils/crypto'

Vue.use(Vuex)

const store = () => new Vuex.Store({
	state: {
		userInfo: {},
		token: '',
		termCourse:[],
		termId:0,
	},
	mutations: {
		setUserInfo(state, user) {
			state.userInfo = user
			sessionStorage.setItem('SUCCESS', aesEncrypt(JSON.stringify(user)))
		},
		setTokeno(state, token) {
			sessionStorage.setItem("token", token);
			state.token = token
		},
		setTermCourse(state,termCourse){
			state.termCourse = termCourse
		},
		setTermId(state,termId){
			state.termId = termId
		}
	},
	actions: {

	},
	getters: {
		userInfo: state => state.userInfo,
		token: state => state.token,
		termCourse: state => state.termCourse,
		termId: state => state.termId,
	},
	modules: {

	}
})

export default store