<template>
	<div 
		class="left-menu-sider"
		:class="{ 'show' : siderWapMenuShow }"
		@click.self="toggleWapSiderMenu()"
	>
		<div class="menu-container">
			<div>
				<div
					v-for="{iconUrl,title,navigateTo,color} in tabs"
					@click="$router.push(navigateTo),toggleWapSiderMenu()"
					class="menu-item"
				>
					<img :src="iconUrl" style="width: 6.93vw;height: 6.93vw;">
					<span class="menu-text" :style="{color}">{{ title }}</span>
				</div>
			</div>
			<div
				v-show="token"
				class="logout-btn"
				@click="clearUserInfo(),toggleWapSiderMenu()"
			>
				<img src="./logout.svg" style="width: 5.87vw;height: 5.87vw;">
				<span>退出登录</span>
			</div>
		</div>
		
	</div>
</template>

<script>

import { reaxel_header_tabs } from '@/reaxels/header-tabs';
import { reaxel_user } from '@/reaxels/user';

const reax_Header_Tabs = reaxel_header_tabs(),{
	leftTabs,
	rightTabs,
	toggleWapSiderMenu,
} = reax_Header_Tabs;
const reax_User = reaxel_user(),{
	clearUserInfo,
	userStore,
} = reax_User;
export default reaxper({
	status(){
		const { siderWapMenuShow } = reax_Header_Tabs;
		const { token } = userStore;
		return {
			token,
			tabs : [...leftTabs,...rightTabs],
			siderWapMenuShow,
		}
	},
	methods:{
		toggleWapSiderMenu,
		clearUserInfo,
	},
	components : {},
	
})
</script>

<style lang="less" scoped>
.left-menu-sider {
	width: 60%;
	height: calc(100% - 13.33vw);
	position: fixed;
	left: -100%;
	background: rgba(0, 0, 0, 0.8);
	z-index: 999;
	overflow: hidden;
	border-right: 0 solid rgba(0, 0, 0, .7);
	transition: all .25s ease;
	top: 13.33vw;
	user-select: none;
	
	&.show {
		box-sizing: content-box;
		width: 65%;
		left: 0;
		z-index: 999;
		border-right: 100vw solid rgba(0, 0, 0, .1);
	}
	
	.menu-container{
		background: #1F1D28;
		height: 100%;
		padding: 4.8vw 0 4.8vw 4.8vw;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		background-image: url("./img_1.png");
		background-position: left bottom;
		background-size: cover;
		background-repeat: no-repeat;
		
		
		.menu-item{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 11.2vw;
		}
		
		.menu-text{
			margin-left: 4.27vw;
			font-size: 4.27vw;
			
		}
		.logout-btn{
			display: flex;
			align-items: center;
			padding: 2.13vw 0;
			
			span{
				font-size: 3.73vw;
				color: white;
				margin-left: 2.13vw;
				margin-top: 0.27vw;
			}
		}
	}
}
</style>
