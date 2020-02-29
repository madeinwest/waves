import React from 'react';
import {Link} from 'react-router-dom'
const MyButton = (props) => {

	const buttons = () => {
		let tamplate = null
		switch(props.type){
			case "default":
				tamplate = <Link
				className="link_default"
				to={props.linkTo}
				{...props.addStyles}
				>
					{props.title}
				</Link>
				break
			default:
				tamplate=null
		}
		return tamplate
	}

	return (
		<div className="my-Link">
			{buttons()}
		</div>
	);
};

export default MyButton;