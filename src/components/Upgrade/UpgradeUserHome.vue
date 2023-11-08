<template>
  <div class="upgrade-user">
    <Title name="饰品升级"></Title>
    <div class="user-main">
      <div class="go-back war-hover" v-if="!isPhone">
        <img class="cursor" src="../../assets/image/upgrade/Hall/goback.png" @click="$router.go(-1)" alt=""
             style="width:100%">
      </div>
      <div class="user-info-up">
        <SkinsAvatar
            wd="120px"
            ht="120px"
            :img="userInfo.userAvatar"
        ></SkinsAvatar>
        <p>{{userInfo.userName}}</p>
        <div class="item-flex">
          <div>关注：<span>{{userInfo.attentionNumber}}</span></div>
          <div>粉丝：<span>{{userInfo.quiltAttentionNumber}}</span></div>
          <div class="cursor">
            <i class="iconfont icon-icon_heart"></i>
            <span> {{userInfo.thumbsUpNumber}}</span></div>
        </div>
      </div>
      <div class="focus cursor" v-if="+id !== user.id" @click="focusUser">
        <i class="iconfont icon-icon_heart" v-show="!userInfo.attention"></i><span> {{!userInfo.attention ? '关注TA':'取消关注'}}</span>
      </div>
    </div>
    <div class="focus-num">
      <div class="user-foucs-info">
        <div class="upgrade-times">
          <img src="../../assets/image/upgrade/Hall/shengji.png" alt="">
          <div>
            <p :class="{'un':userInfo.num === null}">
              <i class="iconfont icon-icon_view1" v-if="userInfo.num === null"></i>{{userInfo.num!==
              null?userInfo.num:'未公开'}}
            </p>
            <P>升级次数 <span v-if="+id===user.id">({{userInfo.privacy.upgradeNum ? '已隐藏' : '已公开'}})</span></P>
          </div>
        </div>
        <div class="upgrade-times">
          <img src="../../assets/image/upgrade/Hall/winicon.png" alt="">
          <div>
            <p :class="{'un':userInfo.rate === null}" style="color: #50FFA4">
              <i class="iconfont icon-icon_view1" v-if="userInfo.rate === null"></i>
              {{userInfo.rate!== null?(userInfo.rate*100).toFixed(2)+'%':'未公开'}}</p>
            <P>升级成功率 <span v-if="+id===user.id">({{userInfo.privacy.upgradeRate? '已隐藏' : '已公开'}})</span></P>
          </div>
        </div>
        <div class="upgrade-times">
          <img src="../../assets/image/upgrade/Hall/times.png" alt="">
          <div>
            <p :class="{'un':userInfo.multiple === null}" style="color: #FFCA6E">
              <i class="iconfont icon-icon_view1" v-if="userInfo.multiple === null"></i>{{userInfo.multiple!==
              null?userInfo.multiple:'未公开'}}
            </p>
            <P>{{!isPhone? '升级单次最高倍率' : '最高倍率'}}<span v-if="+id===user.id">({{userInfo.privacy.upgradeMultiple ? '已隐藏' : '已公开'}})</span>
            </P>
          </div>
        </div>
      </div>
      <div class="hide-focus">
        <div class="lucky-seed">
          幸运种子：{{userInfo.userSeed ? userInfo.userSeed : "暂无数据"}} <span v-if="userInfo.privacy">（{{
          userInfo.privacy.upgradeSeed ? '已隐藏' : '已公开'}}）</span>
        </div>
        <div class="set-primary cursor" v-if="+id === user.id" @click="show= true">
          设置数据隐私
        </div>
      </div>
    </div>

    <div class="user-up-record">
      <ul v-if="userRecord.length > 0">
        <li v-for="item in userRecord">
          <div :class="{'active': item.isOpen}" class="user-up-skins">
            <div v-show="!item.isOpen && !isPhone" class="time">{{item.createdTime.split(' ')[0]}}
              <span>{{item.createdTime.split(' ')[1]}}</span></div>
            <div class="skins-price">
              <div class="price-item">
                <div>
                  <img :src="imgHost(item.leftStuffImage)" alt="" v-if="item.leftStuffImage">
                  <img src="../../assets/image/upgrade/Hall/diamond.png" style="width: 70px" alt="" v-else>
                  <div v-if="item.consumeSkinsPrice ">
                    <i class="iconfont icon-icon_diamond1" style="font-size: 12px"></i> {{item.consumeSkinsPrice }}
                  </div>
                </div>
                <P v-if="!!item.leftStuffName" class="over-flow-hide"
                   :class="'border-left-' + conversionStyle(item.leftRarity,item.leftExterior)">
                  {{item.leftStuffName.split("|")[0]}}<br/>{{item.leftStuffName.split("|")[1]}}</P>
                <p class="user-price" v-else>{{item.leftAmount}}</p>
              </div>

              <div align="center" class="point-color">
                <img src="../../assets/image/upgrade/upgradeSucces.png" v-if="!item.result " alt="">
                <img src="../../assets/image/upgrade/upgradePoint.png" v-else alt="">
                <div :class="{'success' : !item.result }">{{item.upgradeResult.startSection}} -
                  {{item.upgradeResult.endSection}}
                </div>
                <p v-if="item.leftAmount &&  item.consumeSkinsPrice">+ <i
                    class="iconfont icon-icon_diamond1"></i><span> {{item.leftAmount}}</span>
                </p>
              </div>
              <div class="price-item">
                <div>
                  <img :src="imgHost(item.rightStuffImage)" alt="">
                  <div><i class="iconfont icon-icon_diamond1" style="font-size: 12px"></i> {{item.targetSkinsPrice}}
                  </div>
                </div>
                <P class=" over-flow-hide"
                   :class="'border-left-' + conversionStyle(item.rightRarity,item.rightExterior)">
                  {{item.rightStuffName.split("|")[0]}}
                  <br>
                  {{item.rightStuffName.split("|")[1]}}</P>
              </div>
            </div>
          </div>
          <div :class="{'active': !item.isOpen }" class="user-up-seed">
            <p @click="item.isOpen = !item.isOpen">验证HASH <i class="iconfont icon-icon_arrow"></i></p>
            <div class="hash-seed" :class="{'active': item.isOpen }">
              <div class="over-flow-hide"><span>服务器种子Hash:</span> {{item.upgradeResult.serverHash}}</div>
              <div class="over-flow-hide"><span>服务器种子: </span> {{item.upgradeResult.serverSeed}}</div>
              <div class="over-flow-hide"><span>用户种子:</span>{{item.upgradeResult.userSeed}}</div>
              <div class="over-flow-hide"><span>结果种子Hash:</span>{{item.upgradeResult.resultHash}}</div>
              <div><span>Number={{item.upgradeResult.resultHash.substring(0,6)}}（16进制）/ ffffff（16进制）= {{item.upgradeResult.hash16}} /
                16777215 = {{item.upgradeResult.number}}</span></div>
              <div class="btn-hash">
                <div class="war-hover" @click="goEmn(item.upgradeResult.serverHash)">检测</div>
                <div class="war-hover" @click="go16(item.upgradeResult.resultHash.substring(0,6))">16进制转换</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <Empty v-else title="暂无升级记录"></Empty>
    </div>
    <div class="page-box" style="margin: 50px auto" v-if="userRecord.length >0">
      <Page class="mar-auto" :current="searchForm.current" :total="searchForm.total" :page-size="12"
            @on-change="jumpBoxFunc"/>
    </div>
    <hash-module v-model="show" title="设置隐私数据">
      <div v-if="user.id ==id">
        <div class="set-privacy">
          <img src="../../assets/image/upgrade/Hall/shengji.png" alt="" class="privacy-img">
          <p class="privacy-type">升级次数</p>
          <div class="privacy-btn">
            <div :class="{'active': !userInfo.privacy.upgradeNum}" @click="changStatus(1,0)">公开</div>
            <div :class="{'active': userInfo.privacy.upgradeNum}" @click="changStatus(1,1)">隐藏</div>
          </div>
        </div>
        <div class="set-privacy">
          <img src="../../assets/image/upgrade/Hall/winicon.png" alt="" class="privacy-img">
          <p class="privacy-type">升级成功率</p>
          <div class="privacy-btn">
            <div :class="{'active': !userInfo.privacy.upgradeRate}" @click="changStatus(2,0)">公开</div>
            <div :class="{'active': userInfo.privacy.upgradeRate}" @click="changStatus(2,1)">隐藏</div>
          </div>
        </div>
        <div class="set-privacy">
          <img src="../../assets/image/upgrade/Hall/times.png" alt="" class="privacy-img">
          <p class="privacy-type">升级单次最高倍率</p>
          <div class="privacy-btn">
            <div :class="{'active': !userInfo.privacy.upgradeMultiple}" @click="changStatus(3,0)">公开</div>
            <div :class="{'active': userInfo.privacy.upgradeMultiple}" @click="changStatus(3,1)">隐藏</div>
          </div>
        </div>
        <div class="set-privacy">
          <img src="../../assets/image/upgrade/Hall/seed.png" alt="" class="privacy-img">
          <p class="privacy-type">幸运种子</p>
          <div class="privacy-btn">
            <div :class="{'active': !userInfo.privacy.upgradeSeed}" @click="changStatus(4,0)">公开</div>
            <div :class="{'active': userInfo.privacy.upgradeSeed}" @click="changStatus(4,1)">隐藏</div>
          </div>
        </div>
      </div>
    </hash-module>
  </div>
