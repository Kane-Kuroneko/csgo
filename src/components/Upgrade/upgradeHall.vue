<template>
	<div class = "up-hall layout mar-auto">
		<!--    导航-->
		<div class = "battle-top-box up-top">
			<HrTitle title = "升级大厅"></HrTitle>
			<div class = "tips-battle">
				<div @click = "goSelf()" style="display: flex;align-items: center;gap:12px;">
					<img :src="imgPerson" width="32">
					升级个人中心
				</div>
			</div>
			<div class = "battle-room-tap">
				<div @click = "tap = 0">
					<img
						src = "../../assets/image/upgrade/Hall/img_1.png"
						alt = ""
						style = "width: 100%"
					/>
				</div>
				<div class = "ranking-tap">
					<div
						@click = "tap = 1"
						:class = "{ active: tap === 1 }"
					>
						<div class = "tap-i">
							<i class = "iconfont icon-icon_friend"></i>
						</div>
						<div class = "tap-name">我的好友</div>
					</div>
					<div
						@click = "tap = 2"
						:class = "{ active: tap === 2 }"
					>
						<div class = "tap-i">
							<i class = "iconfont icon-icon_ranking"></i>
						</div>
						<div class = "tap-name">升级榜单</div>
					</div>
				</div>
			</div>
			
		</div>
		
		<div style="margin-top: 1rem;">
			<!-- width: 250px;
			position: absolute;
			bottom: -33px;
			left: 50%;
			transform: translateX(-50%);
			cursor: pointer; -->
			<img
				@click = "$router.push('/page/upgrade')"
				style="width: 250px;display: block;margin: 0 auto;"
				class = "war-hover"
				src="../../assets/image/upgrade/Hall/img_4.png"
				alt = ""
			/>
		</div>
		<div
			v-if = "tap === 0"
			class = "hall-container"
		>
			<!--      故事区-->
			<div class = "story-container">
				<div class = "store-box">
					<div
						class = "story-item cursor"
						v-for = "el in hallStoryData.records"
						@click = "goDetail(el)"
					>
						<div class = "up-ava">
							<!--              <img :src="imgHost(el.avatar)" alt="">-->
							<SkinsAvatar
								wd = "100px"
								ht = "100px"
								:img = "el.avatar"
								:head-frame = "el.headPortraitBox"
							>
							</SkinsAvatar>
						</div>
						<div class = "up-name">
							<div>{{ el.name }}
								<span> 的升级故事</span>
							</div>
							<p>详情 >></p>
						</div>
						<div
							class = "sy-name"
							:style = "{ background: colorRgba('#' + el.color, 0.4) }"
						>
							<img
								:src = "imgHost(el.emoteIcon)"
								alt = ""
							/>
							<div
								:title = "el.storyName"
								class = "sy-text over-flow-hide"
							>
								{{ el.storyName }}
							</div>
							<div
								class = "likes"
								:style = "{
									'background-image': `url(${imgHost(
										el.giveALikeIcon,
									)})`,
								}"
							>
								<p>{{ el.thumbsUpNumber }}</p>
							</div>
						</div>
						<div class = "up-skins">
							<div class = "skins-value">
								<div align = "center">
									<img
										:src = "imgHost(el.consumeSkinsImage)"
										alt = ""
										v-if = "el.consumeSkinsImage"
										style = "aspect-ratio: 1.4"
									/>
									<img
										src = "../../assets/image/upgrade/Hall/diamond.png"
										style = "width: 70px"
										v-else
										alt = ""
									/>
								</div>
								<div class = "story-sk-price">
									<i
										class = "iconfont icon-icon_diamond1 story-sk-price"
										v-if = "el.consumeSkinsPrice !== 0"
									></i
									>
									<span>
										{{
											el.consumeSkinsPrice === 0 ? el.deviationAmount : el.consumeSkinsPrice
										}}
									</span
									>
								</div>
								<p
									v-if = "
										el.deviationAmount && el.consumeSkinsPrice !== 0
									"
								>
									+
									<i class = "iconfont icon-icon_diamond1"></i
									>
									<span> {{ el.deviationAmount }}</span>
								</p>
							</div>
							<div class = "up-round">
								<p>{{ el.count }}</p>
							</div>
							<div class = "skins-value">
								<div align = "center">
									<img
										v-if = "el.targetSkinsImage"
										:src = "imgHost(el.targetSkinsImage)"
										alt = ""
										style = "aspect-ratio: 1.4"
									/>
									<img
										style = "width: 40px"
										v-else
										class = "end-img"
										src = "../../assets/image/upgrade/Hall/why.png"
										alt = ""
									/>
								</div>
								<div class = "story-sk-price">
									<i
										class = "iconfont icon-icon_diamond1 story-sk-price"
									></i
									>
									<span>
										{{
											el.targetSkinsPrice ? el.targetSkinsPrice : "???"
										}}
									</span
									>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class = "page-box"
					style = "margin: 50px auto"
				>
					<Page
						class = "mar-auto"
						v-if = "dataPage.total !== 0"
						:current = "dataPage.current"
						:total = "dataPage.total"
						:page-size = "dataPage.size"
						@on-change = "jumpStoryFunc"
					/>
				</div>
			</div>
			<!--      数据区-->
			<div
				v-if = "!isPhone"
				class = "data-container"
			>
				<div class = "data-top">
					<img
						class = "war-hover"
						@click = "$router.push('/upgrade/detail')"
						src = "../../assets/image/upgrade/Hall/morebtn.png"
						alt = ""
					/>
				</div>
				<div class = "data-box">
					<transition-group
						appear
						name = "invite"
						tag = "ul"
					>
						<li
							class = "data-item"
							v-for = "el in hallTextData"
							:key = "el.consumeSkinsId + el.targetSkinsId"
						>
							<div class = "item-top">
								<img
									:src = "imgHost(el.avatar)"
									alt = ""
								/>
								<div class = "data-user-name">
									<p class = "over-flow-hide">{{ el.name }}</p>
									<p
										class = "up-success"
										:class = "{ fail: el.result }"
									>
										{{ !el.result ? "升级成功" : "升级失败" }}
									</p>
								</div>
							</div>
							<div class = "data-bot">
								<div
									class = "line-data"
									:class = "{ fail: el.result }"
								></div>
								<div class = "up-skins">
									<div class = "skins-value">
										<div align = "center">
											<img
												:src = "imgHost(el.consumeSkinsImage)"
												alt = ""
												v-if = "el.consumeSkinsImage"
											/>
											<img
												src = "../../assets/image/upgrade/Hall/diamond.png"
												v-else
												alt = ""
											/>
										</div>
										<div>
											<i
												v-if = "el.consumeSkinsPrice !== 0"
												class = "iconfont icon-icon_diamond1"
											></i
											>
											<span>
												{{
													el.consumeSkinsPrice === 0 ? el.deviationAmount : el.consumeSkinsPrice
												}}
											</span
											>
										</div>
									</div>
									<div class = "point-color">
										<img
											src = "../../assets/image/upgrade/upgradeSucces.png"
											v-if = "!el.result"
											alt = ""
										/>
										<img
											src = "../../assets/image/upgrade/upgradePoint.png"
											v-else
											alt = ""
										/>
										<p
											v-if = "
												el.deviationAmount &&
												el.consumeSkinsPrice !== 0
											"
										>
											+
											<i class = "iconfont icon-icon_diamond1"></i
											>
											<span> {{ el.deviationAmount }}</span>
										</p>
									</div>
									<div class = "skins-value">
										<div align = "center">
											<img
												:src = "imgHost(el.targetSkinsImage)"
												alt = ""
											/>
										</div>
										<div>
											<i class = "iconfont icon-icon_diamond1"></i
											>
											<span> {{ el.targetSkinsPrice }}</span>
										</div>
									</div>
								</div>
							</div>
						</li>
					</transition-group>
				</div>
			</div>
			<div
				v-if = "isPhone"
				class = "float-data"
				:class = "{ active: showData }"
			>
				<div
					class = "float-decration"
					@click = "showData = !showData"
				>
					<i
						:class = "{ 'sort-down': showData }"
						class = "iconfont icon-icon_arrow"
					></i>
				</div>
				<div class = "float-box">
					<div class = "data-box">
						<div
							class = "data-item"
							v-for = "el in hallTextData.slice(0, 1)"
						>
							<div class = "item-top">
								<img
									:src = "imgHost(el.avatar)"
									alt = ""
								/>
								<div class = "data-user-name">
									<p class = "over-flow-hide">{{ el.name }}</p>
									<p
										class = "up-success"
										:class = "{ fail: el.result }"
									>
										{{ !el.result ? "升级成功" : "升级失败" }}
									</p>
								</div>
							</div>
							<div class = "data-bot">
								<div
									class = "line-data"
									:class = "{ fail: el.result }"
								></div>
								<div
									class = "up-skins"
									style = "padding: 0 10px"
								>
									<div class = "skins-value">
										<div align = "center">
											<img
												:src = "imgHost(el.consumeSkinsImage)"
												alt = ""
												v-if = "el.consumeSkinsImage"
											/>
											<img
												src = "../../assets/image/upgrade/Hall/diamond.png"
												style = "width: 40px"
												v-else
												alt = ""
											/>
										</div>
										<div style = "min-width: 66px">
											<i
												class = "iconfont icon-icon_diamond1"
												v-if = "el.consumeSkinsPrice !== 0"
											></i
											>
											<span>
												{{
													el.consumeSkinsPrice === 0 ? el.deviationAmount : el.consumeSkinsPrice
												}}
											</span
											>
										</div>
									</div>
									<div class = "point-color">
										<img
											src = "../../assets/image/upgrade/upgradeSucces.png"
											style = "width: 20px"
											v-if = "!el.result"
											alt = ""
										/>
										<img
											src = "../../assets/image/upgrade/upgradePoint.png"
											style = "width: 20px"
											v-else
											alt = ""
										/>
										<p
											v-if = "
												el.deviationAmount &&
												el.consumeSkinsPrice !== 0
											"
										>
											+
											<i class = "iconfont icon-icon_diamond1"></i
											>
											<span> {{ el.deviationAmount }}</span>
										</p>
									</div>
									<div
										class = "skins-value"
										style = "min-width: 66px"
									>
										<div align = "center">
											<img
												:src = "imgHost(el.targetSkinsImage)"
												alt = ""
											/>
										</div>
										<div>
											<i class = "iconfont icon-icon_diamond1"></i
											>
											<span> {{ el.targetSkinsPrice }}</span>
										</div>
									</div>
								</div>
							</div>
							<img
								@click = "$router.push('/upgrade/detail')"
								src = "../../assets/image/upgrade/Hall/seemore.png"
								style = "width: 40px; margin-left: 15px"
								alt = ""
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--    榜单tap-->
		<div
			class = "screening"
			v-show = "tap === 2"
		>
			<div
				class = "default-btn type-btn"
				@click = "getRank(0)"
				:class = "{ active: rankKind === 0 }"
			>
				昨日榜单
			</div>
			<div
				class = "default-btn type-btn"
				@click = "getRank(1)"
				:class = "{ active: rankKind === 1 }"
			>
				今日榜单
			</div>
		</div>
		<!--    粉丝tap-->
		<div
			class = "screening"
			v-show = "tap === 1"
		>
			<div
				class = "default-btn type-btn"
				@click = "fansOrAt = 0"
				:class = "{ active: fansOrAt === 0 }"
			>
				我的关注
			</div>
			<div
				class = "default-btn type-btn"
				@click = "fansOrAt = 1"
				:class = "{ active: fansOrAt === 1 }"
			>
				我的粉丝
			</div>
		</div>
		
		<div
			class = "ranking-box up-rank"
			v-show = "tap === 2"
		>
			<div class = "num-progress-music">
				<div class = "open-box-progress">
					<div
						class = "process-box-text"
						style = "color: #ffffff; opacity: 0.5"
					>
						更新时间：
						{{
							new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
						}}
						{{
							rankKind === 0 ? "01:00:00" : new Date().getHours() + ":00:00"
						}}
					</div>
				</div>
			</div>
			<div class = "bag-tips battle-tips">
				<div
					class = "roll-ranking"
					v-if = "rankList.length > 0"
				>
					<div
						class = "top-list"
						:style = "{
							'justify-content':
								rankList.slice(0, 3).length !== 2 ? 'center' : 'unset',
						}"
					>
						<template v-if = "!$store.state.account.isPhone">
							<div
								class = "top-rank hide-m"
								v-for = "(el, idx) in rankList.slice(0, 3)"
								:key = "el.amount"
							>
								<div class = "top-rank-avatar">
									<div
										class = "lcuk-avator"
										:class = "'rank-' + idx"
										align = "center"
									>
										<img
											:src = "imgHost(el.avatar)"
											alt = ""
											style = "height: 100%"
										/>
									</div>
								</div>
								<div class = "rank-info">
									<div
										class = "flex-item-center"
										style = "padding: 0 10px"
									>
										<div class = "font-bold">
											<i class = "iconfont icon-icon_people"></i>
											{{ el.name }}
										</div>
										<div class = "total-money">
											<i
												class = "iconfont icon-icon_diamond1 fdc-color"
											></i
											>
											<span> {{ el.amount }}</span>
										</div>
									</div>
									<div class = "up-times">
										一共升级了
										<span> {{ el.number }}</span>
										次
									</div>
									<div align = "center">
										<div
											class = "see-user war-hover"
											style = "margin: 30px auto"
											@click = "
												$router.push(
													`/upgrade/userInfo/${el.userId}`,
												)
											"
										>
											<i class = "iconfont icon-icon_view1"></i>
											<span
												style = "font-size: 12px"
											>查看个人信息
											</span
											>
										</div>
									</div>
								</div>
							</div>
						</template>
					</div>
					<ul v-if = "!$store.state.account.isPhone">
						<li
							class = "roll-luck-item"
							v-for = "(el, idx) in rankList.slice(3, 10)"
							:key = "el.amount"
						>
							<div class = "rank-num">
								<div>{{ idx + 4 }}</div>
							</div>
							<div
								class = "bottom-avatar"
								align = "center"
							>
								<img
									:src = "imgHost(el.avatar)"
									alt = ""
									style = "height: 100%; width: 100%"
								/>
							</div>
							<div class = "user-name">
								<div class = "over-flow-hide font-bold">
									<i class = "iconfont icon-icon_people"></i>
									{{ el.name }}
								</div>
								<div>
									<i
										class = "iconfont icon-icon_diamond1 fdc-color"
										style = "font-weight: 400"
									></i
									>
									<span> {{ el.amount }}</span>
								</div>
								<div
									class = "up-times"
									style = "text-align: left"
								>
									一共升级了
									<span> {{ el.number }}</span>
									次
								</div>
							</div>
							<div class = "invite-btn">
								<div
									class = "see-user war-hover"
									@click = "
										$router.push(`/upgrade/userInfo/${el.userId}`)
									"
								>
									<i class = "iconfont icon-icon_view1"></i>
									<span style = "font-size: 12px">查看个人信息</span>
								</div>
							</div>
						</li>
					</ul>
					<ul v-if = "$store.state.account.isPhone">
						<li
							class = "roll-luck-item"
							v-for = "(el, idx) in rankList"
							:key = "el.amount"
						>
							<div class = "rank-num">
								<div>{{ idx + 1 }}</div>
							</div>
							<div
								class = "bottom-avatar"
								align = "center"
							>
								<img
									:src = "imgHost(el.avatar)"
									alt = ""
									style = "height: 100%; width: 100%"
								/>
							</div>
							<div class = "user-name">
								<div class = "over-flow-hide font-bold">
									<i class = "iconfont icon-icon_people"></i>
									{{ el.name }}
								</div>
								<div>
									<i
										class = "iconfont icon-icon_diamond1 fdc-color"
										style = "font-weight: 400"
									></i
									>
									<span> {{ el.amount }}</span>
								</div>
								<div class = "up-times">
									共升级了
									<span> {{ el.number }}</span>
									次
								</div>
							</div>
							<div class = "invite-btn">
								<div
									class = "see-user"
									@click = "
										$router.push(`/upgrade/userInfo/${el.userId}`)
									"
								>
									<i class = "iconfont icon-icon_view1"></i>
									<span style = "font-size: 12px">查看个人信息</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<Empty v-show = "rankList.length === 0"></Empty>
			</div>
		</div>
		<!--    粉丝界面-->
		<div
			class = "ranking-box up-rank"
			v-show = "tap === 1"
		>
			<div class = "my-attention">
				<div
					class = "attention-else"
					v-show = "fansOrAt === 0 && fans.attentionNumber === 0"
				>
					<p>
						您还没有关注其他人，试试关注以下推荐人物，可以了解TA的升级动态哦
					</p>
					<div @click = "focusAll">关注所有</div>
				</div>
				<div
					class = "fans-total"
					v-show = "fansOrAt === 1 && fans.quiltAttentionNumber !== 0"
				>
					我的粉丝总人数:
					<span>{{ fans.quiltAttentionNumber }}</span>
				</div>
				<ul v-if = "fans.list.records.length > 0">
					<li
						class = "attention-item"
						v-for = "el in fans.list.records"
					>
						<div class = "item-likes">
							<SkinsAvatar
								wd = "80px"
								ht = "80px"
								:img = "el.avatar"
								:head-frame = "el.headPortraitBox"
							></SkinsAvatar>
							<div class = "liker-info">
								<p class = "over-flow-hide">{{ el.name }}</p>
								<p @click = "$router.push(`/upgrade/userInfo/${el.id}`)">
									查看个人信息
								</p>
								<div>
									<p v-if = "el.attention">已关注</p>
									<div
										@click = "focusPepole(el.id, el)"
										v-else
									>
										关注
									</div>
								</div>
							</div>
						</div>
						<div class = "like-figure">
							<div>
								<i class = "iconfont icon-icon_praise"></i>
							</div>
							<p>{{ el.thumbsUpNumber }}</p>
						</div>
					</li>
				</ul>
				<div
					v-if = "fans.quiltAttentionNumber === 0 && fansOrAt === 1"
					align = "center"
					style = "position: relative"
				>
					<img
						src = "../../assets/image/upgrade/Hall/empty.png"
						style = "max-width: 100%"
						alt = ""
					/>
					<p class = "mid-p">
						您还没有粉丝哦。
						<br />
						展示您的升级过程并满足故事条件，有助于吸引更多粉丝。
					</p>
				</div>
			</div>
			<div
				class = "other-btn"
				v-if = "fans.attentionNumber === 0 && fansOrAt === 0"
			>
				<p @click = "getChange">换一批</p>
				<div
					class = "war-hover"
					@click = "getFriends()"
				>完成
				</div>
			</div>
			<div
				v-else
				class = "page-box"
				style = "margin: 30px auto 0"
			>
				<Page
					class = "mar-auto"
					:current = "page.current"
					:total = "page.total"
					:page-size = "10"
					@on-change = "jumpBoxFunc"
					v-if = "fans.list.records.length > 0"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Title from "../Title";
