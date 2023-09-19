<template>
	<div class = "wish-bg">
		<div class = "wish-container">
			<div class = "wish-tap">
				<div
					@click = "
						wishQuery.type = 0;
						wishQuery.status = 1;
					"
					:class = "{ active: wishQuery.type === 0 }"
				>
					所有心愿
				</div>
				<div
					@click = "myWsih"
					:class = "{ active: wishQuery.type === 1 }"
				>我的心愿
				</div>
			</div>
			<div
				class = "wish-kind hide-p hide-ipad"
				v-if = "wishQuery.type === 0"
			>
				<div
					@click = "wishQuery.status = 1"
					:class = "{ active: wishQuery.status === 1 }"
				>正在许愿中
				</div>
				<div
					@click = "wishQuery.status = 2"
					:class = "{ active: wishQuery.status === 2 }"
				>已结束许愿
				</div>
			</div>
			<div
				class = "wish-kind hide-p hide-ipad"
				v-else
			>
				<div
					@click = "wishQuery.status = 1"
					:class = "{ active: wishQuery.status === 1 }"
				>许愿中
				</div>
				<div
					@click = "wishQuery.status = 3"
					:class = "{ active: wishQuery.status === 3 }"
				>许愿成功
				</div>
				<div
					@click = "wishQuery.status = 4"
					:class = "{ active: wishQuery.status === 4 }"
				>许愿落空
				</div>
			</div>
			<div class = "wish-state">
				<div
					class = "wish-kind hide-m"
					v-if = "wishQuery.type === 0"
				>
					<div
						@click = "wishQuery.status = 1"
						:class = "{ active: wishQuery.status === 1 }"
					>正在许愿中
					</div>
					<div
						@click = "wishQuery.status = 2"
						:class = "{ active: wishQuery.status === 2 }"
					>已结束许愿
					</div>
				</div>
				<div
					class = "wish-kind hide-m"
					v-else
				>
					<div
						@click = "wishQuery.status = 1"
						:class = "{ active: wishQuery.status === 1 }"
					>正在许愿中
					</div>
					<div
						@click = "wishQuery.status = 3"
						:class = "{ active: wishQuery.status === 3 }"
					>许愿成功
					</div>
					<div
						@click = "wishQuery.status = 4"
						:class = "{ active: wishQuery.status === 4 }"
					>许愿落空
					</div>
				</div>
				<div class = "wish-info">
					<div
						class = "how-play"
						@click = "howPlay = true"
					>
						<div>
							<img
								src = "../assets/image/wish/wenhao.png"
								alt = ""
							/>
						</div>
						<p>玩法说明</p>
					</div>
					<div
						class = "how-play"
						@click = "getHistory()"
					>
						<div>
							<img
								src = "../assets/image/wish/listbuy.png"
								alt = ""
							/>
						</div>
						<p>兑换记录</p>
					</div>
					<div class = "card-num">
						<div>
							<img
								src = "../assets/image/wish/card.png"
								alt = ""
							/>
						</div>
						<div class = "my-card">
							<p>{{ cardNum }}</p>
							<p>我的心愿卡</p>
						</div>
					</div>
					<div
						class = "buy-bnt"
						@click = "openModule"
					>
						<div>兑换心愿卡</div>
					</div>
				</div>
			</div>
			<div class = "wish-list">
				<ul v-if = "roomList.records.length > 0">
					<li
						v-for = "el in roomList.records"
						:key = "el.id"
						@click = "goWish(el.id)"
						class = "cursor"
					>
						<div class = "wish-gress">
							<div>{{ el.num }} / {{ el.roomNum }}</div>
						</div>
						<div class = "single-card">
							<span>
								单次消耗心愿卡
								<span> {{ el.cardNum }}</span>
							</span
							>
							<img
								src = "../assets/image/wish/card.png"
								alt = ""
							/>
						</div>
						<div :class = "{ 'over-room': el.status === 2 }">
							<div
								v-show = "el.status == 2"
								class = "over-user"
								align = "center"
							>
								<img
									:src = "imgHost(el.userImg)"
									alt = ""
								/>
								<p>{{ el.userName }}</p>
							</div>
							<div
								v-show = "el.status == 2"
								class = "next-img"
								align = "center"
							>
								<img
									src = "../assets/image/wish/jiantou.png"
									alt = ""
								/>
							</div>
							<div
								class = "wish-skins"
								:class = "[conversionStyle(el.rarity, el.category), { 'over-wish': el.status === 2 }]"
								align = "center"
							>
								<img
									:src = "el.skinsImg"
									alt = ""
								/>
							</div>
						</div>
						
						<div class = "wish-name">
							<div class = "over-flow-hide">
								{{ el.title }}
							</div>
						</div>
						<div class = "skin-name over-flow-hide">{{ el.skinsName }}</div>
						<div class = "wish-condition">
							<div>
								<i class = "iconfont icon-icon_diamond1"></i>
								{{ el.price }}
							</div>
						</div>
					</li>
				</ul>
				<Empty v-else></Empty>
			</div>
			<div class = "page-to-next">
				<div class = "bag-page-box">
					<Page
						style = "margin: auto"
						:current = "currPage"
						:total = "currTotal"
						:page-size = "wishQuery.size"
						@on-change = "jumpPageFunc"
					/>
				</div>
			</div>
			<div class = "fair-condition">
				<div class = "fair-title">公平算法</div>
				<div class = "how-fair">
					<img
						v-if = "!$store.state.account.isPhone"
						src = "./WishGame.assets/img_2.png"
						style = "width: 100%"
					/>
					<img
						v-else
						src = "./WishGame.assets/img_3.png"
						style = "width: 100%"
					/>
					<div
						class = "buy-bnt"
						@click = "vertifyWay = true"
					>
						<div>验算方式</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="false" class = "wish-pupWord">
			<Babrrage ref = "baberrage"></Babrrage>
		</div>
		<WishModule ref = "wishModule"></WishModule>
		<com-module
			title = "玩法说明"
			ref = "howPlay"
			v-model = "howPlay"
		>
			<div class = "how-tips">
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>1</span>
						</div>
					</div>
					<div>
						<span
						>购买升级自选区间功能券后，会额外获赠心愿卡，心愿卡可参与由官方平台创建的皮肤许愿活动。每轮许愿的所有许愿瓶都放满心愿卡后即公开许愿结果。
						</span
						>
					</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>2</span>
						</div>
					</div>
					<div>
						<span>我们将按照Hash算法决定最终谁的愿望成真。当然您也可以重复多次选择空瓶放入自己的心愿卡。</span>
					</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>3</span>
						</div>
					</div>
					<div>
						<span>您占据的许愿瓶数量越多，愿望成真的几率越大哦。</span>
					</div>
				</div>
			</div>
			<div
				@click = "howPlay = !howPlay"
				class = "hope-btn"
				style = "width: 175px; margin: 20px auto"
			>
				<div>我知道了</div>
			</div>
		</com-module>
		<com-module
			title = "兑换记录"
			v-model = "listHistory"
		>
			<Scroll
				:on-reach-bottom = "handleReachBottom"
				class = "history-list"
				:height = "300"
			>
				<Table
					ellipsis
					:columns = "columns"
					:data = "buyHistory"
				></Table>
			</Scroll>
		</com-module>
		<com-module
			title = "许愿结果验算方式"
			v-model = "vertifyWay"
		>
			<div class = "how-tips">
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>1</span>
						</div>
					</div>
					<div>
						<span>选取每个许愿瓶对应的用户种子的首位字符，合成用户种子和</span>
					</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>2</span>
						</div>
					</div>
					<div>
						<span>用户种子和+服务器种子，进行SHA256运算，得到的HASH函数值选取前6位；</span>
					</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>3</span>
						</div>
					</div>
					<div>
						<span>将HASH函数值前六位16进制转换为10进制，得到Number。</span>
					</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>4</span>
						</div>
					</div>
					<div>
						<span>Number除以许愿瓶数量，得到商和余数，余数+1(游戏常量)，对应许愿瓶愿望成功，获得该饰品</span>
					</div>
				</div>
			</div>
		</com-module>
	</div>
