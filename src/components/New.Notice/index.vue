<template>
	<div class = "notice-box">
		<!-- 通知弹窗 -->
		<div
			class = "modal-bg-notice"
			:class = "{ show: isShow }"
		>
			<div
				class = "modal-box-bg-notice scroll-style"
				:class = "{ show: isShow }"
			>
				<!--          关闭导航-->
				<div class = "close-div">
					<div
						class = "no-pop"
						:class = "{ wap: isPhone }"
						@click = "agreement = !agreement"
					>
						<div class = "all-chosed">
							<!--用户点√的时候显示,此处为true -->
							<i
								class = "iconfont iconicon-select"
								v-show = "agreement"
							></i>
						</div>
						<span>我已阅读，今日不再自动弹出提醒</span>
					</div>
					<img
						src = "./close-btn.svg"
						:style = "{width: isPhone ? '4vw' : '26px'}"
						class = "war-hover"
						:class = "{ wap: isPhone }"
						@click = "closeShow"
					/>
				</div>
				<!--        pc端公告-->
				<div
					class = "notice-shell"
					v-if = "!isPhone"
				>
					<!--          标题-->
					<div class = "notice-nav">
						<div
							class = "menu-two"
							@click = "changeMenu(el, idx)"
							:class = "{ active: kind === idx }"
							v-for = "(el, idx) in menuTwo"
							:key = "el.title"
						>
							{{ el.title }}
						</div>
					</div>
					<!--          导航主题-->
					<div
						class = "notice-content"
						align = "center"
					>
						<div class = "menu-one">
							<div
								@click = "switchMenu(el.type, el)"
								class = "title-box"
								:class = "{ active: el.type === activeMenu.type }"
								v-for = "(el, idx) in menu"
								:key = "idx"
							>
								<div>
									<i
										class = "iconfont icon-a-0-ziyuan412"
										v-show = "el.type === 'roll'"
									></i>
									<i
										class = "iconfont icon-icon_notice"
										v-show = "el.type === 'website'"
									></i>
									<i
										class = "iconfont icon-icon_box"
										v-show = "el.type === 'taskbox'"
									></i>
									<i
										class = "iconfont icon-icon_activity"
										v-show = "el.type === 'activity'"
										style = "font-size: 21px;transform: translateY(2px);display: inline-block;"
									></i>
								</div>
								<div>{{ el.title }}</div>
								<img
									src = "../../assets/image/newyear/fire.png"
									v-if = "el.type === 'activity'"
									alt = ""
								/>
							</div>
						</div>
						<!--            roll-->
						<div
							class = "menu-content"
							v-show = "activeMenu.type === 'roll'"
						>
							<div
								v-for = "item in announceRollData"
								:key = "item.name"
							>
								<Row
									class = "ann-data"
									style = "height: 100%"
								>
									<ColC span = "2">
										<div class = "roll-type">
											<img
												src = "../../assets/image/announce/officail.png"
												v-show = "kind === 0"
												alt = ""
												style = "width: 100%"
											/>
											<img
												src = "../../assets/image/announce/hoster.png"
												v-show = "kind === 1"
												alt = ""
												style = "width: 100%"
											/>
										</div>
									</ColC>
									<ColC span = "7">
										<div class = "roll-n-info">
											<p class = "over-flow-hide">{{ item.name }}</p>
											<p />
											<p class = "over-flow-hide">{{ item.description }}</p>
											<div class = "n-count-time">
												还剩
												<span>{{ countDown(item.openTime , "days") }}</span>
												天
												<span>{{ countDown(item.openTime , "hours") }}</span>
												时
												<span>{{ countDown(item.openTime , "minutes") }}</span>
												分
											</div>
										</div>
									</ColC>
									<ColC span = "10">
										<div class = "n-roll-skins">
											<div
												class = "skins-item"
												align = "center"
												v-for = "el in item.prizeImg"
											>
												<img
													:src = "imgHost(el)"
													alt = ""
													style = "width: 90%"
												/>
											</div>
										</div>
									</ColC>
									<ColC span = "4">
										<div class = "btn-n-box">
											<div
												class = "n-btn war-hover"
												:style = "{ opacity: item.isJoin ? 0.5 : 1 }"
												@click = "joinRoll(item)"
											>
												{{ item.isJoin ? "已加入" : "加入" }}
											</div>
											<p @click = "$router.push(`/page/roll/${item.id}`)">前往ROLL房>></p>
										</div>
									</ColC>
								</Row>
							</div>
						</div>
						<!--             福利-->
						<div
							class = "menu-content"
							v-show = "activeMenu.type === 'taskbox'"
						>
							<p v-show = "kind === 0">当日00:00至次日00:00期间数据满足开箱条件时开启，每日00:00重置</p>
							<p v-show = "kind === 1">周一00:00至次周周一00:00期间数据满足开箱条件时开启，每周一00:00重置</p>
							<p v-show = "kind === 2">当月1日00:00至次月1日00:00期间数据满足开箱条件时开启，每月1日00:00重置</p>
							<div
								v-for = "(item, idx) in announceTaskData"
								:key = "item.image + idx"
							>
								<div
									class = "task-data"
									@click = "viewSkins(item)"
								>
									<ColC span = "4">
										<div class = "task-n-box">
											<img
												src = "./img_8.png"
												alt = ""
												style = "width: 100%"
											/>
										</div>
									</ColC>
									<ColC span = "15">
										<div class = "task-n-info">
											<div class = "info-n-pro">
												<img
													src = "../../assets/image/announce/day.png"
													v-show = "kind === 0"
													alt = ""
												/>
												<img
													src = "../../assets/image/announce/week.png"
													v-show = "kind === 1"
													alt = ""
												/>
												<img
													src = "../../assets/image/announce/month.png"
													v-show = "kind === 2"
													alt = ""
												/>
												<p>{{ taskType(item.taskName) }}</p>
											</div>
											<div class = "n-pro-flex">
												<div class = "pro-n-line">
													<div :style = "{ width: item.progressWidth + '%' }"></div>
												</div>
												<p>{{ user.id ? item.amount : 0 }} / {{ item.codeMap }}</p>
											</div>
										</div>
									</ColC>
									<ColC span = "5">
										<div
											class = "n-btn o-btn war-hover"
											:class="{wap:isPhone}"
											@click.stop.prevent = "taskResult(item)"
											:style = "{ opacity: item.isOpacity }"
										>
											{{ !item.flag ? "开启" : "已开启" }}
										</div>
									</ColC>
								</div>
								<div
									class = "skins-n-info"
									:class = "{ active: item.skinsShow }"
								>
									<div
										v-for = "el in item.skinsInfo"
										class = "item-n-skins"
									>
										<p>{{ (el.probability * 100).toFixed(2) }}%</p>
										<div>
											<img
												:src = "imgHost(el.image)"
												alt = ""
												style = "width: 60%"
											/>
										</div>
										<p
											class = "two-line-or"
											:class = "'border-left-' + conversionStyle(el.rarity, el.category)"
										>
											{{ el.name }}
										</p>
										<p>
											<i class = "iconfont icon-icon_diamond1 font-s"></i>
											{{ el.price }}
										</p>
									</div>
								</div>
							</div>
						</div>
						<img
							src = "../../assets/image/announce/bglight.png"
							alt = ""
							class = "light-bg"
							v-show = "resultSkins.price"
						/>
						<div
							class = "result-n-skins"
							:class = "{ active: resultSkins.price }"
						>
							<div>
								<img
									:src = "imgHost(resultSkins.stuffImage)"
									alt = ""
									style = "width: 60%"
								/>
							</div>
							<p>
								{{ resultSkins.stuffName ? resultSkins.stuffName.split("|")[0] : "" }}
							</p>
							<p>
								{{ resultSkins.stuffName ? resultSkins.stuffName.split("|")[1] : "" }}
							</p>
							<div>
								<i class = "iconfont icon-icon_diamond1 font-s"></i>
								{{ resultSkins.price }}
							</div>
							<div
								class = "n-btn"
								@click = "resultSkins = {}"
							>确定
							</div>
						</div>
						<!--             网站公告-->
						<div
							class = "menu-content"
							v-if = "activeMenu.type === 'website'"
						>
							<div
								style = "margin-top: 30px"
								v-html = "activeMenu.secondLevel[this.kind].content"
							></div>
						</div>
						<!--     网站活动-->
						<div
							class = "menu-content"
							v-if = "activeMenu.type === 'activity'"
						>
							<div class = "cell-notice">
								<div class = "cell-num-n">
									<div>
										钥匙余量:
										<span> {{ cellNum }}</span>
									</div>
								</div>
								<div
									class = "act-url"
									@click = "$router.push('/page/source')"
								>前往活动 >
								</div>
							</div>
							<div>
								<Row
									class = "ann-data"
									style = "height: 100%"
								>
									<ColC span = "2">
										<div class = "roll-type">
											<img
												src = "../../assets/image/newyear/signtt.png"
												alt = ""
												style = "width: 90%"
											/>
										</div>
									</ColC>
									<ColC span = "6">
										<div class = "roll-n-info">
											<div class = "text">每日签到可领取对应的钥匙数</div>
											<div class = "sign-num">
												<img
													src = "../../assets/image/newyear/carrotrank.png"
													alt = ""
												/>
												<div>
													总共累计:
													<span>{{ sourceAc.signIn.num }}</span>
												</div>
											</div>
										</div>
									</ColC>
									<ColC span = "11">
										<div class = "n-roll-skins">
											<div class = "sign-progress">
												<div>
													<div
														class = "progress-item"
														v-for = "el in sourceAc.signIn.condition"
														:key = "el.activityDate"
													>
														<div>
															{{ + el.activityDate.split("-")[1] }}.{{ + el.activityDate.split("-")[2] }}
														</div>
														<div align = "center">
															<img
																src = "../../assets/image/newyear/notask.png"
																v-show = "!el.sign"
																alt = ""
															/>
															<img
																src = "../../assets/image/newyear/notasked.png"
																v-show = "el.sign"
																alt = ""
															/>
														</div>
														<div
															class = "sign-cell"
															align = "center"
														>
															<img
																src = "../../assets/image/newyear/carrotrank.png"
																alt = ""
															/>
															<span> {{ el.reward }}</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</ColC>
									<ColC span = "4">
										<div
											class = "n-btn war-hover"
											style = "width: 80%; margin: 40px auto 0; line-height: 28px"
											@click = "signGame('signIn')"
										>
											今日签到
										</div>
									</ColC>
								</Row>
								<Row
									class = "ann-data"
									style = "height: 100%"
									v-for = "(item, idx) in sourceAc.arr"
									:key = "item.key"
								>
									<ColC span = "2">
										<div class = "roll-type">
											<img
												src = "../../assets/image/newyear/battlett.png"
												v-if = "item.key === 'battleWinningStreak'"
												alt = ""
												style = "width: 90%"
											/>
											<img
												src = "../../assets/image/newyear/wishtt.png"
												v-if = "item.key === 'wish'"
												alt = ""
												style = "width: 90%"
											/>
											<img
												src = "../../assets/image/newyear/upgradet.png"
												v-if = "item.key === 'upgrade'"
												alt = ""
												style = "width: 90%"
											/>
											<img
												src = "../../assets/image/newyear/boxt.png"
												v-if = "item.key === 'hash'"
												alt = ""
												style = "width: 90%"
											/>
										</div>
									</ColC>
									<ColC span = "7">
										<div class = "roll-n-info">
											<div
												class = "text"
												v-if = "item.key === 'battleWinningStreak'"
											>满足对战连胜局数
											</div>
											<div
												class = "text"
												v-if = "item.key === 'upgrade'"
											>
												满足献祭金额
												<span>
													≥
													<i class = "iconfont icon-icon_diamond1"></i>
													{{ item.condition.price }}
												</span>
												，升级概率
												<span> < {{ item.condition.successRate * 100 }}%</span>
											</div>
											<div
												v-if = "item.key === 'wish'"
												class = "text"
											>
												消耗对应张数的许愿卡将会获得对应数量的钥匙
											</div>
											<div
												v-if = "item.key === 'hash'"
												class = "text"
											>
												满足单个箱子实际支付金额
												<span>
													≥
													<br />
													<i class = "iconfont icon-icon_diamond1"></i>
													{{ item.condition.price }}
												</span>
											</div>
											<div class = "sign-num">
												<img
													src = "../../assets/image/newyear/carrotrank.png"
													alt = ""
												/>
												<div>
													今日累计:
													<span>{{ item.num }}</span>
												</div>
											</div>
										</div>
									</ColC>
									<ColC span = "10">
										<div class = "n-roll-skins">
											<div class = "day-progress">
												<div
													class = "day-item"
													v-for = "el in item.condition.taskList"
													:style = "{
														width: 100 / (item.condition.taskList.length - 1) + '%',
													}"
												>
													<div class = "carrot">
														<img
															src = "../../assets/image/newyear/nosign.png"
															v-show = "item.num < +el.carrotNum"
															alt = ""
														/>
														<img
															src = "../../assets/image/newyear/nounsign.png"
															v-show = "item.num >= +el.carrotNum"
															alt = ""
														/>
														<span>{{ el.obtain }}</span>
													</div>
													<div class = "receive-progress">
														<div :class = "{ active: item.count >= +el.consume }"></div>
														<div class = "porgress-par">
															<div :style = "{ width: el.progress + '%' }"></div>
														</div>
													</div>
													<div class = "progress-times">
														{{ el.consume }}{{ item.key === "wish" ? "张" : "次" }}
													</div>
												</div>
											</div>
										</div>
									</ColC>
									<ColC span = "4">
										<div
											class = "n-btn war-hover"
											style = "width: 80%; margin: 20px auto 0; line-height: 28px"
											@click = "signGame(item.key)"
										>
											领取钥匙
										</div>
									</ColC>
								</Row>
								<Row
									class = "ann-data"
									style = "height: 100%"
								>
									<ColC span = "2">
										<div class = "roll-type">
											<img
												src = "../../assets/image/newyear/spendtt.png"
												alt = ""
												style = "width: 100%"
											/>
										</div>
									</ColC>
									<ColC span = "7">
										<div class = "roll-n-info">
											<div class = "text">
												每消费
												<span>
													<i class = "iconfont icon-icon_diamond1"></i>
													{{ sourceAc.consumption.condition.taskList[0].consume }}
												</span>
												获得
												<span>{{ sourceAc.consumption.condition.taskList[0].obtain }}</span>
												个钥匙周期内无限循环
											</div>
											<div class = "sign-num">
												<img
													src = "../../assets/image/newyear/carrotrank.png"
													alt = ""
												/>
												<div>
													总共累计:
													<span>{{ sourceAc.consumption.num }}</span>
												</div>
											</div>
										</div>
									</ColC>
									<ColC span = "10">
										<div class = "n-roll-skins un-flex">
											<div
												class = "text"
												style = "line-height: normal"
											>
												当前可领
												<span>
													{{
														Math.floor(sourceAc.consumption.count / sourceAc.consumption.condition.taskList[0].consume ) * sourceAc.consumption.condition.taskList[0].obtain - sourceAc.consumption.num
													}}
												</span>
												个钥匙，离下次获得钥匙还差
												<span>
													<i class = "iconfont icon-icon_diamond1"></i>
													{{
														(sourceAc.consumption.condition.taskList[0].consume - (sourceAc.consumption.count % sourceAc.consumption.condition.taskList[0].consume)).toFixed(2)
													}}
												</span>
											</div>
											<div
												class = "text"
												style = "color: rgba(255, 255, 255, 0.8); line-height: normal"
											>
												距离下次领取钥匙的消费金额进度
											</div>
											<div class = "sign-progress">
												<div class = "progress-charge">
													<div
														:style = "{
															width:
																(
																	((sourceAc.consumption.count %
																		sourceAc.consumption.condition.taskList[0].consume) /
																		sourceAc.consumption.condition.taskList[0].consume) *
																	100
																).toFixed(2) + '%',
														}"
													></div>
												</div>
												<div>
													<span>
														<i class = "iconfont icon-icon_diamond1"></i>
														0
													</span>
													<span>
														<i class = "iconfont icon-icon_diamond1"></i>
														{{ sourceAc.consumption.condition.taskList[0].consume }}
													</span>
												</div>
											</div>
										</div>
									</ColC>
									<ColC span = "4">
										<div
											class = "n-btn war-hover"
											style = "width: 80%; margin: 20px auto 0; line-height: 28px"
											@click = "signGame('consumption')"
										>
											领取钥匙
										</div>
									</ColC>
								</Row>
							</div>
						</div>
					</div>
				</div>
				<!--          移动端-->
				<div
					class = "n-m-shell"
					v-else
				>
					<!--          // 一级标题-->
					<div class = "m-nav-one">
						<div
							class = "n-nav-el"
							@click = "switchMenu(el.type, el)"
							:class = "{ active: el.type === activeMenu.type }"
							v-for = "(el, idx) in menu"
							:key = "idx"
						>
							<i
								class = "iconfont icon-icon_box"
								v-show = "el.type === 'taskbox'"
							></i>
							<i
								class = "iconfont icon-icon_notice"
								v-show = "el.type === 'website'"
							></i>
							<i
								class = "iconfont icon-a-0-ziyuan412"
								v-show = "el.type === 'roll'"
							></i>
							<i
								class = "iconfont icon-icon_activity"
								v-show = "el.type === 'activity'"
							></i>
							<p>{{ el.title }}</p>
							<img
								src = "../../assets/image/newyear/fire.png"
								v-if = "el.type === 'activity'"
								alt = ""
							/>
						</div>
					</div>
					<!--   muenuTwo-->
					<div class = "m-n-ct">
						<div class = "m-n-two">
							<div
								@click = "changeMenu(el, idx)"
								:class = "{ active: kind === idx }"
								v-for = "(el, idx) in menuTwo"
								:key = "el.title"
							>
								{{ el.title }}
							</div>
						</div>
						<div class = "m-n-title">
							<!--            roll-->
							<div
								class = "menu-content"
								v-show = "activeMenu.type === 'roll'"
							>
								<div
									class = "ann-data"
									v-for = "item in announceRollData"
									:key = "item.name"
								>
									<ColC span = "24">
										<div class = "roll-n-info">
											<p class = "over-flow-hide"></p>
											<div class = "roll-type over-flow-hide">
												<img
													src = "../../assets/image/announce/officail.png"
													v-show = "kind === 0"
													alt = ""
													style = "width: 15%"
												/>
												<img
													src = "../../assets/image/announce/hoster.png"
													v-show = "kind === 1"
													alt = ""
													style = "width: 15%"
												/>
												{{ item.name }}
											</div>
										</div>
									</ColC>
									<ColC span = "24">
										<div class = "n-roll-skins">
											<div
												class = "skins-item"
												align = "center"
												v-for = "el in item.prizeImg"
											>
												<img
													:src = "imgHost(el)"
													alt = ""
													style = "width: 90%"
												/>
											</div>
										</div>
									</ColC>
									<ColC span = "24">
										<div class = "btn-n-box">
											<div class = "n-count-time">
												还剩
												<span>{{ countDown(item.openTime , "days") }}</span>
												天
												<span>{{ countDown(item.openTime , "hours") }}</span>
												时
												<span>{{ countDown(item.openTime , "minutes") }}</span>
												分
											</div>
											<p @click = "$router.push(`/page/roll/${item.id}`)">前往ROLL房>></p>
											<div
												class = "n-btn war-hover"
												:style = "{ opacity: item.isJoin ? 0.5 : 1 }"
												@click = "joinRoll(item)"
											>
												{{ item.isJoin ? "已加入" : "加入" }}
											</div>
										</div>
									</ColC>
								</div>
							</div>
							<!--             福利-->
							<div
								class = "menu-content"
								v-show = "activeMenu.type === 'taskbox'"
							>
								<p v-show = "kind === 0">当日00:00至次日00:00期间数据满足开箱条件时开启，每日00:00重置</p>
								<p v-show = "kind === 1">周一00:00至次周周一00:00期间数据满足开箱条件时开启，每周一00:00重置</p>
								<p v-show = "kind === 2">
									当月1日00:00至次月1日00:00期间数据满足开箱条件时开启，每月1日00:00重置
								</p>
								<div
									v-for = "(item, idx) in announceTaskData"
									:key = "item.image + idx"
								>
									<div
										class = "task-data"
										@click = "viewSkins(item)"
									>
										<ColC
											span = "5"
											style = "overflow: hidden"
										>
											<img
												src = "./img_8.png"
												alt = ""
												style = "width: 100%"
											/>
										</ColC>
										<ColC span = "14">
											<div class = "task-n-info">
												<div class = "info-n-pro">
													<img
														src = "../../assets/image/announce/day.png"
														v-show = "kind === 0"
														alt = ""
													/>
													<img
														src = "../../assets/image/announce/week.png"
														v-show = "kind === 1"
														alt = ""
													/>
													<img
														src = "../../assets/image/announce/month.png"
														v-show = "kind === 2"
														alt = ""
													/>
													<div>
														<p class = "">{{ taskType(item.taskName) }}</p>
													</div>
												</div>
												<div class = "n-pro-flex">
													<div class = "pro-n-line">
														<div :style = "{ width: item.progressWidth + '%' }"></div>
													</div>
													<p>{{ user.id ? item.amount : 0 }} / {{ item.codeMap }}</p>
												</div>
											</div>
										</ColC>
										<ColC span = "5">
											<div
												class = "n-btn o-btn war-hover"
												:class="{wap:isPhone}"
												@click.stop.prevent = "taskResult(item)"
												:style = "{ opacity: item.isOpacity }"
											>
												{{ !item.flag ? "开启" : "已开启" }}
											</div>
										</ColC>
									</div>
									<div
										class = "skins-n-info"
										:class = "{ active: item.skinsShow }"
									>
										<div
											v-for = "el in item.skinsInfo"
											class = "item-n-skins"
										>
											<p>{{ (el.probability * 100).toFixed(2) }}%</p>
											<div align = "center">
												<img
													:src = "imgHost(el.image)"
													alt = ""
													style = "width: 60%"
												/>
											</div>
											<p
												class = "two-line-or"
												:class = "'border-left-' + conversionStyle(el.rarity, el.category)"
											>
												{{ el.name }}
											</p>
											<p>
												<i class = "iconfont icon-icon_diamond1 font-s"></i>
												{{ el.price }}
											</p>
										</div>
									</div>
								</div>
							</div>
							<img
								src = "../../assets/image/announce/bglight.png"
								alt = ""
								class = "light-bg"
								v-show = "resultSkins.price"
							/>
							<div
								class = "result-n-skins"
								:class = "{ active: resultSkins.price }"
							>
								<div align = "center">
									<img
										:src = "imgHost(resultSkins.stuffImage)"
										alt = ""
										style = "width: 60%"
									/>
								</div>
								<p>
									{{ resultSkins.stuffName ? resultSkins.stuffName.split("|")[0] : "" }}
								</p>
								<p>
									{{ resultSkins.stuffName ? resultSkins.stuffName.split("|")[1] : "" }}
								</p>
								<div>
									<i class = "iconfont icon-icon_diamond1 font-s"></i>
									{{ resultSkins.price }}
								</div>
								<div
									class = "n-btn"
									@click = "resultSkins = {}"
									style = "margin: auto"
								>确定
								</div>
							</div>
							<div
								class = "menu-content"
								v-if = "activeMenu.type === 'website'"
							>
								<div
									style = "margin-top: 30px"
									v-html = "activeMenu.secondLevel[this.kind].content"
								></div>
							</div>
							<!--     网站活动-->
							<div
								class = "menu-content"
								v-if = "activeMenu.type === 'activity'"
							>
								<div class = "cell-notice">
									<div class = "cell-num">
										<div>
											钥匙余量:
											<span> {{ cellNum }}</span>
										</div>
									</div>
									<div
										class = "act-url"
										@click = "$router.push('/page/source')"
									>前往活动 >
									</div>
								</div>
								<div>
									<div class = "active-layout">
										<div
											class = "roll-n-info"
											style = "display: flex"
										>
											<img
												src = "../../assets/image/newyear/signtt.png"
												v-show = "kind === 0"
												alt = ""
												style = "width: 60px"
											/>
											<div class = "text">每日签到可领取对应的钥匙数</div>
										</div>
										<div class = "n-roll-skins">
											<div
												class = "sign-progress"
												style = "justify-content: normal"
											>
												<div>
													<div
														class = "progress-item"
														v-for = "el in sourceAc.signIn.condition"
														:key = "el.activityDate"
													>
														<div>
															{{ + el.activityDate.split("-")[1] }}.{{ + el.activityDate.split("-")[2] }}
														</div>
														<div align = "center">
															<img
																src = "../../assets/image/newyear/notask.png"
																v-show = "!el.sign"
																alt = ""
															/>
															<img
																src = "../../assets/image/newyear/notasked.png"
																v-show = "el.sign"
																alt = ""
															/>
														</div>
														<div
															class = "sign-cell"
															align = "center"
														>
															<img
																src = "../../assets/image/newyear/carrotrank.png"
																alt = ""
															/>
															<span> {{ el.reward }}</span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div
											class = "btn-n-box"
											style = "padding-top: 10px"
										>
											<div class = "sign-num">
												<img
													src = "../../assets/image/newyear/carrotrank.png"
													alt = ""
												/>
												<div>
													总共累计:
													<span>{{ sourceAc.signIn.num }}</span>
												</div>
											</div>
											<div
												@click = "signGame('signIn')"
												class = "n-btn war-hover"
											>今日签到
											</div>
										</div>
									</div>
									<div
										class = "active-layout"
										v-for = "(item, idx) in sourceAc.arr"
										:key = "item.key"
									>
										<div
											class = "roll-n-info"
											style = "display: flex"
										>
											<img
												src = "../../assets/image/newyear/battlett.png"
												v-if = "item.key === 'battleWinningStreak'"
												alt = ""
												style = "width: 60px"
											/>
											<img
												src = "../../assets/image/newyear/wishtt.png"
												v-if = "item.key === 'wish'"
												alt = ""
												style = "width: 60px"
											/>
											<img
												src = "../../assets/image/newyear/upgradet.png"
												v-if = "item.key === 'upgrade'"
												alt = ""
												style = "width: 60px"
											/>
											<img
												src = "../../assets/image/newyear/boxt.png"
												v-if = "item.key === 'hash'"
												alt = ""
												style = "width: 60px"
											/>
											<div
												class = "text"
												v-if = "item.key === 'battleWinningStreak'"
											>满足对战连胜局数
											</div>
											<div
												class = "text"
												v-if = "item.key === 'upgrade'"
											>
												满足献祭金额
												<span>
													≥
													<i class = "iconfont icon-icon_diamond1"></i>
													{{ item.condition.price }}
												</span>
												，升级概率
												<span> < {{ item.condition.successRate * 100 }}%</span>
											</div>
											<div
												v-if = "item.key === 'wish'"
												class = "text"
											>
												消耗对应张数的许愿卡将会获得对应数量的钥匙
											</div>
											<div
												v-if = "item.key === 'hash'"
												class = "text"
											>
												满足单个箱子实际支付金额
												<span>
													≥
													<i class = "iconfont icon-icon_diamond1"></i>
													{{ item.condition.price }}
												</span>
											</div>
										</div>
										<div class = "n-roll-skins">
											<div
												class = "day-progress"
												style = "margin: 20px 0"
											>
												<div
													class = "day-item"
													v-for = "el in item.condition.taskList"
													:style = "{
														width: 100 / (item.condition.taskList.length - 1) + '%',
													}"
												>
													<div class = "carrot">
														<img
															src = "../../assets/image/newyear/nosign.png"
															v-show = "item.num < +el.carrotNum"
															alt = ""
														/>
														<img
															src = "../../assets/image/newyear/nounsign.png"
															v-show = "item.num >= +el.carrotNum"
															alt = ""
														/>
														<span>{{ el.obtain }}</span>
													</div>
													<div class = "receive-progress">
														<div :class = "{ active: item.count >= +el.consume }"></div>
														<div class = "porgress-par">
															<div :style = "{ width: el.progress + '%' }"></div>
														</div>
													</div>
													<div class = "progress-times">{{ el.consume }}次</div>
												</div>
											</div>
										</div>
										<div
											class = "btn-n-box"
											style = "padding: 10px 0"
										>
											<div class = "sign-num">
												<img
													src = "../../assets/image/newyear/carrotrank.png"
													alt = ""
												/>
												<div>
													今日累计:
													<span>{{ item.num }}</span>
												</div>
											</div>
											<div
												class = "n-btn war-hover"
												@click = "signGame(item.key)"
											>领取钥匙
											</div>
										</div>
									</div>
									<div class = "active-layout">
										<div
											class = "roll-n-info"
											style = "display: flex"
										>
											<img
												src = "../../assets/image/newyear/spendtt.png"
												v-show = "kind === 0"
												alt = ""
												style = "width: 60px"
											/>
											<div class = "text">
												每消费
												<span>
													<i class = "iconfont icon-icon_diamond1"></i>
													{{ sourceAc.consumption.condition.taskList[0].consume }}
												</span>
												获得
												<span>{{ sourceAc.consumption.condition.taskList[0].obtain }}</span>
												个钥匙周期内无限循环
											</div>
										</div>
										<div class = "n-roll-skins un-flex">
											<div
												class = "text"
												style = "line-height: normal"
											>
												当前可领
												<span>
													{{
														Math.floor(sourceAc.consumption.count / sourceAc.consumption.condition.taskList[0].consume ) * sourceAc.consumption.condition.taskList[0].obtain - sourceAc.consumption.num
													}}
												</span>
												个钥匙，离下次获得钥匙还差
												<span>
													<i class = "iconfont icon-icon_diamond1"></i>
													{{
														(sourceAc.consumption.condition.taskList[0].consume - (sourceAc.consumption.count % sourceAc.consumption.condition.taskList[0].consume)).toFixed(2)
													}}
												</span>
											</div>
											<div
												class = "text"
												style = "color: rgba(255, 255, 255, 0.8); line-height: normal"
											>
												距离下次领取钥匙的消费金额进度
											</div>
											<div class = "sign-progress">
												<div class = "progress-charge">
													<div
														:style = "{
															width:
																(
																	((sourceAc.consumption.count %
																		sourceAc.consumption.condition.taskList[0].consume) /
																		sourceAc.consumption.condition.taskList[0].consume) *
																	100
																).toFixed(2) + '%',
														}"
													></div>
												</div>
												<div>
													<span>
														<i class = "iconfont icon-icon_diamond1"></i>
														0
													</span>
													<span>
														<i class = "iconfont icon-icon_diamond1"></i>
														{{ sourceAc.consumption.condition.taskList[0].consume }}
													</span>
												</div>
											</div>
										</div>
										<div
											class = "btn-n-box"
											style = "padding-top: 10px"
										>
											<div class = "sign-num">
												<img
													src = "../../assets/image/newyear/carrotrank.png"
													alt = ""
												/>
												<div>
													总共累计:
													<span>{{ sourceAc.consumption.num }}</span>
												</div>
											</div>
											<div
												class = "n-btn war-hover"
												@click = "signGame('consumption')"
											>领取钥匙
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getAction , postAction } from "@/api/manage";
import { mapState } from "vuex";
import { url } from "@/components/NewYear/Module/api";
import { reaxel_initial } from "@/reaxels/initial";

