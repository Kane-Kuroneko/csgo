<template>
  <div class="drop-page">
    <div>
      <div class="drop-progress">
        <div class="item" v-show="condition.hashInterval">
          <div class="progress-info">
            <div>
              <div class="condition-name">
                <div>
                  <div></div>
                </div>
                <p> Hash开箱额外掉落任务条件</p>
              </div>
              <div class="condition-info">
                <div v-if="false">
                  <div><i style="color:#7DE1FF" class="iconfont icon-arrow"></i></div>
                  <div> 首次触发条件：房间中开<span> ${{ condition.hashSingleOpenBoxAmount }} </span>以上的箱子第
                    <span> {{ condition.hashStartingValue }} </span> 次首次触发额外掉落
                  </div>
                </div>
                <div>
                  <div><i style="color:#7DE1FF" class="iconfont icon-arrow"></i></div>
                  <div>掉落条件：
                    每开 <span>{{ condition.hashInterval }}</span> 个 <span> ${{ condition.hashSingleOpenBoxAmount }} </span>
                    以上的箱子，触发 <span>1</span> 次额外掉落（重复达到条件，重复掉落）
                  </div>
                </div>
              </div>
            </div>
            <div align="center">
              <img src="../assets/image/drop/hashlogo.png" alt="">
            </div>
          </div>
          <div class="progress-block">
            <div class="progress-title">
              <p>额外掉落进度</p>
              <div v-show="condition.isHashStart && condition.hashProgress+1 === condition.hashInterval"><i
                  class="iconfont iconicon-select"></i> 已掉落
              </div>
            </div>
            <div class="progress-item">
              <div v-for="(el,idx) in condition.hashInterval" :key="idx +7">
                <div
                    :class="{'active':condition.isHashStart && idx <= condition.hashProgress}"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="condition.upgradeInterval" class="item">
          <div class="progress-info">
            <div>
              <div class="upgrade-title condition-name">
                <div>
                  <div></div>
                </div>
                <p> 升级额外掉落任务条件</p>
              </div>
              <div class="condition-info">
                <div v-if="false">
                  <div><i style="color:#8A59D7" class="iconfont icon-arrow"></i></div>
                  ，每三次触发1次额外掉落；（每三次掉落一次，可无限重复）
                  <div>首次触发条件： 献祭消耗总金额 <span> ${{ condition.upgradeAmount }} </span>5 以上，成功率为
                    <span> {{ condition.upgradeProbability * 100 }}% </span> 以下第
                    <span> {{ condition.upgradeStartingValue }} </span>次触发1次额外掉落；（每三次掉落一次，可无限重复）
                  </div>
                </div>
                <div>
                  <div><i style="color:#8A59D7" class="iconfont icon-arrow"></i></div>
                  <div>掉落条件： 献祭消耗总金额 <span> ${{ condition.upgradeAmount }} </span> 以上，成功率为
                    <span> {{ condition.upgradeProbability * 100 }}% </span> 以下第
                    <span> {{ condition.upgradeInterval }} </span>次触发额外掉落（每
                    <span>{{ condition.upgradeInterval }}</span> 次掉落一次，可无限重复）
                  </div>
                </div>
              </div>
            </div>
            <div align="center">
              <img src="../assets/image/drop/uplogo.png" alt="">
            </div>
          </div>
          <div class="progress-block">
            <div class="progress-title" style="color: #AD85ED; border-left: 2px solid #AD85ED">
              <p style="color:#AD85ED;">额外掉落进度</p>
              <div v-show="condition.isUpgradeStart && condition.upgradeProgress+1  === condition.upgradeInterval">
                <i class="iconfont iconicon-select"></i> 已掉落
              </div>
            </div>
            <div class="progress-item" style="border-left: 1px solid #AD85ED">
              <div v-for="(el,idx) in condition.upgradeInterval" :key="idx">
                <div
                    :class="{'active':condition.isUpgradeStart && idx <= condition.upgradeProgress }"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="condition.battleInterval" class="item">
          <div class="progress-info">
            <div>
              <div class="battle-title condition-name">
                <div>
                  <div></div>
                </div>
                <p>对战额外掉落任务条件</p>
              </div>
              <div class="condition-info">
                <div v-if="false">
                  <div><i style="color:#667A97 " class="iconfont icon-arrow"></i></div>
                  <div>首次触发条件：开 <span> ${{ condition.battleAmount }} </span>以上的Hash箱子第
                    <span> {{ condition.battleStartingValue }} </span>次首次触发额外掉落
                  </div>
                </div>
                <div>
                  <div><i style="color: #667A97" class="iconfont icon-arrow"></i></div>
                  <div>掉落条件：
                    对战中每开 <span>{{ condition.battleInterval }}</span> 个 <span> ${{ condition.battleAmount }} </span>
                    以上的箱子，触发 <span>1</span> 次额外掉落（重复达到条件，重复掉落）
                  </div>
                </div>
              </div>
            </div>
            <div align="center">
              <img src="../assets/image/drop/vslogo.png" alt="">
            </div>
          </div>
          <div class="progress-block">
            <div class="progress-title" style="border-left: 2px solid #8FA7CB; ">
              <p style="color:#8FA7CB;">额外 掉落进度</p>
              <div v-show="condition.isBattleStart && condition.battleProgress+1 ===condition.battleInterval">
                <i class="iconfont iconicon-select"></i> 已掉落
              </div>
            </div>
            <div class="progress-item" style="border-left: 1px solid #8FA7CB;">
              <div v-for="(el,idx) in condition.battleInterval" :key="idx+10">
                <div
                    :class="{'active':condition.isBattleStart  &&  idx <= condition.battleProgress}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="jackpot-title">
        <img src="../assets/image/drop/info.jpg" class="hide-m" alt="">
        <img src="../assets/image/drop/infom.jpg" class="hide-p" alt="">
      </div>
      <div>
        <div class="jackpot-tap">
          <div @click="navTab('boxSKinInfo',1)" :class="{'active': type === 'boxSKinInfo'}"
               v-show="condition.hashInterval"></div>
          <div @click="navTab('upgradeSKinInfo',2)" :class="{'active': type === 'upgradeSKinInfo'}"
               v-show="condition.upgradeInterval"></div>
          <div @click="navTab('battleSKinInfo',3)" :class="{'active': type === 'battleSKinInfo'}"
               v-show="condition.battleInterval"></div>
        </div>
        <div class="jackpot-li">
          <ul>
            <li v-for="el in itemData" :key="el.price+type">
              <div style="min-height: 18px"><span v-show="el.price">$</span> {{ el.price }}</div>
              <div class="gun-img" align="center">
                <img :src="imgHost(el.image)" alt="">
              </div>
              <div class="jackpot-skins" :class="'border-left-'+conversionStyle(el.rarity,el.category)">
                <p class="over-flow-hide">{{ el.name.split('|')[0] }}</p>
                <p class="over-flow-hide">{{ el.name.split('|')[1] ? el.name.split('|')[1] : '' }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getAction} from "@/api/manage";