</template>

<script>
  import Title from "../Title";
  import {url} from "../../api/upgradeApi";
  import {getAction, postAction} from "../../api/manage";
  import {mapState} from "vuex";
  import Empty from "../Empty/Empty";

  export default {
    components: {Title, Empty},
    name: "UpgradeUserHome",
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        url,
        show: false,
        isThumb: false,
        userInfo: {
          privacy: {
            upgradeNum: 0,
            upgradeRate: 0,
            upgradeMultiple: 0,
            upgradeSeed: 0,
          }
        },
        userRecord: [],
        isPhone: this.$store.state.account.isPhone,
        searchForm: {
          current: 1,
          size: 12,
          total: 10,
          userId: this.id
        }
      }
    },
    created() {
      this.getUserInfo();
      this.getRecord();
    },
    computed: {
      ...mapState('account', ['user']),
    },
    methods: {
      changStatus(type, status) {
        if (+this.id !== this.user.id) return
        let params = {type: type, status: status}
        postAction(url.privacy, params).then(() => {
          this.getUserInfo();
          this.$Message.success(`${status === 0 ? '公开' : '隐藏'}成功`)
        })
      },
      getUserInfo() {
        let link = +this.id === this.user.id ? url.selfInfo : url.userInfo;
        getAction(link, +this.id === this.user.id ? "" : {userId: this.id}).then(res => {
			  ;
          this.userInfo = res.data;
        })
      },
      getRecord(page = 1) {
        this.searchForm.current = page;
        getAction(url.userRecord, this.searchForm).then(res => {
          res.data.records.forEach(el => {
            el.upgradeResult = JSON.parse(el.upgradeResult);
            el.isOpen = false;
          })
          this.searchForm.current = page;
          this.searchForm.total = res.data.total;
          this.userRecord = res.data.records;
        })
      },
      thumbPeople() {
        if (this.userInfo.thumbsUp) return
        let params = {usreId: this.userInfo.userId};
        postAction(url.thumb, parmas).then(res => {
          this.$Message.success('点赞成功');
          this.isThumb = true;
        }).catch(e => {
          this.$Message.error(e.response.data.errMsg);
        })
      },
      focusUser() {
        if (!this.user.id) return this.$login();
        let parmas = this.userInfo.attention ? {userId: this.id} : {ids: this.id};
        let url = this.userInfo.attention ? this.url.cancelFocus : this.url.touch;
        postAction(url, parmas).then(() => {
          this.$Message.success(this.userInfo.attention ? '已取消关注' : '关注成功');
          this.getUserInfo();
        }).catch(e => {
          this.$Message.success(e.response.data.errMsg);
        })
      },
      jumpBoxFunc(page) {
        this.getRecord(page);
      },
    }

  }
