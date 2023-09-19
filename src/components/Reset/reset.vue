<template>
	<hash-module
		:value = "resetStore.visible"
		:close="toggleModalVisible"
		title = "找回密码"
		width = "6"
	>
		<Form
			ref = "resetForm"
			class = "form-box"
			:rules = "rules"
			:model = "formData"
		>
			<FormItem
				label = ""
				prop = "phone"
			>
				<Input
					:value="resetStore.input_telNum"
					@on-change="e => mutateReset(store => store.input_telNum = e.target.value)"
					@on-keyup = "formData.phone = formData.phone.replace(/[, ]/g, '')"
					size = "large"
					placeholder = "请输入您的手机号码"
				/>
			</FormItem>
			<FormItem
				label = ""
				prop = "code"
				class = "mailboxItem"
			>
				<div style = "display: flex">
					<Input
						:value="resetStore.input_verifyCode"
						@on-change="e => mutateReset(store => store.input_verifyCode = e.target.value)"
						size = "large"
						placeholder = "请输入手机验证码"
					/>
					<div
						class = "default-btn code-btn"
						@click = "verifyCode"
					>
						{{ resetStore.verifyInterval == 0 ? `发送验证码` : `${resetStore.verifyInterval}秒后重试` }}
					</div>
				</div>
			</FormItem>
			<FormItem
				label = ""
				prop = "password"
			>
				<Input
					:value="resetStore.input_password"
					@on-change="e => mutateReset(store => store.input_password = e.target.value)"
					@on-keyup = "formData.password = formData.password.replace(/[, ]/g, '')"
					size = "large"
					type = "password"
					placeholder = "密码必须由8-16位字母与数字组合"
					password
				/>
			</FormItem>
			<FormItem>
				<div
					@click = "submit()"
					class = "default-btn login-btn"
					style = "padding: 0px 1.2rem"
					v-if = "!resetLoading"
				>
					提交修改
				</div>
			</FormItem>
		</Form>
	</hash-module>
</template>
<script>
// import router from '../router/index';
import store from "../../store/index";
import { mapActions } from "vuex";
import { getAction , postAction , putAction } from "../../api/manage";
import HashModule from "../HashModule/HashModule";

import { reaxel_ResetPassword } from '@/reaxels/user/reset-password';
import { reaxel_user } from '@/reaxels/user';
const reax_ResetPassword = reaxel_ResetPassword(),{
	resetStore,
	mutateReset,
	requestSubmitReset,
	requestVerifyCode,
	toggleModalVisible,
	clearResetPassword,
	togglePwdVisible,
} = reax_ResetPassword;
const reax_User = reaxel_user() , {
	clearUserInfo,
} = reax_User;

