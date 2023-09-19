<template>
	<div class = "home">
		<div
			class = "festival-model"
			v-show = "activeData.length > 0"
			v-for = "item in activeData"
			:style = "{
				'background-image':
					'url(' + imgHost(isPhone ? item.mobileImage : item.image) + ')',
			}"
		>
			<div class = "layout mar-auto">
				<Title
					:name = "item.name"
					:sub-title = "item.title"
				></Title>
				<div class = "fetival-box">
					<div
						v-for = "el in item.boxVoList"
						@click = "goBox(el)"
					>
						<div class = "home-box-img">
							<img
								v-lazy = "imgHost(el.background)"
							/>
						</div>
						<p>{{ el.name }}</p>
						<p>
							<i class = "iconfont icon-icon_diamond1"></i>
							{{ el.discountPrice }}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class = "layout mar-auto">
			<div>
				<!--            分类标题-->
				<div
					class = "home-title"
					style = "padding: 0.6rem 4px 0.4rem"
				>
					<div>
						<img
							src = "../assets/image/titleLine.png"
							class = "hide-m"
							alt = ""
						/>
						<img
							src = "../assets/image/phoneLeft.png"
							class = "hide-p hide-ipad"
							alt = ""
						/>
					</div>
					<span> {{ boxData[0].title }}</span>
					<div class = "rotate-img">
						<img
							src = "../assets/image/titleLine.png"
							class = "hide-m"
							alt = ""
						/>
						<img
							src = "../assets/image/phoneLeft.png"
							class = "hide-p hide-ipad"
							alt = ""
						/>
					</div>
				</div>
				<!--            箱子内容-->
				<div class = "home-box">
					<!-- Hash开箱-->
					<div class = "home-open-box">
						<div
							class = "home-box-item"
							@click = "goBox(item)"
							:style = "{
								'background-image':
									'url(' + imgHost(item.beasemap) + ')',
							}"
							v-for = "item in boxData[0].boxVoList"
							:key = "item.id"
						>
							<div
								class = "discount-box"
								v-show = "discount.endTime"
							>
								<div>{{ (discount.discount * 10).toFixed(1) }}</div>
							</div>
							<div class = "box-type-box">
								<div class = "box-type">
									{{ item.boxType === 0 ? "经典箱" : "HASH箱" }}
								</div>
							</div>
							<div class = "hash-win-pro">
								<div>
									<span v-show = "item.boxType === 0">x
									</span
									>
									{{
										item.probability
									}}
									<span>{{ item.boxType !== 0 ? "胜" : "倍" }}</span>
								</div>
							</div>
							<div
								class = "home-box-img"
								style = "margin-bottom: 0.5rem"
							>
								<img
									v-lazy = "imgHost(item.background)"
								/>
								<img
									v-lazy = "imgHost(item.image)"
								/>
							</div>
							<p>{{ item.name }}</p>
							<div class = "hide-hover">
								<div class = "sell-price">
									<i class = "iconfont icon-icon_diamond2"></i>
									<span>
										{{
											(item.discountPrice * discount.discount).toFixed(2)
										}}
									</span>
								</div>
								<div
									class = "count-price"
									v-if = "discount.endTime"
								>
									<i class = "iconfont icon-icon_diamond2"></i>
									{{ item.discountPrice.toFixed(2) }}
								</div>
							</div>
							<span
								class = "original-price"
								v-show = "item.boxType === 0 && item.discount < 1"
							>
								{{ item.price }}
							</span>
							<div class = "hover-line"></div>
						</div>
					</div>
				</div>
				<!--        roll倒计时-->
				<div
					class = "roll-count hide-p hide-ipad"
					style = "margin: 40px auto; width: 90%"
					v-if = "rollList.length > 0"
				>
					<div class = "roll-count-box">
						<div
							style = "width: 10%"
							@click = "prevRoll('prev')"
						>
							<img
								src = "../assets/image/prev.png"
								alt = ""
								style = "
									width: 200%;
									position: relative;
									top: 50%;
									transform: translateY(-50%);
								"
							/>
						</div>
						<div class = "home-roll-left">
							<div class = "roll-title-line">
								<div>
									<img
										src = "../assets/image/rollLine.png"
										alt = ""
									/>
								</div>
								<div align = "center">
									<img
										:src = "imgHost(rollRoom.image)"
										alt = ""
									/>
								</div>
								<div class = "rotate-img">
									<img
										src = "../assets/image/rollLine.png"
										alt = ""
									/>
								</div>
							</div>
							<div class = "count-time-roll">
								<span class = "roll-time-text">还剩</span>
								<div class = "roll-time-num">
									<span>{{ countDay.split("")[0] }}</span>
									<span>{{ countDay.split("")[1] }}</span>
								</div>
								<span class = "roll-time-text">天</span>
								<div class = "roll-time-num">
									<span>{{ countHours.split("")[0] }}</span>
									<span>{{ countHours.split("")[1] }}</span>
								</div>
								<span class = "roll-time-text">时</span>
								<div class = "roll-time-num">
									<span>{{ countSecond.split("")[0] }}</span>
									<span>{{ countSecond.split("")[1] }}</span>
								</div>
								<span class = "roll-time-text">分</span>
							</div>
							<div class = "home-roll-name">
								{{ rollRoom.name }}
							</div>
							<div class = "home-task">
								<div>
									<img
										src = "../assets/image/star.png"
										alt = ""
									/>
									{{ rollRoom.description }}
									<img
										src = "../assets/image/star.png"
										alt = ""
									/>
								</div>
							</div>
							<div class = "roll-goods">
								<img
									:src = "imgHost(el)"
									alt = ""
									v-for = "(el, idx) in rollRoom.prizeImg"
									:key = "idx"
								/>
							</div>
							<div
								class = "jion-roll"
								@click = "jionRoll(rollRoom.id)"
							>
								立即加入
							</div>
						</div>
						<div
							style = "width: 10%"
							@click = "prevRoll('next')"
						>
							<img
								src = "../assets/image/next.png"
								alt = ""
								style = "
									width: 200%;
									position: relative;
									top: 50%;
									transform: translateY(-50%);
								"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getAction } from "../api/manage";
