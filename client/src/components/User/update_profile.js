import React from 'react';
import UserLayout from '../../hoc/user'
import UpdatePersonalNFO from './update_personal_nfo'

const UpdateProfile = () => {
	return (
		<UserLayout>
			<h1>Profile</h1>
			<UpdatePersonalNFO/>
		</UserLayout>
	);
};

export default UpdateProfile;