<template>
	<div class = "roll-content">
		<div class = "common-bg">
			<div class = "margin-auto layout">
				<div 
					class = "battle-top-box"
					:style="{'background-image':`url('${imgBattleBg}')`}"
				>
					<HrTitle title = "箱子对战"></HrTitle>
					<div class = "tips-battle">
						<div @click = "howPlay = true">
							<i class = "iconfont iconicon-help2"></i>
							玩法介绍
						</div>
						<div @click = "show = true">
							<i class = "iconfont iconicon-help2"></i>
							对战规则
						</div>
					</div>
					<div class = "battle-room-tap">
						<div @click = "tap = 0">
							<img
								src = "../assets/image/battle/roomTap.png"
								width = "100%"
								v-show = "tap !== 0"
								alt = ""
							/>
							<img
								:src = "imgBattleRoomBtn"
								width = "100%"
								alt = ""
								v-show = "tap === 0"
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
								<div class = "tap-name">亦敌亦友</div>
							</div>
							<div
								@click = "tap = 2"
								:class = "{ active: tap === 2 }"
							>
								<div class = "tap-i">
									<i class = "iconfont icon-icon_ranking"></i>
								</div>
								<div class = "tap-name">对战榜单</div>
							</div>
						</div>
					</div>
				</div>
				<!--   全部还是参与-->
				<div
					class = "screening"
					v-show = "tap === 0"
				>
					<div
						class = "default-btn type-btn"
						:class = "{ active: kind === 0 }"
						@click = "kind = 0"
					>
						全部
					</div>
					<div
						class = "default-btn type-btn"
						:class = "{ active: kind === 1 }"
						@click = "kind = 1"
					>
						我参与的
					</div>
				</div>
				<div
					class = "screening"
					v-show = "tap === 2"
				>
					<div
						class = "default-btn type-btn"
						:class = "{ active: rankKind === 1 }"
						@click = "getRankingList(1)"
					>
						连胜榜单
					</div>
					<div
						class = "default-btn type-btn"
						:class = "{ active: rankKind === 2 }"
						@click = "getRankingList(2, todayOrYes)"
					>
						优胜榜单
					</div>
				</div>
				<div
					class = "screening"
					v-show = "tap === 1"
				>
					<div
						class = "default-btn type-btn"
						:class = "{ active: friendKind === 1 }"
						@click = "getRankingList(1)"
					>
						最强对手
					</div>
					<div
						class = "default-btn type-btn"
						:class = "{ active: friendKind === 2 }"
						@click = "getRankingList(2)"
					>
						十拿九稳
					</div>
				</div>
				<div
					class = "yse-td hide-p hide-ipad"
					v-show = "tap === 2 && rankKind === 2"
				>
					<div
						style = "margin-left: auto"
						@click = "getRankingList(rankKind, 0)"
						:class = "{ active: todayOrYes === 0 }"
					></div>
					<div
						style = "margin-right: auto"
						@click = "getRankingList(rankKind, 1)"
						:class = "{ active: todayOrYes === 1 }"
					></div>
				</div>
				<div class = "creat-battle">
					<div
						class = "isFast-battle"
						@click = "isFast = !isFast"
					>
						<Tooltip content = "快速房模式">
							<img
								src = "../assets/image/battle/noFast.png"
								v-show = "!isFast"
								alt = ""
								width = "100%"
							/>
							<img
								src = "../assets/image/battle/isFast.png"
								v-show = "isFast"
								alt = ""
								width = "100%"
							/>
						</Tooltip>
					</div>
					<div
						class = "btn re-btn"
						@click = "creatBattle(1)"
					>
						<i class = "iconfont icon-icon_button2"></i>
						创建反转对战
					</div>
					<div
						class = "btn no-btn"
						@click = "creatBattle(0)"
					>
						<i class = "iconfont icon-icon_button1l"></i>
						创建常规对战
					</div>
					<div
						class = "yse-td abs-center hide-m"
						v-show = "tap === 2 && rankKind === 2"
					>
						<div
							style = "margin-left: auto"
							@click = "getRankingList(rankKind, 0)"
							:class = "{ active: todayOrYes === 0 }"
						></div>
						<div
							style = "margin-right: auto"
							@click = "getRankingList(rankKind, 1)"
							:class = "{ active: todayOrYes === 1 }"
						></div>
					</div>
				</div>
				<!-- 昨日榜单-->
				<div
					class = "ranking-box"
					v-show = "tap === 2"
				>
					<div class = "num-progress-music">
						<div class = "open-box-progress">
							<div
								class = "process-box-text"
								style = "color: #ffffff; opacity: 0.5"
								v-show = "rankKind === 2"
							>
								更新时间：{{
									new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
								}}
								{{
									todayOrYes === 0 ? "00" : new Date().getHours()
								}}:00:00
							</div>
							<div
								class = "process-box-text"
								style = "color: #ffffff; opacity: 0.5"
								v-show = "rankKind === 1"
							>
								更新时间：{{
									new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
								}}
								00:00:00
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
										rankList.slice(0, 3).length !== 2
											? 'center'
											: 'unset',
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
										<div
											class = "rank-info"
											:class = "{ active: rankKind === 2 }"
										>
											<div
												v-show = "rankKind === 2"
												style = "
													display: flex;
													justify-content: space-between;
													padding: 0 10px;
												"
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
													<span class = "font-bold">
														{{ el.amount }}
													</span
													>
												</div>
											</div>
											<div
												v-show = "rankKind === 1"
												class = "over-flow-hide"
											>
												<i class = "iconfont icon-icon_people"></i>
												{{ el.name }}
											</div>
											<div
												class = "total-money"
												v-show = "rankKind === 1"
											>
												连胜
												<span> {{ el.num }}</span>
												局
												<i
													class = "iconfont icon-icon_diamond1 fdc-color"
												></i>
												<span>{{ el.amount }}</span>
											</div>
											<div
												class = "total-money"
												v-show = "rankKind === 1 && el.money"
											>
												获得奖励：
												<i
													class = "iconfont icon-icon_diamond1 fdc-color"
												></i>
												<span>{{ el.money }}</span>
											</div>
											<div
												align = "center"
												style = "width: 160px; margin: 10px auto"
											>
												<img
													src = "../assets/image/battle/normalBtn.png"
													@click = "inviteUser(0, el)"
													alt = ""
													class = "war-hover"
													v-show = "el.flag"
												/>
												<img
													src = "../assets/image/battle/reverseBtn.png"
													@click = "inviteUser(1, el)"
													alt = ""
													class = "war-hover"
													v-show = "el.flag"
												/>
												<img
													src = "../assets/image/battle/offlineN.png"
													v-show = "!el.flag"
												/>
												<img
													src = "../assets/image/battle/offlineR.png"
													v-show = "!el.flag"
												/>
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
									<div
										v-show = "rankKind === 1"
										class = "user-name"
									>
										<div class = "over-flow-hide">
											<i class = "iconfont icon-icon_people"></i>
											{{ el.name }}
										</div>
										<div class = "total-money">
											连胜
											<span> {{ el.num }}</span>
											局
											<i
												class = "iconfont icon-icon_diamond1 fdc-color"
											></i
											>
											<span> {{ el.amount }}</span>
										</div>
										<div
											class = "total-money"
											v-show = "el.money"
										>
											获得奖励：
											<i
												class = "iconfont icon-icon_diamond1 fdc-color"
											></i>
											<span> {{ el.money }}</span>
										</div>
									</div>
									<div
										v-show = "rankKind === 2"
										class = "user-name"
									>
										<div class = "over-flow-hide font-bold">
											<i class = "iconfont icon-icon_people"></i>
											{{ el.name }}
										</div>
										<div class = "total-money">
											<i
												class = "iconfont icon-icon_diamond1 fdc-color"
											></i
											>
											<span class = "font-bold">
												{{ el.amount }}
											</span
											>
										</div>
									</div>
									<div class = "invite-btn">
										<div align = "center">
											<img
												src = "../assets/image/battle/normalBtn.png"
												@click = "inviteUser(0, el)"
												alt = ""
												class = "war-hover"
												v-show = "el.flag"
												width = "100%"
											/>
											<img
												src = "../assets/image/battle/reverseBtn.png"
												@click = "inviteUser(1, el)"
												alt = ""
												class = "war-hover"
												v-show = "el.flag"
												width = "100%"
											/>
											<img
												src = "../assets/image/battle/offlineN.png"
												alt = ""
												v-show = "!el.flag"
												width = "100%"
											/>
											<img
												src = "../assets/image/battle/offlineR.png"
												alt = ""
												v-show = "!el.flag"
												width = "100%"
											/>
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
									<div
										v-show = "rankKind === 1"
										class = "user-name"
									>
										<div class = "over-flow-hide">
											<i class = "iconfont icon-icon_people"></i>
											{{ el.name }}
										</div>
										<div>
											连胜
											<span>{{ el.num }}</span>
											局
											<span>
												{{ el.amount }}
											</span>
										</div>
										<div v-show = "el.money">
											获得奖励：
											<span>
												<span
													class = "hide-p hide-ipad"
												>
													<i
														class = "iconfont icon-icon_diamond1 fdc-color"
													></i>
												</span>
												{{ el.money }}
											</span
											>
										</div>
									</div>
									<div
										v-show = "rankKind === 2"
										class = "user-name"
									>
										<div class = "over-flow-hide">
											<i class = "iconfont icon-icon_people"></i>
											{{ el.name }}
										</div>
										<div>
											<i
												class = "iconfont icon-icon_diamond1 fdc-color"
											></i
											>
											<span> {{ el.amount }}</span>
										</div>
									</div>
									<div class = "invite-btn">
										<div align = "center">
											<img
												src = "../assets/image/battle/normalBtn.png"
												@click = "inviteUser(0, el)"
												alt = ""
												class = "war-hover"
												v-show = "el.flag"
												width = "100%"
											/>
											<img
												src = "../assets/image/battle/reverseBtn.png"
												@click = "inviteUser(1, el)"
												alt = ""
												class = "war-hover"
												v-show = "el.flag"
												width = "100%"
											/>
											<img
												src = "../assets/image/battle/offlineN.png"
												alt = ""
												v-show = "!el.flag"
												width = "100%"
											/>
											<img
												src = "../assets/image/battle/offlineR.png"
												alt = ""
												v-show = "!el.flag"
												width = "100%"
											/>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<Empty v-show = "rankList.length === 0"></Empty>
					</div>
				</div>
				<!--        仇恨信息-->
				<div
					class = "ranking-box friend-enemy"
					v-show = "tap === 1"
				>
					<div class = "num-progress-music">
						<div class = "open-box-progress">
							<div
								class = "process-box-text"
								style = "color: #ffffff; opacity: 0.5"
							>
								{{
									friendKind === 1 ? "对局中战胜我的玩家" : "对局中被我击败的玩家"
								}}
							</div>
						</div>
					</div>
					<div
						v-show = "firendArr.length > 0"
						class = "bag-tips battle-tips"
					>
						<div
							class = "roll-ranking"
							style = "background: none"
						>
							<ul>
								<li
									class = "roll-luck-item"
									v-for = "el in firendArr"
									:key = "el.amount"
								>
									<div
										class = "rank-num"
										:class = "
											friendKind === 1 ? 'lose-infi' : 'win-infi'
										"
									>
										<div>{{ el.num }}</div>
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
										<div class = "total-money">
											<span
												:style = "{
													color:
														friendKind === 1
															? '#da2863'
															: '#50ffa4',
												}"
											>
												<span
													:style = "{
														color:
															friendKind === 1
																? '#da2863'
																: '#50ffa4',
													}"
													class = "font-bold"
												>{{
														friendKind === 1 ? "败" : "胜"
												 }}：
												</span
												>
												<i class = "iconfont icon-icon_diamond1"></i>
												<span
													:style = "{
														color:
															friendKind === 1
																? '#da2863'
																: '#50ffa4',
													}"
													class = "font-bold"
												>{{ el.amount }}
												</span
												>
											</span>
										</div>
									</div>
									<div class = "invite-btn">
										<div align = "center">
											<img
												src = "../assets/image/battle/normalBtn.png"
												alt = ""
												class = "war-hover"
												v-show = "el.flag"
												width = "100%"
												@click = "inviteUser(0, el)"
											/>
											<img
												src = "../assets/image/battle/reverseBtn.png"
												alt = ""
												class = "war-hover"
												v-show = "el.flag"
												width = "100%"
												@click = "inviteUser(1, el)"
											/>
											<img
												src = "../assets/image/battle/offlineN.png"
												alt = ""
												v-show = "!el.flag"
												width = "100%"
											/>
											<img
												src = "../assets/image/battle/offlineR.png"
												alt = ""
												v-show = "!el.flag"
												width = "100%"
											/>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div
						v-show = "firendArr.length === 0"
						align = "center"
					>
						<img
							src = "../assets/image/battle/empty.png"
							v-show = "friendKind === 2"
							alt = ""
							class = "hide-m"
						/>
						<img
							src = "../assets/image/battle/emptywin.png"
							v-show = "friendKind === 1"
							alt = ""
							class = "hide-m"
						/>
						<img
							src = "../assets/image/battle/emptywinm.png"
							v-show = "friendKind === 1"
							alt = ""
							class = "hide-p hide-ipad"
							width = "100%"
						/>
						<img
							src = "../assets/image/battle/emptyten.png"
							v-show = "friendKind === 2"
							alt = ""
							class = "hide-p hide-ipad"
							width = "100%"
						/>
					</div>
				</div>
				<!--        房间列表-->
				<div
					class = "battle-container"
					v-show = "tap === 0"
				>
					<div class = "roll-box-left">
						<div class = "room-info">
							<transition-group
								appear
								tag = "ul"
								class = "room-info-box"
							>
								<li
									@click = "goBattle(el.roomId)"
									:class = "el.bgClass"
									v-for = "el in roomArr"
									:key = "el.roomId"
								>
									<!--对战房名称-->
									<div
										class = "det-room-name"
										:class = "{ 'det-room-over': el.status === 4 }"
									>
										<div
											class = "waiting-icon"
											v-show = "el.status == 2"
										>
											<div>等待中 {{ listCountDown(el.time) }}</div>
											<div class = "fast-battle flex-layout">
												<div
													v-if = "el.isFastBattle !== 1"
													style = "margin-right: 10px"
												>
													<i
														class = "iconfont icon-icon_roomtype"
													></i>
												</div>
												<div v-if = "el.roomType === 0">
													<i class = "iconfont icon-icon-lock"></i>
												</div>
											</div>
										</div>
										<div
											v-show = "el.status == 3"
											style = "text-align: left"
										>
											<span>游戏中</span>
										</div>
										<div
											class = "end-icon"
											v-show = "el.status == 4"
										>
											<span>已结束</span>
										</div>
									</div>
									<div class = "round-user">
										<div class = "round-money">
											<div :class = "el.circleClass">
												{{ el.box.length }}
												<div v-show = "el.type === 1">反转模式</div>
											</div>
											<!-- 房间价格 -->
											<div class = "room-money">
												<div>
													<i
														class = "iconfont icon-icon_diamond1"
													></i>
													<span> {{ el.amount }}</span>
												</div>
											</div>
										</div>
										<div class = "jioner-user">
											<!--   头像-->
											<div
												class = "crown-position"
												v-for = "item in el.user"
											>
												<div
													align = "center"
													class = "avator-shapes"
													:class = "[
														{
															'filter-color':
																item.result !== 1 &&
																el.status === 4,
														},
														{ win: item.result === 1 },
														{ 'rabit-img': item.userType == 1 },
													]"
												>
													<img
														:src = "
															item.userImg
																? imgHost(item.userImg)
																: require('../assets/image/battle/unUser.png')
														"
													/>
												</div>
												<img
													src = "../assets/image/battle/crowns.png"
													alt = ""
													v-show = "item.result === 1"
												/>
												<img
													:src = "
														imgHost(
															item.headPortraitBox
																? item.headPortraitBox
																: '',
														)
													"
													alt = ""
												/>
											</div>
										</div>
									</div>
									<!--  箱子数目-->
									<div class = "battle-box">
										<div
											class = "box-style"
											v-for = "(item, idx) in el.box"
											:key = "+el.roomId + +item.boxId + idx"
										>
											<img
												:src = "imgHost(item.background)"
												alt = ""
											/>
											<img
												:src = "imgHost(item.boxImg)"
												alt = ""
											/>
										</div>
									</div>
								</li>
							</transition-group>
						</div>
						<div
							class = "watch-more"
							@click = "viewMore"
							v-show = "roomArr.length > 0"
						>
							<div
								align = "center"
								style = "height: 0.9rem"
							>
								<!--                                <img src="../assets/image/battle/seeMore.png" alt="" style="height: 70%">-->
							</div>
							<div class = "see-more-battle">查看更多</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<BattleModule ref = "battleModule"></BattleModule>
		<hash-module
			v-model = "show"
			width = "9.5"
			title = "对战规则"
		>
			<div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>1</span>
						</div>
					</div>
					<div>创建房间后无法主动关闭，加入后无法退出。</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>2</span>
						</div>
					</div>
					<div>
						房间等待时间最长为
						<span class = "important-tips">60
						</span
						>
						分钟，默认有玩家参与即可开启，可点击游戏大厅小火箭标识更改房间开启规则为到达时间玩家未满自动关闭。
					</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>3</span>
						</div>
					</div>
					<div>
						玩家可同时创建
						<span class = "important-tips">2
						</span
						>
						个在线房间：
						<span class = "important-tips">1</span>
						个人机对战
						，
						<span class = "important-tips">1
						</span
						>
						个玩家对战（常规对战、反转对战），同类型房间上限为
						<span
							class = "important-tips"
						>1
						</span
						>
						个。
					</div>
				</div>
				
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>4</span>
						</div>
					</div>
					<div>
						<span
						>常规对战房间等待
							<span class = "important-tips">5
							</span
							>
						 分钟后，可添加对战机器人。
						</span
						>
					</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>5</span>
						</div>
					</div>
					<div>
						创建常规对战和反转对战可邀请在线好友和全站在线玩家对战，全站玩家
						<span
							class = "important-tips"
						>1
						</span
						>
						分钟内只可邀请一次。
					</div>
				</div>
				<div
					class = "default-btn modal-btn creat-btn"
					@click = "
						show = false;
						$refs.videoPlay.pause();
					"
				>
					确定
				</div>
			</div>
		</hash-module>
		<hash-module
			v-model = "howPlay"
			:width = "9"
			title = "玩法介绍"
		>
			<div class = "play-battle">
				<p style = "font-size: 18px">玩法介绍：</p>
				<div
					style = "margin: 0.1rem auto 0.3rem"
					class = "battle-rule"
				>
					<div>
						<div class = "bat-rule">
							<span>1</span>
						</div>
					</div>
					<div>
						对战结束根据最终个人获得饰品的总价值分胜负，胜方获得全场所有饰品，败方获得安慰奖。
					</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>2</span>
						</div>
					</div>
					<div>
						若一场对战中存在平局，则败方所获饰品将会折算成余额平分给平局的胜方，败方获得安慰奖。
					</div>
				</div>
				<p style = "font-size: 18px">玩法说明：</p>
				<div
					class = "battle-rule"
					style = "margin: 0.1rem auto 0.3rem"
				>
					<div>
						<div class = "bat-rule">
							<span>1</span>
						</div>
					</div>
					<div>常规对战：开箱结果饰品总价值高的玩家获胜。</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>2</span>
						</div>
					</div>
					<div>反转对战：开箱结果饰品总价值低的玩家获胜。</div>
				</div>
				<p style = "font-size: 18px">模式说明：</p>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>1</span>
						</div>
					</div>
					<div>
						人机模式：仅在常规对战下选择，选择该模式后房间将自动加入和房间人数相等的机器人，极速开始。
					</div>
				</div>
				<div class = "battle-rule">
					<div>
						<div class = "bat-rule">
							<span>2</span>
						</div>
					</div>
					<div>
						邀请模式：
						<span class = "important-tips">1
						</span
						>
						分钟内仅允许被邀请玩家加入，
						<span class = "important-tips">1-5
						</span
						>
						分钟允许其他玩家加入，
						<span class = "important-tips">5
						</span
						>
						分钟后允许机器人加入
					</div>
				</div>
				<div
					style = "margin: 0.4rem auto"
					class = "default-btn modal-btn creat-btn"
					@click = "howPlay = false"
				>
					确定
				</div>
			</div>
		</hash-module>
		<hash-module
			v-model = "sureCreate"
			title = "反转模式"
		>
			<div
				class = "i-color"
				style = "width: auto; margin-top: 30px"
			>
				<img
					src = "../assets/image/battle/remodule.png"
					alt = ""
				/>
			</div>
			<p
				class = "modal-content"
				style = "font-size: 0.24rem"
			>
				在此模式下，开箱价值最低的玩家将赢得胜局
			</p>
			<div
				class = "default-btn modal-btn creat-btn"
				@click = "createReverse"
			>
				确定
			</div>
		</hash-module>
	</div>
