<template>
  <div id="year-main">
    <div class="to-id">
      <a v-for="el in 4" :key="el" :href="'#step'+el" :class="{'active':el === idPoint}" @click="idPoint = el">{{
          el
        }}</a>
    </div>
    <div class="year-content">
      <div class="step-img" align="center" id="step1">
        <img src="../../assets/image/festival/stepone.png" alt="">
      </div>
      <div class="guess-game">
        <span @click="$router.push('/page/helpcenter/activity')">点击此处查看免单时间规则>></span>
        <img src="../../assets/image/festival/secret.png" v-if="!$store.state.account.isPhone" alt=""
             style="width: 100%">
        <img src="../../assets/image/festival/guessM.png" v-if="$store.state.account.isPhone" alt=""
             style="width: 100%">
      </div>
      <div class="check-btn">
        <div class="cursor" :class="{'active': guess === 1}" @click="switchGuess(1,'guess')"></div>
        <div class="cursor" :class="{'active': guess === 2}" @click="switchGuess(2,'guess')"></div>
      </div>
      <!--      猜谜游戏-->
      <div class="guess-box">
        <div class="guess-img">
          <img
              :src="guess === 1 ?  guessData.todayDecrypt.img ? imgHost(guessData.todayDecrypt.img) : guessData.todayDecrypt.imgs :imgHost(guessData.yesterdayDecrypt.img)"
              style="width: 100%">
        </div>
        <div class="guess-text">
          <h3>{{ guess === 1 ? '今' : '昨' }}日免单时刻</h3>
          <p v-show="guess===1">
            我们在{{
              $store.state.account.isPhone ? '上方' : '左侧'
            }}图片中暗藏了两条时间线索，代表两个免单时刻（每日中午12：00-晚上24：00之间），快来看图猜猜吧，猜中将有机会消费免单哦。 </p>
          <div class="publicity-box">
            <div><i class="iconfont icon-icon-history"></i></div>
            <div class="publicity-time">
              <div>{{
                  guess === 1 ? "??:??" : guessData.yesterdayDecrypt.firstTime
                }}
              </div>
              <div class="publicity-text">
                <div class="over-flow-hide">
                  Hash值：{{
                    guess === 1 ? guessData.todayDecrypt.firstHash : guessData.yesterdayDecrypt.firstHash
                  }}
                </div>
                <div
                    @click="copy(guess === 1 ? guessData.todayDecrypt.firstHash : guessData.yesterdayDecrypt.firstHash)">
                  复制
                </div>
              </div>
            </div>
          </div>
          <div class="publicity-box">
            <div><i class="iconfont icon-icon-history"></i></div>
            <div class="publicity-time">
              <div>{{ guess === 1 ? "??:??" : guessData.yesterdayDecrypt.secondTime }}</div>
              <div class="publicity-text">
                <div class="over-flow-hide">
                  Hash值：{{ guess === 1 ? guessData.todayDecrypt.secondHash : guessData.yesterdayDecrypt.secondHash }}
                </div>
                <div
                    @click="copy(guess === 1 ? guessData.todayDecrypt.secondHash : guessData.yesterdayDecrypt.secondHash)">
                  复制
                </div>
              </div>
            </div>
          </div>
          <p style="margin-top: 40px" v-show="guess === 1">
            免单时间已提前确定；公布时间段hash，以保证我们无法在活动过程中更改免单时间。
          </p>
          <div style="margin-top: 20px" v-if="guess === 2">
            <p>迷底揭晓</p>
            <p>{{ guessData.yesterdayDecrypt.tips ? guessData.yesterdayDecrypt.tips : '' }}</p>
          </div>
          <div class="free-btn" v-show="guess === 2" @click="watchFreeList">查看免单名单</div>
        </div>
      </div>
      <div class="step-img" align="center" id="step2">
        <img src="../../assets/image/festival/steptwo.png" alt="">
      </div>
      <div class="guess-game">
        <img src="../../assets/image/festival/chargetips.png" v-if="!$store.state.account.isPhone" alt=""
             style="width: 100%">
        <img src="../../assets/image/festival/chargeM.png" v-if="$store.state.account.isPhone" alt=""
             style="width: 100%">
        <span class="charge-pay">充值金额需满足最低50%游戏消耗</span>
      </div>
      <!--      充值榜单-->
      <div class="rank-list">
        <div class="cursor" :class="{'active': rankType === 1}" @click="switchGuess(1,'rank')"></div>
        <div class="cursor" :class="{'active': rankType === 2}" @click="switchGuess(2,'rank')"></div>
      </div>
      <!--      奖池-->
      <div class="totle-money" v-if="todayRank.length > 0">
        <div>{{ rankType === 1 ? '当前奖金金额' : '昨日奖池' }}
          <span>${{ rankType === 1 ? rankList.todayRanking.jackpot : rankList.yesterdayRanking.jackpot }}</span></div>
        <div v-show="rankType === 1">榜单每20分钟更新一次</div>
      </div>

      <div class="festival-rank" v-if="todayRank.length > 0">
        <div class="rank-item" v-for="(el,idx) in todayRank" :key="el.userId">
          <ColC span="5">
            <div align="center" class="serial-no">
              <img v-if="idx=== 0" src="../../assets/image/newyear/num1.png" alt="" style="width: 40px">
              <img v-if="idx=== 1" src="../../assets/image/newyear/num2.png" alt="" style="width: 40px">
              <img v-if="idx=== 2" src="../../assets/image/newyear/num3.png" alt="" style="width: 40px">
              <p v-if="idx>2">{{ idx + 1 }}</p>
            </div>
          </ColC>
          <ColC span="4">
            <div class="rank-avatar" align="center">
              <img :src="imgHost(el.headPortraitBox ? el.headPortraitBox :'')" alt="">
              <div><img :src="imgHost(el.avatar)" alt=""></div>
            </div>
          </ColC>
          <ColC span="15">
            <div class="rank-user-info">
              <p>{{ el.name }}</p>
              <div style="display: flex;">
                <div>充值金额：<span>${{ el.amount }}</span></div>
                <div v-show="rankType === 2">奖励：<span>${{ el.money }}</span></div>
              </div>
            </div>
          </ColC>
        </div>
      </div>
      <img src="../../assets/image/festival/empty.png" v-if="todayRank.length === 0" alt="" style="width: 100%">
      <div></div>
      <div class="step-img" id="step3" align="center">
        <img src="../../assets/image/festival/stepthree.png" alt="">
      </div>
      <div class="guess-game">
        <p>今日红包发放金额 <span>${{ totalPack.totalAmount ? totalPack.totalAmount : 0 }}</span></p>
        <img src="../../assets/image/festival/raintips.png" v-if="!$store.state.account.isPhone" alt=""
             style="width: 100%">
        <img src="../../assets/image/festival/redPackM.png" v-if="$store.state.account.isPhone" alt=""
             style="width: 100%">
        <div v-show="totalPack.userAmount > 0">
          活动期间您累计抢到红包 <span>${{ totalPack.userAmount }}</span>
        </div>
      </div>
      <div class="step-img" align="center" id="step4">
        <img src="../../assets/image/festival/stepfour.png" alt="">
      </div>
      <!--      福利箱子-->
      <div class="free-title" align="center">
        <img src="../../assets/image/festival/boxtitle.png" alt="">
      </div>
      <div class="free-box">
        <div class="free-item cursor" @click="goWelfare(item)" v-for="item in welfare" :key="item.id">
          <div>
            <img :src="imgHost(item.image)" alt="" style="width: 100%">
          </div>
          <div class="free-text">
            <div>{{ taskType(item.taskName) }}: <span>{{ item.codeMap }}</span></div>
            <div>进度:
              <span v-if="item.flag">已开启</span>
              <span v-else>{{ item.amount ? item.amount >= item.codeMap ? '已完成' : item.amount : 0 }}</span>
            </div>
            <p>活动期间 {{ taskType(item.taskName) }}</p>
            <p>{{ item.remarks }}{{ item.codeMap }}</p>
          </div>
        </div>
      </div>
      <div class="free-title" style="margin: 60px 0" align="center">
        <img src="../../assets/image/festival/rolltitle.png" alt="">
      </div>
      <!--      roll房-->
      <div class="free-roll" v-if="rollData.length > 0">
        <div class="roll-item cursor" @click="goRoll(item.id)" v-for="item in rollData" :key="item.id">
          <div class="roll-avatar">
            <img :src="imgHost(item.image)" alt="">
          </div>
          <div class="item-info">
            <div><i class="iconfont iconicon-home"></i> {{ item.id }}</div>
            <div class="over-flow-hide">{{ item.name }}</div>
          </div>
          <div class="roll-skins">
            <div class="skins-item">
              <div v-for="(el,idx) in item.prizeImg" align="center" :key="el.image+idx">
                <img :src="imgHost(el.image)" alt="">
              </div>
            </div>
            <div class="room-price">
              <div>总价值: <span>${{ item.totalPrice }}</span></div>
              <div>共<span>{{ item.totalPrize }}</span>件</div>
            </div>
            <div class="item-time">{{ new Date(item.rollTime).toLocaleString() }} 开奖</div>
          </div>
        </div>
      </div>
    </div>
    <FreeModule v-model="show" :rankList="guessData" ref="freeList"></FreeModule>
  </div>
