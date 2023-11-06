<template>
	<div class = "csgo-box">
		<div
			class = "csgo-content"
			:style = "{ overflow: delayTime ? 'hidden' : 'unset' }"
		>
			<!--      饰品详情-->
			<div
				class = "result-name"
				v-show = "resultSkins.stuffName !== ''"
			>
				<div>{{ resultSkins.stuffName }}</div>
				<div class = "bottom-color"></div>
			</div>
			<div
				class = "opening-start"
				v-show = "resultSkins.stuffName === ''"
				style = "height: 100%"
			>
				<div class = "box-info">
					<p class = "title-one">开箱</p>
					<p class = "title-two">{{ box.name }}</p>
				</div>
				<div class = "box-pos">
					<div
						:style = "aniStyle"
						class = "ani-csgo"
						ref = "boxAni"
					>
						<img
							src = "../assets/image/csgo/csgobox.png"
							v-show = "delayTime"
							alt = ""
						/>
						<img
							src = "../assets/image/csgo/boxMove.gif"
							v-show = "!delayTime && !aniOpening"
							alt = ""
						/>
					</div>
				</div>
				<div
					class = "box-pos"
					style = "position: absolute; width: 90%; top: 117px"
				>
					<div
						class = "box-ani"
						align = "center"
					>
						<img
							src = "../assets/image/csgo/boxopen.png"
							v-show = "aniOpening"
							alt = ""
						/>
					</div>
				</div>
				<div
					v-show = "boxAni || resultSkins.stuffName !== ''"
					style = "height: calc(100% - 50vh)"
				>
					<div
						v-show = "resultSkins.stuffName === ''"
						style = "display: flex; flex-direction: column; height: 100%"
					>
						<p class = "box-tips">箱内饰品：</p>
						<div class = "split-line"></div>
						<div class = "skins-content">
							<ul>
								<li
									align = "center"
									v-for = "el in skinsImg"
								>
									<div
										class = "skins-img"
										:class = "'border-csgo-' + conversionStyle(el.rarity, el.category)"
									>
										<img
											:src = "imgHost(el.image)"
											alt = ""
											style = "width: 90%"
										/>
									</div>
									<p
										class = "name-one over-flow-hide"
										:title = "el.name1"
									>{{ el.name1 }}
									</p>
									<p
										class = "name-two over-flow-hide"
										:title = "el.name2"
									>{{ el.name2 }}
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!--      开箱动画-->
			<div
				class = "opening-ing"
				v-show = "aniOpening && resultSkins.stuffName === ''"
			>
				<div class = "line"></div>
				<div
					class = "scale-circle-bg zoom-index"
					ref = "pool"
				>
					<div
						:style = "openingAniZoom"
						ref = "prizePool"
					>
						<div
							class = "ani-item"
							v-for = "(el, idx) in prizePool"
							:ref = "'item-' + idx"
							:key = "idx"
							:class = "idx + '-item'"
							:style = "{
								background: `url(${require(
									`../assets/image/csgo/${conversionStyle(el.rarity, el.category)}.png`,
								)}) no-repeat top left / 100%`,
							}"
						>
							<img
								:src = "el.image"
								alt = ""
								style = "width: 90%"
							/>
						</div>
					</div>
				</div>
				<div class = "scale-circle-bg scale-index">
					<div :style = "openingAni">
						<div
							class = "ani-item"
							v-for = "(el, idx) in prizePool"
							:ref = "'zoomItem-' + idx"
							:key = "idx"
							:class = "idx + '-item'"
							:style = "{
								background: `url(${require(
									`../assets/image/csgo/${conversionStyle(el.rarity, el.category)}.png`,
								)}) no-repeat top left / 100%`,
							}"
						>
							<img
								:src = "el.image"
								alt = ""
								style = "width: 90%"
							/>
						</div>
					</div>
				</div>
				<!--        <div class="mask"></div>-->
			</div>
			<!--      结果展示-->
			<div
				class = "opening-end"
				v-show = "resultSkins.stuffName !== ''"
			>
				<div class = "official-result">
					<img
						:src = "imgHost(resultSkins.stuffImage)"
						alt = ""
					/>
				</div>
				<div class = "circle-circle"></div>
			</div>
			<div
				class = "circle-circle"
				v-show = "!aniOpening && !boxAni"
			></div>
		</div>
		<div
			class = "button-content"
			v-show = "boxAni || resultSkins.stuffName !== ''"
			:class = "{ 'result-button': resultSkins.stuffName !== '' }"
		>
			<div class = "lf-content">
				<div
					class = "open-button"
					@click = "openBox"
				>
					<i class = "iconfont icon-icon_diamond1 font-s"></i>
					{{ box.price * $parent.boxDiscount.discount }}
				</div>
				<div
					class = "game-tips-words"
					style = "margin: 0 20px 0 0"
				>
					本站所有游戏道具，只能本人取回到游戏内使用，均不允许站内交易及互换
				</div>
			</div>
			<div
				class = "rt-content"
				@click = "quitCsgo"
			>关闭
			</div>
		</div>
	</div>
