<template>
	<div class = "upgrade layout">
		<HrTitle
			title = "饰品升级"
		></HrTitle>
		<div class = "user-main flex-item-center">
			<div class = "go-back hide-m">
				<img
					class = "cursor"
					src = "../assets/image/upgrade/Hall/img_2.png"
					@click = "$router.go(-1)"
					alt = ""
					style = "width: 100%"
				/>
			</div>
			<div class = "is-record">
				<p>在大厅公开显示升级数据</p>
				<i-switch
					v-model = "isRecord"
					:disabled = "!isUpgrade"
					size = "small"
				></i-switch>
			</div>
		</div>
		<!--    PC端-->
		<div
			v-if = "!isPhone"
			class = "upgrade-back"
		>
			<div class = "upgrade-bg">
				<div class = "up-bg">
					<div class = "del-box">
						<div
							class = "layout"
							style = "margin: auto; background: none"
						>
							<div
								class = "num-progress-music"
								style = "justify-content: space-around; width: auto"
							>
								<div
									@click = "upgradeHistory"
									class = "upgrade-style"
								>
									<i class = "iconfont iconicon-history"></i>
									升级个人中心
								</div>
								<div
									style = "display: flex; align-items: center"
									class = "line-bg"
								>
									<div class = "upgrade-box-music">
										<div @click = "isAnimation = !isAnimation">
											<div
												:class = "{
													'mute-line': isAnimation !== true,
												}"
											></div>
											<i class = "iconfont iconicon-accelerate"></i>
										</div>
									</div>
									<div
										class = "open-box-progress"
										style = "margin: 0 0.6rem; cursor: pointer"
										@click = "changeSeed"
									>
										<div class = "process-ball-circle">
											<img src="../assets/image/upgrade/img_1.png" width="65">
										</div>
										<div
											class = "process-box-text"v
											style = "color: white;font-size: 20px;font-weight: normal;"
										>
											公平游戏
										</div>
									</div>
									<div class = "upgrade-box-music">
										<div @click = "isMusic = !isMusic">
											<div
												:class = "{ 'mute-line': isMusic !== true }"
											></div>
											<i class = "iconfont iconicon-sound"></i>
										</div>
									</div>
								</div>
								<div
									class = "upgrade-style"
									@click = "showPlay = true"
								>
									<i class = "iconfont iconicon-help"></i>
									玩法介绍
								</div>
							</div>
						</div>
					</div>
					<div
						class = "layout"
						style = "margin: auto"
					>
						<div class = "upgrade-top">
							<!--升级物品-->
							<div class = "upgrade-left">
								<div class = "sacrifice-item">
									<div
										class = "unchose-img"
										:class = "{
											'chose-img': needToUpgradeToItems.image,
										}"
										@click.stop = "resetData"
									>
										<img
											src = "../assets/image/upgrade/img_3.png"
											style = "width: 50%"
											v-show = "!needToUpgradeToItems.image"
										/>
										<img
											src = "../assets/image/upgrade/img_2.png"
											style = "width: 10%"
											v-show = "!needToUpgradeToItems.image"
										/>
										<img
											:src = "needToUpgradeToItems.image"
											alt = ""
											style = "width: 55%"
										/>
										<div v-show = "needToUpgradeToItems.image">
											<P
											>
												<i
													class = "iconfont icon-icon_diamond1 diamond-two"
												></i>
												{{ needToUpgradeToItems.price }}
											</P
											>
										</div>
									</div>
									<div class = "chose-name">
										<p v-show = "!needToUpgradeToItems.image">
											选择您想要升级的物品
										</p>
										<p
											v-show = "needToUpgradeToItems.image"
											:class = "
												'border-' +
												conversionStyle(
													needToUpgradeToItems.rarity,
													needToUpgradeToItems.category,
												)
											"
										>
											{{
												needToUpgradeToItems.name1 + needToUpgradeToItems.name2
											}}
										</p>
									</div>
								</div>
								<div class = "money-upgrade">
									<div>
										<div class = "slider-upgrade">
											<Slider
												:key = "1"
												v-model = "maxSumScale"
												:max = "10000"
												:show-tip = "'never'"
												:min = "0"
												:step = "1"
												:disabled = "
													!desiredItem.skinsId ||
													!user.id ||
													needToUpgradeToItems.value >
														desiredItem.value ||
													!isUpgrade
												"
												style = "flex: 1"
											>
											</Slider>
										</div>
										<div class = "user-balance">
											<p>使用余额</p>
											<p>
												<i
													class = "iconfont icon-icon_diamond1 fdc-color"
												></i>
												<span class = "font-bold"> {{ markup }}</span>
											</p>
										</div>
										<div class = "user-balance">
											<p>总价值</p>
											<p>
												<i
													class = "iconfont icon-icon_diamond1 fdc-color"
												></i>
												<span class = "font-bold">
													{{
														MathFunc.Add(needToUpgradeToItems.value , markup , 2 )
													}}
												</span
												>
											</p>
										</div>
									</div>
								</div>
							</div>
							<!--                升级概率-->
							<div
								class = "upgrade-center"
								align = "center"
							>
								<p v-if = "result.result">{{ probability }} %</p>
								<img
									v-else
									src = "../assets/image/upgrade/resultFalse.png"
									alt = ""
								/>
								<div
									class = "progress-circle"
									:style = "{
										transform: `translate(-50%, -50%) rotate(${
											translateCorner * 3.6 + 1
										}deg)`,
									}"
								>
									<CircleC
										:percent = "
											+probability == 0
												? +probability
												: +probability - 1
										"
										:size = "170"
										:stroke-width = "3.2"
										:trail-width = "3.2"
										stroke-linecap = "square"
										:stroke-color = "['#f3aa3d', '#f3f13d']"
										trail-color = "rgba(255,255,255,0)"
									>
									</CircleC>
								</div>
								<img
									class = "point-upgrade"
									src = "../assets/image/upgrade/img_6.png"
									alt = ""
									:style = "loopAnimation"
								/>
							</div>
							<!--                期望物品-->
							<div class = "upgrade-right">
								<div class = "sacrifice-item">
									<div
										class = "unchose-img"
										:class = "{ 'chose-img': desiredItem.image }"
										@click.stop = "resetDesir"
									>
										<img
											src = "../assets/image/upgrade/img_3.png"
											style = "width: 50%"
											v-show = "!desiredItem.image"
										/>
										<img
											src = "../assets/image/upgrade/img_2.png"
											style = "width: 10%"
											v-show = "!desiredItem.image"
										/>
										<img
											:src = "desiredItem.image"
											alt = ""
											style = "width: 55%"
										/>
										<div v-show = "desiredItem.image">
											<P
											>
												<i
													class = "iconfont icon-icon_diamond1 diamond-two"
												></i>
												{{ desiredItem.value }}
											</P
											>
										</div>
									</div>
									<div class = "chose-name">
										<p v-show = "!desiredItem.image">
											选择您期望得到的物品
										</p>
										<p
											:class = "
												'border-' +
												conversionStyle(
													desiredItem.rarity,
													desiredItem.category,
												)
											"
											v-show = "desiredItem.image"
										>
											{{ desiredItem.name1 + desiredItem.name2 }}
										</p>
									</div>
								</div>
								<div
									class = "money-upgrade corner"
									v-if = "isOpenTrans && user.id"
								>
									<div>
										<div class = "slider-upgrade">
											<Slider
												:key = "renewSlider"
												v-model = "translateCorner"
												:max = "100"
												:show-tip = "'never'"
												:min = "0"
												:step = "1"
												:disabled = "
													!desiredItem.skinsId ||
													!user.id ||
													needToUpgradeToItems.value >
														desiredItem.value ||
													!isUpgrade
												"
												style = "flex: 1"
											>
											</Slider>
										</div>
										<div class = "user-balance">
											<p style = "opacity: 1; color: #fcc601">
												选择升级成功范围区间
											</p>
										</div>
										<div class = "user-balance">
											<p>起始值-结束值</p>
											<p>{{ newCorner }}%</p>
										</div>
									</div>
								</div>
								<p
									class = "interval-time"
									style = "font-size: 16px"
									v-if = "wishTime && isOpenTrans"
								>
									功能持续至：{{ wishTime }}
								</p>
							</div>
						</div>
					</div>
					<div class = "sure-upgrade">
						<div class = "game-tips-words">
							本站所有游戏道具，只能本人取回到游戏内使用，均不允许站内交易及互换
						</div>
						<div
							@click = "wishShow = true"
							class = "buy-wish cursor c-shake"
						>
							<img
								style = "width: 180%"
								src = "../assets/image/upgrade/img.png"
							/>
						</div>
						<div class = "up-right">
							<img
								style="cursor: pointer;"
								width="180"
								@click = "upgrade"
								src="../assets/image/upgrade/img_9.png"
							>
						</div>
						<img
							@click = "fairGame"
							src="../assets/image/upgrade/img_8.png" 
							width="123"
							style = "cursor: pointer;"
						>
					</div>
				</div>
			</div>
			<div
				class = "layout"
				style = "margin: auto"
			>
				<div class = "upgrade-bot">
					<div class = "upgrade-bag">
						<!--                背包物品-->
						<div>
							<div class = "upgrade-bag-title">
								<h2>我的背包</h2>
								<div
									class = "price-sort"
									@click = "sort"
								>
									价格
									<i
										style = "font-size: 13px"
										:class = "{ 'sort-down': bagPage.sort !== 1 }"
										class = "iconfont iconicon-arrow"
									></i>
								</div>
							</div>
							<div class = "bags-item">
								<div
									class = "upgrade-del"
									v-if = "bagData.length > 0"
								>
									<skins-item
										class = "cursor"
										:skins-data = "bagData"
										:is-hover = "true"
										:chosed-id = "needToUpgradeToItems.id"
										@choseSkins = "choseStuff"
									>
									</skins-item>
								</div>
								<Empty
									:box = "true"
									v-else
								></Empty>
							</div>
							<div class = "page-box">
								<Page
									style = "margin: auto"
									:current = "currentBag"
									:total = "currBagTotal"
									:page-size = "bagPage.size"
									@on-change = "jumpBagFunc"
									v-show = "currBagTotal > 0"
								/>
							</div>
						</div>
					</div>
					<!--            可升级物品/-->
					<div class = "upgrade-store">
						<div
							class = "spinner-vue"
							v-if = "loadMall"
						>
							<div class = "spinner">
								<div class = "rect1"></div>
								<div class = "rect2"></div>
								<div class = "rect3"></div>
								<div class = "rect4"></div>
								<div class = "rect5"></div>
							</div>
						</div>
						<!--                        筛选条件-->
						<div class = "upgrade-bag-title">
							<h2 class = "hide-ipad">升级物品</h2>
							<div>
								<Select
									label-in-value
									placeholder = "外观"
									style = "width: 20%; margin-top: 0.1rem"
									class = "select-ele"
									size = "default"
									v-model.number = "searchForm.exterior"
								>
									<Option
										v-for = "item in storeSearch.csgo.exterior"
										:key = "item.value"
										:value = "item.value"
									>
										{{ item.labelZH }}
									</Option>
								</Select>
								<Select
									label-in-value
									placeholder = "宝石"
									style = "width: 20%; margin-top: 0.1rem"
									class = "select-ele"
									size = "default"
									v-model.number = "searchForm.levelName"
								>
									<Option
										v-for = "item in storeSearch.csgo.gemstone"
										:key = "item.value"
										:value = "item.value"
									>
										{{ item.labelZH }}
									</Option>
								</Select>
								<div class = "price-range-item">
									<div
										class = "ivu-icons"
										style = "width: 1.5rem"
									>
										<Input
											class = "search-input search-input-box num-input"
											type = "number"
											icon = "iconfont icon-icon_diamond1 "
											v-model = "searchForm.startPrice"
											size = "default"
											placeholder = "最低价"
										/>
										<i class = "iconfont icon-icon_diamond1"></i>
									</div>
									<div
										class = "ivu-icons"
										style = "width: 1.5rem; margin-left: 0.1rem"
									>
										<Input
											class = "search-input search-input-box num-input"
											type = "number"
											icon = "iconfont icon-icon_diamond1 "
											v-model = "searchForm.endPrice"
											size = "default"
											placeholder = "最高价"
										/>
										<i class = "iconfont icon-icon_diamond1"></i>
									</div>
								</div>
								<div
									class = "price-sort"
									@click = "
										searchForm.sort = searchForm.sort == 1 ? 2 : 1
									"
								>
									价格
									<i
										style = "font-size: 13px"
										:class = "{ 'sort-down': searchForm.sort === 2 }"
										class = "iconfont iconicon-arrow"
									></i>
								</div>
								<i
									style = "
										cursor: pointer;
										font-size: 16px;
										color: #ffffff;
									"
									class = "iconfont icon-icon-search"
									@click.stop.prevent = "searchShow = !searchShow"
								></i>
							</div>
							<div
								class = "name-search"
								:class = "{ active: searchShow }"
							>
								<div>
									<i
										@click.prevent.stop = "searchShow = false"
										class = "iconfont icon-icon-close"
									></i>
								</div>
								<Input
									class = "search-input search-input-box"
									icon = "ios-search"
									v-model = "searchForm.name"
									size = "default"
									@on-enter = "searchFunc($event)"
									placeholder = "输入物品名称"
								/>
							</div>
						</div>
						<!--                        具体物品-->
						<div class = "bags-item">
							<!--                            页码-->
							<div
								class = "upgrade-del"
								v-if = "upgradeData.length > 0"
							>
								<skins-item
									class = "cursor"
									:is-hover = "true"
									:skins-data = "upgradeData"
									:chosed-id = "desiredItem.skinsId"
									@choseSkins = "expectStuff"
								>
								</skins-item>
							</div>
							<Empty v-else></Empty>
						</div>
						<div class = "page-box">
							<Page
								style = "margin: auto"
								:current = "currPage"
								:total = "currTotal"
								:page-size = "searchForm.size"
								@on-change = "jumpPageFunc"
								v-show = "currTotal > 0"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--    移动端-->
		<div
			v-else
			class = "upgrade-back-m"
		>
			<div class = "upgrade-container-top">
				<div class = "del-box">
					<div
						class = "layout"
						style = "margin: auto; background: none"
					>
						<div class = "num-progress-music">
							<div style = "display: flex; justify-content: space-between">
								<div
									@click = "upgradeHistory"
									class = "upgrade-style"
								>
									<i class = "iconfont iconicon-history"></i>
									个人中心
								</div>
								<div
									@click = "changeSeed"
									class = "upgrade-style"
								>
									<i class = "iconfont icon-icon_fair"></i>
									公平游戏
								</div>
								<div
									class = "upgrade-style"
									@click = "showPlay = true"
								>
									<i class = "iconfont iconicon-help"></i>
									玩法介绍
								</div>
							</div>
							<div>
								<div class = "music-m-close">
									<div class = "upgrade-box-music upgrade-box-seed">
										<div @click = "isAnimation = !isAnimation">
											<div
												:class = "{
													'mute-line': isAnimation !== true,
												}"
											></div>
											<i class = "iconfont iconicon-accelerate"></i>
										</div>
									</div>
									<div class = "upgrade-box-music upgrade-box-m">
										<div @click = "isMusic = !isMusic">
											<div
												:class = "{ 'mute-line': isMusic !== true }"
											></div>
											<i class = "iconfont iconicon-sound"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class = "upgrade-circle-m hide-p hide-ipad">
					<div
						class = "upgrade-center"
						align = "center"
					>
						<p v-if = "result.result">{{ probability }} %</p>
						<img
							v-else
							src = "../assets/image/upgrade/resultFalse.png"
							alt = ""
						/>
						<div
							class = "progress-circle"
							:style = "{
								transform: `translate(-50%, -50%) rotate(${
									translateCorner * 3.6 + 1
								}deg)`,
							}"
						>
							<CircleC
								:percent = "
									+probability == 0 ? +probability : +probability - 1
								"
								:size = "245"
								:stroke-width = "3.2"
								:trail-width = "3.2"
								stroke-linecap = "square"
								:stroke-color = "['#f3aa3d', '#f3f13d']"
								trail-color = "rgba(255,255,255,0)"
							>
							</CircleC>
						</div>
						<img
							class = "point-upgrade"
							src = "../assets/image/upgrade/point.png"
							alt = ""
							:style = "loopAnimation"
						/>
					</div>
					
					<!--          选择盒子·-->
					<div class = "phone-chose-box">
						<div class = "item-box-m">
							<div style = "width: 45%">
								<div
									@click = "choseItem('upgrade')"
									class = "unchose-img"
									:class = "{ 'chose-img': needToUpgradeToItems.image }"
									@click.stop = "resetData"
								>
									<img
										src = "../assets/image/upgrade/img_3.png"
										style = "width: 70%; opacity: 0.6"
										v-show = "!needToUpgradeToItems.image"
									/>
									<i
										class = "iconfont iconicon-close"
										v-show = "!needToUpgradeToItems.image"
									></i>
									<img
										:src = "needToUpgradeToItems.image"
										alt = ""
										style = "width: 70%"
									/>
									<div v-show = "needToUpgradeToItems.image">
										<P
										>
											<i
												class = "iconfont icon-icon_diamond1 diamond-two"
											></i>
											{{ needToUpgradeToItems.price }}
										</P
										>
									</div>
								</div>
								<div class = "chose-name">
									<p v-show = "!needToUpgradeToItems.image">
										选择您想要升级的物品
									</p>
									<p v-show = "needToUpgradeToItems.image">
										{{
											needToUpgradeToItems.name1 + needToUpgradeToItems.name2
										}}
									</p>
								</div>
							</div>
							<div style = "height: 2rem; width: 45%">
								<div
									class = "upgrade-right"
									style = "width: 100%"
								>
									<div class = "sacrifice-item">
										<div
											class = "unchose-img"
											:class = "{ 'chose-img': desiredItem.image }"
											@click = "resetDesir"
											@click.stop = "choseItem('desired')"
										>
											<img
												src = "../assets/image/upgrade/img_3.png"
												style = "width: 70%; opacity: 0.6"
												v-show = "!desiredItem.image"
											/>
											<i
												class = "iconfont iconicon-close"
												v-show = "!desiredItem.image"
											></i>
											<img
												:src = "desiredItem.image"
												alt = ""
												style = "width: 70%"
											/>
											<div v-show = "desiredItem.image">
												<P
												>
													<i
														class = "iconfont icon-icon_diamond1 diamond-two"
													></i>
													{{ desiredItem.value }}
												</P
												>
											</div>
										</div>
										<div class = "chose-name">
											<p v-show = "!desiredItem.image">
												选择您期望得到的物品
											</p>
											<p v-show = "desiredItem.image">
												{{ desiredItem.name1 + desiredItem.name2 }}
											</p>
										</div>
									</div>
									<div style = "height: 1.4rem"></div>
								</div>
							</div>
						</div>
						<div class = "slider-box-m">
							<div class = "money-upgrade">
								<div
									class = "game-tips-words"
									style = "text-align: center"
								>
									本站所有游戏道具，只能本人取回到游戏内使用
									<br />
									均不允许站内交易及互换
								</div>
								<div>
									<div class = "slider-upgrade">
										<p>使用余额</p>
										<Slider
											:key = "renewSlider"
											v-model = "maxSumScale"
											:max = "10000"
											:show-tip = "'never'"
											:min = "0"
											:step = "1"
											:disabled = "
												!desiredItem.skinsId ||
												!user.id ||
												needToUpgradeToItems.value >
													desiredItem.value ||
												!isUpgrade
											"
											style = "flex: 1"
										>
										</Slider>
									</div>
									<div class = "user-balance">
										<p>已使用余额</p>
										<p>
											<i
												class = "iconfont icon-icon_diamond1 font-s fdc-color"
											></i>
											{{ markup }}
										</p>
									</div>
									<div class = "user-balance">
										<p>总价值</p>
										<p>
											<i
												class = "iconfont icon-icon_diamond1 font-s fdc-color"
											></i>
											{{
												MathFunc.Add(needToUpgradeToItems.value , markup , 2 )
											}}
										</p>
									</div>
								</div>
								<div v-if = "user.id && isOpenTrans">
									<div class = "slider-upgrade">
										<p>选择区间</p>
										<Slider
											:key = "renewSlider"
											v-model = "translateCorner"
											:max = "100"
											:show-tip = "'never'"
											:min = "0"
											:step = "1"
											:disabled = "
												!desiredItem.skinsId ||
												!user.id ||
												needToUpgradeToItems.value >
													desiredItem.value ||
												!isUpgrade
											"
											style = "flex: 1"
										>
										</Slider>
									</div>
									<div class = "user-balance">
										<p>选择升级成功范围区间</p>
									</div>
									<div class = "user-balance">
										<p>起始值-结束值</p>
										<p>{{ newCorner }}%</p>
									</div>
								</div>
							</div>
						</div>
						<div class = "desire-container-m">
							<div
								class = "flex-layout"
								style = "
									width: 100%;
									align-items: center;
									justify-content: space-around;
								"
							>
								<div
									@click = "fairGame"
									class = "change-seed"
								>
									修改种子
								</div>
								<div class = "sure-upgrade">
									<div class = "up-right">
										<div
											class = "default-btn upgrade-btn"
											@click = "upgrade"
											style = "padding: 0"
										>
											确认升级
										</div>
									</div>
								</div>
							</div>
							<div
								style = "width: 75%; margin: 0 auto"
								@click = "$router.push('/page/wish')"
							>
								<img
									style = "width: 100%"
									src = "../assets/image/upgrade/img.png"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<!--            选择浮动层-->
			<div
				class = "pop-up-select-items hide-p hide-ipad"
				:class = "{ active: selectArticle }"
			>
				<i
					class = "iconfont iconicon-close"
					@click = "selectArticle = false"
				></i>
				<div
					class = "chose-item-m"
					v-if = "!isUpgradeItem"
				>
					<div align = "center">
						<img
							src = "../assets/image/upgrade/img_3.png"
							width = "90%"
							v-if = "!desiredItem.skinsId"
						/>
						<img
							:src = "desiredItem.image"
							
							width = "80%"
							v-else
							style = "
								filter: drop-shadow(
									-12px 9px 1px rgba(51, 51, 51, 0.2)
								);
							"
						/>
					</div>
					<div
						class = "need-itme-box"
						align = "center"
					>
						<div v-if = "!desiredItem.skinsId">
							<img
								src = "../assets/image/upgrade/img_2.png"
								
								width = "30%"
							/>
							<p>选择期望得到的物品</p>
						</div>
						<div v-else>
							<div class = "upgrade-stuff-m">
								<p>
									<i
										class = "iconfont iconicon-bg"
										:class = "
											'drop-gun-' +
											conversionStyle(
												desiredItem.rarity,
												desiredItem.category,
											)
										"
									></i>
									{{ desiredItem.name1 }}
								</p>
								<p>{{ desiredItem.name2 }}</p>
								<P>$ {{ desiredItem.value }}</P>
							</div>
						</div>
					</div>
				</div>
				<div
					class = "chose-item-m"
					v-else
				>
					<div align = "center">
						<img
							src = "../assets/image/upgrade/img_3.png"
							
							width = "90%"
							v-if = "!needToUpgradeToItems.id"
						/>
						<img
							:src = "needToUpgradeToItems.image"
							
							width = "80%"
							v-else
							style = "
								filter: drop-shadow(
									-12px 9px 1px rgba(51, 51, 51, 0.2)
								);
							"
						/>
					</div>
					<div
						class = "need-itme-box"
						align = "center"
					>
						<div v-if = "!needToUpgradeToItems.id">
							<img
								src = "../assets/image/upgrade/img_2.png"
								
								width = "30%"
							/>
							<p>选择想要升级的物品</p>
						</div>
						<div v-else>
							<div class = "upgrade-stuff-m">
								<p>
									<i
										class = "iconfont iconicon-bg"
										:class = "
											'drop-gun-' +
											conversionStyle(
												needToUpgradeToItems.skinsRarity,
												needToUpgradeToItems.category,
											)
										"
									></i>
									{{ needToUpgradeToItems.name1 }}
								</p>
								<p>{{ needToUpgradeToItems.name2 }}</p>
								<P>$ {{ needToUpgradeToItems.value }}</P>
							</div>
						</div>
					</div>
				</div>
				<div
					class = "screening-box-m"
					v-if = "!isUpgradeItem"
				>
					<h2 class = "hide-ipad">升级物品</h2>
					<div class = "screening-type">
						<Select
							label-in-value
							placeholder = "宝石"
							style = "width: 30%"
							class = "select-ele"
							size = "default"
							v-model.number = "searchForm.levelName"
						>
							<Option
								v-for = "item in storeSearch.csgo.gemstone"
								:key = "item.value"
								:value = "item.value"
							>
								{{ item.labelZH }}
							</Option>
						</Select>
						<Select
							label-in-value
							placeholder = "外观"
							style = "width: 30%"
							class = "select-ele"
							size = "large"
							v-if = "searchForm.game === 730"
							v-model.number = "searchForm.exterior"
						>
							<Option
								v-for = "item in storeSearch.csgo.exterior"
								:key = "item.value"
								:value = "item.value"
							>
								{{ item.labelZH }}
							</Option>
						</Select>
						<div
							class = "price-sort-m"
							@click = "searchFunc($event, 'sort')"
						>
							价格
							<i
								style = "font-size: 13px"
								:class = "{ 'sort-down': searchForm.sort === 2 }"
								class = "iconfont iconicon-arrow"
							></i>
						</div>
					</div>
					<div class = "screening-input">
						<Input
							class = "search-input search-input-box"
							size = "large"
							@on-enter = "searchFunc($event)"
							v-model = "searchForm.name"
							style = "width: 100%"
							placeholder = "搜索"
						/>
					</div>
					<div class = "screening-type">
						<div class = "ivu-icons">
							<Input
								class = "search-input search-input-box num-input"
								type = "number"
								icon = "iconfont icon-icon_diamond1 "
								v-model = "searchForm.startPrice"
								size = "large"
								placeholder = "最低价"
							/>
							<i class = "iconfont icon-icon_diamond1"></i>
						</div>
						<span style = "color: #98a8b4">--</span>
						<div class = "ivu-icons">
							<Input
								class = "search-input search-input-box num-input"
								type = "number"
								icon = "iconfont icon-icon_diamond1 "
								v-model = "searchForm.endPrice"
								size = "large"
								placeholder = "最高价"
							/>
							<i class = "iconfont icon-icon_diamond1"></i>
						</div>
					</div>
					<div class = "store-box-m">
						<div
							class = "upgrade-del-m"
							v-if = "upgradeData.length > 0"
						>
							<skins-item
								class = "cursor"
								:skins-data = "upgradeData"
								:chosed-id = "needToUpgradeToItems.id"
								:is-hover = "true"
								@choseSkins = "expectStuff"
							>
							</skins-item>
						</div>
						<Empty v-else></Empty>
					</div>
					<div class = "page-box">
						<Page
							style = "margin: auto"
							:current = "currPage"
							:total = "currTotal"
							:page-size = "searchForm.size"
							@on-change = "jumpPageFunc"
							v-show = "currTotal > 0"
						/>
					</div>
				</div>
				<div
					class = "screening-box-m"
					v-if = "isUpgradeItem"
				>
					<h2>背包</h2>
					<div class = "screening-type">
						<div
							class = "price-sort-m"
							@click = "sort"
						>
							价格
							<i
								style = "font-size: 13px"
								:class = "{ 'sort-down': bagPage.sort === 2 }"
								class = "iconfont iconicon-arrow"
							></i>
						</div>
					</div>
					<div class = "store-box-m">
						<div
							class = "upgrade-del-m"
							v-if = "bagData.length > 0"
						>
							<skins-item
								class = "cursor"
								:skins-data = "bagData"
								:chosed-id = "needToUpgradeToItems.id"
								@choseSkins = "choseStuff"
							>
							</skins-item>
						</div>
						<Empty
							:box = "true"
							v-else
						></Empty>
					</div>
					<div class = "page-box">
						<Page
							style = "margin: auto"
							:current = "currentBag"
							:total = "currBagTotal"
							:page-size = "bagPage.size"
							@on-change = "jumpBagFunc"
							v-show = "currBagTotal > 0"
						/>
					</div>
				</div>
			</div>
		</div>
		<hash-module
			v-model = "showPlay"
			width = "8.5"
			title = "玩法介绍"
		>
			<div>
				<div class = "fair-price">
					<div
						class = "hash-price-left"
						style = "margin-bottom: 20px"
					>
						<div>
							<div class = "battle-rule">
								<div>
									<div class = "bat-rule">
										<span>1</span>
									</div>
								</div>
								<div>
									<span
									>玩法
										<span class = "important-tips">右边区域
										</span
										>
									 可从网站所有饰品库存中筛选您所期望升级得到的
										<span
											class = "important-tips"
										>目标饰品
										</span
										>
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
									<span
									>玩法
										<span class = "important-tips">左边区域
										</span
										>
									 可从网站背包选择献祭的
										<span
											class = "important-tips"
										></span
										>
									 饰品或者金币
										<span class = "important-tips"></span
										>
									 余额，
										<span class = "important-tips">饰品
										</span
										>
									 和
										<span class = "important-tips">余额
										</span
										>
									 可任选其一或者同时献祭
									</span
									>
								</div>
							</div>
							<div class = "battle-rule">
								<div>
									<div class = "bat-rule">
										<span>3</span>
									</div>
								</div>
								<div>
									<span
									>升级成功率必须大于
										<span
											class = "important-tips"
										>1%
										</span
										>
									</span
									>
								</div>
							</div>
							<div class = "battle-rule">
								<div>
									<div class = "bat-rule">
										<span>4</span>
									</div>
								</div>
								<div>
									<span>
										升级献祭总价值必须
										<span
										>大于等于
											<i
												class = "iconfont icon-icon_diamond1 font-s fdc-color"
											></i
											>
										 1
										</span
										>
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
									<span>
										拖动自定义升级区间滑块，可以
										<span
											class = "important-tips"
										>自由控制
										</span
										>
										您选择的
										<span class = "important-tips">成功率
										</span
										>
										，让其处于整个成功范围的任何位置
									</span
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</hash-module>
		<hash-module
			v-model = "wishShow"
			width = "6"
			title = "升级自选区间"
		>
			<div class = "wish-up">
				<p class = "tips-wish">
					购买升级自选区间功能，即可获赠心愿卡，心愿卡可用于参与福利活动“神龙许愿”。
				</p>
				<div class = "title-wish">升级自选区间功能介绍：</div>
				<img
					src = "./Upgarde.assets/img.png"
					alt = ""
					style = "width: 100%"
				/>
				<p class = "tips-wish">
					概率区间，自由选择。拉动滑块可自定义升级成功范围区间的起始值和结束值。
				</p>
				<div class = "title-wish">如何购买：</div>
				<img
					src = "./Upgarde.assets/img_1.png"
					alt = ""
					style = "width: 100%"
				/>
				<div
					class = "up-right"
					style = "background: none"
				>
					<div
						class = "default-btn upgrade-btn"
						@click = "
							wishShow = false;
							$router.push('/page/wish');
						"
					>
						前往购买
					</div>
				</div>
			</div>
		</hash-module>
		<upgrade-result
			ref = "resultPup"
			:isPhone = "resultPup.isPhone"
			:result = "resultPup.result"
		></upgrade-result>
	</div>