const reax_Initial = reaxel_initial() , {} = reax_Initial;

export default reaxper({
	status () {
		const { isPhone } = reax_Initial.initialStore;
		return {
			reax_Initial ,
			isPhone ,
		};
	} ,
	data () {
		return {
			kind : 0 , // 二级菜单选中index
			isShow : false ,
			announceRollData : [] , //roll 房数据
			announceTaskData : [] , //任务箱数据
			expandId : "" , //展开行id
			agreement : false ,
			menu : [] , // 一级菜单
			menuTwo : [] , // 二级菜单
			activeMenu : {} , // 选中菜单
			resultSkins : {} , // 福利箱结果
			joinId : [] , // 是否加入id
			cellNum : 0 ,
			rollId : "" ,
			isHeaderTask : false ,
			sourceAc : {
				signIn : {} ,
				consumption : {} ,
				arr : [] ,
			} ,
			url : {
				menu : "/api/home/notice" ,
				roll : "/api/roll/room/home/list" ,
				task : "/api/task/task/info" ,
				notice : "/api/home/notice" ,
				state : "/api/roll/room/user/status" ,
				skins : "/api/task/details" ,
				join : "/api/roll/room/join/room" ,
				result : "/api/task/open" ,
				freshAnnounce : "/api/home/is/new" ,
			} ,
		};
	} ,
	created () {
		this.$bus.$on("showNotice" , data => {
			this.isHeaderTask = true;
			// this.isShow = true;
			if ( typeof data === "number" ) return;
			this.kind = data.boxType;
		});
		setInterval(() => {
			getAction(this.url.freshAnnounce).then(res => {
				if ( res.data !== sessionStorage.getItem("announceVersion") ) {
					sessionStorage.setItem("announceVersion" , res.data);
					return (this.$parent.isNewNotice = true);
				}
			});
		} , 60 * 1000);
	} ,
	beforeDestroy () {
		this.$bus.$off("showNotice");
	} ,
	computed : {
		...mapState("account" , ["user"]) ,
	} ,
	watch : {
		$route (nv , ov) {
			ov.path === nv.path || this.closeShow();
			if ( nv.name === "Home" && this.$store.state.account.noticControner === 1 ) this.isShow = true;
		} ,
		isShow (nv) {
			!nv || this.getMenu(this.isHeaderTask);
			// nv ? document.querySelector("body").setAttribute("style" , "overflow:hidden;") : document.body.removeAttribute("style");
		} ,
		kind (nv) {
			if ( this.activeMenu.type === "roll" ) return this.getRollData(nv);
			if ( this.activeMenu.type === "taskbox" ) return this.getTaskData(nv);
			if ( this.activeMenu.type === "activity" ) return this.getTaskData(nv);
		} ,
		user (nv) {
			if ( nv.id ) {
				this.getCell();
				if ( this.activeMenu.type === "roll" ) return this.getRollData(this.kind);
				if ( this.activeMenu.type === "taskbox" ) return this.getTaskData(this.kind);
				if ( this.activeMenu.type === "activity" ) return this.getTaskData(nv);
			}
		} ,
	} ,
	mounted () {
		if ( this.$store.state.account.noticControner === 2 ) this.agreement = true;
	} ,
	methods : {
		async getCell () {
			try {
				let res = await getAction("/api/activity/radish");
				this.cellNum = res.data;
			}
			catch ( e ) {
				this.cellNum = 0;
			}
		} ,
		signGame (type) {
			if ( !this.user.id ) return this.$login();
			let map = new Map([
				["signIn" , 1] , ["battle" , 2] , ["upgrade" , 3] , ["wish" , 4] , ["hash" , 5] , ["consumption" , 6] , ["battleWinningStreak" , 7] ,
			]);
			let parmas = { type : map.get(type) };
			postAction("/api/activity/receive" , parmas).then(() => {
				this.getActive();
				this.getCell();
				if ( type === 1 ) {
					return this.$Message.success("今日签到成功");
				}
				this.$Message.success("领取成功");
			}).catch(e => {
				this.$Message.error(e.response.data.errMsg);
			});
		} ,
		async getActive () {
			let res = await getAction("/api/activity/activity/home");
			this.sourceAc.arr = [];
			for ( let key in res.data ) {
				res.data[key].condition = JSON.parse(res.data[key].condition);
				this.handleData(res.data[key] , key);
				if ( key !== "signIn" && key !== "consumption" ) {
					res.data[key].key = key;
					this.sourceAc.arr.unshift(res.data[key]);
				}
				this.sourceAc.signIn = res.data["signIn"];
				this.sourceAc.consumption = res.data["consumption"];
			}
		} ,
		handleData (data , key) {
			if ( key === "signIn" ) {
				data.signNum = 0;
				data.condition.forEach(el => {
					el.sign = false;
					if ( data.userSignIn && data.userSignIn.includes(el.activityDate) ) {
						el.sign = true;
					}
					if ( el.activityDate.split("-")[2].includes(new Date().getDate()) ) {
						data.signNum = el.reward;
					}
				});
			}
			if ( data.condition.taskList ) {
				let num = 0;
				data.condition.taskList.forEach(item => {
					num += + item.obtain;
					item.carrotNum = num;
				});
				let task = data.condition.taskList;
				let number = data.count;
				for ( let i = 0 ; i < task.length ; i ++ ) {
					if ( i < task.length - 1 ) {
						if ( task[i].consume < number < task[i + 1].consume ) {
							task[i].progress = ((+ number - + task[i].consume) / (+ task[i + 1].consume - + task[i].consume)) * 100;
						}
						if ( number < task[i].consume ) {
							task[i].progress = 0;
						}
						if ( number >= task[i + 1].consume ) {
							task[i].progress = 100;
						}
					}
				}
			}
		} ,
		changeMenu (item , idx) {
			this.kind = idx;
		} ,
		handleMenu (type , el) {
			let arr = new Map([
				[
					"roll" , [
					{
						title : "官方" ,
						type : 0 ,
					} , {
						title : "主播" ,
						type : 1 ,
					} ,
				] ,
				] , [
					"taskbox" , [
						{
							title : "日度" ,
							type : 0 ,
						} , {
							title : "周度" ,
							type : 1 ,
						} , {
							title : "月度" ,
							type : 2 ,
						} ,
					] ,
				] , ["activity" , el.secondLevel] , ["website" , el.secondLevel] ,
			]);
			if ( el.isChacked ) {
				this.menuTwo = arr.get(type);
				this.activeMenu = el;
			}
		} ,
		taskProgress (res) {
			res.forEach(item => {
				let isFinish = item.amount > 0 ? item.amount / + item.codeMap >= 1 : 0;
				item.skinsShow = false;
				item.skinsInfo = [];
				item.isOpacity = 0.5;
				item.progressWidth = 0;
				if ( this.user.id ) {
					item.progressWidth = item.flag ? 100 : isFinish ? 100 : (item.amount / + item.codeMap) * 100;
					item.isOpacity = item.flag ? 0.5 : isFinish ? 1 : 0.5;
				}
			});
			return res;
		} ,
		getJoinRoom () {
			return new Promise(resolve => {
				getAction(this.url.state).then(res => {
					this.joinId = res.data === null ? [] : res.data;
					resolve(res);
				});
			});
		} ,
		switchMenu (type , el) {
			
			this.menu.forEach(item => {
				item.isChacked = item.type === type;
			});
			this.kind = 0;
			this.handleMenu(type , el);
			if ( type === "roll" ) return this.getRollData(this.kind);
			if ( type === "taskbox" ) return this.getTaskData(this.kind);
			if ( type === "activity" ) return this.getActive(this.kind);
		} ,
		getMenu (isHeaderTask) {
			getAction(this.url.menu).then(res => {
				res.data.forEach(item => {
					if ( isHeaderTask && item.type === "taskbox" ) {
						item.isChacked = true;
						this.handleMenu(item.type , item);
						return this.getTaskData(this.kind);
					}
					this.handleMenu(item.type , item);
					if ( item.isChacked && item.type === "roll" ) {
						return this.getRollData();
					}
					if ( item.isChacked && item.type === "taskbox" ) {
						return this.getTaskData();
					}
					if ( item.isChacked && item.type === "activity" ) {
						return this.getActive();
					}
				});
				this.menu = res.data;
			});
		} ,
		getRollData (rollType = 0) {
			let params = { type : rollType };
			this.joinId = [];
			this.getJoinRoom().then(() => {
				getAction(this.url.roll , params).then(res => {
					for ( let i = 0 ; i < res.data.length ; i ++ ) {
						res.data[i].isJoin = false;
						res.data[i].password = "";
						res.data[i].isPassword = false;
						for ( let j = 0 ; j < this.joinId.length ; j ++ ) {
							if ( res.data[i].id === this.joinId[j].rollId ) {
								res.data[i].isJoin = true;
								break;
							}
						}
					}
					this.announceRollData = res.data;
				});
			});
		} ,
		getTaskData (taskType = 0) {
			let parmas = { type : taskType };
			getAction(this.url.task , parmas).then(res => {
				this.announceTaskData = this.taskProgress(res.data);
				this.viewSkins(res.data[0]);
				this.isHeaderTask = false;
			});
		} ,
		joinRoom (password) {
			let params = {
				roomId : this.rollId ,
				spreadCode : "" ,
				vcode : password.password ,
			};
			postAction(this.url.join , params).then(res => {
				this.$closedPwd();
				this.$Message.success("加入成功");
				this.getRollData(this.kind);
			}).catch(e => {
				this.$Message.error(e.response.data.errMsg + ",请前往Roll房查看详情");
			});
		} ,
		joinRoll (item) {
			this.rollId = item.id;
			let params = {
				roomId : item.id ,
				spreadCode : "" ,
				vcode : "" ,
			};
			if ( !this.user.id ) return this.$login();
			if ( item.isJoin ) return;
			if ( item.joinType === "roll_join_password" || item.joinType === "roll_join_once_password" ) {
				return this.$openPwd(this.joinRoom);
			}
			postAction(this.url.join , params).then(res => {
				this.$Message.success("加入成功");
				this.getRollData(this.kind);
			}).catch(e => {
				if ( e.response.data.errCode !== 615 ) {
					return this.$Message.error(e.response.data.errMsg);
				}
				this.$openTake(e.response.data.data);
			});
		} ,
		taskResult (item) {
			if ( !this.user.id ) return this.$login();
			let params = { boxId : item.id };
			if ( item.flag ) return;
			if ( item.progressWidth < 100 ) return;
			postAction(this.url.result , params).then(res => {
				this.resultSkins = res.data[0];
				item.flag = true;
				item.isOpacity = 0.5;
				// this.getTaskData(this.menuTwo[this.kind].type)
			});
		} ,
		countDown (time , type) {
			let countTime = new Date(time) - new Date();
			let days = parseInt(countTime / 1000 / 60 / 60 / 24 , 10);
			let hours = parseInt((countTime / 1000 / 60 / 60) % 24 , 10);
			let minutes = parseInt((countTime / 1000 / 60) % 60 , 10);
			let arr = {
				days : this.checkTime(days) ,
				hours : this.checkTime(hours) ,
				minutes : this.checkTime(minutes) ,
			};
			return arr[type];
		} ,
		checkTime (i) {
			if ( i < 10 ) {
				i = "0" + i;
			}
			return i + "";
		} ,
		viewSkins (item) {
			let params = { boxId : item.id };
			item.skinsShow = !item.skinsShow;
			if ( !item.skinsShow || item.skinsInfo.length > 0 ) return;
			getAction(this.url.skins , params).then(res => {
				item.skinsInfo = res.data.stuffVOList;
				this.expandId = item.id;
			});
		} ,
		closeShow () {
			if ( this.agreement ) {
				let controller = this.$store.state.account.noticControner;
				if ( controller == 1 && this.$route.name === "Home" ) {
					this.isShow = true;
					this.$store.commit("account/changeState" , 2);
					localStorage.setItem("noticeState" , new Date().getDate());
				}
			}
			if ( !this.agreement ) {
				this.$store.commit("account/changeState" , 1);
			}
			this.isShow = false;
			this.isHeaderTask = false;
			this.activeMenu = {};
			if ( this.$route.name === "Home" && !this.user.id ) {
				this.$wealfare(true , false);
			}
		} ,
	} ,
});
</script>

