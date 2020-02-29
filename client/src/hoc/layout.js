import React, { Component } from 'react';

import Header from '../components/Header_foorer/Header'
import Footer from '../components/Header_foorer/Footer'

class Layout extends Component {
	render() {
		return (
			<div>
				<Header/>
				<div className="page_container">
				{this.props.children}
				<Footer/>
			</div>
			</div>
		);
	}
}

export default Layout;