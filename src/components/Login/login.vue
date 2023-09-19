<template>
	<div
		class = "hash-module"
		:class = "{ show: show }"
	>
		<div class = "hash-box">
			<i
				class = "iconfont iconicon-close"
				@click = "closeForm"
			></i>
			<div class = "hash-content">
				<p class = "n-login-tit">
					<span
						:class = "{ active: mode === 1 }"
						@click = "mode = 1"
					>注册
					</span>
					<span
						:class = "{ active: mode === 0 }"
						@click = "mode = 0"
					>登录
					</span>
				</p>
				<Form
					v-if = "mode === 0"
					ref = "loginForm"
					class = "form-box login-form-box"
					:rules = "rules"
					:model = "loginFormData"
				>
					<FormItem
						label = ""
						prop = "phone"
					>
						<Input
							v-model = "loginFormData.phone"
							@on-keyup = "loginFormData.phone = loginFormData.phone.replace(/[, ]/g, '')"
							size = "large"
							placeholder = "请输入您的手机号"
						/>
					</FormItem>
					<FormItem
						label = ""
						prop = "password"
					>
						<Input
							password
							v-model = "loginFormData.password"
							@on-enter = "login"
							@on-keyup = "loginFormData.password = loginFormData.password.replace(/[, ]/g,'')"
							size = "large"
							type = "password"
							placeholder = "请输入密码"
						/>
					</FormItem>
					<div>
						<div
							class = "protocol"
							@click = "entertainment = !entertainment"
						>
							<!--                        <Checkbox v-model="entertainment"></Checkbox>-->
							<div class = "all-chosed">
								<i
									class = "iconfont iconicon-select"
									v-show = "entertainment"
								></i>
							</div>
							<span> 盲盒娱乐请理性消费,切勿上头</span>
						</div>
						<div
							class = "protocol"
							@click = "agreement = !agreement"
						>
							<!--                        <Checkbox v-model="agreement"></Checkbox>-->
							<div class = "all-chosed">
								<i
									class = "iconfont iconicon-select"
									v-show = "agreement"
								></i>
							</div>
							<span>
								我已满
								<span>18周岁</span>, 并同意
								<a
									@click = "goHelp"
								>《用户协议》
								</a
								>&<a @click = "goPriva">《隐私条款》</a>
							</span
							>
						</div>
						<p class = "forgetPassword">
							<span @click = "forget">忘记密码?</span>
						</p>
					</div>
					<div>
						<div
							class = "default-btn login-btn"
							v-if = "!loding"
							@click = "login"
						>
							<span>登录</span>
						</div>
						<div
							class = "default-btn login-btn"
							v-else
						>
							<span class = "loading-css"></span>
						</div>
					</div>
				</Form>
				<Form
					v-else
					ref = "registerForm"
					class = "form-box register-form-box"
					:rules = "rules"
					:model = "formData"
				>
					<FormItem
						label = ""
						prop = "phone"
					>
						<Input
							v-model.trim = "formData.phone"
							@on-keyup = "formData.phone = formData.phone.replace(/[, ]/g, '')"
							size = "large"
							placeholder = "请输入您的手机号"
						/>
					</FormItem>
					<FormItem
						label = ""
						prop = "password"
					>
						<Input
							v-model.trim = "formData.password"
							size = "large"
							type = "password"
							password
							@on-keyup = "
                formData.password = formData.password.replace(/[, ]/g, '')
              "
							placeholder = "密码必须由8-16位字母与数字组合"
						/>
					</FormItem>
					<FormItem
						label = ""
						prop = "emailCode"
						class = "mailboxItem"
					>
						<div style = "display: flex; justify-content: space-between">
							<div style = "width: 60%">
								<Input
									v-model = "formData.phoneCode"
									size = "large"
									placeholder = "请输入手机验证码"
								/>
							</div>
							<div
								style = "width: 35%"
								@click = "getCode"
							>
								<div class = "default-btn send-code-btn">
									{{
										codeBtnTxt
									}}{{ codeBtnTxt !== "发送验证码" ? "秒后重试" : "" }}
								</div>
							</div>
						</div>
					</FormItem>
					<FormItem
						label = ""
						prop = "spreadCode"
						style = "margin: 0 auto 0.3rem"
					>
						<Input
							v-model.trim = "formData.spreadCode"
							size = "large"
							placeholder = "请输入推广码（选填）"
						/>
					</FormItem>
					<div class = "protocol">
						<template>
							<div
								class = "all-chosed"
								@click = "single = !single"
							>
								<i
									class = "iconfont iconicon-select"
									v-show = "single"
								></i>
							</div>
							<span
								@click = "single = !single"
							>我已阅读并接受
								<a @click = "goHelp">《97hash服务协议》</a>
							</span
							>
						</template>
					</div>
					<p class = "protocol">
						<span
							style = "opacity: 0.5"
						>本网站适合年满十八周岁及以上的用户使用，适度娱乐
						</span>
					</p>
					<div>
						<div
							@click = "manner"
							class = "default-btn login-btn"
						>
							<span v-if = "!loding">注册</span>
							<span
								v-else
								class = "loading-css"
							></span>
						</div>
					</div>
					<!--          <a class="canTLogInToSteam" @click="goHelpSteam">无法登录Steam ?</a>-->
				</Form>
				<!--        <div class="uu-login" v-show="mode === 0">-->
				<!--          其他登录方式-->
				<!--        </div>-->
				<!--        <div class="n-login-tail" :class="{'steam-login': mode === 0}" v-show="mode===0">-->
				<!--          <p class="login-select">-->
				<!--                <span class="st-login">-->
				<!--                    <span>Steam</span>-->
				<!--                </span>-->
				<!--          </p>-->
				<!--          <i class="iconfont iconicon-steam" @click="steamLogin(mode)"></i>-->
				<!--          <p class="other-login">{{ mode == 1 ? '其他登录方式' : '使用网易UU加速器登录' }}</p>-->
				<!--        </div>-->
			</div>
		</div>
	</div>