export default reaxper({
	status(){
		return {
			mutateReset,
			resetStore,
			
		}
	},
	components : { HashModule } ,
	store : store ,
	props : {
		show : Boolean ,
		title : String ,
	} ,
	data () {
		const validEmail = (rule , value , callback) => {
			value = resetStore.input_telNum;
			if ( value === "" ) {
				callback(new Error("请输入手机"));
			} else {
				let reg = /^1[0-9]{10}$/;
				if ( !reg.test(value) ) {
					callback(new Error("手机格式不正确"));
				} else {
					callback();
				}
			}
		};
		const validPwd = (rule , value , callback) => {
			value = resetStore.input_password;
			if ( value === "" ) {
				callback(new Error("密码必须由8-16位字母与数字组合"));
			} else {
				let reg = /^(?=.*[a-z])(?=.*\d)[^]{8,20}$/;
				if ( !reg.test(value) ) {
					callback(new Error("密码必须由8-16位字母与数字组合"));
				} else {
					callback();
				}
			}
		};
		const validCode = (rule , value , callback) => {
			value = resetStore.input_verifyCode;
			if ( value === "" ) {
				callback(new Error("验证不能为空"));
			} else {
				callback();
			}
		};
		return {
			formData : {
				phone : "" ,
				password : "" ,
				code : "" ,
			} ,
			rules : {
				phone : [
					{
						validator : validEmail ,
						trigger : "blur",
					},
				] ,
				password : [
					{
						validator : validPwd ,
						trigger : "blur",
					},
				] ,
				code : [
					{
						validator : validCode ,
						trigger : "blur",
					},
				] ,
			} ,
			codeBtnTxt : "发送验证码" ,
			time : null ,
			codeLoading : false ,
			resetLoading : false ,
		};
	} ,
	watch : {
		codeBtnTxt : function (newValue , oldValue) {
			if ( newValue === 0 ) {
				clearInterval(this.time);
				this.time = null;
				this.codeBtnTxt = "发送验证码";
			} else if ( newValue === 60 ) {
				this.codeBtnTxt = 60;
				this.time = setInterval(() => this.codeBtnTxt -- , 1000);
			}
		} ,
		show : function (newValue , oldValue) {
			if ( newValue ) {
				this.formData.code = "";
				this.formData.password = "";
			}
		} ,
	} ,
	
	methods : {
		verifyCode(){
			this.$refs.resetForm.validateField("phone" , valid => {
				if(!valid){
					requestVerifyCode().then(data => {
						this.$Message.success("验证码已发送");
					}).catch(e => {
						
						this.$Message.error(`发送失败! ${e.message || e}`);
					})
				}
			});
		},
		submit(){
			this.$refs.resetForm.validate(valid => {
				if ( valid ) {
					requestSubmitReset().then(data => {
						clearResetPassword();
						clearUserInfo();
						toggleModalVisible();
						this.$Message.success("重置成功，请重新登录");
					}).catch(e => {
						this.$Message.error(e.message || e.errMsg || e);
					})
				}
			});
		},
		toggleModalVisible,
		...mapActions("account" , ["getUser"]) ,
		
		closeForm () {
			this.$refs.resetForm.resetFields();
			this.show = false;
		} ,
		
		getCode () {
			this.$refs.resetForm.validateField("phone" , valid => {
				if ( !valid ) {
					this.codeLoading = true;
					const captcha = new window.TencentCaptcha("2049235196" , check => {
						if ( check.ret === 2 ) {
							this.$Message.error("用户主动关闭人机验证");
							this.codeLoading = false;
						} else if ( check.ret === 0 ) {
							this.$Spin.show();
							let params = {
								phone : this.formData.phone ,
								randStr : check.randstr ,
								ticket : check.ticket ,
							};
							postAction("/api/personal/center/send/1/code" , params).then(res => {
								this.$Message.success("验证码已发送");
								this.codeLoading = false;
								this.codeBtnTxt = 60;
								this.$Spin.hide();
							}).catch(err => {
								this.$Message.error(err.response.data.errMsg);
								this.codeLoading = false;
								this.$Spin.hide();
							});
						}
						captcha.destroy();
					});
					captcha.show();
				}
			});
		} ,
		resetFunc () {
			this.$refs.resetForm.validate(valid => {
				if ( valid ) {
					this.resetLoading = true;
					this.$Spin.show();
					postAction("/api/personal/center/password" , this.formData).then(res => {
						this.closeForm();
						localStorage.removeItem("token");
						localStorage.removeItem("user");
						this.$login();
						this.$Message.success("重置成功，请重新登录");
						this.$Spin.hide();
						this.resetLoading = false;
					}).catch(err => {
						this.$Message.error(err.response.data.errMsg);
						this.$Spin.hide();
						this.resetLoading = false;
					});
				}
			});
		} ,
	} ,
});
</script>

<style scoped>
/deep/ .ivu-input {
	background-color: #98a8b4;
	border: none;
	border-radius: 0;
	color: #ffffff;
	font-size: 0.16rem;
	box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
	border-radius: 3px;
}
</style>
