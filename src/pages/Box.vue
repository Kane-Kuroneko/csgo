<template>
	<div class="open-box-del" style="padding-bottom: 0.5rem">
		<!--        开箱箱子详情-->
		<div class="opn-box-bg" :class="{ active: box.isNew }">
<!--			<Title class="layout mar-auto" :name="box.name"></Title>-->
			<HrTitle :title="box.name"></HrTitle>
			<div class="del-box">
				<!--    箱子名称-->
				<div class="layout" style="margin: auto">
					<!--    开箱数 赠送数-->
					<div style="position: relative">
						<div
							class="route-back cursor hide-m"
							style="left: 29%; top: 9%"
							@click="$router.go(-1)"
						>
							<img width="21" :src="imgBack">
							<span style="margin-left: 4px">返回列表</span>
						</div>
						<div class="go-offcial cursor hide-m" @click="openOfficial">
							<img src="../assets/image/csgo/offcial.png" alt="" />
							<span>官箱模式</span>
						</div>
						<div class="num-progress-music">
							<!--     开箱总次数-->
							<div class="open-box-progress" v-show="box.boxType === 0">
								<div class="process-ball-circle">
									<!--<div id="ball" class="process-ball"></div>-->
									<div>
										<CircleC
											:percent="process"
											:size="50"
											:stroke-width="6"
											:trail-width="6"
											stroke-linecap="square"
											:stroke-color="['#00fffc', '#00fffc']"
											trail-color="rgba(255,255,255,0)"
										>
											<slot>
												<p style="color: #00fffc">{{ process }}%</p>
											</slot>
										</CircleC>
									</div>
								</div>
								<div class="process-box-text">
									<p
										class="process-txt2"
										v-if="saleNums - hasOpen === 0"
									>
										恭喜您获得免费开箱一次
									</p>
									<p class="process-txt1" v-else>
										买{{ saleNums }}送1,再购买{{
											saleNums - hasOpen
										}}次可免费开启
									</p>
								</div>
							</div>
							<div
								v-if="false"
								@click="
									fairShow = true;
									fairTips = true;
									hashSeed = false;
								"
								v-show="box.boxType === 1"
								class="open-box-progress"
								style="margin: 0 0.6rem"
							>
								<div class="process-ball-circle">
									<i class="iconfont icon-icon_fair"></i>
								</div>
								<div class="process-box-text" style="color: #ffca6e">
									公平游戏
								</div>
							</div>
							<div
								class="open-box-progress"
								style="margin: 0 0.6rem; padding: 0 5px"
								v-if="box.boxType > 1"
							>
								<div
									:class="{
										'filter-color':
											Math.floor((box.amount / box.codeMap) * 100) <
											100,
									}"
									class="process-ball-circle"
									style="padding-top: 10px; background: none"
									align="center"
								>
									<img
										src="../assets/image/box/taskFinish.png"
										alt=""
										width="100%"
									/>
								</div>
								<div
									class="process-box-text"
									style="
										font-size: 0.2rem;
										padding: 0 20px;
										width: 200px;
									"
								>
									<p class="process-box-text">{{ box.remarks }}</p>
									<div>
										<div
											:style="{
												width:
													box.codeMap == 0
														? '100'
														: Math.floor(
																(box.amount / box.codeMap) *
																	100,
														  ) + '%',
												background:
													box.codeMap == 0
														? 'rgba(42, 252, 1, 1)'
														: Math.floor(
																(box.amount / box.codeMap) *
																	100,
														  ) >= 100
														? 'rgba(42, 252, 1, 1)'
														: '#ffffff',
											}"
										></div>
									</div>
								</div>
							</div>
							<!--                    开关音乐特性-->
							<div
								@click="toggleMute()"
								class="open-box-music"
							>
								<div>
									<img width="41" :src="mute ? imgMute : imgUnmute">
								</div>
							</div>
							<div class="fairGame" v-if="box.boxType == 1">
								<div @click="getHashHis" class="upgrade-style">
									<i class="iconfont iconicon-history"></i>
									开箱历史
								</div>
							</div>
						</div>
						<OpenBox
							:openBoxRatio="openBoxRatio"
							@boxstatus="boxstatus"
						></OpenBox>
					</div>
				</div>
			</div>
		</div>
		<!--        掉落物品详情-->
		<div class="item-drop layout">
			<div v-if="false" class="drop-title">
				<img src="../assets/image/boxLine.png" alt="" />
				<span> 箱内饰品</span>
				<img
					src="../assets/image/boxLine.png"
					alt=""
					style="transform: rotateY(180deg)"
				/>
			</div>
			
			<img :src="imgPreciousInBox" class="precious-in-box" width="100%">

			<div class="drop-del">
				<SkinsItem :skins-data="artical" :isProbability="true"></SkinsItem>
			</div>
		</div>
		<!--        公平游戏-->
		<Hash-Module v-model="fairShow" :width="9" title="公平游戏">
			<div class="hash" v-show="hashSeed">
				<div class="hash-top">
					<div class="seed-title">
						<div></div>
						<p>种子信息</p>
						<div></div>
					</div>
					<div style="margin-bottom: 0.2rem">
						<div class="fair-item">
							<Row>
								<ColC span="6" class="hide-m">
									<span>用户种子：</span>
								</ColC>
								<span style="text-align: left" class="hide-p hide-ipad"
									>用户种子：
								</span>
								<ColC :xs="12" :md="10">
									<Input
										size="large"
										:maxlength="16"
										v-model="userSeed"
										placeholder="登录后查看"
									/>
								</ColC>
								<ColC :xs="6" :md="4">
									<div
										class="default-btn user-btn"
										@click="changeSeed()"
									>
										修改
									</div>
								</ColC>
								<ColC :xs="6" :md="4">
									<div
										class="default-btn user-btn"
										@click="randomSeed()"
									>
										随机
									</div>
								</ColC>
							</Row>
						</div>
						<div class="fair-item">
							<Row
								v-for="item in hash"
								style="margin-bottom: 10px"
								:key="item.hash"
							>
								<ColC span="6" class="hide-m">
									<span>服务器种子hash：</span>
								</ColC>
								<span style="text-align: left" class="hide-p hide-ipad"
									>服务器种子hash：
								</span>
								<ColC :xs="20" :md="14">
									<Input
										style="opacity: 0.5"
										size="large"
										v-model="item.hash"
										placeholder="登录后查看"
										disabled
									/>
								</ColC>
								<ColC span="4">
									<div
										@click="copy(item.hash)"
										class="default-btn user-btn"
									>
										复制
									</div>
								</ColC>
							</Row>
						</div>
					</div>
					<div class="seed-title">
						<div></div>
						<p>种子说明</p>
						<div></div>
					</div>
					<p style="line-height: 30px">
						*在您开始游戏前，您可以任意修改您的用户种子，以保证该局游戏的公平性；
						<br />
						*为了方便您管理自己的种子，您设置的种子将用于所有需要Hash算法的游戏；
						<br />
						*如需在游戏后对该局游戏进行验证，请提前复制服务器种子Hash值并保存，以验证并确保游戏前后服务器所给出的种子一致；
						<br />
						*游戏公平Hash算法详细规则请参考网页顶部《公平性游戏》；
					</p>
				</div>
			</div>
			<div v-show="fairTips" class="fair-price">
				<div class="fair-price-left">
					<h3>- 箱子价格 -</h3>
					<div>
						<p>箱子价格由物品价格和设定的每件物品的开箱概率共同决定。</p>
						<p>假如在箱子中三件饰品分别为A,B,C ；</p>
						<p>
							A饰品对应的价格为
							<i
								class="iconfont icon-icon_diamond1 font-s fdc-color"
							></i>
							50，概率为20%；
							<br />
							B饰品对应的价格为
							<i
								class="iconfont icon-icon_diamond1 font-s fdc-color"
							></i>
							100，概率为50%；
							<br />
							C饰品对应的价格为
							<i
								class="iconfont icon-icon_diamond1 font-s fdc-color"
							></i>
							60，概率为30%；
						</p>
						<div class="box-single">
							<p>那么箱子的初始单次开箱价格为：</p>
							<span
								>50×0.2 + 100×0.5 + 60×0.3 =
								<i
									class="iconfont icon-icon_diamond1 font-s fdc-color"
								></i>
								78
							</span>
						</div>
						<div>
							<p>
								为了维持网站的运营，我们设定实际的开箱价格略高于初始开箱价格，箱子的最终开箱价格为
							</p>
							<span>
								<i
									class="iconfont icon-icon_diamond1 font-s fdc-color"
								></i>
								78 ≈
								<i
									class="iconfont icon-icon_diamond1 font-s fdc-color"
								></i>
								78.5
							</span>
						</div>
						<div class="box-single">
							<p>所有箱子价格保留到小数点后两位</p>
						</div>
					</div>
				</div>
				<div class="fair-price-left">
					<h3>- 开箱结果 -</h3>
					<div>
						<p>
							开箱结果由Hash算法之后的结果Number决定，由于结果Number是在0-1范围内完全随机分布的，所以每个箱子的每件饰品需要按照排列顺序和概率转换为0-1对应的数值
						</p>
					</div>
					<div class="box-single">
						<span>
							A饰品的概率为20%，对应数值为0.2；
							<br />
							Number ∈（ 0,0.2 ] 时，您将获得饰品A
						</span>
					</div>
					<div class="box-single">
						<span>
							B饰品的概率为50%，对应数值为0.5；
							<br />
							Number ∈（ 0.2,0.7 ] 时，您将获得饰品B
						</span>
					</div>
					<div class="box-single">
						<span>
							C饰品的概率为30%，对应数值为0.3；
							<br />
							Number ∈（ 0.7,1 ] 时，您将获得饰品C
						</span>
					</div>
				</div>
			</div>
		</Hash-Module>
		<!--        历史-->
		<hash-module v-model="boxHistory" title="开箱历史" :width="10">
			<template v-if="el.length > 0">
				<Scroll
					:on-reach-bottom="handleReachBottom"
					class="history-list"
					:height="$store.state.account.isPhone ? 400 : 500"
				>
					<div class="modal-his">
						<div
							class="modal-his-item"
							v-for="(el, idx) in el"
							:key="idx"
						>
							<p>{{ el.createdTime }}</p>
							<div class="hide-m">
								<Row>
									<ColC span="6">
										<SkinsItem
											:skins-data="[el]"
											:is-price="false"
											:isProbability="true"
										></SkinsItem>
									</ColC>
									<ColC span="18">
										<div style="padding: 10px 15px">
											<div class="his-p">
												<p>
													服务器种子Hash:{{
														el.calculateLog.serverHash
													}}
												</p>
												<p>
													服务器种子:
													{{ el.calculateLog.serverKey }}
												</p>
												<p>
													用户种子: {{ el.calculateLog.clientKey }}
												</p>
												<p>
													结果种子Hash:
													{{ el.calculateLog.resultHash }}
												</p>
												<p
													:title="
														parseFloat(
															parseInt(
																sha256_digest(
																	el.calculateLog.clientKey +
																		el.calculateLog.serverKey,
																).substring(0, 6),
																16,
															) / parseInt('ffffff', 16),
														)
													"
												>
													Number=
													{{
														sha256_digest(
															el.calculateLog.clientKey +
																el.calculateLog.serverKey,
														).substring(0, 6)
													}}(16进制) / ffffff(16进制)=
													{{
														parseInt(
															sha256_digest(
																el.calculateLog.clientKey +
																	el.calculateLog.serverKey,
															).substring(0, 6),
															16,
														) || "暂无"
													}}
													/ {{ parseInt("ffffff", 16) }} =
													<span style="color: rgb(101, 255, 175)"
														>{{
															parseFloat(
																parseInt(
																	sha256_digest(
																		el.calculateLog
																			.clientKey +
																			el.calculateLog
																				.serverKey,
																	).substring(0, 6),
																	16,
																) / parseInt("ffffff", 16),
															) || "暂无"
														}}
													</span>
												</p>
											</div>
											<div class="upgrade-btn-box">
												<div
													class="default-btn"
													@click="
														goEmn(el.calculateLog.serverHash)
													"
												>
													验证
												</div>
												<div
													class="default-btn"
													@click="
														go16(
															sha256_digest(
																el.calculateLog.clientKey +
																	el.calculateLog.serverKey,
															).substring(0, 6),
														)
													"
												>
													16进制转换
												</div>
											</div>
										</div>
									</ColC>
								</Row>
							</div>
							<div class="hide-ipad hide-p">
								<div class="his-img">
									<div
										:class="
											'drop-qua-' +
											conversionStyle(el.rarity, el.category)
										"
									>
										<img
											v-lazy="el.image"
											style="width: 80%"
											alt=""
										/>
									</div>
									<div class="drop-gun-del">
										<p>
											<i
												class="iconfont iconicon-bg"
												:class="
													'drop-gun-' +
													conversionStyle(el.rarity, el.category)
												"
											></i>
											{{ el.name.split("|")[0] }}
										</p>
										<p>{{ el.name.split("|")[1] }}</p>
										<h6
											class="progress-scope"
											style="margin-top: 0.2rem"
										>
											概率 {{ (el.probability * 100).toFixed(2) }}%
										</h6>
										<!--                                        <h6 class="progress-scope">-->
										<!--                                            中奖范围 ({{(el.scope.startProbability)}} &#45;&#45;-->
										<!--                                            {{(el.scope.endProbability)}})-->
										<!--                                        </h6>-->
									</div>
								</div>
								<div
									class="his-p"
									style="padding: 0.1rem; margin-top: 0.1rem"
								>
									<p>
										服务器种子Hash:{{ el.calculateLog.serverHash }}
									</p>
									<p>服务器种子: {{ el.calculateLog.serverKey }}</p>
									<p>用户种子: {{ el.calculateLog.clientKey }}</p>
									<p>结果种子Hash: {{ el.calculateLog.resultHash }}</p>
								</div>
								<div>
									<div
										class="hash-probility-m"
										style="padding: 0 0.1rem"
									>
										Number=
										{{
											sha256_digest(
												el.calculateLog.clientKey +
													el.calculateLog.serverKey,
											).substring(0, 6)
										}}(16进制) / ffffff(16进制)=
										{{
											parseInt(
												sha256_digest(
													el.calculateLog.clientKey +
														el.calculateLog.serverKey,
												).substring(0, 6),
												16,
											) || "暂无"
										}}
										/ {{ parseInt("ffffff", 16) }} =
										<span style="color: rgb(101, 255, 175)">
											{{
												parseFloat(
													parseInt(
														sha256_digest(
															el.calculateLog.clientKey +
																el.calculateLog.serverKey,
														).substring(0, 6),
														16,
													) / parseInt("ffffff", 16),
												) || "暂无"
											}}
										</span>
									</div>
								</div>
								<div class="his-m-btn">
									<div
										class="default-btn"
										@click="goEmn(el.calculateLog.serverHash)"
									>
										验证
									</div>
									<div
										class="default-btn"
										@click="
											go16(
												sha256_digest(
													el.calculateLog.clientKey +
														el.calculateLog.serverKey,
												).substring(0, 6),
											)
										"
									>
										16进制转换
									</div>
								</div>
							</div>
						</div>
					</div>
				</Scroll>
			</template>
			<Empty v-else></Empty>
		</hash-module>
		<CsgoBoxType
			ref="csgoBoxType"
			:skins-img="artical"
			:box="box"
			v-show="officialCsgo"
		></CsgoBoxType>
	</div>