</template>

<script>
import {
	getAction ,
	postAction,
} from "../api/manage";
import Empty from "../components/Empty/Empty";
import {
	mapState ,
	mapActions,
} from "vuex";
import storeSearch from "../utils/storeSearch.json";
import duringTheUpgrade7 from "../assets/audio/duringTheUpgrade7.mp3";
import duringTheUpgrade2 from "../assets/audio/duringTheUpgrade2.mp3";
import updateSuccessed from "../assets/audio/updateSuccessed.wav";
import upgradeUnsuccessful from "../assets/audio/upgradeUnsuccessful.mp3";
import Title from "../components/Title";
import {
	MathFunc ,
	compare,
} from "../utils/utils";
import { url } from "../api/upgradeApi";
import upgradeResult from "../components/Upgrade/upgradeResult/upgradeResult.vue";
import * as rrweb from "rrweb";
import {
	zlibSync ,
	strToU8 ,
	unzlibSync ,
	strFromU8,
} from "fflate";
import {HrTitle} from '@/New.Components'

export default {
	name : "upgrade" ,
	components : {
		Empty ,
		Title ,
		upgradeResult,
		HrTitle,
	} ,
	data () {
		return {
			url ,
			compare ,
			normalEvents : [] , // 录像数据
			overPassEvent : [] , // 更改时间轴数据
			recordRules : [] , // 录像规则
			pageRrwebEvent : "" ,
			recordTimer : null ,
			isPhone : this.$store.state.account.isPhone ,
			orderAllRecord : [] , // 订单号录像数据
			rrwebRecord : null ,
			stopFn : null , // 停止录像
			isRecord : true , // 录像
			resultPup : {
				//结果弹窗
				result : {
					rarity : "" ,
					name1 : "" ,
					name2 : "" ,
					value : 0 ,
					image : "" ,
				} ,
				isPhone : false ,
			} ,
			renewSlider : 0 ,
			showPlay : false ,
			wishShow : false ,
			MathFunc ,
			searchShow : false , // 搜索饰品隐藏框
			isOpenTrans : false ,
			isUpgrade : true , // 升级中 或者 未充值数据 不可点
			storeSearch ,
			result : {
				result : true ,
			} ,
			isMusic : true ,
			loadMall : false ,
			translateCorner : 0 ,
			loopAnimation : null ,
			isAnimation : false ,
			selectArticle : false , // 移动端选物品浮层
			maxSumScale : 0 , // 滑块
			hash : "" ,
			progress : 0 , // 拉取百分比
			limit : {} , // 运营限制条件
			currentBag : 1 ,
			currBagTotal : 0 ,
			currPage : 1 ,
			currTotal : 0 ,
			bagData : [] , // 背包数据
			upgradeData : [] , // 商城数据
			wishTime : null ,
			isUpgradeItem : false ,
			needToUpgradeToItems : {
				value : 0 ,
			} , // 升级物品
			desiredItem : {
				value : 0 ,
			} , // 期望物品
			markup : 0 ,
			limiting : null ,
			lastPage : null ,
			bagPage : {
				game : 730 ,
				current : 1 ,
				size : 12 ,
				sort : 2 ,
			} ,
			searchForm : {
				game : 730 ,
				current : 1 ,
				size : 12 ,
				sort : 2 ,
				name : "" ,
				rarity : "" ,
				exterior : "" ,
				endPrice : null ,
				startPrice : null ,
				levelName : "" ,
			} ,
		};
	} ,
	created () {
		this.getMyBag(this.bagPage);
		this.getUpgrade(this.searchForm);
		this.getConfig();
		this.isOpenCorner();
		if ( this.$store.state.account.videoState === 0 ) {
			this.showPlay = true;
			this.$store.commit("account/setVideo" , 1);
		}
		let _this = this;
		window.onresize = function () {
			_this.renewSlider ++;
		};
	} ,
	mounted () {
		this.startOrder();
		// 监听视频播放
	} ,
	beforeRouteLeave (to , form , next) {
		if ( !this.stopFn ) return next();
		this.stopFn();
		this.normalEvents = [];
		this.overPassEvent = [];
		this.stopRecord();
		next();
	} ,
	watch : {
		showPlay (nv) {
			if ( !nv ) this.$refs.videoPlay.pause();
		} ,
		maxSumScale () {
			this.markup = MathFunc.Mul(this.maxSumScale , this.maxWorth / 10000 , 2);
		} ,
		videoState (nv) {
			if ( nv === 0 ) this.showPlay = true;
			this.$store.commit("account/setVideo" , 1);
		} ,
		user : {
			handler (nv , ov) {
				if ( nv.id && !ov.id ) {
					this.startOrder();
				}
				this.getMyBag(this.bagPage);
				this.needToUpgradeToItems = { value : 0 };
			} ,
			deep : true ,
		} ,
		isRecord (nv) {
			!nv ? this.stopRecord() : this.startOrder();
		} ,
		searchForm : {
			handler (nv , ov) {
				clearTimeout(this.limiting);
				this.limiting = setTimeout(() => {
					if ( nv.current === this.lastPage ) {
						this.searchForm.current = 1;
					}
					this.getUpgrade(this.searchForm);
				} , 500);
				this.maxSumScale = 0;
			} ,
			deep : true ,
		} ,
	} ,
	methods : {
		...mapActions("account" , ["getUser"]) ,
		startRecord () {
			if ( !this.isRecord ) return;
			let that = this;
			this.normalEvents = [];
			this.overPassEvent = [];
			let option = {
				emit (event , isCheckout) {
					// if (event.type === 2) event = that.handleRrwebEventnCss(event)
					console.log(event);
					that.recordRules.sleepTime = 60000 * 3;
					that.overPassEvent.push(JSON.parse(JSON.stringify(event)));
					let deferTime;
					if ( that.overPassEvent.length > 1 ) {
						// 常规轴
						let overPassEvent = that.overPassEvent[that.overPassEvent.length - 2];
						// 正常时间差
						deferTime = event.timestamp - overPassEvent.timestamp;
						if ( deferTime > 10000 ) {
							deferTime = 5000;
						}
						event.timestamp = that.normalEvents[that.normalEvents.length - 1].timestamp + deferTime;
					}
					that.normalEvents.push(event);
				} ,
				blockClass : "hide-rrweb" ,
				slimDOMOptions : {
					script : true ,
					comment : true ,
					headWhitespace : true ,
					headMetaDescKeywords : true ,
					headMetaSocial : true ,
					headMetaRobots : true ,
					headMetaHttpEquiv : true ,
					headMetaAuthorship : true ,
					headMetaVerification : true ,
				} ,
				sampling : {
					mousemove : false ,
					scroll : 1000 ,
					media : 1500 ,
				} ,
				maskInputOptions : { password : true } ,
			};
			this.stopFn = rrweb.record(option);
			this.errorStopRecord();
			this.$Message.success("已开启录制");
		} ,
		handleRrwebEventnCss (event) {
			//  抽取rrweb中录取的 全局css文件,减少文件体积
			let data = event.data.node.childNodes[1].childNodes[0].childNodes.filter((item) => item.tagName === "style" );
			console.log(data);
			// 根据初始化type为2的数据中 找到对应css所对应的id,并赋值为空;
			let id = [
				22 ,
				32 ,
				40 ,
				52 ,
				54 ,
				56 ,
				58 ,
				60,
			];
			// index.html 的body后的数据和标签, 没有影响回放,赋值为空;
			event.data.node.childNodes[1].childNodes[2].childNodes = [];
			for ( let i = 0 ; i < id.length ; i ++ ) {
				data.find((item) => item.id === id[i]).childNodes[0].textContent = "";
			}
			console.log(event);
			return event;
		} ,
		compressEventData (data) {
			// 将字符串转成Uint8Array
			const buffer = strToU8(JSON.stringify(data));
			// 以最大的压缩级别进行压缩，返回的zipped也是一个Uint8Array
			const zipped = zlibSync(buffer , { level : 9 });
			// 将Uint8Array重新转换成二进制字符串
			const binary = strFromU8(zipped , true);
			// 将二进制字符串编码为Base64编码字符串
			return btoa(binary);
		} ,
		errorStopRecord () {
			this.recordRules.sleepTime = 60000 * 3;
			this.recordTimer = setInterval(() => {
				this.recordRules.sleepTime -= 1000;
				if ( this.recordRules.sleepTime === 0 ) {
					clearInterval(this.recordTimer);
					this.stopRecord();
					this.$Message.info("检测到长时间未操作,已结束录制");
				}
			} , 1000);
		} ,
		startOrder () {
			if ( !this.isRecord ) return;
			if ( !this.user.id ) return this.$login();
			postAction(url.startRecord).then((res) => {
				this.startRecord();
				res.data.rule = JSON.parse(res.data.rule);
				res.data.sleepTime = 60000 * 3;
				this.recordRules = res.data;
			});
		} ,
		/**
		 * status 是否满足配置条数 满足时 post中parmas status 状态为0 不结束当前订单
		 * */
		async stopRecord (status = false) {
			this.stopFn();
			clearInterval(this.recordTimer);
			let win ,
				lose;
			// 每到达一次后台配置局数,就判断一次是否有满足条件视频
			if ( this.orderAllRecord.length <= + this.recordRules.rule.num ) {
				win = this.orderAllRecord.filter((item) => item.isWin).sort(compare("difference"));
				lose = this.orderAllRecord.filter((item) => !item.isWin).sort(compare("difference"));
			}
			let totalPrice = 0;
			// 将第一条视频的网页初始化数据插入到后面的视频当中并设置初始化时间
			// if (this.orderAllRecord.length > 1)
			//   for (let i = 1; i < this.orderAllRecord.length; i++) {
			//     this.orderAllRecord[i].video.unshift(this.orderAllRecord[0].video[1]);
			//     this.orderAllRecord[i].video.unshift(this.orderAllRecord[0].video[0]);
			//     this.orderAllRecord[i].video[0].timestamp = this.orderAllRecord[i].video[2].timestamp - 2000;
			//     this.orderAllRecord[i].video[1].timestamp = this.orderAllRecord[i].video[2].timestamp - 1000;
			//   }
			for ( let i = 0 ; i < this.orderAllRecord.length ; i ++ ) {
				totalPrice += + this.orderAllRecord[i].total;
			}
			// 不满足金额 清空录取数据
			let unRule = {
				orderNo : this.recordRules.orderNo ,
				status : 1 ,
				videoSource : "" ,
				upgradeId : "" ,
			};
			if ( totalPrice < this.recordRules.rule.amount ) {
				postAction(url.endRecord , unRule);
				return (this.orderAllRecord = []);
			}
			// 压缩数据
			let parmas = {
				orderNo : this.recordRules.orderNo ,
				status : 0 ,
			};
			if ( win.length > 0 ) {
				let winZip = this.compressEventData(win[win.length - 1].video);
				parmas.upgradeId = win[win.length - 1].id;
				parmas.videoSource = JSON.stringify(winZip);
				if ( lose.length === 0 ) parmas.status = status ? 0 : 1;
				await postAction(url.endRecord , parmas);
			}
			if ( lose.length > 0 ) {
				let loseZip = this.compressEventData(lose[lose.length - 1].video);
				parmas.upgradeId = lose[lose.length - 1].id;
				parmas.videoSource = JSON.stringify(loseZip);
				parmas.status = status ? 0 : 1;
				postAction(url.endRecord , parmas);
			}
			this.orderAllRecord = [];
		} ,
		
		isOpenCorner () {
			if ( !this.user.id ) return;
			getAction(url.isOpen).then((res) => {
				this.isOpenTrans = Boolean(res.data);
			});
		} ,
		resetData () {
			if ( this.isUpgrade ) return;
			this.needToUpgradeToItems = { value : 0 };
			this.maxSumScale = 0;
		} ,
		choseItem (type) {
			this.isUpgradeItem = type === "upgrade" ? true : false;
			this.selectArticle = true;
		} ,
		resetDesir () {
			if ( !this.isUpgrade ) return;
			this.desiredItem = { value : 0 };
		} ,
		choseStuff (bagUpgrade) {
			if ( !this.isUpgrade ) return;
			this.needToUpgradeToItems = bagUpgrade;
			this.needToUpgradeToItems.value = bagUpgrade.price;
			this.maxSumScale = 0;
			this.selectArticle = false;
		} ,
		expectStuff (stuff) {
			if ( stuff.isStock === 1 ) {
				this.$Message.error("这玩意儿没货,憋点了");
				return;
			}
			if ( !this.isUpgrade ) return;
			this.time = 0;
			this.desiredItem = stuff;
			this.desiredItem.value = stuff.salePrice;
			this.selectArticle = false;
			this.maxSumScale = 0;
		} ,
		getConfig () {
			postAction(url.config).then((res) => {
				this.limit = res.data;
			});
		} ,
		searchFunc (e , sort) {
			if ( sort ) {
				this.searchForm.sort = this.searchForm.sort === 2 ? 1 : 2;
				this.searchForm.current = 1; //都从第一页开始查询
				this.getUpgrade(this.searchForm);
			} else {
				this.searchForm.current = 1; //都从第一页开始查询
				this.getUpgrade(this.searchForm);
			}
		} ,
		async getMyBag (page) {
			if ( localStorage.getItem("token") ) {
				let params = { type : 2 , ...page };
				getAction(url.pack , params).then((res) => {
					this.bagData = this.handleData(res.data.records , this.bagPage.game );
					this.currentBag = res.data.current;
					this.currBagTotal = res.data.total;
				});
				await this.isOpenCorner();
				await this.getCardNum();
			}
		} ,
		async getHash () {
			let res = await getAction(url.preview);
			this.hash = res.data;
		} ,
		async fairGame () {
			if ( this.user.id ) {
				await this.getHash();
			}
			this.$fair(this.hash , true , false);
		} ,
		changeSeed () {
			this.$fair(this.hash , false , true);
		} ,
		upgradeHistory () {
			if ( !this.isUpgrade ) return this.$Message.info("升级过程请勿操作");
			if ( !this.user.id ) {
				return this.$login();
			} else {
				this.$router.push(`/upgrade/userInfo/${ this.user.id }`);
			}
		} ,
		getUpgrade (params) {
			let param = { type : 2 , ...params };
			this.loadMall = true;
			getAction(url.skins , param).then((res) => {
				this.lastPage = params.current;
				this.upgradeData = this.handleData(res.data.records , this.searchForm.game );
				this.currPage = res.data.current;
				this.currTotal = res.data.total;
				this.loadMall = false;
			}).catch((e) => {
				this.loadMall = false;
			});
		} ,
		handleData (data , type) {
			type = type === 730 ? "csgo" : "dota";
			data.map((item) => {
				let splitStr = type === "csgo" ? "|" : " ";
				let name = item.name.split(splitStr);
				item.name1 = name[0];
				item.name2 = name[1];
				item.id = item.id || item.skinsId;
				item.rarity = item.rarity ? item.rarity : item.skinsRarity;
				item.random = this.conversionStyle(item.skinsRarity , item.category);
			});
			return data;
		} ,
		jumpPageFunc (page) {
			this.searchForm.current = page;
			this.currPage = page;
		} ,
		jumpBagFunc (page) {
			this.bagPage.current = page;
			this.currentBag = page;
			this.getMyBag(this.bagPage);
		} ,
		sort () {
			this.bagPage.sort = this.bagPage.sort === 1 ? 2 : 1;
			this.getMyBag(this.bagPage);
		} , // 升级区间时间
		getCardNum () {
			getAction("/api/desire/card").then((res) => {
				this.wishTime = res.data.endTime;
			});
		} ,
		beforeUpgrade () {
			return new Promise((resolve , reject) => {
				if ( !this.user.id ) {
					reject({
						msg : "请先登录" ,
						errCode : 1,
					});
				}
				if ( !this.desiredItem.skinsId ) {
					reject({
						errCode : 5 ,
						msg : "选择您期望得到的物品",
					});
				}
				if ( this.user.balance < this.markup ) {
					reject({
						errCode : 2 ,
						msg : "余额不足",
					});
				} // 余额
				if ( this.probability < this.limit.stockStart ) {
					reject({
						errCode : 3 ,
						msg : `成功率必须大于${ this.limit.stockStart }%` ,
					});
				} // 概率小于等于1%\
				if ( MathFunc.Add(this.needToUpgradeToItems.value , this.markup , 2) < this.limit.leftValueStart ) {
					reject({
						errCode : 4 ,
						msg : `您想要升级的物品和使用的余额总价值必须≥${ this.limit.leftValueStart }` ,
					});
				}
				let hashValue = localStorage.getItem("hashValue");
				resolve(hashValue ? hashValue : localStorage.getItem("userSeed"));
			});
		} ,
		upgrade () {
			this.beforeUpgrade().then(async (clientSeed) => {
				if ( !this.isUpgrade ) {
					return this.$Message.error("升级过程中,请误操作");
				}
				this.isUpgrade = false;
				await this.getHash();
				let params = {
					leftAssetsId : this.needToUpgradeToItems.id === 0 ? null : this.needToUpgradeToItems.id ,
					deviationAmount : this.markup ,
					leftAmount : this.needToUpgradeToItems.value ,
					rightSkinsId : this.desiredItem.skinsId ,
					rightStuffPrice : this.desiredItem.value ,
					startSection : this.translateCorner / 100 ,
					clientSeed , ...this.hash ,
				};
				if ( this.isRecord ) params.orderNo = this.recordRules.orderNo;
				// 升级结果
				this.upgradeAfter(params);
			}).catch((e) => {
				this.loopAnimation = {};
				if ( e.errCode === 2 ) {
					this.$Modale("余额不足" , "<p>立即充值</b>" , 1);
				} else if ( e.errCode === 1 ) {
					this.$login();
				} else if ( e.errCode === 5 || e.errCode === 4 || e.errCode === 3 ) {
					this.$Message.error(e.msg);
				}
			});
		} ,
		storageSkins (status , id) {
			let leftAmount;
			leftAmount = this.markup;
			if ( this.needToUpgradeToItems.value ) {
				leftAmount = MathFunc.Add(this.needToUpgradeToItems.value , this.markup , 2 );
			}
			let singleRecord = {
				id : id ,
				index : this.orderAllRecord.length ,
				total : leftAmount ,
				difference : MathFunc.Sub(this.desiredItem.value , leftAmount , 2) ,
				video : this.normalEvents ,
				isWin : status ,
			};
			this.orderAllRecord.unshift(singleRecord);
			// 符合长度时候 发送一次视频
			try {
				if ( this.orderAllRecord.length === + this.recordRules.rule.num ) {
					this.stopRecord(true);
				}
			}catch ( e ) {
				console.error(e);
			}
		} ,
		upgradeAfter (parmas) {
			let audio1 = new Audio() ,
				audio2 = new Audio();
			audio1.src = duringTheUpgrade2;
			audio2.src = duringTheUpgrade7;
			if ( this.isMusic ) {
				this.isAnimation ? audio1.play() : audio2.play();
			}
			let startTime = new Date().getTime();
			postAction("/api/upgrade/upgrade" , parmas).then((res) => {
				this.animationControl(res.data , new Date().getTime() - startTime ).then(() => {
					this.getUser();
					audio1.pause();
					audio2.pause();
					this.result = res.data;
					let audio = new Audio();
					// 额外掉落
					if ( this.$socketData["drop"] ) {
						this.$drop(this.$socketData["drop"].boxSkinsList);
						this.$socketData["drop"] = undefined;
					}
					if ( res.data.result ) {
						audio.src = updateSuccessed;
						audio.play();
						this.$refs.resultPup.show = true;
						this.resultPup = {
							result : this.desiredItem ,
							isPhone : this.$store.state.account.isPhone ,
						};
						this.isUpgrade = true;
						// 弹窗动画录完停止
						this.storageSkins(true , res.data.id);
						setTimeout(() => {
							this.stopFn();
						} , 1000);
						this.resetUpgradeUi();
					} else {
						audio.src = upgradeUnsuccessful;
						audio.play();
						this.storageSkins(false , res.data.id);
						setTimeout(() => {
							this.stopFn();
							this.result.result = true;
							this.isUpgrade = true;
							this.startRecord();
							this.resetUpgradeUi();
						} , 3000);
					}
				});
			}).catch((e) => {
				this.resetUpgradeUi();
				this.$Message.error(e.response.data.errMsg);
			});
		} ,
		resetUpgradeUi () {
			this.resetData();
			this.resetDesir();
			this.getMyBag(this.bagPage);
			this.getUpgrade(this.searchForm);
			this.translateCorner = 0;
			this.isUpgrade = true;
			this.loopAnimation = {};
		} ,
		animationControl (result , time) {
			return new Promise((resolve) => {
				this.setPointerPosition(time , JSON.parse(result.upgradeResult).number ).then(() => {
					if ( this.isMusic ) {
						if ( result.result ) {
							let audio = new Audio();
							audio.src = updateSuccessed;
							audio.play();
						} else {
							let audio = new Audio();
							audio.src = upgradeUnsuccessful;
							audio.play();
						}
					}
					if ( !result.result ) {
						setTimeout(() => {
							this.resetData();
							this.resetDesir();
						} , 2000);
					}
					resolve("动画完成");
				});
			});
		} ,
		setPointerPosition (time , value) {
			const timeValue = !this.isAnimation ? 7 : 0;
			return new Promise((resolve) => {
				this.loopAnimation = {};
				setTimeout(() => {
					this.loopAnimation = {
						transition : `transform ${ timeValue == 0 ? (value > 0.5 ? 1.5 : 1) : timeValue }s cubic-bezier(.29,.71,.18,1)` ,
						transform : `rotate(${ 360 * timeValue + value * 360 }deg)` ,
					};
				});
				setTimeout(() => {
					resolve();
				} , ((timeValue == 0 ? (value > 0.5 ? 1.5 : 1) : timeValue) + 0.5) * 1000 );
			});
		} ,
	} ,
	computed : {
		...mapState("account" , [
			"user" ,
			"videoState",
		]) ,
		probability () {
			let fee = + this.limit.drawProportion;
			let minFee = this.limit.minimumPumpingRatio;
			let upgradeTotal = MathFunc.Add(this.needToUpgradeToItems.value , this.markup , 2 );
			let value = 0;
			if ( upgradeTotal / this.desiredItem.value < minFee / fee ) {
				value = upgradeTotal / this.desiredItem.value - minFee < 0 ? 0 : ((upgradeTotal / this.desiredItem.value - minFee) * 100).toFixed(2);
			} else {
				value = ((upgradeTotal / this.desiredItem.value) * (1 - fee) * 100).toFixed(2);
			}
			const flex = 0;
			if ( this.desiredItem.value === 0 || value === NaN ) {
				return flex.toFixed(2);
			}
			return value >= 100 ? 100 : value;
		} , // 最大可以金额
		maxWorth () {
			let fee = + this.limit.drawProportion;
			let value = (1 / (1 - fee)) * this.desiredItem.value - this.needToUpgradeToItems.value;
			return value <= this.user.balance ? value : this.user.balance;
		} ,
		newCorner () {
			let start = this.translateCorner == 100 ? 0 : this.translateCorner;
			let common = MathFunc.Add(this.probability , this.translateCorner , 2);
			let end = common > 100 ? (common - 100).toFixed(2) : common;
			return start + "% -" + end;
		} ,
	} ,
};
</script>

