<template>
	<div
		id = "app"
		class = "container"
		@click = "closeKfFunc"
	>
		<NewWapHeader v-if = "isPhone"></NewWapHeader>
		<NewHeader v-if="!isPhone"></NewHeader>
		
		<HeaderDropPreciousSwiper></HeaderDropPreciousSwiper>
		<div
			class = "content-router"
			:style = "{ overflow: isPhone ? 'hidden' : 'unset' }"
		>
			<router-view class = "main-back" ></router-view>
		</div>
		
		<NewWapFooter v-if = "isPhone" ></NewWapFooter>
		<NewFooter v-else ></NewFooter>
		<!--		<Footer class = "hide-rrweb"></Footer>-->
		<!-- 公告-->
		<!-- <aside
			class = "fix-module hide-rrweb hide-p hide-ipad"
			@click = "viewMore = !viewMore"
			v-show = "viewMore"
		>
			<img
				src = "./assets/image/more.png"
				alt = ""
			>
		</aside> -->
		
		<Notice
			ref = "announce"
			class = "hide-rrweb"
		></Notice>
		<audio
			preload = "auto"
			src = "./assets/audio/goBoxAudio.aac"
			class = "hide-rrweb"
			id = "goBoxAudio"
		></audio>
		<InviteModal class = "hide-rrweb"></InviteModal>
		<RedPack class = "hide-rrweb"></RedPack>
		<EchartLine
			class = "hide-rrweb"
			ref = "EchartLine"
		></EchartLine>
		<LoginModal></LoginModal>
		<img v-if="isNew" class="xinrenHD" @click="openNewPlaer" style="cursor: pointer;" :src="isPhone?imGxinrenlibao_Wap:imGxinrenlibao" alt="">

	</div>
</template>

<script>
// @ts-nocheck

import Test from "@/views/New.Header/Test.vue";
import NewFooter from "./views/New.Footer";
import Header from "./views/Header";
import NewHeader from "./views/New.Header/index.vue";
import Footer from "./views/Footer";
import Notice from "./components/New.Notice";
import InviteModal from "@/components/Battle/InviteModal";
import EchartLine from "./components/NewYear/Module/EchartLine";
import RedPack from "./components/YearFestival/RedPack";
import { mapActions , mapMutations , mapState } from "vuex";
import { postAction } from "./api/manage";
import { countDown } from "./utils/utils";
import { createSocket } from "./utils/websocket";
import MainBlock from "@/views/New.MainBlock/index.vue";
import LoginModal from "@/views/New.Login.Modal";
import HeaderDropPreciousSwiper from "@/views/New.Header/Header-DropPrecious-Swiper.vue";
import { reaxel_user } from "@/reaxels/user";
import { reaxel_initial } from "@/reaxels/initial";
import NewWapHeader from "./views/New.Wap.Header";
import NewWapFooter from "./views/New.Wap.Footer";

import imGxinrenlibao from '@/views/New.MainBlock/Home.PC/xinrenlibao.png';
import imGxinrenlibao_Wap from '@/views/New.MainBlock/Home.Wap/xinrenlibao.png';
const queryString = require("query-string");
const reax_user = reaxel_user();
const reax_Initial = reaxel_initial();

