export const reaxel_ResetPassword = reaxel(() => {
	
	
	const {
		store:resetStore,
		setState:setResetState,
		mutate : mutateReset,
	} = orzMobx({
		input_telNum : '',
		input_verifyCode : '',
		input_password : '',
		passwordVisible : false,
		verifyInterval : 0,
		visible:false,
	});
	
	function clearResetPassword() {
		setResetState({
			input_telNum : '' ,
			input_verifyCode : '' ,
			input_password : '' ,
			passwordVisible : false ,
		});
	}
	
	let intervalID;
	async function requestVerifyCode() {
		if(resetStore.verifyInterval > 0){
			throw new Error('发送过于频繁,请稍后再试');
		}
		const promise = requester.post('/api/personal/center/send/1/code',{
			body : JSON.stringify({
				phone : resetStore.input_telNum ,
				randStr : '' ,
				ticket : '' ,
			}),
		}).then(data => {
			setResetState({
				verifyInterval : 10,
			});
			intervalID = setInterval(e => {
				if(resetStore.verifyInterval <= 0){
					clearInterval(intervalID);
					setResetState({verifyInterval : 0});
					return;
				}
				setResetState({ verifyInterval : resetStore.verifyInterval - 1 });
			},1000);
		});
		return promise;
	}
	
	async function requestSubmitReset() {
		return requester.post(`/api/personal/center/password`,{
			body : JSON.stringify({
				phone : resetStore.input_telNum ,
				code : resetStore.input_verifyCode ,
				password : resetStore.input_password ,
			}),
		}).then(data => {
			
		})
	}
	
	return () => {
		
		return {
			resetStore,
			setResetState,
			mutateReset,
			requestVerifyCode,
			requestSubmitReset,
			clearResetPassword,
			togglePwdVisible,
			toggleModalVisible,
		};
	};
});


function togglePwdVisible() {
	reaxel_ResetPassword().mutateReset(store => store.passwordVisible = !store.passwordVisible);
}
function toggleModalVisible() {
	const {
		resetStore ,
		setResetState,
	} = reaxel_ResetPassword();
	setResetState({
		visible : !resetStore.visible ,
		input_telNum : reaxel_user().userStore.input_telNum ,
	});
}

import { reaxel_user } from './';