</template>

<script>
import {getAction} from "@/api/manage";
import FreeModule from "@/components/YearFestival/FreeModule";

export default {
  name: "YearMain",
  components: {FreeModule},
  data() {
    return {
      rollData: [],
      rankList: [],
      todayRank: [],
      welfare: [],
      guessData: {
        oneFree: [],
        twoFreee: [],
        todayDecrypt: {img: ''},
        yesterdayDecrypt: {tips: '', img: ''}
      },
      totalPack: 0,
      idPoint: 1,
      show: false,
      guess: 1,
      rankType: 1,
      url: {
        roll: '/api/roll/room/rooms',
        rank: '/api/activity/recharge/list',
        welfare: '/api/drop/task/box',
        guess: '/api/activity/free/list',
        total: '/api/activity/red/amount/all'
      }
    }
  },
  created() {
    this.getWelfare()
    this.getFreeList()
    this.getRankData()
    this.getTotalPack()
    this.getRoll()
  },
  methods: {
    switchGuess(type, kind) {
      if (type === 2 && kind === 'guess' && !this.guessData.yesterdayDecrypt.firstHash) return this.$Message.info('暂无昨日竞猜')
      if (type === 2 && kind === 'rank' && !this.rankList.yesterdayRanking) return this.$Message.info('暂无昨日充值榜单')
      kind === 'guess' ? this.guess = type : this.rankType = type
      if (kind === 'guess') return
      this.todayRank = kind === 'rank' && type === 1 ? this.rankList['todayRanking'].userList : this.rankList['yesterdayRanking'].userList
    },
    getRoll() {
      let parmas = [1308, 1309, 1310]
      parmas.forEach(item => {
        getAction(this.url.roll, {id: item, roomType: 0, type: '', status: 1}).then(res => {
          if (res.data.records.length > 0) {
            this.rollData.push(res.data.records[0])
          }
        })
      })
    },
    getRankData() {
      getAction(this.url.rank).then(res => {
        this.rankList = res.data
        this.todayRank = res.data.todayRanking.userList.length > 0 ? res.data.todayRanking.userList : []
      })
    },
    goRoll(id) {
      this.$router.push(`/page/roll/${id}`)
    },
    async getFreeList() {
      let res = await getAction(this.url.guess)
      this.guessData.oneFree = res.data.oneFree ? res.data.oneFree : []
      this.guessData.twoFree = res.data.twoFree ? res.data.twoFree : []
      this.guessData.yesterdayDecrypt = res.data.yesterdayDecrypt ? res.data.yesterdayDecrypt : {}
      this.guessData.todayDecrypt = res.data.todayDecrypt ? res.data.todayDecrypt :
          {secondHash: '活动暂未开启', imgs: require('../../assets/image/festival/emptygues.jpg'), firstHash: '活动暂未开启'}
    },
    async getWelfare() {
      let res = await getAction(this.url.welfare)
      this.welfare = res.data.length > 0 ? res.data : []
    },
    getTotalPack() {
      getAction(this.url.total).then(res => {
        this.totalPack = res.data
      })
    },
    watchFreeList() {
      this.show = true
    },
    goWelfare(item) {
      item.boxType += 2
      item.discountPrice = 0
      localStorage.setItem('box', JSON.stringify(item));
      this.$router.push('/steer/case');
    },
    copy(text) {
      this.$copyText(text).then(() => {
        this.$Message.success('复制成功')
      })
    }
  }
}
</script>

