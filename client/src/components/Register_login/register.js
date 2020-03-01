import React, { Component } from "react";
import { connect } from "react-redux";
import FormField from "../utils/Form/formfield";
import { update, generateData, isFormValid } from "../utils/Form/formActions";
import { registerUser } from "../../actions/user_actions";
import Dialog from "@material-ui/core/Dialog/index"

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your lastname"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ""
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMsg: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMsg: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMsg: ""
      }
    }
  };

  updateForm = elem => {
    const newFormdata = update(elem, this.state.formdata, "register");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "register");
    let formIsValid = isFormValid(this.state.formdata, "register");
    if (formIsValid) {
			this.props.dispatch(registerUser(dataToSubmit))
			.then(resp=>{
				if(resp.payload.success){
					this.setState({
						formError: false,
						formSuccess: true
					})
					setTimeout(()=>{
						this.props.history.push('/register_login')
					},3000)
				}else{
					this.setState({
						formError: true
					})
				}
			}).catch(e=>{
				this.setState({
					formError: true
				})
			})
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={evt => this.submitForm(evt)}>
                <h2>Personal information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"name"}
                      change={element => this.updateForm(element)}
                      formdata={this.state.formdata.name}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"lastname"}
                      change={element => this.updateForm(element)}
                      formdata={this.state.formdata.lastname}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id={"email"}
                    change={element => this.updateForm(element)}
                    formdata={this.state.formdata.email}
                  />
                </div>
                <h2>Verify password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"password"}
                      change={element => this.updateForm(element)}
                      formdata={this.state.formdata.password}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"confirmPassword"}
                      change={element => this.updateForm(element)}
                      formdata={this.state.formdata.confirmPassword}
                    />
                  </div>
                </div>
                <div>
                  {this.state.formError ? (
                    <div className="error_label">Please check your data</div>
                  ) : null}
                  <button onClick={e => this.submitForm(e)}>Create an account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
				<Dialog open={this.state.formSuccess}>
					<div className="dialog_alert">
						<div>Congratulations!</div>
						<div>You will be redirected to the Login in a couple of seconds...</div>
					</div>
				</Dialog>
      </div>
    );
  }
}
export default connect()(Register);
