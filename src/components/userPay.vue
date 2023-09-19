<template>
	<div>
		<div class = "my-bag-tips">
			<div class = "bag-label pay-lable">
				<div
					:class = "{ active: openType === 'onlinePay' }"
					@click = "openTypeFunc('onlinePay')"
				>
					买饰品赠钻石
				</div>
				<div
					v-if="false"
					:class = "{ active: openType === 'recordCode' }"
					@click = "openTypeFunc('recordCode')"
				>
					充值码
				</div>
				<!--                <div :class="{'active':openType === 'inventory'}"  @click="openTypeFunc('inventory')">饰品充值</div>-->
			</div>
		</div>
		<!--        我的背包-->
		<transition v-if = "openType === 'onlinePay'">
			<div class = "record-bg">
				<p class = "online-pay-tips hide-m">
					<span>钻石不会过期，但不能提现或转赠他人</span>
				</p>
				<p class = "online-pay-tips hide-m">
					<span>赠送钻石到账时间最高会有10分钟左右延迟</span>
				</p>
				<p class = "online-pay-tips hide-m">
					<span
					>购买饰品后，存至个人中心--我的背包--购买记录，绑定交易链接可取回，即可在Steam游戏拯救校花行动内使用
					</span
					>
				</p>
				<p class = "online-pay-tips hide-m">
					购买前请您确保已仔细阅读
					<a @click = "goHelpCenter">《97hash服务协议》</a>
					，成功购买即代表您对协议无异议
				</p>
				<p class = "online-pay-tips hide-m">网站内物品禁止转卖交易！</p>
				<div class = "bag-csgo-dota">选择支付方式</div>
				<div class = "mobile-charge-tips hide-p hide-ipad">
					<div class = "tips-icon">
						<i class = "iconfont iconicon-tips"></i>
					</div>
					手机购买请先关闭浏览器弹窗阻止，即可顺利拉起购买
				</div>
				<!--                支付渠道-->
				<div
					style = "margin: auto"
					class = "pay-way"
					v-if="rechargeStore.paymentChannels"
				>
					<div
						v-for = "channel in rechargeStore.paymentChannels"
						@@click.stop = "choseChanel(channel, channel.rechargeConfig);chooseChannel(channel.ids)"
						@click.stop = "chooseChannel(channel.ids)"
						:key = "channel.weight"
						:class = "{ active: channel.ids === rechargeStore.channelIds }"
					>
						<span>{{ channel.channel }}</span>
						<img
							v-lazy = "imgHost(channel.image)"
							alt = ""
							style = "height: 100%"
						/>
					</div>
				</div>
				<div class = "bag-csgo-dota">
					选择饰品
					<p class = "jump-tips">
						<span
						>购买steam游戏拯救校花行动的饰品可赠送钻石，赠送
							<span
								class = "important-tips"
							>比例为1:1
							</span
							>
						 ,购买高额饰品会有额外钻石赠送
						</span
						>
					</p>
				</div>
				<!--额度选择-->
				<div
					v-if="reax_UserCenter.channelObject"
					class = "active-charge"
				>
					<div
						v-for = "item in reax_UserCenter.channelObject.goodsList"
						@click.stop = "chooseItem(item.id)"
						:class = "{ active: rechargeStore.goodsId === item.id }"
						:key = "item.id"
					>
						<div class = "give-skins">
							<div>
								<img
									:src = "imgHost(item.goodsImg)"
									alt = ""
								/>
							</div>
						</div>
						<div class = "give-price">
							<div>
								送
								<i class = "iconfont icon-icon_diamond1" style = "font-weight: 400"/>
								<span class = "font-bold">{{ item.goodsPrice }}</span>
							</div>
							<p v-if = "item.giving !== 0">
								+{{ item.giving }}
								<i
									class = "iconfont icon-icon_diamond1"
									style = "font-weight: 400"
								></i>
							</p>
							<p v-else></p>
							<div>${{ item.goodsPrice }}</div>
						</div>
					</div>
				</div>
				<div v-if = "false">
					<div class = "default-charge">
						<Form
							ref = "registerForm"
							class = "form-box register-form-box"
							:rules = "rules"
							:model = "formData"
						>
							<FormItem
								label = ""
								prop = "amount"
							>
								<InputNumber
									size = "large"
									:precision = "0"
									:max = "selectItem.max"
									:min = "1"
									v-model.trim = "formData.priceVal"
									:placeholder = "`请输入购买数量,范围 ${ selectItem.min || 0 } ~  ${selectItem.max || 500}`"
								/>
							</FormItem>
						</Form>
					</div>
				</div>
				<!--                开箱按钮-->
				<div class = "box-btn phone-flex">
					<div>
						$
						<span
							v-if="reax_UserCenter.itemObject"
							class = "font-bold"
						>{{ reax_UserCenter.itemObject.goodsPrice }} ≈ ￥{{
								(reax_UserCenter.itemObject.goodsPrice * rates).toFixed(2)
						 }}
						</span
						>
					</div>
					<div
						class = "default-btn pay-now"
						@click.stop = "payHandle"
					>
						立即购买
					</div>
				</div>
				<!--                购买提示-->
				<p class = "online-pay-tips hide-ipad hide-p">
					<span>钻石不会过期，但不能提现或转赠他人</span>
				</p>
				<p class = "online-pay-tips hide-ipad hide-p">
					<span>赠送钻石到账时间最高会有10分钟左右延迟</span>
				</p>
				<p class = "online-pay-tips hide-ipad hide-p">
					<span
					>购买饰品后，存至个人中心--我的背包--购买记录，绑定交易链接可取回，即可在Steam游戏拯救校花行动内使用
					</span
					>
				</p>
				<p class = "online-pay-tips hide-ipad hide-p">
					购买前请您确保已仔细阅读
					<a @click = "goHelpCenter">《97hash服务协议》
					</a
					>
					，成功购买即代表您对协议无异议
				</p>
				<p class = "online-pay-tips hide-ipad hide-p">网站内物品禁止转卖交易！</p>
				<div
					class = "charge-problem"
					style = "margin: 0 auto 0.3rem; opacity: 0.8"
				>
					<p>购买遇到了问题？
						<span @click = "goHelp">前往解决 ></span>
					</p>
					<p>
						购买成功后，3分钟内到账，届时请刷新网页，如长时间未到账，请联系QQ群管理员
					</p>
				</div>
			</div>
		</transition>
		<transition v-else-if = "openType === 'recordCode'">
			<div class = "charge-code">
				<div
					class = "code-box"
					:class = "{ 'code-box-m': $store.state.account.isPhone }"
				>
					<span
						style = "font-size: 14px; color: #fffffe; display: inline-block"
					>{{ codeText[0].content }}
					</span
					>
					<div style = "width: 4rem">
						<Input
							v-model = "chargeCode"
							size = "large"
							placeholder = "请输入购买码"
						/>
					</div>
					<div>
						<div
							@click = "codePay"
							class = "default-btn pay-now"
						>
							<span v-if = "!loding">立即购买</span>
							<span
								v-else
								class = "loading-css"
							></span>
						</div>
					</div>
					<div
						class = "charge-problem"
						style = "margin: 0.6rem 0"
					>
						<p>购买遇到了问题？
							<span @click = "goHelp">前往解决 ></span>
						</p>
					</div>
				</div>
			</div>
		</transition>
		<transition v-else-if = "openType === 'inventory'">
			<skinPay></skinPay>
		</transition>
		<payModal
			:show = "payCodeM.show"
			:title = "payCodeM.title"
			:url = "payCodeM.url"
			:amount = "payCodeM.amount"
			:rates = "rates"
			:device = "device"
			:action = "payCodeM.action"
		>
			<i
				slot = "close"
				class = "iconfont iconguanbi1 close-btn"
				@click = "payCodeM.show = false"
			></i>
		</payModal>
	</div>
