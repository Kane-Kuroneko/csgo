<template>
  <div class="roll-content">
    <div class="common-bg">
      <div class="margin-auto" style="min-height: 4rem;position: relative">
        <div class="ranking-bg" :class="{'reverse-bg':  roomData.type === 1}">
          <div>
            <Title name="箱子对战"></Title>
            <div class="room-state-battle-over" v-show="roomData.status === '4'">
              <p>共 {{ [...roomData.boxMap].length }} 回合</p>
              <p>
                <span> 已结束</span>
              </p>
            </div>
            <div class="round-time" v-show="roomData.status !== '4'">
              <p v-show="roomData.type === 0 || !roomData.type ">常规对战</p>
              <div class="re-game" v-show="roomData.type === 1">
                <div>反转模式</div>
              </div>
              <div class="battleing-round">
                <div>{{ round }}</div>
                <span style="color: #FFFFFF">/</span>
                <div>{{ [...roomData.boxMap].length }}</div>
              </div>
            </div>
          </div>
          <div class="back-room cursor hide-m" @click="$router.push('/page/caseBattle')">
            <div class="battle-room-tap">
              <div @click="tap = 0" style="width: 200px;height: auto">
                <img src="../assets/image/battle/goback.png" width="100%" alt="">
              </div>
            </div>
          </div>
          <div class="room-url">
            <div class="promotion-code">
              <span><i class="iconfont icon-icon_link"></i> 房间链接: </span>
              <span style="opacity: .5">{{ roomUrl }}</span>
              <div @click="clipboard(roomUrl)" class="default-btn copy-btn">复制</div>
            </div>
          </div>
          <div class="room-state-info">
            <div class="room-box" ref="roomBox">
              <ul class="room-style">
                <li @click="boxGoods(item.boxId, item)" class="box-lst"
                    :class="[{'box-lst-over': roomData.status !== '2' && round > idx},{'box-lst-over': roomData.status === '4' && round > idx},{'cursor':
                     roomData.status !== 4
                    }]"
                    align="center"
                    v-for="(item,idx) in roomData.boxMap" :key="idx">
                  <img :src="imgHost(item.background)">
                  <img :src="imgHost(item.boxImg)">
                  <div v-show="roomData.status !== '2' && round > idx">
                    <i class="iconfont iconicon-select"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="room-total-price">
            <div class="countdown-state">
              <p>总价格</p>
              <div class="room-state-battle" style="margin-top: .1rem">
                <i class="iconfont icon-icon_diamond1"></i>
                <span class="font-bold"> {{ roomData.amount }}</span>
              </div>
            </div>
          </div>
          <div class="verify " v-show="roomData.status === 4">
            <img class="cursor war-hover" src="../assets/image/battle/verifyhash.png" alt=""
                 @click="$refs.userVertify.getVerify()">
          </div>
          <div class="countdown-time hide-m"
               :style="{'visibility': roomData.status == '2' ? 'unset' : 'hidden'}">
            <div @click="reveseTips = true" class="cursor game-tips hide-m"
                 :style="{'visibility': roomData.type === 0 ? 'hidden' : 'visible'}">
              <i class="iconfont icon-icon-help"></i>
              <span>反转模式说明</span>
            </div>
            <div>
              <div class="minutes-countdown">{{
                Math.floor(roomData.time / 60) > 0 ?
                Math.floor(roomData.time / 60) : 0
                }}
              </div>
              <div class="countdown-split">：</div>
              <div class="minutes-countdown" style="margin-right: 3px">{{ countDown(roomData.time, 1) }}
              </div>
              <div class="minutes-countdown">
                {{ countDown(roomData.time, 2) }}
              </div>
            </div>
            <div class="unstart-state" style="margin-top: 0"
                 :style="{'visibility': roomData.createBy === user.id && roomData.status === '2' && roomData.roomType !== 2? 'unset' : 'hidden'}">
              <div class="invite-conuntdown" v-if="roomData.invitationTime> 0">
                <i class="iconfont iconicon-password"
                   style="margin-right: 5px;transform: translateY(-2px)"></i>在
                <div style="display: flex;margin: 0 3px">
                  <div class="minutes-countdown"> {{ countTime(roomData.invitationTime, 'minutes')
                    }}
                  </div>
                  <div>:</div>
                  <div class="minutes-countdown" style="margin-right: 3px">
                    {{ countTime(roomData.invitationTime, 'senond') }}
                  </div>
                  <div class="minutes-countdown">{{ countTime(roomData.invitationTime, 'seconds') }}
                  </div>
                </div>
                内仅限被邀请者加入
              </div>
              <div class="default-btn battle-btn"
                   @click.stop="$refs.inviteUser.isShow = true;$refs.inviteUser.hoster = roomData.createBy">
                <i class="iconfont icon-a-0-ziyuan512"></i>
                邀请用户加入房间
              </div>
            </div>
          </div>
          <div class="countdown-time-m  hide-p hide-ipad" v-show="roomData.status == '2' ">
            <div style="display: flex">
              <div class="minutes-countdown">{{ countTime(roomData.time, 'minutes') }}</div>
              <div class="countdown-split">：</div>
              <div class="minutes-countdown" style="margin-right: 3px">{{ countTime(roomData.time,
                'senond') }}
              </div>
              <div class="minutes-countdown">{{ countTime(roomData.time, 'seconds') }}
              </div>
            </div>
          </div>
          <div class="unstart-state hide-p hide-ipad" style="margin-top:.4rem"
               :style="{'visibility': roomData.createBy === user.id && roomData.status === '2' ? 'unset' : 'hidden'}">
            <div class="invite-conuntdown" v-if="roomData.invitationTime > 0">
              <i class="iconfont iconicon-password"></i> 在
              <div style="display: flex;margin: 0 3px">
                <div class="minutes-countdown">{{ countTime(roomData.invitationTime, 'minutes') }}</div>
                <div>:</div>
                <div class="minutes-countdown" style="margin-right: 3px">
                  {{ countTime(roomData.invitationTime, 'senond') }}
                </div>
                <div class="minutes-countdown">{{ countTime(roomData.invitationTime, 'seconds') }}
                </div>
              </div>
              内仅限被邀请者加入
            </div>
            <div v-show="roomData.roomType !== 2" class="default-btn battle-btn"
                 @click.stop="$refs.inviteUser.isShow = true">
              <i class="iconfont icon-a-0-ziyuan512"></i>
              邀请用户加入房间
            </div>
          </div>
        </div>
        <!--                玩家对战状态-->
        <div class="waiting-box">
          <ul class="player-container">
            <li class="player-state" :class="'player-state-' + roomData.userMap.length"
                v-for="(item,idx) in roomData.userMap" :key="idx">
              <!-- 头像 -->
              <div class="player-avator-container"
                   :class="[roomData.status != '2' ? item.result === 1 ? 'avator-win' : 'avator-loser' : '',{'play-rabit': item.userType == 1}]">
                <SkinsAvatar
                    wd="100px"
                    ht="100px"
                    class="player-avator"
                    style="position: absolute"
                    :img="item.userImg"
                    :head-frame="item.headPortraitBox"
                ></SkinsAvatar>
                <!--                <div class="player-avator" align="center">-->
                <!--                  <img :src="imgHost(item.userImg)" v-show="item.userImg">-->
                <!--                </div>-->
                <img v-show="item.result == 1" src="../assets/image/battle/crown.png"
                    >
                <!--                <img :src="imgHost(item.headPortraitBox ? item.headPortraitBox: '')">-->
              </div>
              <!-- 用户名-->
              <div class="player-name" :class="{'re-name': roomData.type === 1}">
                <p>
                  <img src="../assets/image/battle/rabit.png" v-show="item.userType ==1"> {{
                  item.userName }}
                </p>
              </div>
              <!-- 核心-->
              <div class="playing-state" align="center" :class="{'play-rabit': item.userType == 1}">
                <div style="height: 100px" v-show="roomData.status == '2'">
                  <!--    已加入对战-->
                  <p v-show="item.btnJurisdiction === 1 "><i class="iconfont iconicon-select"></i>
                    已加入对战 </p>
                  <div v-show="item.btnJurisdiction !== 1">
                    <!--   普通用户参加-->
                    <div class="unstart-state"
                         v-if="roomData.roomType !== 2"
                         v-show="[2,33,5].includes(item.btnJurisdiction)">
                      <div class="default-btn battle-btn" @click="jionBattle">
                        <i class="iconfont iconicon-add"></i>
                        加入对战
                      </div>
                    </div>
                    <!--    邀请模式-->
                    <div class="no-robot" style="margin: 0 3px"
                         v-show="[8,44].includes(item.btnJurisdiction)">
                      <div class="invite-conuntdown no-robot" style="margin-top: 40px">
                        <i class="iconfont iconicon-password" style="margin-right: 5px"></i>
                        未被邀请者在
                        <div style="display: flex;">
                          <div class="minutes-countdown"
                               style="color: #FFCA6E;font-size: 12px;">
                            {{ countTime(roomData.invitationTime, 'minutes') }}
                          </div>
                          <div>:</div>
                          <div class="minutes-countdown"
                               style="margin-right: 3px;color: #FFCA6E;font-size: 12px;">
                            {{ countTime(roomData.invitationTime, 'senond') }}
                          </div>
                          <div class="minutes-countdown"
                               style="color: #FFCA6E;font-size: 12px;">
                            {{ countTime(roomData.invitationTime, 'seconds') }}
                          </div>
                        </div>
                        内不可加入房间
                      </div>
                    </div>
                    <!--    房主添加机器人-->
                    <div v-show="[22,55].includes(item.btnJurisdiction)"
                         v-if="roomData.roomType !== 2">
                      <div class="no-robot" v-show="roomData.robotTime > 0">
                        <i class="iconfont iconicon-tips"></i>
                        {{ roomData.robotTime }}s内不可加入机器人
                      </div>
                      <div v-show="roomData.robotTime < 0 || !roomData.robotTime"
                           class="unstart-state">
                        <div class="default-btn battle-btn" @click.stop="isRabotJoin = true">
                          <i class="iconfont iconicon-add"></i>
                          添加对战机器人
                        </div>
                      </div>
                    </div>
                    <!--    反转模式不可添加机器人-->
                    <div class="no-robot" v-show="[77].includes(item.btnJurisdiction)">
                      <i class="iconfont iconicon-tips"></i>
                      反转模式不可添加机器人
                    </div>
                  </div>
                </div>
                <!--  对战中-->
                <div class="playing-state-pending" style="height: 100px"
                     v-show="roomData.status == '3'">
                  <div class="open-box-battle">
                    <div ref="pool">
                      <ul class="flex-layout" v-if="nextRound"
                          :style="item.openBoxData.prize.style">
                        <li v-for="(el,idx) in item.openBoxData.prize.prizePool"
                            :key="idx"
                            :class="'qua-box-' + conversionStyle(el.rarity,el.category)"
                            :id="`item-${idx}-${item.userId}`"
                            :ref="`item-${idx}-${item.userId}`">
                          <img :src="el.image">
                        </li>
                      </ul>
                      <div class="the-pointer"></div>
                    </div>
                  </div>
                </div>
                <!--   对战结束-->
                <div v-if="roomData.status == '4'">
                  <div class="over-battle"
                       :class="item.result == 1 ? 'playing-state-win' : 'playing-state-lose'">
                    <div>
                      <img src="../assets/image/battle/winbg.png" alt="" v-if="item.result == 1"/>
                      <img src="../assets/image/battle/losebg.png" alt="" v-else/>
                    </div>
                  </div>
                  <div class="winned-money" :class="{'winned-loser': item.result !== 1}">
                    <div class="line-img">
                      <div></div>
                      <img src="../assets/image/battle/endingState.png">
                    </div>
                    <p><i class="iconfont icon-icon_diamond1"></i> {{ item.result == 1 ? item.resultAmount :
                      item.resultMap[0].price }}</p>
                    <div class="line-img">
                      <img src="../assets/image/battle/endingState.png"
                           style="transform: rotate(180deg);">
                      <div style="margin-top: 9px"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="player-pool">
                <div class="prize-money"
                     v-show="roomData.status == 3">
                  <p class=""><i class="iconfont icon-icon_diamond1"></i> {{ item.totalPrice }}</p>
                </div>
                <div class="is-line" :class="{'is-line-w': !item.userImg}"
                     v-show="roomData.status !== 4">
                </div>
                <div align="center" style="margin-top: 5px" v-show="roomData.status === '2'">
                  <img src="../assets/image/battle/jioned.png"
                       v-show="item.userImg">
                  <img src="../assets/image/battle/unjion.png"
                       v-show="!item.userImg">
                </div>
                <!--                                等待状态 已加/代加-->
                <div class="begining-or" v-show="roomData.status === '2'">
                  <div>
                    <div class="loading-icon" v-show="!item.userImg">
                      <div>
                        <div class="circle-aniation"></div>
                        <img src="../assets/image/battle/inroomcrl.png">
                      </div>
                      <p>正在等待玩家</p>
                    </div>
                    <div v-show="item.userImg" class="ready-play">
                      <div><i class="iconfont iconicon-ready"></i></div>
                      <p>准备游戏</p>
                    </div>
                  </div>
                </div>
                <!--                                开始物品池-->
                <div v-if="roomData.status == '3' || roomData.status == 4"
                     class="battle-prize-pool">
                  <skins-item :skins-data="item.prizePool"
                              @choseSkins="vertifyHash"
                              class="cursor">
                  </skins-item>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--        结果统计loding-->
    <div class="loading-container" v-show="loading">
      <div></div>
      <img src="../assets/image/battle/wating.png" alt="">
      <div class="statistical-results">
        <p>- 结果统计中 -</p>
        <div class="statistical-idot">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <BattleModule ref="battleModule"></BattleModule>
    <BattleResult ref="battleResult" v-if="modalShow"></BattleResult>
    <BoxDetaile ref="boxDetaile" :boxId="boxId"></BoxDetaile>
    <VertifyHash ref="vertifyHash" :hashHistory="vertify" v-if="isPiont"></VertifyHash>
    <hash-module v-model="isRabotJoin" title="机器人" width="6">
      <p class="modal-content">
        是否添加对战机器人
      </p>
      <div class="default-btn modal-btn creat-btn" @click="rabitJoin">
        确定
      </div>
    </hash-module>
    <InviteUser ref="inviteUser"></InviteUser>
    <hash-module v-model="reveseTips" title="反转模式">
      <div class="i-color" style="width: auto;margin-top: 30px">
        <img src="../assets/image/battle/remodule.png" alt="">
      </div>
      <p class="modal-content">在此模式下，开箱价值最低的玩家将赢得胜局</p>
      <div class="default-btn modal-btn creat-btn" @click="reveseTips=false">
        确定
      </div>
    </hash-module>
    <userVertify ref="userVertify"></userVertify>
  </div>
