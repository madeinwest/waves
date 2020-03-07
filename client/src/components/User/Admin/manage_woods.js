import React, { Component } from 'react';

import FormField from "../../utils/Form/formfield";
import { update, generateData, isFormValid,resetFields} from "../../utils/Form/formActions";
import {connect} from 'react-redux'
import {getWoods, addWood} from '../../../actions/products_actions'

class ManageWoods extends Component{
	state = {
		formError: false,
		formSuccess: false,
		formdata:{
			name: {
        element: "input",
        value: "",
        config: {
					label:'Wood name',
          name: "name_input",
          type: "text",
          placeholder: "Enter the wood"
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
		this.props.products.woods ?
		this.props.products.woods.map((item,i)=>(
			<div className="category_item" key={item._id}>
				{item.name}
			</div>
		))
		:null
	)
	componentDidMount(){
		this.props.dispatch(getWoods())
	}
	resetFieldsHandler = () =>{
		const newFormdata = resetFields(this.state.formdata,"woods")
		this.setState({
			formSuccess: true,
			formdata: newFormdata
		})
	}
	submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "woods");
    let formIsValid = isFormValid(this.state.formdata, "woods");
    if (formIsValid) {
				this.props.dispatch(addWood(dataToSubmit, this.props.products.woods))
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
    const newFormdata = update(elem, this.state.formdata, "woods");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
	};
	render() {
		return (
			<div className="admin_category_wrapper">
				<h1>Woods</h1>
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
        	<button onClick={e => this.submitForm(e)}>Add wood</button>
					</form>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}


export default connect(mapStateToProps)(ManageWoods);