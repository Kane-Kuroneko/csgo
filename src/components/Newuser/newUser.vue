<template>
	<div class="hide-rrweb">
		<div class="modal-bg" @touchmove.prevent :class="{ show: show }">
			<div class="modal-box-bg">
				<div class="modal-box" align="right">
					<img src="../../assets/image/noticeIcon.png" class="cursor" @click="show = !show" alt="" />
					<div class="new-user-box">
						<div class="new-user-wealfare" v-if="!isLogin">
							<div class="un-register">
								<img src="./assets/img.png" class="hide-m" />
								<img src="./assets/img_2.png" class="hide-ipad hide-p" style="width: 83vw" />
							</div>
							<div class="fix-btn">
								<img src="./assets/img_1.png" class="open-register" @click="registerNow()" />
							</div>
						</div>
						<div v-if="isLogin" class="new-register">
							<div class="count-time-roll" style="position: relative; z-index: 2; margin: auto;top: -15px;">
								<div class="roll-time-num">
									<span>
										{{ countTime?.split(" : ")[0]?.split("")[0] }}
									</span>
									<span>{{ countTime?.split(" : ")[0]?.split("")[1] }} </span>
								</div>
								<span class="roll-time-text">:</span>
								<div class="roll-time-num">
									<span>{{ countTime?.split(" : ")[1]?.split("")[0] }} </span>
									<span>{{ countTime?.split(" : ")[1]?.split("")[1] }} </span>
								</div>
								<span class="roll-time-text">:</span>
								<div class="roll-time-num">
									<span>
										{{ countTime?.split(" : ")[2]?.split("")[0] }}
									</span>
									<span>
										{{ countTime?.split(" : ")[2]?.split("")[1] }}
									</span>
								</div>
							</div>
							<div class="step-line">
								<div>
									<div v-for="el in [1, 2, 3, 4]" :key="el">
										<img v-if="el <= step.steps" src="../../assets/image/newuser/stepon.png" alt="" />
										<span v-else>{{ el }}</span>
									</div>
								</div>
							</div>
							<!--第一步开箱-->
							<div v-if="step.steps === 1" class="step-one step-item">
								<div v-show="step.one === 1" align="center">
									<img
										src="../../assets/image/newuser/stepOnem.png"
										class="hide-p hide-ipad"
										alt=""
										style="width: 80%"
									/>
									<img
										src="../../assets/image/newuser/stepone.png"
										class="hide-m"
										alt=""
										style="width: 100%; height: 100%"
									/>
									<div class="fix-btn" @click="openNow('free')">
										<div class="default-btn upgrade-btn open-register">立即开箱</div>
									</div>
								</div>
								<div class="step-one-two" v-show="step.one === 2">
									<div class="free-box">
										<img src="../../assets/image/newuser/box.png" alt="" />
									</div>
									<p>注册福利箱开启</p>
									<div class="box-opening" ref="boxOpening">
										<img src="../../assets/image/newuser/line.png" alt="" />
										<div class="box-ani" ref="boxAni">
											<div class="boxResult" :style="style">
												<div
													align="center"
													v-for="(el, idx) in skinsData"
													:key="el.price + idx"
													:style="{
														'background-image': `url(${require(
															`../../assets/image/newuser/${conversionStyle(
																el.rarity,
																el.category,
															)}.png`,
														)})`,
													}"
												>
													<img :src="imgHost(el.image)" alt="" height="80%" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="step-one-three" v-if="step.one === 3">
									<div class="result-image">
										<div>
											<img :src="imgHost(resulSkins.stuffImage)" alt="" />
										</div>
										<p>您的饰品已放入背包</p>
									</div>
									<span :class="'border-left-' + conversionStyle(resulSkins.skinsRarity, resulSkins.category)"
										>{{ resulSkins.nameOne + (resulSkins.nameTwo ? "|" + resulSkins.nameTwo : "") }}
									</span>
									<p>
										{{ resulSkins.quality ? resulSkins.quality : "" }}
									</p>
									<div class="fix-btn">
										<div class="default-btn upgrade-btn open-register" @click="isCharge()">确定</div>
									</div>
								</div>
							</div>
							<!--第二步福利-->
							<div v-if="step.steps === 2" class="step-two step-item">
								<div v-show="step.two === 1" align="center">
									<img
										src="../../assets/image/newuser/steotwo.png"
										class="hide-m"
										alt=""
										style="width: 100%; height: 100%"
									/>
									<img
										src="../../assets/image/newuser/steptwom.png"
										class="hide-p hide-ipad"
										alt=""
										
										style="width: 80%,opacity: 0;"
									/>
									<div class="fix-btn">
										<div class="default-btn upgrade-btn open-register" @click="step.two = 2">
											充值任意金额领取
										</div>
									</div>
								</div>
								<div class="step-two-one" v-show="step.two === 2">
									<div class="roll-box">
										<div>
											<img src="../../assets/image/newuser/chargeroll.png" alt="" style="width: 100%" />
										</div>
										<div>
											<img src="../../assets/image/newuser/chargebox.png" alt="" style="width: 100%" />
										</div>
									</div>
									<div v-if="isPhoneCode">
										<div class="charge-tips">
											充值任意金额，额外获得开箱福利
										</div>
										<!-- <div class="charge-way">
											<div
												:class="{
													active: reax_Recharge.channelObject?.ids === el.ids,
												}"
												v-for="el in payWay"
												@click.stop="choseChanel(el)"
												:key="el.weight"
											>
												<img
													src="../../assets/image/newuser/wechat.png"
													alt=""
													style="width: 100%; height: 100%"
													v-if="el.client === 2"
												/>
												<img
													src="../../assets/image/newuser/zfb.png"
													alt=""
													style="width: 100%; height: 100%"
													v-else
												/>
											</div>
										</div> -->
										<div class="charge-input">
											<div class="swiper-giving" style="position: relative;right: 43px;">
												<div class="prev item-giving" @click="translateIndex('p')" style="width: 40px;height: 40px;background: #425062;opacity: 1;">
													<i class="iconfont iconicon-down2" style="font-size: 24px;line-height: 30px; opacity: 1;"></i>
												</div>
												<div class="swiper-giving-item">
													<div class="active-charge" style="flex-wrap: nowrap" :style="translateDis">
														<div
															v-for="el in reax_Recharge.channelObject.goodsList"
															@click.stop="reax_Recharge.chooseItem(el.id)"
															:class="{
																active: priceVal === el.goodsPrice,
															}"
															:key="el.id"
														>
															<div class="give-skins">
																<div>
																	<img :src="imgHost(el.goodsImg)" />
																</div>
															</div>
															<div class="give-price">
																<div>
																	送
																	<i class="iconfont icon-icon_diamond1" style="font-weight: 400"></i>
																	<span class="font-bold">{{ el.goodsPrice }} </span>
																</div>
																<!-- <p v-if="el.giving !== 0" style="color: #ff6e6e">
																	+{{ el.giving }}%
																	<i class="iconfont icon-icon_diamond1" style="font-weight: 400"></i>
																</p>
																<p v-else></p> -->
																<p ></p>
																<div>${{ el.goodsPrice }}</div>
															</div>
														</div>
													</div>
												</div>
												<div class="next item-giving" @click="translateIndex('n')" style="width: 40px;height: 40px;background: #425062;   ">
													<i class="iconfont iconicon-down2" style="font-size: 24px;line-height: 30px; left: 10%;top:15%;opacity: 1;"></i>
												</div>
											</div>
											<div class="hide-m">
												<p>
													<i class="iconfont icon-icon_diamond1 fdc-color"></i>
													{{ priceVal ? priceVal : 0 }} ≈ ￥{{ (priceVal * rate).toFixed(2) }}
												</p>
												<!--                        <p>美元汇率已实际支付为准</p>-->
											</div>
											<div class="register-qrcode" v-show="codeShow">
												<qr-code :text="payUrl" :size="115"></qr-code>
											</div>
										</div>
										<p class="online-pay-tips" style="text-align: left">
											购买steam游戏Jump-Jump行动的饰品可赠送钻石，赠送
											<span class="important-tips">比例为1:1 </span>
										</p>
										<p class="online-pay-tips hide-m" style="text-align: left">
											购买成功后饰品将存至个人中心-我的背包
										</p>
									</div>
									<div class="phone-code" v-else>
										<div class="register-qrcode" v-show="codeShow">
											<qr-code :text="payUrl" :size="115"></qr-code>
										</div>
									</div>
									<div class="excharge-rate hide-ipad hide-p">
										<p>
											<i class="iconfont icon-icon_diamond1 fdc-color"></i>
											{{ priceVal ? priceVal : 0 }} ≈ ￥{{ (priceVal * rate).toFixed(2) }}
										</p>
										<!--                    <p>美元汇率已实际支付为准</p>-->
									</div>
									<div class="fix-btn" v-show="isPhoneCode">
										<div class="default-btn upgrade-btn open-register" @click="payHandle">立即充值</div>
									</div>
								</div>
							</div>
							<!--第三步注册开箱-->
							<div v-if="step.steps === 3" class="step-one step-item">
								<div v-show="step.three === 1" align="center">
									<img
										src="../../assets/image/newuser/stepthree.png"
										class="hide-m"
										alt=""
										style="width: 100%; height: 100%"
									/>
									<img
										src="../../assets/image/newuser/stepthreem.png"
										class="hide-p hide-ipad"
										alt=""
										style="width: 80%"
									/>
									<div class="fix-btn" @click="openNow()">
										<div class="default-btn upgrade-btn open-register">立即开箱</div>
									</div>
								</div>
								<div class="step-one-two" v-show="step.three === 2">
									<div class="free-box">
										<img src="../../assets/image/newuser/box.png" alt="" />
									</div>
									<p>首充福利箱开启</p>
									<div class="box-opening">
										<img src="../../assets/image/newuser/line.png" alt="" />
										<div class="box-ani">
											<div class="boxResult" :style="style">
												<div
													align="center"
													v-for="(el, idx) in skinsData"
													:key="el.price + idx + 100"
													:style="{
														'background-image': `url(${require(
															`../../assets/image/newuser/${conversionStyle(
																el.rarity,
																el.category,
															)}.png`,
														)})`,
													}"
												>
													<img :src="imgHost(el.image)" alt="" height="80%" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="step-one-three" v-if="step.three === 3">
									<div class="result-image">
										<div>
											<img :src="imgHost(resulSkins.stuffImage)" alt="" />
										</div>
										<p>您的饰品已放入背包</p>
									</div>
									<span :class="'border-left-' + conversionStyle(resulSkins.skinsRarity, resulSkins.category)"
										>{{ resulSkins.nameOne + (resulSkins.nameTwo ? "|" + resulSkins.nameTwo : "") }}
									</span>
									<p>
										{{ resulSkins.quality ? resulSkins.quality : "" }}
									</p>
									<div class="fix-btn">
										<div
											class="default-btn upgrade-btn open-register"
											@click="
												//getStep(4);
												//step.steps = 4;
												show = false;
											"
										>
											确定
										</div>
									</div>
								</div>
							</div>
							<!--第4步首充roll-->
							<div v-if="step.steps === 4" class="step-one step-item">
								<div align="center">
									<img
										src="../../assets/image/newuser/roll.png"
										alt=""
										class="hide-m"
										style="width: 100%; height: 100%"
									/>
									<img
										src="../../assets/image/newuser/rollm.png"
										class="hide-p hide-ipad"
										alt=""
										style="width: 80%"
									/>
									<div class="fix-btn">
										<div class="default-btn upgrade-btn open-register" @click="goRoll">立即前往</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { countDown } from "../../utils/utils";
