import React, { Component } from 'react';
import UserLayout from '../../../hoc/user'

import FormField from "../../utils/Form/formfield";
import { update, generateData, isFormValid } from "../../utils/Form/formActions";

import {connect} from 'react-redux'
import {getBrands, getWoods} from '../../../actions/products_actions'

class AddProduct extends Component {

	state ={
		formError: false,
		formSuccess: false,
		formdata:{
			name: {
        element: "input",
        value: "",
        config: {
					label:'Product name',
          name: "name_input",
          type: "text",
          placeholder: "Enter your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: true
      },
			description: {
        element: "textarea",
        value: "",
        config: {
					label:'Product description',
          name: "description_input",
          type: "text",
          placeholder: "Description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: true
			},
			price: {
        element: "input",
        value: "",
        config: {
					label:'Product price',
          name: "price_input",
          type: "number",
          placeholder: "Enter price"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: true
      },
			brand: {
        element: "select",
        value: "",
        config: {
					label:'Product select',
					name: "select_input",
					options:[]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: true
      },
			shipping: {
        element: "select",
        value: "",
        config: {
					label:'Shipping',
					name: "shipping_input",
					options:[
						{key: true,value:'yes'},
						{key: false,value:'no'}
					]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: true
      },
			available: {
        element: "select",
        value: "",
        config: {
					label:'Available, in stock',
					name: "available_input",
					options:[
						{key: true,value:'yes'},
						{key: false,value:'no'}
					]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: true
			},
			wood: {
        element: "select",
        value: "",
        config: {
					label:'Wood material',
					name: "wood_input",
					options:[]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: true
      },
			frets: {
        element: "select",
        value: "",
        config: {
					label:'Frets material',
					name: "frets_input",
					options:[
						{key: 20,value:20},
						{key: 21,value:21},
						{key: 22,value:22},
						{key: 24,value:24},
					]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: true
			},
			publish: {
        element: "select",
        value: "",
        config: {
					label:'Publish',
					name: "publish_input",
					options:[
						{key: true,value:'Public'},
						{key: false,value:'Hidden'}
					]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: true
			},
		}
	}
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
  updateForm = elem => {
    const newFormdata = update(elem, this.state.formdata, "register");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
	render() {
		return (
			<UserLayout>
				<div>
					<h1>Add product</h1>
					<form onSubmit={evt=>this.submitForm(evt)}>
						<FormField
							id={"name"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.name}
						/>
					</form>
				</div>
			</UserLayout>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}

export default connect(mapStateToProps)(AddProduct);