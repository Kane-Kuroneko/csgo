<template>
	<div class = "account">
		<div
			class = "user-info"
			:class = "{ 'user-info-m': $store.state.account.isPhone }"
		>
			<div class = "avator-box-shadow portait-box">
				<SkinsAvatar
					wd = "2.45rem"
					ht = "2.45rem"
					:img = "user.avatar"
					:head-frame = "user.headPortraitBox"
				></SkinsAvatar>
				<!--        <input style="opacity: 0" type="file" id="avaInput" @change="changeAvator">-->
				<!--        <div id="canvas" ref="mycanvas" class="avator-box ">-->
				<!--          <div class="modify-picture">-->
				<!--            <p><i class="iconfont iconicon-head"></i></p>-->
				<!--            <p>修改头像</p>-->
				<!--          </div>-->
				<!--        </div>-->
			</div>
			<div
				@click = "portaitBox = true"
				v-if = "portaitImg.length > 0"
				style = "width: 129px; margin: 10px auto 30px"
				class = "default-btn tradeurl-btn"
			>
				头像框设置
			</div>
			<div class = "user-info-change">
				<button
					v-if="$initialStore.env === 'development'"
					@click="_dev_fetch_clear_user_"
				>注销测试账户</button>
				<div class = "info-item">
					<span>用户名：</span>
					<Input
						v-model.trim = "userLocal.name"
						:maxlength = "20"
						:disabled = "!disable.uesrname"
						size = "large"
						style = "flex: 1"
					/>
					<div
						v-show = "disable.uesrname"
						@click = "cancelName"
						class = "default-btn user-btn"
					>取消
					</div>
					<div
						@click = "changeUserName(disable.uesrname)"
						class = "default-btn user-btn"
					>
						{{ disable.uesrname ? "保存" : "修改" }}
					</div>
				</div>
				<div class = "info-item">
					<span>登录密码：</span>
					<Input
						:value = "user.hasPassword === 0 ? '您已设置密码' : '您还未设置密码'"
						:disabled = "true"
						size = "large"
						style = "flex: 1"
					/>
					<div
						class = "default-btn user-btn"
						@click = "changePwdFunc"
					>修改
					</div>
				</div>
				<div class = "info-item">
					<span>手机号绑定：</span>
					<Input
						v-model = "user.phone"
						size = "large"
						:disabled = "true"
						style = "flex: 1"
					/>
					<div
						class = "default-btn user-btn"
						@click = "bindEmail(false)"
						v-show = "!user.phone"
					>绑定
					</div>
					<div
						class = "default-btn user-btn"
						style = "opacity: 0"
						@click = "nuBindEmail"
						v-show = "user.phone"
					>换绑
					</div>
				</div>
				<div class = "info-item">
					<span>实名认证：</span>
					<Input
						:value = "user.isRealName === 0 ? '未实名认证' : '已实名认证'"
						:disabled = "true"
						size = "large"
						style = "flex: 1"
					/>
					<div
						class = "default-btn user-btn"
						@click = "nameReal"
						v-if = "user.isRealName === 0"
					>实名
					</div>
					<div
						class = "default-btn user-btn"
						@click = "checkId"
						v-else
					>查看
					</div>
					<p class = "set-seed important-tips">
						<a
							href = "https://opendocs.alipay.com/open/02qp09?pathHash=ae6ae451&ref=api"
							target = "_blank"
						>点击此处了解实名说明 >
						</a
						>
					</p>
				</div>
				<div class = "info-item">
					<span>用户种子：</span>
					<Input
						v-model = "userSeed"
						size = "large"
						style = "flex: 1"
					/>
					<div
						class = "default-btn user-btn"
						@click = "randomSeed"
					>随机
					</div>
					<div
						class = "default-btn user-btn"
						@click = "changeSeed"
					>修改
					</div>
					<p
						class = "set-seed important-tips"
						@click = "$router.push('/page/instrutions')"
					>点击此处了解种子设置 >
					</p>
				</div>
				<!--        <div class="info-item ">-->
				<!--          <span :class="{'bind-tips': !user.steamId}"><span class="point">*</span>绑定Steam：</span>-->
				<!--          <Input v-model="user.steamId" size="large" :disabled="true" style="flex: 1;"-->
				<!--                 placeholder="请绑定Steam"/>-->
				<!--          <div @click="bindSteam" class="default-btn user-btn" v-show="!user.steamId">绑定</div>-->
				<!--          <div @click="unbindSteam" class="default-btn user-btn" v-show="user.steamId">解绑</div>-->
				<!--        </div>-->
				<div class = "info-item-tradeUrl">
					<div style = "display: flex; align-items: center">
						<span :class = "{ 'bind-tips': !user.tradeUrl }">
							<span class = "point">*</span>
							交易链接：
						</span>
						<Input
							size = "large"
							placeholder = "请设置Steam交易链接，设置后您才能进行饰品存取"
							v-model = "user.tradeUrl"
							style = "width: 4rem; flex: 1"
						/>
						<div
							class = "default-btn user-btn"
							@click = "changeNameAndLink('tradeUrl')"
						>保存
						</div>
					</div>
					<div>
						<div
							@click = "getTradeUrl"
							class = "default-btn tradeurl-btn"
						>
							{{ $store.state.account.isPhone ? "获取交易链接" : "获取您的交易链接" }}
						</div>
						<p>无法获取？
							<span
								class = "important-tips"
								@click = "goHelp"
							>点我获取帮助 >
							</span>
						</p>
					</div>
				</div>
			</div>
			<div
				@click = "loginOut"
				class = "login-out-btn"
			>
				<i class = "iconfont icon-icon-signout"></i>
				退出登录
			</div>
		</div>
		
		<Modal
			v-model = "emailBoxShow"
			title = "解绑Steam"
			:styles = "{ top: '220px' }"
			width = "32rem"
			footer-hide
		>
			<div style = "padding: 0.2rem 0.2rem">
				<p
					class = "unbind-steam-tips"
					style = ""
				>{{ "验证码已发送至您的手机" + user.phone }}
				</p>
				<p class = "unbind-steam-tip">*24h内允许解绑一次</p>
				<div>
					<Input
						v-model.trim = "emailCode"
						size = "large"
						placeholder = "请输入验证码以确认解绑"
					/>
					<div
						@click = "unbind"
						class = "default-btn"
						style = "margin-top: 0.3rem"
					>解绑
					</div>
				</div>
			</div>
		</Modal>
		<HashModule
			v-model = "portaitBox"
			:width = "8"
			title = "头像框设置"
		>
			<div class = "portait">
				<div class = "portait-lf">
					<div>
						<SkinsAvatar
							wd = "2.4rem"
							ht = "2.4rem"
							:img = "user.avatar"
							class = "abs-center"
							:head-frame = "chosePort"
						>
						</SkinsAvatar>
					</div>
					<div
						class = "portait-rt"
						align = "center"
					>
						<div
							:class = "{ active: chosePort === el.portraitBox }"
							@click = "chosePort = chosePort === el.portraitBox ? '' : el.portraitBox"
							v-for = "el in portaitImg"
							:key = "el.createTime"
						>
							<img
								:src = "imgHost(el.portraitBox)"
								alt = ""
							/>
						</div>
					</div>
					<div
						@click = "changePortait"
						class = "default-btn portait-btn"
					>确认
					</div>
				</div>
			</div>
		</HashModule>
	</div>
