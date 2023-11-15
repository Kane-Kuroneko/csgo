<template>
	<div class = "store">
		<!-- 筛选 -->
		<div
			class = "search-box"
			:class = "{ 'dota-bg': searchForm.game === 570, 'search-box-m': $store.state.account.isPhone }"
		>
			<div
				class = "layout ranking-bg"
				style = "margin: auto"
			>
				<Title name = "商城"></Title>
				<div
					class = "screening"
					style = "margin-bottom: 20px"
				>
					<div
						class = "default-btn type-btn"
						:class = "{ active: kind === 0 }"
						@click = "kind = 0"
					>CSGO
					</div>
					<div
						v-if="false"
						class = "default-btn type-btn"
						:class = "{ active: kind === 1 }"
						@click = "kind = 1"
					>CSOL
					</div>
				</div>
				<div v-show = "kind === 0">
					<storeT
						class = "hide-m"
						:isPc = "false"
						:csgoType = "searchJSON.csgo"
						:dotaType = "searchJSON.dota"
						:searchForm.sync = "searchForm"
						:type = "searchForm.game === 730 ? 'csgo' : 'dota'"
					/>
					<div class = "search-screening hide-m">
						<Input
							class = "search-input"
							v-model = "searchForm.name"
							clearable
							placeholder = "输入皮肤名称搜索"
						/>
					</div>
					
					<div
						class = "search-screening-m hide-ipad hide-p"
						style = "margin-top: 0.2rem"
					>
						<Input
							class = "search-input"
							v-model = "searchForm.name"
							style = "width: 78%"
							clearable
							placeholder = "输入皮肤名称搜索"
						/>
						<div
							class = "default-btn"
							style = "padding: 5px 15px"
							@click = "searchFunc($event)"
						>搜索
						</div>
					</div>
					<!--                移动端筛选-->
					<div
						class = "screening-m hide-p hide-ipad"
						@click = "show = !show"
					>
						更多筛选
						<Icon type = "md-arrow-dropdown" />
					</div>
					<div v-if = "show">
						<storeSearchM
							class = "hide-ipad hide-p"
							:isPc = "false"
							:csgoType = "searchJSON.csgo"
							:dotaType = "searchJSON.dota"
							:searchForm.sync = "searchForm"
							:type = "searchForm.game === 730 ? 'csgo' : 'dota'"
						></storeSearchM>
						<div class = "screening-m-sore hide-p hide-ipad">
							<div
								class = "price-range-item"
								style = "width: 70%"
							>
								<div class = "ivu-icons">
									<Input
										class = "search-input search-input-box"
										type = "number"
										style = "margin: 0 0.1rem; width: 1.5rem;background-color: #fff;"
										v-model = "searchForm.startPrice"
										@on-clear = "searchFunc($event)"
										clearable
										icon = "iconfont icon-icon_diamond1 "
										placeholder = "最低价"
									/>
									<i
										class = "iconfont icon-icon_diamond1"
										style = "opacity: 0.5"
									></i>
								</div>
								<span style = "color: #98a8b4">---</span>
								<div class = "ivu-icons">
									<Input
										class = "search-input search-input-box"
										type = "number"
										icon = "iconfont icon-icon_diamond1 "
										style = "margin: 0 0.1rem; width: 1.5rem;background-color: #fff;"
										v-model = "searchForm.endPrice"
										@on-clear = "searchFunc($event)"
										clearable
										placeholder = "最高价"
									/>
									<i
										class = "iconfont icon-icon_diamond1"
										style = "opacity: 0.5"
									></i>
								</div>
								<div @click = "sortPrice()" style="display: flex;margin-left: 0;">5a
									<span>{{ searchForm.sort == 1 ? "升序" : "降序" }}</span>
									<i
										class = "iconfont iconicon-arrow"
										:class = "{ 'sort-down': searchForm.sort !== 1 }"
									></i>
								</div>
							</div>
						</div>
					</div>
					<div class = "select-box hide-m">
						<div class = "price-range-item">
							<div class = "ivu-icons">
								<Input
									class = "search-input-box"
									type = "number"
									icon = "iconfont icon-icon_diamond1 "
									style = "margin: 0 0.1rem; width: 1.5rem"
									v-model = "searchForm.startPrice"
									placeholder = "最低价"
								/>
								<i
									class = "iconfont icon-icon_diamond1"
									style = "opacity: 0.5"
								></i>
							</div>
							<span style = "color: #98a8b4">-----</span>
							<div class = "ivu-icons">
								<Input
									class = "search-input-box"
									type = "number"
									icon = "iconfont icon-icon_diamond1 "
									style = "margin: 0 0.1rem; width: 1.5rem"
									v-model = "searchForm.endPrice"
									placeholder = "最高价"
								/>
								<i
									class = "iconfont icon-icon_diamond1"
									style = "opacity: 0.5"
								></i>
							</div>
							<div @click = "sortPrice()">
								{{ searchForm.sort == 1 ? "升序" : "降序" }}
								<i
									class = "iconfont iconicon-arrow"
									:class = "{ 'sort-down': searchForm.sort !== 1 }"
								></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--        物品栏-->
		<div class = "item-drop layout">
			<template v-if = "dropGun.length > 0">
				<div class = "drop-del">
					<div v-if = "kind === 1">
						<div
							v-for = "(el, idx) in csolList"
							:key = "idx"
							class = "skins-con"
							@click = "buyHandle"
						>
							<div class = "drop-qua-csol">
								<div style = "display: flex; justify-content: space-between; padding: 3px 5px 0">
									<p class = "good-price">
										<span>
											<i class = "iconfont icon-icon_diamond1"></i>
										</span>
										<span> {{ el.amount }}</span>
									</p>
								</div>
								<div class = "drop-gun-img">
									<img
										:src = "imgHost(el.image)"
										alt = "skins"
									/>
								</div>
							</div>
							<div class = "store-goods">
								<p>{{ el.name.split(" ")[0] }}</p>
								<p>{{ el.name.split(" ")[1] }}</p>
							</div>
						</div>
					</div>
					<SkinsItem
						v-if = "kind === 0"
						:skins-data = "dropGun"
						@choseSkins = "buyHandle"
					></SkinsItem>
				</div>
				<div
					class = "page-box"
					v-show = "kind === 0"
				>
					<Page
						:current = "currPage"
						:total = "currTotal"
						:page-size = "searchForm.size"
						@on-change = "jumpPageFunc"
						v-show = "currTotal > 0"
					/>
				</div>
			</template>
			<Empty v-else></Empty>
		</div>
		<div></div>
		<!-- 弹窗设置交易链接 -->
		<user-info
			:show = "setTradeUrlModal.show"
			:changeType = "setTradeUrlModal.type"
			:title = "setTradeUrlModal.title"
			@showChange = "showChange"
		>
			<i
				slot = "close"
				class = "iconfont iconguanbi1 close-btn"
				@click = "setTradeUrlModal.show = false"
			></i>
		</user-info>
		<HashModule
			v-model = "modal"
			title = "商品详情"
			width = "7"
		>
			<div class = "buy-modal">
				<SkinsItem
					:skins-data = "[buyGoods]"
					v-shpw = "kind === 0"
					:is-price = "false"
				></SkinsItem>
				<div
					class = "skins-con"
					@click = "buyHandle"
					v-if = "kind === 1"
				>
					<div class = "drop-qua-csol">
						<div style = "display: flex; justify-content: space-between; padding: 3px 5px 0">
							<p class = "good-price">
								<span>
									<i class = "iconfont icon-icon_diamond1"></i>
								</span>
								<span> {{ buyGoods[0].amount }}</span>
							</p>
						</div>
						<div class = "drop-gun-img">
							<img
								:src = "imgHost(buyGoods[0].image)"
								alt = "skins"
							/>
						</div>
					</div>
					<div class = "store-goods">
						<p>{{ buyGoods[0].name.split(" ")[0] }}</p>
						<p>{{ buyGoods[0].name.split(" ")[1] }}</p>
					</div>
				</div>
				<div class = "buy-modal-des">
					<p>
						<i class = "iconfont icon-icon_diamond1"></i>
						{{ buyGoods.salePrice }}
					</p>
					<div
						@click = "buyFunc(buyGoods)"
						class = "default-btn"
						v-if = "buyGoods.isStock === 0"
					>立即购买
					</div>
					<div
						class = "default-btn"
						v-else
					>暂无库存
					</div>
				</div>
			</div>
			<p class = "charge-pro">充值兑换指南和常见问题可查阅
				<span
					@click = "goHelp"
					class = "help-txt"
				> 帮助文档
				</span>
			</p>
		</HashModule>
	</div>