<style scoped lang="less">
#year-main {
  padding-top: 35%;
  background: url("../../assets/image/festival/banner.png") no-repeat top left / 100%,
  url('../../assets/image/festival/bgbt.png') #140d11 no-repeat bottom left / 100%;
  padding-bottom: 200px;
}

.to-id {
  position: fixed;
  right: 10%;
  top: 50%;
  z-index: 2;

  > a {
    display: block;
    width: 38px;
    height: 44px;
    background: #1B1F34;
    margin-bottom: 20px;
    color: #54587E;
    text-align: center;
    line-height: 38px;
    font-size: 22px;
    -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    cursor: pointer;

    &.active {
      background: #E32A2A;
      color: #FFFFFE;
    }
  }
}

.year-content {
  width: 1080px;
  margin: auto;
}

.step-img {
  margin-top: 90px;

  img {
    width: 20%;
  }
}

.guess-box {
  display: flex;
  justify-content: space-between;
}

.guess-img {
  width: 58%;
  box-shadow: 2px 3px 13px 0 rgba(0, 0, 0, 0.5);
}

.guess-text {
  width: 40%;
  background: #12161D;
  padding: 30px;
  box-shadow: 2px 3px 13px 0 rgba(0, 0, 0, 0.5);

  > h3 {
    font-size: 21px;
    font-weight: 600;
    color: #FFEB6F;
    margin-bottom: .2rem;
  }

  p {
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 1px;
    font-weight: bold;
  }

  > div p {
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 1px;
    font-weight: bold;
  }
}