</template>

<script>
import { getAction , postAction , putAction } from "../api/manage";
import { mapState , mapActions , mapMutations } from "vuex";
import awsUpload from "../utils/upload";
import Uint64 from "@/utils/Uint64";
import HashModule from "@/components/HashModule/HashModule";
import { reaxel_user } from '@/reaxels/user';

const { _dev_fetch_clear_user_ } = reaxel_user();
export default reaxper({
	name : "account" ,
	components : { HashModule } ,
	data () {
		return {
			show : false ,
			emailCode : "" ,
			userSeed : "" ,
			emailBoxShow : false ,
			portaitBox : false ,
			chosePort : null ,
			portaitImg : [] ,
			userLocal : JSON.parse(localStorage.getItem("user")) ,
			disable : {
				uesrname : false ,
			} ,
			context : [] ,
			url : {
				info : "/api/user/info" ,
				avator : "/api/personal/center/upload/avator" ,
				portAit : "/api/activity/head/portrait/box" ,
				change : "/api/activity/choose/portrait/box" ,
				id : "/api/user/card/info" ,
			} ,
		};
	} ,
	created () {
		this.userLocal = Object.assign({} , this.user);
		this.getUser();
		this.avatarCircle();
		this.userSeed = localStorage.getItem("userSeed");
		this.chosePort = this.user.headPortraitBox ? this.user.headPortraitBox : "";
	} ,
	computed : {
		...mapState("account" , {
			user : state => state.user ,
		}) ,
	} ,
	methods : {
		_dev_fetch_clear_user_,
		...mapActions("account" , ["getUser"]) , ...mapMutations("account" , ["clearUser"]) ,
		avatarCircle () {
			getAction(this.url.portAit).then(res => {
				this.portaitImg = res.data;
			});
		} ,
		nameReal () {
			if ( this.user.isRealName !== 0 ) return;
			this.$nameAuth(1);
		} ,
		checkId () {
			getAction(this.url.id).then(res => {
				this.$nameAuth(1 , res.data);
			});
		} ,
		changePortait () {
			let parmas = { img : this.chosePort };
			getAction(this.url.change , parmas).then(res => {
				this.getUser();
				this.portaitBox = false;
				this.$Message.success("修改成功");
			});
		} ,
		changeUserInfo () {
			let params = this.user;
			this.user.name = this.userLocal.name;
			putAction(this.url.info , params).then(res => {
				this.getUser();
				this.$Message.success("修改成功");
			}).catch(e => {
				this.$Message.error(e.response.data.errMsg);
			});
		} ,
		cancelName () {
			this.disable.uesrname = !this.disable.uesrname;
			this.userLocal["name"] = this.user["name"];
		} ,
		changeUserName (type) {
			if ( !type ) {
				this.disable.uesrname = true;
				return;
			}
			this.changeNameAndLink("name");
			this.disable.uesrname = false;
		} ,
		changeNameAndLink (flag) {
			//原地修改昵称和链接
			if ( (this.user[flag] === this.userLocal[flag] || this.user[flag] === "") && flag !== "tradeUrl" ) {
				this.$Message.info("请输入修改信息");
				return false;
			}
			if ( flag === "name" ) {
				// 原地修改用户名
				if ( this.userLocal.name.length > 12 || this.userLocal.name.trim().length === 0 ) {
					this.$Message.info("请输入至多12位字符(无空格)的用户名");
					return false;
				}
			}
			// if (flag === 'tradeUrl') {    //原地修改链接验证
			//   if (!this.user.steamId) {
			//     this.$Message.info('请先绑定Steam');
			//     return false;
			//   }
			//   let num = new Uint64(`${this.user.steamId}`, 10);
			//   let flag = (num.toNumber() & 0xFFFFFFFF) >>> 0;
			//   let partner = this.getQueryString('partner', this.user.tradeUrl);
			//   if (String(partner) !== String(flag)) {
			//     this.$Message.info('交易链接与您的steamID不匹配');
			//     return false;
			//   }
			// }
			this.changeUserInfo();
		} ,
		getQueryString (name , str) {
			let arr = str.split("?");
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)" , "i");
			var r = ("?" + arr[1]).substr(1).match(reg);
			if ( r != null ) return unescape(r[2]);
			return null;
		} ,
		async changeAvator (e) {
			let files = (e.target.files || e.dataTransfer.files)[0];
			// 仅限图片
			if ( files.type.indexOf("image") === - 1 ) {
				this.$Message.error("仅限图片格式");
				return false;
			}
			// 超出大小
			if ( files.size / 1024 > 500 ) {
				this.$Message.error("图片大小不能超过500kb");
				return false;
			}
			let imgName = awsUpload.createImgName(files , process.env.VUE_APP_BASE_UPLOAD_PRE + "avatar");
			let imgUrl = "/" + imgName;
			let token = await this.getQnToken();
			let fmData = new FormData();
			fmData.append("file" , files);
			fmData.append("token" , token);
			fmData.append("key" , imgName);
			let res = await awsUpload.uploadQnFunc(fmData , this);
			if ( res ) {
				this.user.avatar = imgUrl;
				this.changeInfoFunc();
				// this.user.avatar = imgUrl;
			}
		} ,
		getQnToken () {
			//获取七牛token
			return new Promise((resolve , reject) => {
				getAction("/api/personal/center/upload/avatar").then(res => {
					resolve(res.data);
				});
			});
		} ,
		changeInfoFunc () {
			putAction("/api/user/info" , this.user).then(res => {
				this.getUser();
				this.$Message.success("修改成功");
			}).catch(err => {
				this.$Message.error(err.response.data.errMsg);
			});
		} ,
		bindSteam () {
			localStorage.setItem("steamType" , "1"); //0登录，1绑定
			// 移动端当前页面打开steam绑定
			if ( /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ) {
				// window.location.href = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.return_to=${window.location.origin}&openid.mode=checkid_setup`
				window.location.href = `https://steambrige.site/out/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.return_to=${ window.location.origin }&openid.mode=checkid_setup`;
			} else {
				window.open("/login.html" , "_blank" , "height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no" );
			}
		} ,
		unbindSteam () {
			if ( !this.user.phone || this.user.hasPassword !== 0 ) {
				this.$Message.warning("无法解除steam绑定，因为你未绑定手机号和密码");
				return false;
			}
			if ( localStorage.getItem("lang") === "ZH" ) {
				const captcha = new window.TencentCaptcha("2049235196" , check => {
					if ( check.ret !== 0 ) {
						return false;
					}
					const data = {
						ticket : check.ticket ,
						randStr : check.randstr ,
						phone : this.user.phone ,
					};
					this.getEmailCode(data);
					captcha.destroy();
				});
				captcha.show();
			} else {
				const data = {
					recaptchaToken : window.recaptchaToken ,
				};
				this.getEmailCode(data);
				this.getRefreshToken();
			}
		} ,
		unbind () {
			if ( !this.emailCode ) return;
			postAction(`/api/personal/center/unbundling/steam` , {
				code : this.emailCode ,
				phone : this.user.phone ,
			}).then(res => {
				this.$Message.success({
					content : "解绑成功" ,
					duration : 3,
				});
				this.getUser();
				this.emailBoxShow = false;
				this.user.steamId = "";
				this.user.tradeUrl = "";
				localStorage.setItem("user" , JSON.stringify(this.user));
			}).catch(err => {
				this.$Message.error(err.response.data.errMsg);
			});
		} ,
		getEmailCode (formData) {
			postAction("/api/personal/center/send/4/code" , formData).then(res => {
				this.emailCode = "";
				this.emailBoxShow = true;
				this.$Message.success({
					content : "验证码已发送，请注意查收" ,
					duration : 3,
				});
			}).catch(err => {
				this.$Message.error(err.response.data.errMsg);
			});
		} ,
		getTradeUrl () {
			// if (!this.user.steamId) return this.$Message.info('未绑定Steam')
			window.open(`https://steamcommunity.com/profiles/76561198104209534/tradeoffers/privacy#trade_offer_access_url` );
		} ,
		loginOut () {
			postAction("/api/user/logout").then(() => {
				this.$store.commit("account/clearUser");
				localStorage.setItem("token" , "");
				localStorage.removeItem("userinfo");
				this.$wealfare(false , false);
				this.$router.push("/");
			});
		} ,
		bindEmail (isAnswerChang) {
			this.$email("bind" , isAnswerChang);
		} ,
		nuBindEmail () {
			return;
		} ,
		changePwdFunc () {
			//修改密码
			if ( !this.user.phone ) {
				this.$Message.warning("需要先绑定手机号，后修改密码");
				this.bindEmail(true);
			} else {
				this.$reset(this.user.phone , "修改密码");
			}
		} ,
		goHelp () {
			this.$router.push("/page/helpcenter/steam");
		} ,
	} ,
});
</script>

<style scoped>
/deep/ .ivu-input[disabled] {
	background: rgba(191, 197, 201, 0.1);
}

/deep/ .ivu-input {
	border: none;
	box-shadow: none;
	color: #636363;
}

/deep/ .ivu-input:focus {
	color: #fffffe;
}
</style>