import router from "../router/index";
import Title from "../components/Title";
import versionArray from "../utils/version.js";
import { mapState } from "vuex";
import "viewerjs/dist/viewer.css";
import {defineComponent} from 'vue';
import {observer} from 'mobx-vue';
export default observer({
	data () {
		return {
			router ,
			realIndex : 0 ,
			activeData : [] ,
			rollList : [] ,
			rollRoom : [] ,
			roomNum : 0 ,
			countDay : "00" ,
			countHours : "00" ,
			countSecond : "00" ,
			versionData : versionArray.versionArray ,
			boxData : [{ title : "" }] ,
			isView : false ,
			kind : 0 ,
			boxType : [] ,
			isPhone : false ,
			count : 1 ,
			url : {
				home : "/api/home/get/boxInfo" ,
				banner : "/api/home/sys/banner" ,
				active : "/api/home/home/activity" ,
				roll : "/api/home/rooms" ,
			} ,
		};
	} ,
	name : "Home" ,
	components : { Title } ,
	computed : {
		...mapState("account" , {
			discount : (state) => state.userDiscount.openBox ? state.userDiscount.openBox : { discount : 1 } ,
		}) ,
	} ,
	created () {
		this.isPhone = this.vw > 767 ? false : true;
		this.timer = setInterval(() => {
			this.countDown(this.rollRoom.rollTime);
		} , 60 * 1000);
		this.getHomeData();
		this.getFestival();
		this.getRollList();
	} ,
	methods : {
		goPage (index) {
			if ( this.isPhone ) {
				this.$Modale(this.versionData[index].title , this.versionData[index].context , 0 );
				return;
			}
			this.$refs.swiper.swiper.slideTo(index , 0 , true);
		} ,
		changeBoxType (el , kind) {
			el.kind = kind == 0 ? 1 : 0;
		} ,
		prevRoll (type) {
			if ( type === "next" ) {
				let num = ++ this.roomNum;
				this.roomNum = num > 3 ? 2 : num;
				this.rollRoom = this.rollList[num > 3 ? 2 : num];
				this.countDown(this.rollRoom.rollTime);
				return;
			}
			let num = -- this.roomNum;
			this.roomNum = num < 0 ? 0 : num;
			this.rollRoom = this.rollList[num < 0 ? 0 : num];
			this.countDown(this.rollRoom.rollTime);
		} ,
		countDown (time) {
			let countTime = new Date(time) - new Date();
			let days = parseInt(countTime / 1000 / 60 / 60 / 24 , 10);
			let hours = parseInt((countTime / 1000 / 60 / 60) % 24 , 10);
			let minutes = parseInt((countTime / 1000 / 60) % 60 , 10);
			this.countDay = this.checkTime(days);
			this.countHours = this.checkTime(hours);
			this.countSecond = this.checkTime(minutes);
		} ,
		checkTime (i) {
			if ( i < 10 ) {
				i = "0" + i;
			}
			return i + "";
		} ,
		getRollList () {
			getAction(this.url.roll).then((res) => {
				if ( res.data ) {
					this.rollList = res.data;
					this.rollRoom = res.data[0];
					this.countDown(this.rollRoom.rollTime);
				}
			});
		} ,
		jionRoll (id) {
			this.$router.push(`/page/roll/${ id }`);
		} ,
		goBox (el) {
			const audio = document.getElementById("goBoxAudio");
			if ( audio ) audio.play();
			localStorage.setItem("box" , JSON.stringify(el));
			this.$router.push("/steer/case");
		} ,
		getHomeData () {
			getAction(this.url.home).then((res) => {
				this.boxData = res.data;
			});
		} ,
		getFestival () {
			getAction(this.url.active).then((res) => {
				this.activeData = res.data;
			});
		} ,
	} ,
});
</script>
<style lang = "less">
.my-bullet {
	width: 0.1rem;
	height: 0.1rem;
	display: inline-block;
	border-radius: 50%;
	background: #b7b6b9;
	
	&:nth-child(2) {
		margin: 0 0.1rem;
	}
}

