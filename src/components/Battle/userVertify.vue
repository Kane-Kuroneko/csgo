<template>
  <hash-module v-model="show" title="验证结果Hash" :width="10">

    <div class="ver-user">
      <div class="ver-item" :class="{'active':idx === index }" v-for="(el,idx) in hashHistory"
           @click="chosedData = el.skinsInfo;index=idx">
        <SkinsAvatar
            wd="40px"
            ht="40px"
            :img="el.avatar"
            :head-frame="el.headPortraitBox"
        >
        </SkinsAvatar>
        <!--        <img :src="imgHost(el.avatar)" alt="">-->
        <p class="over-flow-hide">{{el.name}}</p>
      </div>
    </div>
    <div class="ver-seed">
      <div class="modal-his-item" v-for="item in chosedData">
        <Row v-if="!$store.state.account.isPhone">
          <ColC span="6">
            <skins-item :skins-data="[item]" :is-probability="true"></skins-item>
          </ColC>
          <ColC span="18">
            <div style="padding: 10px 15px">
              <div class="skins-belong">
                <div>
                  <img :src="imgHost(item.background)" alt="">
                  <img :src="imgHost(item.image)" alt="">
                </div>
                <div>物品所属箱子：{{item.boxName}}</div>
              </div>
              <div class="his-p" style="padding: .1rem">
                <p>服务器种子Hash：{{ item.calculateLog.serverHash }}</p>
                <p>服务器种子: {{ item.calculateLog.serverKey }}</p>
                <p>用户种子: {{ item.calculateLog.clientKey }}</p>
                <p>结果种子Hash: {{ item.calculateLog.resultHash }}</p>
                <p :title="parseFloat((parseInt(sha256_digest(item.calculateLog.clientKey +
                                    item.calculateLog.serverKey).substring(0,6),16)/parseInt('ffffff',16)))">
                  Number = {{sha256_digest(item.calculateLog.clientKey + item.calculateLog.serverKey).substring(0, 6)
                  }}(16进制)
                  / ffffff(16进制)=
                  {{parseInt(sha256_digest(item.calculateLog.clientKey + item.calculateLog.serverKey).substring(0, 6),
                  16) || '暂无' }}
                  / {{ parseInt('ffffff', 16) }} =
                  <br/>
                  <span style="color: rgb(101, 255, 175);">{{parseFloat((parseInt(sha256_digest(item.calculateLog.clientKey + item.calculateLog.serverKey).substring(0, 6), 16) / parseInt('ffffff', 16))) || '暂无'}}</span>
                </p>
              </div>
              <div class="upgrade-btn-box">
                <div class="default-btn" @click="goEmn(item.calculateLog.serverHash)">验证</div>
                <div class="default-btn"
                     @click="go16(sha256_digest(item.calculateLog.clientKey + item.calculateLog.serverKey).substring(0,6))">
                  16进制转换
                </div>
              </div>
            </div>
          </ColC>
        </Row>
        <Row v-else>
          <ColC span="24">
            <skins-item :skins-data="[item]" :is-probability="true"
                        style="width: 50%;margin: auto"></skins-item>
            <div style="margin-top: 10px">
              <div class="skins-belong">
                <div>
                  <img :src="imgHost(item.background)" alt="">
                  <img :src="imgHost(item.image)" alt="">
                </div>
                <div>物品所属箱子：{{item.boxName}}</div>
              </div>
              <div class="his-p" style="padding: .1rem">
                <p>服务器种子Hash:<br>{{ item.calculateLog.serverHash }}</p>
                <p>服务器种子:<br>{{ item.calculateLog.serverKey }}</p>
                <p>用户种子:<br>{{ item.calculateLog.clientKey }}</p>
                <p>结果种子Hash:<br>{{ item.calculateLog.resultHash }}</p>
                <p :title="parseFloat((parseInt(sha256_digest(item.calculateLog.clientKey +
                                    item.calculateLog.serverKey).substring(0,6),16)/parseInt('ffffff',16)))">
                  Number = {{sha256_digest(item.calculateLog.clientKey + item.calculateLog.serverKey).substring(0,
                  6)}}(16进制)
                  / ffffff(16进制)=
                  {{parseInt(sha256_digest(item.calculateLog.clientKey + item.calculateLog.serverKey).substring(0, 6),
                  16) || '暂无'}}
                  / {{ parseInt('ffffff', 16) }} =
                  <br/>
                  <span style="color: rgb(101, 255, 175);">{{parseFloat((parseInt(sha256_digest(item.calculateLog.clientKey + item.calculateLog.serverKey).substring(0, 6), 16) / parseInt('ffffff', 16))) || '暂无'}}</span>
                </p>
              </div>
              <div class="upgrade-btn-box">
                <div class="default-btn" @click="goEmn(item.calculateLog.serverHash)">验证</div>
                <div class="default-btn"
                     @click="go16(sha256_digest(item.calculateLog.clientKey + item.calculateLog.serverKey).substring(0,6))">
                  16进制转换
                </div>
              </div>
            </div>
          </ColC>
        </Row>
      </div>
    </div>
  </hash-module>
</template>

<script>

  import {sha256_digest} from '../../utils/sha256'
  import {getAction} from "../../api/manage";

  export default {
    name: "userVerify",
    data() {
      return {
        sha256_digest,
        show: false,
        hashHistory: [],
        chosedData: [],
        index: 0,
        url: {
          verify: '/api/battle/get/stuff/info'
        }
      }
    },
    methods: {
      getVerify() {
        let parmas = {roomId: this.$parent.roomId}
        if (this.hashHistory.length > 0) return this.show = true
        getAction(this.url.verify, parmas).then(res => {
          res.data.forEach(item => {
            item.skinsInfo.forEach(el => {
              el.calculateLog = JSON.parse(el.calculateLog)
              el.name = el.skinsName
              el.image = el.skinsImage
              el.price = el.skinsPrice
            })
          })
          this.hashHistory = res.data
          this.chosedData = this.hashHistory[this.index].skinsInfo
          this.show = true
        })
      },
      goEmn(str) {
        this.$copyText(str).then((e) => {
          this.$Message.success('复制成功')
          window.open('https://emn178.github.io/online-tools/sha256.html', '_blank')
        });
      },
      go16(str) {
        this.$copyText(str).then((e) => {
          this.$Message.success('复制成功')
          window.open('https://tool.oschina.net/hexconvert/', '_blank')
        });
      },
    }
  }
</script>

<style scoped lang="less">
  .ver-user{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }

  .ver-item{
    width: 24.5%;
    height: 51px;
    background: #22263F;
    border-bottom: 2px solid #ffffff;
    display: flex;
    align-items: center;
    padding: 0 9px;
    cursor: pointer;
    margin-right: .5%;

    &.active{
      border-bottom: 2px solid #FFC069;

      p{
        color: #FFC069;
      }
    }

    &:hover{
      border-bottom: 2px solid #FFC069;

      p{
        color: #FFC069;
      }
    }

    img{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }

    p{
      font-size: 14px;
    }

  }

  .ver-seed{
    max-height: 500px;
    overflow: auto;
  }

  @media screen and (max-width: 800px){
    .ver-seed{
      max-height: 300px;
    }

    .ver-item{
      width: 49%;
      margin-right: 1%;
      margin-bottom: 10px;
    }
  }
</style>
