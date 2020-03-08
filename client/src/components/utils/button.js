import React from 'react';
import {Link} from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag'


const MyButton = (props) => {
	const buttons = () => {
		let tamplate = null
		switch(props.type){
			case "default":
				tamplate = <Link
				className={!props.altClass ? 'link_default' : props.altClass}
				to={props.linkTo}
				{...props.addStyles}
				>
					{props.title}
				</Link>
				break
			case "bag_link":
				tamplate =
					<div
						className="bag_link"
						onClick={()=>{
							props.runAction()
						}}
					>
						<FontAwesomeIcon
							icon={faShoppingBag}
						/>
					</div>
				break
			case "add_to_cart_link":
				tamplate =
					<div
						className="add_to_cart_link"
						onClick={()=>{
							props.runAction()
						}}
					>
						<FontAwesomeIcon
							icon={faShoppingBag}
						/>
						Add to cart
					</div>
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