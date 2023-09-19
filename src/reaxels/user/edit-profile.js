export const reaxel_EditProfile = reaxel(() => {
	
	
	const {
		store : editProfileStore ,
		setState : setEditProfileState ,
		mutate : mutateEditProfile,
	} = orzMobx({
		input_userName : '' ,
		
	});
	
	return () => {
		
		return {
			editProfileStore ,
			setEditProfileState ,
			mutateEditProfile ,
		};
	};
});
