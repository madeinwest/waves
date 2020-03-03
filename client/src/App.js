import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
	componentDidMount(){
		axios.get('api/product/brands')
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