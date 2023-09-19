<template>
	<div 
		class="header-logo-login"
		@click.self="reax_Device.printDeviceInfo()"
	>
		<div class="left-side">
			<img
				@click="toggleWapSiderMenu()"
				src="./menu.svg"
				style="width: 7.2vw;height: 7.2vw;"
			/>
			<img
				@click="$router.push('/')"
				src="./logo.svg"
				style="margin-left: 2.67vw;width: 26.13vw;height: 26.13vw;"
			/>
		</div>
		
		<div 
			v-if="userStore.token && userStore.profile"
			class="user-avator"
		>
			<div
				@click="$router.push('/recharge')"
				class="cash-box"
			>
				<span class="balance">{{ userStore.profile.balance }}</span>
				<img src="./recharge-btn.svg" style="width: 2.67vw;">
			</div>
			<div class="user-box">
				<img
					@click="$router.push('/user/account')"
					:src="`https://picture.hzqinyun.com/${userStore.profile.avatar}`"
					class="avator"
				>
				<div class="user-name">{{ userStore.profile.name }}</div>
			</div>
		</div>
		<div
			v-else
			class="right-side"
			@click="openLoginModal"
		>
			<span>登录/注册</span>
		</div>
	</div>
</template>

<script>
import { reaxel_initial } from "@/reaxels/initial";
import { reaxel_user } from "@/reaxels/user";
import { reaxel_header_tabs } from "@/reaxels/header-tabs";
import { reaxel_Device } from '@/reaxels/devices';

const reax_User = reaxel_user(),
	{ userStore, openLoginModal } = reax_User;
const reax_Initial = reaxel_initial(),
	{} = reax_Initial;
const reax_Header_Tabs = reaxel_header_tabs(),
	{ toggleWapSiderMenu } = reax_Header_Tabs;
const reax_Device = reaxel_Device();
export default reaxper({
	status() {
		return {
			userStore,
			reax_User,
			reax_Device,
		};
	},
	methods: {
		openLoginModal,
		toggleWapSiderMenu,
	},
	components: {},
});
</script>

<style lang="less" scoped>
.header-logo-login {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2.67vw;
	height: 13.33vw;
	width: 100%;
	background: #23232d;
	border-bottom: 0.27vw solid #414141;

	.left-side {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right-side {
		width: 21.87vw;
		height: 7.47vw;
		border: 1px solid #d8ad5e;
		border-radius: 4px;
		background: #3d321d;
		display: flex;
		justify-content: center;
		align-items: center;

		& > span {
			font-size: 3.73vw;
			font-weight: bold;
			color: white;
		}
	}
	
	.user-avator{
		display: flex;
		justify-content: center;
		align-items: center;
		width: unset;
		height: unset;
		border-radius: unset;
		position: static;
		
		
		.cash-box{
			display: flex;
			justify-content: center;
			align-items: center;
			background-image: url("./balance-bg.svg");
			background-size: auto 100%;
			background-repeat: no-repeat;
			background-position: left;
			width: 25.6vw;
			height: 8.53vw;
			user-select: none;
			line-height: 2.67vw;
			
			span.balance{
				font-size: 3.2vw;
				color: #F0A535;
				margin-left: 4.27vw;
				width: 13.87vw;
				text-align: center;
				word-wrap: anywhere;
			}
			img{
				
			}
		}
		.user-box{
			margin-left: 1.6vw;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			
			img.avator{
				width: 11.2vw;
				height: 11.2vw;
				border-radius: 50%;
				margin-bottom: -24%;
			}
			.user-name{
				width: 11.2vw;
				height: 2.67vw;
				background: rgba(11,18,36,.6);
				border-radius: 24px;
				font-size: 1.87vw;
				color: white;
				text-align: center;
			}
		}
	}
}
</style>
