<template>
	<div
		class="recharge-diamonds-container"
	>
		<HrTitle title="获取钻石"/>
		<Tabs :tabs="tabs" :selection="store.selection" />
		
		<div class="main-content">
			<p class="tips" style="font-size: 20px;margin-top: 20px;">选择支付渠道</p>
			<div
				v-if="reax_Recharge.devicePaymentChannels"
				class="pay-channel-container"
			>
				<img
					v-for="channel in reax_Recharge.devicePaymentChannels"
					@click="reax_Recharge.chooseChannel(channel.ids)"
					:style="{'border': channel.ids === rechargeStore.channelIds ? '5px solid gold' : null }"
					width="200"
					class="pay-btn"
					:src="`https://picture.hzqinyun.com${channel.image}`"
				>
			</div>
			
			<p class="tips" style="font-size: 20px;margin-top: 20px;">
				选择饰品 <br/> 购买steam游戏Jump-Jump行动的饰品可赠送钻石，
				<span style="color:#FFBC2C;">赠送比例为1:1</span>
			   ,购买高额饰品会有额外钻石赠送
			</p>
			<div
				v-if="reax_Recharge.channelObject?.goodsList?.length"
				class="precious-container"
			>
				<div
					v-for="precious in reax_Recharge.channelObject.goodsList"
					@click="reax_Recharge.chooseItem(precious.id)"
					:style="{border:precious.id === rechargeStore.goodsId? '2px solid #FF9900':null}"
					class="precious-box"
				>
					<span 
						style="display:flex;justify-content: center;align-items:center;height:20px;width:98px;font-size: 16px;background-color: #FF9900;color: white;clip-path: polygon(100% 0%, 87% 105%, 13% 102%, 0 0%);"
					>送💎{{ precious.goodsPrice }}</span>
					<img
						width="94"
						height="88"
						:src="`https://picture.hzqinyun.com${precious.goodsImg}`"
						style="margin:22px 0;"
					>
					<span style="color: #FF9900;font-size: 18px;font-weight: bold;">${{ precious.goodsPrice }}</span>
				</div>
			</div>
			
			<div
				@click="requestQrCode()"
				class="pay-now-btn"
				v-if="!rechargeStore.qrcode && rechargeStore.rate && reax_Recharge.itemObject"
			>
				<span>${{ reax_Recharge.itemObject.goodsPrice }}≈¥{{ (reax_Recharge.itemObject.goodsPrice * rechargeStore.rate).toFixed(2) }}</span>
				<span>立即支付</span>
			</div>
<!--		这一行div没有实际作用,但删掉会导致vue事件绑定错误bug	-->
			<div class="qrcode-container-c"></div>
			
			<iframe
				src = "/iframe.cashier.html"
				frameborder = "0"
				name="cashier"
				width="1366"
				height="768"
				v-if="false"
			></iframe>
			<div
				class="qrcode-container"
				v-if="rechargeStore.qrcode"
			>
				<QrCode
					:text = "rechargeStore.qrcode"
					:size = "initialStore.wap ? 200 : 200"
					style = "padding: 0.15rem"
				></QrCode>
				<span
					class="cancel-recharge"
					@click="cancelRecharge"
				>取消支付</span>
				<span
					@click="finishRecharge"
					class="finish-recharge"
				>支付完成</span>
			</div>
			<p style="color: white;font-size: 24px;margin-top: 150px;">
				购买遇到了问题？ <span
				@click="$router.push('/page/helpcenter/其他流程问题')"
				style="color: #FFBC2C;cursor: pointer;"
			>前往解决 ></span><br>
				购买成功后，3分钟内到账，届时请刷新网页，如长时间未到账，请联系QQ群管理员
			</p>
			<p style="font-size: 14px;font-weight: bold;color: #D9D9D9;margin-top: 40px;">
				钻石不会过期，但不能提现或转赠他人<br>
				赠送钻石到账时间最高会有10分钟左右延迟<br>
				购买饰品后，存至个人中心--我的背包--购买记录，绑定交易链接可取回，即可在Steam游戏Jump-Jump行动内使用<br>
				购买前请您确保已仔细阅读 <span style="color: #FFBC2C;cursor: pointer;" @click="$router.push('/page/helpcenter/服务协议')">《97hash服务协议》</span>，成功购买即代表您对协议无异议<br>
				网站内物品禁止转卖交易！
			</p>
		</div>
	</div>