import { getAction, postAction } from "../../api/manage";
import router from "../../router/index";
import { conversionStyle } from "../../utils/utils";
import qrCode from "vue-qrcode-component";
import store from "@/store";

import { reaxel_initial } from "@/reaxels/initial";
import { reaxel_user } from "@/reaxels/user";
import { reaxel_Device } from "@/reaxels/devices";
import { reaxel_Recharge } from "@/reaxels/user/user-recharge";

const reax_Initial = reaxel_initial(),
	{ initialStore } = reax_Initial;
const reax_User = reaxel_user(),
	{} = reax_User;
const reax_Recharge = reaxel_Recharge(),
	{} = reax_Recharge;

export default reaxper({
	status() {
		const { devicePaymentChannels, itemObject } = reax_Recharge;
		const { rate, channelIds, paymentChannels, goodsId } = reax_Recharge.rechargeStore;

		return {
			reax_Initial,
			reax_User,
			reax_Recharge,
			priceVal: itemObject?.goodsPrice,
			itemObject,
			goodsId,
			channelIds,
			rate,
			payWay: devicePaymentChannels || [],
		};
	},
	name: "newUser",
	components: { qrCode },
	props: {
		show: {
			default: false,
			type: Boolean,
		},
		isLogin: {
			default: false,
			type: Boolean,
		},
	},
	data() {
		return {
			router,
			store,
			timer: null,
			translateDis: {},
			amountIndex: 0,
			countTime: "23:59:59",
			conversionStyle,
			style: "", // 滚动动画
			wealfareData: {}, //  福利箱子/roll id
			codeShow: false, // 支付二维码 显示
			payUrl: "", // 二维码链接
			// payWay : [] , // 支付方式
			isPhoneCode: true,
			resulSkins: {
				nameOne: "",
				nameTwo: "",
				quality: "",
			},
			selectItem: [],
			amountGroup: [], // 默认金额集合
			infoTimer: null,
			skinsData: [], // 开箱饰品
			step: {
				steps: 1,
				one: 1,
				two: 1,
				three: 1,
				four: 1,
			},
			url: {
				wealfare: "/api/task/register/welfare",
				payWay: "/api/pay/way",
				rate: "/api/skins/rate",
				pay: "/api/pay/",
				boxData: "/api/task/details",
				open: "/api/task/open",
			},
		};
	},
	watch: {
		isLogin() {
			store.state.account.user.createTime ? this.intervalTime() : clearInterval(this.timer);
		},
		show(nv) {
			if (nv) store.dispatch("account/getUser");
			setTimeout(() => {
				if (+localStorage.getItem("register") === 0 && nv) {
					this.step = {
						steps: 1,
						one: 1,
						two: 1,
						three: 1,
						four: 1,
					};
					localStorage.setItem("register", 1);
				} else {
					this.step.steps = store.state.account.user.status;
					if (store.state.account.user.recharge && store.state.account.user.status === 2) {
						this.step.steps = 3;
					}
				}
				if (store.state.account.user.status < 5 && nv) this.getWealfare();
				if (!nv) clearInterval(this.infoTimer);
			}, 500);
		},
		step: {
			handler(nv) {
				// if ( nv.steps === 2 && this.show && this.payWay.length === 0 ) this.getPay();
			},
			deep: true,
		},
	},
	methods: {
		translateIndex(decoration) {
			if (decoration === "p") {
				this.amountIndex === 0 ? 0 : this.amountIndex--;
			} else {
				this.amountIndex === reax_Recharge.channelObject.goodsList?.length - 1
					? reax_Recharge.channelObject.goodsList?.length
					: this.amountIndex++;
			}
			this.translateDis = {
				transform: `translateX(-${203 * this.amountIndex}px)`,
				transition: `transform .2s cubic-bezier(.54,.91,.63,.99) 0s`,
			};
		},
		getWealfare() {
			getAction(this.url.wealfare).then(res => {
				this.wealfareData = res.data;
			});
		},
		registerNow() {
			this.show = false;
			this.$login(undefined, undefined, true);
		},
		isCharge() {
			if (this.step.steps === 1 && store.state.account.user.recharge) return (this.step.steps = 3);
			this.step.steps = 2;
		},
		openNow(type) {
			let params = { boxId: 0 };
			params.boxId = this.wealfareData.rechargeTaskBox[0].id;
			if (type === "free") {
				params.boxId = this.wealfareData.welfareTaskBox[0].id;
			}
			getAction(this.url.boxData, params).then(res => {
				this.skinsData = res.data.stuffVOList;
				for (let i = 0; i < 30 - this.skinsData.length; i++) {
					this.skinsData.push(this.skinsData[i % this.skinsData.length]);
				}
				postAction(this.url.open, params).then(res => {
					if (this.step.steps === 1) {
						this.step.one = 2;
						this.getStep(2);
						if (store.state.account.user.recharge) {
							this.getStep(3);
						}
					}
					if (this.step.steps === 3) {
						this.step.three = 2;
						this.getStep(4);
					}
					this.resulSkins = res.data[0];
					this.splitName(res.data[0].stuffName);
					this.skinsData[9].image = res.data[0].stuffImage;
					let width;
					this.$nextTick(() => {
						width = document.getElementsByClassName("box-opening")[0].offsetWidth / 2;
					});
					setTimeout(() => {
						this.style = {
							transform: `translateX(-${10 * 151 - width - 75}px)`,
							transition: `transform 3s cubic-bezier(.54,.91,.63,.99) 0s`,
							willChange: "transform",
						};
						setTimeout(() => {
							if (this.step.steps === 1) {
								this.step.one = 3;
							}
							if (this.step.steps === 3) {
								this.step.three = 3;
							}
							store.dispatch("account/getUser");
							this.style = "";
						}, 4000);
					}, 100);
				});
			});
			this.resulSkins = {
				nameOne: "",
				nameTwo: "",
				quality: "",
			};
		},
		splitName(name) {
			this.resulSkins.nameOne = name?.split("|")[0];
			if (name?.split("|")[1]) {
				this.resulSkins.nameTwo = name?.split("|")[1]?.split("(")[0];
				this.resulSkins.quality = name?.split("|")[1]?.split("(")[1]?.split(")")[0];
			}
		},
		payHandle() {
			if (!reax_Recharge.itemObject?.id) {
				this.$Message.info("请选择支付方式");
				return;
			}
			if (!this.priceVal) return this.$Message.info("请选择要购买的饰品");
			let params = {
				amount: reax_Recharge.itemObject.goodsPrice,
				goodsId: reax_Recharge.itemObject.id,
			};
			reax_Recharge.requestGetRechargeQrcode().catch(e => {
				if ( e.response.data.errCode === 505 ) {
					return this.$nameAuth(2);
				}
				this.$Message.error(e.response.data.errMsg || "支付失败");
			});
		}, // 处理不同渠道支付方式
		handlePay(res) {
			let data = res.url ? res.url : window.location.origin + "/api/pay/creat/code/" + res.data;
			switch (res.action) {
				case "open":
					window.open(res.url, "_self");
					break;
				case "checkout":
					localStorage.removeItem("callbackHTML");
					localStorage.setItem("callbackHTML", res.data);
					if (
						navigator.userAgent.match(/Android/i) ||
						navigator.userAgent.match(/webOS/i) ||
						navigator.userAgent.match(/iPhone/i) ||
						navigator.userAgent.match(/iPad/i) ||
						navigator.userAgent.match(/iPod/i) ||
						navigator.userAgent.match(/BlackBerry/i) ||
						navigator.userAgent.match(/Windows Phone/i)
					) {
						return (window.location.href = "/checkstand.html");
					}
					window.open(
						"/checkstand.html",
						"_self",
						"height=600,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no",
					);
					break;
				case "qr_code":
					this.payUrl = data;
					this.codeShow = true;
					if (store.state.account.isPhone) this.isPhoneCode = false;
					this.infoTimer = setInterval(() => {
						store.dispatch("account/getUser");
						if (store.state.account.user.recharge) {
							clearInterval(this.infoTimer);
							this.step.steps = 3;
							this.getStep(3);
						}
						if (!store.state.account.user.id) clearInterval(this.infoTimer);
					}, 1000);
					break;
				default:
					this.$Message.error("支付失败");
					break;
			}
		},
		choseChanel(el) {
			if (el.type === 2) {
				window.open(el.url);
				return;
			}
			reax_Recharge.chooseChannel(el.ids);

			return;
			this.formData.priceVal = this.amountGroup[0].amount;
		},
		getStep(step) {
			postAction("/api/user/update/status", { status: step });
			store.dispatch("account/getUser");
		},
		goRoll() {
			if (this.wealfareData?.rollList?.isOff ?? true) return this.$Message.info("福利ROLL正在上架中,请稍后再试");
			if (!this.wealfareData.rollList.status) {
				this.getStep(5);
				this.step.steps = 5;
			}
			this.show = false;
			sessionStorage.setItem("newRoll", this.wealfareData.rollList.roll.id);
			this.router.push(`/page/roll/${this.wealfareData.rollList.roll.id}`);
		},
		imgHost(url) {
			if (!url) return url;
			if (url.charAt(0) !== "/") {
				1;
				return url;
			} else {
				return `https://picture.hzqinyun.com${url}`;
			}
		},
		intervalTime() {
			const user = reax_User.userStore.profile;
			// let user = store.state.account.user;
			this.timer = setInterval(() => {
				this.countTime = countDown(user.createTime, true);
				if (this.countTime === "00 : 00 : 00") {
					this.show = false;
					this.$Modale("倒计时结束", "新人专享福利已结束", 0);
				}
				if (this.countTime == "00 : 00 : 00" || this.countTime?.includes("-")) {
					return clearInterval(this.timer);
				}
			}, 1000);
		},
	},
	mounted() {
		reax_Recharge.requestGetRate();
		reax_Recharge.requestGetPaymentChannels();
	},
});
</script>

