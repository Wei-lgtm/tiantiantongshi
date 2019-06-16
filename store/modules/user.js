const user = {
	state:{
		userInfo: {}
	},
	mutations:{
		setUserInfo(state,userInfo){
			state.userInfo = userInfo
		}
	},
	actions:{

	},
	getters:{
		userInfo:state => state.userInfo
	}
}

export default user