</template>


<script>
const tabs = [
	{
		title : "买饰品赠钻石" ,
		key : 'buy-precious' ,
		onSelect (key) {
			setState({ selection : key });
		} ,
		iconUrl : imgDiamond ,
	},
	// {
	// 	title : "充值码" ,
	// 	key : 'recharge-code' ,
	// 	onSelect (key) {
	// 		setState({ selection : key });
	// 	} ,
	// 	iconUrl : '' ,
	// },
];
const {store,setState} = orzMobx({
	selection : tabs[0].key,
})

const reax_Recharge = reaxel_Recharge(),{
	setRechargeState,
	rechargeStore,
	mutateRecharge,
	requestGetRechargeQrcode,
	cancelRecharge,
	finishRecharge,
} = reax_Recharge; 
const reax_Initial = reaxel_initial(),{
	initialStore,
} = reax_Initial;
export default reaxper({
	status(){
		const { isPhone } = initialStore;
		return {
			isPhone,
			reax_Initial,
			rechargeStore,
			initialStore,
			reax_Recharge,
			store,
		}
	},
	methods:{
		cancelRecharge,
		requestQrCode(){
			requestGetRechargeQrcode().then(() => {
				
			}).catch(({message}) => {
				this.$Modal.error({
					content : message,
				})
			});
		},
		finishRecharge(){
			finishRecharge().then(({message}) => {
				this.$Message.success({content:message});
			}).catch(({message}) => {
				// this.$Message.error({content:message,duration:5});
				// this.$Notice.error({desc:message,});
				this.$Modal.error({ content : message });
			}).finally(() => {
				
			})
		},
	},
	created () {
		reax_Recharge.requestGetPaymentChannels().then(data => {
			console.log(data);
		});
		reax_Recharge.requestGetRate();
	},
	data(){
		return {
			tabs,
			imgDiamond,
		}
	},
	components : {
		Tabs,
		HrTitle,
		QrCode
	}
});

import {} from '@/reaxels/user';
import { reaxel_Recharge } from '@/reaxels/user/user-recharge';
import { reaxel_initial } from '@/reaxels/initial';
import {Tabs} from '@/New.Components';
import { HrTitle } from '@/New.Components';
import imgDiamond from '@/New.Assets/icon-diamond.svg';
import QrCode from "vue-qrcode-component";
</script>


<style
	lang="less"
	scoped
>
.recharge-diamonds-container{
	overflow: hidden;
	
	.main-content{
		max-width: 920px;
		padding: 24px;
		margin: 0 auto;
		
		.precious-container{
			margin-top: 22px;
			display: flex;
			gap: 30px;
			flex-flow: row wrap;
			
			
			.precious-box{
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				width: 130px;
				height: 188px;
				user-select: none;
				cursor: pointer;
				border: 2px solid #6F4C18;
			}
		}
		
		.pay-channel-container{
			margin-top: 20px;
			display: flex;
			flex-flow: row wrap;
			gap:27px;
			
			
			.pay-btn{
				border:5px solid transparent;
				cursor: pointer;
				max-height: 40px;
			}
		}
		
		.pay-now-btn{
			display: flex;
			flex-flow: column nowrap;
			cursor: pointer;
			user-select: none;
			justify-content: center;
			align-items: center;
			background-color: #FF9900;
			font-size: 26px;
			border-radius: 4px;
			width: 240px;
			height: 80px;
			font-weight: bold;
			margin-top: 40px;
			&>span:first-child{
				color: #FFE6BB;
				font-size: 22px;
				margin-bottom: -4px;
			}
			&>span:last-child{
				color: white;
				margin-bottom: 4px;
			}
		}
		
		.qrcode-container{
			margin-top: 30px;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			
			
			.cancel-recharge {
				text-decoration: underline;
				color: #0AFF0A;
				text-align: center;
				display: block;
				cursor: pointer;
				user-select: none;
				font-size: 18px;
				margin-top: 8px;
			}
			
			.finish-recharge{
				display: flex;
				justify-content: center;
				align-items: center;
				color: white;
				background-color: #FF9900;
				width: 240px;
				height: 60px;
				border-radius: 4px;
				font-size: 22px;
				user-select: none;
				cursor: pointer;
				margin-top: 18px;
			}
		}
	}
}
</style>
