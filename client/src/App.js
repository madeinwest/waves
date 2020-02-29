import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
	componentDidMount(){
		axios.get('api/product/brands')
		.then(resp=>console.log(resp))
	}
	render() {
		return (
			<div>
				test
			</div>
		);
	}
}

export default App;