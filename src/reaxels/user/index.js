export const reaxel_user = reaxel((ret) => {
	
	const {
		store ,
		setState ,
		mutate,
	} = orzMobx({
		token : null,
		/** @type {import('./profile').User.profile} 用户登录后的数据*/
		profile : null,
		/*登录/注册框展示状态*/
		modalVisible : false ,
		isEmail : false ,
		/**
		 * @type {'login'|'register'}
		 */
		mode : "register",
		input_telNum : '19906793446' ,
		register : {
			verifyCodeTimer : 0,
			input_password : 'qcynTest9999' ,
			input_verifyCode : '' ,
			input_promotionCode : '' ,
			checkbox_97hashServiceAgreement : false ,
		},
		login : {
			input_password : '',
			checkbox_dontBecomeAddictedAgreement : false,
			checkbox_IamAdultAgreement : false,
			
		},
		resetPassword : {
			input_verifyCode : '',
			input_newPassword : '',
		},
		registerPwdVisible : true,
		loginPwdVisible : false,
	});
	
	
	if(localStorage.getItem('token')){
		setState({token : localStorage.getItem('token')});
	}
	
	obsReaction(() => {
		
		// crayon.green('input_telNum: ',store.input_telNum);
	} , () => [store.input_telNum]);
	
	obsReaction((first) => {
		try {
			requester;
		}catch ( e ) {
			return;
		}
		if(store.token){
			request_profile().then(data => {
				$store.commit("account/setUser" , Object.assign({} , $store.state.account.user , data));
				$store.commit("account/setToken" , store.token);
				$Message.success('登录成功!');
			})
		}else {
			clearUserInfo();
		}
	},() => [store.token]);
	
	let loginCallback = null;
	
	/**
	 * 忘记密码的提交修改按钮
	 */
	async function request_submitChangePassword() {
		
	}
	
	/**
	 * 用户点击登录按钮
	 * @returns {Promise<string>}
	 */
	async function request_login(){
		try {
			if(!/^[0-9]{11}$/.test(store.input_telNum)){
				throw "请输入合法的手机号码";
			}
			if(!store.login.checkbox_dontBecomeAddictedAgreement || !store.login.checkbox_IamAdultAgreement){
				console.log(store.login);
				throw "请仔细阅读并勾选用户协议及其条款";
			};
			if(!store.login.input_password){
				throw "请输入密码";
			}
			return await requester.post(`/api/user/login` , {
				body : JSON.stringify({
					phone : store.input_telNum,
					password : store.login.input_password
				})
			}).then(/**@param data {{token:string}}*/({token}) => {
				localStorage.setItem("token" , token);
				ret.resetLoginInput();
				setState({
					token : token,
					modalVisible : false,
				});
				
				if(typeof loginCallback === 'function'){
					loginCallback();
					loginCallback = null;
				}
				return token;
			});
		}catch ( e ) {
			$Message.error({
				content : e.message || e,
				duration : 3
			});
		}
	}
	
	/**
	 * 获取用户profile
	 * @return {Promise<(import('./profile.d').User.profile)>}
	 */
	async function request_profile (){
		if(!store.token){
			clearUserInfo();
			throw 'token失效,请重新登录';
		}
		return requester.get(`/api/user/info`).then((data) => {
			setState({ profile : data });
			$store.commit("account/setUser" , Object.assign({} , $store.state.account.user , data));
			crayon.gold('userInfo',data);
			return data;
		});
	}
	
	let verfiyCodeInterval = null;
	let verifyRequestPromise = null;
	async function request_registerVerifyCode(){
		if(!verify.telNum(store.input_telNum).valid){
			console.error('ddddddddddddddddd');
			throw '请输入有效的手机号后再发送验证码';
		}
		if(store.register.verifyCodeTimer > 0){
			return;
		}
		if(verifyRequestPromise){
			return;
		}
		const promise = verifyRequestPromise = requester.post(`/api/personal/center/send/0/code`,{
			body : JSON.stringify({
				phone : store.input_telNum,
				randStr : " ",
				ticket : ' ',
			})
		}).then((data) => {
			const {register} = store;
			mutate(store => register.verifyCodeTimer = 15);
			verfiyCodeInterval = setInterval(() => {
				mutate(store => store.register.verifyCodeTimer -= 1);
				if(register.verifyCodeTimer <= 0 ){
					clearInterval(verfiyCodeInterval);
					mutate(store => store.register.verifyCodeTimer = 0);
				}
			},1000);
			verifyRequestPromise = null;
			$Message.success(`发送成功!请注意查收`);
			return data;
		});
		
		promise.catch(e => {
			console.error(e);
			$Message.error(e.message || e);
			verifyRequestPromise = null;
		});
		
		return promise;
	}
	
	/**
	 * @return {Promise<{token:string}>}
	 */
	async function request_register () {
		const promise = requester.post(`/api/user/register`,{
			body : JSON.stringify({
				phone : store.input_telNum ,
				password : store.register.input_password ,
				phoneCode : store.register.input_verifyCode ,
				spreadCode : store.register.input_promotionCode ,
			})
		}).then((data) => {
			localStorage.removeItem("neeko_spreadCode");
			localStorage.setItem("token" , data.token);
			localStorage.setItem("register" , '0');
			setState({
				token : data.token ,
				modalVisible : false,
			});
			
			$store.commit("account/setToken" , data.token);
			$Message.success("恭喜你，注册成功");
			return data;
		});
		promise.catch(e => {
			$Message.error(e.message || e);
		})
		return promise;
	}
	
	function clearUserInfo () {
		setState({
			token : null ,
			profile : null ,
		});
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	}
	
	return (router) => {
		return ret = {
			setUserState : setState ,
			userStore : store ,
			mutateUser : mutate,
			request_login,
			request_profile,
			clearUserInfo,
			request_registerVerifyCode,
			request_register,
			/*用户准备登录*/
			openLoginModal(){
				setState({ modalVisible : true });
				return {
					then(callback){
						loginCallback = callback;
					}
				}
			},
			/*重置用户登录/注册框内的输入状态*/
			resetLoginInput(){
				setState({
					input_telNum : '' ,
					register : {
						verifyCodeTimer : 0,
						input_password : '' ,
						input_verifyCode : '' ,
						input_promotionCode : '' ,
						checkbox_97hashServiceAgreement : false ,
					},
					login : {
						input_password : '',
						checkbox_dontBecomeAddictedAgreement : false,
						checkbox_IamAdultAgreement : false,
						
					},
					resetPassword : {
						input_verifyCode : '',
						input_newPassword : '',
					}
				})
			},
			clearLoginCallback(){
				loginCallback = null;
			},
			get isValidTelNum(){
				return verify.telNum(store.input_telNum);
			},
			_dev_fetch_clear_user_
		};
	};
});


const _dev_fetch_clear_user_ = () => {
	const reax_User = reaxel_user(),{userStore,clearUserInfo,setUserState} = reax_User;
	
	if(utils.assertTrue([
		process.env.NODE_ENV === 'production',
		!userStore.token,
	])) return;
	
	const operation = confirm(`确定要注销当前用户在测试环境下的账户吗?`);
	if(operation) {
		
		requester.post(`http://47.92.247.123:3000/user/clear` , {
			body : JSON.stringify({ phone : userStore.profile.name  }),
			mode : "cors",
			credentials : "omit"
		}).finally(() => {
			$Message.warning({
				duration : 7 ,
				content : `当前测试用户已注销,`,
			});
			clearUserInfo();
		});
	}
}

import { reaxel_ModifyProfile } from './modify-profile';
import { requester } from '../../requester/index';
import { verify } from './verify-fields';
import $store from '../../store';

import { Message as $Message } from "view-design";
