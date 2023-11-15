import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import mixins from "./mixins/mixins";
import axios from "./reqeust/axios"; 
import '../spine';
//bus
import Bus from "./utils/Bus";
import { sendMsg, socketData } from "./utils/websocket";
import echarts from "echarts";

Vue.prototype.$echart = echarts;
Vue.prototype.$sendMsg = sendMsg;
Vue.prototype.$socketData = socketData;
Vue.config.productionTip = false;
Vue.prototype.$bus = Bus;
Vue.prototype.$axios = axios;

import { vueBaberrage } from "vue-baberrage";
import SkinsItem from "@/components/SkinsItem.vue";
import Avatar from "@/components/Avatar/Avatar.vue";
import HashModule from "./components/HashModule/HashModule.vue";

import Viewer from "v-viewer";

Vue.use(Viewer);
Vue.component("SkinsItem", SkinsItem);
Vue.component("SkinsAvatar", Avatar);
Vue.component("HashModule", HashModule);
import VueAwesomeSwiper from "vue-awesome-swiper";

Vue.use(VueAwesomeSwiper);
// css

import "@/assets/css/index.css";
import "@/assets/css/media.css";
import "@/assets/css/mobile.css";
// iview
import "@/utils/iview.js";
import VueLazyload from "vue-lazyload";
import VueClipboard from "vue-clipboard2";
import Login from "./components/Login/Login";
import email from "./components/Email/email";
import reset from "./components/Reset/resetModal";
import Modal from "./components/Modal/modal";
import bag from "./components/Bag/bagModal";
import fairGame from "./components/fairGame/fairGame";
import JoinPwd from "./components/JoinPwd/joinPwd";
import upgradeRecord from "./components/Upgrade/UpgradeRecord/upgradeRecord.js";
import Take from "./components/TakeShow/take";
import Result from "./components/Result/resultModal";
import bindPhone from "./components/bindPhone/bindPhone";
import wealfareUser from "./components/Newuser/newusers.js";
import ExDrop from "@/components/ExDrop/ExDrop.js";
import seriesColor from "echarts/src/visual/seriesColor";
import nameAuths from "./components/nameAuth/name";

import { reaxel_user } from './reaxels/user';
import ReaxelPlugin from './reaxels/initial/Initial-Vue-Plugin';
Vue.use(nameAuths);
Vue.use(vueBaberrage);
Vue.use(bindPhone);
Vue.use(ExDrop);
Vue.use(wealfareUser);
Vue.use(Result);
Vue.use(fairGame);
Vue.use(Take);
Vue.use(JoinPwd);
Vue.use(upgradeRecord);
Vue.use(Login);
Vue.use(bag);
Vue.use(email);
Vue.use(Modal);
Vue.use(reset);
Vue.mixin(mixins);
Vue.use(VueClipboard);
Vue.use(VueLazyload);
Vue.use(ReaxelPlugin);
Viewer.setDefaults({
	inline: true, // 启用 inline 模式
	button: true, // 显示右上角关闭按钮
	navbar: false, // 显示缩略图导航
	title: false, // 显示当前图片的标题
	toolbar: false, // 显示工具栏
	tooltip: false, // 显示缩放百分比
	movable: false, // 图片是否可移动
	zoomable: false, // 图片是否可缩放
	rotatable: false, // 图片是否可旋转
	scalable: false, // 图片是否可翻转
	transition: true, // 使用 CSS3 过度
	fullscreen: true, // 播放时是否全屏
	keyboard: true, // 是否支持键盘
	url: "data-source", // 设置大图片的 url
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");


obsReaction(
	() => {
		// if (!reaxel_user().userStore.token) {
		// 	router.push("/");
		// }
	},
	() => [reaxel_user().userStore.token],
);
// @ts-ignore
import { reaxel_53kf } from "@/reaxels/initial/53kf";
import '@/reaxels/devices/reactive-css-controller';
reaxel_53kf().openKfModal();