</template>

<script>
import { postAction } from "@/api/manage";
import { reaxel_Audio } from '@/reaxels/initial/audio';
const PrizeIndex = 40;


export default {
	name : "CsgoBoxType" ,
	props : {
		skinsImg : Array ,
		box : Object ,
	} ,
	data () {
		return {
			boxAni : true ,
			aniStyle : "" ,
			delayTime : true ,
			aniOpening : false ,
			prizePool : [] ,
			step : 1 ,
			timer : null ,
			resultSkins : { stuffName : "" } ,
			openingAni : {
				transform : `translateX(0) translateY(-50%)` ,
				transition : `all 8s cubic-bezier(.54,.91,.63,.99) 0s` ,
			} ,
			openingAniZoom : {
				transform : `translateX(0) translateY(-50%)` ,
				transition : `all 8s cubic-bezier(.54,.91,.63,.99) 0s` ,
			} ,
			url : {
				open : "/api/boxGame/open" ,
				sale : "/api/boxGame/opertion" , // 出售物品
			} ,
		};
	} ,
	methods : {
		initState () {
			this.boxAni = true;
			this.aniStyle = "";
			this.delayTime = true;
			this.aniOpening = false;
			this.resultSkins = { stuffName : "" };
			this.openingAni = {
				transform : `translateX(0) translateY(-50%)` ,
				transition : `transform 8s cubic-bezier(.54,.91,.63,.99) 0s` ,
				willChange : "transform" ,
			};
			this.openingAniZoom = {
				transform : `translateX(0) translateY(-50%)` ,
				transition : `transform 8s cubic-bezier(.54,.91,.63,.99) 0s` ,
				willChange : "transform" ,
			};
			clearInterval(this.timer);
		} ,
		openBox () {
			let timer;
			let lastTime = 0;
			this.checkOpen().then(() => {
				// 箱子移动动画
				this.aniStyle = {
					transform : "translate(-50%,40vh) " ,
					transition : `all .4s cubic-bezier(0.42, 0, 0.66, 1.02)` ,
					width : "30%" ,
				};
				setTimeout(() => {
					this.delayTime = false;
				} , 0.4 * 1000);
				setTimeout(() => {
					this.aniOpening = true;
					timer = setInterval(() => {
						try {
							let val = parseInt(this.$refs.pool.scrollWidth / 280);
							if ( val !== lastTime ) {
								lastTime = val;
								reaxel_Audio().audios.slice.play();
							}
						}
						catch ( e ) {
							clearInterval(timer);
						}
					});
					this.getResult().then(res => {
						this.$refs[`item-${ PrizeIndex }`][0].childNodes[0].setAttribute("src" , res.prizes[0].stuffImage);
						this.$refs[`item-${ PrizeIndex }`][0].setAttribute("style" , `background:url(${ require(`../assets/image/csgo/${ this.conversionStyle(res.prizes[0].skinsRarity , res.prizes[0].category) }.png`) }) no-repeat top left / 100%`);
						this.$refs[`zoomItem-${ PrizeIndex }`][0].childNodes[0].setAttribute("src" , res.prizes[0].stuffImage);
						this.$refs[`zoomItem-${ PrizeIndex }`][0].setAttribute("style" , `background:url(${ require(`../assets/image/csgo/${ this.conversionStyle(res.prizes[0].skinsRarity , res.prizes[0].category) }.png`) }) no-repeat top left / 100%`);
						setTimeout(() => {
							this.handleResult(res);
							clearInterval(timer);
						} , 9500);
					}).catch(e => {
						clearInterval(timer);
					});
				} , 2.6 * 1000);
				setTimeout(() => {
					let totalWithS = - (280 * PrizeIndex);
					let totalWithZ = - (322 * PrizeIndex);
					let contentWidth = this.$refs.pool.offsetWidth / 2;
					let marginWidth = PrizeIndex * 11;
					let randomDis = parseInt(Math.random() * 240 + 30);
					let totaleDistance = totalWithS + contentWidth - marginWidth - randomDis;
					let totaleDistanceZ = totalWithZ + contentWidth - marginWidth - randomDis;
					this.openingAniZoom.transform = `translateX(${ totaleDistance }px) translateY(-50%)`;
					this.openingAni.transform = `translateX(${ totaleDistanceZ }px) translateY(-50%)`;
				} , 2.6 * 1000);
				this.boxAni = false;
			}).catch(e => {
				this.$Message.error(e.msg);
			});
		} ,
		handleResult (res) {
			this.$refs.boxAni.style = null;
			this.resultSkins = res.prizes[0];
		} ,
		quitCsgo () {
			this.$parent.officialCsgo = false;
			this.initState();
		} ,
		checkOpen () {
			return new Promise((resolve , reject) => {
				if ( this.skinsImg.length === 0 ) {
					reject({
						msg : "空箱,勿点" ,
						type : 1 ,
					});
				}
				if ( !localStorage.getItem("token") ) {
					reject({
						msg : "未登录" ,
						type : 2 ,
					});
				}
				if ( (this.box.discount * this.box.price).toFixed(2) > this.$parent.user.balance ) {
					reject({
						msg : "余额不足" ,
						type : 3 ,
					});
				}
				this.initState();
				resolve();
			});
		} ,
		getResult () {
			return new Promise((resolve , reject) => {
				let params = {
					boxId : this.box.id ,
					ck : localStorage.getItem("userSeed") ,
					count : 1 ,
					isTest : false ,
					type : 1 ,
				};
				postAction(this.url.open , params , 6000).then(res => {
					resolve(res.data);
				}).catch(e => {
					reject(e);
				});
			});
		} ,
	} ,
};
</script>

