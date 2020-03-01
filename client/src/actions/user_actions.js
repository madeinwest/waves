import axios from 'axios'
import {
	LOGIN_USER,
	REGISTER_USER
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