</template>
<script>
import store from "./../../store/index";
import CryptoJS from "crypto-js";
import { getDAesString } from "../../utils/utils";
import {
	postAction ,
	getAction,
} from "../../api/manage";
import { mapState } from "vuex";
import newUser from "../Newuser/newUser";

export default {
	components : {} ,
	store : store ,
	props : {
		show : Boolean ,
		context : Object ,
		isRegister : {
			type : Boolean ,
			default : false ,
		} ,
		notEmail : {
			type : Boolean ,
			default : false ,
		} ,
	} ,
	data () {
		const validEmail = (rule , value , callback) => {
			if ( value === "" ) {
				callback(new Error("请输入手机号"));
			} else {
				// /^[1][3,4,5,6,7,8,9][0-9]{9}$/
				// let reg = /^1([3458][0-9]{9}|(7[2-9]{1})[0-9]{8})/;
				let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if ( !reg.test(value) ) {
					callback(new Error("手机号格式不正确! "));
				} else {
					callback();
				}
			}
		};
		const validPwd = (rule , value , callback) => {
			if ( value === "" ) {
				callback(new Error("密码必须由8-16位字母与数字组合! "));
			} else {
				let reg = /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,20}$/;
				if ( !reg.test(value) ) {
					callback(new Error("密码必须由8-16位字母与数字组合! "));
				} else {
					callback();
				}
			}
		};
		const validCode = (rule , value , callback) => {
			if ( value === "" ) {
				callback(new Error("! 验证不能为空"));
			} else {
				callback();
			}
		};
		return {
			getDAesString ,
			single : false ,
			entertainment : false ,
			agreement : false ,
			mode : 0 ,
			protocol : true ,
			loding : false ,
			formData : {
				phone : "" ,
				password : "" ,
				phoneCode : "" ,
				spreadCode : "" ,
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
				emailCode : [
					{
						validator : validCode ,
						trigger : "blur",
					},
				] ,
			} ,
			loginFormData : {
				phone : "13212312973" ,
				password : "a1234567" ,
			} ,
			codeBtnTxt : "发送验证码" ,
			time : null ,
			codeLoading : false ,
			loginLoading : false ,
			registerLoading : false ,
		};
	} ,
	watch : {
		show : function (newValue) {
			if ( newValue && this.context && window.location.href.split("=")[1] ) {
				this.mode = 1;
				this.formData.spreadCode = decodeURI(this.getParam("spread" , window.location.href)).replace(/\s*/g , "");
				localStorage.setItem("neeko_spreadCode" , this.formData.spreadCode);
			} else if ( this.notEmail ) {
				this.mode = 1;
				this.formData.spreadCode = this.getDAesString(CryptoJS , decodeURI(this.getParam("share" , window.location.href)));
			} else {
				this.formData.spreadCode = localStorage.getItem("neeko_spreadCode") || "";
			}
			if ( newValue && this.isRegister ) this.mode = 1;
		} ,
		codeBtnTxt : function (newValue) {
			if ( newValue === 0 ) {
				clearInterval(this.time);
				this.time = null;
				this.codeBtnTxt = "发送验证码";
			} else if ( newValue === 60 ) {
				this.codeBtnTxt = 60;
				this.time = setInterval(() => this.codeBtnTxt -- , 1000);
			}
		} ,
		mode : function (newValue , oldValue) {
			if ( oldValue === 0 ) {
				this.$refs["loginForm"].resetFields();
			} else {
				this.$refs["registerForm"].resetFields();
			}
		} ,
	} ,
	computed : {
		...mapState("account" , {
			user : (state) => state.user ,
		}) ,
	} ,
	methods : {
		getParam (name , url) {
			if ( typeof name !== "string" ) return false;
			if ( !url ) url = window.location.href;
			name = name.replace(/[\[\]]/g , "\\$&");
			let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
			let results = regex.exec(url);
			if ( !results ) return null;
			if ( !results[2] ) return "";
			return decodeURIComponent(results[2].replace(/\+''/g , ""));
		} ,
		closeForm () {
			if ( this.mode === 0 ) {
				this.$refs["loginForm"].resetFields();
			} else {
				this.$refs["registerForm"].resetFields();
			}
			this.formData.spreadCode = localStorage.getItem("neeko_spreadCode") || "";
			this.show = false;
		} ,
		getCode () {
			if ( this.codeBtnTxt.indexOf("秒") === 1 ) {
				return;
			}
			this.$refs.registerForm.validateField("phone" , (valid) => {
				if ( !valid ) {
					this.codeLoading = true;
					const captcha = new window.TencentCaptcha("2049235196" , (check) => {
						if ( check.ret === 2 ) {
							this.$Message.error("用户主动关闭人机验证");
							this.codeLoading = false;
						} else if ( check.ret === 0 ) {
							this.$Spin.show();
							this.$axios.post("/api/personal/center/send/0/code" , {
								phone : this.formData.phone ,
								randStr : check.randstr ,
								ticket : check.ticket ,
							}).then((res) => {
								this.$Message.success("验证码已发送");
								this.codeLoading = false;
								this.codeBtnTxt = 60;
								this.$Spin.hide();
							}).catch((error) => {
								this.$Message.error(error.response.data.errMsg);
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
		register () {
			this.$refs["registerForm"].validate((valid) => {
				if ( valid ) {
					if ( !this.single ) {
						this.$Message.error("必须勾选已阅读并接受服务协议");
						return;
					}
					let time;
					this.registerLoading = true;
					this.loding = true;
					const form = JSON.parse(JSON.stringify(this.formData));
					if ( form.spreadCode === "" ) delete form.spreadCode;
					time = postAction("/api/user/register" , form).then((res) => {
						localStorage.removeItem("neeko_spreadCode");
						localStorage.setItem("token" , res.data.token);
						this.$store.commit("account/setToken" , res.data.token);
						this.$Message.success("恭喜你，注册成功");
						localStorage.setItem("register" , 0);
						this.getUserInfo();
						this.show = false;
						this.loding = false;
						this.registerLoading = false;
						clearTimeout(time);
					}).catch((error) => {
						clearTimeout(time);
						this.$Message.error(error.response.data.errMsg);
						this.loding = false;
						this.registerLoading = false;
					});
				}
			});
		} ,
		async login () {
			if ( !this.agreement || !this.entertainment ) return this.$Message.error("请仔细阅读并勾选用户协议及其条款");
			this.$refs["loginForm"].validate((valid) => {
				if ( valid ) {
					this.loding = true;
					new Promise((resolve) => {
						postAction("/api/user/login" , this.loginFormData).then((res) => {
							localStorage.setItem("token" , res.data.token);
							this.$store.commit("account/setToken" , res.data.token);
							this.show = false;
							this.loding = false;
							resolve(res.data);
						}).catch((error) => {
							this.loding = false;
							this.$Message.error(error.response.data.errMsg);
						});
					}).then((res) => {
						this.getUserInfo();
					});
				}
			});
		} ,
		getUserInfo () {
			getAction("/api/user/info").then((res) => {
				// if (this.isRegister) this.$wealfare(true, true, res.data.status)
				this.isRegister = false;
				this.$store.commit("account/setUser" , Object.assign({} , this.$store.state.account.user , res.data));
				setTimeout(() => {
					localStorage.removeItem("userinfo");
					localStorage.setItem("userinfo" , JSON.stringify(res.data));
				} , 100);
				setTimeout(() => {
					if ( res.data.createTime && res.data.status < 5 ) {
						this.$wealfare(true , !!res.data.createTime);
					}
				} , 200);
			}).catch((e) => {
				this.$store.commit("account/clearUser");
			});
		} ,
		steamLogin (mode) {
			if ( !this.single && mode === 1 ) {
				this.$Message.error("必须勾选已阅读并接受服务协议");
				return;
			}
			localStorage.setItem("steamType" , "0"); //0登录，1绑定
			if ( /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ) {
				// window.location.href = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.return_to=${window.location.origin}&openid.mode=checkid_setup`
				window.location.href = `https://steambrige.site/out/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.return_to=${ window.location.origin }&openid.mode=checkid_setup`;
			} else {
				window.open("/login.html" , "_blank" , "height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
			}
			this.show = false;
		} ,
		forget () {
			this.show = false;
			this.$reset(this.user.phone , "修改密码");
		} ,
		goHelp () {
			this.show = false;
			this.router.push("/page/helpcenter/Termsofuse");
		} ,
		goPriva () {
			this.show = false;
			this.router.push("/page/helpcenter/Privacypolicy");
		} ,
		goHelpSteam () {
			this.show = false;
			this.router.push("/page/helpcenter/steam");
		} ,
		manner () {
			this.register();
		} ,
	} ,
};
</script>

<style
	lang = "less"
	scoped
>
/deep/ .ivu-input::-webkit-input-placeholder {
	opacity: 1;
}

.hash-module {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	top: 0;
	left: 0;
	z-index: 99999;
	display: flex;
	justify-content: center;
	align-items: center;
	visibility: hidden;
	opacity: 0;
	overflow-y: auto;
	transition: all 0.3s ease-in-out 0.2s;
}

.hash-module.show {
	opacity: 1;
	visibility: visible;
	z-index: 99999;
}

.hash-module.show .modal-box-bg {
	transform: scale(1);
}

.hash-box {
	box-shadow: 0 1px 50px 0 rgba(0, 0, 0, 0.9);
	border-radius: 10px;
	background: url("../../assets/image/loginbg.png") no-repeat top left / 100%;
	width: 850px;
	height: 584px;
	aspect-ratio: 1.45;
	font-size: 0.22rem;
	color: #ffffff;
	margin: 0 auto;
	position: relative;
	
	> i {
		position: absolute;
		top: 15px;
		right: 30px;
		color: #ffffff;
		opacity: 0.5;
		font-size: 18px;
		cursor: pointer;
		transition: all 0.3s linear;
		
		&:hover {
			transform: rotate(360deg);
		}
	}
}

.hash-content {
	width: 47%;
	padding: 65px 60px 0 0;
	max-height: 8rem;
	margin-left: auto;
}

.ivu-form-item {
	margin: 0 auto 23px;
}

.form-box {
	margin: 0.1rem 0;
}

@media screen and (max-width: 800px) {
	.hash-box {
		width: 94%;
		background: url("../../assets/image/loginbgt.png") no-repeat top left / 100%,
		url("../../assets/image/loginbgb.png") #0a081e no-repeat bottom left /
        100%;
		box-shadow: 0px 1px 32px 0px rgba(0, 0, 0, 0.9);
		border-radius: 6px;
		height: 600px;
	}
	
	.hash-content {
		width: 90%;
		padding: 70px 5px 50px 5px;
		margin: auto;
	}
	
	.ivu-form-item {
		margin: 0 auto 10px;
	}
}

/deep/ .ivu-input {
	background: rgba(20, 23, 39, 0) !important;
	border: 1px solid #ffffff !important;
}
</style>
