<template>
	<hash-module
		v-model = "show"
		:title = "title"
		width = "7"
	>
		<div class = "ani-move">
			<div class = "unbindOld">
				<Form
					ref = "emailForm"
					class = "form-box"
					:rules = "rules"
					:model = "formData"
				>
					<FormItem
						label = ""
						prop = "phone"
					>
						<Input
							v-model = "formData.phone"
							size = "large"
							placeholder = "请输入您的手机号"
						/>
					</FormItem>
					<FormItem
						label = ""
						prop = "code"
						class = "mailboxItem"
					>
						<div style = "display: flex">
							<Input
								v-model = "formData.code"
								size = "large"
								placeholder = "请输入手机验证码"
							/>
							<div
								class = "default-btn code-btn"
								@click = "getCode"
							>
								{{ codeBtnTxt }}{{ codeBtnTxt !== "发送验证码" ? "秒后重试" : "" }}
							</div>
						</div>
					</FormItem>
					<FormItem>
						<div
							@click = "nextStep"
							style = "padding: 0"
							class = "default-btn"
						>下一步
						</div>
					</FormItem>
				</Form>
			</div>
			<div class = "bindNew">
				<span @click = "goBack"> < 返回</span>
				<Form
					ref = "bindForm"
					class = "form-box"
					:rules = "rules"
					:model = "formBindData"
				>
					<FormItem
						label = ""
						prop = "phone"
					>
						<Input
							v-model = "formBindData.phone"
							size = "large"
							placeholder = "请输入您的新手机号"
						/>
					</FormItem>
					<FormItem
						label = ""
						prop = "code"
						class = "mailboxItem"
					>
						<div style = "display: flex">
							<Input
								v-model = "formBindData.code"
								size = "large"
								placeholder = "请输入手机验证码"
							/>
							<div
								class = "default-btn code-btn"
								@click = "getCode"
							>
								{{ codeBtnTxt }}{{ codeBtnTxt !== "发送验证码" ? "秒后重试" : "" }}
							</div>
						</div>
					</FormItem>
					<FormItem>
						<div
							@click = "commit"
							style = "padding: 0px 1.2rem"
							class = "default-btn login-btn"
							v-if = "!loading"
						>
							提交修改@@@
						</div>
					</FormItem>
				</Form>
			</div>
		</div>
	</hash-module>
</template>
<script>
import store from "../../store/index";
import { getAction , postAction , putAction } from "../../api/manage";
import HashModule from "../HashModule/HashModule";

