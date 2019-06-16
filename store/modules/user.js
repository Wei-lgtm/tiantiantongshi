
import { aesEncrypt, aesDecrypt } from '@/utils/crypto'

const key = 'abc'
const token = ''
const userInfo = {}

const user = {
	state:{
		userInfo: userInfo || {},
		token: token || ''
	},
	mutations:{
		setUserInfo(state,userInfo){
			// sessionstrorage.setItems('SUCCESS',ae)
			state.userInfo = userInfo
		},
		setTokeno(state,token){
			state.token = token
		}
	},
	actions:{

	},
	getters:{
		userInfo:state => state.userInfo,
		token:state => state.token
	}
}

export default user