<style scoped>


@keyframes loading {
	/*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
	0% {
		/*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
.progress-circle{
	transform-origin: 50% 49.1%;
	//animation: loading 0.00001s linear infinite;
}


/deep/ .ivu-select-selected-value {
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: #141727;
	box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
}

/deep/ .corner .ivu-slider-bar {
	background: none;
}

.line-bg {
	position: relative;
}

.line-bg > div:nth-of-type(1) {
	position: absolute;
	left: -20%;
	top: 30%;
}

.line-bg > div:nth-of-type(3) {
	position: absolute;
	right: -20%;
	top: 30%;
}

/deep/ .ivu-select-selection {
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: #141727;
}

/deep/ .ivu-input-group-append {
	border: 0px solid #030000;
	box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.25);
	color: #ffffff;
}

/deep/ .ivu-input-number-input {
	border: 0px solid #030000;
	border-radius: 3px;
}

/deep/ .ivu-select-dropdown {
	background: #141727;
	box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
}

/deep/ .ivu-input-number-handler-wrap {
	display: none;
}

/deep/ .ivu-slider-button-wrap {
	top: -7px;
}

/deep/ .ivu-select-placeholder {
	color: #fffffe;
}

/deep/ .ivu-tooltip-rel {
	width: 18px;
	height: 18px;
	background: #141727;
	border: 2px solid #fcc601;
	border-radius: 50%;
	transition: all 0.2s linear;
	position: relative;
	outline: none;
}

/deep/ .ivu-slider-bar {
	height: 6px;
	background: #fcc601;
}

/deep/ .ivu-slider-button {
	width: 5px;
	height: 5px;
	border: none;
	background: #fcc601;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
