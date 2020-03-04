import React from 'react';

const Formfield = ({formdata, change, id}) => {
	
	const showError = () => {
		let errorMsg = null
		if(formdata.validation){
			errorMsg = (
				<div className="error_label">
					{formdata.validationMsg}
				</div>
			)
		}
		return errorMsg
	}
	const renderTamplate = () => {


		let formTemplate = null
		switch(formdata.element){
			case('input'):
				formTemplate = (
					<div className="formBlock">
						{formdata.showlabel ?
						<div className="label_inputs">
							{formdata.config.label}
						</div>
					:null}
						<input
						value={formdata.value}
						onBlur={event=> change({event, id, blur: true})}
						onChange={event=>change({event,id})}
							{...formdata.config}
						/>
						{showError()}
					</div>
				)
			break
			case('textarea'):
				formTemplate = (
					<div className="formBlock">
						{formdata.showlabel ?
						<div className="label_inputs">
							{formdata.config.label}
						</div>
					:null}
						<textarea
							value={formdata.value}
							onBlur={event=> change({event, id, blur: true})}
							onChange={event=>change({event,id})}
							{...formdata.config}
						/>
						{showError()}
					</div>
				)
			break
			case('select'):
				formTemplate = (
					<div className="formBlock">
						{formdata.showlabel ?
						<div className="label_inputs">
							{formdata.config.label}
						</div>
					:null}
						<select
							value={formdata.value}
							onBlur={event=> change({event, id, blur: true})}
							onChange={event=>change({event,id})}
						>
							<option value="">Select one</option>
							{
								formdata.config.options.map(item=>(
									<option key={item.key} value={item.key}>{item.value}</option>
								))
							}
						</select>
						{showError()}
					</div>
				)
			break
			default:
				formTemplate = null
		}

		return formTemplate
	}
	return (
		<div>
			{renderTamplate()}
		</div>
	);
};

export default Formfield;