</template>

<script>
import searchJSON from "@/utils/storeSearch.json";
import Empty from "../components/Empty/Empty";
import storeT from "../components/storeTypeSearch";
import { getAction , postAction } from "../api/manage";
import { getCoolTime , getPosition } from "../utils/utils";
import storeSearchM from "./storeSearchM";
import { mapState , mapActions , mapMutations } from "vuex";
import userInfo from "../components/userInfo";
import router from "../router/index";
import HashModule from "../components/HashModule/HashModule.vue";
import Title from "../components/Title";
import SkinsItem from "@/components/SkinsItem";

export default {
	components : {
		SkinsItem ,
		storeT ,
		Empty ,
		userInfo ,
		storeSearchM ,
		HashModule ,
		Title,
	} ,
	data () {
		return {
			searchJSON : searchJSON ,
			modal : false ,
			kind : 0 , // 分类筛选
			csolList : [] ,
			router ,
			ascending : 1 ,
			descending : 2 ,
			show : false ,
			buyGoods : [] ,
			dropGun : [] ,
			lastPage : null ,
			limiting : null ,
			setTradeUrlModal : {
				show : false ,
				title : "设置交易链接" ,
				type : "tradeUrl" ,
			} ,
			searchForm : {
				game : 730 ,
				sort : 2 ,
				name : "" ,
				startPrice : null ,
				endPrice : null ,
				category : "" ,
				exterior : "" ,
				quality : "" ,
				coolingtime : "" ,
				levelName : 0 ,
				darkGold : "" ,
				rarity : "" ,
				current : 1 ,
				size : 56 ,
			} ,
			itemHolder : 0 ,
			showMExpend : false , // 移动端显示筛选
			data : [] ,
			timeout : null ,
			currPage : 1 ,
			currTotal : 0 ,
			canBuy : true , // 是否可点击购买，反正连续点击
			typeCategory : null ,
		};
	} ,
	mounted () {
		this.getData(this.searchForm);
		this.getCsol();
	} ,
	watch : {
		searchForm : {
			handler (nv) {
				clearTimeout(this.limiting);
				this.limiting = setTimeout(() => {
					if ( nv.current === this.lastPage ) {
						this.searchForm.current = 1;
					}
					this.getData(this.searchForm);
				} , 500);
			} ,
			deep : true ,
		} ,
	} ,
	computed : {
		...mapState("account" , ["user"]) ,
	} ,
	methods : {
		...mapActions("account" , ["getUser"]) , ...mapMutations("account" , ["updateBagNum"]) ,
		showChange (val) {
			this.setTradeUrlModal.show = val;
		} ,
		getCsol () {
			getAction("/api/csol/market").then(res => {
				this.csolList = res.data;
			});
		} ,
		goHelp () {
			this.router.push("/page/helpcenter/Unabletoretrieve");
		} ,
		sortPrice () {
			this.searchForm.sort == 1 ? (this.searchForm.sort = 2) : (this.searchForm.sort = 1);
		} ,
		setItemHolder (len) {
			if ( this.vw < 768 ) {
				this.itemHolder = 0;
			} else if ( this.vw >= 768 && this.vw < 1024 ) {
				//箱子数量为3的倍数
				this.itemHolder = 3 - (len % 3 == 0 ? len : len % 3);
			} else if ( this.vw >= 1024 && this.vw < 1155 ) {
				//箱子数量为5的倍数
				this.itemHolder = 4 - (len % 4 == 0 ? len : len % 4);
			} else if ( this.vw >= 1155 && this.vw < 1550 ) {
				this.itemHolder = 4 - (len % 4 == 0 ? len : len % 4);
			} else {
				this.itemHolder = 5 - (len % 5 == 0 ? len : len % 5);
			}
		} ,
		getData (params) {
			let param = { type : 1 , ...params };
			getAction("/api/market/market/skins" , param).then(res => {
				this.lastPage = params.current;
				this.dropGun = this.handleData(res.data.records , this.searchForm.game);
				this.currPage = res.data.current;
				this.currTotal = res.data.total || 0;
				this.setItemHolder(this.data.length);
			}).catch(() => {
				this.$Spin.hide();
			});
		} ,
		handleData (data , type) {
			type = type === 730 ? "csgo" : "dota";
			data.map(item => {
				let splitStr = type === "csgo" ? "|" : " ";
				let name = item.name.split(splitStr);
				item.name1 = name[0];
				item.name2 = name.splice(1 , name.length).join("｜");
				const flag = type === "csgo" ? "exterior" : "rarity";
				let pz = this.searchJSON[type][flag].find(txt => {
					return txt.value === item[flag];
				});
				item.pz = pz ? pz["labelZH"] : "";
				if ( item.coolingTime ) {
					item.coolingTimeText = getCoolTime(item.coolingTime);
				}
			});
			return data;
		} ,
		jumpPageFunc (page) {
			this.searchForm.current = page;
			this.currPage = page;
			document.body.scrollTop = 300;
		} ,
		searchFunc (e , sort = this.searchForm.sort) {
			this.searchForm.sort = sort;
			this.searchForm.current = 1; // 都从第一页开始查询
			this.getData(this.searchForm);
			if ( e ) this.showMExpend = false;
		} ,
		buyFunc (item , index) {
			// 关闭详情弹窗
			this.modal = false;
			// 不可点击返回
			if ( !this.canBuy ) {
				return false;
			}
			// 检测是否登录
			if ( !localStorage.getItem("token") ) {
				this.$login();
				return false;
			}
			// if (!this.user.tradeUrl) {
			//   this.setTradeUrlModal.show = true;
			//   return false;
			// }
			if ( this.user.balance < item.salePrice ) {
				this.$Modale("余额不足" , "<p>您的钻石不足，购买游戏饰品可获得赠送钻石</p>" , 1);
				return false;
			}
			this.canBuy = false; //不可点击
			let params = {
				skinsId : item.skinsId ,
				price : item.salePrice,
			};
			postAction("/api/market/market/buy" , params).then(res => {
				this.$Message.success("购买成功");
				this.getUser();
				this.canBuy = true; //可点击
				// this.ParabolaFunc(index);
				this.searchFunc(this.searchForm);
			}).catch(err => {
				if ( err.response.data.errCode === 505 ) return this.$nameAuth(1);
				this.$result("购买失败" , {
					errMsg : err.response.data.errMsg ,
					errCode : err.response.data.errCode ,
					storeError : true ,
				});
				this.canBuy = true; //可点击
			});
		} ,
		ParabolaFunc (index) {
			let element = this.$refs["moveEle" + index][0] ,
				target = document.getElementById("targetEle");
			let posi = getPosition(element , target);
			
			let bagAnim = new TWEEN.Tween({
				x : posi.ele.x ,
				y : posi.ele.y ,
				rotation : 0 ,
				scale : 1.1,
			}).to({
				x : posi.target.x ,
				y : posi.target.y ,
				rotation : 720 ,
				scale : 0.6,
			} , 600).easing(TWEEN.Easing.Linear.None).onUpdate(function (current) {
				if ( element ) {
					element.style.setProperty("z-index" , "99");
					element.style.setProperty("opacity" , "1");
					element.style.setProperty("transform" , `translate(${ current.x }px,${ current.y }px) rotate(${ current.rotation }deg) scale(${ current.scale })` );
				} else {
					bagAnim.stop();
				}
			});
			bagAnim.onComplete(current => {
				setTimeout(() => {
					// element.style.display = 'back'
					element.style.setProperty("z-index" , "0");
					element.style.setProperty("opacity" , "0");
					element.style.setProperty("transform" , `none`);
					this.updateBagNum();
					this.getUser(); //更新余额
				} , 300);
			});
			bagAnim.start();
		} ,
		buyHandle (el , idx) {
			if ( !this.user.id ) return this.$login();
			this.modal = true;
			this.buyGoods = el;
		} ,
	} ,
};
</script>

