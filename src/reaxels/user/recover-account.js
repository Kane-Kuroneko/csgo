export const reaxel_RecoverAccount = reaxel(() => {
	const {
		store:recoverAccountStore,
		mutate : mutateRecoverAccount,
		setState:setRecoverAccountState,
	} = orzMobx({
		input_telNum : "",
		input_verifyCode : "",
		input_newSecret : ""
	});
	
	/**
	 * 
	 * @return {Promise<any>}
	 */
	async function request_getRecoverAccountVerifyCode(){
		return requester.post(``,{
			body : JSON.stringify({phone : recoverAccountStore.input_telNum})
		}).then((data) => {
			
		})
	}
	
	
	return () => {
		
		
		
		return {
			recoverAccountStore,
			mutateRecoverAccount,
			setRecoverAccountState,
		}
	}
})
