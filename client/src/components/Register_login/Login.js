import React, { Component } from 'react'
import {connect} from 'react-redux'
import FormField from '../utils/Form/formfield'
import {update, generateData,isFormValid} from '../utils/Form/formActions'
import {loginUser} from '../../actions/user_actions'
import {withRouter} from 'react-router-dom'
class Login extends Component {

	state = {
		formError: false,
		formSuccess: '',
		formdata:{
			email:{
				element: 'input',
				value: '',
				config:{
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email'
				},
				validation:{
					required: true,
					email: true
				},
				valid: false,
				touched: false,
				validationMsg: ''
			},
			password:{
				element: 'input',
				value: '',
				config:{
					name: 'password_input',
					type: 'password',
					placeholder: 'Enter your password'
				},
				validation:{
					required: true,
				},
				valid: false,
				touched: false,
				validationMsg: ''
			},
		}

	}

	submitForm = (e) => {
		e.preventDefault()
		let dataToSubmit = generateData(this.state.formdata,'login')
		let formIsValid = isFormValid(this.state.formdata,'login')

		if(formIsValid){
			this.props.dispatch(loginUser(dataToSubmit)).then(resp =>{
				if(resp.payload.loginSuccess){
					this.props.history.push('/user/dashboard')
				}else{
					this.setState({
						formError: true
					})
				}
			})
		}else{
			this.setState({
				formError: true
			})
		}
	}

	updateForm = (elem) => {
		const newFormdata = update(elem, this.state.formdata,'login')
		this.setState({
			formError: false,
			formdata: newFormdata
		})
	}

	render() {
		return (
			<div className="signin_wrapper">
				<form onSubmit={(e)=> this.submitForm(e)}>
					<FormField
						id={'email'}
						change={(element)=> this.updateForm(element)}
						formdata={this.state.formdata.email}
					/>
					<FormField
						id={'password'}
						formdata={this.state.formdata.password}
						change={(elem)=> this.updateForm(elem)}
					/>
					{this.state.formError ?
					<div className="error_label">
						Please check your data
					</div>
					:null}
					<button onClick={(e)=> this.submitForm(e)}>Sign In</button>
				</form>
			</div>
		)
	}
}

export default connect()(withRouter(Login))