</template>

<script>
import echarts from "echarts";
import echartsLiquidfill from "echarts-liquidfill";
import { getAction } from "../api/manage";
import Empty from "../components/Empty/Empty";
import OpenBox from "../views/OpenBox";
import { sha256_digest } from "../utils/sha256";
import { mapActions, mapState, mapMutations } from "vuex";
import Title from "../components/Title";
import HashModule from "../components/HashModule/HashModule";
import CsgoBoxType from "@/pages/CsgoBoxType";
import SkinsItem from "@/components/SkinsItem";
import { reaxel_user } from "@/reaxels/user";
import {HrTitle} from '@/New.Components';
import imgBack from './Box.assets/back.svg';
import imgMute from './Box.assets/mute.svg';
import imgUnmute from './Box.assets/unmute.svg';
import imgPreciousInBox from './Box.assets/img.png';
import imgFariGame from './Box.assets/img_1.png';
import { reaxel_Audio } from '@/reaxels/initial/audio';
const reax_User = reaxel_user();
const { toggleMute } = reaxel_Audio();
export default reaxper({
	status(){
		const { mute } = reaxel_Audio();
		return {
			mute,
		}
	},
	components: {
		HashModule,
		OpenBox,
		Empty,
		Title,
		CsgoBoxType,
		SkinsItem,
		HrTitle,
	},
	data() {
		return {
			imgFariGame,
			imgPreciousInBox,
			imgMute,
			imgUnmute,
			imgBack,
			echarts,
			sha256_digest,
			fairShow: false,
			fairTips: false,
			hashSeed: false,
			boxHistory: false,
			el: [],
			saleNums: 0,
			hasOpen: 0,
			officialCsgo: false,
			openBoxRatio: 1,
			isOpening: false, // 是否正在开箱
			maxOpenBox: 5, // 最大开箱数
			ballChart: null,
			circleChart: null,
			page: 1,
			count: 10,
			process: 0,
			artical: [],
			gameType: {},
			userSeed: "",
			hash: [{ hash: "" }],
			opening: false,
			box: {},
			url: {
				stuff: "/api/home/box/stuff",
				preview: "/api/home/preview",
				record: "/api/box/hash/box/record",
				count: "/api/home/open/box/count",
				free: "/api/home/box/free/count",
				detail: "/api/task/details",
			},
		};
	},
	watch: {
		fairShow: function (nv, ov) {
			if (nv && this.user.id) {
				this.getHash();
			}
		},
	},
	computed: {
		...mapState("account", {
			boxDiscount: (state) =>
				state.userDiscount.openBox
					? state.userDiscount.openBox
					: { discount: 1 },
		}),
		...mapState("account", {
			user: (state) => state.user,
		}),
	},
	created() {
		this.box = JSON.parse(localStorage.getItem("box"));
		this.userSeed = localStorage.getItem("userSeed");
		if (this.box.boxType === 0) {
			this.getFree();
		}
		this.getBoxStuff();
	},
	methods: {
		toggleMute,
		...mapActions("account", ["getUser"]),
		...mapMutations("account", ["updateBagNum"]),
		openOfficial() {
			if (!this.user.id) return this.$login();
			this.officialCsgo = true;
		},
		handleReachBottom() {
			return new Promise((resolve) => {
				this.page++;
				let params = {
					current: this.page,
					size: this.count,
					boxId: this.box.id,
				};
				getAction(this.url.record, params).then((res) => {
					if (res.data.records.length === 0) --this.page;
					res.data.records.forEach((el) => {
						el.calculateLog = JSON.parse(el.calculateLog);
						el.stuffPrizeList.forEach((item) => {
							if (el.image === item.image) {
								el.scope = item;
							}
						});
					});
					this.el.push(...res.data.records);
				});
			});
		},
		goEmn(str) {
			this.$copyText(str).then((e) => {
				this.$Message.success("复制成功");
				window.open(
					"https://emn178.github.io/online-tools/sha256.html",
					"_blank",
				);
			});
		},
		go16(str) {
			this.$copyText(str).then((e) => {
				this.$Message.success("复制成功");
				window.open("https://tool.oschina.net/hexconvert/", "_blank");
			});
		},
		getHash() {
			let params = { count: this.openBoxRatio };
			getAction(this.url.preview, params).then((res) => {
				this.hash = res.data;
			});
		},
		boxstatus(value) {
			this.isOpening = value;
		},
		getHashHis() {
			const getHash = () => {
				let parmas = { boxId: this.box.id };
				getAction(this.url.record, parmas).then((res) => {
					this.boxHistory = true;
					res.data.records.forEach((el) => {
						el.name1 = el.name.split("|")[0];
						el.name2 = el.name.split("|")[1];
						el.calculateLog = JSON.parse(el.calculateLog);
						// el.stuffPrizeList.forEach(item => {
						//     if (el.image === item.image) {
						//         el.scope = item
						//     }
						// })
					});
					this.el = res.data.records;
				});
			};

			if (!reax_User.userStore.token || !reax_User.userStore.profile) {
				reax_User.openLoginModal().then(() => {
					getHash();
				});
				return;
			} else if (this.isOpening) {
				return this.$Message.info("开箱过程中,请误操作");
			}else {
				getHash();
			}
		},
		copy(str) {
			this.$copyText(str).then((e) => {
				this.$Message.success("复制成功");
			});
		}, // 买N送1
		getFree() {
			getAction(this.url.free).then((res) => {
				this.saleNums = res.data;
				if (localStorage.getItem("token")) {
					//如果登录才获取已开箱次数
					this.getBoxCount();
				}
			});
		},
		getBoxCount() {
			//获取已开箱次数
			let params = { boxId: this.box.id };
			getAction(this.url.count, params).then((res) => {
				this.hasOpen = res.data;
				this.process = parseInt((this.hasOpen / this.saleNums) * 100);
			});
		},
		async getBoxStuff() {
			this.$Spin.show();
			let params = { boxId: this.box.id };
			try {
				if (this.box.boxType < 2) {
					let res = await getAction(this.url.stuff, params);
					this.artical = this.handleData(res.data, res.data[0].game);
					this.$refs.csgoBoxType.prizePool.push(...this.artical);
					for (let i = 0; i < 50 - this.artical.length; i++) {
						this.$refs.csgoBoxType.prizePool.push(
							this.artical[i % this.artical.length],
						);
					}
					// 随机分布
					let length = this.$refs.csgoBoxType.prizePool.length;
					let array = this.$refs.csgoBoxType.prizePool;
					for (let i = 0; i < length; i++) {
						let randomIndex =
							Math.floor(Math.random() * (length - i)) + i;
						[array[i], array[randomIndex]] = [
							array[randomIndex],
							array[i],
						];
					}
				} else {
					let res = await getAction(this.url.detail, params);
					this.gameType = res.data;
					this.gameType.name = this.taskType(this.gameType.taskName);
					this.artical = this.handleData(
						res.data.stuffVOList,
						res.data.stuffVOList[0].game,
					);
				}
				this.$Spin.hide();
			} catch (e) {
				this.$Spin.hide();
			}
		},
		handleData(data, type) {
			type = type === 730 ? "csgo" : "dota";
			data.map((item) => {
				let splitStr = type === "csgo" ? "|" : " ";
				let name = item.name.split(splitStr);
				item.name1 = name[0];
				item.name2 = name.splice(1, name.length).join("｜");
				item.random = this.conversionStyle(item.rarity, item.category);
			});
			return data;
		},
	},
});
</script>

