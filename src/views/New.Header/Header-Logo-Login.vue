<template>
	<div
		class="header-main-logo-login"
		@click.self="reax_Device.printDeviceInfo()"
	>
		<img
			class="home-logo"
			width="182"
			:src="imgLogo"
			@click="$router.push('/')"
		/>

		<div
			v-if="userStore.token && userStore.profile"
			class="profile-block"
		>
			<div class="left-container">
				<div
					@click="$router.push('/user/account')"
					class="username">{{ userStore.profile.name }}
				</div>
				<div
					@click="$router.push('/recharge')"
					class="balance"
					:style="{'background-image':`url('${imgBalanceBg}')`}"
				>
					<span style="font-size: 28px;">💎</span>
					<span>{{ userStore.profile.balance }}</span>
					<img 
						:src="imgGetAmount"
					>
				</div>
			</div>
			<div class="right-container">
				<img
					@click="$router.push('/user/account')"
					:src="`https://picture.hzqinyun.com/${userStore.profile.avatar}`"
					class="avatar" width="65" height="65"
				>
				<div 
					class="switch-account"
					@click="switchAccount()"
				>
					<img class="switch-account-icon" :src="imgSwitchAccount">
					<span>切换账号</span>
				</div>
			</div>
		</div>
		
		<div
			v-else
			class="login-btn-scope"
			@click="openLogin()"
		>
			<span>登录 / 注册</span>
		</div>
	</div>
</template>

<script>
import { reaxel_user } from '@/reaxels/user';
import { reaxel_Device } from '@/reaxels/devices';
const reax_user = reaxel_user() , {
	setUserState ,
	openLoginModal ,
} = reax_user;
const reax_Device = reaxel_Device();
export default reaxper({
	status (){
		const {
			userStore,
		} = reaxel_user();
		return {
			userStore,
			reax_Device,
		}
	},
	data(){
		return {
			imgLogo,
			imgGetAmount,
			imgBalanceBg ,
			imgSwitchAccount,
		}
	},
	methods : {
		switchAccount(){
			reax_user.clearUserInfo();
			reax_user.openLoginModal();
		},
		openLogin(){
			openLoginModal();
			return;
			
			
			if ( this.$route.query.share !== undefined ) {
				this.$login(undefined , true);
			} else if ( window.location.search.indexOf("spread=") === - 1 ) {
				this.$login();
			}
		},
	}
})


import imgLogo from './imgLogo.svg';
import imgGetAmount from './getAmount.svg';
import imgBalanceBg from './balance-bg.svg';
import imgSwitchAccount from './switch-account.svg';
</script>

<style
	scoped
	lang="less"
>
.header-main-logo-login {
	display: flex;
	justify-content: space-between;
	padding: 0 84px;
	margin: 0 auto;
	width: 100%;
	height: 92px;
	user-select: none;
	align-items: center;
}
.home-logo {
	cursor: pointer;
	height: 54px;
	margin-top: 4px;
}
.login-btn-scope {
	border: 2px solid rgb(216,173,94);
	padding: 16px 52px;
	border-radius: 8px;
	background-color: #3d321d;
	cursor: pointer;
	
	& > span {
		color: white;
		font-size: 18px;
		font-family: "Microsoft YaHei";
	}
	
	&:hover {
		background-color: #80632d;
	}
}

.profile-block {
	display: flex;
	align-items: center;
	
	* {
		flex : 0 0 auto;
	}
	
	& >.left-container {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-end;
		.username {
			color: white;
			font-size: 16px;
			width: 134px;
			text-align: right;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		
		.balance {
			display: flex;
			align-items: center;
			color: #F0A535;
			font-size: 14px;
			height: 38px;
			background-repeat: no-repeat;
			background-size: auto 100%;
			background-position: left;
			cursor: pointer;

			& img {
				margin-left: 8px;
				padding : 2px;
				scale: 1.2;
			}
		}
	}
	
	& >.right-container{
		margin-left: 16px;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		
		.switch-account {
			margin-top: 4px;
			display: flex;
			align-items: center;
			cursor: pointer;
			
			span {
				margin-left: 5px;
				font-size: 12px;
				color: #B3B3B3;
			}
			img.switch-account-icon{
				scale: 1.2;
			}
		}
		
		img.avatar {
			cursor: pointer;
			border-radius: 50%;
		}
	}
}

</style>
