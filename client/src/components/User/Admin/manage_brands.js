import React, { Component } from 'react';

import FormField from "../../utils/Form/formfield";
import { update, generateData, isFormValid,resetFields} from "../../utils/Form/formActions";
import {connect} from 'react-redux'
import {getBrands, addBrand} from '../../../actions/products_actions'


class ManageBrands extends Component {
	state = {
		formError: false,
		formSuccess: false,
		formdata:{
			name: {
        element: "input",
        value: "",
        config: {
					label:'Brand name',
          name: "name_input",
          type: "text",
          placeholder: "Enter the brand"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
				validationMsg: "",
      }
		}
	}
	showCategoryItems = () => (
		this.props.products.brands ?
		this.props.products.brands.map((item,i)=>(
			<div className="category_item" key={item._id}>
				{item.name}
			</div>
		))
		:null
	)
	
	componentDidMount(){
		this.props.dispatch(getBrands())
	}
	resetFieldsHandler = () =>{
		const newFormdata = resetFields(this.state.formdata,"brands")
		this.setState({
			formSuccess: true,
			formdata: newFormdata
		})
	}
	submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "brands");
    let formIsValid = isFormValid(this.state.formdata, "brands");
    if (formIsValid) {
			this.props.dispatch(addBrand(dataToSubmit,this.props.products.brands))
			.then(resp=>{
				if(resp.payload.success){
					this.resetFieldsHandler()
				}
				else{
					this.setState({formError:true})
				}
			})
    } else {
      this.setState({
        formError: true
      });
    }
  };
  updateForm = elem => {
    const newFormdata = update(elem, this.state.formdata, "brands");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
	};
	render() {
		return (
			<div className="admin_category_wrapper">
				<h1>Brands</h1>
				<div className="admin_two_column">
					<div className="left">
						<div className="brands_container">
							{this.showCategoryItems()}
						</div>
					</div>
					<div className="right">
					<form onSubmit={evt=>this.submitForm(evt)}>
						<FormField
								id={"name"}
								change={element => this.updateForm(element)}
								formdata={this.state.formdata.name}
						/>
						{this.state.formError ? (
						<div className="error_label">Please check your data</div>
					) : null}
        	<button onClick={e => this.submitForm(e)}>Add brand</button>
					</form>
					</div>
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}


export default connect(mapStateToProps)(ManageBrands);