<style scoped lang="less">

.precious-in-box{
	display: block;
	margin: 40px 0;
}

.open-box-music{
	
	img{
		display: block;
	}
}



.ivu-switch {
	border: 0px solid #030000;
	height: 0.24rem;
	/*width: .6rem;*/
}

.roll-ranking ul.active {
	padding: 10px 4%;
}

.roll-luck-item p {
	text-align: center;
	font-size: 12px;
}

.roll-luck-item div:nth-of-type(3) {
	text-align: center;
}

.ivu-switch:after {
	position: absolute;
	top: 0;
	transform: translateY(-2px);
	height: 0.29rem;
	width: 0.29rem;
	background: #d89532;
	border: 0px solid #030000;
	box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.25);
	left: -18%;
}

.upgrade-style{
	display: flex;
	align-items: center;
	white-space: nowrap;
	
	i {
		margin-right: 1.3vw;
	}
}

.ivu-switch-checked:after {
	left: 55%;
}

/deep/ .ivu-input {
	background: #98a8b4;
	border: 0px solid #030000;
	box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
	border-radius: 3px;
}

/deep/ .ivu-input[disabled] {
	color: #fffffe;
}

/deep/ .ivu-modal-body {
	padding: 0;
}

/deep/ .home-title {
	padding: 0.6rem 0 0;
}

.user-btn {
	height: 35px;
	line-height: 200%;
	font-size: 15px;
}
</style>