<style
	lang = "less"
	scoped
>
.sign-progress .sign-cell {
	> span {
		color: #aa9cff;
	}
	
	img {
		width: 4px;
	}
}

.sign-progress {
	> div {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	span {
		font-size: 12px;
		color: #ffc937;
	}
	
	.progress-item {
		background: rgba(12, 7, 38, 0.5);
		border: 2px solid rgba(84, 72, 154, 0.5);
		width: 35px;
		height: 52px;
		margin-top: 5px;
		margin-right: 2px;
		border-radius: 2px;
		
		> div:nth-of-type(1) {
			width: 33px;
			margin: auto;
			background: #352593;
			border-radius: 2px;
			font-size: 11px;
			font-weight: 400;
			color: #ffffff;
			text-align: center;
			line-height: 13px;
			padding: 1px 3px;
		}
		
		> div:nth-child(2) {
			font-size: 0;
			margin-top: 2px;
			
			> img {
				width: 15px;
				height: 11px;
			}
		}
	}
}

.progress-charge {
	width: 100%;
	height: 9px;
	background: #2b215e;
	margin: 10px auto;
	border-radius: 3px;
	
	> div {
		width: 50%;
		height: 9px;
		background: #fdb306;
	}
}

.un-flex {
	display: unset;
}

.text {
	font-size: 12px;
	font-weight: 600;
	color: #d9d7ed;
	line-height: 20px;
	margin-bottom: 8px;
	text-align: left;
	
	> span {
		color: #fff47b;
		font-size: 15px;
	}
}

.day-progress {
	display: flex;
	padding: 0 15px;
	
	> div:last-child {
		width: 20px !important;
	}
	
	> div:last-child .porgress-par {
		width: 0 !important;
	}
	
	.day-item {
		width: 80px;
		
		.carrot {
			transform: translateX(-9px);
			display: flex;
			
			> img {
				width: 35px;
			}
			
			> span {
				display: inline-block;
				width: 26px;
				height: 13px;
				background: #ffc937;
				border-radius: 6px;
				font-size: 12px;
				padding: 0 8px;
				color: #000000;
				font-weight: bold;
				text-align: center;
				line-height: 14px;
			}
		}
		
		.progress-times {
			color: #ffddc6;
			font-size: 12px;
			margin-top: 5px;
			min-width: 30px;
			text-align: left;
		}
		
		.receive-progress {
			display: flex;
			align-items: center;
			
			> div:nth-of-type(1) {
				height: 8px;
				width: 10px;
				border-radius: 50%;
				background: #34267e;
				position: relative;
				z-index: 2;
				
				&.active {
					background: #fde857;
				}
			}
			
			> .porgress-par {
				width: 100%;
				height: 4px;
				background: #2b215e;
				display: flex;
				
				> div {
					height: 100%;
					width: 0;
					background: #fdb306;
				}
			}
		}
	}
}

.progress-line {
	position: absolute;
	bottom: 22%;
	left: 12%;
	width: 73%;
	height: 4px;
	background: #491f16;
	z-index: 1;
	
	> div {
		width: 0;
		max-width: 100%;
		height: 100%;
		background: #a2140f;
	}
}

.no-pop {
	font-weight: bold;
	color: #ffffff;
	opacity: 0.7;
	display: flex;
	align-items: center;
	cursor: pointer;
	background: rgb(98, 97, 104);
	border-radius: 8px;
	margin-left: auto;
	padding: 6px;
	font-size: 14px;
	margin-right: 10px;
	
	& .wap {
		padding: 1vw 4.4vw;
		font-size: 4.27vw;
		margin-right: 2.67vw;
	}
}

@media screen and (max-width: 800px) {
	.no-pop {
		font-size: 12px;
	}
	
	.text {
		margin-bottom: 0;
	}
	
	.sign-num {
		margin-top: 0;
	}
	
	.sign-progress .progress-item {
		margin-right: 5px;
	}
	
	.day-progress {
		width: 97%;
	}
	
	.active-layout {
		padding: 3% 5%;
		margin: 20px auto;
		background: linear-gradient(90deg, rgba(34, 20, 96, 0.5), rgba(7, 4, 23, 0.5));
	}
}
</style>
