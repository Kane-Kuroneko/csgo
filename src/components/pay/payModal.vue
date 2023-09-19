<template>
	<hash-module
		v-model = "show"
		:title = "title"
		width = "7"
	>
		<div
			class = "pay-modal"
			:class = "{ 'pay-modal-m': $store.state.account.isPhone }"
		>
			<div
				class = "pay-modal-qr"
				align = "center"
			>
				<img
					:src = "url"
					:class = "device === 'p' ? 'code-url-p' : 'code-url-m'"
					v-if = "action === 'code_url'"
				/>
				<qr-code
					v-else
					:text = "url"
					:size = "device === 'p' ? 200 : 200"
					style = "padding: 0.15rem"
				></qr-code>
				<p class = "pay-prompt">保存相册识别支付</p>
			</div>
			<div
				class = "pay-modal-tips"
				:class = "{ 'pay-modal-tips-m': $store.state.account.isPhone }"
			>
				<p class = "pay-exchange">
					${{ amount }} ≈ ￥{{ (amount * rates).toFixed(2) }}
				</p>
				<!--        <p class="pay-exchange-tip">(美元汇率以实际支付为准)</p>-->
				<div class = "pay-btn-tips hide-m">
					<p>如遇充值问题</p>
					<p>请更换支付方式或进问题交流群反馈</p>
					<div
						class = "default-btn"
						@click = "paySuccessFunc"
					>充值完成
					</div>
				</div>
				
				<div class = "pay-btn-tips-m hide-p hide-ipad">
					<p>请更换支付方式或进问题交流群反馈</p>
					<p>如遇充值问题</p>
					<div
						class = "default-btn"
						@click = "paySuccessFunc"
					>充值完成
					</div>
				</div>
			</div>
		</div>
		<slot name = "close"></slot>
	</hash-module>
</template>

<script>
import qrCode from "vue-qrcode-component";
import { mapActions } from "vuex";
import HashModule from "../HashModule/HashModule";

export default {
	data () {
		return {
			qqConfig : {} ,
			modal : false ,
		};
	} ,
	watch : {
		show (nv , ov) {
			if ( ov ) {
				this.$parent.payCodeM.show = false;
			}
		} ,
	} ,
	props : {
		show : {
			type : Boolean ,
			default : false ,
		} ,
		rates : {
			type : Number ,
			default : 6.6 ,
		} ,
		title : {
			type : String ,
			default : "" ,
		} ,
		url : {
			type : String ,
			default : "" ,
		} ,
		amount : {
			type : Number ,
			default : 1 ,
		} ,
		device : {
			type : String ,
			default : "p" ,
		} ,
		action : {
			type : String ,
		} ,
	} ,
	components : {
		HashModule ,
		qrCode ,
	} ,
	methods : {
		...mapActions("account" , ["getUser"]) ,
		paySuccessFunc () {
			// 二维码充值成功刷新余额
			this.getUser();
			this.show = false;
			this.$parent.payCodeM.show = false;
			if ( sessionStorage.getItem("chargeRouter") === "/page/festival" ) {
				sessionStorage.setItem("chargeRouter" , null);
				this.$router.push("/page/festival");
			}
		} ,
	} ,
};
</script>

<style scoped>
/deep/ .ivu-modal-content .ivu-modal-body {
	background: linear-gradient(92deg, #dddddd, rgba(170, 178, 182, 0));
	border: 0px solid #030000;
	box-shadow: 0px 1px 50px 0px rgba(0, 0, 0, 0.9);
}
</style>