</script>

<style scoped lang="less">
  .user-main{
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    height: 150px;

    > div:nth-of-type(2){
      margin: auto;
    }

    > div:nth-of-type(3){
      margin-left: auto;
    }
  }

  .user-info-up{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    p{
      font-size: 17px;
      font-weight: 600;
      color: #FFFFFF;
    }

    .item-flex{
      display: flex;
      font-size: 15px;
      font-weight: 600;
      color: #FFFFFF;
      text-align: center;

      div:nth-of-type(1) span{
        color: #FFCA6E;
        font-size: 20px;
      }

      div:nth-of-type(2) span{
        color: #CA26F2;
        font-size: 20px;
      }

      div:nth-of-type(3){
        i{
          font-size: 20px;
          color: #DA2863;
        }

        span{
          color: #DA2863;
          font-size: 20px;
        }
      }

      > div{
        margin-right: 20px;
      }
    }
  }

  .focus-num{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
  }

  .focus{
    width: 116px;
    height: 32px;
    background: rgba(94, 68, 164, 0);
    border: 2px solid #DA2863;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    color: #DA2863;
    line-height: 28px;
    text-align: center;

    > span{
      display: inline-block;
      margin-left: 5px;
    }

    i{
      line-height: 28px;
    }
  }

  .user-foucs-info{
    display: flex;
  }

  .upgrade-times{
    display: flex;
    margin-right: 10px;


    i{
      font-weight: 400;
      font-size: 22px;
    }

    P:nth-of-type(1){
      font-size: 23px;
      font-weight: 600;
      color: #1EBCFF;

      &.un{
        line-height: 34px;
        font-size: 16px;
      }
    }

    P:nth-of-type(2){
      font-size: 12px;
      font-weight: 600;
      color: #FFFFFF;

      span{
        color: #595959;
      }
    }

    img{
      width: 59px;
      height: 59px;
    }
  }

  .hide-focus{
    display: flex;
  }

  .lucky-seed{
    width: 281px;
    height: 30px;
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    background: #1A1E33;
    border-radius: 2px;
    line-height: 30px;
    text-align: center;

    span{
      color: #838BB6;
    }
  }

  .set-primary{
    width: 120px;
    line-height: 30px;
    background: #5B1CF2;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
    margin-left: 10px;
  }

  .user-up-record{
    margin-top: 30px;

    ul{
      display: flex;
      flex-wrap: wrap;

      li{
        width: 30%;
        height: 251px;
        background: #2C3357;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 20px;
        margin-right: 2%;

        .user-up-skins{
          height: 218px;
          background: #191D32;
          border-radius: 8px;
          padding: 21px;
          transition: height .2s linear;
          overflow: hidden;

          &.active{
            height: 0;
            padding: 0;
          }

          .time{
            font-size: 12px;
            font-weight: 600;
            color: #FFFFFF;
            margin-bottom: 10px;

            span{
              color: #838BB6
            }
          }
        }
      }
    }

    .user-up-seed{
      > div{
        width: 96%;
        margin: 10px auto 0;
      }

      > p{
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: #FFCA6E;
        margin-top: 5px;
        cursor: pointer;

        i{
          font-size: 14px;
        }
      }
    }

  }

  .skins-price{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .point-color{
      width: 30%;
    }
  }

  .price-item{
    width: 34%;

    > p{
      margin-top: 12px;
      font-size: 12px;
      font-weight: 600;
      color: #FFFFFF;
      padding-left: 4px;
    }

    > div{
      width: 100%;
      height: 85px;
      background: #141727;
      border: 1px solid rgba(49, 58, 103, 0.5);
      box-shadow: 0 1px 19px 0 rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      img{
        width: 75%;
      }

      div{
        position: absolute;
        line-height: 13px;
        background: #07080F;
        border-radius: 2px;
        font-size: 12px;
        color: #FFCA6E;
        left: 2px;
        bottom: 2px;
        padding: 1px 5px;
      }
    }
  }

  .set-privacy{
    display: flex;
    align-items: center;
    background: #1D202B;
    margin-bottom: 10px;
    padding: 10px 20px;

    img{
      width: 15%;
    }

    p{
      font-size: 17px;
      font-weight: 600;
      color: #FFFFFF;
      max-width: 90px;
    }

    .privacy-btn{
      display: flex;
      margin-left: auto;

      > div{
        cursor: pointer;
        padding: 4px 15px;
        height: 23px;
        background: #40465F;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        color: #FFFFFF;
        margin-left: 20px;

        &.active{
          background: #763AFF;
        }
      }
    }
  }

  .price-item .user-price{
    font-size: 20px;
    font-weight: 600;
    color: #FFCA6E;
    line-height: 22px;
    text-align: center;
  }

  @media screen and (max-width: 800px){
    .user-foucs-info{
      width: 100%;
      border-radius: 13px;
      justify-content: space-between;
      background: #191D32;
      padding: 20px 10px;
      margin-bottom: 10px;
    }

    .user-info-up{
      width: 100%;

    }

    .hide-focus{
      display: block;

      > div{
        margin:10px auto;
      }
    }

    .user-up-record ul{
      li{
        width: 98%;
        margin: 0 auto 20px;
        height: auto;
        .user-up-skins{
          height: auto;
          background: #191D32;
          border-radius: 8px;
          padding: 21px;
          transition: height .2s ease-out;
          overflow: hidden;

          &.active{
            height: auto;
            padding: 21px;
          }

          .time{
            font-size: 12px;
            font-weight: 600;
            color: #FFFFFF;
            margin-bottom: 10px;

            span{
              color: #838BB6
            }
          }
        }
        .hash-seed{
          height: 0;
          transition: all .5s ease-out;
          &.active{
            height: 194px;
            margin-bottom: 20px;
            padding: 21px 13px;
          }
        }
      }
    }
    .user-up-record{
      margin-top: 10px;
    }
    .upgrade-times{
      img{
        width: 40px;
        height: 40px;
      }
    }

    .user-main{
      position: relative;
      justify-content: center;
      height: 170px;
    }

    .focus{
      width: 100px;
      position: absolute;
      top: 10px;
      right: 20px;
      margin: 0;
    }

    .focus-num{
      flex-direction: column;
    }
  }
</style>