export default reaxper({
	status () {
		const { initialStore } = reax_Initial , { isPhone } = initialStore;
		return {
			reax_Initial ,
			initialStore ,
			isPhone ,
			imGxinrenlibao,
			imGxinrenlibao_Wap
		};
	} ,
	components : {
		Test,
		LoginModal ,
		NewWapFooter ,
		NewWapHeader ,
		NewHeader ,
		MainBlock ,
		Footer ,
		Notice ,
		InviteModal ,
		EchartLine ,
		RedPack ,
		HeaderDropPreciousSwiper ,
		NewFooter ,
	} ,
	provide () {
		return {
			reload : this.reload ,
			showNotice:this.showNotice,
			showWealfare:this.showWealfare,
		};
	} ,
	data () {
		return {
			type : "home" ,
			isActivePage : false ,
			openMedia : false ,
			wealfareTime : "" ,
			webSocket : "" ,
			timeCounter : null ,
			isTime : true , // 新人倒计时是否可见
			isNew : false , // 是否为新人
			isNewNotice : false ,
			mediaData : [
				{
					name : "官方Q群(850966321)" ,
					isOpen : true ,
					img : require("./assets/image/qqcode.png") ,
				} ,
			] ,
			timer : null ,
			isRouterAlive : true ,
			viewMore : true ,
			vw : document.body.clientWidth ,
			discount : {} ,
		};
	} ,
	watch : {
		"$route" () {
			//steam login
			if ( queryString.parse(window.location.search)["openid.op_endpoint"] === "https://steamcommunity.com/openid/login" ) {
				const query = queryString.parse(window.location.search);
				this.loginSteam(query);
			}
			this.isActivePage = this.$route.meta.isActive;
			if ( window.location.href.split("?")[1] && window.location.href.split("?")[1].indexOf("spread") > - 1 ) {
				this.$login(this); // 推广码
			}
		} ,
		"$store.state.account.userDiscount" (nv) {
			this.discount = nv.trend ? nv.trend : { endTime : "" };
			for ( let i = 0 ; i < Object.values(nv).length ; i ++ ) {
				this.timeCounter = setInterval(() => {
					if ( countDown(Object.values(nv)[i].endTime) === "00 : 00 : 00" ) {
						setTimeout(() => {
							this.getDiscount();
						} , 1000);
						clearInterval(this.timeCounter);
					}
				} , 1000);
			}
		} ,
		"user" (nv) {
			if ( nv.id ) {
				createSocket(process.env.VUE_APP_LINK_WS + `/wss/drop/${ this.userId }` , "drop");
			}
			
			// 未登录
			if ( JSON.stringify(nv) === "{}" ) {
				this.isTime = true;
				this.isNew = false;
				this.$store.commit("account/setDiscount" , {});
				clearInterval(this.timeCounter);
				clearInterval(this.timer);
			}
			// 新人任务未完成
			if ( JSON.stringify(nv) !== "{}" && nv.status < 4 ) {
				this.isNew = true;
				this.wealfareCount();
			}
			// 新人任务完成 弹指南
			if ( JSON.stringify(nv) !== "{}" && nv.status === 4 ) {
				this.isNew = false;
				this.isTime = false;
				postAction("/api/user/update/status" , { status : 4 });
			}
			// 新人任务完成全部不显示
			if ( JSON.stringify(nv) !== "{}" && nv.status === 4 ) {
				this.isNew = false;
				this.isTime = false;
				clearInterval(this.timer);
			}
			// 老人登录
			if ( JSON.stringify(nv) !== "{}" && !nv.createTime ) {
				this.isTime = false;
				this.isNew = false;
				this.$wealfare(false , false);
			}
		} ,
	} ,
	created () {
		
		reax_Initial.requestCompanyInfo()
		this.equipment();
		this.tecent();
		this.getDiscount(); // 用户折扣券
		createSocket(process.env.VUE_APP_LINK_WS + "/wss/wish" , "wish");
		if ( !localStorage.getItem("userSeed") ) {
			this.randomSeed();
		}
		if ( this.userId ) {
			this.wealfareCount();
		}
		if ( + localStorage.getItem("noticeState") !== new Date().getDate() ) {
			this.$store.commit("account/changeState" , 1);
		}
		// 商场页面和个人页面为绑定
		let _this = this;
		window.addEventListener("message" , function (e) {
			if ( e.data.type === "steam" ) {
				const query = queryString.parse(e.data.data);
				_this.loginSteam(query);
			}
		} , false );
		if ( reax_user.userStore.token ) {
			this.getUser();
			reax_user.request_profile();
		} else {
			this.clearUser();
			reax_user.setUserState({ profile : null });
		}
		if ( window.location.href.split("?")[1] && window.location.href.split("?")[1].indexOf("spread") > - 1 ) {
			this.$login(this); //推广码
		}
	} ,
	computed : {
		...mapState("account" , ["token" , "bagNum" , "user"]) ,
		userId () {
			return this.user.id;
		} ,
	} ,
	methods : {
		...mapActions("account" , ["getUser" , "getInfo" , "getDiscount"]) , ...mapMutations("account" , ["clearUser"]) ,
		showLine () {
			this.$refs.EchartLine.show = true;
		} ,
		reload () {
			this.isRouterAlive = false;
			this.$nextTick(() => {
				this.isRouterAlive = true;
			});
		} ,
		guide (url , guide) {
			this.$router.push(url);
			this.$store.commit("account/setVideo" , guide);
		} ,
		showWealfare () {
			this.$wealfare(true , !!this.user.createTime);
		} ,
		loginSteam (query) {
			let type = localStorage.getItem("steamType");
			this.steamFunc(type , query);
			localStorage.removeItem("steamType");
		} ,
		
		wealfareCount () {
			this.timer = setInterval(() => {
				if ( !this.user.createTime ) return;
				this.wealfareTime = countDown(this.user.createTime , true);
				if ( this.wealfareTime == "00 : 00 : 00" || this.wealfareTime.includes("-") ) {
					clearInterval(this.timer);
					return (this.isNew = false);
				}
			} , 1000);
		} ,
		scrollTop () {
			let st = document.getElementById("app");
			st.scrollIntoView();
		} ,
		closeKfFunc () {
			this.openMedia = false;
		} ,
		equipment () {
			this.$store.commit("account/setequipment" , reax_Initial.isPhone);
		} ,
		steamFunc (type , query) {
			let url = type === "0" ? "/api/user/steam/login" : "/api/user/steam/bind";
			postAction(url , query).then(res => {
				if ( type === "0" ) {
					// 触发获取用户信息事件
					if ( !res.data.token ) {
						this.$Spin.hide();
						return this.$bindPhone("bind" , false , res.data.steamId);
					}
					localStorage.setItem("token" , res.data.token);
					this.$store.commit("account/setToken" , res.data.token);
				} else {
					this.$Message.success("绑定成功");
				}
				this.getUser();
			}).catch(err => {
				this.$Message.error(err.response.data.errMsg);
				// window.location.href = window.location.origin
			});
		} ,
		kfClickFunc (e) {
			//客服弹窗自身的点击事件
			e.stopPropagation();
		} ,
		tecent () {
			// 腾讯验证
			if ( typeof window.TencentCaptcha !== "function" ) {
				const URL = "https://ssl.captcha.qq.com/TCaptcha.js";
				const scriptHeat = document.createElement("script");
				scriptHeat.type = "text/javascript";
				scriptHeat.src = URL;
				document.body.appendChild(scriptHeat);
			}
		} ,
		showBag () {
			if ( !reax_user.userStore.token ) {
				//未登录
				// this.$login();
				reax_user.openLoginModal().then(() => {
					this.$bag();
				});
				return false;
			} else {
				this.$bag();
			}
		} ,
		showNotice(){
			this.$refs.announce.isShow = true;
			this.isNewNotice = false;
		},
		openNewPlaer(){
			this.showWealfare();
		}
	} ,
});
</script>