<style scoped lang="less">
html[data-reaxel-reactive-device="PC-min-1366"] {
	.open-register {
		font-size: 24px;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-bg.show {
		.new-user-wealfare {
			.fix-btn {
				bottom: 0;
			}
		}
	}
}

.un-register {
	width: 100%;
	text-align: center;
}

.modal-box > img {
	top: 0;
	right: 16px;
	width: 5%;
}

.new-user-wealfare {
	width: 100%;

	.fix-btn {
		position: absolute;
		bottom: 13vw;
		left: 50%;
		transform: translateX(-50%);
	}
}

.new-user-box {
}

.new-register {
	height: 100%;
	padding: 22px 98px 28px;
	background: url("../../assets/image/newuser/bg.png") no-repeat top left / contain;
}

.step-line {
	width: 425px;
	height: 27px;
	margin: 67px auto 15px;
	background: url("../../assets/image/newuser/probg.png") no-repeat center center / 100%;

	> div {
		display: flex;
		justify-content: space-between;
		width: 80%;
		height: 100%;
		margin: auto;
		position: relative;

		&:after {
			position: absolute;
			top: 50%;
			left: 1%;
			transform: translateY(-50%);
			content: "";
			height: 4px;
			background: #bb7d02;
			width: 98%;
		}

		> div {
			width: 23px;
			height: 27px;
			z-index: 2;
			font-size: 14px;
			font-weight: bolder;
			color: #736446;
			line-height: 27px;
			text-align: center;
			background: url("../../assets/image/newuser/unstep.png") no-repeat center center / 100%;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.step-item {
	width: 735px;
	height: 370px;

	> div {
		width: 100%;
		height: 100%;
	}
}

.step-one-two {
	p {
		text-align: center;
		font-size: 15px;
		font-family: PingFang SC;
		font-weight: 600;
		color: #ffffff;
		margin-bottom: 32px;
	}
}

.step-one-three {
	text-align: center;

	> span:nth-of-type(1) {
		font-size: 17px;
		font-weight: 400;
		color: #ecca36;
		text-align: center;
		display: inline-block;
		padding-left: 10px;
		margin-bottom: 5px;
	}

	> p:nth-of-type(1) {
		font-size: 14px;
		font-weight: 400;
		color: #ffffff;
		line-height: 19px;
		opacity: 0.8;
		text-align: center;
		margin-bottom: 20px;
	}

	.result-image {
		width: 246px;
		height: 291px;
		margin: 20px auto;
		padding: 70px 20px 0;
		background: url("../../assets/image/newuser/resultbg.png") no-repeat top left / contain;

		img {
			width: 100%;
		}

		p {
			text-align: center;
			font-size: 14px;
			font-weight: 600;
			color: #ffffff;
			line-height: 19px;
			opacity: 0.8;
		}
	}
}

.new-register .step-two-one {
	width: 70%;
	margin: auto;
}

.roll-box {
	width: 271px;
	margin: auto;
	display: flex;

	> div {
		width: 127px;
		margin-left: 14px;
	}
}

.charge-tips {
	font-size: 14px;
	text-align: center;
	font-weight: 400;
	color: #ffffff;
	line-height: 18px;
	margin: 25px auto;
	background: rgba(43, 24, 27, 0.7);
	border: 0px solid #000000;
	padding: 5px 0;

	> span {
		color: #ecca36;
	}
}

.charge-way {
	display: flex;
	gap: 5px;

	> div {
		width: 113px;
		height: 36px;
		background: rgba(26, 11, 20, 0.8);
		border: 1px solid rgba(255, 206, 214, 0.3);
		cursor: pointer;

		&.active {
			box-shadow: 0px 1px 10px 1px rgba(234, 219, 53, 0.5);
		}
	}
}

.charge-input {
	display: flex;
	margin-top: 10px;
	align-items: center;
	height: 120px;

	/deep/ .ivu-input-number-input {
		border: 1px solid #ffced6 !important;
		background: #1b0a11 !important;
	}

	p {
		font-size: 16px;
		font-family: PingFang SC;
		font-weight: 600;
		color: #ecca36;
		line-height: 18px;
		padding-left: 5px;
	}
}

.register-qrcode {
	width: 170px;
	height: 180px;
	margin-left: 10px;
	padding: 15px 24px;
	background: url("../../assets/image/newuser/codebg.png") no-repeat top left / contain;
}

.box-opening {
	width: 597px;
	height: 153px;
	background: linear-gradient(90deg, rgba(20, 23, 39, 0.01), #2d1d0e, rgba(20, 23, 39, 0.01));
	border: 0px solid #000000;
	box-shadow: 0px 14px 22px 1px rgba(104, 72, 22, 0.5);
	position: relative;
	margin: auto;
	padding-top: 32px;

	> img {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 100%;
		width: 20%;
		z-index: 2;
	}
}

.box-ani {
	overflow: hidden;

	> div {
		display: flex;
		width: max-content;

		> div {
			width: 140px;
			height: 87px;
			padding-top: 10px;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-right: 11px;
		}
	}
}

.free-box {
	height: 98px;
	width: 179px;
	margin: auto;

	img {
		width: 100%;
	}
}

.open-register {
	width: 56vw;
	font-size: 5.33vw;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}

.roll-time-num span {
	display: inline-block;
	margin: 0 5px;
	width: 35px;
	height: 35px;
	border-radius: 5px;
	text-align: center;
	line-height: 30px;
	font-weight: bold;
	color: #ff3d37;
	font-size: 24px;
	background: #211b10;
	border: 1px solid rgba(161, 126, 59, 0.5);
}

.roll-time-text {
	color: #bb7d02;
}

.active-charge {
	width: auto;
}

.active-charge > div {
	margin-right: 0;
}

@media screen and (max-width: 767px) {
	.new-user-box {
		width: 100%;
	}

	.active-charge > div {
		width: 203px;
		margin-bottom: 0;
	}

	.modal-bg.show .modal-box-bg {
		width: 96%;
		user-select: none;
	}

	.step-line {
		width: 80%;
	}

	.step-item {
		width: 100%;
	}

	.modal-box > img {
		top: 0;
		right: 0;
		width: 11%;
		position: absolute;
	}

	.charge-tips {
		padding: 4px 10px;
		margin: 14px auto;
	}

	.charge-way {
		flex-wrap: wrap;
		justify-content: space-between;

		> div {
			margin-bottom: 3px;
		}
	}

	.charge-input {
		height: auto;
	}

	.excharge-rate {
		margin-bottom: 10px;

		> p {
			text-align: center;
			font-size: 13px;
			color: #ecca36;
			font-weight: bold;
		}
	}

	.roll-box {
		width: 90%;
		justify-content: space-between;

		> div {
			width: 47%;
			margin-left: 0;
		}
	}

	.new-register {
		padding: 0 43px;
		width: 100%;
		background: url("../../assets/image/newuser/bgm.png") no-repeat top ;
		background-position-y: 28px;
	}

	.phone-code {
		> div {
			width: 170px;
			margin: 50px auto;
		}
	}

	.box-opening {
		width: 80%;
	}
}
</style>