.guess-game {
  position: relative;

  > span {
    font-size: 16px;
    font-weight: 600;
    color: #FFC76E;
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }

  p {
    font-size: 17px;
    font-weight: 600;
    color: #FFFFFF;
    text-align: center;
    position: absolute;
    top: 2%;
    left: 50%;
    transform: translateX(-50%);

    > span {
      display: inline-block;
      margin-left: 10px;
      font-size: 35px;
      font-weight: 600;
      color: #FFC76E;
    }
  }

  div {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    background: #9A0A14;
    border: 0 solid #000000;
    border-radius: 5px;
    font-size: 17px;
    font-weight: 400;
    color: #FFFFFF;
    padding: 4px 0;
    text-align: center;

    > span {
      color: #FFC76E;
      font-weight: bold;
    }
  }
}

.free-title {
  margin: 30px 0;

  img {
    width: 15%;
  }
}

.publicity-box {
  display: flex;
  margin-top: 10px;
  width: 100%;

  > div:nth-of-type(1) {
    width: 40px;

    i {
      font-size: 30px;
      color: #FFFFFE;
    }
  }
}

.publicity-time {
  width: 90%;

  > div:nth-of-type(1) {
    font-size: 17px;
    font-weight: 400;
    color: #FFEB6F;
  }
}

.publicity-text {
  display: flex;
  font-size: 12px;
  color: #FFFFFF;

  > div:nth-of-type(1) {
    width: 80%;
    line-height: 20px;
    margin-right: 14px;
  }

  > div:nth-of-type(2) {
    font-size: 14px;
    color: #FFC76E;
    width: 30px;
    cursor: pointer;
    line-height: 17px;
  }
}

.free-box {
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;
  background: url("../../assets/image/festival/light.png") no-repeat bottom left  / 100%;
}