export default {
  name: "Drop",
  data() {
    return {
      url: {
        box: '/api/drop/home/page'
      },
      dropData: [],
      itemData: [],
      type: 1,
      condition: {}
    }
  },
  created() {
    this.getDropData()
  },
  methods: {
    navTab(type) {
      this.type = type
      this.itemData = this.dropData[type]
    },
    getDropData() {
      getAction(this.url.box).then(res => {
        this.dropData = res.data.skinsInfo
        let userProgress = res.data.userProgressMap
        let type = userProgress.hashInterval ? 'boxSKinInfo' : userProgress.upgradeInterval ? 'upgradeSKinInfo' : 'battleSKinInfo'
        this.type = userProgress.hashInterval ? 'boxSKinInfo' : userProgress.upgradeInterval ? 'upgradeSKinInfo' : 'battleSKinInfo'
        this.itemData = this.dropData[type]
        this.handleData(res.data.userProgressMap)
      })
    },
    handleData(data) {
      data.isHashStart = data.openNumber > data.hashStartingValue
      data.hashProgress = data.hashInterval === 1 ? 1 : (data.openNumber - data.hashStartingValue - 1) % data.hashInterval
      data.isUpgradeStart = data.upgradeNumber > data.upgradeStartingValue
      data.upgradeProgress = data.upgradeInterval === 1 ? 1 : (data.upgradeNumber - data.upgradeStartingValue - 1) % data.upgradeInterval
      data.isBattleStart = data.battleNumber > data.battleStartingValue
      data.battleProgress = data.battleInterval === 1 ? 1 : (data.battleNumber - data.battleStartingValue - 1) % data.battleInterval
      this.condition = data
    },
  }
}
</script>

