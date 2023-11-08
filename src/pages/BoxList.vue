<template>
	<div class = "box-list">
		<div style="overflow: hidden">
			<div
				class = "layout"
				style = "margin: auto;padding: 0 30px;"
			>
				<div class="banner" :style="{height : isPhone ? '200px' : '400px'}">
					<img v-if="'CSGO HASH箱',+boxType !== 0" :src="imgTitleHash" style="margin: 0 auto;display: block;">
					<img v-if="'CSGO 经典箱',+boxType === 0" :src="imgTitleClassic" style="margin: 0 auto;display: block;">
				
				</div>
				
				<div
					@click = "isSearch = !isSearch"
					class = "search-range hide-m"
					:class = "{ 'search-range-m': $store.state.account.isPhone }"
					v-show = "!isSearch,false"
				>
					<p>按掉落饰品和价格区间筛选箱子</p>
					<div>
						<i
							style = "color: #000000"
							class = "iconfont icon-icon-search"
						></i>
					</div>
				</div>
				<div
					class = "hide-m"
					style = "display: flex; justify-content: space-around;margin-top: 40px;"
					v-show = "isSearch,true"
				>
					<div class = "search-box-type hide-m">
						<div
							v-if="false"
							class = "cursor"
							style = "color: #fffffe; margin-right: 10px"
							@click.prevent.stop = "
								isSearch = !isSearch;
								getBoxData(boxType);
							"
						>
							<i class = "iconfont icon-icon-close"></i>
						</div>
						<div
							class = "screening-input"
							style = "margin: 0 60px 0 0"
						>
							<Input
								class = "search-input search-input-box"
								size = "large"
								@on-enter = "searchFunc($event)"
								v-model = "searchForm.name"
								style = "width: 120%"
								placeholder = "输入皮肤名称搜索"
							/>
						</div>
						<div
							class = "screening-type"
							style = "align-items: center"
						>
							<div style = "margin-right: 3px">
								<div class = "ivu-icons">
									<Input
										class = "search-input search-input-box num-input"
										type = "number"
										icon = "iconfont icon-icon_diamond1 "
										v-model = "searchForm.startPrice"
										size = "large"
										placeholder = "箱子最低价"
									/>
									<i class = "iconfont icon-icon_diamond1"></i>
								</div>
							</div>
							<span style = "color: #98a8b4"> ------</span>
							<div>
								<div class = "ivu-icons">
									<Input
										class = "search-input search-input-box num-input"
										type = "number"
										icon = "icon-icon_diamond1"
										v-model = "searchForm.endPrice"
										size = "large"
										style = "margin-left: 3px"
										placeholder = "箱子最高价"
									/>
									<i class = "iconfont icon-icon_diamond1"></i>
								</div>
							</div>
						</div>
						<div
							class = "price-sort"
							@click = "
								searchForm.sort === 1
									? (searchForm.sort = 0)
									: (searchForm.sort = 1)
							"
							style = "font-size: 15px"
						>
							{{ searchForm.sort == 1 ? "升序" : "降序" }}
							<i
								style = "font-size: 13px; opacity: 0.5"
								:class = "{ 'sort-down': searchForm.sort === 0 }"
								class = "iconfont iconicon-arrow"
							></i>
						</div>
					</div>
				</div>
				<div class = "hide-p hide-ipad search-box-t-m">
					<div
						style = ""
						class = "search-flex"
					>
						<Input
							class = "search-input search-input-box"
							size = "large"
							@on-enter = "searchFunc($event)"
							v-model = "searchForm.name"
							style = "width: 80%"
							placeholder = "输入皮肤名称搜索"
						/>
						<div
							class = "default-btn"
							@click = "searchFunc(searchForm)"
						>
							搜索
						</div>
					</div>
					<div
						class = "screening-type"
						style = "align-items: center"
					>
						<div
							class = "search-flex"
							style = "width: 80%; align-items: center"
						>
							<div
								class = "ivu-icons"
								style = "margin-right: 3px; width: 43%"
							>
								<Input
									class = "search-input search-input-box num-input"
									type = "number"
									v-model = "searchForm.startPrice"
									size = "large"
									placeholder = "最低价"
								/>
								<i class = "iconfont icon-icon_diamond1"></i>
							</div>
							<span style = "color: #98a8b4"> 至</span>
							<div
								class = "ivu-icons"
								style = "width: 43%"
							>
								<Input
									class = "search-input search-input-box num-input"
									type = "number"
									v-model = "searchForm.endPrice"
									size = "large"
									style = "margin-left: 3px"
									placeholder = "最高价"
								/>
								<i class = "iconfont icon-icon_diamond1"></i>
							</div>
						</div>
						<div
							class = "default-btn up-down"
							@click = "
								searchForm.sort === 1
									? (searchForm.sort = 0)
									: (searchForm.sort = 1)
							"
						>
							{{ searchForm.sort === 0 ? "降序" : "升序" }}
						</div>
					</div>
				</div>
				<div
					class = "tradition-content"
					v-for = "(el, idx) in limitBox"
					:key = "el.title"
					v-show = "limitBox.length > 0"
				>
					<div
						class = "list-title"
						:class = "
							'list-title-' + (Math.floor(Math.random() * (4 - 1)) + 1)
						"
					>
						<TimeCount
							:ref = "`timeCount${idx}`"
							v-show = "!$store.state.account.isPhone"
							:time = "discount.endTime"
						>
							<img
								src = "../assets/image/newyear/dcounts.png"
								alt = ""
							/>
						</TimeCount>
						<HrTitle :title="!!el.title ? el.title : ''"></HrTitle>
					</div>
					<TimeCount
						style = "margin: 10px auto"
						v-if = "!!discount.endTime && $store.state.account.isPhone"
						:time = "discount.endTime"
					>
						<img
							src = "../assets/image/newyear/dcounts.png"
							alt = ""
						/>
					</TimeCount>
					<div class = "grid-phone">
						<div
							class = "home-box-item"
							@click = "goBox(item)"
							:style = "{
								'background-image':
									'url(' + imgHost(item.beasemap) + ')',
							}"
							v-for = "item in el.boxVoList"
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
									{{ boxType === 0 ? "经典箱" : "HASH箱" }}
								</div>
							</div>
							<div class = "hash-win-pro">
								<div style = "font-size: 0.2rem">
									{{
										item.probability
									}}
									<span>{{ boxType !== 0 ? "胜" : "倍" }}</span>
								</div>
							</div>
							<div
								class = "home-box-img"
								style = "margin-bottom: 0.2rem"
							>
								<img
									v-lazy = "imgHost(item.background)"
									style = "height: 100%"
								/>
								<img
									v-lazy = "imgHost(item.image)"
									style = "height: 70%"
								/>
							</div>
							<p style="font-weight: bold;font-size: 24px;">{{ item.name }}</p>
							<div
								class = "hide-hover"
								v-show = "discount.endTime"
							>
								<div class = "sell-price">
									<span>
										{{
											(item.discountPrice * discount.discount).toFixed(2)
										}}
									</span
									>
								</div>
								<div class = "count-price">
									<i class = "iconfont icon-icon_diamond2"></i>
									{{ item.discountPrice.toFixed(2) }}
								</div>
							</div>
							<div
								class = "hide-hover"
								v-show = "!discount.endTime"
							>
								<div class = "sell-price">
									
									<span>💎 {{ item.discountPrice.toFixed(2) }}</span>
								</div>
							</div>
							<span
								class = "original-price"
								v-show = "boxType === 0 && item.discount < 1"
							>
								{{ item.price }}
							</span>
							<div class = "hover-line"></div>
						</div>
					</div>
				</div>
				<Empty v-show = "limitBox[0].boxVoList.length === 0"></Empty>
			</div>
		</div>
	</div>