<style
	scoped
	lang = "less"
>
.box-ani {
	position: absolute;
	left: 50%;
	bottom: 0;
	transform: translate(-50%, 40vh);
	width: 30%;
}

.box-pos {
	position: relative;
	z-index: 78;
	height: 30vh;
	margin: 40px auto 30px;
}

.box-ani img {
	width: 100%;
	user-select: none;
}

.ani-csgo {
	width: 27%;
	margin: auto;
	background-size: 25% auto;
	background-repeat: no-repeat;
	background-position: center 0;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 0;
	z-index: 4;
}

.ani-csgo img {
	width: 100%;
}

.opening-ing {
	width: 85%;
	height: 70vh;
	margin: auto;
	overflow: hidden;
	opacity: 0.9;
	z-index: 79;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.scale-circle-bg {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	z-index: 99;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}

.mask {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 100%;
	height: 215px;
	z-index: 100;
	background: linear-gradient(90deg,
	rgba(255, 255, 255, 0.2) 1%,
	transparent 10%,
	transparent 90%,
	rgba(255, 255, 255, 0.2) 100%);
}

.scale-circle-bg > div {
	display: flex;
	align-items: center;
	position: absolute;
	top: 50%;
}

.zoom-index {
	mask-image: radial-gradient(circle closest-side, #fff0 70%, #000000 70%);
	filter: brightness(95%) blur(2px);
	border-radius: 35vh;
	overflow: hidden;
}

.scale-index {
	width: 100%;
	border-radius: 0;
	background: rgba(70, 70, 70, 0.2);
	z-index: 100;
	clip-path: circle(26.5% at 50% 50%);
	box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.6);
	overflow: hidden;
}

.scale-index > div > div {
	/*transform: scale(1.15);*/
	height: 247px;
	width: 322px;
	margin-right: 11px;
}

.line {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 5px;
	background: #b0ae3c;
	height: 247px;
	transform: translate(-50%, -50%);
	z-index: 111;
}

.ani-item {
	width: 281px;
	height: 212px;
	margin-right: 11px;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.button-content {
	display: flex;
	font-size: 15px;
	font-weight: 600;
	color: #ffffff;
	justify-content: space-between;
	text-align: center;
	line-height: 50px;
	width: 945px;
	margin: auto;
	border-top: 2px solid #6d6d6b;
}

.back-open {
	font-weight: 600;
	color: #fcfcfc;
	cursor: pointer;
}

.auto-bag {
	color: #b0b0b0;
	margin-right: auto;
}

.seven-count {
	color: #b0b0b0;
	margin: 0 20px;
}

.circle-circle {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 0.3;
	backdrop-filter: blur(15px);
	box-sizing: content-box;
	height: 25%;
	aspect-ratio: 1;
	border-radius: 50%;
	border: 200px solid rgba(37, 39, 50, 0.5);
	z-index: 3;
}

.open-button {
	width: 100px;
	height: 50px;
	background: #4caf50;
	text-align: center;
	border-radius: 2px;
	cursor: pointer;
	padding: 0 15px;
	
	i {
		font-size: 15px;
	}
}

.lf-content {
	flex: 1;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	margin-right: 35px;
	margin-top: 8px;
}

.rt-content {
	width: 132px;
	height: 62px;
	border-left: 2px solid #6d6d6b;
	font-size: 17px;
	font-weight: 600;
	text-align: center;
	color: #fcfcfc;
	line-height: 62px;
	margin-top: 8px;
	cursor: pointer;
}

.csgo-box {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 1001;
	background: url("../assets/image/csgo/csgotype.png") no-repeat top left / 100% 100%;
}

.box-tips {
	font-size: 17px;
	color: #c3c2c1;
	line-height: 15px;
	font-weight: bold;
}

.skins-content {
	flex: 1;
	overflow-y: scroll;
}

.skins-content ul {
	display: flex;
	flex-wrap: wrap;
}

.skins-content::-webkit-scrollbar-track {
	background: rgba(255, 255, 255, 0);
}

.skins-content::-webkit-scrollbar-thumb {
	width: 4px;
	background: #929292;
}

.skins-content li {
	margin-right: 22px;
	margin-bottom: 26px;
}

.name-one {
	font-size: 12px;
	font-weight: 600;
	color: #f4f4f4;
	line-height: 15px;
	margin: 14px auto 4px;
	text-align: left;
}

.name-two {
	text-align: left;
	font-size: 12px;
	font-weight: 400;
	color: #f6f5f5;
	line-height: 15px;
}

.border-csgo-gold {
	border-left: 5px solid #ffa406;
}

.border-csgo-red {
	border-left: 5px solid #eb4b4b;
}

.border-csgo-pink {
	border-left: 5px solid #ff0ae5;
}

.border-csgo-purple {
	border-left: 5px solid #c80aff;
}

.border-csgo-blue {
	border-left: 5px solid #059eff;
}

.border-csgo-blues {
	border-left: 5px solid #0a3cff;
}

.border-csgo-white {
	border-left: 5px solid #a2a2a2;
}

.skins-img {
	width: 145px;
	height: 106px;
	background: linear-gradient(0deg, #9e9d9c, #5c5753);
}

.csgo-content {
	width: 90%;
	margin: auto;
	padding-top: 30px;
	/*overflow: hidden;*/
	height: calc(100vh - 100px);
}

.title-one {
	font-size: 35px;
	font-weight: 600;
	color: #cccccc;
	line-height: 53px;
	text-align: center;
}

.title-two {
	font-size: 21px;
	font-weight: 600;
	color: #cccccc;
	line-height: 33px;
	text-align: center;
}

.official-result {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 50%;
	aspect-ratio: 1;
	line-height: 400px;
	z-index: 90;
	display: flex;
	align-items: center;
}

.official-result img {
	width: 100%;
}

.result-name {
	font-size: 35px;
	font-weight: 600;
	color: #ffffff;
	text-align: center;
	width: max-content;
	margin: 30px auto 10px;
	position: relative;
	z-index: 101;
}

.result-button {
	position: absolute;
	left: 50%;
	bottom: 2%;
	transform: translateX(-50%);
}

.bottom-color {
	height: 7px;
	background: #b14040;
	border: 0px solid #000000;
	box-shadow: 0px 1px 10px 1px rgba(67, 12, 3, 0.32);
	margin: auto;
}

.split-line {
	width: 100%;
	height: 2px;
	background: #958f8a;
	margin: 15px auto 17px;
}
</style>