<style
	lang = "less"
	scoped
>
.ivu-select-selected-value {
	background: #98a8b4;
	border: 0px solid #030000;
	box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
	border-radius: 3px;
}

.ivu-select-selection {
	background: #98a8b4;
	border: none;
}

.ivu-input-group-append {
	background: linear-gradient(0deg, #e59827, #efa435);
	border: 0px solid #030000;
	box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.25);
	border-radius: 3px;
	color: #0a0a0a;
	font-weight: bold;
}

.ivu-input-group-append i {
	font-size: 14px;
}

.ivu-input-number-input {
	/* background: #98a8b4; */
	border: 0px solid #030000;
	box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1);
	border-radius: 3px;
}
.ivu-input{
	background: #fff !important;
}
.ivu-input-number-handler-wrap {
	display: none;
}

.ivu-modal-content {
	border-radius: 0;
}

.store-item:hover {
	transform: translateY(-6px);
}

.ivu-modal-header {
	background: linear-gradient(45deg, #313131, #010101);
	text-align: center;
	padding: 0.15rem;
}

.ivu-input-number .ivu-input-number-input-wrap {
	background: #98a8b4;
}

.ivu-modal-header-inner {
	color: #fffffe;
}

.ivu-modal-body {
	background: linear-gradient(92deg, #dddddd, rgba(170, 178, 182, 0));
	border: 0px solid #030000;
	box-shadow: 0px 1px 50px 0px rgba(0, 0, 0, 0.9);
}

</style>
