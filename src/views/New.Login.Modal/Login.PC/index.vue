<template>
	<Modal
		@on-cancel = "closeLoginModal()"
		@on-ok = "closeLoginModal()"
		:value = "userStore.modalVisible && !isPhone"
		:title = "null"
		:footer-hide = "true"
		class-name = "iview-login-modal"
		:closable = "false"
		:transition-names = "['fade', null]"
	>
		<form
			class = "login-modal-container"
			:style = "{ 'background-image': `url('${imgLoginModalBg}')` }"
			v-if = "!isPhone"
		>
			<img
				width = "25"
				class = "header-close-btn"
				:src = "imgCloseBtn"
				@click = "closeLoginModal()"
			/>
			<div class = "main-content-container">
				<div class = "main-content">
					<div class = "register-login-swither">
						<span
							@click = "setUserState({ mode: 'register' })"
							:class = "userStore.mode === 'register' && 'selected'"
						>注册
						</span>
						<span
							@click = "setUserState({ mode: 'login' })"
							:class = "userStore.mode === 'login' && 'selected'"
						>登录
						</span>
					</div>
					<div class = "user-input-container">
						<div
							v-if = "userStore.mode === 'register'"
							class = "register-pane"
						>
							<Tooltip
								:content = "verifyTelNum.tips"
								:disabled = "verifyTelNum.valid"
								placement = "top"
								transfer
								always
							>
								<Input
									name = "telNum"
									@on-change = "e => mutateUser(store => (store.input_telNum = e.target.value))"
									:value = "userStore.input_telNum"
									placeholder = "请输入手机号"
									type = "text"
								/>
							</Tooltip>
							<Input
								name = "password"
								@on-change = "e => mutateUser(store => (store.register.input_password = e.target.value))"
								:value = "userStore.register.input_password"
								:type = "userStore.registerPwdVisible ? 'text' : 'password'"
								:icon = "!userStore.registerPwdVisible ? 'md-eye-off' : 'md-eye'"
								placeholder = "密码必须由8-16位字母与数字组合"
								@on-click = "mutateUser(draft => (draft.registerPwdVisible = !draft.registerPwdVisible))"
							/>
							<div style = "display: flex; justify-content: space-between">
								<Input
									style = "width: 120px"
									@input = "value => mutateUser(store => (store.register.input_verifyCode = value))"
									:value = "userStore.register.input_verifyCode"
									placeholder = "验证码"
								/>
								<span
									class = "send-verify-code-btn"
									:class = "{ disabled: userStore.register.verifyCodeTimer }"
									@click = "registerVerifyCode"
								>
									{{
										userStore.register.verifyCodeTimer === 0 ? "发送验证码" : `重新发送 (${ userStore.register.verifyCodeTimer }s)`
									}}
								</span>
							</div>
							<Input
								@input = "value => mutateUser(store => (store.register.input_promotionCode = value))"
								:value = "userStore.register.input_promotionCode"
								placeholder = "输入推广码 (选填)"
							/>
							<Checkbox
								class = "agreement-checkbox"
								:value = "userStore.register.checkbox_97hashServiceAgreement"
								@on-change = "
									value => mutateUser(store => (store.register.checkbox_97hashServiceAgreement = value))
								"
							>
								我已阅读并接受
								<span
									@click = "
										e => {
											e.preventDefault();
											closeLoginModal()
											$router.push('/page/helpcenter/服务协议');
										}
									"
									class = "agreement-entry"
								>《服务协议》
								</span>
							</Checkbox>
						</div>
						<div
							v-if = "userStore.mode === 'login'"
							class = "login-pane"
						>
							<Input
								name = "telNum"
								@on-change = "e => mutateUser(store => (store.input_telNum = e.target.value))"
								:value = "userStore.input_telNum"
								placeholder = "请输入手机号"
							/>
							<Input
								name = "password"
								@on-change = "e => mutateUser(store => (store.login.input_password = e.target.value))"
								:value = "userStore.login.input_password"
								:type = "userStore.loginPwdVisible ? 'text' : 'password'"
								:icon = "!userStore.loginPwdVisible ? 'md-eye-off' : 'md-eye'"
								placeholder = "请输入密码"
								@on-click = "mutateUser(draft => (draft.loginPwdVisible = !draft.loginPwdVisible))"
							/>
							<div class = "forgot-password">
								<span @click="toggleModalVisible()">忘记密码?</span>
							</div>
							<Checkbox
								class = "agreement-checkbox"
								:value = "userStore.login.checkbox_dontBecomeAddictedAgreement"
								@on-change = "
									value => mutateUser(store => (store.login.checkbox_dontBecomeAddictedAgreement = value))
								"
							>
								盲盒娱乐请理性消费
							</Checkbox>
							<Checkbox
								class = "agreement-checkbox"
								:value = "userStore.login.checkbox_IamAdultAgreement"
								@on-change = "value => mutateUser(store => (store.login.checkbox_IamAdultAgreement = value))"
							>
								我已满18周岁，并同意
								<span
									@click = "
										e => {
											e.preventDefault();
											
											closeLoginModal()
											//$store.state.modalVisible=false
											$router.push('/page/helpcenter/服务协议');
										}
									"
									class = "agreement-entry"
								>《服务协议》
								</span>
								<span
									@click = "
										e => {
											e.preventDefault();
											closeLoginModal()
											$router.push('/page/helpcenter/隐私条款');
										}
									"
									class = "agreement-entry"
								>《隐私条款》
								</span>
							</Checkbox>
						</div>
					</div>
				</div>
				
				<img
					@click = "register()"
					v-if = "userStore.mode === 'register'"
					class = "register-btn"
					:src = "imgRegisterBtn"
				/>
				<img
					@click = "login()"
					v-if = "userStore.mode === 'login'"
					class = "login-btn"
					:src = "imgLoginBtn"
				/>
			</div>
		</form>
	</Modal>
