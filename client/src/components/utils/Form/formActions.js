export const validate = (elem,formdata=[]) => {
	let error = [true, '']


	if(elem.validation.email){
		const valid = /\S+@\S+\.\S+/.test(elem.value)
		const message = `${!valid ? 'Must be a valid email' : ''}`
		error = !valid ? [valid, message] : error
	}

	if(elem.validation.required){
		const valid = elem.value.trim() !== ''
		const message = `${!valid ? 'this field is required' : ''}`
		error = !valid ? [valid, message] : error
	}

	return error
	
}

export const update = (element, formdata, formName) => {
	const newFormdata= {
		...formdata
	}
	const newElement = {
		...newFormdata[element.id]
	}
	newElement.value = element.event.target.value

	if(element.blur){
		let validData = validate(newElement, formdata)
		newElement.valid = validData[0]
		newElement.validationMsg = validData[1]
	}

	newElement.touched = element.blur

	newFormdata[element.id] = newElement

	return newFormdata

}