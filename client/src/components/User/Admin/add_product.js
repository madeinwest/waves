import React, { Component } from 'react';
import UserLayout from '../../../hoc/user'

import FormField from "../../utils/Form/formfield";
import { update, generateData, isFormValid,populateOptionFields ,resetFields} from "../../utils/Form/formActions";
import FileUpload from '../../utils/Form/fileupload'
import {connect} from 'react-redux'
import {getBrands, getWoods, addProduct, clearProduct} from '../../../actions/products_actions'

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
					label:'Product brand',
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
			images: {
        value: "",
        validation: {
          required: false
        },
        valid: false,
        touched: false,
				validationMsg: "",
				showlabel: false
			},
		}
	}
	componentDidMount(){
		const formdata = this.state.formdata
		this.props.dispatch(getBrands()).then(resp=>{
			const newFormdata = populateOptionFields(formdata, this.props.products.brands,'brand')
			this.updateFields(newFormdata)
		})
		this.props.dispatch(getWoods()).then(resp=>{
			const newFormdata = populateOptionFields(formdata, this.props.products.woods,'wood')
			this.updateFields(newFormdata)
		})
	}
	updateFields = (formdata) => {
		this.setState({
			formdata
		})
	}
	resetFieldsHandler = () => {
		const newFormdata = resetFields(this.state.formdata,"products")
		this.setState({
			formSuccess: true,
			formdata: newFormdata
		})
		setTimeout(() => {
			this.setState({
				formSuccess: false
			},()=>{
				this.props.dispatch(clearProduct())
			})
		}, 3000); 
	}
	
	submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "products");
    let formIsValid = isFormValid(this.state.formdata, "products");
    if (formIsValid) {
			this.props.dispatch(addProduct(dataToSubmit)).then(()=>{
				if(this.props.products.addProduct.success){
					this.resetFieldsHandler()
				}else{
					this.setState({formError: true})
				}
			})
    } else {
      this.setState({
        formError: true
      });
    }
  };
  updateForm = elem => {
    const newFormdata = update(elem, this.state.formdata, "products");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
	};
	imagesHandler = (images) => {
		const newFormdata = {
			...this.state.formdata
		}
		newFormdata['images'].value = images
		newFormdata['images'].valid = true

		this.setState({
			formdata: newFormdata
		})
	}
	render() {
		return (
			<UserLayout>
				<div>
					<h1>Add product</h1>
					<form onSubmit={evt=>this.submitForm(evt)}>
						<FileUpload
							imagesHandler={(images)=> this.imagesHandler(images)}
							reset = {this.setState.formSuccess}
						/>
						<FormField
							id={"name"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.name}
						/>
						<FormField
							id={"description"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.description}
						/>
						<FormField
							id={"price"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.price}
						/>
						<div className="form_divider"></div>
						<FormField
							id={"brand"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.brand}
						/>
						<FormField
							id={"shipping"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.shipping}
						/>
						<FormField
							id={"available"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.available}
						/>
						<div className="form_divider"></div>
						<FormField
							id={"wood"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.wood}
						/>
						<FormField
							id={"frets"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.frets}
						/>
						<div className="form_divider"></div>
						<FormField
							id={"publish"}
							change={element => this.updateForm(element)}
							formdata={this.state.formdata.publish}
						/>
						{this.state.formSuccess ?
						<div className="form_success">
							Success
						</div>
							:null}
						{this.state.formError ? (
						<div className="error_label">Please check your data</div>
					) : null}
        	<button onClick={e => this.submitForm(e)}>Add product</button>
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