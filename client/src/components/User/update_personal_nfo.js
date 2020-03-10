import React, { Component } from "react";
import FormField from "../utils/Form/formfield";

import { connect } from "react-redux";
import { update, generateData, isFormValid, populateFields } from "../utils/Form/formActions";

class UpdatePersonalNFO extends Component {
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
      }
    }
  };
  updateForm = elem => {
    const newFormdata = update(elem, this.state.formdata, "update_user");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "update_user");
    let formIsValid = isFormValid(this.state.formdata, "update_user");
    if (formIsValid) {
      console.log(dataToSubmit);
    } else {
      this.setState({
        formError: true
      });
    }
	};
	
	componentDidMount(){
		const newFormData = populateFields(this.state.formdata, this.props.user.userData)
		this.setState({
			formdata:newFormData
		})
	}
  render() {
    return (
      <div>
        <form onSubmit={evt => this.submitForm(evt)}>
          <h2>Personal NFO</h2>
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
          <div>
						{
							this.state.formSuccess ?
							<div className="form_success">Success</div>
							:null
						}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={e => this.submitForm(e)}>Update personal nfo</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
export default connect(mapStateToProps)(UpdatePersonalNFO)