.free-item {

  > div:nth-of-type(1) {
    width: 300px;
    height: 255px;
    transition: all .5s;

    &:hover {
      transform: translateY(-10px);
    }

    img {
      width: 100%;
    }
  }
}

.free-text {
  padding-left: 30%;
  margin-top: 20px;

  > div {
    font-size: 14px;
    color: #FFFFFF;

    span {
      font-size: 20px;
      color: #FFC76E;
    }
  }

  P:nth-of-type(1) {
    margin-top: 20px;
  }

  p {
    font-size: 12px;
    color: #FFFFFF;
    line-height: 18px;
    opacity: 0.7;
  }
}

.free-roll {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;

  .roll-item {
    width: 339px;
    height: 305px;
    position: relative;
    background: url("../../assets/image/festival/rollbg.png") no-repeat bottom left  /  100%;
  }

  .item-info {
    height: 113px;
    padding: 17px;
    background: url("../../assets/image/festival/rollname.png") no-repeat bottom left  /  100%;

    > div:nth-of-type(1) {
      font-size: 12px;
      font-weight: 400;
      color: #FAC860;
    }

    > div:nth-of-type(2) {
      font-size: 15px;
      color: #FFD3BE;
      font-weight: bold;
      text-align: center;
      margin-top: 20px;
    }
  }
}

.roll-avatar {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
  }
}

.roll-skins {
  padding: 23px 14px;
}

.skins-item {
  display: flex;
  justify-content: space-between;

  > div {
    width: 32%;
    background: rgba(33, 25, 24, .6);
    border: 0 solid #000000;

    > img {
      width: 80%;
    }
  }
}

.room-price {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: bold;

  > div {
    font-size: 14px;
    color: #B7B8B9;
    letter-spacing: 2px;

    > span {
      font-size: 16px;
      color: #FFC76E;
    }
  }
}

.item-time {
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
  margin-top: .25rem;
}

.check-btn {
  display: flex;
  margin-bottom: 40px;

  > div:nth-of-type(1) {
    width: 194px;
    height: 59px;
    margin-left: auto;
    margin-right: 20px;

    background: url("../../assets/image/festival/toguesss.png") no-repeat bottom left  /  100%;

    &.active {
      background: url("../../assets/image/festival/toguess.png") no-repeat bottom left  /  100%;
    }

    &:hover {
      background: url("../../assets/image/festival/toguess.png") no-repeat bottom left  /  100%;
    }
  }

  > div:nth-of-type(2) {
    width: 194px;
    height: 59px;
    margin-right: auto;
    background: url("../../assets/image/festival/yesguesss.png") no-repeat bottom left  /  100%;

    &.active {
      background: url("../../assets/image/festival/yesguess.png") no-repeat bottom left  /  100%;
    }

    &:hover {
      background: url("../../assets/image/festival/yesguess.png") no-repeat bottom left  /  100%;
    }
  }
}

.rank-list {
  display: flex;
  margin-bottom: 40px;

  > div:nth-of-type(1) {
    width: 194px;
    height: 59px;
    margin-left: auto;
    margin-right: 20px;

    background: url("../../assets/image/festival/tochargeyes.png") no-repeat bottom left  /  100%;

    &.active {
      background: url("../../assets/image/festival/tocharge.png") no-repeat bottom left  /  100%;
    }

    &:hover {
      background: url("../../assets/image/festival/tocharge.png") no-repeat bottom left  /  100%;
    }
  }

  > div:nth-of-type(2) {
    width: 194px;
    height: 59px;
    margin-right: auto;
    background: url("../../assets/image/festival/yecharges.png") no-repeat bottom left  /  100%;

    &.active {
      background: url("../../assets/image/festival/yecharge.png") no-repeat bottom left  /  100%;
    }

    &:hover {
      background: url("../../assets/image/festival/yecharge.png") no-repeat bottom left  /  100%;
    }
  }
}

.festival-rank {
  background: #251415;
  border: 0 solid #000000;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .rank-item {
    width: 49%;
    height: 78px;
    background: url("../../assets/image/festival/rankbg.png") no-repeat top left  /  100%;
  }
}