</template>

<script>
import { getAction } from "../api/manage";
import Title from "../components/Title";
import Empty from "@/components/Empty/Empty.vue";
import TimeCount from "@/components/NewYear/Module/TimeCount";
import {
	mapActions ,
	mapState,
} from "vuex";
import {HrTitle} from '@/New.Components';
import imgTitleHash from './BoxList.asset/img.png';
import imgTitleClassic from './BoxList.asset/img_1.png';
import { reaxel_initial } from '@/reaxels/initial';
import { reaxel_Audio } from '@/reaxels/initial/audio';

export default reaxper({
	status(){
		const {isPhone} = reaxel_initial().initialStore;
		return {
			isPhone,
		}
	},
	name : "boxList" ,
	components : {
		Title ,
		Empty ,
		TimeCount,
		HrTitle,
	} ,
	data () {
		return {
			imgTitleHash,
			imgTitleClassic,
			limitBox : [{ boxVoList : [] }] ,
			gameId : 730 ,
			title : "" ,
			isSearch : false ,
			searchForm : {
				name : "" ,
				startPrice : "" ,
				endPrice : "" ,
				sort : 1 ,
			} ,
			boxType : 0 ,
			url : {
				boxs : "/api/box/boxs" ,
				filter : "/api/box/query/boxs" ,
			} ,
		};
	} ,
	watch : {
		$route () {
			this.boxType = this.$route.params.type === "traditonal" ? 0 : 1;
			this.getBoxData(this.boxType);
		} ,
		searchForm : {
			handler () {
				this.searchFunc(this.searchForm);
			} ,
			deep : true ,
		} ,
	} ,
	computed : {
		...mapState("account" , {
			discount : (state) => state.userDiscount.openBox ?
			                      state.userDiscount.openBox :
				{
					discount : 1 ,
					endTime : "",
				} ,
		}) ,
	} ,
	created () {
		this.boxType = this.$route.params.type === "traditonal" ? 0 : 1;
		this.getBoxData(this.boxType);
	} ,
	beforeDestroy () {
		for ( let i = 0 ; i < this.limitBox.length ; i ++ ) {
			let a = "timeCount" + i;
			clearInterval(this.$refs[a][0].timer);
		}
	} ,
	methods : {
		...mapActions("account" , ["getDiscount"]) ,
		searchFunc (data) {
			if(this.searchForm.name==''&&this.searchForm.startPrice==''&&this.searchForm.endPrice==''){
				this.getBoxData(this.boxType);
				return
			}
			let parmas = {
				...data ,
				type : this.boxType,
			};
			getAction(this.url.filter , parmas).then((res) => {
				this.limitBox = [res.data];
			});
		} ,
		async getBoxData (type) {
			let params = { boxType : type };
			try {
				let res = await getAction(this.url.boxs , params);
				this.limitBox = res.data;
				this.limitBox.forEach((el) => {
					el.boxVoList.forEach((item) => {
						if ( this.boxType === 0 ) {
							return (item.randomIndex = Math.floor(Math.random() * (5 - 0) ));
						}
						item.randomIndex = Math.floor(Math.random() * (10 - 5) + 5);
					});
				});
			}
			catch ( e ) {
				this.$Spin.hide();
			}
		} ,
		goBox (el) {
			reaxel_Audio().audios.goBox.play();
			localStorage.setItem("box" , JSON.stringify(el));
			this.$router.push("/steer/case");
		} ,
	} ,
});
</script>

<style scoped lang="less">

.search-box-type {
	display: flex;
	align-items: center;
	transition: width 1s inherit;
}

.search-range {
	text-align: center;
	font-size: 15px;
	color: #ffca6e;
	line-height: 36px;
	font-weight: bold;
}

.search-range > div {
	display: inline-block;
	margin-left: 10px;
	background: #fcc601;
	border-radius: 50%;
	height: 30px;
	width: 30px;
	line-height: 30px;
	cursor: pointer;
}

.search-range > p {
	display: inline-block;
	color: #ffca6e;
}

.banner {
	display: flex;
	justify-content: center;
	align-items: center;
	
	img{
		margin: 0 auto;
		display: block;
		height: 100%;
	}
}
</style>
