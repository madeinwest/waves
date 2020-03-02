import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER
} from '../actions/types'

export default function(state={}, action){
	switch(action.type){
		case AUTH_USER:
			return {...state, userData: action.payload}
			break
		case REGISTER_USER:
			return {...state,register: action.payload}
			break
		case LOGIN_USER:
			return {...state, loginSuccess:action.payload}
			break
		case LOGOUT_USER:
			return {...state}
			break
		default:
			return state
	}
}