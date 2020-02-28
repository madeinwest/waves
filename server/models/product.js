const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
	name:{
		required: true,
		type: String,
		unique: 1,
		maxlength:100,
	},
	description:{
		required: true,
		type: String,
		maxlength:10000,
	},
	price:{
		required: true,
		type: Number,
		maxlength:255,
	},
	brand:{
		required: true,
		type: Number,
		maxlength:255,
	},
})

const Product = mongoose.model('Product')
module.export = {Product}