</template>

<script>
import WishModule from "@/components/Wish/WishModule";
import ComModule from "@/components/Wish/ComModule";
import { getAction } from "@/api/manage";
import Babrrage from "@/components/Babrrage";
import { mapState } from "vuex";
import Empty from "@/components/Empty/Empty";

export default {
	name : "WishGame" ,
	components : {
		WishModule ,
		ComModule ,
		Babrrage ,
		Empty,
	} ,
	data () {
		return {
			roomList : {
				records : [] ,
			} ,
			howPlay : false ,
			listHistory : false ,
			vertifyWay : false ,
			cardNum : 0 ,
			wishQuery : {
				status : 1 , // 1进行中 2 已结束 3已中奖 4 未中奖
				type : 0 , //  0 全部 1 自己
				current : 1 ,
				size : 12 ,
				total : 0 ,
			} ,
			currPage : 1 ,
			currTotal : 1 ,
			oldPage : 1 ,
			url : {
				list : "/api/desire/rooms" ,
				history : "/api/desire/buy/record" ,
				num : "/api/desire/card" ,
			} ,
			history : {
				current : 1 ,
				size : 10,
			} ,
			columns : [
				{
					title : "类型" ,
					key : "types",
				} ,
				{
					title : "金额" ,
					key : "money",
				} ,
				{
					title : "时间" ,
					key : "time",
				} ,
			] ,
			buyHistory : [] ,
		};
	} ,
	watch : {
		wishQuery : {
			handler (nv , ov) {
				if ( nv.current === this.oldPage ) {
					this.wishQuery.current = 1;
				}
				this.getRoomList();
			} ,
			deep : true ,
		} ,
		user : {
			handler (nv , ov) {
				if ( ov.id && nv.id ) return;
				this.getCardNum();
			} , // deep: true
		} ,
	} ,
	computed : {
		...mapState("account" , ["user"]) ,
	} ,
	mounted () {
		this.getRoomList();
		this.getCardNum();
	} , // beforeRouteLeave(to,form,next) {
	//   this.$refs.baberrage.leave_page = true
	//   this.$refs.baberrage.ws.close()
	//   next()
	// },
	methods : {
		jumpPageFunc (page) {
			this.wishQuery.current = page;
		} ,
		myWsih () {
			if ( !this.$store.state.account.user.id ) return this.$login();
			this.wishQuery.type = 1;
			this.wishQuery.status = 1;
		} ,
		getRoomList () {
			this.oldPage = this.wishQuery.current;
			getAction(this.url.list , this.wishQuery).then(res => {
				this.roomList = res.data;
				this.currPage = res.data.current;
				this.currTotal = res.data.total;
			});
		} ,
		goWish (id) {
			this.$router.push(`/wish/${ id }`);
		} ,
		openModule () {
			this.$refs.wishModule.isShow = true;
		} ,
		async getCardNum () {
			if ( !this.user.id ) return;
			let res = await getAction(this.url.num);
			this.cardNum = res.data.num ? res.data.num : 0;
		} ,
		getHistory () {
			this.listHistory = true;
			this.history.current = 1;
			if ( !this.$store.state.account.user.id ) return this.$login();
			getAction(this.url.history , this.history).then(res => {
				this.buyHistory = res.data.records;
				this.buyHistory.forEach(el => {
					let date = new Date(el.createTime);
					el.types = `升级自选区间功能券（面额${ el.num }）`;
					el.time = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
					el.money = el.num;
				});
			});
		} ,
		handleReachBottom () {
			return new Promise(resolve => {
				this.history.current ++;
				getAction(this.url.history , this.history).then(res => {
					res.data.records.forEach(el => {
						let date = new Date(el.createTime);
						el.types = `升级自选区间功能券（面额${ el.num }）`;
						el.time = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
						el.money = el.num;
						this.buyHistory.push(el);
					});
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
/deep/ .barrages-drop {
	height: 100%;
}

.page-to-next {
	/deep/ .ivu-page-item a {
		color: #fffffe !important;
	}
	
	/deep/ .ivu-page > li {
		background: #132656 !important;
	}
	
	/deep/ .ivu-page-prev {
		width: 45px;
		height: 45px;
		font-size: 19px;
		line-height: 45px;
		
		a {
			font-size: 25px;
		}
	}
	
	/deep/ .ivu-page-next {
		width: 45px;
		height: 45px;
		font-size: 19px;
		line-height: 45px;
		
		a {
			font-size: 25px;
		}
	}
	
	/deep/ .ivu-page-item {
		width: 45px;
		height: 45px;
		font-size: 19px;
		line-height: 45px;
	}
	
	/deep/ .ivu-page-item-active {
		background: #0e65af !important;
	}
}

/deep/ .ivu-table-wrapper {
	border: none;
}

/deep/ .ivu-table {
	&::after,
	&::before {
		width: 0;
		height: 0;
	}
	
	th {
		border-bottom: none;
	}
}

/deep/ .ivu-table-header {
	tr {
		background: linear-gradient(0deg, #263b82, #192a59);
	}
	
	th {
		background: none;
		text-align: center;
		font-size: 14px;
		color: #33eeff;
	}
}

/deep/ .ivu-table-tbody {
	tr {
		background: #071b4f;
		margin: 30px;
		
		td {
			background: none;
			text-align: center;
			color: #fffffe;
			font-size: 14px;
			border-bottom: none;
		}
	}
}

.wish-bg {
	background: url("./WishGame.assets/img.png") no-repeat top left / 100%;
}

.wish-container {
	padding-top: 35%;
	width: 1368px;
	margin: auto;
}

.wish-tap {
	display: flex;
	font-size: 23px;
	color: #ffffff;
	
	margin: 0 auto 20px;
	
	> div:nth-of-type(1) {
		margin-left: auto;
		background: url("../assets/image/wish/navleft.png") no-repeat center left / 100%;
	}
	
	> div:nth-of-type(2) {
		margin-right: auto;
		background: url("../assets/image/wish/navright.png") no-repeat center left / 100%;
	}
	
	> div {
		padding: 14px 70px;
		text-align: center;
		cursor: pointer;
		opacity: 0.5;
		
		&.active {
			opacity: 1;
		}
		
		&:hover {
			opacity: 1;
		}
	}
}

.wish-state {
	display: flex;
	justify-content: space-between;
}

.wish-kind {
	display: flex;
	align-items: center;
	font-size: 17px;
	color: #fffffe;
	
	> div {
		background: url("../assets/image/wish/navbg.png") no-repeat center left / 100%;
		margin-right: 20px;
		text-align: center;
		cursor: pointer;
		padding: 15px 42px;
		opacity: 0.5;
		cursor: pointer;
		
		&.active {
			opacity: 1;
		}
		
		&:hover {
			opacity: 1;
		}
	}
}

.wish-info {
	display: flex;
	align-items: center;
}

.how-play {
	text-align: center;
	font-size: 12px;
	color: #ffffff;
	margin-right: 20px;
	cursor: pointer;
	
	> div:nth-of-type(1) {
		width: 29px;
		height: 29px;
		margin: 0 auto 10px;
		
		img {
			width: 100%;
		}
	}
}

.card-num {
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-left: 10px;
	
	img {
		width: 80%;
		margin-left: 20%;
	}
}

.buy-bnt {
	background: linear-gradient(180deg, #dd2a52, #e81745);
	padding: 2px 1px 1px 1px;
	-webkit-clip-path: polygon(4% 0%, 96% 0%, 100% 10%, 100% 86%, 96% 100%, 6% 99%, 0% 90%, 0% 19%);
	clip-path: polygon(4% 0%, 96% 0%, 100% 10%, 100% 86%, 96% 100%, 6% 99%, 0% 90%, 0% 19%);
	color: #ffffff;
	cursor: pointer;
	
	> div {
		font-size: 17px;
		padding: 10px 30px;
		background: linear-gradient(0deg, #4a0413, #6a0b1f, #be1339);
		-webkit-clip-path: polygon(4% 0%, 96% 0%, 100% 10%, 100% 86%, 96% 100%, 6% 99%, 0% 90%, 0% 19%);
		clip-path: polygon(4% 0%, 95% 0%, 99% 9%, 99% 85%, 95% 99%, 5% 98%, 0% 89%, 0% 18%);
		
		&:hover {
			background: linear-gradient(0deg, #580617, #760c22, #c6173e);
		}
	}
}

.my-card {
	margin-right: 15px;
	margin-left: 10px;
	
	> p:nth-of-type(1) {
		font-size: 24px;
		font-family: Arial Black;
		color: #ffffff;
	}
	
	> p:nth-of-type(2) {
		font-size: 12px;
		font-family: PingFang SC;
		font-weight: 400;
	}
}

.wish-list {
	ul {
		margin-top: 30px;
		display: flex;
		border-radius: 8px;
		flex-wrap: wrap;
		
		li {
			width: 323px;
			//height: 405px;
			margin-left: 12px;
			margin-bottom: 10px;
			padding: 1% 2%;
			background: linear-gradient(0deg, #173657, #122d69);
			border: 2px solid rgba(0, 90, 127, 0.6);
			/*border-image: linear-gradient(0deg, rgba(0, 90, 127, 0.6), rgba(4, 96, 149, 0.6)) 2 2;*/
			border-radius: 10px;
			transition: all 0.2s ease-in;
			
			&:hover {
				transform: translateY(-5px);
			}
			
			.wish-gress {
				font-size: 18px;
				font-family: Arial Black;
				color: #33eeff;
				text-align: center;
			}
			
			.over-room {
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				> div:nth-of-type(3) {
					padding-bottom: 9%;
				}
				
				.over-user {
					img {
						width: 53px;
						height: 50px;
						border-radius: 50%;
					}
					
					p {
						text-align: center;
						font-size: 14px;
					}
				}
			}
			
			.wish-skins {
				padding-bottom: 21%;
				
				img {
					width: 80%;
					height: 158px;
				}
				
				&.over-wish {
					width: 100px;
					height: 100px;
					
					img {
						width: 100%;
						height: auto;
					}
				}
				
				&.gold {
					background: url("../assets/image/wish/wishgold.png") no-repeat center bottom / 100%;
				}
				
				&.red {
					background: url("../assets/image/wish/wishpink.png") no-repeat center bottom / 100%;
				}
				
				&.purple {
					background: url("../assets/image/wish/wishpur.png") no-repeat center bottom / 100%;
				}
				
				&.pink {
					background: url("../assets/image/wish/wishred.png") no-repeat center bottom / 100%;
				}
				
				&.blues {
					background: url("../assets/image/wish/wishblues.png") no-repeat center bottom / 100%;
				}
				
				&.blue {
					background: url("../assets/image/wish/wishblue.png") no-repeat center bottom / 100%;
				}
				
				&.white {
					background: url("../assets/image/wish/wishwhite.png") no-repeat center bottom / 100%;
				}
			}
			
			.wish-name {
				-webkit-clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
				clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
				padding: 1px;
				background: linear-gradient(90deg, #92beff, #589fff, #92beff);
				margin: 11px 0;
				
				> div {
					font-size: 15px;
					color: #33eeff;
					background: linear-gradient(90deg, #000000, #033f91, #000000);
					box-shadow: 0px 1px 9px 1px rgba(31, 35, 36, 0.35),
					0px 6px 8px 0px rgba(19, 116, 221, 0.5) inset;
					text-align: center;
					padding: 5px 10px;
					-webkit-clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
					clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
				}
			}
			
			.skin-name {
				font-size: 14px;
				font-weight: 400;
				color: #ffffff;
				text-align: center;
			}
			
			.single-card {
				font-size: 15px;
				font-family: PingFang SC;
				font-weight: 400;
				color: #ffffff;
				text-align: center;
				
				> span span {
					font-size: 18px;
					font-weight: bolder;
				}
				
				img {
					width: 8%;
				}
			}
			
			.wish-condition {
				margin: 5px 0 0 0;
				
				img {
					width: 20%;
					margin-right: 9px;
				}
				
				div:nth-of-type(1) {
					font-size: 18px;
					font-family: Arial Black;
					color: #f82226;
					text-align: center;
					
					i {
						font-size: 18px;
					}
				}
			}
		}
	}
}

.wish-pupWord {
	height: 500px;
	position: relative;
}

.fair-title {
	font-size: 20px;
	color: #fffffe;
	text-align: center;
	background: url("../assets/image/wish/title.png") no-repeat center center / auto 100%;
	padding: 10px 30px;
	margin: 50px;
}

.how-tips {
	font-size: 18px;
	font-weight: 600;
	color: #ffffff;
}

.how-fair {
	display: flex;
	position: relative;
	
	> div {
		position: absolute;
		bottom: 10%;
		left: 46%;
		
		> div {
			padding: 10px 40px;
		}
	}
	
	.fair-img {
		width: 40%;
	}
}

@media screen and (max-width: 767px) {
	.wish-container {
		width: 100%;
		padding-top: 77vw;
	}
	
	.next-img {
		img {
			width: 50%;
		}
	}
	
	.wish-skins {
		img {
			height: 90px !important;
		}
	}
	
	.over-user {
		img {
			width: 45px !important;
			height: 45px !important;
		}
		
		p {
			font-size: 12px !important;
		}
	}
	
	.over-wish {
		height: 60px !important;
		width: 60px !important;
		
		img {
			height: auto !important;
		}
	}
	
	.wish-bg {
		background: url("./WishGame.assets/img_1.png") ;
		background-position: top center;
		background-repeat: no-repeat;
		background-size: auto 85vw;
	}
	
	.how-play {
		margin-right: 4px;
		
		> div:nth-of-type(1) {
			margin: 0 auto 4px;
		}
	}
	
	.buy-bnt {
		> div {
			font-size: 12px;
			padding: 4px 10px;
		}
	}
	
	.wish-tap {
		margin: 0 auto 10px;
		
		> div {
			font-size: 19px;
			padding: 14px 40px;
		}
	}
	
	.wish-info {
		justify-content: space-between;
		padding: 0 2%;
		width: 100%;
	}
	
	.card-num {
		margin-left: 20px;
		
		> div:nth-of-type(1) {
			width: 30%;
		}
		
		img {
			width: 100%;
			margin-left: 0;
		}
		
		.my-card {
			p {
				line-height: normal;
			}
			
			p:nth-of-type(1) {
				font-size: 20px;
				line-height: normal;
			}
		}
	}
	
	.wish-kind {
		margin-bottom: 20px;
		font-size: 14px;
		
		> div {
			padding: 15px 25px;
		}
		
		> div:nth-of-type(1) {
			margin-left: auto;
		}
		
		> div:nth-of-type(2) {
			margin-right: auto;
		}
	}
	
	.wish-list {
		ul {
			li {
				width: 45%;
				margin-left: 0.2rem;
				margin-bottom: 10px;
				
				.single-card {
					img {
						width: 10%;
					}
					
					span {
						font-size: 13px;
					}
				}
				
				.wish-condition {
					margin: 5px 0;
					
					div:nth-of-type(1) {
						img {
							width: 30%;
						}
						
						span {
							font-size: 13px;
						}
					}
					
					div:nth-of-type(2) {
						font-size: 15px;
					}
				}
				
				.wish-name {
					> div {
						padding: 2px 7px;
					}
				}
			}
		}
	}
	
	.fair-title {
		font-size: 15px;
		margin: 30px 10px;
		background: url("../assets/image/wish/titlebgm.png") no-repeat center center / 100% auto;
	}
	
	.wish-pupWord {
		height: 300px;
	}
	
	.how-fair {
		> div {
			position: absolute;
			bottom: 5%;
			left: 33%;
		}
	}
}
</style>
