import React, { Component } from 'react'
import {connect} from 'react-redux'
import FormField from '../utils/Form/formfield'
import {update} from '../utils/Form/formActions'

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

	submitForm = () => {

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
				</form>
			</div>
		)
	}
}

export default connect()(Login)