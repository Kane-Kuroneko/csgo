import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login/Login.js';
import axios from "../reqeust/axios";


Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
	return originalPush.call(this , location).catch(err => err);
};
const routes = [
	{
		path : '/' ,
		name : 'Home' ,
		meta : {
			requiresAuth : false ,
		} ,
		component : () => import(/* webpackChunkName: "home" */ '@/views/New.MainBlock/index.vue'),
	} ,
	{
		path : '/page/instrutions' ,
		name : 'instrutions' ,
		meta : {
			requiresAuth : false ,
		} ,
		component : () => import(/* webpackChunkName: "instrutions" */ '@/pages/Instructions.vue'),
	} ,
	{
		path : '/freeSKins/:boxId' ,
		name : 'freeSKins' ,
		props : true ,
		meta : {
			requiresAuth : false ,
		} ,
		component : () => import(/* webpackChunkName: "freeSKins" */ '@/components/WelfBox.vue'),
	} ,
	{
		path : '/refersh' ,
		name : 'refersh' ,
		props : true ,
		meta : {
			requiresAuth : false ,
		} ,
		component : () => import(/* webpackChunkName: "freeSKins" */ '@/components/emptyRouer.vue'),
	} ,
	{
		path : '/case/:type' ,
		name : 'boxlist' ,
		component : () => import(/* webpackChunkName: "case" */ '@/pages/BoxList') ,
		meta : {
			requiresAuth : false ,
		} ,
	} ,
	{
		path : '/page/store' ,
		name : 'store' ,
		component : () => import(/* webpackChunkName: "store" */ '@/pages/Store') ,
		meta : {
			requiresAuth : false ,
		} ,
		beforeEnter : (to , from , next) => {
			const token = localStorage.getItem('token');
			if ( token && token !== 'undefined' ) {
				next();
			} else {
				// 没有登录的时候显示登录
				Login.show();
			}
		},
	} ,
	{
		path : '/page/upgradeHall' ,
		name : 'upgradeHall' ,
		component : () => import(/* webpackChunkName: "upgradeHall" */ '@/components/Upgrade/upgradeHall') ,
		meta : {
			requiresAuth : false ,
		} ,
		children : [],
	} ,
	{
		path : '/upgrade/userRecord/:id' ,
		name : 'userRecord' ,
		props : true ,
		component : () => import(/* webpackChunkName: "upgradeHall" */ '@/components/Upgrade/UpgradeUserRecord') ,
		meta : {
			requiresAuth : false ,
		} ,
	} ,
	{
		path : '/upgrade/userInfo/:id' ,
		name : 'UpgradeUserHome' ,
		props : true ,
		component : () => import(/* UpgradeUserHome: "upgradeHall" */ '@/components/Upgrade/UpgradeUserHome') ,
		meta : {
			requiresAuth : false ,
		} ,
	} ,
	{
		path : '/upgrade/detail' ,
		name : 'detail' ,
		props : true ,
		component : () => import(/* webpackChunkName: "detail" */ '@/components/Upgrade/DataDetail') ,
		meta : {
			requiresAuth : false ,
		} ,
	} ,
	{
		path : '/page/upgrade' ,
		name : 'upgrade' ,
		component : () => import(/* webpackChunkName: "upgrade" */ '@/pages/Upgarde') ,
		meta : {
			requiresAuth : false ,
		} ,
	} ,
	{
		path : '/page/replaceSkins' ,
		name : 'ReplaceSkins' ,
		component : () => import(/* webpackChunkName: "ReplaceSkins" */ '@/pages/ReplaceSkins') ,
		meta : {
			requiresAuth : true ,
		} ,
	} ,
	{
		path : '/page/helpcenter/:key' ,
		name : 'helpCenter' ,
		component : () => import(/* webpackChunkName: "helpCenter" */ '@/pages/HelpCenter') ,
		meta : {
			requiresAuth : false ,
		} ,
	} ,
	{
		path : '/user/:page' ,
		name : 'user' ,
		meta : {
			requiresAuth : true ,
		} ,
		component : () => import(/* webpackChunkName: "user" */ '@/pages/User') ,
		children : [
			{
				name : 'case' ,
				path : '/user/case' ,
				component : resolve => require(['@/components/myBag'] , resolve),
			} ,
			{
				name : 'assets' ,
				path : '/user/assets' ,
				// component : resolve => require(['@/components/userPay'] , resolve),
				component : resolve => require(['@/views/New.Recharge/index.vue'] , resolve),
			} ,
			{
				name : 'account' ,
				path : '/user/account' ,
				component : resolve => require(['@/components/userAccount'] , resolve),
			} ,
			{
				path : '/page/promotion' ,
				name : 'promotion' ,
				component : () => import(/* webpackChunkName: "promomion" */ '@/pages/Promotion'),
			} ,
		],
	} ,
	{
		path : '/steer/case' ,
		name : 'openBox' ,
		meta : {
			requiresAuth : false ,
		} ,
		component : () => import(/* webpackChunkName: "openBox" */ '@/pages/Box.vue') ,
	} ,
	{
		path : '/page/roll' ,
		name : 'roll' ,
		component : () => import(/* webpackChunkName: "roll" */ '@/pages/Roll.vue') ,
		meta : {
			requiresAuth : false ,
		} ,
	} ,
	{
		path : '/page/roll/:rollId' ,
		name : 'rollDetail' ,
		meta : {
			requiresAuth : false,
		} ,
		props : true ,
		component : () => import(/* webpackChunkName: "rollDetail" */ '@/pages/RollDetail.vue') ,
	} ,
	{
		path : '/page/caseBattle' ,
		name : 'CaseBattle' ,
		meta : {
			requiresAuth : false,
		} ,
		component : () => import(/* webpackChunkName: "casebattle" */ '@/pages/CaseBattle.vue') , 
		// beforeEnter: (to, from, next) => {
		//     getAction('/api/battle/open').then(res => {
		//         if (res.data == 0) {
		//             next()
		//         }
		//     }).catch(e => {
		//         this.$Message.error(e.response.data.errMsg)
		//     })
		// }
	} ,
	{
		path : '/page/battle/:battleId' ,
		name : 'battleDetail' ,
		meta : {
			requiresAuth : false ,
		} ,
		props : true ,
		component : () => import(/* webpackChunkName: "battleDetail" */ '@/pages/BattleRoom.vue') ,
	} ,
	{
		path : '/page/active' ,
		name : 'active' ,
		meta : {
			requiresAuth : false ,
		} ,
		props : true ,
		component : () => import(/* webpackChunkName: "active" */ '@/views/Active.vue') ,
	} ,
	{
		path : '/page/wish' ,
		name : 'wishPage' ,
		meta : {
			requiresAuth : false ,
			isActive : true ,
		} ,
		component : () => import(/* webpackChunkName: "wish" */ '@/pages/WishGame.vue') ,
		children : [],
	} ,
	{
		path : '/wish/:roomId' ,
		name : 'wish' ,
		props : true ,
		meta : {
			isActive : true ,
		} ,
		component : () => import(/* webpackChunkName: "wishD" */ '@/components/Wish/WishDetail.vue') ,
	} ,
	{
		path : '/page/drop' ,
		name : 'drop' ,
		meta : {
			requiresAuth : false ,
			isActive : true ,
		} ,
		component : () => import(/* webpackChunkName: "Drop" */ '@/pages/Drop.vue') ,
	} ,
	{
		path : '/page/source' ,
		name : 'newYear' ,
		meta : {
			requiresAuth : false ,
			isActive : true ,
		} ,
		component : () => import(/* webpackChunkName: "newYear" */ '@/components/NewYear/NewYear.vue') ,
	} ,
	{
		name : 'recharge' ,
		path : '/recharge' ,
		meta : {
			requiresAuth : true ,
		} ,
		component : () => import(/* webpackChunkName: "user" */ '@/views/New.Recharge/index.vue') ,
	}
];

