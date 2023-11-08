<template>
	<div
		class = "open-box-immeility"
		:class = "{ 'open-box-immeility-m': isMobile }"
		:style="{'background-image':`url('${imgBoxBg}')`}"
	>
		<template v-if = "isOpen">
			<div
				class = "immeility-open"
			>
				<div
					class = "box-img"
					style = "width: 3rem"
				>
					<div
						class = "home-box-img"
						:class = "'active' + openBoxRatio"
						v-for = "item in openBoxRatio"
						:key = "item.background"
					>
						<img
							:src = "imgHost(box.background)"
							style = "height: 100%"
						/>
						<img
							:src = "imgHost(box.image)"
							style = "height: 70%"
						/>
					</div>
				</div>
			</div>
			<!--                    开箱数-->
			<div
				class = "open-box-num-m"
				v-if = "box.boxType < 2"
			>
				<ul class = "num-chosed">
					<li
						v-for = "number in maxOpenBox"
						:class = "{ active: number === openBoxRatio }"
						@click = "widthAni(number)"
						:style="{'background-image': number === openBoxRatio ? `url('${imgSelected}')`: `url('${imgUnselected}')`}"
					>
						{{ number }}
					</li>
				</ul>
			</div>
			<span
				class = "original-price"
				v-show = "box.boxType < 2"
				style = "margin-right: 5px"
				v-if = "box.discount < 1"
			>
				<i class = "iconfont icon-icon_diamond2 diamond-two"></i>
				{{ boxPrice.toFixed(2) }}
			</span>
			
			<div
				@click = "openBox"
				class="open-box-btn"
				:style="{'background-image':`url('${imgOpenBoxBg}')`}"
			>
				{{ $parent.gameType.flag ? "已开启" : `💎${boxPrice.toFixed(2)}   开箱` }}
			</div>
			
			<div
				v-if="false"
				class = "box-price hide-m"
				:class = "{ active: box.boxType > 1 }"
			>
				<div
					class = "default-btn"
					:class = "{
						'unfinish-task':
							$parent.gameType.amount < +$parent.gameType.codeMap,
					}"
					@click = "openBox"
				>
					<div
						class = "discount-price"
						v-if = "box.boxType < 2"
					>
						<img
							v-show = "boxDiscount.endTime"
							src = "../assets/image/newyear/discount.png"
							alt = ""
						/>
						<i class = "iconfont icon-icon_diamond1 diamond-two"></i>
						{{ boxPrice.toFixed(2) }}
					</div>
					<div
						:style="{'background-color':`url('${imgOpenBoxBg}')`}"
						class = "open-right-now"
					>
						{{ $parent.gameType.flag ? "已开启" : "开箱" }}
					</div>
				</div>
				<div
					v-show = "box.boxType == 1"
					@click = "fairGame"
					class = "change-seed"
				>
					<i class = "iconfont icon-icon_upgrade"></i>
					修改种子
				</div>
				<TimeCount
					ref = "timeCount"
					v-if = "
						boxDiscount.endTime &&
						!$store.state.account.isPhone &&
						box.boxType < 2
					"
					:time = "boxDiscount.endTime"
				>
					<img
						src = "../assets/image/newyear/dcounts.png"
						alt = ""
					/>
				</TimeCount>
			</div>
			
			<img
				v-if="!isPhone"
				class="change-seed-new"
				:src="imgChangeSeed"
				@click="fairGame"
			>
			<br>
			<div class = "game-tips-words hide-m">
				本站所有游戏道具，只能本人取回到游戏内使用，均不允许站内交易及互换
			</div>
			<div
				v-if="false"
				class = "box-price hide-p hide-ipad"
			>
				<div
					class = "default-btn"
					:class = "{
						'unfinish-task':
							$parent.gameType.amount < +$parent.gameType.codeMap,
					}"
					@click = "openBox"
				>
					<div
						class = "discount-price"
						v-if = "box.boxType < 2"
					>
						<img
							v-show = "boxDiscount.endTime"
							src = "../assets/image/newyear/discount.png"
							style = "width: 35%"
							alt = ""
						/>
						&nbsp;<i class = "iconfont icon-icon_diamond1 diamond-two"></i
					>
						{{ boxPrice.toFixed(2) }}
					</div>
					<div class = "open-right-now">
						{{ $parent.gameType.flag ? "已开启" : "开箱" }}
					</div>
				</div>
			</div>
			<TimeCount
				ref = "timeCountM"
				style = "margin: auto"
				v-if = "
					boxDiscount.endTime &&
					$store.state.account.isPhone &&
					box.boxType < 2
				"
				:time = "boxDiscount.endTime"
			>
				<img
					src = "../assets/image/newyear/dcounts.png"
					alt = ""
				/>
			</TimeCount>
			<div
				v-show = "box.boxType == 1"
				style = "margin: 0.2rem auto 20px"
				@click = "fairGame"
				class = "fair-game hide-p hide-ipad"
			>
				<i class = "iconfont icon-icon_upgrade"></i>
				修改种子
			</div>
			<div class = "game-tips-words hide-p hide-ipad">
				本站所有游戏道具，只能本人取回到游戏内使用，均不允许站内交易及互换
			</div>
		</template>
		<template v-else>
			<div>
				<div
					class = "prize-pool"
					:class = "{ 'prize-pool-m': isMobile }"
				>
					<div
						v-for = "(lottery, index) in openBoxData"
						:key = "`lottery-${index}`"
					>
						<div
							class = "pool-shadow"
							:style="{'background-image':`url('${imgOpenRowBg}')`}"
							ref = "pool"
						>
							<ul :style = "lottery.style">
								<li
									v-for = "(prize, index1) in lottery.prizePool"
									:key = "index1"
									:class = "
										'qua-box-' +
										conversionStyle(prize.rarity, prize.category)
									"
									:id = "`item-${index}-${index1}`"
									:ref = "`item-${index}-${index1}`"
								>
									<img
										:src = "prize.image"
										alt = ""
										style = "width: 100%"
									/>
								</li>
							</ul>
						</div>
						<div
							v-if = "index === freeBoxIndex && !isHsahBox"
							class = "free-box-tag"
						>
							<img
								src = "../assets/image/free.png"
								alt = ""
							/>
						</div>
						<div
							class = "the-pointer"
							:style="{'background-image':`url('${imgPointer}')`}"
						/>
					</div>
				</div>
			</div>
		</template>
		<!-- 通知弹窗 -->
		<div
			class = "modal-bg-box special"
			:class = "{ show: show, 'special-m': isMobile }"
		>
			<div
				class = "modal-box-bg-box"
				:class = "{ show: show, 'modal-box-bg-box-m': isMobile }"
			>
				<div
					class = "modal-box-box"
					:class = "{ 'modal-box-box-m': isMobile }"
				>
					<div
						class = "box-result-shell"
						:class = "{ 'box-result-shell-m': isMobile }"
					>
						<i
							class = "iconfont iconicon-close"
							@click = "sellAllOrInstorage('storage')"
						>
							关闭
						</i
						>
						<div
							class = "box-result skins-con"
							@click = "choseGoods(el)"
							:class = "[
								{
									'box-result-m': isMobile,
									special: el.price > box.discountPrice,
								},
								'boders-' +
									conversionStyle(el.skinsRarity, el.category),
							]"
							v-for = "(el, idx) in resultData.prizes"
							:key = "idx"
						>
							<div
								align = "center"
								class = "result-img"
								:class = "
									'drop-qua-' +
									conversionStyle(el.skinsRarity, el.category)
								"
								style = "border: none; height: 1.8rem"
							>
								<img
									src = "../assets/image/box/win.png"
									alt = ""
									v-show = "el.price > box.discountPrice"
								/>
								<img
									:src = "el.stuffImage"
									style = "width: 60%"
									alt = ""
								/>
							</div>
							<div class = "sell-name">
								<p>{{ el.stuffName.split("|")[0] }}</p>
								<p>
									{{
										el.stuffName.split("|")[1] ? el.stuffName.split("|")[1] : ""
									}}
								</p>
							</div>
							<p v-if = "resultData.length === 1">
								<i class = "iconfont icon-icon_diamond1 fdc-color"></i>
								<span>{{ el.price.toFixed(2) }}</span>
							</p>
							<div
								v-else
								class = "sell-single-skin"
							>
								<p :class = "{ 'text-align': isFree }">
									<i class = "iconfont icon-icon_diamond1 fdc-color"></i>
									{{ el.price.toFixed(2) }}
								</p>
								<div
									class = "bag-chosed"
									v-if = "!isFree"
									:class = "{ 'check-position-ture': el.chosed }"
								>
									<i class = "iconfont iconicon-select"></i>
								</div>
							</div>
							<img
								v-if = "el.levelName != 0"
								:src = "
									require(`../assets/image/stone${el.levelName}.png`)
								"
								alt = ""
								class = "stone-open"
							/>
						</div>
					</div>
					<div>
						<div>
							<p
								class = "close-module"
								v-show = "box.boxType < 2"
								v-if = "!isFree"
							>
								{{ count }}s 后自动放入背包
							</p>
						</div>
					</div>
					<div
						class = "btn-box"
						:class = "{ 'btn-box-m': isMobile }"
						v-if = "!isFree"
						v-show = "box.boxType < 2"
					>
						<div style = "justify-content: center">
							<div
								class = "default-btn into-btn"
								@click = "sellAllOrInstorage('storage')"
							>
								放入背包
							</div>
						</div>
					</div>
					<div
						class = "btn-box-free"
						v-else
					>
						<p style = "text-align: center; font-size: 14px">
							试玩概率与真实概率无关
						</p>
						<div>
							<div
								class = "default-btn all-btn"
								style = "width: max-content"
								@click = "show = false"
							>
								确定
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<audio
			preload = "auto"
			src = "../assets/audio/slice3.wav"
			ref = "scrollWav2"
		/>
		<audio
			preload = "auto"
			src = "../assets/audio/open.wav"
			ref = "openBox"
		/>
		<audio
			preload = "auto"
			src = "../assets/audio/prize.mp3"
			ref = "audioPrize"
		/>
		<audio
			preload = "auto"
			src = "../assets/audio/prizeB.mp3"
			ref = "audioPrizeB"
		/>
	</div>