<style>

#app {
	min-width: 1368px;
}
@media screen and (min-width: 767px) {
	
	.xinrenHD{
		position: fixed;
		right: 1%;
		bottom: 5%;
		z-index: 999;
		width: 360px;
	}
}
@media screen and (max-width: 767px) {
	#app {
		min-width: 100%;
	}
	.xinrenHD{
		position: fixed;
		right: 4%;
		bottom: 63%;
		z-index: 999;
		width: 100px;
	}
}

.ivu-page > li {
	background: #242942 !important;
	border: 0 solid #000000 !important;
	opacity: 0.5;
}

.ivu-page-item a {
	color: #ffffff !important;
}

.ivu-page-item:hover {
	opacity: 1;
}

.ivu-page-item-active {
	opacity: 1 !important;
	background: #242942 !important;
	border: 0 solid #000000 !important;
}

.ivu-message-notice-content {
	padding: 0 !important;
	border: 0 solid #030000;
	box-shadow: 0 1px 30px 0 rgba(0, 0, 0, 0.45);
	color: #fffffe;
}

.ivu-message-success {
	background: rgba(1, 168, 44, 0.8) !important;
	/*background: rgba(225,149,35,.8) ;*/
	padding: 8px 16px;
	border-radius: 3px;
	width: 104%;
}

.ivu-message-info {
	background: rgba(225, 149, 35, 0.8) !important;
	padding: 8px 16px;
	border-radius: 3px;
	width: 104%;
}

.ivu-message-error {
	background: rgba(225, 35, 35, 0.8) !important;
	padding: 8px 16px;
	border-radius: 3px;
	width: 104%;
}

.container .ivu-input:focus {
	color: #ffffff;
	border: none;
	box-shadow: none;
}

.ivu-message-notice-content i {
	color: #fffffe !important;
	font-size: 20px !important;
}

</style>
