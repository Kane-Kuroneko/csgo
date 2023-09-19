<template>
  <div>
    <div class="my-bag-tips">
      <div class="bag-label">
        <div :class="{'active':openType === 'bag'}" @click="openTypeFunc('bag')">我的背包</div>
        <div :class="{'active':openType === 'history'}" @click="openTypeFunc('history')">开箱记录</div>
        <div :class="{'active':openType === 'skins'}" @click="openTypeFunc('skins')">购买记录</div>
        <div :class="{'active':openType === 'replace'}" @click="openTypeFunc('replace')">汰换记录</div>
        <div :class="{'active':openType === 'record'}" @click="openTypeFunc('record')">商城兑换记录</div>
        <div :class="{'active':openType === 'rollRecord'}" @click="openTypeFunc('rollRecord')">ROLL获奖记录</div>
        <div :class="{'active':openType === 'retrieve'}" @click="openTypeFunc('retrieve')">取回记录</div>
        <div :class="{'active':openType === 'drop'}" @click="openTypeFunc('drop')">掉落记录</div>
        <div :class="{'active':openType === 'buyBack'}" @click="openTypeFunc('buyBack')">回购记录</div>
      </div>
    </div>
    <img src="../assets/image/split.png" style="width: 100%;">
    <!--        我的背包-->
    <transition v-if="openType === 'bag'">
      <div class="bag-des">
        <!--            全部出售-->
        <div class="bag-tips">
          <p @click="bagTips = true" class="hide-p hide-ipad"><i class="iconfont icon-icon-help"></i> 取回规则</p>
          <div class="hide-m">
            <p>
              在“拼命发货中”状态下，若您在 <span>60分钟</span> 内没有在steam收到报价，请重新取回。 若超过<span>12小时</span>没有收到报价，订单将会取消，请重新取回。
            </p>
            <p>
              在“已发送报价”状态下，请您尽快前往steam接受报价，如果错过时间，您可以重新取回。
            </p>
            <p>
              如遇暂时缺货的情况，请您稍后再尝试取回，或者您也可以将饰品升级或汰换。超出<span>3天</span>未取回，则会被系统按<span>8.8折</span>回收。
            </p>
            <p>由于合作平台方的惩罚机制，当你第 <span>2</span> 次拒绝报价后，我们会锁定该物品，并且该物品只允许 <span>8.8</span> 折强制回购或第<span> 2 </span>天<span> 2 </span>点系统会自动回购!!!
            </p>
            <p>两件物品即可汰换，一经汰换，无法还原</p>

          </div>
          <HashModule title="取回规则" v-model="bagTips">
            <div class="how-tips">
              <div class="battle-rule">
                <div>
                  <div class="bat-rule">
                    <span>1</span>
                  </div>
                </div>
                <div>
                  <p> 在“拼命发货中”状态下，若您在 <span>60分钟</span> 内没有在steam收到报价，请重新取回。 若超过<span>12小时</span>没有收到报价，订单将会取消，请重新取回</p>
                </div>
              </div>
              <div class="battle-rule">
                <div>
                  <div class="bat-rule">
                    <span>2</span>
                  </div>
                </div>
                <div>
                  <p>
                    在“已发送报价”状态下，请您尽快前往steam接受报价，如果错过时间，您可以重新取回。
                  </p>
                </div>
              </div>
              <div class="battle-rule">
                <div>
                  <div class="bat-rule">
                    <span>3</span>
                  </div>
                </div>
                <div>
                  <p>
                    如遇暂时缺货的情况，请您稍后再尝试取回，或者您也可以将饰品升级或汰换。超出<span>3天</span>未取回，则会被系统按<span>8.8折</span>回收。
                  </p>
                </div>
              </div>
              <div class="battle-rule">
                <div>
                  <div class="bat-rule">
                    <span>4</span>
                  </div>
                </div>
                <div>
                  <p>由于合作平台方的惩罚机制，当你第 2 次拒绝报价后，我们会锁定该物品，并且该物品只允许 <span>8.8</span> 折强制回购或第<span>2</span>天<span>2</span>点系统会自动回购</p>
                  <p>两件物品即可汰换，一经汰换，无法还原</p>
                </div>
              </div>
            </div>
          </HashModule>
          <!--          <p style="font-size: 14px;color: #BB1D1D">因steam波动导致无法取回，为了避免您的取回因此被卡住，我们暂时关闭取回按钮，网络稳定后，我们会第一时间恢复取回功能</p>-->
        </div>
        <!--            背包物品-->
        <div class="bag-goods-box">
          <div class="item-drop">
            <div class="bag-goods" v-if="bagData.length > 0">
              <template v-for="el in bagData">
                <div class="bag-good-item"
                     :key="el.id"
                     :class="{'disable-pointer': el.disable}"
                     @click="chooseArtical(el)">
                  <img v-if="el.levelName" :src="require(`../assets/image/stone${el.levelName}.png`)" alt=""
                       class="stone-img" style="width: 40%">
                  <!--                               物品图片-->
                  <div align="center" class="my-goods-img"
                       :class="'drop-qua-' + conversionStyle(el.skinsRarity,el.category)"
                  >
                    <p class="good-price" style="text-align: left"><span> <i
                        class="iconfont icon-icon_diamond1"></i></span> {{ el.price }}
                    </p>
                    <div class="retrieve-state-bg"
                         v-if="el.status !== 0 "
                         :class="'retrieve-state-' + el.retrieve"
                    >
                    </div>
                    <div v-if="el.status !== 0 || getTimeCountDown(el.createDate, triggerTime,el.status) !== ''"
                         class="retrieve-state-status"
                         :class="'retrieve-state-' + el.retrieve">
                      {{ el.state }}
                      {{ getTimeCountDown(el.createDate, triggerTime, el.status) }}
                    </div>
                    <div class="float-tips" v-show="el.state && el.state.length > 7">
                      {{ el.state }}
                    </div>
                    <img :src="el.image" alt="skins">
                  </div>
                  <!--                            物品名称-->
                  <div class="store-goods ">
                    <p> {{ el.name1 }} </p>
                    <p>{{ el.name2 ? el.name2 : ' ' }}</p>
                  </div>
                  <!--                            取回按钮-->
                  <div class="sell-or-retrieve" v-if="el.status !== 1 && el.status !== 2">
                    <div @click.stop="retrieve(el)" class="item-sell-btn com-btn"
                         v-if="el.status === 0">取回
                    </div>
                    <div class="item-sell-btn com-btn" @click.stop="retrieve(el)"
                         v-else-if="!el.disable">再次取回
                    </div>
                    <div @click.stop="sell(el.id)" class="default-btn item-retrieve-btn com-btn"
                         v-show="!el.disable"
                         :class="{'retrieve-err':el.status == 8}">汰换
                    </div>
                  </div>
                  <div class="sell-or-retrieve cursor" v-else-if="el.status === 2">
                    <div @click.stop="goSteam" class="go-steam">前往Steam接受报价</div>
                  </div>
                  <div class="send-tips" v-else-if="el.status === 1">
                    <p>系统将在一小时内发货</p>
                  </div>
                </div>
              </template>
            </div>
            <Empty v-else></Empty>
          </div>
        </div>
        <!--            翻页器-->
        <div class="page-box ">
          <Page class="mar-auto" :current="currPage" :total="currTotal" :page-size="searchForm.size"
                @on-change="jumpPageFunc" v-show="currTotal>0"/>
        </div>
        <div class="bag-all-chose hide-m" v-if="bagData.length > 0">
          <div style="display: flex;align-items: center">
            <!--            <div class="all-chosed" @click="chooseAll">-->
            <!--              <i class="iconfont iconicon-select" v-show="allChosed"></i>-->
            <!--            </div>-->
            <!--            <span class="chose-lable" @click="chooseAll" style="font-weight: bold">本页全选</span>-->
          </div>

        </div>
      </div>
    </transition>
    <!--        开箱历史-->
    <transition v-else-if="openType === 'history'">
      <div class="record-history">
        <div class="record-goods" :class="{'record-goods-m': $store.state.account.isPhone}">
          <template v-if="boxData.length > 0">
            <div class="table-title hide-m">
              <div class="tab-title">兑换物品</div>
              <div class="tab-title">箱子名称</div>
              <div class="tab-title">日期</div>
              <div class="tab-title">状态</div>
            </div>
            <div class="rec-goods-item animation-move" v-for="el in boxData" :key="el.id">
              <Row type="flex" align="middle" class="hide-m">
                <ColC span='12'>
                  <div style="display: flex;align-items: center">
                    <div class="boxhis-article-img">
                      <img :src="el.stuffImage" alt="skins" width="50%">
                    </div>
                    <p class="over-flow-hide recorde-name"
                       :class="'border-left-'+ conversionStyle(el.skinsRarity,el.category)">
                      {{ el.stuffName.split('|')[0] }}+{{ el.stuffName.split('|')[1] }} </p>
                  </div>
                </ColC>
                <ColC span="3">
                  <p class="bag-price">{{ el.boxName }}</p>
                </ColC>
                <ColC span="6">
                  <p style="font-size: .20rem;opacity: .5">{{ el.createdTime }}</p>
                </ColC>
                <ColC span="3">
                  <p class="skew-box-color" :class="'store-state-' + el.status">
                    <span>{{ el.state }}</span></p>
                </ColC>
              </Row>
              <Row type="flex" align="middle" class="hide-ipad hide-p"
                   style="margin-bottom: 30px">
                <ColC span="7">
                  <div align="center" class="boxhis-article-img">
                    <img :src="el.stuffImage" alt="skins">
                  </div>
                </ColC>
                <ColC span="17">
                  <p class="over-flow-hide recorde-name-m"
                     :class="'border-left-'+ conversionStyle(el.skinsRarity,el.category)">
                    {{ el.stuffName }}
                  </p>
                  <div style="display: flex;justify-content: space-between">
                    <p class="bag-price" style="color: #FFFFFF;">箱子: {{ el.boxName }}</p>
                    <p class="skew-box-color" :class="'store-state-' + el.status"
                       style="margin:0 .1rem; width: 35%; line-height: .4rem;">
                                    <span>
                                     {{ el.state }}
                                     </span>
                    </p></div>
                  <p style="font-size: .2rem;margin-top: .1rem;opacity: .5">{{ el.createdTime }}</p>
                </ColC>
              </Row>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
        <div class="page-box">
          <Page class="mar-auto" :current="boxCurrent" :total="boxTotal" :page-size="10"
                @on-change="jumpBoxFunc" v-show="boxTotal>0"/>
        </div>
      </div>
    </transition>
    <!--        商城记录-->
    <transition v-else-if="openType === 'record'">

      <div class="record-history">
        <div class="screening" style="margin-bottom: 20px">
          <div class="default-btn type-btn" :class="{'active': kind === 0}" @click="kind = 0">CSGO</div>
          <div v-if="false" class="default-btn type-btn" :class="{'active': kind === 1}" @click="kind = 1">CSOL</div>
        </div>
        <div class="record-goods" :class="{'record-goods-m': $store.state.account.isPhone}">
          <div class="table-title hide-m">
            <div class="tab-title">兑换物品</div>
            <div class="tab-title">价格</div>
            <div class="tab-title">日期</div>
            <div class="tab-title">状态</div>
          </div>
          <template v-if="boxData.length > 0">
            <div class="rec-goods-item" v-for="el in boxData" :key="el.id">
              <Row type="flex" align="middle" class="hide-m">
                <ColC span='12'>
                  <div style="display: flex;align-items: center">
                    <div class="boxhis-article-img">
                      <img :src="el.image" alt="skins" width="50%">
                    </div>
                    <p class="over-flow-hide recorde-name"
                       :class="'border-left-'+ conversionStyle(el.rarity,el.category)">
                      {{ el.name.split('|')[0] }}+{{ el.name.split('|')[1] }} </p>
                  </div>

                </ColC>
                <ColC span="3">
                  <p class="bag-price"><i class="iconfont icon-icon_diamond1"></i>
                    <span class="font-bold">{{ el.price }}</span>
                  </p>
                </ColC>
                <ColC span="6">
                  <p style="font-size: .20rem">{{ el.createdTime }}</p>
                </ColC>
                <ColC span="3">
                  <p class="skew-box-color" :class="'store-state-' + el.status">
                    <span>{{ el.state }}</span></p>
                </ColC>
              </Row>
              <Row type="flex" align="middle" class="hide-ipad hide-p"
                   style="margin-bottom: 30px">
                <ColC span="7">
                  <div align="center" class="boxhis-article-img">
                    <img :src="el.image" alt="skins">
                  </div>
                </ColC>
                <ColC span="17">
                  <p class="over-flow-hide recorde-name-m"
                     :class="'border-left-'+ conversionStyle(el.rarity,el.category)">
                    {{ el.name }}
                  </p>
                  <div style="display: flex;justify-content: space-between">
                    <p class="bag-price"><i class="iconfont icon-icon_diamond1"></i> {{ el.price }}</p>
                    <p class="skew-box-color" :class="'store-state-' + el.status"
                       style="margin:0 .1rem; width: 35%; line-height: .4rem;">
                                    <span>
                                     {{ el.state }}
                                     </span>
                    </p></div>
                  <p style="font-size: .2rem;margin-top: .1rem;opacity: .5">{{ el.createdTime }}</p>
                </ColC>
              </Row>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
        <div class="page-box ">
          <Page class="mar-auto" :current="boxCurrent" :total="boxTotal" :page-size="10"
                @on-change="jumpBoxFunc" v-show="boxTotal>0"/>
        </div>
      </div>
    </transition>
    <transition v-else-if="openType === 'replace'">

      <div class="record-history">
        <div class="record-goods" :class="{'record-goods-m': $store.state.account.isPhone}">
          <div class="table-title hide-m">
            <div class="tab-title">合成物品</div>
            <div class="tab-title">材料总价值</div>
            <div class="tab-title">日期</div>
            <div class="tab-title">状态</div>
          </div>
          <template v-if="boxData.length > 0">
            <div class="rec-goods-item" v-for="el in boxData" :key="el.id">
              <Row type="flex" align="middle" class="hide-m">
                <ColC span='12'>
                  <div style="display: flex;align-items: center">
                    <div class="boxhis-article-img">
                      <img :src="el.skinsImg" alt="skins" width="50%">
                    </div>
                    <p class="over-flow-hide recorde-name"
                       :class="'border-left-'+ conversionStyle(el.rarity,el.category)">
                      {{ el.skinsName.split('|')[0] }}+{{ el.skinsName.split('|')[1] }} </p>
                  </div>

                </ColC>
                <ColC span="3">
                  <p class="bag-price"><i class="iconfont icon-icon_diamond1"></i>
                    <span class="font-bold">{{ el.skinsPrice }}</span>
                  </p>
                </ColC>
                <ColC span="6">
                  <p style="font-size: .20rem">{{ format(el.createTime) }}</p>
                </ColC>
                <ColC span="3">
                  <p class="skew-box-color" :class="'store-state-' + el.status">
                    <span>{{ el.state }}</span></p>
                </ColC>
              </Row>
              <Row type="flex" align="middle" class="hide-ipad hide-p"
                   style="margin-bottom: 30px">
                <ColC span="7">
                  <div align="center" class="boxhis-article-img">
                    <img :src="el.skinsImg" alt="skins">
                  </div>
                </ColC>
                <ColC span="17">
                  <p class="over-flow-hide recorde-name-m"
                     :class="'border-left-'+ conversionStyle(el.rarity,el.category)">
                    {{ el.skinsName }}
                  </p>
                  <div style="display: flex;justify-content: space-between">
                    <p class="bag-price"><i class="iconfont icon-icon_diamond1"></i> {{ el.skinsPrice }}</p>
                    <p class="skew-box-color" :class="'store-state-' + el.status"
                       style="margin:0 .1rem; width: 35%; line-height: .4rem;">
                                    <span>
                                     {{ el.state }}
                                     </span>
                    </p></div>
                  <p style="font-size: .2rem;margin-top: .1rem;opacity: .5">{{ format(el.createTime) }}</p>
                </ColC>
              </Row>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
        <div class="page-box ">
          <Page class="mar-auto" :current="boxCurrent" :total="boxTotal" :page-size="10"
                @on-change="jumpBoxFunc" v-show="boxTotal>0"/>
        </div>
      </div>
    </transition>
    <!--        roll获奖-->
    <transition v-else-if="openType === 'rollRecord'">
      <div class="record-history">
        <div class="record-goods" :class="{'record-goods-m': $store.state.account.isPhone}">
          <div class="table-title hide-m">
            <div class="tab-title">获得物品</div>
            <div class="tab-title">房间号</div>
            <div class="tab-title">日期</div>
            <div class="tab-title">状态</div>
          </div>
          <template v-if="boxData.length > 0">
            <div class="rec-goods-item animation-move" v-for="el in boxData" :key="el.roomId">
              <Row type="flex" align="middle" class="hide-ipad hide-p"
                   style="margin-bottom: 30px">
                <ColC span="7">
                  <div align="center" class="boxhis-article-img">
                    <img :src="el.image" alt="skins">
                  </div>
                </ColC>
                <ColC span="17">
                  <p class="over-flow-hide recorde-name-m"
                     :class="'border-left-'+ conversionStyle(el.rarity,el.category)">
                    {{ el.name }}
                  </p>
                  <div style="display: flex;justify-content: space-between">
                    <p class="bag-price" style="color: #FFFFFF;">房间号: {{ el.roomId }}</p>
                    <p class="skew-box-color" :class="'store-state-' + el.status"
                       style="margin:0 .1rem; width: 35%; line-height: .4rem;">
                                    <span>
                                     {{ el.state }}
                                     </span>
                    </p></div>
                  <p style="font-size: .2rem;margin-top: .1rem;opacity: .5">{{ el.rollTime }}</p>
                </ColC>
              </Row>
              <Row type="flex" align="middle" class="hide-m">
                <ColC span='12'>
                  <div style="display: flex;align-items: center">
                    <div class="boxhis-article-img">
                      <img :src="el.image" alt="skins" width="50%">
                    </div>
                    <p class="over-flow-hide recorde-name"
                       :class="'border-left-'+ conversionStyle(el.rarity,el.category)">
                      {{ el.name.split('|')[0] }}+{{ el.name.split('|')[1] }} </p>
                  </div>
                </ColC>
                <ColC span="3">
                  <p class="bag-price" style="color: #FFFFFF">{{ el.roomId }}</p>
                </ColC>
                <ColC span="6">
                  <p class="bag-time">{{ el.rollTime }}</p>
                </ColC>
                <ColC span="3">
                  <p class="skew-box-color" :class="'store-state-' + el.status">
                    <span>{{ el.state }}</span></p>
                </ColC>
              </Row>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
        <div class="page-box ">
          <Page class="mar-auto" :current="boxCurrent" :total="boxTotal" :page-size="10"
                @on-change="jumpBoxFunc" v-show="boxTotal>0"/>
        </div>
      </div>
    </transition>
    <transition v-else-if="openType === 'retrieve'">
      <div class="record-history">
        <div class="record-goods" :class="{'record-goods-m': $store.state.account.isPhone}">
          <div class="table-title hide-m">
            <div class="tab-title">取回物品</div>
            <div class="tab-title">物品来源</div>
            <div class="tab-title">取回时间</div>
            <div class="tab-title">状态</div>
          </div>
          <template v-if="boxData.length > 0">
            <div class="rec-goods-item animation-move" v-for="el in boxData">
                            <span class='good-item-title hide-p hide-ipad'
                                  style="padding-left: 15px">物品来源: {{ el.from }}</span>
              <span class='hide-p hide-ipad' style="padding-left: 15px"></span>
              <Row type="flex" class="hide-m" align="middle">
                <ColC align="center" span="12">
                  <div style="display: flex;align-items: center">
                    <div align="center" class="boxhis-article-img">
                      <img :src="el.image" alt="skins">
                    </div>
                    <p class="over-flow-hide recorde-name">
                      {{ el.name.split('|')[0] + el.name.split('|')[1] }}
                    </p>
                  </div>
                </ColC>
                <ColC span="3">
                  <p>{{ el.from }}</p>
                </ColC>
                <ColC span="6">
                  <p style="font-weight: bold;font-size: .21rem;opacity: .5">{{ el.createDate }}</p>
                </ColC>
                <ColC span="3">
                  <div>
                    <p class="skew-box-color"
                       :class="el.status == 0 ? 'retrieve-state-success' : 'retrieve-state-fail'">
                      <span>{{ el.status == 0 ? '取回成功' : '取回失败' }}</span>
                    </p>
                    <p class="fail-reason">{{ el.state }}</p>
                  </div>

                </ColC>
              </Row>
              <Row type="flex" align="middle" class="hide-p hide-ipad">
                <ColC align="center" span="4">
                  <div align="center" class="boxhis-article-img">
                    <img :src="el.image" alt="skins" style="height: 90%">
                  </div>
                </ColC>
                <ColC span="12" style="padding: 0 .21rem">
                  <p class="over-flow-hide recorde-name">
                    {{ el.name }}
                  </p>
                  <div style="display: flex;">
                    <p class="skew-box-color"
                       :class="el.status == 0 ? 'retrieve-state-success' : 'retrieve-state-fail'">
                      {{ el.status == 0 ? '取回成功' : '取回失败' }}
                    </p>
                    <p class="fail-reason">{{ el.state }}</p>
                  </div>
                </ColC>
                <ColC span="8" style="padding: 0 .21rem">
                  <p class='good-item-title'>取回日期 </p>
                  <p class='good-item-title'>{{ el.createDate }}</p>
                </ColC>
              </Row>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
        <div class="page-box ">
          <Page class="mar-auto" :current="boxCurrent" :total="boxTotal" :page-size="10"
                @on-change="jumpBoxFunc" v-show="boxTotal>0"/>
        </div>
      </div>
    </transition>
    <transition v-else-if="openType === 'drop'">
      <div class="record-history">
        <div class="record-goods" :class="{'record-goods-m': $store.state.account.isPhone}">
          <div class="table-title hide-m">
            <div class="tab-title">获得的物品</div>
            <div class="tab-title">掉落时间</div>
            <div class="tab-title"></div>
            <div class="tab-title">状态</div>
          </div>
          <template v-if="boxData.length > 0">
            <div class="rec-goods-item animation-move" v-for="el in boxData">
              <Row type="flex" class="hide-m" align="middle">
                <ColC align="center" span="9">
                  <div style="display: flex;align-items: center">
                    <div align="center" class="boxhis-article-img">
                      <img :src="el.stuffImage" alt="skins">
                    </div>
                    <p class="over-flow-hide recorde-name">
                      {{ el.stuffName.split('|')[0] + el.stuffName.split('|')[1] }}
                    </p>
                  </div>
                </ColC>
                <ColC span="3">
                  <p>{{ el.from }}</p>
                </ColC>
                <ColC span="8">
                  <p style="font-weight: bold;font-size: .21rem;opacity: .5">{{ el.createdTime }}</p>
                </ColC>
                <ColC span="4">
                  <div>
                    <p class="skew-box-color"
                       :class="el.status == 0 ? 'retrieve-state-success' : 'retrieve-state-fail'">
                      <span></span>
                      <span>{{ el.state }}</span>
                    </p>
                  </div>
                </ColC>
              </Row>
              <Row type="flex" align="middle" class="hide-ipad hide-p"
                   style="margin-bottom: 30px">
                <ColC span="7">
                  <div align="center" class="boxhis-article-img">
                    <img :src="el.stuffImage" alt="skins">
                  </div>
                </ColC>
                <ColC span="11">
                  <p class="over-flow-hide recorde-name-m"
                     :class="'border-left-'+ conversionStyle(el.skinsRarity,el.category)">
                    {{ el.stuffName }}
                  </p>
                  <p style="font-size: .2rem;margin-top: .1rem;opacity: .5">{{ el.createdTime }}</p>
                </ColC>
                <ColC span="6">
                  <div style="display: flex;justify-content: space-between">
                    <p class="skew-box-color" :class="'store-state-' + el.status">
                      <span>{{ el.state }}</span>
                    </p>
                  </div>
                </ColC>
              </Row>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
        <div class="page-box ">
          <Page class="mar-auto" :current="boxCurrent" :total="boxTotal" :page-size="10"
                @on-change="jumpBoxFunc" v-show="boxTotal>0"/>
        </div>
      </div>
    </transition>
    <transition v-else-if="openType === 'buyBack'">
      <div class="record-history">
        <div class="record-goods" :class="{'record-goods-m': $store.state.account.isPhone}">
          <div class="table-title hide-m">
            <div class="tab-title">回购物品</div>
            <div class="tab-title">物品来源</div>
            <div class="tab-title">回购时间</div>
            <div class="tab-title">状态</div>
          </div>
          <template v-if="boxData.length > 0">
            <div class="rec-goods-item animation-move" v-for="el in boxData">
                            <span class='good-item-title hide-p hide-ipad'
                                  style="padding-left: 15px">物品来源: {{ el.from }}</span>
              <span class='hide-p hide-ipad' style="padding-left: 15px"></span>
              <Row type="flex" class="hide-m" align="middle">
                <ColC align="center" span="12">
                  <div style="display: flex;align-items: center">
                    <div align="center" class="boxhis-article-img">
                      <img :src="el.image" alt="skins">
                    </div>
                    <p class="over-flow-hide recorde-name">
                      {{ el.name.split('|')[0] + el.name.split('|')[1] }}
                    </p>
                  </div>
                </ColC>
                <ColC span="3">
                  <p style="font-size: 16px">{{ el.from }}</p>
                </ColC>
                <ColC span="6">
                  <p style="font-weight: bold;font-size: .21rem;opacity: .5">{{ el.createDate }}</p>
                </ColC>
                <ColC span="3">
                  <div>
                    <p class="skew-box-color retrieve-state-fail">
                      <span>{{ el.status === 2 ? '超时出售' : '拒绝报价' }}</span>
                    </p>
                  </div>
                </ColC>
              </Row>
              <Row type="flex" align="middle" class="hide-p hide-ipad">
                <ColC align="center" span="4">
                  <div align="center" class="boxhis-article-img">
                    <img :src="el.image" alt="skins" style="height: 90%">
                  </div>
                </ColC>
                <ColC span="12" style="padding: 0 .21rem">
                  <p class="over-flow-hide recorde-name">
                    {{ el.name }}
                  </p>
                  <div style="display: flex;">
                    <p class="skew-box-color retrieve-state-fail">
                      <span>{{ el.status === 2 ? '超时出售' : '拒绝报价' }}</span>
                    </p>
                  </div>
                </ColC>
                <ColC span="8" style="padding: 0 .21rem">
                  <p class='good-item-title'>回购日期 </p>
                  <p class='good-item-title'>{{ el.createDate }}</p>
                </ColC>
              </Row>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
        <div class="page-box ">
          <Page class="mar-auto" :current="boxCurrent" :total="boxTotal" :page-size="10"
                @on-change="jumpBoxFunc" v-show="boxTotal>0"/>
        </div>
      </div>
    </transition>
    <transition v-else-if="openType === 'skins'">
      <div class="record-history">
        <div class="record-goods" :class="{'record-goods-m': $store.state.account.isPhone}">
          <div style="background: #191D2E;padding: 10px" class="hide-m">
            <Row style="width: 100%" type="flex">
              <ColC span="9">
                <div class="tab-title">购买物品</div>
              </ColC>
              <ColC span="3">
                <div class="tab-title">售价</div>
              </ColC>
              <ColC span="6">
                <div class="tab-title">购买时间</div>
              </ColC>
              <ColC span="3">
                <div class="tab-title">操作</div>
              </ColC>
              <ColC span="3">
                <div class="tab-title">状态</div>
              </ColC>
            </Row>
          </div>
          <template v-if="boxData.length > 0">
            <div class="rec-goods-item animation-move" v-for="el in boxData">
                            <span class='good-item-title hide-p hide-ipad'
                                  style="padding-left: 15px"> {{ el.goodsName }}</span>
              <span class='hide-p hide-ipad' style="padding-left: 15px"></span>
              <Row type="flex" class="hide-m" align="middle">
                <ColC align="center" span="9">
                  <div style="display: flex;align-items: center">
                    <div align="center" class="boxhis-article-img">
                      <img :src="imgHost(el.goodsImg)" alt="skins">
                    </div>
                    <p class="over-flow-hide recorde-name">
                      {{el.goodsName}}
                    </p>
                  </div>
                </ColC>
                <ColC span="3">
                  <p style="font-size: 16px">
                    ${{ el.goodsPrice }}
                  </p>
                </ColC>
                <ColC span="6">
                  <p style="font-weight: bold;font-size: .21rem;opacity: .5">{{format(el.createTime)}}</p>
                </ColC>
                <ColC span="3">
                  <div v-if="el.status ===0" @click.stop="retrieveChaerge(el)" class="retrievebtn">
                    取回
                  </div>
                </ColC>
                <ColC span="3">
                  <div style="display: flex;justify-content: space-between">
                    <p class="skew-box-color" :class="'store-state-' + el.status">
                      <span>{{ el.status===0 ? '待取回' : el.status===1 ? '待发货':'已发货'  }}</span>
                    </p>
                  </div>
                </ColC>
              </Row>
              <Row type="flex" align="middle" class="hide-p hide-ipad">
                <ColC align="center" span="3">
                  <div align="center" class="boxhis-article-img">
                    <img :src="imgHost(el.goodsImg)" alt="skins" style="height: 90%">
                  </div>
                </ColC>
                <ColC span="6" style="padding: 0 .21rem">
                  <div style="display: flex;">
                    <p class="skew-box-color retrieve-state-fail" :class="'store-state-' + el.status">
                      <span>{{ el.status===0 ? '待取回' : el.status===1 ? '待发货':'已发货'  }}</span>
                    </p>
                  </div>
                </ColC>
                <ColC span="4">
                  <p class="status-price" >
                    $ {{ el.goodsPrice }}
                  </p>
                </ColC>
                <ColC span="5">
                  <div v-if="el.status ===0" @click.stop="retrieveChaerge(el)" class="retrievebtn">取回
                  </div>
                </ColC>
                <ColC span="6" style="padding: 0 .21rem">
                  <p class='good-item-title'>购买时间 </p>
                  <p class='good-item-title'>{{ format(el.createTime) }}</p>
                </ColC>
              </Row>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
        <div class="page-box ">
          <Page class="mar-auto" :current="boxCurrent" :total="boxTotal" :page-size="10"
                @on-change="jumpBoxFunc" v-show="boxTotal>0"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {debounce, MathFunc} from '../utils/utils'
  import {getAction, postAction} from "../api/manage";
  import Empty from "./Empty/Empty";
  import {mapState, mapActions} from 'vuex'
  import {handleTimeForm} from "../utils/utils";

  export default {
    name: "myBag",
    components: {Empty},
    data() {
      return {
        handleTimeForm,
        openType: "bag",
        triggerTime: 0,
        allChosed: false,
        isRetrieve: true,
        kind:0,
        bagTips: false,
        isRetrirving: false, // 取回中，
        isSalling: false, // 出售中
        bagData: [],
        currPage: 1,
        currTotal: 0,
        boxData: [],
        boxCurrent: 1,
        boxTotal: 0,
        ariticleId: [],
        totalPrice: 0,
        timer: '',
        searchForm: {
          current: 1,
          size: 20,
          game: 730,
        },
        url: {
          pack: '/api/personal/center/back/pack', // 背包
          box: '/api/personal/center/box',  // 开箱记录
          conversion: '/api/personal/center/conversion',  // 商城兑换
          retrieve: '/api/personal/center/retrieve',  // 取回物品
          roll: '/api/personal/center/roll', // roll获奖
          sale: '/api/personal/center/sale', // 出售物品
          retrieveRecord: '/api/personal/center/retrieve/record',
          drop: '/api/personal/center/drop',
          buyBack: '/api/personal/center/recovery/record',
          buySkins: '/api/personal/center/goods/record',
          record: '/api/displace/record',
          buyRetrieve: '/api/personal/center/retrieve/goods'
        }
      }
    },
    created() {
      this.timer = setInterval(() => {
        this.triggerTime++
      }, 1000)
      this.getMyBag(this.searchForm)
    },
    computed: {
      ...mapState('account', ['user']),
      ...mapState('account', {}),
    },
    beforeDestroy() {
      clearInterval(this.timer)
      // clearInterval(this.$refs.timeCount.timer)
      // clearInterval(this.$refs.timeCountP.timer)
    },
    methods: {
      ...mapActions('account', ['getUser']),
      format(date) {
        //获取年月日，时间
        let dat = new Date(date)
        let year = dat.getFullYear();
        let mon = (dat.getMonth() + 1) < 10 ? "0" + (dat.getMonth() + 1) : dat.getMonth() + 1;
        let data = dat.getDate() < 10 ? "0" + (dat.getDate()) : dat.getDate();
        let hour = dat.getHours() < 10 ? "0" + (dat.getHours()) : dat.getHours();
        let min = dat.getMinutes() < 10 ? "0" + (dat.getMinutes()) : dat.getMinutes();
        let seon = dat.getSeconds() < 10 ? "0" + (dat.getSeconds()) : dat.getSeconds();
        let newDate = year + "-" + mon + "-" + data + " " + hour + ":" + min + ":" + seon;
        return newDate;
      },
      chooseArtical(item) {
        let unSale = [1, 2, 8, 9, 10, 11, 12, 13, 14]
        if (unSale.includes(item.status)) {
          return false
        }
        item.choose = !item.choose
        if (item.choose) {
          this.ariticleId.push(item.id);
          this.totalPrice = MathFunc.Add(this.totalPrice, item.salePrice, 2);
          (this.ariticleId.length === this.bagData.length) && (this.allChosed = true);
        } else {
          this.totalPrice = MathFunc.Sub(this.totalPrice, item.salePrice, 2);
          let idx = this.ariticleId.indexOf(item.id);
          this.ariticleId.splice(idx, 1);
          this.allChosed = false;
        }
      },
      getTimeCountDown(time, trigger, status) {
        const cTime = time * 1000 + 60 * 60 * 1000 - new Date().getTime()
        if (cTime < 0 || status !== 1) return ''
        return `${Math.floor(cTime / (60 * 1000)) % (60)} : ${Math.floor(cTime / 1000 % 60)}`
      },
      chooseAll() {
        this.allChosed = !this.allChosed
        if (this.allChosed) {
          this.ariticleId = [];
          this.totalPrice = 0;
          let sale = [0, 3, 4, 5, 6, 7]
          this.bagData.map((item) => {
            // 可兑换物品不可出售
            if (sale.includes(item.status)) {
              this.totalPrice = MathFunc.Add(this.totalPrice, item.salePrice, 2);
              this.ariticleId.push(item.id);
              item.choose = true;
            }
          })
        } else {
          this.bagData.map((item) => {
            item.choose = false;
          })
          this.totalPrice = 0;
          this.ariticleId = [];
        }
      },
      getMyBag(types) {
        let params = {...types, type: 1}
        getAction(this.url.pack, params).then(res => {
          this.bagData = this.handleData(res.data.records)
          this.currPage = res.data.current
          this.currTotal = res.data.total
        })
      },
      getHistory(url, page) {
        let params = {size: 10, current: page}
        this.boxData = []
        getAction(url, params).then(res => {
          this.boxData = this.handleRecords(res.data.records)
          if (this.openType === 'retrieve' || this.openType === 'buyBack') {
            this.boxData = this.handleData(res.data.records)
          }
          this.boxCurrent = res.data.current
          this.boxTotal = res.data.total
        })
      },
      buyRecord(url, page) {
        let params = {size: 10, current: page}
        this.boxData = []
        getAction(url, params).then(res => {
          this.boxData = this.handleRecords(res.data.records)
          if (this.openType === 'retrieve' || this.openType === 'buyBack') {
            this.boxData = this.handleData(res.data.records)
          }
          this.boxCurrent = res.data.current
          this.boxTotal = res.data.total
        })
      },
      handleData(data, type) {
        type = type === 730 ? 'csgo' : 'dota'
        // 不可出售
        let unSale = [1, 2, 8, 9, 10, 11, 12, 13, 14]
        //  待取回状态
        let retrieve = [1, 10, 11, 12]
        data.map((item) => {
          if (item.name.includes('|') > 0) {
            item.name1 = item.name.split('|')[0];
            item.name2 = item.name.split('|')[1];
          }
          item.random = this.conversionStyle(item.skinsRarity, item.category);
          item.disable = false
          if (unSale.includes(item.status)) {
            item.disable = true
          }
          item.status === 2 ? item.retrieve = 2 : item.retrieve = 3
          if (retrieve.includes(item.status)) {
            item.retrieve = 1
          }
          let from = new Map([
            [0, '商城购买'],
            [1, '开箱'],
            [2, 'roll房获奖'],
            [3, '升级'],
            [4, '对战'],
            [5, '福利开箱'],
            [6, '额外掉落'],
            [7, '许愿活动'],
            [8, '元旦活动'],
            [9, '汰换'],
          ])
          item.from = from.get(item.type)
          const map = new Map([
            [1, '待发货'],
            [2, '已发货'],
            [3, item.errMessage ? item.errMessage : '拒绝报价'],
            [4, '库存无货，可以汰换其他物品'],
            [5, item.errMessage ? item.errMessage : '无卖家发货'],
            [6, '数据异常'],
            [7, '请前往背包汰换或联系客服'],
            [8, '请联系客服'],
            [9, item.errMessage ? item.errMessage : '用户参数错误'],
            [10, '待发货'],
            [11, '待发货'],
            [12, '等待卖家发货'],
            [13, 'steam异常，请联系客服'],
            [14, '用户多次拒收，次日自动回购'],
          ])
          item.state = map.get(item.status)
          item.coolTime = (item.coolingTime || 0) * 1000 - this.currentTime;
        });
        return data;
      },
      handleRecords(data) {
        data.map(el => {
          el.state = this.handleState(el.status);
        })
        return data
      },
      sell() {
        this.$router.push('/page/replaceSkins')
      },
      retrieveChaerge(id) {
        postAction(this.url.buyRetrieve, {ids: id.id}).then(res => {
          this.$Message.success('请耐心等待发货');
          this.getHistory(this.url.buySkins)
        }).catch(e => {
          this.$Message.error(e.response.data.errMsg)
        })
      },
      retrieve(el) {
        let params = {ids: el.id}
        if (!this.user.tradeUrl) {
          this.$Message.error('未绑定交易链接')
          return false;
        }
        if (el.status === 6) {
          this.$result('物品已在取回中', {errMsg: '物品已在取回，请勿重复操作', errCode: 999})
          return false
        }
        postAction(this.url.retrieve, params).then(res => {
          this.isRetrirving = false
          this.getMyBag(this.searchForm)
          this.totalPrice = 0;
          this.ariticleId = [];
          this.allChosed = false;
          this.$Modale('饰品待发货', '<p>系统将在一小时内给您发送报价，请您注意到steam接受报价</p>' +
           '<p>如果您连续拒收该饰品2次，则该饰品会被锁定，将在第二天被系统按8.8折自动回购</p>' +
           '<p>温馨提示：如果您在一小时内未收到报价，可以重新发起取回</p>' +
           '<p>如有问题请联系网站客服。</p>', 0)
          this.bagData.map((item) => {
            item.choose = false;
          })
        }).catch(err => {
          this.isRetrirving = false
          if (err.response.data.errCode === 5508) {
            this.$result('取回维护中', {errMsg: err.response.data.errMsg, errCode: 9999});
          } else if (err.response.data.errCode === 5509) {
            this.$result('账号不允许交易', {errMsg: '交易链接错误或账号有交易限制，请检查交易链接和账号交易限制。', errCode: 9999})
          } else if (err.response.data.errCode === 5512) {
            this.$result('库存未公开', {errMsg: err.response.data.errMsg, errCode: 5512})
          } else if (err.response.data.errCode === 5510 || err.response.data.errCode === 5505) {
            this.$Message.error('交易链接错误');
          } else {
            this.$result('取回失败', {errMsg: err.response.data.errMsg, errCode: 9999});
          }
          this.totalPrice = 0;
          this.ariticleId = [];
          this.allChosed = false;
          this.bagData.map((item) => {
            item.choose = false;
          })
        })
      },
      goSteam() {
        window.open(`https://steamcommunity.com/profiles/${this.user.steamId}/tradeoffers/`)
      },
      jumpPageFunc(page) {
        this.searchForm.current = page
        this.getMyBag(this.searchForm)
        this.totalPrice = 0;
        this.ariticleId = [];
        this.allChosed = false
      },
      openTypeFunc(type, page) {
        switch (type) {
          case 'bag':
            this.getMyBag(this.searchForm)
            break;
          case 'history':
            this.getHistory(this.url.box, page)
            break;
          case 'record':
            this.getHistory(this.url.conversion, page)
            break;
          case 'rollRecord':
            this.getHistory(this.url.roll, page)
            break;
          case 'retrieve':
            this.getHistory(this.url.retrieveRecord, page)
            break;
          case 'drop':
            this.getHistory(this.url.drop, page)
            break;
          case 'buyBack':
            this.getHistory(this.url.buyBack, page)
            break;
          case 'skins':
            this.getHistory(this.url.buySkins, page)
            break;
          case 'replace':
            this.getHistory(this.url.record, page)
            break;
        }
        this.openType = type;
      },
      jumpBoxFunc(page) {
        this.openTypeFunc(this.openType, page)
      },
    }
  }
</script>

<style scoped>
  /deep/ .ivu-checkbox-default{
    font-size: .22rem;
    font-weight: bold;
    color: #0A0A0A;
    line-height: 19px;
  }

  .v-enter{
    opacity: 0;
    transform: scale(.3);
  }

  .v-enter-active{
    transform: scale(1);
    transition: all .5s linear;
  }

  /deep/ .ivu-checkbox-checked .ivu-checkbox-inner{
    border-color: #ABB7C0;
    background-color: #ABB7C0;
  }
</style>
