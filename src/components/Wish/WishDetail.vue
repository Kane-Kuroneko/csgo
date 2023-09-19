<template>
  <div class="wish-detail">
    <div class="wish-step">
      <div class="wish-finish" v-if="detailArr.roomInfo.status === 2">
        <img :src="imgHost(detailArr.roomInfo.userImg)" alt="">
        <div>
          <span>{{ detailArr.roomInfo.winNum }}</span>号瓶许愿成功，恭喜用户<span>{{
            detailArr.roomInfo.userName
          }}</span>获得神龙青睐
        </div>
      </div>
      <div class="step-go" v-else>
        <img src="../../assets/image/wish/sone.png" alt="">
        <div></div>
        <img src="../../assets/image/wish/stow.png" alt="">
        <div></div>
        <img src="../../assets/image/wish/sthree.png" alt="">
      </div>
    </div>
    <div class="room-detail">
      <div class="left-info itme-one">
        <p>当前已许愿：<span style="color:#F82226">{{ myChosedNum.length }}</span></p>
        <p @click="openModule">查看许愿瓶</p>
      </div>
      <div class="hide-m skins-info">
        <div class="wish-img" :class="conversionStyle(detailArr.roomInfo.rarity,detailArr.roomInfo.category)"
             align="center">
          <img :src="detailArr.roomInfo.skinsImg" alt="" style="width:40%">
        </div>
      </div>
      <div class="left-info itme-two">
        <p>公平游戏</p>
        <p v-if="detailArr.roomInfo.status === 2" @click="vertifyRoom">验证Hash>></p>
        <p v-else @click="seeHashSeed">修改种子</p>
      </div>
    </div>
    <div class="room-det">
      <div class="hide-p hide-ipad">
        <div class="wish-img" :class="conversionStyle(detailArr.roomInfo.rarity,detailArr.roomInfo.category)"
             align="center">
          <img :src="detailArr.roomInfo.skinsImg" alt="" style="width:40%">
        </div>
      </div>
      <div class="wish-names">
          <span>
           {{ detailArr.roomInfo.title }}
          </span>
      </div>
      <div style="text-align: center">
        <div style="display: inline-block" class="wish-skins-name">
          {{ detailArr.roomInfo.skinsName }}
        </div>
        <span class="wish-pricr hide-m">
          <i class="iconfont icon-icon_diamond1"></i> {{ detailArr.roomInfo.price }}
        </span>
      </div>
      <p class="wish-pricr hide-ipad hide-p" style="text-align: center">
        <i class="iconfont icon-icon_diamond1"></i> {{ detailArr.roomInfo.price }}
      </p>
      <div class="split-line" style="width: 450px;margin:10px auto"></div>
      <div class="last-card">
        <div>
          <div>
            <div :style="{width: (detailArr.roomInfo.num/detailArr.roomInfo.roomNum)*100 + '%'}">
              <div></div>
            </div>
          </div>
        </div>
        <span class="wish-progress">{{ detailArr.roomInfo.num }}/{{ detailArr.roomInfo.roomNum }}</span>
      </div>
    </div>
    <div class="bottle">
      <div class="wish-btn" v-if="isPhone">
        <div v-if="detailArr.roomInfo.status !==2 " class="buy-btn" @click="fastOrNormal(false)">
          <div>自选许愿</div>
        </div>
        <div v-if="detailArr.roomInfo.status !==2 " class="buy-btn fast-btn" @click="fastOrNormal(true)">
          <div>快速许愿</div>
        </div>
      </div>
      <div class="bottle-nav">
        <div @click="$router.back()">
          <img src="../../assets/image/wish/goback.png" alt="">
          <span>{{ detailArr.roomInfo.status === 2 ? '许愿已结束' : '返回列表' }}</span>
        </div>
        <div class="wish-btn">
          <div class="how-play" @click="howPlay = true">
            <div align="center">
              <img src="../../assets/image/wish/wenhao.png" alt="" style="width: 100%">
            </div>
            <p>玩法说明</p>
          </div>
          <div class="card-num">
            <div>
              <img src="../../assets/image/wish/card.png" alt="">
            </div>
            <div class="my-card">
              <p>{{ cardNum }}</p>
              <p>我的心愿卡</p>
            </div>
          </div>
          <div v-if="detailArr.roomInfo.status !==2  && !isPhone" style="margin-right: 10px;margin-left: 0"
               class="buy-btn fast-btn" @click="$refs.wishModule.isShow = true">
            <div>兑换心愿卡</div>
          </div>
          <div v-if="detailArr.roomInfo.status !==2  && !isPhone" class="buy-btn "
               @click="fastOrNormal(true)">
            <div>快速许愿</div>
          </div>
        </div>
      </div>
      <div class="bottle-page">
        <div :class="{'active': el.current === bottle.current}" v-for="el in bottlePage" :key="el.pageOne"
             @click="nextPage(el)">
          <div>{{ el.pageOne + '-' + el.pageTwo }}号瓶</div>
          <div v-show="el.isFull">满</div>
        </div>
      </div>
      <div class="bottle-list">
        <div style="display: flex;margin-bottom: 15px;justify-content: space-between">
          <p v-if="detailArr.roomInfo.status !==2">此许愿您最多可选：<span>{{ leastCard }}</span> 个许愿瓶，
            已挑选：<span>{{ userChoseNum.length }}</span> 个许愿瓶, 共需要
            <span>{{ userChoseNum.length * detailArr.roomInfo.cardNum }}</span> 张心愿卡</p>
          <p v-else>特别提醒：<br/>
            许愿活动是福利回馈性质趣味休闲娱乐活动，请理性消费，切勿沉迷！</p>
          <div v-if="detailArr.roomInfo.status !==2 && !isPhone" class="buy-btn" style="width: 120px;margin-left: 15px"
               @click="fastOrNormal(false)">
            <div style="padding: 2px 0;text-align: center;line-height: 40px">确认选择</div>
          </div>
        </div>
        <ul>
          <li v-for="el in bottlePaging" @click="choseBottle(el)"
              :class="{'hover': el.name}">
            <div class="cover" :class="{'active': !el.name && el.isChose}">
              <p>{{ el.room_num }}</p>
              <i class="iconfont iconicon-select" v-show="!el.name && el.isChose"></i>
            </div>
            <div class="back"
                 :class="[{'active': user.id === el.user_id},{'lucker': detailArr.roomInfo.winNum === el.room_num}]">
              <div class="bottle-num"
                   v-show="detailArr.roomInfo.status === 2 && detailArr.roomInfo.winNum === el.room_num">奖
              </div>
              <P>{{ el.room_num }}</P>
              <div align="center" class="li-avatar" :class="{'is-self': el.user_id === user.id}">
                <div>
                  <img :src="imgHost(el.avatar)" alt="" style="width:100%">
                </div>
              </div>
              <p class="wish-user">{{ el.name }}</p>
              <p class="wish-user over-flow-hide">种子：{{ el.user_seed }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Wish-Module ref="wishModule"></Wish-Module>
    <ComModule :title="isFast ? '快速许愿': '自选许愿'" v-model="fastWish">
      <div class="wish-words" v-show="!isFast">您目前已选择:
        <span v-for="(item,idx) in userChoseNum" :key="item"> {{ item }} <span
            v-show="idx+1 !== userChoseNum.length">,</span></span> 号瓶<br/>
      </div>
      <div class="wish-words" v-show="isFast">您目前可选 <span>{{ leastCard }}</span> 个许愿瓶，请输入您想选择的瓶子的数量，我们将按序号从低到高
        自动为您选择空瓶。
      </div>
      <div class="buy-card" v-show="isFast">
        <InputNumber :min="1"
                     :max="Math.floor(cardNum/detailArr.roomInfo.cardNum) === 0 ? 1 : Math.floor(cardNum/detailArr.roomInfo.cardNum)"
                     v-model="randomNum" number
                     :precision="0"
                     size="large"
                     placeholder="请输入升级自选区间功能券自定义面额数量"/>
      </div>
      <div class="wish-words" v-show="!isFast">
        总共<span> {{ userChoseNum.length }} </span>个许愿瓶
      </div>
      <div class="split-line"></div>
      <div class="wish-words">选择一条许愿语填写在心愿卡上。</div>
      <div></div>
      <div class="wish-artical">
        <div><img src="../../assets/image/wish/prevwish.png" alt="" @click="choseWords('prev')"></div>
        <div>
          <div :style="{'transform': `translate(${moveWidth *($store.state.account.isPhone ?  180 : 300) }px) `}">
            <div :key="el.wishingwords" class="active over-flow-hide"
                 v-for="el in wishWords">{{ el.wishingwords }}
            </div>
          </div>
        </div>
        <div><img src="../../assets/image/wish/nextwish.png" alt="" @click="choseWords('next')"></div>
      </div>
      <div class="wish-words" style="margin-top: 10px;">总共需放入
        <span>{{
            isFast ? randomNum * detailArr.roomInfo.cardNum : userChoseNum.length * detailArr.roomInfo.cardNum
          }}</span>
        张心愿卡
      </div>
      <div class="buy-upgrade">
        <div class="hope-btn">
          <div @click="doWish(isFast ? true : false)">放入心愿卡</div>
        </div>
        <div class="hope-btn" @click="fastWish = false">
          <div>放弃许愿</div>
        </div>
      </div>
    </ComModule>
    <com-module title="公平游戏修改种子" v-model="seedShow">
      <div>
        <div class="hash">
          <div class="hash-top">
            <div style="margin-bottom: .2rem">
              <div class="fair-item">
                <div class="wish-words">服务器种子hash：</div>
                <Row>
                  <ColC :xs="18" :md="20">
                    <Input v-model="hashSeed" style="opacity: .5" size="large" placeholder="登录后查看" disabled/>
                  </ColC>
                  <ColC span="4">
                    <div class="default-btn user-btn" @click="copy(hashSeed)">复制</div>
                  </ColC>
                </Row>
              </div>
              <div class="fair-item">
                <div class="wish-words">用户种子：</div>
                <Row>
                  <ColC :xs="12" :md="16">
                    <Input size="large" :maxlength="16" v-model="userSeed" placeholder="登录后查看"/></ColC>
                  <ColC :md="4" :xs="6">
                    <div style="display: flex">
                      <div class="default-btn user-btn" @click="changeSeed()">修改</div>
                    </div>
                  </ColC>
                  <ColC :md="4" :xs="6">
                    <div style="display: flex">
                      <div class="default-btn user-btn" @click="randomSeed()">随机</div>
                    </div>
                  </ColC>
                </Row>
              </div>
            </div>
            <div class="split-line"></div>
            <p style="line-height: 20px">1. 在您开始游戏前，您可以任意修改您的用户种子，以保证该局游戏的公平性；<br/>
              2. 为了方便您管理自己的种子，您设置的种子将用于所有需要Hash算法的游戏；<br/>
              3. 如需在游戏后对该局游戏进行验证，请提前复制服务器种子Hash值并保存，以验证并确保游戏前后服务器所给出的种子一致；<br/>
              4 .游戏公平Hash算法详细规则请参考网页顶部《公平性游戏》；</p>
          </div>
        </div>
      </div>
    </com-module>
    <com-module title="验证Hash" v-model="fairShow">
      <div style="position: relative">
        <div class="wish-words">服务器种子Hash：</div>
        <div class="wish-words over-flow-hide">{{ overSeed.serverHash }}</div>
        <div class="wish-words">服务器种子:</div>
        <div class="wish-words over-flow-hide">{{ overSeed.serverSeed }}</div>
        <div class="wish-words ">用户种子：</div>
        <div class="wish-words copy-pos"><p class="over-flow-hide">{{ overSeed.userSeed }} </p>
          <div class="default-btn user-btn" @click="copy(overSeed.userSeed)">复制</div>
        </div>
        <div class="wish-words">结果种子Hash</div>
        <div class="wish-words over-flow-hide">{{ overSeed.resultHash }}</div>
        <div class="split-line"></div>
        <div class="wish-words">
          Number = {{ overSeed.resultHash.slice(0, 6) }}（16进制）= {{ overSeed.hash16 }} <br/>
          {{ overSeed.hash16 + ' mod ' + overSeed.roomNum }} = {{ overSeed.hash16 % overSeed.roomNum + '' }} <br/>
          最终结果为： {{ overSeed.resultNum - 1 }} + 1 = {{ overSeed.resultNum }}
        </div>
        <div class="verty-posi hide-m">
          <div class="default-btn user-btn" @click="goEmn(overSeed.resultHash)">验证</div>
          <div class="default-btn user-btn" style="width: 120px" @click="go16(overSeed.resultHash.slice(0, 6) )">
            16进制转换
          </div>
        </div>
        <div style="display: flex">
          <div class="default-btn user-btn" @click="goEmn(overSeed.resultHash)">验证</div>
          <div class="default-btn user-btn" style="width: 120px" @click="go16(overSeed.resultHash.slice(0, 6) )">
            16进制转换
          </div>
        </div>
      </div>
    </com-module>
    <com-module title="玩法说明" ref="howPlay" v-model="howPlay">
      <div class="how-tips">
        <div class="battle-rule">
          <div>
            <div class="bat-rule">
              <span>1</span>
            </div>
          </div>
          <div>
            <span>许愿活动中，单个用户可重复参加同一许愿房，参与上限不超过总许愿次数的 30%(取整)。</span>
          </div>
        </div>
        <div class="battle-rule">
          <div>
            <div class="bat-rule">
              <span>2</span>
            </div>
          </div>
          <div>
            <span>游戏计算结果方式：<br/>
                 所有用户hash种子首位相加之和+服务器种子=结果种子。<br/>
                取结果种子Hash前6位进行16进10进制换算得到Number。<br/>
                用Number除以许愿总次数得到余数，余数+1（1为游戏常数量，避免结果为0）得到最终游戏结果。</span>
          </div>
        </div>
      </div>
      <div @click="howPlay = !howPlay" class="hope-btn" style="width: 175px;margin: 20px auto">
        <div>我知道了</div>
      </div>
    </com-module>
    <com-module :title="title" v-model="unWishShow">
      <div class="wish-words" v-if="unWishNum > 0">
        您一共选择了 <span>{{ userChoseNum.length }}</span> 个许愿瓶，有 <span>{{ unWishNum }}</span> 个许愿落空了，被其他用户优先许愿，其余
        <span>{{ userChoseNum.length - unWishNum }}</span> 个许愿成功，
        <span>{{ unWishNum }}</span> 张心愿卡已返还，您可以重新许愿！
      </div>
      <div>
        <div class="bottle-list">
          <p v-show="unWishNum > 0">成功许愿瓶：</p>
          <ul style="max-height: 300px;overflow-y: auto" v-show="myChosedNum.length > 0">
            <li class="m-width" v-for="el in myChosedNum" :key="el" style="margin-right: 4px">
              <div class="cover">
                <p>{{ el }}</p>
              </div>
            </li>
          </ul>
          <Empty v-show="myChosedNum.length === 0" style="min-height: 100px"></Empty>
        </div>
      </div>
      <div class="buy-upgrade">
        <div class="hope-btn" style="margin: auto">
          <div @click="halfWish()">确定</div>
        </div>
      </div>
    </com-module>
  </div>
</template>

<script>
  import {getAction, postAction} from "@/api/manage";
  import WishModule from "@/components/Wish/WishModule";
  import ComModule from "@/components/Wish/ComModule";
  import {mapState} from "vuex";
  import Empty from "@/components/Empty/Empty";
  import {debounce} from "@/utils/utils";

  export default {
    name: "WishDetail",
    props: {
      roomId: String
    },
    components: {WishModule, ComModule, Empty},
    data() {
      return {
        isFast: false,
        bottle: {   // 瓶子翻页
          current: 1,
          size: 60,
          pageOne: 1,
          pageTwo: 60
        },
        overSeed: {resultHash: 'aaaaa'}, // 结束验证hash
        bottlePage: [],
        hashSeed: '',
        howPlay: false,
        leastCard: 0, // 最多可选瓶子数量
        unWishNum: 0, // 为成功许愿数量
        fastWish: false, // 许愿弹窗
        seedShow: false, // 用户种子
        moveWidth: 0, // 心愿语 选择
        fairShow: false,
        unWishShow: false,
        title: '我的许愿瓶',
        randomNum: 1, // 快速数量
        isPhone: false,
        detailArr: {
          roomInfo: {status: 1},
          userInfo: {records: 1}
        }, // 房间数据
        userSeed: '',
        bottleArr: [],// 瓶子数组
        bottlePaging: [], // 当前页数据
        cardNum: 0,
        errCode: 0,
        wishWords: [],
        myChosedNum: [], // 已选择瓶子
        chosedWords: {},
        userChoseNum: [], //  选择过程瓶子
        url: {
          detail: '/api/desire/room/details',
          join: '/api/desire/join',
          num: '/api/desire/card',
          seed: '/api/desire/room/seed',
          vertify: '/api/desire/verify',
          last: '/api/desire/bottle',
          part: '/api/desire/part'
        }
      }
    },
    watch: {
      user(nv, ov) {
        if (nv.id && ov.id) {
          this.getCardNum()
        }
      },
      fastWish(nv) {
        if (!nv && this.errCode === 722) {
          this.getDetail(this.bottle.current)
          this.getCardNum()
          this.userChoseNum = []
          this.errCode = 0
        }
      },
      unWishShow(nv) {
        if (nv === false) {
          setTimeout(() => {
            this.myBottlePos()
          }, 300)
          this.userChoseNum = []
        }
      },
    },
    computed: {
      ...mapState('account', ['user']),
    },
    created() {
      this.getDetail(1)
      this.getCardNum()
      this.myBottlePos()
      this.userChoseNum = []
      this.userSeed = localStorage.getItem('userSeed')
      this.isPhone = this.$store.state.account.isPhone
    },
    methods: {
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
      seeHashSeed() {
        getAction(this.url.seed, {roomId: this.roomId}).then(res => {
          this.seedShow = true
          this.hashSeed = res.data.hash
        })
      },
      getWishWords() {
        getAction('/api/desire/wish/words').then(res => {
          this.wishWords = JSON.parse(res.data)
          this.chosedWords = this.wishWords[0]
        })
      },
      // 查看已许愿瓶子
      openModule() {
        this.myBottlePos()
        this.unWishShow = true
        // this.$refs.wishModule.isShow = true
      },
      vertifyRoom() {
        getAction(this.url.vertify, {roomId: this.roomId}).then(res => {
          this.fairShow = true
          this.overSeed = JSON.parse(res.data)
        })
      },
      choseWords(position) {
        let maxNext = this.wishWords.length
        if (position === 'next') {
          this.moveWidth - 1 > -maxNext ? --this.moveWidth : this.moveWidth = -maxNext + 1
        } else {
          this.moveWidth < 0 ? ++this.moveWidth : this.moveWidth = 0
        }
        this.chosedWords = this.wishWords[-this.moveWidth]
      },
      halfWish() {
        this.unWishShow = false
      },
      nextPage(current) {
        this.bottle.pageOne = current.pageOne
        this.bottle.pageTwo = current.pageTwo
        this.bottle.current = current.current
        this.bottlePaging = this.detailArr.userInfo.slice(current.pageOne - 1, current.pageTwo)
      },
      getDetail(page) {
        this.bottle.current = page
        let parmas = {roomId: this.roomId, size: 60, current: 1}
        getAction(this.url.detail, parmas).then(res => {
          this.detailArr = res.data
          res.data.userInfo.forEach(el => {
            el.isChose = false
          })
          this.detailArr.userInfo = res.data.userInfo
          this.bottlePaging = this.detailArr.userInfo.slice(this.bottle.pageOne - 1, this.bottle.pageTwo)
          // 总页数
          let page = this.detailArr.userInfo.length % this.bottle.size == 0 ?
           Math.floor(this.detailArr.userInfo.length / this.bottle.size) - 1 :
           Math.floor(this.detailArr.userInfo.length / this.bottle.size)
          // 60一页剩余瓶子数量
          let residueSize = this.detailArr.userInfo.length - (page * this.bottle.size)
          if (this.detailArr.userInfo.length > 60) {
            this.bottlePage = [{
              pageOne: 1,
              pageTwo: 60,
              current: 1,
              isFull: this.bottlePaging.slice(0, 60).filter(item => item.name).length === 60
            }]
            for (let i = 1; i < page; i++) {
              this.bottlePage.push({
                pageOne: this.bottlePage[i - 1].pageTwo + 1,
                pageTwo: this.bottlePage[i - 1].pageTwo + 60,
                current: i + 1,
                isFull: this.detailArr.userInfo.slice(this.bottlePage[i - 1].pageTwo, this.bottlePage[i - 1].pageTwo + 60).filter(item => item.name).length === 60
              })
            }
            this.bottlePage.push({
              pageOne: (page * 60) + 1,
              pageTwo: (page * 60) + residueSize,
              current: this.bottlePage.length + 1,
              isFull: this.detailArr.userInfo.slice((page * 60), (page * 60) + residueSize).filter(item => item.name).length === residueSize
            })
          } else {
            this.bottlePage = [{
              pageOne: (page * 60) + 1,
              pageTwo: (page * 60) + residueSize,
              current: this.bottlePage.length + 1,
              isFull: this.detailArr.userInfo.slice((page * 60), (page * 60) + residueSize).filter(item => item.name).length === residueSize
            }]
          }
          // this.handleData()
        })
      },
      choseBottle(ele) {
        if (!ele.isChose && !ele.name) {
          if (Math.floor(this.cardNum / this.detailArr.roomInfo.cardNum) <= this.userChoseNum.length) {
            return this.$Message.info('心愿卡数量不足')
          }
          ele.isChose = !ele.isChose
          this.userChoseNum.push(ele.room_num)
        } else {
          ele.isChose = !ele.isChose
          for (let i = 0; i < this.userChoseNum.length; i++) {
            if (this.userChoseNum[i] === ele.room_num) this.userChoseNum.splice(i, 1)
          }
        }
      },
      copy(str) {
        this.$copyText(str).then((e) => {
          this.$Message.success('复制成功')
        });
      },
      sha256(clientSeed, serverSeed) {
        if (!!clientSeed && !!serverSeed) {
          return this.sha256_digest(clientSeed + serverSeed)
        }
        return '暂无'
      },
      fastOrNormal(boolean) {
        this.isFast = boolean
        if (!this.$store.state.account.user.id) return this.$login()
        if (this.userChoseNum.length === 0 && !this.isFast) return this.$Message.info('请先选择许愿瓶')
        this.fastWish = true
        this.getWishWords()
      },
      async myBottlePos() {
        let res = await getAction(this.url.part, {roomId: this.roomId})
        if (res.data !== '') {
          this.myChosedNum = res.data.split(',')
        }
        this.title = '我的许愿瓶'
      },
      doWish: debounce(function (fast) {
        if (Math.floor(this.cardNum / this.detailArr.roomInfo.cardNum) < this.userChoseNum.length) {
          return this.$Message.error('心愿卡数量不足')
        }
        let parmas = {
          ids: '', // 自选
          num: this.randomNum, // 快选
          roomId: this.roomId,
          type: fast ? 0 : 1, // 0 随机 1 自选
          userSeed: localStorage.getItem('userSeed'),
          wishWords: this.chosedWords.wishingwords
        }
        if (this.userChoseNum.length > 0) {
          this.userChoseNum.forEach(el => {
            parmas.ids += el + ','
          })
          parmas.ids = parmas.ids.substring(0, parmas.ids.lastIndexOf(','))
        }
        postAction(this.url.join, parmas).then(res => {
          this.fastWish = false
          this.unWishNum = res.data.num //  失败数量
          this.unWishShow = true
          this.title = res.data.num ? '许愿瓶被抢占' : '放入成功'
          this.myChosedNum = res.data.join.split(',')
          this.getDetail(this.bottle.current)
          this.getCardNum()
        }).catch(e => {
          this.$Message.error(e.response.data.errMsg)
          this.errCode = e.response.data.errCode
        })
      }, 400),
      async getCardNum() {
        if (!this.user.id) return
        let res = await getAction(this.url.num)
        let response = await getAction(this.url.last, {roomId: this.roomId})
        this.leastCard = response.data
        this.cardNum = res.data.num ? res.data.num : 0
      },
      handleData() {
        for (let i = 0; i < this.detailArr.userInfo.length; i++) {
          for (let j = 0; j < this.userChoseNum.length; j++) {
            console.log(this.userChoseNum)
            if (this.detailArr.userInfo[i].room_num === this.userChoseNum[j]) {
              this.detailArr.userInfo[i].isChose = true
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/ .ivu-input-number-large{
    width: 100%;
  }

  /deep/ .ivu-input-number-large input{
    font-size: 18px;
    color: #89CCFF !important;
    font-family: Arial Black;
  }

  /deep/ .ivu-input-wrapper .ivu-input-large{
    background: #030F43 !important;
    border: 1px solid !important;
    border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 1 1;
    box-shadow: 0 1px 18px 2px rgba(37, 227, 255, 0.5);
    border-radius: 5px;
    color: #89CCFF !important;
    font-size: 16px;
  }

  /deep/ .ivu-input-number-input{
    border: none !important;
  }

  .user-btn{
    height: 36px;
    background: linear-gradient(0deg, #021A52, #29459F);
    border: 1px solid;
    border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 1 1;
    border-radius: 5px;
    color: #FFFFFE;
    margin: 0 5px;
    font-size: 15px;
  }

  .wish-detail{
    background: url("../../assets/image/wish/detailtop.png") no-repeat top left / 100%,
    url("../../assets/image/wish/wishbot.png") #141727 no-repeat bottom left / 100%;
    padding-bottom: 10%;
    min-width: 1367px;
  }

  .gold{
    background: url("../../assets/image/wish/wishgold.png") no-repeat center bottom / 50%;
  }

  .red{
    background: url("../../assets/image/wish/wishpink.png") no-repeat center bottom / 50%;
  }

  .purple{
    background: url("../../assets/image/wish/wishpur.png") no-repeat center bottom / 50%;
  }

  .pink{
    background: url("../../assets/image/wish/wishred.png") no-repeat center bottom / 50%;
  }

  .blues{
    background: url("../../assets/image/wish/wishblues.png") no-repeat center bottom / 50%;
  }

  .blue{
    background: url("../../assets/image/wish/wishblue.png") no-repeat center bottom / 50%;
  }

  .white{
    background: url("../../assets/image/wish/wishwhite.png") no-repeat center bottom / 50%;
  }

  .wish-names{
    -webkit-clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
    clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
    padding: 1px;
    background: linear-gradient(90deg, #92BEFF, #589FFF, #92BEFF);
    margin: 22px auto;
    width: max-content;

    > span{
      display: inline-block;
      font-size: 14px;
      color: #33EEFF;
      background: linear-gradient(90deg, #000000, #033F91, #000000);
      box-shadow: 0 1px 9px 1px rgba(31, 35, 36, 0.35), 0 6px 8px 0 rgba(19, 116, 221, 0.5) inset;
      text-align: center;
      padding: 7px 28px;
      -webkit-clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
      clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
    }
  }

  .wish-step{
    height: 100px;
    padding-top: 250px;
    padding-bottom: 30px;
    display: flex;
    justify-content: space-around;
  }

  .how-play{
    text-align: center;
    font-size: 12px;
    color: #FFFFFF;
    margin-right: 5px;
    cursor: pointer;

    p{
      font-size: 15px;
    }

    > div:nth-of-type(1){
      width: 29px;
      height: 29px;
      margin: 0 auto 10px;

      img{
        width: 100%;
      }
    }
  }

  .room-detail{
    display: flex;
    justify-content: space-around;

    .wish-img{
      margin: 10px 0;
      padding-bottom: 12%;
    }

    .skins-info{
      width: 450px;
    }

    .left-info{
      background: linear-gradient(-90deg, rgba(17, 17, 66, .7), rgba(21, 27, 150, .7));
      border: 0 solid #000000;
      width: 240px;
      height: 100px;
      box-shadow: 0 1px 20px 3px rgba(6, 9, 26, 0.1);
      border-radius: 8px;
      padding: 10px 20px;
      margin-top: 50px;

      > p:nth-of-type(1){
        font-size: 15px;
        color: #FFFFFF;
        text-align: center;
        margin-bottom: 10px;
        font-weight: bolder;
      }

      > p:nth-of-type(2){
        background: #083F65;
        border: 3px solid #57E1FF;
        border-radius: 10px;
        font-size: 15px;
        color: #33EEFF;
        width: 127px;
        padding: 4px 0;
        text-align: center;
        margin: auto;
        cursor: pointer;
      }


    }

    .itme-one{
      margin-left: auto;
    }

    .itme-two{
      margin-right: auto;
      background: linear-gradient(90deg, #111142, rgba(21, 27, 150, .5));
    }
  }

  .room-det{

    .wish-skins-name{
      font-size: 15px;
      color: #FFFFFF;
      text-align: center;
      font-weight: bolder;
    }

    .wish-pricr{
      text-align: center;
      font-size: 20px;
      font-family: Arial Black;
      color: #F82226;
      i{
        font-size: 20px;
      }
    }


    .wish-progress{
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #497FE6;
      display: inline-block;
      padding-top: 10px;
      margin-left: 10px;
    }

    .last-card{
      width: 430px;
      margin: auto;
      display: flex;

      > div{
        background: #131728;
        border: 1px solid rgba(83, 91, 139, 0.6);
        padding: 5px;
        width: 400px;
        margin: 10px auto 0;
        text-align: center;

        > div{
          background: #232845;
          border: 0 solid #000000;
          height: 10px;

          > div{
            width: 40%;
            height: 100%;
            background: linear-gradient(-90deg, #2FBDFF, #2D5FCF, #5391D0);
          }
        }
      }
    }
  }

  .bottle{
    width: 1368px;
    margin: auto;
  }

  .bottle-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0 26px 0;

    img{
      width: 60px;
      margin-right: 10px;
    }

    > div:nth-of-type(1){
      font-size: 27px;
      font-weight: 400;
      color: #FFFFFF;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }

  .buy-btn{
    background: linear-gradient(180deg, #FF32DA, #E71DC1);
    padding: 1px 1px 1px 1px;
    -webkit-clip-path: polygon(4% 0%, 96% 0%, 100% 10%, 100% 86%, 96% 100%, 6% 99%, 0% 90%, 0% 19%);
    clip-path: polygon(4% 0%, 96% 0%, 100% 10%, 100% 86%, 96% 100%, 6% 99%, 0% 90%, 0% 19%);
    color: #FFFFFF;
    cursor: pointer;

    > div{
      font-size: 17px;
      padding: 12px 30px;
      background: linear-gradient(0deg, #410740, #700D69, #AF159B);
      -webkit-clip-path: polygon(4% 0%, 96% 0%, 100% 10%, 100% 86%, 96% 100%, 6% 99%, 0% 90%, 0% 19%);
      clip-path: polygon(4% 0%, 95% 0%, 99% 9%, 99% 85%, 95% 99%, 5% 98%, 0% 89%, 0% 18%);
      font-weight: 500;

      &:hover{
        background: linear-gradient(0deg, #510A50, #770E70, #B517A1);
      }
    }

  }

  .wish-btn{
    display: flex;
    align-items: center;

    > p{
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFCA6E;
      margin-right: 20px;
      cursor: pointer;
      opacity: .8;

      &:hover{
        opacity: 1;
      }
    }

    .card-num{
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-right: 20px;

      .my-card{
        margin-right: 15px;
        margin-left: 10px;

        > p:nth-of-type(1){
          font-size: 24px;
          font-family: Arial Black;
          color: #FFFFFF;
        }

        > p:nth-of-type(2){
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
        }
      }

      img{
        width: 80%;
        margin-left: 20%;
      }
    }


    .fast-btn{
      background: linear-gradient(180deg, #DD2A52, #E81745);
      margin-left: 20px;

      > div{
        background: linear-gradient(0deg, #4A0413, #6A0B1F, #BE1339);

        &:hover{
          background: linear-gradient(0deg, #580617, #760C22, #C6173E);
        }
      }
    }

    > div{
      font-size: 22px;
      font-weight: 500;
      color: #FFFFFF;
      cursor: pointer;
    }
  }

  .bottle-page{
    border-top: 1px solid rgba(255, 255, 255, .3);
    padding: 30px 20px;
    display: flex;
    flex-wrap: wrap;

    > div{
      font-size: 17px;
      color: #FFFFFF;
      line-height: 28px;
      text-align: center;
      text-shadow: 0 1px 11px rgba(0, 0, 0, 0.3);
      padding: 7px 30px;
      opacity: .6;
      cursor: pointer;
      position: relative;
      background: url("../../assets/image/wish/navbg.png") no-repeat center center / 100%;
      margin-right: 9px;
      margin-bottom: 20px;
      width: 180px;

      > div:nth-of-type(2){
        position: absolute;
        font-size: 12px;
        background: linear-gradient(0deg, #750B21, #CD2147);
        border: 0 solid #000000;
        border-radius: 5px;
        line-height: 12px;
        padding: 3px 3px;
        top: 27%;
        right: 7%;
      }

      &.active{
        opacity: 1;
      }

      &:hover{
        opacity: 1;
      }
    }
  }

  .bottle-list{
    background: linear-gradient(0deg, rgba(20, 23, 39, 0.2), rgba(28, 32, 85, 0.2), rgba(0, 25, 255, 0.2));
    border: 1px solid;
    border-image: linear-gradient(0deg, rgba(27, 57, 92, 0.6), rgba(14, 52, 93, 0.6)) 1 1;
    box-shadow: 0 5px 5px 0 rgba(2, 38, 255, 0.1);
    padding: 20px 11px;

    > div:nth-of-type(1) p{
      font-size: 18px;
      line-height: 40px;
      font-weight: bolder;

      span{
        color: #F82226;
      }
    }

    > ul{
      display: flex;
      flex-wrap: wrap;

      .m-width{
        width: 95px;
      }

      li{
        width: 98px;
        height: 112px;
        position: relative;
        margin-right: 14px;
        margin-bottom: 10px;
        perspective: 190px;

        &.hover{
          .cover{
            transform: rotateY(180deg);
          }

          .back{
            transform: rotateY(0deg);
          }
        }

        .cover, .back{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          padding: 3px;
          transition: transform .5s ease-in-out;
        }

        .back{
          backface-visibility: hidden;
          transform: rotateY(-180deg);
          background: linear-gradient(0deg, rgba(151, 145, 44, .5), rgba(24, 22, 7, .5), rgba(60, 54, 31, .5), rgba(67, 64, 18, .5));
          border: 2px solid;
          border-image: linear-gradient(0deg, rgba(73, 67, 29, 0.2), rgba(132, 116, 51, 0.2)) 2 2;
          border-radius: 10px;
          //position: relative;

          .li-avatar{
            height: 35px;
            width: 35px;
            margin: auto;
          }

          .is-self{
            height: 35px;
            width: 35px;
            margin: auto;
            position: relative;
            border-radius: 50%;

            &::after{
              content: "";
              display: block;
              position: absolute;
              top: -3px;
              right: -3px;
              bottom: -3px;
              left: -3px;
              border-radius: 50%;
              background: linear-gradient(42deg, #FF2C59, #85FEFF, #FF335F, #00F0FF);
              z-index: -1;
            }
          }

          .bottle-num{
            position: absolute;
            top: 5px;
            left: 5px;
            background: linear-gradient(0deg, #B8930D, #886C0D);
            border: 0 solid #000000;
            border-radius: 5px;
            color: #FFFFFE;
            padding: 1px 3px;
          }

          &.lucker{
            p:nth-of-type(1){
              color: #FFC800;
            }

            p{
              opacity: 1;
            }
          }

          &.active{
            p:nth-of-type(1){
              color: #FFC800;
            }

            p{
              opacity: 1;
            }

          }

          .wish-user{
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            text-align: center;
            opacity: 0.5;
            padding: 0 3px;
          }

          img{
            height: 35px;
            border-radius: 50%;
          }

          p{
            font-size: 18px;
            font-family: Arial Black;
            font-weight: 500;
            color: #FFFFFF;
            opacity: 0.5;
            text-align: right;
          }
        }

        .cover{
          background: url("../../assets/image/wish/empty.png") no-repeat center center / 80%,
          linear-gradient(0deg, #152C4C, #1A3E8E, #1F4598);
          border-image: linear-gradient(0deg, rgba(0, 90, 127, 0.6), rgba(4, 96, 149, 0.6)) 2 2;
          border-radius: 10px;
          cursor: pointer;
          transform: rotateY(0deg);
          backface-visibility: hidden;
          position: relative;

          > i{
            position: absolute;
            bottom: 4px;
            left: 7px;
            color: #33EEFF;
            font-weight: bolder;
          }

          &.active{
            border: 4px solid;
            //box-shadow: 0 1px 18px 2px #25FCFF;
            border-image: linear-gradient(0deg, #FF2C59, #85FEFF, #FF335F, #00F0FF) 4 4;
            background: url("../../assets/image/wish/empty.png") no-repeat center center / 80%,
            linear-gradient(0deg, #152C4C, #1A3E8E, #1F4598);
          }

          p{
            font-size: 18px;
            font-family: Arial Black;
            font-weight: 400;
            color: #33EEFF;
            text-align: right;
          }
        }


      }
    }
  }

  .wish-artical{
    display: flex;
    justify-content: space-around;

    div:nth-of-type(2n+1){
      width: 50px;

      img{
        width: 100%;
        cursor: pointer;
      }
    }

    > div:nth-of-type(2){
      width: 300px;
      overflow: hidden;
      height: 50px;

      > div{
        display: flex;
        width: max-content;
        transition: all .2s ease-in;
        height: 100%;

        div{
          width: 300px;
          height: 100%;
          font-size: 14px;
          background: linear-gradient(-90deg, rgba(18, 21, 45, 0), rgba(0, 49, 98, 0.99), rgba(20, 23, 39, 0));
          color: #05F0F8;
          padding: 9px 17px;
          cursor: pointer;
          box-sizing: border-box;
          border: 1px solid;
          border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 1 1;
          box-shadow: 0 1px 18px 2px rgba(37, 227, 255, 0.5);
        }
      }

    }
  }

  .buy-card{
    width: 100%;
    background: #030F43;
    border: 1px solid;
    border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 1 1;
    box-shadow: 0 1px 18px 2px rgba(37, 227, 255, 0.5);
    border-radius: 5px;
    margin-bottom: 20px;

    .ivu-input{
      border-radius: 5px;
    }
  }

  .buy-upgrade{
    display: flex;
    margin-top: 30px;

    > div{
      > div{
        padding: 10px 30px;
      }
    }

    > div:nth-of-type(1){
      margin-left: auto;
    }

    > div:nth-of-type(2){
      margin-left: 20px;
      margin-right: auto;
    }
  }

  .split-line{
    height: 1px;
    background: linear-gradient(-90deg, rgba(18, 21, 45, 0), rgba(45, 167, 244, 0.97), rgba(20, 23, 39, 0));
    width: 100%;
    margin-bottom: 20px;
  }

  .copy-pos{
    position: relative;
    width: 100%;

    p{
      width: 80%;
    }

    > div{
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .verty-posi{
    display: flex;
    position: absolute;
    right: 0%;
    bottom: 0%
  }

  @media screen and (max-width: 767px){
    .room-detail .left-info{
      width: 45%;
      height: auto;
      margin-top: 10px;
    }

    .step-go{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 95%;
      margin: auto;
      padding-top: 32%;
      padding-bottom: 0;
    }

    .step-go img{
      width: 31%;
    }

    .step-go div{
      height: 2px;
      width: 10px;
    }


    .wish-step{
      height: auto;
      padding-bottom: 0;
      padding-top: 0;
    }

    .wish-finish{
      display: flex;
      width: 70%;
      margin: auto;
      padding-top: 32%;
      padding-bottom: 0;

      > img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      > div{
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 400;
        font-style: italic;
        color: #FFFFFF;
      }
    }

    .wish-finish span{
      color: #F82226;
      font-size: 16px;
    }

    .wish-detail{
      background: url("../../assets/image/wish/detailbgm.png") no-repeat top left / 100%,
      url("../../assets/image/wish/wishbotm.png") #141727 no-repeat bottom left / 100%;
      padding-bottom: 10%;
      min-width: auto;
    }

    .room-detail{
      .left-info{
        p > span{
          font-size: 15px;
          color: #F82226;
        }

        p:nth-of-type(1){
          margin-bottom: 0;
        }

        p:nth-of-type(3){
          margin-top: 0;
        }
      }
    }


    .room-det .last-card{
      width: 80%;
      margin: 20px auto;
    }

    .wish-img{
      padding-bottom: 10%;
    }

    .wish-btn{
      > p{
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFCA6E;
        margin-right: 5px;
        cursor: pointer;
        opacity: .8;

        &:hover{
          opacity: 1;
        }
      }

      .card-num{
        margin-right: 0;
      }

      .buy-btn{
        margin-left: auto;

        > div{
          padding: 5px 20px;
        }
      }

      .fast-btn{
        margin-right: auto;
      }
    }

    .bottle-nav{
      justify-content: space-between;
      padding: 20px 0;


      img{
        width: 30px;
        margin-right: 5px;
      }

      > div:nth-of-type(1){
        font-size: 16px;
        display: flex;
        align-items: center;
      }
    }

    .bottle{
      width: 92%;
      margin: 50px auto;
    }

    .wish-artical{
      justify-content: space-between;
      align-items: center;

      div:nth-of-type(2n+1){
        width: 40px;

        img{
          width: 100%;
        }
      }

      > div:nth-of-type(2){
        width: 180px;
        overflow: hidden;

        > div{
          display: flex;
          width: max-content;
          transition: all .2s ease-in;

          div{
            width: 180px;
            height: 40px;
            font-size: 14px;
            background: linear-gradient(-90deg, rgba(18, 21, 45, 0), rgba(0, 49, 98, 0.99), rgba(20, 23, 39, 0));
            color: #05F0F8;
            padding: 9px;
            margin-bottom: 10px;
            cursor: pointer;
            box-sizing: border-box;
            border: 1px solid;
            border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 1 1;
            box-shadow: 0 1px 18px 2px rgba(37, 227, 255, 0.5);
          }
        }

      }
    }


    .wish-words{
      font-size: 12px;
      margin-bottom: 5px;
    }

    .buy-upgrade{
      margin-top: 14px;

      > div{
        > div{
          padding: 6px 10px;
        }
      }
    }

    .bottle-list{
      > p{
        line-height: normal;
        margin-bottom: 10px;
      }

      ul{
        .m-width{
          width: 31%;
        }

        li{
          width: 24%;
          height: 100px;
          margin-right: 1%;

          .back img{
            height: 35px;
          }

          .cover, .back{
            p{
              font-size: 14px;
              line-height: normal;
            }
          }
        }
      }

      p{
        font-size: 14px;
      }
    }

    .user-btn{
      font-size: 12px;
      height: 30px;
    }

    .bottle-page{
      padding: 20px 0;
      width: 100%;
      overflow-x: auto;
      flex-wrap: nowrap;

      &::-webkit-scrollbar{
        display: none;
      }

      > div{
        padding: 4px 20px;
        margin-bottom: 0;
        margin-right: 10px;

        > div:nth-of-type(1){
          width: 120px;
        }

        > div:nth-of-type(2){
          right: 4%;
        }
      }
    }

    /deep/ .ivu-input-wrapper .ivu-input-large{
      height: 30px;
      font-size: 14px;
    }
  }

</style>