const router = new VueRouter({
	mode : 'history' ,
	base : process.env.BASE_URL ,
	linkActiveClass : 'active' ,
	scrollBehavior (to , from , savedPosition) {
		// document.body.scrollTop = 0;
		if ( to.name === 'helpCenter' ) return;
		if ( savedPosition ) {
			return savedPosition;
		} else {
			return {
				x : 0 ,
				y : 0,
			};
		}
	} ,
	routes,
});
/**
 * 路由拦截
 * 权限验证h
 */
router.beforeEach((to , from , next) => {
	axios.defaultSource.cancel('切换路由取消请求');
	axios.defaultSource = axios.CancelToken.source(); // 刷新 defaultSource
	if ( !to.name ) next('/');
	if ( to.matched.some(r => r.meta.requiresAuth) ) {
		const token = localStorage.getItem('token');
		if ( token && token !== 'undefined' ) {
			next();
		} else {
			// 没有登录的时候显示登录
			Login.show();
			let name = from.name || 'Home';
			next({
				name : name,
			});
		}
	} else {
		// 不需要身份校验 直接通过
		next();
	}
});

router.onError((error) => {
	const pattern = /Loading chunk (\d)+ failed/g;
	const isChunkLoadFailed = error.message.match(pattern);
	if ( isChunkLoadFailed ) {
		const targetPath = router.history.pending.fullPath;
		router.replace(targetPath);
	}
});
router.afterEach((to , from , next) => {
	// document.querySelector('body').setAttribute('style' , 'overflow: auto;');
});
export default router;