<style scoped lang="less">
.drop-page {
  padding-top: 35%;
  background: url("../assets/image/drop/banner.jpg") #111419 no-repeat top left / 100%;

  > div {
    width: 1368px;
    margin: auto;
  }
}

.gun-img {
  height: 100px;

  img {
    height: 90%;
  }
}

.drop-progress {
  display: flex;
  justify-content: space-around;

  > div:nth-of-type(1) {
    background: url("../assets/image/drop/hashbg.png") no-repeat top left / cover;
  }

  > div:nth-of-type(2) {
    background: url("../assets/image/drop/upgradbg.png") no-repeat top left / cover;
  }

  > div:nth-of-type(3) {
    background: url("../assets/image/drop/battlebg.png") no-repeat top left / cover;
  }

  .item {
    width: 429px;
    padding: 24px 24px 8px 24px;
  }

  .progress-info {
    display: flex;
  }

  .progress-info > div:nth-of-type(1) {
    width: 250px;
  }

  .progress-info > div:nth-of-type(2) {
    flex: 1;

    img {
      width: 100%;
    }
  }


  .condition-name {
    font-size: 17px;
    font-family: FZLanTingHei-B-GBK;
    font-weight: 600;
    color: #FFFFFF;
    background: linear-gradient(180deg, #48BECC 0%, #C3F9FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    > div {
      height: 15px;
      width: 15px;
      outline: 2px solid #5CF0FF;
      border-radius: 50%;
      position: relative;
      margin-right: 5px;

      div {
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background: #5CF0FF;
        margin: 5px auto;
        //position: absolute;
        //top: 50%;
        //left: 50%;
        //transform: translate(-50%,-50%);
      }
    }
  }

  .upgrade-title {
    color: #C49FFE;
    font-family: FZLanTingHei-B-GBK;
    background: linear-gradient(180deg, #C49FFE 0%, #E9DBFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    > div {
      outline: 2px solid #C49FFE;

      div {
        background: #C49FFE;
      }
    }
  }

  .battle-title {
    color: #FFFFFF;
    font-family: FZLanTingHei-B-GBK;
    background: linear-gradient(180deg, #A8C3EB 0.146484375%, #E4EFFF 99.31640625%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    > div {
      outline: 2px solid #A8C3EB;

      div {
        background: #A8C3EB;
      }
    }
  }

  .condition-info > div {
    display: flex;

    i {
      font-size: 12px;
    }

    > div:nth-of-type(1) {
      padding-top: 6px;
    }

    > div {
      margin-bottom: 15px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #AFBCD1;
      margin-right: 10px;
    }

    span {
      color: #FFC852;
      font-size: 15px;
      font-weight: bolder;
    }
  }
}