</template>

<script>
import BattleModule from "../components/Battle/battleModule";
import { getAction } from "@/api/manage";
import Title from "../components/Title";
import { mapState } from "vuex";
import { swapArrData } from "@/utils/utils";
import Empty from "@/components/Empty/Empty";
import { throttle } from "@/utils/utils";
import { HrTitle } from '@/New.Components';
import imgBattleBg from './CaseBattle.assets/img.png'
import imgBattleRoomBtn from './CaseBattle.assets/img_1.png'

export default {
	components : {
		BattleModule ,
		Title ,
		Empty,
		HrTitle,
	} ,
	name : "battle" ,
	data () {
		return {
			imgBattleBg,
			imgBattleRoomBtn,
			roomState : 1 ,
			isOpen : false , // 展开排行榜
			isFast : true ,
			sureCreate : false ,
			howPlay : false ,
			tap : 0 , // 0 房间，1 亦敌意友 2. 榜单
			show : false ,
			page : 1 ,
			roomArr : [] ,
			checkOpen : null ,
			rankList : [] ,
			firendArr : [] ,
			timer : null ,
			kind : 0 ,
			rankKind : 2 , // 优胜连胜
			friendKind : 1 , // 敌友
			todayOrYes : 1 , // 0 昨日 1 今日
			time : 0 ,
			url : {
				roomLst : "/api/battle/rooms" ,
				ranking : "/api/battle/battle/list" ,
				isOpen : "/api/battle/open" ,
				list : "/api/battle/enemy/list" ,
			} ,
		};
	} ,
	mounted () {
		// 监听视频播放
		if ( this.$store.state.account.videoState === 0 ) {
			this.howPlay = true;
			this.$store.commit("account/setVideo" , 1);
		}
	} ,
	computed : {
		...mapState("account" , ["videoState"]) ,
	} ,
	created () {
		this.getRoomList();
		this.initSockt();
		// this.getRankingList(1)
		this.timer = setInterval(() => {
			this.roomArr.forEach((el , idx) => {
				if ( el.time ) {
					el.time --;
					if ( el.time < 1 && el.status === 2 && el.isFastBattle === 0 ) {
						return this.roomArr.splice(idx , 1);
					}
					if ( el.time < 1 && el.status === 2 && el.isFastBattle === 1 && !el.user[1].userImg ) {
						return this.roomArr.splice(idx , 1);
					}
					if ( el.time < 1 && el.status === 2 && el.isFastBattle === 1 && el.user[1].userImg ) {
						el.status = 3;
					}
				}
			});
		} , 1000);
		// 对战开启关闭
		this.checkOpen = setInterval(() => {
			this.isOpenBattle();
		} , 100 * 1000);
	} ,
	beforeRouteLeave (to , from , next) {
		this.webSocket.close();
		clearInterval(this.timer);
		clearInterval(this.checkOpen);
		next();
	} ,
	watch : {
		videoState (nv) {
			if ( nv === 0 ) this.show = true;
			this.$store.commit("account/setVideo" , 1);
		} ,
		show (nv) {
			if ( !nv ) this.$refs.videoPlay.pause();
		} ,
		kind () {
			this.getRoomList();
		} ,
		tap (nv) {
			if ( nv === 1 || nv === 2 ) {
				this.getRankingList(1 , nv === 2 ? 1 : null);
			}
		} ,
	} ,
	methods : {
		inviteUser (type , el) {
			let a = {
				user : this.$store.state.account.user.id ,
				users : el.userId ? el.userId : el.id ,
			};
			sessionStorage.setItem("hoster" , JSON.stringify(a));
			if ( type === 0 ) this.$refs.battleModule.isInviteChose = true;
			this.creatBattle(type);
		} ,
		isOpenBattle () {
			getAction(this.url.isOpen).then((res) => {
				if ( res.data == 1 ) {
					this.$Message.info("对战功能维护");
					return this.$router.push("/");
				}
			});
		} ,
		listCountDown (time) {
			let min = Math.floor(time / 60);
			let sec = Math.floor(time % 60).toString().length == 1 ? "0" + Math.floor(time % 60) : Math.floor(time % 60);
			return min + " : " + sec;
		} ,
		createReverse () {
			this.sureCreate = false;
			getAction("/api/battle/query/battle/room").then((res) => {
				if ( !res.data.ordinary && !res.data.robot ) {
					return this.$Message.info("请等待已建立对战房间结束");
				}
				this.$refs.battleModule.isReverse = 1;
				this.$refs.battleModule.isFast = this.isFast;
				if ( this.$store.state.account.isPhone ) {
					return (this.$refs.battleModule.selectArticle = true);
				}
				this.$refs.battleModule.choseBox = true;
			});
		} ,
		creatBattle (type) {
			if ( type === 1 ) return (this.sureCreate = true);
			getAction("/api/battle/query/battle/room").then((res) => {
				if ( !res.data.ordinary && !res.data.robot ) {
					return this.$Message.info("请等待已建立对战房间结束");
				}
				this.$refs.battleModule.isReverse = type;
				this.$refs.battleModule.isFast = this.isFast;
				if ( this.$store.state.account.isPhone ) {
					return (this.$refs.battleModule.selectArticle = true);
				}
				this.$refs.battleModule.choseBox = true;
			});
		} ,
		viewMore () {
			getAction(this.url.roomLst , {
				size : 16 ,
				current : ++ this.page ,
				type : this.kind ,
			}).then((res) => {
				let arr = this.handleResult(res.data);
				this.roomArr.push(...arr);
			});
		} ,
		/**
		 * type 榜单类型
		 * days 优胜/昨日今日
		 * */
		getRankingList : throttle(function (type , days = 1) {
			if ( this.tap === 1 && !this.$store.state.account.user.id ) {
				this.tap = 0;
				return this.$login();
			}
			let parmas = { type : type };
			if ( type === 2 && this.tap === 2 ) {
				parmas.listType = days;
			}
			getAction(this.tap === 1 ? this.url.list : this.url.ranking , parmas ).then((res) => {
				this.$nextTick(() => {
					this.rankKind = type;
					this.friendKind = type;
					this.todayOrYes = days;
				});
				if ( this.tap === 1 ) {
					return (this.firendArr = res.data.list || []);
				}
				if ( this.tap === 2 ) {
					return (this.rankList = res.data);
				}
			});
		} , 300) ,
		getRoomList (page = 1) {
			getAction(this.url.roomLst , {
				size : 16 ,
				current : page ,
				type : this.kind ,
			}).then((res) => {
				this.roomArr = this.handleResult(res.data);
			});
		} ,
		handleTime (item , idx) {
			if ( item.time ) {
				item.timer = setInterval(() => {
					item.time --;
					if ( item.time < 1 && item.status == 2 && item.isFastBattle == 0 ) {
						clearInterval(item.timer);
						item.timer = null;
						return this.roomArr.splice(idx , 1);
					}
					if ( item.time < 1 && item.status == 2 && item.isFastBattle == 1 && !item.user[1].userImg ) {
						clearInterval(item.timer);
						item.timer = null;
						return this.roomArr.splice(idx , 1);
					}
					if ( item.time < 1 && item.status == 2 && item.isFastBattle == 1 && item.user[1].userImg ) {
						item.status = 3;
						clearInterval(item.timer);
						item.timer = null;
					}
				} , 1000);
			}
		} ,
		handleResult (result) {
			let userArr = {
				id : 1 ,
				result : 0 ,
				userImg : null ,
				userName : "",
			};
			if ( Object.prototype.toString.call(result).indexOf("Array") > - 1 ) {
				result.forEach((el) => {
					this.handleStatus(el);
					if ( el.user.length < el.num ) {
						el.user.push(userArr);
						this.handleResult(result);
					}
				});
			}
			if ( Object.prototype.toString.call(result).indexOf("Object") > - 1 ) {
				this.handleStatus(result);
				if ( result.user.length < result.num ) {
					result.user.push(userArr);
					this.handleResult(result);
				}
			}
			return result;
		} ,
		handleStatus (result) {
			result.bgClass = result.status === 3 ? `state-pending-${ result.type }` : result.status === 4 ? `state-over-${ result.type }` : "";
			result.circleClass = result.status === 3 ? `round-pending-${ result.type }` : result.status === 4 ? `round-over-${ result.type }` : "";
			if ( result.status === 2 ) {
				result.bgClass = `state-wait-${ result.type }`;
				result.circleClass = `round-state-${ result.type }`;
			}
		} ,
		goBattle (id) {
			this.$router.push(`/page/battle/${ id }`);
		} ,
		creatCompare (propertyName) {
			return function (obj1 , obj2) {
				let value1 = obj1[propertyName];
				let value2 = obj2[propertyName];
				if ( value1 < value2 ) {
					return - 1;
				} else if ( value1 > value2 ) {
					return 1;
				} else {
					return 0;
				}
			};
		} ,
		initSockt () {
			this.webSocket = new WebSocket(`${ process.env.VUE_APP_LINK_WS }` + "/wss/battle/page" );
			this.webSocket.onopen = this.websocketonopen;
			this.webSocket.onerror = this.websocketonerror;
			this.webSocket.onmessage = this.websocketonmessage;
			this.webSocket.onclose = this.websocketclose;
		} ,
		websocketonopen () {
			console.log("WebSocket连接成功");
		} ,
		websocketonerror () {
			//错误
			this.webSocket.close();
			this.initSockt();
			console.log("WebSocket连接发生错误");
		} ,
		/**
		 * @param data type 1 用户加入
		 * type 2 开始对战
		 */
		websocketonmessage (e) {
			//数据接收
			var data = JSON.parse(e.data);
			//操作处理...
			if ( data.type == "0" && this.kind == 0 ) {
				let arr = this.handleResult(data.userMap);
				this.roomArr.unshift(arr);
				// this.roomArr.map((item, index) => {
				//   this.handleTime(item, index)
				// })
				this.roomArr = this.roomArr.sort(this.creatCompare("status"));
			} else if ( data.type == "1" ) {
				this.roomArr.forEach((el , idx) => {
					if ( data.userMap.roomId == el.roomId ) {
						this.roomArr[idx].user[data.index] = data.userMap;
					}
				});
			} else if ( data.type == "2" ) {
				this.roomArr.forEach((el , idx) => {
					if ( data.userMap.roomId == el.roomId ) {
						this.roomArr[idx].user = data.userMap.user;
						el.status = data.userMap.status;
						this.handleStatus(el);
					}
				});
				this.roomArr = this.roomArr.sort(this.creatCompare("status"));
			} else if ( data.type == "3" ) {
				this.roomArr.forEach((el) => {
					if ( data.roomId == el.roomId ) {
						el.status = 4;
						this.handleStatus(el);
					}
				});
				this.roomArr = this.roomArr.sort(this.creatCompare("status"));
			} else if ( data.type == "4" ) {
				this.roomArr.forEach((el , idx) => {
					if ( data.roomId == el.roomId ) {
						return this.roomArr.splice(idx , 1);
					}
				});
			}
		} ,
		websocketclose (e) {
			//关闭
			console.log(JSON.stringify(e));
		} ,
	} ,
};
</script>

