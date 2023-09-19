<template>
  <div class="roll-room-det ">
    <div class="mar-auto layout">
      <div class="ranking-bg" :class="{'new': newUserId && newUserId === detailData.id}">
        <Title name="ROLL 福利"></Title>
        <div class="roll-det-box">
          <div class="roll-state">
            <div class="avator-circle">
              <img :src="imgHost(detailData.image)" alt="" style="height: 100%;width: 100%">
            </div>
            <p><i class="iconfont iconicon-room"></i> {{ detailData.id }}</p>
            <div><p>{{ detailData.name }}</p></div>
            <div class="prm-bot">
              <div class="prm-gamer" style="padding: 10px">
                <p>奖池价值</p>
                <p style="font-weight: normal"><i class="iconfont icon-icon_diamond1"></i>
                  <span class="font-bold"> {{ prizesData.totalPrice }}</span>
                </p>
              </div>
              <div class="prm-gamer" style="padding: 10px">
                <p>物品数量</p>
                <p>{{ prizesData.totalNumber }}</p>
              </div>
              <div class="prm-gamer" style="padding: 10px">
                <p>参与人数</p>
                <p>{{ detailData.totalPlayer }}</p>
              </div>
            </div>
            <div class="room-instruction">
              <span>{{ detailData.description }}</span>
              <span v-if="detailData.hostUrl"> 主播链接:   <a :href="'http://' + detailData.hostUrl"
                                                          target="_blank">{{ detailData.host }}</a></span>
            </div>
            <div class="open-time">
              {{ detailData.openTime }} <span
                class="skew-box-color"><span>{{ detailData.status === 1 ? '进行中' : '已结束' }}</span></span>
            </div>
            <div @click="joinRoom" class="default-btn roll-btn hide-m"
                 :class="'roll-btn-' + roomButton.status"
                 v-if="!detailData.joined">
              {{ roomButton.title }}
              <i class="iconfont"
                 :class="detailData.type === 'roll_join_password' ? 'iconicon-password' : detailData.type === 'roll_join_task' ?  'iconicon-task' : '' "
                 style="font-size: .22rem"></i>
            </div>
            <div class="default-btn roll-btn hide-m" :class="'roll-btn-' + roomButton.status" v-else>
              {{ roomButton.title }}
              <i class="iconfont "
                 :class="detailData.type === 'roll_join_password' ? 'iconicon-password' : detailData.type === 'roll_join_task' ?  'iconicon-task' : '' "
                 style="font-size: 13px"></i>
            </div>
            <div class="mobile-join-btn hide-p hide-ipad">
              <div @click="joinRoom" class="default-btn roll-btn-m hide-p  hide-ipad"
                   :class="'roll-btn-' + roomButton.status">
                {{ roomButton.title }}
                <i class="iconfont "
                   :class="detailData.type === 'roll_join_password' ? 'iconicon-password' : detailData.type === 'roll_join_task' ?  'iconicon-task' : '' "
                   style="font-size: 13px"></i>
              </div>
            </div>
            <div class="roll-share">
              <div class="share-luck hide-m">
                <div style="margin-bottom: .2rem">
                  <i class="iconfont iconicon-explain" @click="isPrompt = !isPrompt">
                    <div class="share-popup hide-m hide-ipad">
                      <p>幸运值越高，中奖的几率越高，将福利房间分享到
                        <span>QQ/微信/微博</span>，好友通过您到链接成功参与房间，您的幸运值<span>+1，</span>幸运值最高为
                        <span>20</span>，赶紧分享提高中奖几率吧！</p>
                    </div>
                  </i>
                  <span style="font-size: .23rem;color: #FF352E"> 提高中奖机率指南</span>
                </div>
                <div class="lucky-value">
                  <p style="font-weight: bold;color: #FFFFFF">
                    幸运值：<span>{{ detailData.joined ? detailData.lucky : '请参与后查看' }}</span>
                  </p>
                  <ul>
                    分享至：
                    <li @click="shareQ">
                      <i class="iconfont iconicon-qq2"></i>
                    </li>
                    <li @click="shareWechat">
                      <i class="iconfont iconicon-wechat"></i>
                    </li>
                    <li @click="shareWeibo">
                      <i class="iconfont iconicon-xinlang"></i>
                    </li>
                    <li @click="copyFunc">
                      <i class="iconfont iconicon-link"></i>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="roll-share hide-p hide-ipad">
          <div class="share-luck ">
            <div style="margin-bottom: .2rem">
              <i class="iconfont iconicon-explain" @click="isPrompt = !isPrompt">
                <div class="share-popup hide-m hide-ipad">
                  <p>幸运值越高，中奖的几率越高，将福利房间分享到
                    <span>QQ/微信/微博</span>，好友通过您到链接成功参与房间，您的幸运值<span>+1，</span>幸运值最高为
                    <span>20</span>，赶紧分享提高中奖几率吧！</p>
                </div>
              </i>
              <span @click="phoneTips" style="font-size: .23rem;color: #FF352E"> 提高中奖机率指南</span>
            </div>
            <div class="lucky-value">
              <p style="font-weight: bold;color: #FFFFFF">
                幸运值：<span>{{ detailData.joined ? detailData.lucky : '请参与后查看' }}</span>
              </p>
              <ul>
                分享至：
                <li @click="shareQ">
                  <i class="iconfont iconicon-qq2"></i>
                </li>
                <li @click="shareWechat">
                  <i class="iconfont iconicon-wechat"></i>
                </li>
                <li @click="shareWeibo">
                  <i class="iconfont iconicon-xinlang"></i>
                </li>
                <li @click="copyFunc">
                  <i class="iconfont iconicon-link"></i>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <!--            幸运榜单-->
      <div class="roll-det-luck" v-if="luckyData.length > 0">
        <div class="drop-title">
          <img src="../assets/image/boxLine.png" alt="">
          <span> 幸运榜单 </span>
          <img src="../assets/image/boxLine.png" alt="" style="transform: rotateY(180deg);">
        </div>
        <div class="roll-luck-top">
          <div class="winning-people">
            <template>
              <div class="win-item" v-for="(el, idx) in luckyData">
                <div class="roll-avator-luck">
                  <div>
                    <img :src="imgHost(el.avatar)" alt="" style="height: 100%">
                  </div>
                </div>
                <div class="lucker-info">
                  <div class="lucker-name">
                    <p>{{ el.userName }}</p>
                    <p class="win-date">{{ el.rollTime }}</p>
                  </div>
                  <div class="lucker-goods">
                    <div class="win-picture"
                         :class="'qua-box-' + conversionStyle(item.skinsRarity,item.category)"
                         v-for="item in el.prizeList.slice(0,3)" align="center">
                      <img :src="item.image" alt="" style="width: 80%">
                    </div>
                  </div>
                  <div class="lucker-total">
                    <div>
                      共获得 <span class="important-tips">{{ el.prizeList.length }}</span> 件饰品
                      价值 <span class="important-tips"><i class="iconfont icon-icon_diamond1 font-s"></i> {{ el.reduce }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!--            奖池-->
      <div class="item-drop">
        <div class="drop-title">
          <img src="../assets/image/boxLine.png" alt="">
          <span> 奖品池 </span>
          <img src="../assets/image/boxLine.png" alt="" style="transform: rotateY(180deg);">
        </div>
        <div class="drop-del roll-jackpot" style="grid-column-gap: 0">
          <SkinsItem :skins-data="prizesData.roomPrizeList"></SkinsItem>
        </div>
      </div>
      <!--            参与人员-->
      <div class="luck-jion-people">
        <div class="drop-title ">
          <img src="../assets/image/boxLine.png" alt="">
          <span> 参与用户 </span>
          <img src="../assets/image/boxLine.png" alt="" style="transform: rotateY(180deg);">
        </div>
        <div class="jion-people" :class="{'jion-people-m': isPhone}">
          <template v-if="playerData.playerVOList.length > 0">
            <div v-for="el in playerData.playerVOList" :key="el.userId">
              <SkinsAvatar
                  wd="50px"
                  ht="50px"
                  :img="el.avatar"
                  class="portait-ava"
                  :head-frame="el.headPortraitBox"
              >
              </SkinsAvatar>
              <p style="text-align: center;color: #FFFFFF">{{ el.userName }}</p>
            </div>
          </template>
          <Empty v-else></Empty>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getAction, postAction} from "../api/manage";
  import {handleTime, getAesString, getDAesString} from '../utils/utils';
  import Empty from "../components/Empty/Empty";
  import CryptoJS from 'crypto-js'
  import {mapState} from "vuex";
  import Title from "../components/Title";

  export default {
    name: "RollDetail",
    components: {Empty, Title},
    props: {
      rollId: String
    },
    computed: {
      ...mapState('account', {
        userInfo: state => state.user
      }),
      maxWorth() {
        let skin = {price: 0}
        this.prizesData.roomPrizeList.forEach(item => {
          if (item.price > skin.price) skin = item
        })
        return skin
      },
      roomButton() {
        let isJoin = this.detailData.joined
        let status = this.detailData.status
        if (!isJoin && status === 1) {
          return {title: '立即参与', button: '', status: 1}
        } else if (!isJoin && status !== 1) {
          return {title: '已结束', button: 'over', status: 2}
        } else if (isJoin && status === 1) {
          return {title: '已参与', button: '', status: 3}
        } else if (isJoin && status === 2) {
          let userId = this.$store.state.account.user.id
          if (this.luckyData.find(data => data.userId === userId) !== undefined) {
            return {title: '恭喜中奖', button: 'winning', status: 4}
          } else {
            return {title: '未中奖', button: 'over', status: 5}
          }
        }
        return {title: '未知', button: ''}
      },
    },
    data() {
      return {
        shareLink: '',
        isPrompt: false,
        isPhone: false,
        handleTime,
        getAesString,
        getDAesString,
        newUserId: sessionStorage.getItem('newWealfare'),
        detailData: [],
        prizesData: [],
        luckyData: [],
        playerData: {},
        url: {
          detail: '/api/roll/room/details',
          player: '/api/roll/room/players',
          prizes: '/api/roll/room/prizes',
          lucky: '/api/roll/room/room/lucky'
        }
      }
    },
    created() {
      this.getRollDet(this.rollId)
      this.getPlayer(this.rollId)
      this.getPrize(this.rollId)
      this.getLuck(this.rollId)
      this.isPhone = this.$store.state.account.isPhone
    },
    watch: {
      '$route'() {
        this.getRollDet(this.rollId)
        this.getPlayer(this.rollId)
        this.getPrize(this.rollId)
        this.getLuck(this.rollId)
        this.isPhone = this.$store.state.account.isPhone
      }
    },
    // 获取roll房详情
    methods: {
      async getRollDet(rollId) {
        let params = {roomId: rollId}
        let res = await getAction(this.url.detail, params)
        this.detailData = res.data
      },
      async getPlayer(rollId) {
        let params = {roomId: rollId}
        let player = await getAction(this.url.player, params)
        this.playerData = player.data
      },
      async getPrize(rollId) {
        let params = {roomId: rollId}
        let prize = await getAction(this.url.prizes, params)
        prize.data.roomPrizeList.forEach((item) => {
          item.name1 = item.name.split('|')[0]
          item.name2 = item.name.split('|')[1]
          item.rarity = item.skinsRarity
        })
        this.prizesData = prize.data
      },
      async getLuck(rollId) {
        let params = {roomId: rollId}
        let lucky = await getAction(this.url.lucky, params)
        this.luckyData = lucky.data
      },
      phoneTips() {
        this.$Modale('中奖几率', ' <p>幸运值越高，中奖的几率越高，将福利房间分享到\n' +
         '                                                <span>QQ/微信/微博</span>，好友通过您到链接成功参与房间，您的幸运值<span>+1，</span>幸运值最高为\n' +
         '                                                <span>20</span>，赶紧分享提高中奖几率吧！</p>', 0)
      },
      shareQ() {
        this.share().then(res => {
          window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(this.shareLink) +
           '&title=97hash.com' +
           '&desc=拜托帮我助力一下，我真的很想要' + this.maxWorth.name + '。你加入了roll房之后，我们俩的幸运值都能增加！' +
           '&summary=快来和我一起参与roll房，csgo、dota2百万饰品免费领。' +
           '&pics=' + this.maxWorth.image)
        }).catch(err => {
          this.$Message.error(err)
        })
      },
      shareWechat() {
        this.share().then(res => {
          this.$copyText(this.shareLink).then((e) => {
            this.$Message.success('复制成功快去微信分享吧')
          });
          setTimeout(window.location.href = 'weixin://', 500)
        }).catch(err => {
          this.$Message.error(err)
        })
      },
      shareWeibo() {
        this.share().then(res => {
          window.open('http://service.weibo.com/share/share.php?' +
           'count=1' +
           '&url=' + encodeURIComponent(this.shareLink) +
           '&appkey=97hash.com' +
           '&title=拜托帮我助力一下，我真的很想要' + this.maxWorth.name + '。你加入了roll房之后，我们俩的幸运值都能增加！快来和我一起参与roll房，csgo、dota2百万饰品免费领。' +
           '&pic=' + this.maxWorth.image +
           '&language=zh_cn')
        }).catch(err => {
          this.$Message.error(err)
        })
      },
      copyFunc() {
        this.share().then(res => {
          this.$copyText(this.shareLink).then((e) => {
            this.$Message.success('复制成功')
          });
        }).catch(err => {
          this.$Message.error(err)
        })
      },
      share() {
        return new Promise((resolve, reject) => {
          let origin = window.location.origin
          if (!localStorage.getItem('token')) {
            this.shareLink = origin + window.location.pathname
          } else {
            this.shareLink = origin + window.location.pathname + "?share\=" + this.getAesString(CryptoJS, this.userInfo.spreadCode)
          }
          resolve()
        })
      },
      enter(password) {
        let params = {
          roomId: this.detailData.id,
          spreadCode: '',
          vcode: password.password
        }
        if (this.$route.query.share !== undefined) {
          params.spreadCode = this.getDAesString(CryptoJS, this.$route.query.share)
        }
        postAction(`/api/roll/room/join/room`, params).then(res => {
          this.$Message.success('加入成功')
          this.$store.dispatch('account/getUser')
          this.getPlayer(this.rollId)
          this.getRollDet(this.rollId)
          this.detailData = res.data
          // 新人加入roll 状态更改
          if (this.userInfo.status && this.userInfo.status === 4 && this.rollId === sessionStorage.getItem('newRoll')) {
            postAction('/api/user/update/status', {status: 5})
          }
          if (password !== undefined) {
            this.$closedPwd()
          }
        }).catch(err => {
          if (err.response.data.errCode !== 615) {
              return this.$Message.error(err.response.data.errMsg)
          }
          this.$openTake(err.response.data.data)
        })
      },
      joinRoom(password = {}) {
        let that = this
        if (this.roomButton.title === '立即参与') {
          if (!this.userInfo.id) {
            return this.$route.query.share !== undefined ? this.$login(undefined, true) : this.$login();
          }
        }
        let roomType = new Map([
          ['roll_join_open', that.enter],
          ['roll_join_once_password', that.$openPwd],
          ['roll_join_password', that.$openPwd],
          ['roll_join_task', that.enter]
        ])
        roomType.get(this.detailData.type)(this.enter);
      }
    }
  }
</script>

<style scoped>

</style>