/deep/ .ivu-col {
  height: 100%;
}

.serial-no {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  img {
    width: 50%;
  }

  p {
    width: 30px;
    height: 30px;
    background: #A30E18;
    border-radius: 50%;
    font-size: 21px;;
    font-weight: bold;
    color: #F4E600;
  }
}

.rank-avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  position: relative;

  > img {
    width: 162%;
    position: absolute;
    top: -45%;
    left: -31%;
  }

  > div {
    height: 100%;
    width: 100%;
    padding: 5px;
    overflow: hidden;

    > img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }

}

.rank-user-info {
  margin-top: 20px;

  > div {
    font-size: 13px;
    color: #FFFFFF;

    > div:nth-of-type(1) {
      margin-right: 30px;
    }

    span {
      font-size: 17px;
      color: #FFC76E;
      font-weight: bold;
    }
  }
}

.totle-money {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;

  > div:nth-of-type(1) {
    font-size: 18px;
    color: #FFFFFF;
    font-weight: bold;

    > span {
      font-size: 23px;
      color: #FFC76E;
    }
  }

  div:nth-of-type(2) {
    font-size: 14px;
    color: #FFFFFF;
    font-weight: bold;
  }
}

.free-btn {
  font-size: 15px;
  color: #FFFFFF;
  line-height: 23px;
  background: #E11C23;
  width: max-content;
  padding: 3px 10px;
  transform: skewX(-15deg);
  font-weight: bold;
  margin-top: 10px;
  margin-left: auto;
  cursor: pointer;
  opacity: .85;

  &:hover {
    opacity: 1;
  }
}


@media screen and (max-width: 800px) {
  #year-main {
    padding-top: 130%;
    background: url("../../assets/image/festival/bannerM.png") no-repeat top left / 100%,
    url('../../assets/image/festival/banMbot.png') #140d11 no-repeat bottom left / 100%;
    padding-bottom: 50px;
  }

  .step-img {
    margin-top: 40px;

    img {
      width: 45%;
    }
  }

  .festival-rank {
    padding: 5px;

    .rank-item {
      width: 98%;
      margin: auto;
    }
  }

  .rank-list > div:nth-of-type(1) {
    width: 30%;
  }

  .rank-list > div:nth-of-type(2) {
    width: 30%;
  }

  .check-btn > div:nth-of-type(1) {
    width: 30%;
  }

  .check-btn > div:nth-of-type(2) {
    width: 30%;
  }

  .year-content {
    width: 100%;
  }

  .guess-box {
    flex-wrap: wrap;

    .guess-img {
      width: 99%;
      margin: auto;
    }

    .guess-text {
      width: 99%;
      padding: 15px;
      margin: auto;
    }
  }

  .publicity-time {
    width: 80%;
  }

  .free-title {
    img {
      width: 50%;
    }
  }

  .free-box {
    flex-wrap: wrap;
    width: 100%;

    .free-item {
      width: 49%;

      > div:nth-of-type(1) {
        width: 100%;
        height: auto;
      }
    }

    .free-text {
      padding-left: 15%;
    }
  }

  .free-roll {
    flex-wrap: wrap;
    width: 100%;

    > .roll-item {
      width: 98%;
      margin: 0 auto 80px;
    }
  }

  .rank-user-info > div span {
    font-size: 13px;
  }

  .rank-user-info > div {
    > div:nth-of-type(1) {
      margin-right: 15px;
    }
  }

  .festival-rank .rank-item {
    background-size: 100% 100%;
    margin-bottom: .2rem;
  }

  .guess-game {
    > span {
      font-size: 12px;
      bottom: 7%;
    }

    .charge-pay {
      bottom: -4%;
    }

    p {
      font-size: 13px;

      > span {
        font-size: 20px;
        margin-left: 5px;
      }
    }

    div {
      width: 75%;
      font-size: 15px;
    }
  }

  .totle-money {
    padding: 0 10px;

    > div:nth-of-type(1) {
      font-size: 14px;

      > span {
        font-size: 16px;
      }
    }
  }
}
</style>