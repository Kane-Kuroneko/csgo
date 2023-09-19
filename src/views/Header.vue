<template>
	<div class = "menu-header">
		<div
			:class = "[{ active: isWelfare }, { 'delete-absolute': !isHome }]"
			class = "hide-m"
		>
			<!--        顶部导航-->
			<div class = "top-menu-nav hide-m">
				<div>
					<span
						@click = "goPay"
						style = "position: relative"
					>
						<img
							src = "../assets/image/paycharge.png"
							style = "position: absolute; left: -70%; width: 80%; top: 28%"
							alt = ""
						/>
						<i class = "iconfont icon-icon_diamond2"></i>
						获取钻石
					</span>
					<span @click = "$router.push('/page/instrutions')">
						<i class = "iconfont iconicon-fairgame"></i>
						公平性游戏
					</span>
					<span>
						<i class = "iconfont iconicon-help"></i>
						<router-link
							style = "color: #ffffff"
							to = "/page/helpcenter/activity"
						>
							帮助中心
						</router-link>
					</span>
				</div>
				<div class = "dog-nav"></div>
			</div>
			<!--        主导航-->
			<div class = "menu-nav">
				<div class = "logo-nav">
					<div style = "margin-right: 0.2rem">
						<img
							src = "../assets/image/logo.png"
							@click = "goHome"
							alt = ""
							style = "width: 90%"
						/>
					</div>
					<div class = "flex-layout">
						<router-link
							to = "/case/hash"
							class = "nav-item hash-nav"
						>
							<div class = "top-line"></div>
							<div>
								<p>HASH开箱</p>
							</div>
						</router-link>
						<router-link
							v-show = "show"
							to = "/page/caseBattle"
							class = "nav-item battle-nav"
						>
							<div class = "top-line"></div>
							<div>
								<p>开箱对战</p>
							</div>
						</router-link>
						<router-link
							to = "/page/upgradeHall"
							class = "nav-item upgra-nav"
						>
							<div class = "top-line"></div>
							<div>
								<p>饰品升级</p>
							</div>
						</router-link>
						<router-link
							to = "/page/wish"
							class = "nav-item traditon-nav"
						>
							<div class = "top-line"></div>
							<div>
								<p>神龙许愿</p>
							</div>
							<img
								src = "../assets/image/nav/HOT.png"
								alt = ""
							/>
						</router-link>
						<router-link
							to = "/page/roll"
							class = "nav-item roll-nav"
						>
							<div class = "top-line"></div>
							<div>
								<p>ROLL房</p>
							</div>
						</router-link>
						<router-link
							to = "/page/store"
							class = "nav-item store-nav"
						>
							<div class = "top-line"></div>
							<div>
								<p>饰品商城</p>
							</div>
						</router-link>
						<!--            <div @click="goActive" to="/Welfare" class="nav-item active-nav"></div>-->
					</div>
				</div>
				<div class = "user-info-box">
					<div>
						<div>
							<!--                // 登录 注册-->
							<span
								style = "margin-right: 0.2rem"
								@click = "loginFunc"
								class = "btn-login"
								v-if = "!userInfo.id"
							>登录 / 注册
							</span>
							<!--                个人信息-->
							<div
								class = "pc-user-b"
								v-else
							>
								<div class = "recharge-box">
									<div class = "header-name rr-block">{{ userInfo.name }}</div>
									<div style = "display: flex; align-items: center">
										<div
											class = "user-total-balance"
											@click = "$router.push('/user/case')"
										>
											<i
												class = "iconfont icon-icon_diamond2"
												style = "color: #fcc601"
											></i>
											<span class = "rr-block">
												&nbsp;{{ userInfo.balance }}
											</span>
										</div>
										<div
											class = "charge-btn"
											@click = "$router.push('/user/assets')"
										>
											购买
										</div>
									</div>
								</div>
								<SkinsAvatar
									wd = "calc(.4rem + 40px)"
									ht = "calc(.4rem + 40px)"
									:img = "userInfo.avatar"
									:head-frame = "userInfo.headPortraitBox"
									@handleFunc = "goCase"
								>
								</SkinsAvatar>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-show = "!isPhone && isHome">
			<!--        banner-->
			<div class = "main-banner">
				<swiper
					:options = "mainBannerOption"
					class = "main-banner-swiper"
					ref = "mainBanner"
				>
					<swiper-slide
						v-for = "el in bannerData"
						:key = "el.id"
						:class = "{ cursor: !!el.link }"
					>
						<img
							class = "swiperImg"
							:src = "imgHost(el.image)"
							@click = "goFestival(el)"
							alt = ""
						/>
					</swiper-slide>
				</swiper>
			</div>
			<!--        主内容-->
			<div
				v-if = "!isPhone"
				class = "main-info-box hide-m"
			>
				<div style = "display: flex">
					<div
						v-for = "el in homeTask"
						:key = "el.id"
						@click = "goWealfare(el)"
					>
						<img
							:src = "imgHost(el.homeBeasemap)"
							alt = ""
						/>
					</div>
				</div>
			</div>
			<!--        roll倒计时-->
			<div
				v-if = "!isPhone && rollList.length > 0"
				class = "roll-count hide-m"
			>
				<div class = "roll-count-box">
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
						>立即加入
						</div>
					</div>
					<div class = "home-roll-right">
						<div class = "roll-tap">
							<div
								v-for = "el in rollList"
								:key = "el.id"
								@click = "changeRoll(el)"
							>
								<span :class = "{ active: el.id == rollRoom.id }"></span>
								{{ el.name }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<nav
			id = "menu-nav-m"
			class = "hide-ipad hide-p"
		>
			<div class = "nab-bg-f nav-bg">
				<div>
					<div>
						<div class = "menu-nav-m">
							<Icon
								type = "md-menu"
								@touchmove.prevent
								@click.self = "expendMenuM = !expendMenuM"
							/>
						</div>
					</div>
					<div style = "width: 35%">
						<img
							src = "../assets/image/logo.png"
							@click = "goHome"
							class = "logo-p"
						/>
					</div>
					<div class = "user-info-box">
						<div>
							<!--                // 登录 注册-->
							<span
								style = "margin-right: 0.2rem"
								@click = "loginFunc"
								class = "btn-login"
								v-if = "!userInfo.id"
							>登录 / 注册
							</span>
							<!--                个人信息-->
							<div
								class = "pc-user-b"
								v-else
							>
								<div
									class = "charge-btn"
									@click = "$router.push('/user/assets')"
									style = "margin-right: 10px"
								>
									购买
								</div>
								<div class = "recharge-box">
									<div class = "header-name">{{ userInfo.name }}</div>
									<div>
										<div
											class = "user-total-balance rr-block"
											@click = "$router.push('/user/case')"
										>
											<i
												class = "iconfont icon-icon_diamond1 fdc-color font-s"
											></i>
											{{ userInfo.balance }}
										</div>
									</div>
								</div>
								<SkinsAvatar
									wd = "45px"
									ht = "45px"
									:img = "userInfo.avatar"
									:head-frame = "userInfo.headPortraitBox"
									@handleFunc = "goCase"
								>
								</SkinsAvatar>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				class = "menu-m-content"
				:class = "{ expend: chargeMenuM }"
				@touchmove.prevent
				@click.self = "chargeMenuM = false"
			>
				<div
					class = "menu-m-box"
					@click = "chargeMenuM = false"
				>
					<router-link
						to = "/user/case"
						tag = "div"
						exact
						class = "menu-m-item"
					>
						我的背包
					</router-link>
					<router-link
						to = "/user/assets"
						tag = "div"
						class = "menu-m-item"
					>
						获取钻石
					</router-link>
					<router-link
						to = "/user/account"
						tag = "div"
						class = "menu-m-item"
					>
						账号设置
					</router-link>
					<span
						@click = "loginOut"
						tag = "div"
						class = "menu-m-item"
					>退出登录
					</span>
				</div>
			</div>
			<!-- 主菜单 -->
			<div
				class = "menu-m-content"
				:class = "{ expend: expendMenuM }"
				@touchmove.prevent
				@click.self = "expendMenuM = false"
			>
				<div
					class = "menu-m-box"
					@click = "expendMenuM = false"
				>
					<div class = "nav-fair">
						<div>
							<router-link
								to = "/case/hash"
								class = "nav-item"
							>
								<div>
									<i class = "iconfont icon-icon_fair"></i>
									<span>HASH开箱</span>
								</div>
							</router-link>
							<router-link
								v-show = "show"
								to = "/page/caseBattle"
								class = "nav-item"
							>
								<div>
									<i class = "iconfont icon-a-0-ziyuan512"></i>
									<span>开箱对战</span>
								</div>
							</router-link>
							<router-link
								to = "/page/upgradeHall"
								class = "nav-item"
							>
								<div>
									<i class = "iconfont icon-icon_upgrade"></i>
									<span>饰品升级</span>
								</div>
							</router-link>
							<router-link
								to = "/page/wish"
								class = "nav-item"
							>
								<div>
									<i class = "iconfont icon-a-0-ziyuan312"></i>
									<span>神龙许愿</span>
								</div>
							</router-link>
							<router-link
								to = "/page/roll"
								class = "nav-item"
							>
								<div>
									<i class = "iconfont icon-a-0-ziyuan412"></i>
									<span>ROLL房</span>
								</div>
							</router-link>
							<router-link
								to = "/page/store"
								class = "nav-item"
							>
								<div>
									<i class = "iconfont icon-a-0-ziyuan212"></i>
									<span>饰品商城</span>
								</div>
							</router-link>
							<router-link
								to = "/user/account"
								class = "nav-item"
							>
								<div>
									<i class = "iconfont icon-geren"></i>
									<span>个人中心</span>
								</div>
							</router-link>
							<!--              <router-link to="/page/active" class="nav-item ">-->
							<!--                <div>-->
							<!--                  <i class="iconfont icon-wodefuli"></i>-->
							<!--                  <span>福利中心</span>-->
							<!--                </div>-->
							<!--              </router-link>-->
						</div>
						<div class = "nav-bottom">
							<div
								class = "flex-jus"
								style = "padding: 10px"
							>
								<div>
									<router-link
										class = "nav-m-help"
										to = "/page/instrutions"
									>公平游戏
									</router-link>
								</div>
								<div>
									<router-link
										class = "nav-m-help"
										to = "/page/helpcenter/activity"
									>帮助中心
									</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<!-- 辛运-->
		<div
			class = "ipad-top"
			v-show = "isActivePage"
		>
			<LuckBox></LuckBox>
		</div>
		<div
			v-if = "isPhone && isHome"
			class = "main-banner"
			style = "padding: 15px; background: #141727"
		>
			<swiper
				:options = "mainBannerOption"
				class = "main-banner-swiper"
				ref = "mainBanner"
			>
				<swiper-slide
					v-for = "el in bannerData"
					:key = "el.id"
					:class = "{ cursor: !!el.link }"
				>
					<img
						class = "swiperImg"
						:src = "imgHost(el.moveImage)"
						@click = "goFestival(el)"
						alt = ""
					/>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
import {
	mapState ,
	mapMutations,
} from "vuex";
import {
	getAction ,
	postAction,
} from "../api/manage";
import router from "../router/index";
import LuckBox from "./LuckBox";

export default reaxper({
	name : "menuHead" ,
	components : { LuckBox } ,
	data () {
		return {
			router ,
			isHome : true ,
			expendMenuM : false ,
			roomNum : 0 ,
			chargeMenuM : false ,
			show : true , // 路由隐藏
			bannerData : [] ,
			isPhone : false ,
			rollList : [] ,
			timer : null , // 定时器
			countDay : "00" ,
			countHours : "00" ,
			countSecond : "00" ,
			rollRoom : {} ,
			isActivePage : true ,
			isWelfare : false ,
			homeTask : [] ,
			mainBannerOption : {
				observer : true ,
				autoplay : {
					reverseDirection : true ,
					delay : 30000 ,
					disableOnInteraction : true ,
				} ,
				speed : 100 ,
				effect : "fade" ,
				pagination : {
					el : ".swiper-pagination" ,
					clickable : true ,
				} ,
			} ,
			url : {
				isOpen : "/api/battle/open" ,
				banner : "/api/home/sys/banner" ,
				roll : "/api/home/rooms" ,
				task : "/api/home/task/box" ,
			} ,
		};
	} ,
	computed : {
		...mapState("account" , {
			userInfo : (state) => state.user ,
		}) ,
	} ,
	watch : {
		$route () {
			this.isHome = this.$route.name === "Home";
			this.isWelfare = true;
			if ( this.$route.meta.isActive || this.$route.name === "Home" ) {
				this.isWelfare = false;
			}
			this.isActivePage = true;
			if ( this.$route.meta.isActive ) {
				this.isActivePage = false; // 推广码
			}
		} ,
	} ,
	created () {
		this.getBanner();
		this.isPhone = this.vw > 767 ? false : true;
		if ( !this.isPhone ) this.getRollList();
		this.timer = setInterval(() => {
			this.countDown(this.rollRoom.rollTime);
		} , 60 * 1000);
		this.isOpenBattle();
		this.getHomeTask();
	} ,
	beforeRouteLeave () {
		clearInterval(this.timer);
	} ,
	methods : {
		...mapMutations("account" , ["clearUser"]) ,
		goHome () {
			this.router.push("/");
		} ,
		goFestival (element) {
			this.$router.push(element.link);
		} ,
		goPay () {
			if ( !this.userInfo.id ) return this.$login();
			this.router.push("/user/assets");
		} ,
		goCase () {
			this.router.push("/user/case");
		} ,
		getRollList () {
			getAction(this.url.roll).then((res) => {
				if ( !!res.data ) {
					this.rollList = res.data;
					this.rollRoom = res.data[0];
					this.countDown(this.rollRoom.rollTime);
				}
			});
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
		getHomeTask () {
			getAction(this.url.task).then((res) => {
				this.homeTask = res.data;
			});
		} ,
		goWealfare (id) {
			this.$bus.$emit("showNotice" , id);
			localStorage.setItem("box" , JSON.stringify(id));
		} ,
		changeRoll (el) {
			this.rollRoom = el;
			this.countDown(this.rollRoom.rollTime);
		} ,
		async getBanner () {
			let res = await getAction(this.url.banner);
			this.bannerData = JSON.parse(res.data);
		} ,
		isOpenBattle (click) {
			getAction(this.url.isOpen).then((res) => {
				if ( res.data == 0 && click == "click" ) {
					this.$router.push("/page/caseBattle");
					this.show = true;
				}
				if ( res.data == 1 ) {
					this.show = false;
					if ( click == "click" ) return window.location.reload();
				}
			}).catch((e) => {
				this.$Message.error(e.response.data.errMsg);
			});
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
		jionRoll (id) {
			this.$router.push(`/page/roll/${ id }`);
		} ,
		goActive () {
			this.router.push("/page/active");
		} ,
		loginFunc () {
			console.log(this.$route.query.share);
			if ( this.$route.query.share !== undefined ) {
				this.$login(undefined , true);
			} else if ( window.location.search.indexOf("spread=") === - 1 ) {
				this.$login();
			}
		} ,
		loginOut () {
			postAction("/api/user/logout").then(() => {
				this.clearUser();
				localStorage.setItem("token" , "");
				this.$router.push("/");
			});
		} ,
	} ,
});
</script>

<style
	scoped
	lang = "less"
>
.active {
	color: #ffb554;
}

.main-banner {
	width: 100%;
	z-index: 0;

	/deep/ .swiper-slide {
		position: relative;

		.banner-info-words {
			position: absolute;
			top: 30%;
			left: 12%;

			h3 {
				font-size: 37px;
				font-family: PingFang SC;
				font-weight: bold;
				color: #ffffff;
				line-height: 41px;
				margin-bottom: 0.2rem;
			}

			p {
				font-size: 20px;
				font-family: PingFang SC;
				font-weight: bold;
				color: #ffffff;
				line-height: 22px;
			}
		}
	}

	/deep/ .main-banner-swiper {
		position: relative;
		width: 100%;
		font-size: 0;

		.swiperImg {
			width: 100%;
		}

		.swiperBtn {
			position: absolute;
			display: block;
			width: 2.4rem;
			height: 1.1rem;
			left: 0;
			right: 0;
			margin: auto;
			top: 38%;
			left: 43%;
			cursor: pointer;
		}

		.swiper-pagination {
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 35%;
			left: 13%;
			z-index: 4;

			.swiper-pagination-bullet {
				margin: 0.1rem;
				background-color: #ffffff;
				transform: scale(2);
				cursor: pointer;
				border-radius: 0;
				opacity: 1;

				&:hover {
					background-color: #ffca6e;
				}

				&.swiper-pagination-bullet-active {
					background-color: #d8a92a;
					position: relative;

					&:after {
						content: "";
						width: 47%;
						height: 47%;
						background: black;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}
			}
		}
	}
}
</style>