.progress-block {
  background: rgba(17, 20, 26, 0.5);

  .progress-title {
    border-left: 2px solid #45898F;
    padding-left: 14px;
    padding-bottom: 4px;
    padding-top: 4px;
    display: flex;

    p {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #5DF2FF;
      margin-right: 20px;
    }

    > div {
      color: #10A773;
    }
  }

  .progress-item {
    display: flex;
    border-left: 1px solid #45898F;
    padding-left: 14px;
    padding-bottom: 5px;
    padding-top: 4px;

    > div {
      width: 37px;
      height: 11px;
      background: rgba(5, 5, 43, 0);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 1px;

      > div {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);

        &.active {
          background: linear-gradient(0deg, #1D3FB2, #1BB8FF);
          box-shadow: 0px 1px 7px 1px #50FFFD inset;
        }
      }
    }
  }
}

.jackpot-title {
  margin: 24px 0 14px 0;

  img {
    width: 100%;
  }
}

.jackpot-tap {
  display: flex;
  width: 780px;
  justify-content: space-around;
  margin: 14px auto 47px;

  > div:nth-of-type(1) {
    background: url("../assets/image/drop/hashtitle.png") no-repeat center center / 100%;

    &:hover {
      background: url("../assets/image/drop/hashhover.png") no-repeat center center / 100%;
    }

    &.active {
      background: url("../assets/image/drop/hashhover.png") no-repeat center center / 100%;
    }
  }

  > div:nth-of-type(2) {
    background: url("../assets/image/drop/upTitle.png") no-repeat center center / 100%;

    &:hover {
      background: url("../assets/image/drop/uphover.png") no-repeat center center / 100%;
    }

    &.active {
      background: url("../assets/image/drop/uphover.png") no-repeat center center / 100%;
    }
  }

  > div:nth-of-type(3) {
    background: url("../assets/image/drop/battleTitle.png") no-repeat center center / 100%;

    &:hover {
      background: url("../assets/image/drop/battlehover.png") no-repeat center center / 100%;
    }

    &.active {
      background: url("../assets/image/drop/battlehover.png") no-repeat center center / 100%;
    }
  }

  > div {
    width: 255px;
    height: 60px;
    cursor: pointer;
    margin-right: 13px;

    &.active {
      transform: scale(1.05);
    }

    img {
      width: 100%;
    }
  }
}

.jackpot-li {
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      padding: 17px 15px;
      width: 188px;
      height: 205px;
      background: url("../assets/image/drop/skinsbg.png") no-repeat center center / 80%,
      linear-gradient(0deg, rgba(19, 16, 39, .5), rgba(42, 39, 94, .5));
      box-shadow: 0 0 20px 7px rgba(38, 72, 111, 0.35) inset;
      margin: 0 0 9px 6px;

      div:nth-of-type(1) {
        font-size: 14px;
        font-family: 'PingFang SC';
        font-weight: 600;
        color: #FFFFFF;

        > span {
          color: #FCC601;
        }
      }

      .jackpot-skins {
        margin-top: 21px;
        padding-left: 10px;

        p {
          font-size: 12px;
          font-family: 'FZLanTingHei-B-GBK';
          font-weight: 400;
          color: #AFBBD1;
          line-height: 15px;
        }
      }
    }
  }

}

@media screen and (max-width: 767px) {
  .drop-page {
    background: url("../assets/image/drop/bannerm.jpg") #111419 no-repeat top left / 100%;
    padding-top: 500px;
  }

  .gun-img {
    height: 80px;

    img {
      height: 90%;
    }
  }

  .drop-progress {
    flex-wrap: wrap;

    .item {
      width: 92%;
      margin: 0 auto 10px;
      padding: 12px 12px 4px 12px;
    }
  }

  .jackpot-li {
    width: 100%;

    ul {
      flex-wrap: wrap;

      li {
        width: 31%;
        margin: 0 0 9px 2%;
        height: auto;
        padding: 7px 5px;

        .jackpot-skins {
          margin-top: 5px;
        }
      }
    }
  }

  .drop-page > div {
    width: 100%;
  }

  .jackpot-tap {
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin: 14px auto 0;

    > div {
      width: 32%;
      margin-right: 0;
    }
  }
}
</style>