export default {
	components : { HashModule } ,
	store : store ,
	props : {
		show : Boolean ,
		type : String ,
		isAnswerChang : {
			type : Boolean ,
			default : false ,
		} ,
		email : String ,
	} ,
	data () {
		const validPhone = (rule , value , callback) => {
			if ( value === "" ) {
				callback(new Error("请输入手机"));
			} else {
				let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if ( !reg.test(this.formData.phone || this.formBindData.phone) ) {
					callback(new Error("手机号格式不正确"));
				} else {
					callback();
				}
			}
		};
		const validCode = (rule , value , callback) => {
			if ( value === "" ) {
				callback(new Error("验证不能为空"));
			} else {
				callback();
			}
		};
		return {
			formData : {
				phone : "" ,
				code : "" ,
			} ,
			formBindData : {
				phone : "" ,
				code : "" ,
			} ,
			rules : {
				phone : [
					{
						validator : validPhone ,
						trigger : "blur" ,
					} ,
				] ,
				code : [
					{
						validator : validCode ,
						trigger : "blur" ,
					} ,
				] ,
			} ,
			codeBtnTxt : "发送验证码" ,
			unbinding : true ,
			time : null ,
			title : "" ,
			codeLoading : false ,
			loading : false ,
			url : {
				bind : "/api/personal/center/bundling/phone" ,
				unbind : "/api/personal/center/unbundling/phone" ,
			} ,
		};
	} ,
	watch : {
		codeBtnTxt : function (newValue , oldValue) {
			if ( newValue === 0 || this.codeBtnTxt === "发送验证码" ) {
				clearInterval(this.time);
				this.time = null;
				this.codeBtnTxt = "发送验证码";
			} else if ( newValue === 60 ) {
				this.codeBtnTxt = 60;
				this.time = setInterval(() => this.codeBtnTxt -- , 1000);
			}
		} ,
		show : function (newValue , oldValue) {
			if ( newValue && this.type === "unbind" ) {
				this.unbinding = true;
				let title = this.type === "bind" ? "绑定手机号" : "解绑旧手机号";
				this.title = title;
			}
		} ,
	} ,
	methods : {
		closeForm () {
			this.$refs.emailForm.resetFields();
			this.show = false;
		} ,
		nextStep () {
			if ( this.formData.code ) return;
			this.$refs.emailForm.validateField("phone" , valid => {
				postAction(this.url.unbind , this.formData).then(res => {
					if ( res.data ) {
						this.unbinding = false;
						this.title = "绑定新手机";
						this.codeBtnTxt = "发送验证码";
						let item = document.getElementsByClassName("unbindOld");
						let item2 = document.getElementsByClassName("bindNew");
						item[0].style = "transform: translateX(-100%);";
						item2[0].style = "transform: translateX(-100%);";
					}
				}).catch(e => {
					this.$Message.error(e.response.data.errMsg);
				});
			});
		} ,
		goBack () {
			this.unbinding = true;
			this.title = "解绑旧手机";
			let item = document.getElementsByClassName("unbindOld");
			let item2 = document.getElementsByClassName("bindNew");
			item[0].style = "transform: translateX(0%);";
			item2[0].style = "transform: translateX(0%);";
		} ,
		getCode () {
			let form = this.unbinding ? this.$refs.emailForm : this.$refs.bindForm;
			form.validateField("phone" , valid => {
				if ( !valid ) {
					this.codeLoading = true;
					const captcha = new window.TencentCaptcha("2049235196" , check => {
						if ( check.ret === 2 ) {
							this.$Message.error("用户主动关闭人机验证");
							this.codeLoading = false;
						} else if ( check.ret === 0 ) {
							this.$Spin.show();
							let params = {
								phone : this.unbinding ? this.formData.phone : this.formBindData.phone ,
								randStr : check.randstr ,
								ticket : check.ticket ,
							};
							postAction(`/api/personal/center/send/${ this.unbinding ? 3 : 2 }/code` , params).then(res => {
								this.$Message.success("验证码已发送");
								this.codeLoading = false;
								this.codeBtnTxt = 60;
								this.$Spin.hide();
							}).catch(error => {
								this.$Spin.hide();
								this.$Message.error(error.response.data.errMsg);
								this.codeLoading = false;
							});
						}
						captcha.destroy();
					});
					captcha.show();
				}
			});
		} ,
		commit () {
			this.$refs.emailForm.validate(valid => {
				if ( valid ) {
					this.$Spin.show();
					this.loading = true;
					putAction(this.url.bind , this.formBindData).then(res => {
						this.$Message.success("操作成功");
						this.closeForm();
						this.$store.dispatch("account/getUser");
						this.$Spin.hide();
						this.loading = false;
						if ( this.isAnswerChang ) {
							this.$reset(this.formData.email);
							this.$Message.info("手机号绑定成功，继续修改密码");
						}
					}).catch(error => {
						this.$Message.error(error.response.data.errMsg);
						this.$Spin.hide();
						this.loading = false;
					});
				}
			});
		} ,
	} ,
};
</script>

<style scoped>
/deep/ .ivu-input[disabled] {
	background: #98a8b4;
	/*cursor: none;*/
}

/deep/ .ivu-input {
	border: none;
	box-shadow: none;
	color: #0a0a0a;
}

/deep/ .ivu-input:focus {
	color: #fffffe;
}

/deep/ .hash-content {
	overflow: hidden;
}

/deep/ .ivu-modal-body {
	overflow: hidden;
}
</style>