import Empty from "../Empty/Empty";
import { url } from "../../api/upgradeApi";
import {
	getAction ,
	postAction,
} from "../../api/manage";
import { mapState } from "vuex";
import { createSocket } from "../../utils/websocket";
import imgPerson from './UpgradeHall.assets/img.png';
import imgBtn from './UpgradeHall.assets/img_1.png';
import { HrTitle } from '@/New.Components';

export default {
	name : "UpgradeMain" ,
	components : {
		Title ,
		Empty,
		HrTitle,
	} ,
	data () {
		return {
			imgPerson,
			imgBtn,
			url ,
			tap : 0 ,
			showData : false ,
			isPhone : this.$store.state.account.isPhone ,
			rankKind : 1 , // 榜单昨日今日
			fansOrAt : 0 , // 粉丝好友
			hallStoryData : {} ,
			hallTextData : [] ,
			page : {
				current : 1 ,
				total : 0 ,
				type : 0 ,
			} ,
			dataPage : {
				current : 1 ,
				total : 0 ,
				size : 12 ,
			} ,
			rankList : [] ,
			fans : {
				list : { records : [] } ,
			} ,
		};
	} ,
	created () {
		this.getStory();
		this.getData();
		createSocket(process.env.VUE_APP_LINK_WS + `/wss/upgrade/hall` , "upgrade" );
		this.$bus.$on("upgrade" , (data) => {
			this.hallTextData.unshift(data);
			setTimeout(() => {
				if ( this.hallTextData.length > 5 && !this.isPhone ) {
					return this.hallTextData.pop();
				}
				this.hallTextData.pop();
			} , 1000);
		});
	} ,
	beforeRouteLeave (to , from , next) {
		this.$bus.$off("upgrade");
		next();
	} ,
	watch : {
		tap (nv) {
			if ( nv === 1 ) {
				this.getFriends();
			}
			if ( nv === 2 ) this.getRank(1);
		} ,
		fansOrAt (nv) {
			this.page.type = nv;
			this.getFriends();
		} ,
	} ,
	computed : {
		...mapState("account" , ["user"]) ,
	} ,
	methods : {
		goSelf () {
			if ( !this.user.id ) return this.$login();
			this.$router.push(`/upgrade/userInfo/${ this.user.id }`);
		} ,
		jumpStoryFunc (page) {
			this.getStory(page);
		} ,
		focusPepole (id , item) {
			if ( !this.user.id ) return this.$login();
			let parmas = { ids : id };
			postAction(url.touch , parmas).then(() => {
				if ( item === "all" ) {
					this.fans.list.records.forEach((el) => {
						el.attention = true;
					});
				}
				if ( item ) item.attention = true;
				this.$Message.success("关注成功");
			}).catch((e) => {
				this.$Message.success(e.response.data.errMsg);
			});
		} ,
		focusAll () {
			let id = "";
			this.fans.list.records.forEach((el) => {
				id += el.id + ",";
			});
			id = id.substring(0 , id.length - 1);
			this.focusPepole(id , "all");
		} ,
		getStory (page = 1) {
			this.dataPage.current = page;
			getAction(url.story , this.dataPage).then((res) => {
				this.hallStoryData = res.data;
				this.dataPage.current = res.data.current;
				this.dataPage.total = res.data.total;
			});
		} ,
		getData () {
			getAction(url.data , { size : !this.isPhone ? 5 : 1 }).then((res) => {
				this.hallTextData = res.data.records;
			});
		} ,
		getRank (type) {
			this.rankKind = type;
			getAction(url.rank , { type : type }).then((res) => {
				this.rankList = res.data;
			});
		} ,
		getFriends () {
			getAction(url.friends , this.page).then((res) => {
				if ( res.data.attentionNumber === 0 && this.fansOrAt === 0 ) return this.getChange();
				this.fans = res.data;
			});
		} ,
		getChange () {
			this.page.type = 2;
			getAction(url.friends , this.page).then((res) => {
				this.fans = res.data;
			});
		} ,
		goDetail (item) {
			localStorage.setItem("story" , JSON.stringify(item));
			this.$router.push(`/upgrade/userRecord/${ item.orderNo + item.index }`);
		} ,
		jumpBoxFunc (a) {
			console.log(a);
		} ,
	} ,
};
</script>