</template>

<script>
import { reaxel_Recharge } from '@/reaxels/user/user-recharge';

const reax_UserCenter = reaxel_Recharge(),{
	setRechargeState,
	mutateRecharge,
	chooseChannel,
	chooseItem,
	
} = reax_UserCenter;

export default reaxper({
	status(){
		return {
			reax_UserCenter,
			rechargeStore:reax_UserCenter.rechargeStore,
			paymentChannels : reax_UserCenter.rechargeStore.paymentChannels?.slice() || [],
		}
	},
	name : "myBag" ,
	components : {
		skinPay ,
		payModal,
	} ,
	data () {
		const validAmount = (rule , value , callback) => {
			if ( value === "" ) {
				callback(new Error("请输入充值金额"));
			} else {
				if ( this.formData.priceVal < this.selectItem.min ) {
					callback(new Error("金额低于最小充值金额"));
				} else {
					callback();
				}
			}
		};
		return {
			modal : false ,
			router ,
			openType : "onlinePay" ,
			chargeCode : "" ,
			selectItem : {} ,
			amountGroup : [
				{
					goodsName : "拯救校花行动-黑心" ,
					goodsImg : "/f91k86zd1683360241.png" ,
					goodsPrice : 3 ,
				} ,
			] ,
			device : "" , //终端
			codeText : "" ,
			formData : {
				priceVal : 3 ,
				id : "" ,
			} ,
			giving : 0 ,
			loding : false , // 按钮
			rates : null ,
			chargeActivety : "" , // 充送活动
			tips : "<p>购买成功后，3分钟内到账，届时请刷新网页，请如长时间未到账，请联系QQ群管理员</p>" + "<p>如购买遇到问题，请更换支付方式或进问题交流群反馈</p>" ,
			payWay : [] ,
			rules : {
				amount : [
					{
						validator : validAmount ,
						trigger : "change",
					},
				] ,
			} ,
			payCodeM : {
				show : false ,
				title : "" ,
				url : "" ,
				action : "" ,
			} ,
			url : {
				payWay : "/api/pay/way" ,
				payCode : "/api/pay/code" ,
				pay : "/api/pay/" ,
				info : "/api/user/info" ,
				charge : "/api/user/recharge/gift" ,
				rate : "/api/skins/rate" ,
				text : "/api/main/copy/writing" ,
			} ,
		};
	} ,
	created () {
		reax_UserCenter.requestGetPaymentChannels();
		this.device = this.checkDevice();
		this.getCodeText();
		this.getPayWay();
		this.getChargeAct();
		this.getExchangeRate();
	} ,
	methods : {
		setRechargeState,
		mutateRecharge,
		chooseChannel,
		chooseItem,
		...mapActions("account" , ["getUser"]) ,
		openTypeFunc (type) {
			this.openType = type;
		} ,
		getCodeText () {
			getAction(this.url.text).then((res) => {
				this.codeText = res.data;
			});
		} ,
		goHelpCenter () {
			this.show = false;
			this.$router.push("/page/helpcenter/Termsofuse");
		} ,
		async getExchangeRate () {
			let rate = await getAction(this.url.rate);
			this.rates = rate.data;
		} ,
		goHelp () {
			this.$router.push("/page/helpcenter/Therechargehasnotarrived");
		} ,
		getPayWay () {
			getAction(this.url.payWay).then((res) => {
				this.payWay = res.data;
				if ( !this.$store.state.account.isPhone ) {
					this.payWay = res.data.filter((item) => item.type !== 3); // pc隐藏
				} else {
					this.payWay = res.data.filter((item) => item.type !== 4); // 移动端隐藏
				}
				this.selectItem = this.payWay[0];
				let valueArr = JSON.parse(this.payWay[0].rechargeConfig) || [];
				this.handleValue(this.payWay[0].goodsList , valueArr);
				this.formData = {
					priceVal : this.selectItem.goodsList[0].goodsPrice ,
					id : this.selectItem.goodsList[0].id ,
				};
			});
		} ,
		/**
		 *
		 * @param amount
		 * @param value
		 */
		handleValue (amount , value) {
			let kong = [];
			for ( let j = 0 ; j < amount.length ; j ++ ) {
				kong[j] = {
					amount : amount[j].goodsPrice ,
					giving : 0 ,
					img : amount[j].goodsImg ,
					id : amount[j].id ,
				};
				for ( let i = 0 ; i < value.length ; i ++ ) {
					if ( amount[j].goodsPrice >= + value[i].key ) {
						kong[j] = {
							amount : amount[j].goodsPrice ,
							img : amount[j].goodsImg ,
							id : amount[j].id ,
							giving : + value[i].ratio === 1 ? + value[i].val * 100 + "%" : + value[i].val ,
						};
					}
				}
			}
			this.amountGroup = kong;
			logProxy(this.amountGroup);
		} ,
		async getChargeAct () {
			let res = await getAction(this.url.charge);
			this.chargeActivety = res.data;
		} ,
		choseChanel (el , valueArr) {
			if ( el.type === 2 ) {
				window.open(el.url);
				return;
			}
			this.selectItem = el;
			this.amountGroup = /*JSON.parse*/(el.goodsList);
			this.handleValue(this.amountGroup , JSON.parse(valueArr) || []);
			this.formData = {
				priceVal : this.amountGroup[0].amount ,
				id : this.amountGroup[0].id ,
			};
		} ,
		chooseVal (val) {
			this.formData = {
				priceVal : val.amount ,
				id : val.id ,
			};
		} ,
		payHandle () {
			if ( !this.selectItem.ids ) {
				this.$Message.info("请选择支付方式");
				return;
			}
			if ( !this.formData.priceVal ) return this.$Message.info("请输入或选择购买金额");
			let params = {
				amount : this.formData.priceVal ,
				goodsId : this.formData.id ,
			};
			this.$Spin.show();
			postAction(this.url.pay + this.selectItem.ids , params).then((res) => {
				this.handlePay(res.data);
				this.$Spin.hide();
			}).catch((e) => {
				this.$Spin.hide();
				if ( e.response.data.errCode === 505 ) {
					return this.$nameAuth(1);
				}
				this.$Message.error(e.response.data.errMsg || "支付失败");
			});
		} , // 处理不同渠道支付方式
		handlePay (res) {
			let data = res.url ? res.url : window.location.origin + "/api/pay/creat/code/" + res.data;
			switch ( res.action ) {
				case "open":
					window.open(res.url , "_self");
					break;
				case "checkout":
					localStorage.removeItem("callbackHTML");
					localStorage.setItem("callbackHTML" , res.data);
					if ( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) {
						return (window.location.href = "/checkstand.html");
					}
					window.open("/checkstand.html" , "_self" , "height=600,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
					break;
				case "qr_code":
					this.payCodeM = {
						amount : this.formData.priceVal ,
						show : true ,
						title : `${ this.selectItem.client == 0 ? "支付宝" : "微信" }扫码支付` ,
						url : data ,
						action : res.action ,
					};
					if ( res.channel === "cx" ) {
						setTimeout(() => {
							this.payCodeM.show = false;
						} , 4 * 60 * 1000);
					}
					break;
				default:
					this.$Message.error("支付失败");
					break;
			}
		} , // 充值码支付
		codePay () {
			let _this = this;
			setTimeout(() => {
				let parmas = { code : this.chargeCode };
				if ( this.chargeCode.length === 0 ) return this.$Message.info("请输入正确的充值码");
				this.loding = true;
				postAction(this.url.payCode , parmas).then((res) => {
					this.getUser();
					this.$Modale("充值成功" , this.tips , 0);
					this.loding = false;
				}).catch((e) => {
					_this.$Message.error(e.response.data.errMsg);
					this.loding = false;
				});
			} , 1000);
		} , // 设备
		checkDevice () {
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
			if ( bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM ) {
				return "m";
			} else if ( bIsIpad ) {
				return "ipad";
			} else {
				return "p";
			}
		} ,
	} ,
});



import {
	getAction ,
	postAction,
} from "../api/manage";
import skinPay from "./skinPay";
import payModal from "./pay/payModal";
import { mapActions } from "vuex";
import router from "../router/index";
</script>

<style scoped>
/deep/ .ivu-checkbox-default {
	font-size: 0.22rem;
	font-weight: bold;
	color: #0a0a0a;
	line-height: 19px;
}

.v-enter {
	opacity: 0;
	transform: scale(0.3);
}

.v-enter-active {
	transform: scale(1);
	transition: all 0.5s linear;
}

.ivu-input-number {
	width: 100%;
	background: rgba(0, 0, 0, 0.5);
}

.ivu-modal-close .ivu-icon-ios-close {
	color: #fffffe;
}
</style>