.version-button-next {
	margin: 0 !important;
	top: 0 !important;
	left: 100px !important;
}

@media screen and (max-width: 767px) {
	.home-box .gallery-top .swiper-slide {
		height: auto;
	}
	
	.home-box .swipper-home {
		padding-bottom: 30px;
	}
	
	.home-box {
		width: 80%;
	}
}

.version-button-prev {
	margin: 0 !important;
	top: 0 !important;
	left: 20px !important;
}

.my-bullet-active {
	background: #fd882e;
}

.swiper-slide img {
	width: 100%;
	/*height: 100%;*/
	object-fit: cover;
}

.gallery-top .swiper-slide {
	height: 400px;
	width: 100%;
	margin: auto;
}

.gallery-thumbs {
	width: 80%;
	margin: 20px auto 0;
}

.gallery-thumbs .swiper-slide {
	height: 60px;
	width: 25%;
	overflow: hidden;
	cursor: pointer;
}

.swipper-home .next-button {
	right: -5% !important;
	top: 32% !important;
	background-image: url("../assets/image/next.png") !important;
	background-size: 100% 100%;
	
	&:after {
		content: "";
	}
	
	&:hover {
		background-image: url("../assets/image/nperv.png") !important;
	}
}

.swipper-home .prev-button {
	left: -5% !important;
	top: 32% !important;
	background-size: 100% 100%;
	background-image: url("../assets/image/prev.png") !important;
	
	&:after {
		content: "";
	}
	
	&:hover {
		background-image: url("../assets/image/phov.png") !important;
	}
}

.swiper-version .version-button-next {
	background-image: url("../assets/image/versionNext.png") !important;
	background-size: 100% 100%;
	
	&:after {
		content: "";
	}
	
	&:hover {
		background-image: url("../assets/image/nextHov.png") !important;
	}
}

.swiper-version .version-button-prev {
	background-image: url("../assets/image/versionPrev.png") !important;
	background-size: 100% 100%;
	
	&:after {
		content: "";
	}
	
	&:hover {
		background-image: url("../assets/image/prevHov.png") !important;
	}
}

.gallery-thumbs .swiper-slide.slide-thumb-active > div:nth-of-type(2) {
	border: 4px solid #ffffff;
	position: relative;
}

.triangle {
	height: 10px;
	width: 12px;
	background: #ffffff;
	-webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	margin: auto;
	transform: translateY(1px);
}

.viewer-footer {
	display: none;
}
</style>
