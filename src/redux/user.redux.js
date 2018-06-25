import axios from 'axios'
import {getRedirectPath} from '../util'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCSEE = 'LOGIN_SUCCSEE'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

const initState = {
	redirectTo: '',
	// isAuth: false,
	msg: '',
	user: '',
	pwd: '',
	type: ''
}

//reducer
export function user(state=initState, action){
	switch(action.type){
		case AUTH_SUCCESS:
			return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
		// case REGISTER_SUCCESS:
		// 	return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload}
		// case LOGIN_SUCCSEE:
		// 	return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case LOGOUT:
			return {...initState,redirectTo:'/login'}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		default:
			return state
	}
}

// function registerSuccess(data) {
// 	return { type:REGISTER_SUCCESS, payload:data }
// }
// function loginSuccess(data) {
// 	return { type:LOGIN_SUCCSEE, payload:data }
// }

function authSuccess(data) {
	return { type:AUTH_SUCCESS, payload:data}
}

function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

export function logoutSubmit(){
	return { type: LOGOUT }
}

export function loadData(userinfo){
	return { type:LOAD_DATA, payload:userinfo}
}

export function update(data) {
	// console.log(11111111)
	// if(!title || !company || !money || !desc) {
	// 	console.log(3333)
	// 	return errorMsg('字段不能为空')
	// }
	return dispatch => {
		axios.post('/user/update', data)
		.then(res=>{
			if(res.status ===200 && res.data.code ===0){
				dispatch(authSuccess(res.data.data))
			}
			else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function login({user, pwd}) {
	if(!user || !pwd) {
		return errorMsg('用户名或密码不能为空')
	}
	return dispatch => {
		axios.post('/user/login', {user, pwd})
		.then(res=>{
			if(res.status === 200 && res.data.code ===0) {
				dispatch(authSuccess(res.data.data))
			}
			else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function regisger({user, pwd, repeatpwd, type}) {
	if(!user || !pwd || !type) {
		return errorMsg('请输入用户名密码')
	}
	if(pwd !== repeatpwd) {
		return errorMsg('密码不一致')
	}
	return dispatch => {
		axios.post('/user/register', {user, pwd, type})
		.then(res=>{
			if(res.status === 200 && res.data.code ===0){
				dispatch(authSuccess({user,pwd,type}))
			}
			else{
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}