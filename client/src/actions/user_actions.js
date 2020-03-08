import axios from 'axios'
import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	ADD_TO_CART_USER
} from './types'
import {USER_SERVER} from '../components/utils/misc'



export function registerUser(dataToSubmit){
	const req = axios.post(`${USER_SERVER}/register`,dataToSubmit)
							.then(resp => resp.data)
	return {
		type:REGISTER_USER,
		payload: req
	}
}

export const loginUser = (dataToSubmit) => {
	const req = axios.post(`${USER_SERVER}/login`, dataToSubmit)
	.then(resp => resp.data)
	return {
		type: LOGIN_USER,
		payload: req
	}
}
export function auth(){
	const request = axios.get(`${USER_SERVER}/auth`)
	.then(resp=>resp.data)
	return {
		type: AUTH_USER,
		payload:request
	}
}

export function logoutUser() {
	const request = axios.get(`${USER_SERVER}/logout`)
	.then(resp=>resp.data)
	return {
		type: LOGOUT_USER,
		payload:request
	}
}

export function addToCart(_id){
	const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
	.then(resp=>resp.data)
	return {
		type: ADD_TO_CART_USER,
		payload: request
	}
}