<style
	scoped
	lang = "less"
>
html[data-reaxel-reactive-device="mobile-full-screen"],
html[data-reaxel-reactive-device="mobile-non-full-screen"]{
	
	.battle-top-box.up-top{
		img.war-hover{
			width: 33%;
		}
	}
	.tips-battle{
		img {
			width: 6vw;
		}
		div{
			gap : 2vw !important;
			font-size: 3vw;
		}
	}
}


.invite-enter {
	transform: translateX(100%);
}

.invite-enter-active,
.invite-leave-active {
	transition: all 0.6s ease-in-out;
}

.invite-leave-to {
	transform: translateX(100%);
}

.invite-enter-active,
.invite-leave-active {
	transition: all 0.6s ease-in-out;
}

///* 下面的 .v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果 */
.name-move {
	transition: all 0.6s ease-in-out;
}

@media screen and (max-width: 800px) {
	.float-data {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 500;
		transform: translateY(0);
		transition: all 0.2s ease-out;
	}
	
	.float-data.active {
		transform: translateY(90px);
	}
	
	.up-rank .see-user {
		width: 110px;
	}
	
	.float-decration {
		width: 90px;
		text-align: center;
		color: #ffca6e;
		height: 20px;
		line-height: 20px;
		margin: auto;
		background: #111320;
		border-radius: 13px 13px 0 0;
	}
	
	.float-box {
		width: 100%;
		height: 90px;
		padding: 0 10px;
		background: #0e0f1a;
	}
	
	.data-bot::before {
		display: none;
	}
	
	.data-bot {
		height: 80px;
	}
	
	.item-top {
		padding: 20px 20px 20px 0;
	}
	
	.data-item {
		display: flex;
		align-items: center;
	}
	
	.item-top img {
		width: 40px;
		height: 40px;
	}
	
	.data-user-name {
		width: 60px;
	}
}
</style>