<style
	scoped
	lang = "less"
>
.v-enter,
.v-leave-to {
	opacity: 0;
	transform: translateX(-80px);
}

.yse-td {
	display: flex;
	gap: 15px;
	
	> div {
		cursor: pointer;
	}
}

.yse-td > div:nth-child(1) {
	width: 90px;
	height: 25px;
	background: url("../assets/image/battle/yerank.png") no-repeat top left /
		100%;
	
	&:hover {
		background: url("../assets/image/battle/yerankH.png") no-repeat top left /
			100%;
	}
	
	&.active {
		background: url("../assets/image/battle/yerankH.png") no-repeat top left /
			100%;
	}
}

.yse-td > div:nth-child(2) {
	width: 90px;
	height: 25px;
	background: url("../assets/image/battle/tdrank.png") no-repeat top left /
		100%;
	
	&:hover {
		background: url("../assets/image/battle/tdrankH.png") no-repeat top left /
			100%;
	}
	
	&.active {
		background: url("../assets/image/battle/tdrankH.png") no-repeat top left /
			100%;
	}
}

@media screen and (max-width: 767px) {
	.screening {
		width: 75%;
		margin: 0.3rem auto;
	}
}

.v-enter-active,
.v-leave-active {
	transition: all 0.6s ease;
}

/* 下面的 .v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果 */
.v-move {
	transition: all 0.6s ease;
}

.v-leave-active {
	position: absolute;
}

/deep/ .home-title {
	padding: 0.6rem 0 10px 0;
}

.modal-content {
	font-weight: bold;
	font-size: 0.18rem;
}

.num-progress-music {
	background: url("../assets/image/battle/line.png") no-repeat left bottom /
		100%;
}

.battle-rule div:nth-of-type(2) {
	font-size: 17px;
}

.re-btn {
	color: #fffffe;
	background-image: url("../assets/image/battle/img_2.png");
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: center;
	width: 200px;
	height: 46px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.re-btn i {
	color: #e33eff;
}

.battle-rule {
	margin: 0.2rem 0;
}

.no-btn {
	color: #fffffe;
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: center;
	width: 200px;
	height: 46px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: url("../assets/image/battle/img_3.png");
	color: #fffffe;
}

.no-btn:hover {
	
}

.re-btn:hover {
}

.no-btn i {
	color: #2b58ff;
}
</style>