</template>

<script>
import { reaxel_user } from "@/reaxels/user";
import { reaxel_initial } from "@/reaxels/initial";
import { reaxel_ResetPassword } from '@/reaxels/user/reset-password';

const reax_User = reaxel_user() , {
	userStore ,
	setUserState ,
	mutateUser ,
	request_login ,
	request_profile ,
	request_registerVerifyCode ,
	request_register ,
} = reax_User;
const { toggleModalVisible } = reaxel_ResetPassword();
export default reaxper({
	status () {
		const { isPhone } = reaxel_initial().initialStore;
		return {
			isPhone ,
			userStore ,
			verifyTelNum : reax_User.isValidTelNum ,
		};
	} ,
	data () {
		return {
			pwdVisible : false ,
			imgLoginModalBg ,
			imgCloseBtn ,
			imgRegisterBtn ,
			imgLoginBtn ,
		};
	} ,
	methods : {
		toggleModalVisible,
		login () {
			request_login();
		} ,
		register () {
			request_register();
		} ,
		closeLoginModal () {
			setUserState({
				modalVisible : false ,
			});
			reax_User.clearLoginCallback();
		} ,
		preventInvalidTelNumWords (e) {
			console.log(e);
			if ( e.key === "Backspace" ) {
				return;
			}
			if ( !/[0-9]/.test(e.key) || userStore.input_telNum.length > 10 ) {
				e.preventDefault();
			}
		} ,
		setUserState ,
		mutateUser ,
		registerVerifyCode () {
			request_registerVerifyCode();
		} ,
	} ,
	components : {
		Tooltip ,
	} ,
});

import { Tooltip } from "iview";
import imgLoginModalBg from "./img_3.webp";
import imgCloseBtn from "./img.png";
import imgRegisterBtn from "./img_1.png";
import imgLoginBtn from "./img_2.png";
</script>

<style
	lang = "less"
	scoped
>
.login-modal-container {
	width: 638px;
	height: 438px;
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-end;
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
}

.header-close-btn {
	cursor: pointer;
	margin: 10px 10px 0 0;
}

.main-content-container {
	width: 300px;
	height: 325px;
	padding-right: 36px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	align-items: center;
	margin-top: 52px;
	
	/deep/ .ivu-input::-webkit-input-placeholder {
		color: rgba(202, 202, 202, 0.89);
		font-size: 14px !important;
	}
	
	/deep/ .ivu-input-wrapper {
		.ivu-input-icon {
			font-size: 16px;
			right: 0px;
			top: -1px;
		}
	}
	
	/deep/ .ivu-input {
		color: white;
		height: 28px;
		border-radius: 6px;
		font-size: 14px;
		padding-left: 10px;
		background: rgba(0, 0, 0, 0.32) !important;
		background-color: rgba(0, 0, 0, 0.32) !important;
	}
}

.register-pane,
.login-pane {
	& > div {
		&:not(:first-child) {
			margin-top: 15px;
		}
	}
	
	/deep/ .ivu-tooltip {
		width: 100%;
	}
}

.main-content {
	display: flex;
	flex-flow: column nowrap;
}

.user-input-container {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	margin-top: 22px;
	width: 244px;
}

.register-login-swither {
	display: flex;
	justify-content: center;
	
	& > span {
		color: white;
		cursor: pointer;
		font-size: 22px;
		
		&.selected {
			color: #ffbc2c;
			text-decoration: underline;
			text-underline-offset: 6px;
		}
		
		&:last-child {
			margin-left: 38px;
		}
	}
}

.login-btn,
.register-btn {
	width: 269px;
	cursor: pointer;
	height: 49px;
}

.send-verify-code-btn {
	width: 114px;
	background-color: #eeba34;
	border-radius: 4px;
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;
	
	&.disabled {
		background-color: rgba(154, 154, 154, 0.4);
		color: #e7e7e7;
	}
	
	&:hover {
		opacity: 0.8;
	}
}

.agreement-checkbox {
	margin-top: 10px;
	user-select: none;
	color: #b9b9b9;
	text-decoration: underline;
	
	/deep/ & > span:first-child {
		margin-right: 6px;
	}
	
	& .agreement-entry {
		color: #ffbc2c;
		
		&:hover {
		}
	}
}

.forgot-password {
	font-size: 12px;
	color: white;
	text-align: right;
	user-select: none;
	cursor: pointer;
}

/deep/ .iview-login-modal {
	.ivu-modal-body {
		padding: 0;
	}
	
	.ivu-modal {
		top: 50%;
		transform: translateY(-50%);
	}
	
	.ivu-modal-content {
		box-shadow: none;
		background: transparent;
	}
	
	.ivu-modal-body {
		background: transparent;
		box-shadow: none;
	}
}

/deep/ .ivu-modal {
	width: fit-content !important;
}

/deep/ .ivu-modal-mask {
	background-color: rgba(0, 0, 0, 0.6);
}
</style>
