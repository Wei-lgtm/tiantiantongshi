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
		courseId:0,
		user:{},
		tokenbool:true,
		page:1,
		courseName:'',
		etermId:0,
		ecourseId:0,
		ktermName:'',
		ktermId:0,
		kcourseId:0,
		kpage:1,
		loginbool:true
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
		setLoginbool(state,loginbool){
			state.loginbool = loginbool
		},
		setTermCourse(state,termCourse){
			state.termCourse = termCourse
		},
		setTermId(state,termId){
			state.termId = termId
		},
		setEtermId(state,etermId){
			state.etermId = etermId
		},
		setCourseId(state,courseId){
			state.courseId = courseId
		},
		setEcourseId(state,ecourseId){
			state.ecourseId = ecourseId
		},
		setUser(state,user){
			state.user = user
		},
		setTokenbool(state,tokenbool){
			state.tokenbool = tokenbool
		},
		setPage(state,page){
			state.page = page
		},
		setCourseName(state,courseName){
			state.courseName = courseName
		},
		setKtermName(state,ktermName){
			state.ktermName = ktermName
		},
		setKtermId(state,ktermId){
			state.ktermId = ktermId
		},
		setKcourseId(state,kcourseId){
			state.kcourseId = kcourseId
		},
		setKpage(state,kpage){
			state.kpage = kpage
		}
	},
	actions: {

	},
	getters: {
		userInfo: state => state.userInfo,
		token: state => state.token,
		termCourse: state => state.termCourse,
		termId: state => state.termId,
		courseId: state => state.courseId,
		user: state => state.user,
		tokenbool: state => state.tokenbool,
		page: state => state.page,
		courseName: state => state.courseName,
		etermId: state => state.etermId,
		ecourseId: state => state.ecourseId,
		ktermName: state => state.ktermName,
		ktermId: state => state.ktermId,
		kcourseId: state => state.kcourseId,
		kpage: state => state.kpage,
		loginbool: state => state.loginbool,
	},
	modules: {

	}
})

export default store