</template>

<script>
  import BattleModule from "../components/Battle/battleModule";
  import {getAction, postAction} from "../api/manage";
  import BattleResult from "../components/Battle/battleResult";
  import BoxDetaile from "../components/Battle/boxDetaile";
  import {mapState} from "vuex";
  import VertifyHash from "../components/Battle/vertifyHash";
  import Title from "../components/Title";
  import InviteUser from "@/components/Battle/InviteUser";
  import {throttle} from "@/utils/utils";
  import userVertify from "../components/Battle/userVertify";

  const slice3 = require("../assets/audio/slice3.wav")
  const prizePoolCount = 30
  var resultResultIndex = 0;//记录错误请求索引.最高等待5秒
  export default {
    name: "battleRoom",
    components: {BattleModule, BattleResult, BoxDetaile, VertifyHash, Title, InviteUser, userVertify},
    props: {
      battleId: String,
    },
    data() {
      return {
        isPlay: false,
        isPiont: false,
        show: false, // 移动箱子icon
        artical: [], // 箱子数据
        boxId: null,
        isRabotJoin: false,
        vertify: '',
        reveseTips: false,
        pointCount: 0,
        leftIcon: false,
        rightIcon: true,
        loading: false,
        roomUrl: window.location.href,
        roomId: this.battleId,
        timer: null, // 房间倒计时
        inviteTimer: null, // 邀请者模式倒计时
        roomData: {boxMap: []},
        modalShow: false,
        nextRound: true,
        music: null,
        round: 1, // 对战轮数
        url: {
          stuff: '/api/battle/box/stuff',
          detail: '/api/battle/room/details',
          vertify: '/api/battle/verify/hash',
          rabit: '/api/battle/robot/join'
        }
      }
    },
    computed: {
      ...mapState('account', ['user']),
    },
    created() {
      this.getRoomInfo()
      if (this.timer) clearInterval(this.timer)
      if (this.inviteTimer) clearInterval(this.inviteTimer)
      this.inviteTimer = setInterval(() => {
        let data = this.roomData
        if (this.roomData.invitationTime < 1) {
          data.userMap.forEach(el => {
            this.handleBtnJurisdiction(el)
          })
          clearInterval(this.inviteTimer)
        }
        this.roomData.invitationTime--
      }, 1000)
      this.timer = setInterval(() => {
        let data = this.roomData
        if (data.time < 1 && data.status === '2') {
          if (+data.isFastBattle === 0) {     // 普通房人未满
            this.closeRoom()
          } else if (+data.isFastBattle === 1 && !data.userMap[1].userId) { // 快速房无人参加
            this.closeRoom()
          }
          clearInterval(this.timer)
        }
        this.roomData.robotTime--
        this.roomData.time--
      }, 1000)
    },
    watch: {
      battleId(nv, ov) {
        if (nv !== ov) {
          this.round = 1
          this.getRoomInfo()
        }
      },
    },
    methods: {
      vertifyHash(id) {
        let params = {id: id.id}
        this.isPiont = true
        if (this.roomData.status !== 4) return this.$Message.info('对战中 不可查看')
        if (id.id == '99999') return this.$Message.info('此物品为战败奖励')
        if (id.id === '99998') return this.$Message.info('对局平分金额')
        getAction(this.url.vertify, params).then(res => {
          let arr = res.data
          arr.calculateLog = JSON.parse(res.data.calculateLog)
          arr.name1 = res.data.skinsName.split('|')[0]
          arr.name2 = res.data.skinsName.split('|')[1]
          arr.stuffPrizeList.forEach(item => {
            if (res.data.skinsImg === item.image) {
              res.data.scope = item
              arr.startProbability = item.startProbability
              arr.endProbability = item.endProbability
            }
          })
          this.vertify = res.data
          this.$refs.vertifyHash.boxHistory = true
        })
      },
      closeRoom() {
        setTimeout(() => {
          this.$router.push('/page/caseBattle')
        }, 1500)
        if (this.roomData.type === 0) {
          return this.$Modale('房间已关闭', '<p>非常抱歉,该房间因等待时间内参与人数未满足而自动关闭</p><p>为了游戏顺利进行，参与人数未满时您也可以添加对战机器人。</p>', 0)
        }
        this.$Modale('房间已关闭', '<p>非常抱歉，该房间因等待时间内参与人数未满足自动关闭。</p>', 0)
      },
      countDown(time, position) {
        let floorTime = Math.floor(time % 60) > 0 ? Math.floor(time % 60) : 0
        if (floorTime.toString().length == 2) {
          if (position === 1) {
            return floorTime.toString().split('')[0]
          }
          return floorTime.toString().split('')[1]
        }
        if (floorTime.toString().length == 1) {
          if (position === 1) {
            return 0
          }
          return floorTime
        }
      },
      clipboard(text) {
        this.$copyText(text).then(() => {
          this.$Message.success('复制成功')
        });
      },
      setShow() {
        this.$nextTick(() => {
          let container = document.querySelector('.room-box')
          let ul = document.querySelector('.room-style')
          ul.style.transform = `translateX(0) translateZ(0)`;
          ul.style.transition = '.5s transform  ease';
          if (ul.clientWidth > container.clientWidth) {
            this.show = true
          }
        })
      },
      countTime(time, type) {
        let minutes = Math.floor(time / 60)
        let senond = Math.floor(time % 60).toString().length === 2 ?
         Math.floor(time % 60).toString().split('')[0] : 0
        let seconds = Math.floor(time % 60).toString().length === 2 ?
         Math.floor(time % 60).toString().split('')[1] :
         Math.floor(time % 60)
        let arr = {minutes, senond, seconds}
        return arr[type]
      },
      // 获取所有箱子内物品
      async getRoomInfo() {
        let params = {'roomId': this.battleId}
        try {
          let result = await getAction(this.url.detail, params)
          if (JSON.stringify(result.data) == '{}') {
            this.$Message.error('房间已关闭')
            return this.$router.push('/page/caseBattle')
          }
          if (result.data.status == 4) {
            this.round = result.data.boxMap.length
          }
          this.$refs.inviteUser.hoster = this.roomData.createBy
          this.handle(result.data)
          this.setShow()
          if (result.data.status !== 4) {
            this.initSockt()
            let res = await getAction(this.url.stuff, params)
            this.artical = res.data
          }
        } catch (e) {
          console.log('获取失败')
        }
      },
      /**
       * 添加等待玩家假数据
       **/
      handle(roomArr) {
        if (roomArr.status != 4) {
          if (roomArr.userMap.length < roomArr.num) {
            let userObj = {userImg: null, userName: '等待玩家加入', userId: null}
            roomArr.userMap.push(userObj)
            this.handle(roomArr)
          }
        }
        roomArr.userMap.forEach((el) => {
          el['result'] = el.result ? el.result : 0
          el['totalPrice'] = el.amount ? el.amount : 0
          el['prizePool'] = el.resultMap ? el.resultMap : []
          el['openBoxData'] = {
            prize: {
              prizePool: []
            }
          }
          if (this.roomData.status === '2') this.handleBtnJurisdiction(el)
        })
        this.roomData = roomArr
      },
      handleBtnJurisdiction(el) {
        let id = this.user.id
        let roomHost = this.roomData.createBy
        if (el.userImg) el.btnJurisdiction = 1 // 已加入状态
        //  1.普通房
        if (this.roomData.type === 0 && !el.userImg) {
          // 1.1非房主
          if (id !== roomHost) {
            // 1.2
            if (!this.roomData.invitationTime) el.btnJurisdiction = 2  // 普通房用户按钮
            if (this.roomData.invitationTime > 0) { // 邀请者模式
              for (let i = 0; i < this.roomData.invitationUser.length; i++) {
                if (id === +this.roomData.invitationUser[i]) return el.btnJurisdiction = 33  // 受邀用户
              }
              el.btnJurisdiction = 8 // 非受邀请用户
            }
            if (this.roomData.invitationTime < 1) {  // 邀请者模式倒计时结束 可加入人机和普通用户
              el.btnJurisdiction = 5
            }
          } else if (id === roomHost) {
            if (!this.roomData.invitationTime) el.btnJurisdiction = 22  // 普通房用户按钮
            if (this.roomData.invitationTime > 0) {  // 邀请者模式
              el.btnJurisdiction = 44
            }
            if (this.roomData.invitationTime < 1) {  // 邀请者模式
              el.btnJurisdiction = 55
            }
          }
          // 2 反转模式
        } else if (this.roomData.type === 1 && !el.userImg) {
          // 2.1非房主
          if (id !== roomHost) {
            // 1.2房主
            if (!this.roomData.invitationTime) el.btnJurisdiction = 2  // 普通房用户按钮
            if (this.roomData.invitationTime > 0) { // 邀请者模式
              if (this.roomData.invitationUser.length > 0) {
                for (let i = 0; i < this.roomData.invitationUser.length; i++) {
                  if (id === +this.roomData.invitationUser[i]) return el.btnJurisdiction = 33  // 受邀用户
                }
              }
              el.btnJurisdiction = 8 // 非受邀请用户
            }
            if (this.roomData.invitationTime < 1) {  // 邀请者模式倒计时结束 可加入普通用户
              el.btnJurisdiction = 5
            }
          } else if (id === roomHost) {
            // 2.2房主
            if (!this.roomData.invitationTime) el.btnJurisdiction = 77  // 普通房用户按钮
            if (this.roomData.invitationTime > 0) { // 邀请者模式
              el.btnJurisdiction = 44 // 非受邀请用户
            }
            if (this.roomData.invitationTime < 1) {  // 邀请者模式倒计时结束 可加入普通用户
              el.btnJurisdiction = 77
            }
          }
        }
        return el
      },
      boxGoods(id, boxName) {
        if (this.roomData.status === 4) return
        this.$refs.boxDetaile.getBoxStuff(id)
        this.$refs.boxDetaile.boxInfo = boxName
        this.$refs.boxDetaile.show = true
      },
      jionBattle() {
        if (!this.user.id) {
          return this.$login()
        }
        this.$refs.battleModule.roomId = this.battleId
        this.$refs.battleModule.payment = true
      },
      rabitJoin: throttle(function () {
        this.isRabotJoin = false
        let params = {"roomId": this.battleId}
        postAction(this.url.rabit, params).then(() => {
          this.$Message.success('成功加入机器人')
        }).catch(e => {
          this.$Message.error(e.response.data.errMsg)
        })
      }, 1000),
      /**
       *  @param round 播放到第几轮
       *  data 当前轮次开奖结果
       */
      startBatlte(round, data) {
        this.nextRound = true
        let lastTime = 0
        this.initOpen(round - 1).then(res => {
          this.music = setInterval(() => {
            try {
              let val = parseInt(this.$refs.pool[0].scrollWidth / 120)
              if (val !== lastTime) {
                lastTime = val
                let audio = new Audio()
                audio.src = slice3
                audio.play();
              }
            } catch (e) {
              clearInterval(this.music)
            }
          })
          this.roomData.userMap.forEach(el => {
            el.openBoxData['prize'] = res
            el.openBoxData['id'] = el.userId
            el.openBoxData.prize.prizeIndex = this.randomStyle(el.openBoxData.prize.style, el.openBoxData.id)
            this.$nextTick(() => {
              data.forEach(item => {
                if (el.openBoxData.id == item.userId) {
                  this.$refs[`item-${20}-${el.userId}`][0].childNodes[0].setAttribute('src', item.image);
                  this.$refs[`item-${20}-${el.userId}`][0].setAttribute('class', 'qua-box-' + this.conversionStyle(item.rarity, item.category));
                }
              })
            })
          })
          this.setPrize(data)
        })
      },
      randomStyle(style, userId) {
        let index = 20
        this.$nextTick(() => {
          let itemWidth = this.$refs[`item-0-${userId}`][0].clientWidth;
          let contentWidth = this.$refs.pool[0].offsetWidth / 2;
          let distance = -(itemWidth * index);
          let marginWidth = index * 8;
          let totaleDistance = distance + contentWidth - marginWidth - (itemWidth / 2);
          style.transform = `translateX(${totaleDistance}px) translateZ(0)`;
        })
        return index
      },
      async initOpen(round) {
        return new Promise(resolve => {
          let openBoxData = {}
          let time = 4
          const opeItem = {
            prizePool: [],  //奖池
            prize: null,
            style: {
              transform: 'translateX(0)',
              transition: `transform ${time}s cubic-bezier(.54,.91,.63,.99) 0s`,
              willChange: 'transform'
            },
            prizeIndex: null,
            openTime: time
          }
          opeItem.prizePool.push(...this.artical[round])
          for (let supplement = 0; supplement < prizePoolCount - this.artical[round].length; supplement++) { //补充奖池
            opeItem.prizePool.push(this.artical[round][supplement % this.artical[round].length])
          }
          opeItem.prizePool.sort(() => 0.5 - Math.random())
          openBoxData = opeItem
          resolve(openBoxData)
        })
      },
      setPrize(prizes) {
        let thet = this;
        setTimeout(() => {
          this.round = ++this.round
          this.handleResult(prizes)
          if (this.round < this.roomData.boxMap.length + 1) {
            this.webSocket.send(
             this.round
            )
            this.nextRound = false
          } else {
            this.modalShow = true
            this.round = --this.round
            setTimeout(() => {
              let params = {"roomId": this.battleId}
              this.loading = true
              this.webSocket.close()
              // 额外掉落
              if (this.$socketData['drop']) {
                this.$drop(this.$socketData['drop'].boxSkinsList)
                this.$socketData['drop'] = undefined
              }
              thet.rsultShow(params, thet);
            }, 1500)
          }
        }, 5 * 1000)
      },
      rsultShow(params, that) {
        getAction(that.url.detail, params).then(res => {
          if (res.data.userMap[0].resultMap == null || res.data.userMap[0].resultMap == undefined) {
            if (resultResultIndex < 5) {
              setTimeout(() => {
                that.rsultShow(params, that)
              }, 2000);
            }
            resultResultIndex++;
            return;
          }
          for (let i = 0; i < res.data.userMap.length; i++) {
            if (that.user.id == res.data.userMap[i].userId) {
              that.$refs.battleResult.isEmpty = false
              that.$refs.battleResult.result = res.data.userMap[i]
            }
          }
          that.$refs.battleResult.creatBy = res.data.createBy
          that.loading = false
          that.$refs.battleResult.show = true
          that.handle(res.data)
          this.roomData.status = 4
          that.$refs.battleResult.totaleWinner = res.data.userMap
        }).catch(() => {
          that.loading = false
          that.$Message.error('结果处理超时,请刷新页面查看结果')
        })
      },
      /**
       *  @param result 开出的物品
       */
      handleResult(result) {
        let arr = []
        clearInterval(this.music)
        this.roomData.userMap.forEach(item => {
          // 放入个人奖品池
          result.forEach(el => {
            if (item.userId == el.userId) {
              item.prizePool.unshift(el)
            }
          })
          let totalPrice = 0
          item.prizePool.forEach(el => {
            totalPrice += el.price
          })
          item.totalPrice = totalPrice.toFixed(2)
          arr.push(item.totalPrice)
          // 动画回滚
          if (this.round < this.roomData.boxMap.length + 1) {
            item.openBoxData.prize.style = {
              transform: 'translateX(0)',
              transition: `transform ${0}s cubic-bezier(.54,.91,.63,.99) 0s`,
              willChange: 'transform'
            }
          }
        })
        if (arr.length == this.roomData.userMap.length) {
          this.roomData.userMap.forEach(item => {
            item.result = 0
            if (+item.totalPrice === Math.max(...arr) && this.roomData.type === 0) {
              item.result = 1
            }
            if (+item.totalPrice === Math.min(...arr) && this.roomData.type === 1) {
              item.result = 1
            }
          })
        }
      },
      /**
       *  @param type 1 加入用户
       *  type 2 加入最后一个用户
       *  type 3 对战伦次开始
       */
      hanleSocket(data) {
        let name = ['userImg', 'userName', 'userId', 'userType', 'headPortraitBox']
        if (data.type === '1') {
          for (let key of name) {
            this.roomData.userMap[data.index][key] = data.userList[key]
          }
          this.handleBtnJurisdiction(this.roomData.userMap[data.index])
        } else if (data.type == '2') {
          for (let key of name) {
            this.roomData.userMap[this.roomData.num - 1][key] = data.userList[key]
            this.handleBtnJurisdiction(this.roomData.userMap[this.roomData.num - 1])
            this.$refs.inviteUser.isShow = false
            this.roomData.status = data.userList.status
          }
        } else if (data.type === 3) {
          this.round = data.count
          // 快速房删除空位
          if (!this.isPlay && this.roomData.isFastBattle === 1) {
            var ridex = 0
            this.roomData.userMap.forEach((el) => {
              if (!el.userImg) {
                ridex++
              }
            })
            for (var i = ridex; i > 0; i--) {
              this.roomData.userMap.splice(this.roomData.userMap.length - 1, 1)
            }
            this.roomData.status = 3
            this.isPlay = true;
          }
          // 判断是不是中途加入
          let arr = data.animation ? data.animation : data.result[data.result.length - 1]
          if (data.result) {
            data.result.splice(data.result.length - 1, 1)
            data.result.forEach(el => {
              el.forEach((item, idx) => {
                this.roomData.userMap[idx].prizePool.push(item) // 加入之前物品放入奖池
              })
            })
            // 处理总价
            this.roomData.userMap.forEach(item => {
              let totalPrice = 0
              item.prizePool.forEach(el => {
                totalPrice += el.price
              })
              item.totalPrice = totalPrice.toFixed(2)
            })
          }
          // 等待箱子物品拿到 在开始对战
          let interval = setInterval(() => {
            if (this.artical.length > 0) {
              this.startBatlte(this.round, arr)
              clearInterval(interval)
            }
          }, 500)
        } else if (data.type === 4) {
          this.webSocket.send(
           this.round
          )
        } else if (data.type === 5) {
          this.$Modale('房间已关闭', '非常抱歉,该房间数据处理异常关闭.', 0)
          setTimeout(() => {
            this.$router.push('/page/caseBattle')
          }, 1500)
        }
      }
      ,
      initSockt() {
        this.webSocket = new WebSocket(process.env.VUE_APP_LINK_WS + `/wss/battle/${this.battleId}`)
        this.webSocket.onopen = this.websocketonopen;
        this.webSocket.onerror = this.websocketonerror;
        this.webSocket.onmessage = this.websocketonmessage;
        this.webSocket.onclose = this.websocketclose;
      }
      ,
      websocketonopen() {
        console.log("WebSocket连接成功");
      }
      ,
      websocketonerror() {
        //错误
        this.webSocket.close()
        // this.initSockt()
        console.log("WebSocket连接发生错误");
      }
      ,
      websocketonmessage(e) {
        // 数据接收
        // 操作处理...
        var data = JSON.parse(e.data)
        this.hanleSocket(data)
      }
      ,
      websocketclose(e) {
        //关闭
        // this.initSockt()
        console.log(JSON.stringify(e));
        console.log("WebSocket连接发生");
      }
      ,
    }
    ,
    beforeRouteLeave(to, from, next) {
      if (this.roomData.userMap.length > 0 && this.roomData.status !== 4) {
        this.webSocket.close()
      }
      clearInterval(this.inviteTimer)
      clearInterval(this.timer)
      next()
    }
    ,
  }
</script>