</template>

<script>
import {
	mapActions ,
	mapState,
} from "vuex";
import {
	getAction ,
	postAction,
} from "../api/manage";
import HashModule from "@/components/HashModule/HashModule";
import TimeCount from "@/components/NewYear/Module/TimeCount";
import imgBoxBg from './OpenBox.assets/img.png';
import imgUnselected from './OpenBox.assets/img_1.png';
import imgSelected from './OpenBox.assets/img_2.png';
import imgOpenBoxBg from './OpenBox.assets/img_3.png'
import imgChangeSeed from './OpenBox.assets/img_4.png';
import imgOpenRowBg from './OpenBox.assets/img_5.png';
import imgPointer from './OpenBox.assets/img_6.png'
import { reaxel_Audio } from '@/reaxels/initial/audio';
import { reaxel_initial } from '@/reaxels/initial';
const prizePoolCount = 80;
const minIndex = 50;
const maxIndex = 60;
const slice3 = require("../assets/audio/slice3.wav");



const reax_Audio = reaxel_Audio() , { toggleMute } = reax_Audio;
export default reaxper({
	status(){
		const { isPhone } = reaxel_initial().initialStore;
		const { mute } = reaxel_Audio();
		return {
			mute,
			isPhone,
		}
	},
	components : {
		HashModule ,
		TimeCount,
	} ,
	name : "openBox" ,
	data () {
		return {
			imgPointer,
			imgOpenRowBg,
			imgBoxBg,
			imgUnselected,
			imgSelected,
			imgOpenBoxBg,
			imgChangeSeed,
			isOpen : true ,
			isVideo : true ,
			isFree : false ,
			maxOpenBox : 5 ,
			openBoxRatio : 1 ,
			openBoxData : [] ,
			resultData : {
				no : "" ,
				prizes : [] ,
			} ,
			openLoading : false ,
			hasOpen : 0 ,
			saleNums : 0 ,
			lastBoxCount : 0 ,
			totalPrice : 0 ,
			show : false ,
			count : 3 , // 倒计时
			box : {} ,
			isMobile : false ,
			freeBoxIndex : null ,
			isHsahBox : true ,
			openRatio : 0 , // 开箱次数
			url : {
				open : "/api/boxGame/open" ,
				result : "/api/home/box/result" ,
				count : "/api/home/open/box/count" ,
				free : "/api/home/box/free/count" ,
				sale : "/api/boxGame/opertion" , // 出售物品
				info : "/api/home/skin/info" ,
			} ,
		};
	} ,
	computed : {
		...mapState("account" , [
			"activityRechargeAmount" ,
			"videoState",
		]) , ...mapState("account" , {
			boxDiscount : (state) => state.userDiscount.openBox ? state.userDiscount.openBox : { discount : 1 } ,
		}) , ...mapState("account" , {
			user : (state) => state.user ,
		}) ,
		boxPrice () {
			return parseFloat(this.costOfProduction.toFixed(2));
		} ,
		costOfProduction () {
			if ( this.$parent.box.boxType !== 0 ) {
				return ((this.$parent.box.price * this.boxDiscount.discount).toFixed(2) * this.openBoxRatio);
			}
			const discount = this.$parent.hasOpen + this.openBoxRatio > this.$parent.saleNums ? this.$parent.box.price : 0; // 计算满 n+1
			return parseFloat((this.$parent.box.price * this.openBoxRatio - discount).toFixed(2) );
		} ,
	} ,
	watch : {
		user : {
			handler (nv , ov) {
				if ( nv.id !== ov.id ) {
					this.$parent.getBoxCount();
				}
			} ,
		} ,
		show (nv) {
			if ( !nv ) {
				this.isOpen = true;
				this.$nextTick(() => {
					this.widthAni(this.openBoxRatio);
				});
			}
		} ,
	} ,
	beforeDestroy () {
		
	} ,
	mounted () {
		// 监听视频播放
		// this.$nextTick(() => {
		// 	this.$refs.videoPlay.addEventListener("play" , () => {
		// 		this.isVideo = false;
		// 	});
		// 	// 监听视频暂停
		// 	this.$refs.videoPlay.addEventListener("pause" , () => {
		// 		this.isVideo = true;
		// 	});
		// });
	} ,
	created () {
		this.equipment();
		this.getDiscount();
		this.box = JSON.parse(localStorage.getItem("box"));
		if ( !localStorage.getItem("userSeed") ) {
			localStorage.setItem("userSeed" , this.randomStr(false , 16 , 16));
		}
	} ,
	
	methods : {
		toggleMute,
		...mapActions("account" , [
			"getUser" ,
			"getDiscount",
		]) ,
		widthAni (number) {
			this.openBoxRatio = number;
			this.$parent.openBoxRatio = number;
			let words = document.querySelector(".box-img");
			let maxheight = number * 3;
			words.style.width = maxheight + "rem";
			words.style.transition = "all 1s";
		} ,
		fairGame () {
			this.$parent.fairShow = true;
			this.$parent.hashSeed = true;
			this.$parent.fairTips = false;
		} ,
		openBox () {
			if ( this.$parent.gameType.amount < + this.$parent.gameType.codeMap ) return;
			if ( this.$parent.gameType.flag ) return;
			this.openLoading = true;
			this.$emit("boxstatus" , this.openLoading);
			this.isFree = false;
			this.checkOpen().then(async () => {
				this.resultData = {
					no : "" ,
					prizes : [] ,
				};
				this.openBoxData = await this.initOpen(this.openBoxRatio);
				this.openRatio = this.openBoxRatio;
				this.freeBoxIndex = 9 - this.$parent.hasOpen;
				if ( this.$parent.box.boxType === 0 ) {
					this.isHsahBox = false;
				}
				this.isOpen = false;
				reaxel_Audio().audios.open.play();
				await this.$nextTick();
				await setTimeout(() => {
					this.openBoxData.forEach((openBox , index) => {
						openBox.prizeIndex = this.randomStyle(openBox.style);
						let minArtical = this.$parent.artical[0];
						this.$parent.artical.forEach((it) => {
							if ( minArtical.price > it.price ) minArtical = it;
						});
						this.$refs[`item-${ index }-${ openBox.prizeIndex }`][0].childNodes[0].setAttribute("src" , minArtical.image);
						this.$refs[`item-${ index }-${ openBox.prizeIndex }`][0].setAttribute("class" , `qua-box-${ this.conversionStyle(minArtical.rarity , minArtical.category ) } w` );
					});
				} , 100);
				await setTimeout(() => {
					this.getOpenResult().then((res) => {
						this.setPrize(res);
					}).catch((e) => {
						if ( awaitResult !== null ) clearTimeout(awaitResult);
						setTimeout(() => {
							this.$result("网络超时" , {
								errMsg : "开箱超时,请稍后前往背包查看" ,
								errCode : 1 ,
								storeError : 0 ,
							}); // 请求开箱结果没有成(用户网络问题)
							this.isOpen = true;
							this.$nextTick(() => {
								this.widthAni(this.openBoxRatio);
							});
							this.openLoading = false;
							this.$emit("boxstatus" , this.openLoading);
							this.$parent.getUser();
							if ( localStorage.getItem("token") ) this.$parent.getBoxCount();
							this.$Message.error(e.msg);
						} , 1000);
					});
				} , 100);
				this.music();
				let awaitResult = null;
				let maxOpenTime = 0;
				this.openBoxData.forEach((item) => {
					if ( item.openTime > maxOpenTime ) {
						maxOpenTime = item.openTime;
					}
				});
				awaitResult = setTimeout(async () => {
					await this.handleResult(false);
				} , maxOpenTime * 1000 + 1000 );
			}).catch((e) => {
				if ( e.type === 1 ) this.$Message.info(e.msg); else if ( e.type === 2 ) this.$login(); else if ( e.type === 3 ) this.$Modale("余额不足" , "<p>您的钻石不足，购买游戏饰品可获得赠送钻石</p>" , 1 );
				this.openLoading = false;
				this.$emit("boxstatus" , this.openLoading);
			});
		} ,
		checkOpen () {
			return new Promise((resolve , reject) => {
				if ( this.$parent.artical.length === 0 ) {
					reject({
						msg : "空箱,勿点" ,
						type : 1,
					});
				}
				if ( !localStorage.getItem("token") ) {
					reject({
						msg : "未登录" ,
						type : 2,
					});
				}
				if ( (this.box.discount * this.boxPrice).toFixed(2) > this.$parent.user.balance ) {
					reject({
						msg : "余额不足" ,
						type : 3 ,
					});
				}
				resolve();
			});
		} ,
		sellAllOrInstorage (type) {
			if ( this.isFree ) return (this.show = false);
			let params;
			let id = [];
			let msg = false;
			if ( type === "storage" ) {
				params = {
					ids : [] ,
					no : this.resultData.no,
				};
			} else {
				this.resultData.prizes.forEach((el) => {
					if ( el.chosed ) {
						id.push(el.id);
					}
				});
				msg = true;
				params = {
					ids : id ,
					no : this.resultData.no,
				};
			}
			postAction(this.url.sale , params).then((res) => {
				if ( msg ) this.$Message.success("出售成功");
				if ( type === "all" ) {
					// this.$refs.audioPrize.play();
					reaxel_Audio().audios.prize.play();
				}
				this.show = false;
				this.getUser();
			}).catch((e) => {
				this.$Message.error(e.response.data.errMsg);
			});
		} ,
		initOpen (count) {
			return new Promise((resolve) => {
				const openBoxData = [];
				while ( openBoxData.length < count ) {
					let time = parseFloat((Math.random() * (9 - 8) + 8).toFixed(2));
					const opeItem = {
						prizePool : [] , //奖池
						prize : null ,
						style : {
							transform : "translateX(0)" ,
							transition : `transform ${ time }s cubic-bezier(.54,.91,.63,.99) 0s` ,
							willChange : "transform" ,
						} ,
						prizeIndex : null ,
						openTime : time ,
					};
					opeItem.prizePool.push(...this.$parent.artical);
					for ( let supplement = 0 ; supplement < prizePoolCount - this.$parent.artical.length ; supplement ++ ) {
						//补充奖池
						opeItem.prizePool.push(this.$parent.artical[supplement % this.$parent.artical.length] ); //直接前面取物品补充使得奖池看上去好东西很多
					}
					opeItem.prizePool.sort(() => 0.5 - Math.random());
					openBoxData.push(opeItem);
				}
				resolve(openBoxData);
			});
		} ,
		choseGoods (el) {
			let value = 0;
			el.chosed = !el.chosed;
			this.resultData.prizes.forEach((item) => {
				if ( item.chosed ) {
					value += item.salePrice;
				}
			});
			this.totalPrice = + value;
		} , // 开箱订单
		getOpenResult () {
			return new Promise((resolve , reject) => {
				let params = {
					boxId : this.$parent.box.id ,
					count : this.openBoxRatio ,
					isTest : false ,
					type : this.$parent.box.boxType === 0 ? 0 : 1 ,
					ck : localStorage.getItem("userSeed") ,
				};
				this.url.open = "/api/boxGame/open";
				if ( this.box.boxType > 1 ) {
					this.url.open = "/api/task/open";
					params = { boxId : this.box.id };
				}
				postAction(this.url.open , params , 6000).then((res) => {
					this.getUser();
					this.resultData = res.data;
					// 任务箱子
					if ( this.box.boxType > 1 ) {
						this.resultData.prizes = res.data;
						this.resultData.prizes.forEach((el) => {
							el.random = this.conversionStyle(el.skinsRarity , el.category );
							el.chosed = true;
						});
						resolve(res.data);
						// 正常箱子
					} else {
						this.resultData.prizes.forEach((el) => {
							el.random = this.conversionStyle(el.skinsRarity , el.category );
							el.chosed = true;
						});
						let value = 0;
						this.resultData.prizes.forEach((el) => {
							value += el.salePrice;
						});
						this.totalPrice = value;
						resolve(res.data.prizes);
					}
				}).catch((e) => {
					reject(e);
				});
			});
		} ,
		
		setPrize (prizes) {
			this.openBoxData.forEach((item , index) => {
				if ( prizes[index] !== null && prizes[index] !== undefined ) {
					this.$refs[`item-${ index }-${ item.prizeIndex }`][0].childNodes[0].setAttribute("src" , prizes[index].stuffImage);
					this.$refs[`item-${ index }-${ item.prizeIndex }`][0].setAttribute("class" , `qua-box-${ this.conversionStyle(prizes[index].skinsRarity , prizes[index].category ) } w` );
					item.prize = prizes[index];
				}
			});
		} ,
		handleResult (isFree) {
			this.openLoading = false;
			// 额外掉落
			if ( this.$socketData["drop"] ) {
				this.$drop(this.$socketData["drop"].boxSkinsList);
				this.$socketData["drop"] = undefined;
			}
			this.$emit("boxstatus" , this.openLoading);
			if ( !this.isHsahBox ) {
				this.getFree(isFree);
			}
			if ( this.resultData.length !== 0 ) {
				this.show = true;
				// 五分钟之后关闭窗口自动入库
				this.$parent.getBoxStuff();
				let time = setInterval(() => {
					this.count = -- this.count;
					if ( this.count < - 1 ) {
						clearInterval(time);
						this.count = 3;
					}
				} , 1000);
				setTimeout(() => {
					this.show = false;
				} , 3 * 1000);
			}
			for ( const key in this.openBoxData ) {
				if ( this.openBoxData[key].prize.price > this.$parent.box.price ) {
					// this.$refs.audioPrizeB.play();
					reaxel_Audio().audios.prizeB.play();
					break;
				}
			}
		} ,
		getFree (isFree) {
			if ( this.isHsahBox ) {
				return;
			}
			getAction(this.url.free).then((res) => {
				this.$parent.saleNums = res.data;
				if ( localStorage.getItem("token") ) {
					this.$parent.getBoxCount(isFree);
					this.lastBoxCount = this.saleNums - this.hasOpen;
				}
			});
		} ,
		
		music () {
			let lastTime = 0;
			let maxOpenTimeIndex = 0;
			let maxOpenTime = 0;
			this.openBoxData.forEach((item , index) => {
				if ( item.openTime > maxOpenTime ) {
					maxOpenTime = item.openTime;
					maxOpenTimeIndex = index;
				}
			});
			let spark = setInterval(() => {
				try {
					// console.log(this.$refs.pool[maxOpenTimeIndex].scrollWidth)
					let val = parseInt(this.$refs.pool[maxOpenTimeIndex].scrollWidth / 170 );
					if ( val !== lastTime ) {
						lastTime = val;
						// reaxel_Audio().audios.slice.play();
						
						setTimeout(() => {
							new ReaxlassAudio(slice3).play();
						});
					}
				}
				catch ( e ) {
					clearInterval(spark);
				}
			});
			setTimeout(() => {
				clearInterval(spark);
			} , maxOpenTime * 1000);
		} ,
		equipment () {
			if ( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) {
				this.isMobile = true;
			}
		} ,
		randomStyle (style) {
			let itemWidth = this.$refs["item-0-0"][0].clientWidth;
			let contentWidth = this.$refs.pool[0].offsetWidth / 2;
			let index = Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex;
			let distance = - (itemWidth * index);
			let marginWidth = index * 4;
			// let maxPosition = itemWidth * 0.1
			// let minPostion = itemWidth * 0.9
			// let randomPositopm = Math.floor(Math.random() * (maxPosition - minPostion)) + minPostion
			let totaleDistance = distance + contentWidth - marginWidth - itemWidth / 2;
			style.transform = `translateX(${ totaleDistance }px) translateZ(0)`;
			return index;
		} , // 种子
		randomStr (flag , min , max) {
			var str = "";
			var index = "";
			var range = min;
			var arr = [
				"0" ,
				"1" ,
				"2" ,
				"3" ,
				"4" ,
				"5" ,
				"6" ,
				"7" ,
				"8" ,
				"9" ,
				"a" ,
				"b" ,
				"c" ,
				"d" ,
				"e" ,
				"f" ,
				"g" ,
				"h" ,
				"i" ,
				"j" ,
				"k" ,
				"l" ,
				"m" ,
				"n" ,
				"o" ,
				"p" ,
				"q" ,
				"r" ,
				"s" ,
				"t" ,
				"u" ,
				"v" ,
				"w" ,
				"x" ,
				"y" ,
				"z" ,
			];
			//min,max范围内随机的一个数
			if ( flag ) {
				range = Math.floor(Math.random() * (max - min + 1) + min);
			}
			for ( var i = 0 ; i < range ; i ++ ) {
				index = Math.round(Math.random() * (arr.length - 1));
				str += arr[index];
			}
			return str;
		} ,
	} ,
});

import { ReaxlassAudio } from '@/utils/Audio';
</script>

<style
	scoped
	lang="less"
>

html[data-reaxel-reactive-device="mobile-full-screen"]{
	.open-box-btn{
		
		width: 60vw;
		height: 24vw;
		
		font-size: 6.4vw;
	}
}

.the-pointer {
	background-position: center;
	background-size: 100%;
	background-repeat: no-repeat;
}

.open-box-btn{
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100%;
	width: 304px;
	height: 137px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 28px;
	margin: 0 auto;
	user-select: none;
	cursor: pointer;
}

.change-seed-new{
	display: block;
	width: 320px;
	height: 52px;
	cursor: pointer;
	float: right;
	margin-right: 120px;
}

.pool-shadow{
	
}

</style>
