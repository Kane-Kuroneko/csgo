<template>
	<Modal
		@on-cancel = "closeLoginModal()"
		@on-ok = "closeLoginModal()"
		:value = "userStore.modalVisible && isPhone"
		:title = "null"
		:footer-hide = "true"
		class-name = "iview-login-modal"
		:closable = "false"
		:transition-names = "['fade', null]"
	>
		<form
			class = "login-modal-container"
			v-if = "isPhone"
		>
			<img
				width = "12"
				class = "header-close-btn"
				src = "./close-btn.svg"
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
									style = "width: 48.53vw"
									@input = "value => mutateUser(store => (store.register.input_verifyCode = value))"
									:value = "userStore.register.input_verifyCode"
									placeholder = "验证码"
									type = "number"
									max = "6"
								/>
								<span
									class = "send-verify-code-btn"
									:class = "{
										disabled: userStore.register.verifyCodeTimer,
									}"
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
							<p class = "tips">本网站适合年满十八周岁及以上的用户使用，适度娱乐</p>
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
							<Tooltip
								:content = "verifyTelNum.tips"
								:disabled = "verifyTelNum.valid"
								placement = "top"
								transfer
							>
								<Input
									name = "telNum"
									@on-change = "e => mutateUser(store => (store.input_telNum = e.target.value))"
									:value = "userStore.input_telNum"
									placeholder = "请输入手机号"
								/>
							</Tooltip>
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
											$router.push('/page/helpcenter/服务协议');
										}
									"
									class = "agreement-entry"
								>
									《服务协议》
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
			imgRegisterModalBg ,
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
import imgRegisterModalBg from "./img_3.png";
import imgCloseBtn from "./img.png";
import imgRegisterBtn from "./img_1.png";
import imgLoginBtn from "./img_2.png";
</script>

<style
	lang = "less"
	scoped
>
/deep/ .ivu-modal {
	margin: 0 auto;
}

.login-modal-container {
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-end;
	background-size: 100%;
	background-position: center top;
	background-repeat: no-repeat;
	background-image: url("./img_4.png");
	background-color: #130c43;
	border-radius: 8px;
}

.header-close-btn {
	cursor: pointer;
	top: 3.2vw;
	right: 3.2vw;
	position: absolute;
}

.main-content-container {
	padding-right: 9.6vw;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	align-items: center;
	margin: 20vw 0 33.8vw 0;
	padding: 0 6.4vw;
	
	/deep/ .ivu-input::-webkit-input-placeholder {
		color: rgba(202, 202, 202, 0.89);
		font-size: 3.73vw !important;
	}
	
	/deep/ .ivu-input-wrapper {
		.ivu-input-icon {
			font-size: 4.27vw;
			right: 0;
			top: 0.8vw;
		}
	}
	
	/deep/ .ivu-input {
		color: white;
		height: 9.6vw;
		border-radius: 6px;
		font-size: 3.733vw;
		padding-left: 2.67vw;
		background: rgba(0, 0, 0, 0.32) !important;
		background-color: rgba(0, 0, 0, 0.32) !important;
	}
}

.register-pane,
.login-pane {
	& > div {
		&:not(:first-child) {
			margin-top: 2.67vw;
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
	margin-top: 4.8vw;
	width: 81.6vw;
	
	p.tips {
		font-size: 2.67vw;
		color: #87859a;
		margin-top: 1.07vw;
	}
	
	/deep/ .ivu-input-icon {
		width: 8.53vw;
		height: 8.53vw;
		line-height: 8.53vw;
	}
}

.register-login-swither {
	display: flex;
	justify-content: center;
	
	& > span {
		color: white;
		cursor: pointer;
		font-size: 4.8vw;
		
		&.selected {
			color: #ffbc2c;
			text-decoration: underline;
			text-underline-offset: 6px;
		}
		
		&:last-child {
			margin-left: 17.07vw;
		}
	}
}

.login-btn,
.register-btn {
	width: 71.47vw;
	cursor: pointer;
	height: 12.8vw;
	margin-top: 9.07vw;
}

.login-btn {
	margin-top: 17.33vw;
}

.register-btn {
}

.send-verify-code-btn {
	width: 28.27vw;
	background-color: #eeba34;
	border-radius: 4px;
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 3.733vw;
	color: #0b091f;
	
	&.disabled {
		background-color: rgba(154, 154, 154, 0.4);
		color: #e7e7e7;
	}
	
	&:hover {
		opacity: 0.8;
	}
}

.agreement-checkbox {
	margin-top: 2.67vw;
	user-select: none;
	color: #87859a;
	text-decoration: underline;
	font-size: 3.73vw;
	
	/deep/ & > span:first-child {
		margin-right: 2.67vw;
	}
	
	/deep/ span.ivu-checkbox-inner {
		width: 3.73vw;
		height: 3.73vw;
		
		&::after {
			width: 1.07vw;
			height: 2.13vw;
			position: absolute;
			top: 0.27vw;
			left: 1.07vw;
		}
	}
	
	& .agreement-entry {
		color: #ffbc2c;
		
		&:hover {
		}
	}
}

.forgot-password {
	font-size: 3.2vw;
	color: white;
	text-align: right;
	user-select: none;
	cursor: pointer;
	color: #eeba34;
	text-decoration: underline;
}

/deep/ .iview-login-modal {
	.ivu-modal-body {
		padding: 0;
	}
	
	.ivu-modal {
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
	top: 5%;
}

/deep/ .ivu-modal-mask {
	background-color: rgba(0, 0, 0, 0.7);
}
</style>
