<template>
  <div class="new-year" v-if="homeData.signIn">
    <div class="step-item" align="center">
      <img src="../../assets/image/newyear/one.png" alt="">
    </div>

    <div class="my-disocunt cursor" v-show="user.id">
      <div class="cell-num">{{ carrot }}</div>
      <div><img class="img-hover" @click="myDiscount = true" v-show="discount.length > 0"
                src="../../assets/image/newyear/mydis.png" alt="" style="width: 140px"></div>
      <img class="img-hover" @click="getRecord" src="../../assets/image/newyear/boxhis.png" alt="" style="width: 140px">
    </div>
    <div class="year-content">
      <div class="origin">
        <div class="assistance">
          <div>
            <p>{{helpNum.count}}</p>
            <p>助力人数</p>
          </div>
          <div>
            <p v-if="helpNum.time">豪华版宝箱解锁时间持续至</p>
            <p v-else>你还未解锁豪华版宝箱</p>
            <p class="flex-jus" v-if="helpNum.time">
              <span>{{handleTimeForm(helpNum.time,'-')}}</span>
              <span>{{new Date(+helpNum.time).getHours()}}:{{checkTime(new Date(+helpNum.time).getMinutes())}}</span>
            </p>
            <p v-else>邀请好友助力即可解锁哦</p>
          </div>
          <div @click="gameRule = true">
            <p><i class="iconfont icon-icon-view"></i></p>
            <p>查看助力规则</p>
          </div>
        </div>
        <div class="invite-frd btn-com cursor" @click="sharePoster">
          <img src="../../assets/image/newyear/posterbtn.png" alt="">
          <span> 邀请好友助力</span>
        </div>
        <div class="slideshow">
          <div class="swiper-container box-swiper" v-if="boxData.common.length>0">
            <swiper class="swiper " :options="option" ref="swiper">
              <swiper-slide v-for="(el,idx) in boxData.common" :key="idx">
                <div class="box-info-css">
                  <img :src="imgHost(el.image)" alt="" width="100%" class="cursor">
                  <p>{{el.price}}</p>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="cell-btn">
          <div class="war-hover" @click="getResultSkins(boxData.common[realIndex].id)">
            <img v-lazy="require('../../assets/image/newyear/nrmbtn.png')" alt="">
          </div>
          <div :class="{'un-lock': !helpNum.time || !user.id}" class="war-hover"
               @click="getResultSkins(boxData.luxurious[realIndex].id)">
            <img v-lazy="require('../../assets/image/newyear/lvbtn.png')" alt="">
          </div>
        </div>
        <div class="info-title" align="center">
          <img src="../../assets/image/newyear/boxtitle.png" alt="">
        </div>
        <div class="skins-info">
          <div class="normal-skins">
            <p style="opacity: 0">placeholder</p>
            <div>
              <div v-for="el in skins.normal" :key="el.img">
                <div class="img-center">
                  <img v-lazy="imgHost(el.img)" alt="">
                </div>
                <div class="cell-skins">
                  <i class="iconfont icon-icon_diamond1" v-show="el.price"></i>
                  <span> {{el.state}}</span>
                </div>
                <div>
                  <p class="over-flow-hide" title="111">{{el.name.split('|')[0]? el.name.split('|')[0] : ''}}</p>
                  <p class="over-flow-hide" title="111">{{el.name.split('|')[1]? el.name.split('|')[1] : ''}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="normal-skins ly-skins">
            <p>开启豪华版宝箱，解锁以下物品掉落权限</p>
            <div>
              <div v-for="el in skins.luxurious" :class="{'un-lock-bg': helpNum.time}" :key="el.img">
                <div class="img-center">
                  <img v-lazy="imgHost(el.img)" alt="">
                  <img v-if="!helpNum.time" src="../../assets/image/newyear/lock.png" alt="">
                </div>
                <div class="cell-skins">
                  <i class="iconfont icon-icon_diamond1" v-show="el.price"></i>
                  <span> {{el.state}}</span>
                </div>
                <div>
                  <p class="over-flow-hide" title="111">{{el.name.split('|')[0]? el.name.split('|')[0] : ''}}</p>
                  <p class="over-flow-hide" title="111">{{el.name.split('|')[1]? el.name.split('|')[1] : ''}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="step-welfare" align="center">
        <div></div>
        <img src="../../assets/image/newyear/two.png" alt="">
        <div class="carrot-num">{{ carrot }}</div>
      </div>
      <div class="task-tips" align="center">
        <img src="../../assets/image/newyear/tasktipsm.png" class="hide-p hide-ipad" alt="">
        <img src="../../assets/image/newyear/tasktips.png" class="hide-m" alt="">
      </div>
      <!--      签到个人中任务-->
      <div class="task-box">
        <div class="task-item">
          <div class="task-sign">
            <div class="task-top ">
              <div class="task-btn-box">
                <div>总共累计:<span> {{ homeData.signIn.num }}</span></div>
                <div @click="signGame(1)">
                  今日签到
                </div>
              </div>
            </div>
            <img src="../../assets/image/newyear/signt.png" alt="">
          </div>
          <div class="task-bot">
            <!--            <div class="text">今日签到将会获得<span> {{ homeData.signIn.signNum }} </span>个钥匙</div>-->
            <!--            <div class="text">连续7天签到第7天将会额外获得-->
            <!--              <span>{{ homeData.signIn.condition[homeData.signIn.condition.length - 1].continuityReward }}</span> 个钥匙-->
            <!--            </div>-->
            <div class="sign-progress">
              <div>
                <div class="progress-item" v-for="el in homeData.signIn.condition" :key="el.activityDate">
                  <div>{{ +el.activityDate.split('-')[1] }}.{{ +el.activityDate.split('-')[2] }}</div>
                  <div align="center">
                    <img src="../../assets/image/newyear/unsign.png" v-show="!el.sign" alt="">
                    <img src="../../assets/image/newyear/signed.png" v-show="el.sign" alt="">
                  </div>
                  <div class="sign-cell" align="center">
                    <img src="../../assets/image/newyear/carrotrank.png" alt="">
                    <span> {{el.reward}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="task-item">
          <div class="task-sign">
            <div class="task-top ">
              <div class="task-btn-box">
                <div>今日累计:<span> {{ homeData.battleWinningStreak.num }}</span></div>
                <div @click="signGame(7)">
                  领取钥匙
                </div>
              </div>
            </div>
            <img src="../../assets/image/newyear/battlet.png" alt="">
          </div>
          <div class="task-bot">
            <div class="text">满足对战连胜局数</div>
            <div class="text" style="color: rgba(255,255,255,.8)">今日进度：{{ homeData.battleWinningStreak.count }}次</div>
            <div class="day-progress">
              <div class="day-item" v-for="el in homeData.battleWinningStreak.condition.taskList"
                   :style="{'width': 100 /  (homeData.battleWinningStreak.condition.taskList.length -1)  +'%'}">
                <div class="carrot">
                  <img src="../../assets/image/newyear/procarrot.png"
                       v-show="homeData.battleWinningStreak.num < +el.carrotNum "
                       alt="">
                  <img src="../../assets/image/newyear/procarrots.png"
                       v-show="homeData.battleWinningStreak.num >= +el.carrotNum "
                       alt="">
                  <span>{{ el.obtain }}</span>
                </div>
                <div class="receive-progress">
                  <div :class="{'active':   homeData.battleWinningStreak.count >= +el.consume }"></div>
                  <div class="porgress-par">
                    <div :style="{'width': el.progress + '%'}"></div>
                  </div>
                </div>
                <div class="progress-times">{{ el.consume }}次</div>
              </div>
            </div>
            <!--            <div class="progress-line">-->
            <!--              <div :style="{'width':  homeData.battle.progress + '%'}"></div>-->
            <!--            </div>-->
          </div>
        </div>
        <div class="task-item">
          <div class="task-sign">
            <div class="task-top ">
              <div class="task-btn-box">
                <div>今日累计: <span>  {{ homeData.upgrade.num }}</span></div>
                <div @click="signGame(3)">
                  领取钥匙
                </div>
              </div>
            </div>
            <img src="../../assets/image/newyear/ugradet.png" alt="" style="width: 14%;">
          </div>

          <div class="task-bot">
            <div class="text">
              满足献祭金额 <span> ≥  <i class="iconfont icon-icon_diamond1"></i> {{ homeData.upgrade.condition.price }}</span>，升级概率
              <span> < {{ homeData.upgrade.condition.successRate * 100 }}%</span>
            </div>
            <div class="text" style="color: rgba(255,255,255,.8)">今日进度：{{ homeData.upgrade.count }}次</div>
            <div class="day-progress">
              <div class="day-item" v-for="el in homeData.upgrade.condition.taskList"
                   :style="{'width': 100 / (homeData.upgrade.condition.taskList.length - 1) +'%'}">
                <div class="carrot">
                  <img src="../../assets/image/newyear/procarrot.png" v-show="homeData.upgrade.num < +el.carrotNum "
                       alt="">
                  <img src="../../assets/image/newyear/procarrots.png" v-show="homeData.upgrade.num >= +el.carrotNum "
                       alt="">
                  <span>{{ el.obtain }}</span>
                </div>
                <div class="receive-progress">
                  <div :class="{'active':   homeData.upgrade.count >= +el.consume }"></div>
                  <div class="porgress-par">
                    <div :style="{'width': el.progress + '%'}"></div>
                  </div>
                </div>
                <div class="progress-times">{{ el.consume }}次</div>
              </div>
            </div>
            <!--            <div class="progress-line">-->
            <!--              <div :style="{'width':  homeData.upgrade.progress + '%'}"></div>-->
            <!--            </div>-->
          </div>
        </div>
        <div class="task-item">
          <div class="task-sign">
            <div class="task-top ">
              <div class="task-btn-box">
                <div>今日累计:<span> {{ homeData.wish.num }}</span></div>
                <div @click="signGame(4)">
                  领取钥匙
                </div>
              </div>
            </div>
            <img src="../../assets/image/newyear/wisht.png" alt="">
          </div>
          <div class="task-bot">
            <div class="text">消耗对应张数的许愿卡将会获得对应数量的钥匙</div>
            <div class="text" style="color: rgba(255,255,255,.8)">今日进度：{{ homeData.wish.count }}张</div>
            <div class="day-progress">
              <div class="day-item" v-for="el in homeData.wish.condition.taskList"
                   :style="{'width': 100 /  (homeData.wish.condition.taskList.length -1)  +'%'}">
                <div class="carrot">
                  <img src="../../assets/image/newyear/procarrot.png" v-show="homeData.wish.num < +el.carrotNum "
                       alt="">
                  <img src="../../assets/image/newyear/procarrots.png" v-show="homeData.wish.num >= +el.carrotNum "
                       alt="">
                  <span>{{ el.obtain }}</span>
                </div>
                <div class="receive-progress">
                  <div :class="{'active':   homeData.wish.count >= +el.consume }"></div>
                  <div class="porgress-par">
                    <div :style="{'width': el.progress + '%'}"></div>
                  </div>
                </div>
                <div class="progress-times">{{ el.consume }}张</div>
              </div>
            </div>
            <!--            <div class="progress-line">-->
            <!--              <div :style="{'width':  homeData.wish.progress + '%'}"></div>-->
            <!--            </div>-->
          </div>
        </div>
        <div class="task-item">
          <div class="task-sign">
            <div class="task-top ">
              <div class="task-btn-box">
                <div>今日累计:<span> {{ homeData.hash.num }}</span></div>
                <div @click="signGame(5)">
                  领取钥匙
                </div>
              </div>
            </div>
            <img src="../../assets/image/newyear/hasht.png" alt="">
          </div>
          <div class="task-bot">
            <div class="text">满足单个箱子实际支付金额 <span> ≥ <i class="iconfont icon-icon_diamond1"></i> {{ homeData.hash.condition.price }}</span>
            </div>
            <div class="text" style="color: rgba(255,255,255,.8)">今日进度：{{ homeData.hash.count }}次</div>
            <div class="day-progress">
              <div class="day-item" v-for="el in homeData.hash.condition.taskList"
                   :style="{'width': 100 /  (homeData.hash.condition.taskList.length -1)  +'%'}">
                <div class="carrot">
                  <img src="../../assets/image/newyear/procarrot.png" v-show="homeData.hash.num < +el.carrotNum "
                       alt="">
                  <img src="../../assets/image/newyear/procarrots.png" v-show="homeData.hash.num >= +el.carrotNum"
                       alt="">
                  <span>{{ el.obtain }}</span>
                </div>
                <div class="receive-progress">
                  <div :class="{'active':   homeData.hash.count >= +el.consume }"></div>
                  <div class="porgress-par">
                    <div :style="{'width': el.progress + '%'}"></div>
                  </div>
                </div>
                <div class="progress-times">{{ el.consume }}次</div>
              </div>
            </div>
            <!--            <div class="progress-line">-->
            <!--              <div :style="{'width': homeData.hash.progress + '%'}">-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
        <div class="task-item">
          <div class="task-sign">
            <div class="task-top ">
              <div class="task-btn-box">
                <div>总共累计:<span>{{ homeData.consumption.num }}</span></div>
                <div @click="signGame(6)">领取钥匙</div>
              </div>
            </div>
            <img src="../../assets/image/newyear/spendt.png" alt="">
          </div>
          <div class="task-bot">
            <div class="text">每消费 <span> <i class="iconfont icon-icon_diamond1"></i> {{ homeData.consumption.condition.taskList[0].consume }}</span>
              获得
              <span>{{ homeData.consumption.condition.taskList[0].obtain }}</span> 个钥匙，周期内无限循环
              当前可领 <span>
               {{
                  Math.floor(homeData.consumption.count / homeData.consumption.condition.taskList[0].consume) * homeData.consumption.condition.taskList[0].obtain - homeData.consumption.num
                }}
              </span> 个钥匙，离下次获得钥匙还差
              <span>
                <i class="iconfont icon-icon_diamond1"></i>  {{(homeData.consumption.condition.taskList[0].consume - (homeData.consumption.count % homeData.consumption.condition.taskList[0].consume)).toFixed(2)
                }}</span>
            </div>
            <div class="text" style="color: rgba(255,255,255,.8)">距离下次领取钥匙的消费金额进度</div>
            <div class="sign-progress">
              <div class="progress-charge">
                <div :style="{'width':
                (((homeData.consumption.count % homeData.consumption.condition.taskList[0].consume) / homeData.consumption.condition.taskList[0].consume)*100).toFixed(2) + '%'
                }"></div>
              </div>
              <div>
                <span><i class="iconfont icon-icon_diamond1"></i>0</span>
                <span><i class="iconfont icon-icon_diamond1"></i>{{ homeData.consumption.condition.taskList[0].consume }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    排行榜-->
    <div class="rank-box">
      <div>
        <div class="step-item" align="center">
          <img src="../../assets/image/newyear/three.png" alt="">
        </div>
        <div class="swich-rank hide-p hide-ipad">
          <div @click="switchRank(0)" align="center" :class="{'active': kind === 0}" style="margin-left: auto"><img
              src="../../assets/image/newyear/torank.png" alt=""></div>
          <div @click="switchRank(1)" align="center" :class="{'active': kind === 1}" style="margin-right: auto"><img
              src="../../assets/image/newyear/totalbtn.png" alt=""></div>
        </div>
        <div class="rank-tap">
          <div class="today-rank" v-show="kind === 0 || !$store.state.account.isPhone">
            <img src="../../assets/image/newyear/today.png" alt="">
            <p>更新时间：{{ new Date().toLocaleDateString() }} {{ new Date().getHours() }}:00</p>
            <img src="../../assets/image/newyear/todaytext.png" alt="">
          </div>
          <div class="total-rank" v-show="kind === 1 || !$store.state.account.isPhone">
            <img src="../../assets/image/newyear/total.png" alt="">
            <p>更新时间：{{ new Date().toLocaleDateString() }}</p>
            <img src="../../assets/image/newyear/totaltext.png" class="hide-m" alt="">
            <img src="../../assets/image/newyear/totaltextm.png" class="hide-p" alt="">
          </div>
        </div>
        <div class="car-btn check-btn" @click="seeYesterday">查看昨日中奖榜单</div>
        <div class="rank-list">
          <div class="today-list" v-show="kind === 0 || !$store.state.account.isPhone">
            <div class="list-titles">
              <ColC span="4"><p>名次</p></ColC>
              <ColC span="8"><p>用户</p></ColC>
              <ColC span="7"><p>钥匙数量</p></ColC>
              <ColC span="5"><p>余额奖励</p></ColC>
            </div>
            <div class="list-box">
              <template v-if="dayRank.data.length > 0">
                <div class="list-detail" v-for="(el,idx) in dayRank.data">
                  <ColC span="4">
                    <div align="center" class="serial-no">
                      <img v-if="idx=== 0" src="../../assets/image/newyear/num1.png" alt="">
                      <img v-if="idx=== 1" src="../../assets/image/newyear/num2.png" alt="">
                      <img v-if="idx=== 2" src="../../assets/image/newyear/num3.png" alt="">
                      <p v-if="idx>2">{{ idx + 1 }}</p>
                    </div>
                  </ColC>
                  <ColC span="8">
                    <div class="rank-user">
                      <div>
                        <img :src="imgHost(el.avatar)" alt="">
                      </div>
                      <div class="over-flow-hide">{{ el.name }}</div>
                    </div>
                  </ColC>
                  <ColC span="8">
                    <div class="last-carrot">
                      <div class="cdk">{{ el.number }}</div>
                    </div>
                  </ColC>
                  <ColC span="4"><p class="cdk">{{ el.money }}</p></ColC>
                </div>
                <div class="eleven-rank">
                  <span>11-30名 </span>的用户将获得 <span>{{
                    dayTap === 'YesterdayRanking' ?
                        dayRank.data[10].money
                        : rankList.todayReward[10].reward
                  }}</span> 张 神龙许愿卡
                </div>
                <div class="eleven-rank">我今日获得了 <span>{{
                    dayRank.number
                  }}</span> 个钥匙，当前排名在 <span>{{
                    dayRank.rank === 0 ? ' 30+' : dayRank.rank
                  }}</span> 名
                </div>
              </template>
              <template v-else>
                <img src="../../assets/image/newyear/emptyto.png" alt="" style="width: 100%">
              </template>
            </div>
          </div>
          <div class="today-list" v-show="kind === 1 || !$store.state.account.isPhone">
            <div class="list-titles">
              <ColC span="4"><p>名次</p></ColC>
              <ColC span="8"><p>用户</p></ColC>
              <ColC span="7"><p>钥匙数量</p></ColC>
              <ColC span="5"><p>余额奖励</p></ColC>
            </div>
            <div class="list-box">
              <template v-if="rankList.TotalRanking.data.length > 0">
                <div class="list-detail" v-for="(el,idx) in rankList.TotalRanking.data">
                  <ColC span="4">
                    <div align="center" class="serial-no">
                      <img v-if="idx=== 0" src="../../assets/image/newyear/num1.png" alt="">
                      <img v-if="idx=== 1" src="../../assets/image/newyear/num2.png" alt="">
                      <img v-if="idx=== 2" src="../../assets/image/newyear/num3.png" alt="">
                      <p v-if="idx>2">{{ idx + 1 }}</p>
                    </div>
                  </ColC>
                  <ColC span="8">
                    <div class="rank-user">
                      <div>
                        <img :src="imgHost(el.avatar)" alt="">
                      </div>
                      <div class="over-flow-hide">{{ el.name }}</div>
                    </div>
                  </ColC>
                  <ColC span="8">
                    <div class="last-carrot">
                      <div class="cdk">{{ el.number }}</div>
                    </div>
                  </ColC>
                  <ColC span="4"><p class="cdk">{{ el.money }}</p></ColC>
                </div>
                <div class="eleven-rank">
                  <span>11-30名 </span>的用户将获得 <span>{{ rankList.totalReward[10].reward }}</span> 张 神龙许愿卡
                </div>
                <div class="eleven-rank">我累计获得了 <span>{{ rankList.TotalRanking.number }}</span> 个钥匙，当前排名在 <span>{{
                    rankList.TotalRanking.rank === 0 ? ' 30+' : rankList.TotalRanking.rank
                  }}</span> 名
                </div>
              </template>
              <template v-else>
                <img src="../../assets/image/newyear/emptyto.png" alt="" style="width: 100%">
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    roll房-->
    <div class="roll-source" v-if="false">
      <div class="step-item" align="center">
        <img src="../../assets/image/newyear/four.png" alt="">
      </div>
      <div class="task-tips" align="center">
        <img src="../../assets/image/newyear/rolltitle.png" class="hide-m" alt="">
        <img src="../../assets/image/newyear/rolltm.png" class="hide-p hide-ipad" alt="">
      </div>

      <div class="roll-det">
        <div>
          <div class="roll-id"><i class="iconfont iconicon-home"></i> {{roll.id}}</div>
          <div class="roll-atr">
            <img :src="imgHost(roll.image)" alt="">
          </div>
          <div class="roll-tle over-flow-hide">{{roll.name}}</div>
          <div class="sks-box">
            <div class="sks-shell">
              <div v-for="el in roll.prizeImg" align="center">
                <img v-lazy="imgHost(el.image)" alt="">
              </div>
            </div>
            <div class="sks-total">
              <div>
                总价值: <i class="iconfont icon-icon_diamond1 font-s"></i> <span> {{roll.totalPrice}}</span>
              </div>
              <div>共<span>{{roll.totalPrize}}</span>件</div>
            </div>
            <div class="roll-tm">{{roll.openTime}} 开奖</div>
          </div>
        </div>
        <div class="go-btn" @click="$router.push(`/page/roll/${roll.id}`)" align="center">
          <img src="../../assets/image/newyear/goroll.png" alt="">
        </div>
      </div>
    </div>
    <YearModule v-model="isHistory">
      <img slot="title" src="../../assets/image/newyear/his.png" alt="">
      <slot slot="content">
        <Scroll :on-reach-bottom="handleReachBottom" class="history-list"
                :height="$store.state.account.isPhone ? 400 : 350" v-show="historyData.length> 0">
          <div style="overflow: auto">
            <div class="his-item hide-m hide-ipad" v-for="item in historyData">
              <ColC span="5">
                <div class="history-img">
                  <img slot="title" :src="imgHost(item.img)" alt="">
                </div>
              </ColC>
              <ColC span="6" style="justify-content: left">
                <div v-if="item.type === 0" class="history-name"
                     :class="'border-left-'+ conversionStyle(item.rarity,item.category)"
                     style="padding-left: 10px">
                  <p>{{ item.name.split('|')[0] ? item.name.split('|')[0] : item.name }}</p>
                  <p>{{ item.name.split('|')[1] ? item.name.split('|')[1] : '' }}</p>
                </div>
                <div v-else class="history-name"
                     style="padding-left: 10px">
                  <p>{{ item.name.split('|')[0] ? item.name.split('|')[0] : item.name }}</p>
                  <p>{{ item.name.split('|')[1] ? item.name.split('|')[1] : '' }}</p>
                </div>
              </ColC>
              <ColC span="5">
                <p class="his-price">
                  <i v-show="item.type === 0" class="iconfont icon-icon_diamond1"></i>
                  <span> {{ item.state }}</span>
                </p>
              </ColC>
              <ColC span="8">
                <div class="history-time">
                  <div>
                    <div style="text-align: center"><i class="iconfont icon-icon-time"></i></div>
                    <p>获得时间</p>
                  </div>
                  <div>
                    <p style="margin-bottom:5px ">
                      {{ item.createTime.split(' ')[0] ? item.createTime.split(' ')[0] : '' }}</p>
                    <p>{{ item.createTime.split(' ')[1] ? item.createTime.split(' ')[1] : '' }}</p>
                  </div>
                </div>
              </ColC>
            </div>
            <div class="his-item hide-p" v-for="item in historyData">
              <ColC span="5">
                <div class="history-img">
                  <img slot="title" :src="imgHost(item.img)" alt="">
                </div>
              </ColC>
              <ColC span="19" style="display: inline-block">
                <div style="display: flex;justify-content: space-between;width: 96%">
                  <div class="history-name border-left-blue" style="padding-left: 10px;margin: 7px 5px">
                    <p>{{ item.name.split('|')[0] ? item.name.split('|')[0] : item.name }}</p>
                    <p style="min-height: 12px">{{ item.name.split('|')[1] ? item.name.split('|')[1] : '' }}</p>
                  </div>
                  <p class="his-price">
                    <i v-show="item.type === 0" class="iconfont icon-icon_diamond1"></i>
                    <span> {{ item.state }}</span>
                  </p>
                </div>
                <div class="history-time">
                  <div style="padding: 0 5px">
                    <div style="text-align: center;display: flex;align-items: center;font-size: 12px">
                      <i class="iconfont icon-icon-time" style="font-size: 18px"></i>
                      获得时间 {{ item.createTime }}
                    </div>
                  </div>
                </div>
              </ColC>
            </div>
          </div>
        </Scroll>
        <div v-show="historyData.length === 0" class="empty-his" style="padding: 5% 0;">
          <div align="center">
            <img slot="title" src="../../assets/image/newyear/emptyhis.png" alt="">
          </div>
          <p>您还没有开箱记录数据</p>
          <p>完成各个任务，自行领取对应钥匙数可用于开箱哦</p>
        </div>
        <div class="invite-frd btn-com cursor war-hover" @click="isHistory=false" style="margin: 30px auto 10px">
          <img src="../../assets/image/newyear/closebtn.png" alt="">
          <span> 关闭弹窗</span>
        </div>
      </slot>
    </YearModule>
    <YearModule :width="600" v-model="isYesterday">
      <img slot="title" src="../../assets/image/newyear/yesrank.png" alt="">
      <slot slot="content">
        <div class="rank-list" style="margin-top: 0">
          <div class="today-list" style="width: 100%;margin: auto">
            <div class="list-titles">
              <ColC span="4"><p>名次</p></ColC>
              <ColC span="8"><p>用户</p></ColC>
              <ColC span="8"><p>钥匙数量</p></ColC>
              <ColC span="4"><p>奖励</p></ColC>
            </div>
            <div class="list-box" style="max-height: 400px;overflow: auto">
              <template v-if="rankList.YesterdayRanking.data.length > 0">
                <div class="list-detail" v-for="(el,idx) in rankList.YesterdayRanking.data">
                  <ColC span="4">
                    <div align="center" class="serial-no">
                      <img v-if="idx=== 0" src="../../assets/image/newyear/num1.png" alt="" style="width: 40px">
                      <img v-if="idx=== 1" src="../../assets/image/newyear/num2.png" alt="" style="width: 40px">
                      <img v-if="idx=== 2" src="../../assets/image/newyear/num3.png" alt="" style="width: 40px">
                      <p v-if="idx>2">{{ idx + 1 }}</p>
                    </div>
                  </ColC>
                  <ColC span="8">
                    <div class="rank-user">
                      <div>
                        <img :src="imgHost(el.avatar)" alt="">
                      </div>
                      <div style="flex: 1" class="over-flow-hide">{{ el.name }}</div>
                    </div>
                  </ColC>
                  <ColC span="8">
                    <div class="last-carrot">
                      <div class="cdk">{{ el.number }}</div>
                    </div>
                  </ColC>
                  <ColC span="4"><p class="cdk">{{ el.money }}</p></ColC>
                </div>
                <div class="eleven-rank" style="background: #1D0D0D;">
                  <span>11-30名 </span>的用户获得 <span>{{
                    dayTap === 'YesterdayRanking' ?
                        dayRank.data[10].money
                        : rankList.todayReward[10].reward
                  }}</span>张 神龙许愿卡
                </div>
                <div class="eleven-rank" style="background: #1D0D0D;">我昨日获得了 <span>{{
                    rankList.YesterdayRanking.number
                  }}</span>个 钥匙，昨日排名 <span>{{
                    rankList.YesterdayRanking.rank === 0 ? ' 30+' : rankList.YesterdayRanking.rank
                  }}</span>名
                </div>
              </template>
              <template v-else>
                <img src="../../assets/image/newyear/emptyto.png" alt="" style="width: 100%">
              </template>
            </div>
          </div>
        </div>
      </slot>
    </YearModule>
    <ResultSkins ref="resultSkins"></ResultSkins>
    <YearModule :width="600" v-model="myDiscount" v-if="myDiscount">
      <img slot="title" src="../../assets/image/newyear/mycount.png" alt="">
      <slot slot="content">
        <h3 style="margin-bottom: 20px">我的权益：</h3>
        <div v-for="(el,idx) in discount" style="margin-bottom: 20px" :key="el.endTime">
          <template v-if="el.endTime">
            <TimeCount :time="el.endTime"
                       :ref="`timeCount${idx}`"
                       :title="`${el.type === 2 ? `回购${(el.discount*10).toFixed(1)}折` : el.type === 3 ? `开箱${(el.discount*10).toFixed(1)}折扣` :  'Number走势'}权益倒计时`">
              <img src="../../assets/image/newyear/dcount.png" v-show="el.type === 2" alt="">
              <img src="../../assets/image/newyear/dcounts.png" v-show="el.type === 3" alt="">
              <img src="../../assets/image/newyear/lines.png" v-show="el.type === 4" alt="">
            </TimeCount>
          </template>
        </div>
      </slot>
    </YearModule>
    <YearModule :width="700" v-model="gameRule">
      <img slot="title" src="../../assets/image/newyear/rule.png" alt="">
      <slot slot="content">
        <div class="play-battle">
          <div style="margin: .1rem auto .3rem" class="battle-rule">
            <div>
              <div class="bat-rule">
                <span>1</span>
              </div>
            </div>
            <div>每成功邀请<span class="it-word">1位</span>好友助力，可获得<span class="it-word">24小时</span>开启豪华箱子权限，最高可累计<span
                class="it-word">15x24小时</span>，具体已邀请的好友数量及权限时间以页面展示为准。
            </div>
          </div>
          <div class="battle-rule">
            <div>
              <div class="bat-rule"><span>2</span></div>
            </div>
            <div>新用户（注册后的一个小时内）拥有一次免费助力资格。</div>
          </div>
          <div class="battle-rule">
            <div>
              <div class="bat-rule">
                <span>3</span>
              </div>
            </div>
            <div>老用户当日充值任意金额即可获得一次助力资格，次日刷新，每日最多拥有一次付费助力资格。</div>
          </div>
          <div class="battle-rule">
            <div>
              <div class="bat-rule">
                <span>4</span>
              </div>
            </div>
            <div>活动周期内，新用户最多可帮同一个好友助力<span class="it-word">2次</span>，老用户最多可帮同一个好友助力<span class="it-word">1</span>次。
            </div>
          </div>
        </div>
      </slot>
    </YearModule>
    <YearModule :width="600" v-model="posterShow">
      <img slot="title" src="../../assets/image/newyear/ivtitle.png" alt="">
      <slot slot="content">
        <div class="p-tips">
          <p>下载保存图片或复制链接分享给好友</p>
          <p>邀请好友助力可以获得豪华版箱子的开启权限哦!</p>
        </div>
        <div>
          <QrcodePoster ref="invite"></QrcodePoster>
        </div>
        <div class="share-link" @click="copyLink">
          <i class="iconfont icon-icon_link"></i>
          <span>点击复制分享链接</span>
        </div>
        <div class="invite-frd btn-com cursor war-hover" @click="$refs.invite.downImg()" style="margin: 10px auto">
          <img src="../../assets/image/newyear/posterbtn.png" alt="">
          <span> 保存分享图片</span>
        </div>
        <div class="share-btn">
        </div>
      </slot>
    </YearModule>
    <YearModule :width="700" v-model="astPup">
      <img slot="title" src="../../assets/image/newyear/asttitle.png" alt="">
      <slot slot="content">
        <div align="center">
          <img src="../../assets/image/newyear/help.png" alt="" style="width: 80%" v-show="helpType === 0">
          <img src="../../assets/image/newyear/fail.png" alt="" style="width: 80%" v-show="helpType === 1">
          <img src="../../assets/image/newyear/success.png" alt="" style="width: 80%"
               v-show="helpType !== 0 && helpType !== 1">
        </div>
        <div class="help-txt" v-show="helpType=== 0">
          帮好友助力一次，他可以享受：1 豪华箱子。2 100%必中饰品ROLL房。
        </div>
        <div class="help-txt" v-show="helpType === 1">
          助力成功，谢谢您的支持！
        </div>
        <div class="help-txt" v-show="helpType !== 0 && helpType !== 1">
          <span v-if="helpType === 874">助力失败，当日充值任意金额，可助力一次。</span>
          <span v-if="helpType === 875">助力失败,您已经助力过此好友了,您只能给同一个用户助力一次。</span>
          <span v-if="helpType === 876">助力失败，您今日已助力过一位好友了，每日仅可助力一次。</span>
          <span v-if="helpType === 878">助力失败,不能为自己助力。</span>
        </div>
        <div class="invite-frd btn-com cursor war-hover" v-if="helpType === 0" @click="helpFriend"
             style="margin: 10px auto">
          <img src="../../assets/image/newyear/helpbtn.png" alt="">
          <span> 帮TA助力</span>
        </div>
        <div class="invite-frd btn-com cursor war-hover" @click="astPup=false" style="margin: 10px auto"
             v-if="helpType !== 0 && helpType !== 874">
          <img src="../../assets/image/newyear/closebtn.png" alt="">
          <span> 关闭弹窗</span>
        </div>
        <div class="invite-frd btn-com cursor war-hover" @click="astPup=false;$router.push('/user/assets')"
             style="margin: 10px auto"
             v-if="helpType === 874">
          <img src="../../assets/image/newyear/diamond.png" alt="">
          <span> 前往充值</span>
        </div>
      </slot>
    </YearModule>
  </div>
</template>

<script>
  import YearModule from "@/components/NewYear/YearModule";
  import ResultSkins from "@/components/NewYear/Module/ResultSkins";
  import {getAction, postAction} from "@/api/manage";
  import TimeCount from "@/components/NewYear/Module/TimeCount";
  import {mapState} from 'vuex'
  import QrcodePoster from "./Module/QrcodePoster";
  import {handleTimeForm, checkTime} from '../../utils/utils'
  import {url} from './Module/api'

  export default {
    name: "NewYear",
    components: {YearModule, ResultSkins, TimeCount, QrcodePoster},
    data() {
      const self = this
      return {
        url,
        handleTimeForm,
        checkTime,
        realIndex: 1,
        gameRule: false,
        posterShow: false,
        helpType: 0,
        astPup: false,
        roll: {},
        rankList: [],  // 排行榜数据
        dayRank: [],  // 每日榜
        homeData: {}, //  领取数据
        helpNum: {
          count: 0,
          time: null
        }, // 助力时间次数
        boxData: {
          common: [],
          luxurious: []
        },  // 箱子数据
        skins: {   //  箱子对应饰品
          normal: [],
          luxurious: [],
        },
        yesterTank: [],  // 昨日榜单
        myDiscount: false,
        isYesterday: false,
        dayTap: 'TodayRanking',
        kind: 0,
        searchFrom: {
          count: 1
        },
        carrot: 0,
        historyData: [{name: '运动手套 | 迈阿密（崭新出厂）', createTime: '2022.22 20:00:00', price: 123}],
        isHistory: false,
        option: {
          direction: "horizontal",
          centeredSlides: true,
          loop: true,
          spaceBetween: this.$store.state.account.isPhone ? 0 : 80,
          slidesPerView: 3,
          speed: 500,
          slideToClickedSlide: true,
          on: {
            slideChangeTransitionEnd: function () {
              self.realIndex = this.realIndex
              if (self.boxData.common.length === 0) return
              self.getSkinsData()
            },
          }
        },
      }
    },
    created() {
      if (this.user.id) {
        this.getMyCarrot()
        this.getlyTime()
      }
      this.getHome()
      this.getList()
      this.getBoxData()
      this.getRoll()
      if (this.$route.query.poster) {

        this.astPup = true
      }
    },
    computed: {
      ...mapState('account', ['user']),
      ...mapState('account', {
        discount: state => Object.values(state.userDiscount).length > 0 ? Object.values(state.userDiscount) : []
      })
    },
    watch: {
      discount(nv) {
        if (nv.length === 0) {
          this.myDiscount = false;
        }
      },
      user(nv, ov) {
        // 退出登录 初始化页面状态
        if (!nv.id) {
          this.helpNum = {count: 0, time: ''};
          this.carrot = 0
          this.getList();
          this.getHome()
        }
        if (nv.id && nv.id !== ov.id) {
          this.getMyCarrot();
          this.getlyTime();
          this.getList();
          this.getHome()
        }
      }
    },
    beforeDestroy() {
      for (let i = 0; i < this.discount.length; i++) {
        clearInterval(this.$refs[`timeCount${i}`][0].timer);
      }
    },
    methods: {
      getRoll() {
        let parmas = {
          id: 167,
          roomType: 0,
          type: '',
          current: 1,
          size: 12,
          status: 1
        }
        getAction(url.roll, parmas).then(res => {
          this.roll = res.data.records[0]
        })
      },
      helpFriend() {
        if (!this.user.id) return this.$login()
        postAction(url.assistance, {map: this.$route.query.poster}).then(res => {
          this.helpType = 1
        }).catch(e => {
          if (e.response.data.errCode === 879) return this.$Message.error(e.response.data.errMsg);
          this.helpType = e.response.data.errCode;
        })
      },
      sharePoster() {
        if (!this.$store.state.account.user.id) return this.$login();
        this.$refs.invite.sharePopup();
        this.posterShow = true;
      },
      copyLink() {
        let txt = "拜托帮我助力一下吧，助力后我能获得豪华箱子开启权限和加入100%必中饰品roll房~:" + window.location.origin + `/page/source?poster=${this.$store.state.account.user.spreadCode}`
        this.$copyText(txt).then(res => {
          this.$Message.success('复制成功')
        })
      },
      getlyTime() {
        getAction(url.ly).then(res => {
          this.helpNum = res.data;
        })
      },
      getBoxData() {
        getAction(url.box).then(res => {
          this.boxData = res.data;
          // this.getSkinsData();
        })
      },
      async getSkinsData() {
        let normalparams = {id: this.boxData.common[this.realIndex].id};
        let lyParamas = {id: this.boxData.luxurious[this.realIndex].id};
        let normalRes = await getAction('/api/activity/box/details', normalparams);
        let luxuriousRes = await getAction('/api/activity/box/details', lyParamas);
        this.handleSkins(normalRes.data);
        this.handleSkins(luxuriousRes.data);
        this.skins.normal = normalRes.data;
        this.skins.luxurious = luxuriousRes.data.filter(x => !normalRes.data.some(y => y.name === x.name));
      },
      seeYesterday() {
        if (this.rankList.YesterdayRanking.data.length === 0) return this.$Message.info('暂无昨日数据');
        this.isYesterday = true;
      }
      ,
      signGame(type) {
        if (!this.user.id) return this.$login()
        let parmas = {type: type};
        postAction(url.receive, parmas).then(() => {
          this.getHome();
          this.getMyCarrot();
          if (type === 1) {
            return this.$Message.success('今日签到成功');
          }
          this.$Message.success('领取成功');
        }).catch(e => {
          this.$Message.error(e.response.data.errMsg);
        })
      }
      ,
      async getHome() {
        let res = await getAction(url.home)
        for (let key in res.data) {
          res.data[key].condition = JSON.parse(res.data[key].condition);
          this.handleData(res.data[key], key);
        }
        this.homeData = res.data;
      },
      switchRank(type) {
        this.kind = type;
      },
      handleReachBottom() {
        this.searchFrom.count++
        let params = {current: this.searchFrom.count,}
        getAction(url.record, params).then(res => {
          if (res.data.records.length === 0) --this.searchFrom.count
          let a = this.handleSkins(res.data.records)
          this.historyData.push(...a)
        })
      },
      getList() {
        getAction(url.list).then(res => {
          res.data.todayReward = JSON.parse(res.data.todayReward)
          res.data.totalReward = JSON.parse(res.data.totalReward)
          this.rankList = res.data
          this.dayRank = this.rankList[this.dayTap]
        })
      },
      async getMyCarrot() {
        try {
          let res = await getAction(url.carrot)
          this.carrot = res.data
        } catch (e) {
          this.carrot = 0
        }
      },
      getRecord() {
        getAction(url.record).then(res => {
          this.historyData = this.handleSkins(res.data.records)
          this.isHistory = true
        })
      },
      handleSkins(res) {
        let arr = [1, 2, 3]
        res.forEach(el => {
          if (el.type === 0) return el.state = el.price
          if (arr.includes(el.type)) {
            el.state = '有效期' + el.validityTime + '小时'
          }
          if (el.type === 4) return el.state = el.wishNum + '张'
          if (el.type === 5) return el.state = '永久有效'
          if (el.type === 6) return el.state = '余额' + el.money
        })
        return res
      },
      handleData(data, key) {
        if (key === 'signIn') {
          data.signNum = 0
          data.condition.forEach(el => {
            el.sign = false
            if (data.userSignIn && data.userSignIn.includes(el.activityDate)) {
              el.sign = true
            }
            if (el.activityDate.split('-')[2].includes(new Date().getDate())) {
              data.signNum = el.reward
            }
          })
        }
        if (data.condition.taskList) {
          let num = 0
          data.condition.taskList.forEach(item => {
            num += +item.obtain
            item.carrotNum = num
          })
          let task = data.condition.taskList
          let number = data.count
          for (let i = 0; i < task.length; i++) {
            if (i < task.length - 1) {
              if (task[i].consume < number < task[i + 1].consume) {
                task[i].progress = ((+number - +task[i].consume) / (+task[i + 1].consume - +task[i].consume)) * 100
              }
              if (number < task[i].consume) {
                task[i].progress = 0
              }
              if (number >= task[i + 1].consume) {
                task[i].progress = 100
              }
            }
          }
        }
      },
      getResultSkins(id) {
        if (!this.user.id) return this.$login();
        getAction(url.open, {id: id}).then(res => {
          this.handleSkins([res.data])
          if (res.data.type === 6) this.$store.dispatch('account/getUser')
          this.$refs.resultSkins.skins = res.data
          this.$refs.resultSkins.show = true
          this.getMyCarrot()
          this.$store.dispatch('account/getDiscount')
          setTimeout(() => {
            this.discount = this.$store.state.account.userDiscount
          }, 1500)
        }).catch(e => {
          this.$Message.error(e.response.data.errMsg)
        })
      },
    },
  }
</script>


<style lang="less" scoped>
  .bat-rule > span:nth-of-type(1){
    background: #FCD23C;
  }

  .p-tips{
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;
    text-align: center;
    margin-bottom: 10px;
  }

  .share-link{
    font-size: 17px;
    color: #F0C7A8;
    text-align: center;
    margin: 10px 0;
    cursor: pointer;

    i{
      font-size: 22px;
    }
  }

  .it-word{
    color: #FFDE00;
  }

  .help-txt{
    font-size: 17px;
    font-family: PingFang SC;
    color: #FFFFFF;
    text-align: center;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .assistance{
    width: 444px;
    height: 75px;
    background: url("../../assets/image/newyear/helpbg.png") no-repeat top left / contain;
    margin: auto;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;

    p{
      font-weight: bold;
    }

    > div:nth-child(1){
      p{
        text-align: center;
        color: #FFFFFE;
        font-weight: bold;
        font-size: 12px;
      }

      > p:nth-child(1){
        font-size: 28px;
      }
    }

    > div:nth-of-type(2){
      margin-top: 5px;

      > p:nth-child(1){
        font-size: 15px;
        color: #FCBF4F;
      }

      > p:nth-child(2){
        font-size: 20px;
        color: #FEDD00;
      }
    }

    > div:nth-child(3){
      cursor: pointer;
      text-align: center;

      i{
        font-size: 28px;
      }
    }

  }

  .invite-frd{
    width: fit-content;
    padding: 10px 30px;
    background: url("../../assets/image/newyear/btnbgs.png") no-repeat top center / 100% 100%;
    margin: 30px auto;
    display: flex;
    align-items: center;

    > span{
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFDE00;
    }

    img{
      width: 30px;
      margin-right: 10px;
    }
  }

  .box-swiper{
    border: 1px solid rgba(255, 255, 255, 0);
    margin: 30px auto;
    width: 90%;

    /deep/ .swiper-slide{
      transform: scale(.7);
    }

    transition: 1s;

    /deep/ .swiper-slide-active, .swiper-slide-duplicate-active{
      transform: scale(1);
    }
  }

  .info-title{
    margin: 20px;

    img{
      width: 30%;
    }
  }

  .cell-btn{
    display: flex;
    justify-content: center;

    .un-lock{
      filter: brightness(.5);
    }

    > div{
      font-size: 0;
      font-weight: bold;
      margin: 0 10px;
      cursor: pointer;
      width: 184px;

      img{
        width: 100%;
      }
    }
  }

  .skins-info{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  .normal-skins{
    text-align: center;
    width: 624px;
    background: #130C03;
    padding: 10px;
    height: 480px;

    > p{
      text-align: left;
      margin-bottom: 20px;
      font-size: 15px;
      color: #AC8355;
      font-weight: bold;
    }

    > div{
      display: flex;
      flex-wrap: wrap;
      gap: 17px;
      height: 400px;
      overflow-y: auto;

      &::-webkit-scrollbar-thumb{
        background: #675404;
        width: 5px;
      }

      &::-webkit-scrollbar-track{
        background: #2D220D;
      }

      > div{
        padding: 10px;
        width: 131px;
        height: 186px;
        background: url("../../assets/image/newyear/imgbg.png") no-repeat center top / 100%;

        > p{
          margin-top: 10px;
        }
      }
    }

    .cell-skins{
      font-size: 14px;
      color: #FFCA6E;
    }

    .img-center{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60%;
      position: relative;
    }

    img:nth-child(1){
      width: 90%;
    }

    img:nth-child(2){
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 70px;
    }
  }

  .ly-skins{
    width: 476px;

    > div{
      .un-lock-bg{
        background: url("../../assets/image/newyear/lyimg.png") no-repeat center top / 100%,
        url("../../assets/image/newyear/spe.png") no-repeat center top / 100% 100%;
      }

      > div{
        background: url("../../assets/image/newyear/imgbg.png") no-repeat center top / 100%,
        url("../../assets/image/newyear/lyimg.png") no-repeat center top / 100%;
      }
    }
  }

  .new-year{
    background: url("../../assets/image/newyear/banner.jpg") no-repeat top left / 100%,
    url('../../assets/image/newyear/btbanner.jpg') #0d1014 no-repeat bottom left / 100%;
    padding-top: 40%;

    img{
      user-select: unset;
    }
  }

  .cell-num{
    width: 65px;
    height: 65px;
    line-height: 100px;
    text-align: center;
    background: url("../../assets/image/newyear/fixcell.png") no-repeat bottom left / contain;
    font-size: 14px;
    font-family: FZLanTingHei-B-GBK;
    font-weight: 400;
    color: #FFF47B;
    z-index: 333;
    margin-bottom: 20px;
  }

  .my-disocunt{
    position: fixed;
    top: 50%;
    right: 10%;
    font-size: 14px;
    color: #FFFFFE;
    z-index: 333;
  }

  .year-content{
    width: 1200px;
    margin: auto;
  }

  .step-item{
    margin-bottom: .15rem;
    width: 100%;

    img{
      width: 17%;
    }
  }


  .year-tips{
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #C4B5AE;
  }


  .step-welfare{
    display: flex;
    margin-top: 70px;
    justify-content: space-between;
    align-items: flex-end;
    height: 100px;

    div{
      width: 248px;
    }

    > img{
      width: 17%;
    }

    .carrot-num{
      width: 248px;
      height: 100%;
      background: url("../../assets/image/newyear/carrot.png") no-repeat bottom left / 100%;
      font-size: 26px;
      font-family: FZLanTingHei-B-GBK;
      font-weight: 400;
      color: #FFF47B;
      text-align: left;
      padding-left: 170px;
      padding-top: 46px;
    }
  }

  .task-tips{
    margin: 30px auto;

    > img{
      width: 100%;
    }
  }

  .task-box{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    div:nth-of-type(2) .task-sign:nth-of-type(1){
      background: url("../../assets/image/newyear/tasktwo.png") no-repeat bottom left / 100%;
    }

    div:nth-of-type(3) .task-sign:nth-of-type(1){
      background: url("../../assets/image/newyear/taskthree.png") no-repeat bottom left / 100%;
    }

    div:nth-of-type(4) .task-sign:nth-of-type(1){
      background: url("../../assets/image/newyear/taskfour.png") no-repeat bottom left / 100%;
    }

    div:nth-of-type(5) .task-sign:nth-of-type(1){
      background: url("../../assets/image/newyear/taskfive.png") no-repeat bottom left / 100%;
    }

    div:nth-of-type(6) .task-sign:nth-of-type(1){
      background: url("../../assets/image/newyear/tasksix.png") no-repeat bottom left / 100%;
    }
  }


  .task-item{
    width: 360px;
    margin-bottom: 17px;

    .task-sign{
      height: 140px;
      background: url("../../assets/image/newyear/taskone.png") no-repeat bottom left / 100%;
      display: flex;
      flex-direction: column-reverse;

      > img{
        margin: 10px 20px;
        width: 30%;
      }

      .task-btn-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 11px 17px 11px;

        > div:nth-of-type(1){
          background: url("../../assets/image/newyear/carrotnum.png") no-repeat bottom left /100% 100%;
          width: fit-content;
          height: 37px;
          font-size: 12px;
          font-weight: bold;
          color: #EFDBD1;
          padding-left: 30px;
          padding-top: 6px;
          padding-right: 3px;

          > span{
            display: inline-block;
            color: #FFF47B;
            font-size: 21px;
            margin-left: 2px;
            transform: translateY(3px);
          }
        }

        div:nth-of-type(2){
          font-size: 12px;
          height: 24px;
          width: 82px;
          font-weight: bold;
          color: #090B0E;
          background: url("../../assets/image/newyear/signbtnbg.png") no-repeat bottom left / 100%;
          padding: 2px 14px;
          line-height: 24px;
          cursor: pointer;
          text-align: center;
          letter-spacing: 1px;

          &:hover{
            filter: brightness(1.1);
          }
        }
      }
    }
  }

  .task-bot{
    width: 100%;
    height: 150px;
    background: #130C02;
    padding: 0 26px 22px 25px;
    position: relative;

    > .text{
      font-size: 13px;
      font-weight: 600;
      color: #AE8557;
      line-height: 30px;

      > span{
        color: #FFF47B;
        font-size: 15px;
      }
    }
  }

  .sign-progress{
    > div{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    span{
      font-size: 12px;
      color: #FFDDC6
    }

    .progress-item{
      background: rgba(74, 54, 4, .5);
      border: 2px solid rgba(159, 132, 88, 0.5);
      width: 35px;
      height: 57px;
      margin-top: 15px;
      margin-right: 8px;
      border-radius: 2px;

      > div:nth-of-type(1){
        width: 33px;
        margin: auto;
        background: #965400;
        border-radius: 2px;
        font-size: 11px;
        font-weight: 400;
        color: #FFDDC6;
        text-align: center;
        line-height: 13px;
        padding: 1px 3px;
      }

      > div:nth-child(2){
        font-size: 0;
        margin-top: 2px;

        > img{
          width: 22px;
          height: 23px;
        }
      }
    }
  }

  .sign-cell{
    color: #AB9F90;

    img{
      width: 4px;
    }
  }

  .progress-charge{
    width: 100%;
    height: 9px;
    background: #491F16;
    border: 0px solid #000000;
    margin: 10px auto;
    border-radius: 3px;

    > div{
      width: 50%;
      height: 9px;
      background: #FDB306;
    }
  }

  .day-progress{
    display: flex;
    padding: 0 15px;

    > div:last-child{
      width: 20px !important;
    }

    > div:last-child .porgress-par{
      width: 0 !important;
    }

    .day-item{
      width: 80px;

      .carrot{
        transform: translateX(-15px);
        display: flex;

        > span{
          display: inline-block;
          width: 26px;
          height: 13px;
          background: #F3D691;
          border-radius: 6px;
          font-size: 12px;
          padding: 0 8px;
          color: #000000;
          font-weight: bold;
          text-align: center;
          line-height: 14px;
        }
      }

      .progress-times{
        color: #FFDDC6;
        font-size: 12px;
        margin-top: 5px;
        min-width: 30px;
      }

      .receive-progress{
        display: flex;
        align-items: center;

        > div:nth-of-type(1){
          height: 8px;
          width: 10px;
          border-radius: 50%;
          background: #634317;
          position: relative;
          z-index: 2;

          &.active{
            background: #FDE857;
          }
        }

        > .porgress-par{
          width: 100%;
          height: 4px;
          background: #412C0F;

          > div{
            height: 100%;
            width: 0;
            background: #FDB306;
          }
        }
      }
    }
  }

  .progress-line{
    position: absolute;
    bottom: 22%;
    left: 12%;
    width: 73%;
    height: 4px;
    background: #491F16;
    z-index: 1;

    > div{
      width: 0;
      max-width: 100%;
      height: 100%;
      background: #A2140F;
    }
  }

  .rank-box{
    background: url("../../assets/image/newyear/rankbg.png") no-repeat 0 10%  / 100%;
    padding-bottom: 50px;

    > div{
      width: 1125px;
      margin: auto;
    }

    .step-item{
      margin: 100px 0 46px 0;
    }
  }

  .rank-tap{
    display: flex;
    justify-content: space-around;
    padding: 0 80px;

    > div{
      width: 326px;

      p{
        font-size: 12px;
        text-align: center;
        color: #BAAAA6;
        margin: 10px 0 20px;
      }

      > img{
        width: 100%;
      }
    }
  }

  .rank-list{
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    > div{
      width: 48%;
    }

    .list-titles{
      height: 36px;
      background: #A16200;
      box-shadow: 2px 3px 30px 0px rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: space-around;
      //padding: 0 23px;
      /deep/ .ive-row{
        width: 100%;
      }

      p{
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        line-height: 36px;
        text-align: center;
      }
    }
  }

  .list-box{
    > div{
      height: 58px;
      background: #241A15;
    }

    .list-detail{
      height: 58px;

      .serial-no{
        padding-top: 10px;

        img{
          width: 50%;
        }

        p{
          font-size: 23px;
          line-height: 38px;
          font-weight: 600;
          color: #B8744A;
        }
      }

      .ivu-col{
        height: 100%;
      }
    }
  }

  .rank-user{
    display: flex;
    align-items: center;
    height: 100%;

    > div:nth-of-type(1){
      height: 40px;
      width: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
    }

    > div:nth-child(2){
      font-size: 12px;
      color: #BAAAA6;
      flex: 1;
    }

    img{
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }

  .last-carrot{
    height: 100%;
    background: url("../../assets/image/newyear/carrotrank.png") no-repeat 20% center / auto 42%;
  }

  .cdk{
    height: 100%;
    font-size: 17px;
    line-height: 58px;
    font-family: FZLanTingHei-B-GBK;
    text-align: center;
    color: #FFF47B;
  }

  .list-box .eleven-rank{
    font-size: 14px;
    line-height: 58px;
    text-align: center;
    color: #BAAAA6;
    font-weight: bold;
    margin: 2px 0;
    background: #241A15;

    span{
      color: #FFF47B;
      font-size: 18px;
    }
  }

  .car-btn{
    background: url("../../assets/image/newyear/signbtnbg.png") no-repeat bottom left / 100%;
    font-size: 13px;
    font-weight: 600;
    color: #090B0E;
    padding: 2px 15px;
    cursor: pointer;
    letter-spacing: 1px;

    &:hover{
      filter: brightness(1.1);
    }
  }

  .check-btn{
    width: max-content;
    margin: auto;
    padding: 10px 15px;
  }


  .his-item{
    width: 680px;
    height: 84px;
    background: #241A15;
    margin: 0 auto 15px;

    &:last-child{
      margin: 0 auto;
    }

    .ivu-col{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .history-img{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 70px;
      background: url("../../assets/image/newyear/imgbg.png") no-repeat top center / 100% 100%;

      img{
        width: 95%;
      }
    }

    .history-name{
      p{
        font-size: 14px;
        font-weight: bold;
        color: #FFDDC6;
      }
    }

    .his-price{
      font-size: 15px;
      color: #FED90A;

      i{
        font-size: 18px;
      }
    }

    .history-time{
      width: 195px;
      height: 62px;
      background: #1C1310;
      border: 0px solid #000000;
      display: flex;
      padding: 15px;
      justify-content: space-between;
      align-items: center;

      p{
        font-size: 12px;
        color: #BAAAA6;
      }
    }
  }

  .empty-his{
    p{
      font-size: 18px;
      font-weight: 400;
      color: #ffffff;
      line-height: 25px;
      text-align: center;
      margin: 20px 0;
    }
  }

  .history-btn{
    img{
      width: 15%;
    }
  }

  @media screen and (max-width: 800px){
    .roll-source{
      width: 100%;
    }

    .roll-det{
      width: 94%;
      margin: auto;
    }

    .roll-det > div:nth-of-type(1){
      width: 84%;
      margin: auto;
    }

    .assistance{
      width: 98%;
      margin: auto;
      background-size: 100% 100%;
    }

    .cell-btn > div{
      width: 40%;
    }

    .go-btn{
      width: 40%;
    }

    .assistance > div:nth-of-type(2) > p:nth-child(2){
      font-size: 14px;
    }

    .assistance > div:nth-of-type(2) > p:nth-child(1){
      font-size: 13px;
    }

    .p-tips{
      font-size: 12px;
    }

    .info-title{
      margin: 20px;

      img{
        width: 90%;
      }
    }

    .skins-info{
      flex-wrap: wrap;
    }

    .box-swiper{
      width: 98%;
    }

    .box-info-css p{
      font-size: 13px;
      bottom: 11%;
    }

    .normal-skins{
      width: 98%;
      margin: auto;

      > div{
        gap: 5px;

        > div{
          width: 31%;
          background-size: 100% 100%;
        }
      }
    }

    .ly-skins{
      width: 98%;
      margin: 20px auto 0;
    }

    .year-content{
      width: 100%;
    }

    .last-carrot{
      height: 100%;
      background: url("../../assets/image/newyear/carrotrank.png") no-repeat 10% center / auto 35%;
    }

    .cdk{
      font-size: 14px;
    }

    .new-year{
      background: url("../../assets/image/newyear/bannerm.jpg") no-repeat top left / 100%,
      url('../../assets/image/newyear/btbannerm.png') #0d1014 no-repeat bottom left / 100%;
      padding-top: 200%;
    }

    .step-item{
      img{
        width: 40%;
      }
    }

    .virtual-box{
      width: 100%;
      justify-content: space-between;

      > div{
        margin-right: 0;
        width: 14%;
      }

      > div .img-des{
        bottom: -90%;
      }

      > div:first-child .img-des{
        left: 280%;
      }

      > div:nth-of-type(2) .img-des{
        left: 160%;
      }

      > div:nth-of-type(6) .img-des{
        left: -100%;
      }

      > div:last-child .img-des{
        left: -150%;
      }
    }

    .history-btn{
      img{
        width: 28%;
      }
    }

    .rabbit-box{
      flex-wrap: wrap;
      justify-content: space-around;

      .rabbit-item{
        width: 50%;

        > div:nth-of-type(2){
          width: 70%;
          padding-left: 33px;
          padding-top: 12px;
        }
      }
    }

    .step-welfare{
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      height: auto;

      .carrot-num{
        height: 100px;
      }

      > img{
        width: 40%;
      }
    }

    .rank-box{
      background: url("../../assets/image/newyear/rankbgs.png") no-repeat 0 0  / 100%;
      padding-top: 10%;

      .step-item{
        margin: 50px 0 30px 0;
      }

      > div{
        width: 100%;
      }
    }

    .swich-rank{
      display: flex;

      > div{
        width: 40%;
        padding: 10px;
        background: #2F2103;
        border-radius: 3px;
        margin-right: 2px;
        cursor: pointer;

        &.active{
          background: #965400;
        }

        > img{
          width: 80%;
        }
      }
    }

    .rank-tap{
      flex-wrap: wrap;
      margin-top: .4rem;
      padding: 0;

      > div{
        width: 94%;
        margin: auto;
      }
    }

    .year-tips{
      font-size: 12px;
    }

    .rank-list{
      flex-wrap: wrap;

      > div{
        margin: auto;
        width: 95%;
      }
    }

    .car-btn{
      margin-top: 20px;
    }

    .his-item{
      width: 100%;

      .history-time{
        width: 94%;
        margin: auto;
        height: auto;
        padding: 0;
      }
    }

    .hash-header .hash-title > img{
      width: 40%;
    }

    .year-box{

      > div{
        padding: 11px 10px;
        width: 46%;
        height: auto;
      }

      .year-item{
        img{
          width: 50%;
        }

        .skins-pri p:nth-of-type(1){
          top: 7%;
          right: 25%;
        }

        p:nth-of-type(3){
          font-size: 12px;
        }

        > div:nth-of-type(1){
          width: 100%;
          height: 100px;
          background-size: contain;
          background-position: center;
        }
      }
    }

    .his-item .history-name p{
      font-size: 12px;
    }

    /deep/ .hash-content{
      max-height: none;
    }

    .rank-list .list-titles p{
      font-size: 13px;
    }

    .my-disocunt{
      top: 72%;
      right: 2%;
    }
  }

  .img-hover{
    opacity: .85;

    &:hover{
      opacity: 1;
    }
  }

  .time-count{
    width: 210px;
  }

  /deep/ .time-count > div:nth-of-type(2){
    flex: 1;
  }

  /deep/ .time-count > div:nth-of-type(2) p{
    text-align: center;
  }

  .active-tips{
    text-align: center;
    margin: 60px 0 0 0;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #C4B5AE;
    line-height: 16px;
    letter-spacing: 4px;
  }
</style>
