<template>
  <div>
    <hash-module v-model="choseBox" width="10.2" :title=" isReverse ? '创建反转对战' : '创建常规对战'">
      <div class="number-shell">
        <div class="battle-number">
          <div @click="peopleNum = 2" :class="{'active': peopleNum === 2}">
            <div class="number-circle">
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div>双人</div>
          </div>
          <div @click="peopleNum = 3" :class="{'active': peopleNum === 3}">
            <div class="number-circle">
              <div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
            <div>三人</div>
          </div>
          <div @click="peopleNum = 4" :class="{'active': peopleNum === 4}">
            <div class="number-circle">
              <div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div>四人</div>
          </div>
        </div>
        <div class="fast-mode" style="top: 5%" @click="roomMode(1)" v-show="!isReverse && !isInviteChose">
          <div class="all-chosed">
            <i class="iconfont iconicon-select" v-show="isRobot"></i>
          </div>
          <span class="chose-lable">人机模式</span>
        </div>
        <div class="fast-mode" style="top: 50%" @click="roomMode(2)">
          <div class="all-chosed">
            <i class="iconfont iconicon-select" v-show="isInvite"></i>
          </div>
          <span class="chose-lable">邀请模式</span>
        </div>
      </div>
      <div class="battle-boxchosed">
        <div class="filter-box">
          <div class="filter-item">
            <div class="item-label">箱子价格区间</div>
            <div>
              <Select label-in-value placeholder="全部"
                      size="small"
                      v-model="searchForm.price">
                <Option :key="el.value" v-for="(el,idx) in filterPrice" :value="el.value">
                  <i v-show="idx !== 0" class="iconfont icon-icon_diamond1 font-s" style="color: #515a6e"></i>
                  {{ el.condition }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="filter-item">
            <div class="item-label">箱子类别名称</div>
            <div>
              <Select label-in-value placeholder="全部"
                      size="small"
                      v-model="searchForm.name">
                <Option :key="el.value" v-for="el in filterTitle" :value="el.value">
                  {{ el.title }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="filter-item">
            <div class="item-label">箱子胜率区间</div>
            <div>
              <Select label-in-value placeholder="全部"
                      size="small"
                      v-model="searchForm.probability">
                <Option :key="el.condition" v-for="el in filterPro" :value="el.condition">
                  {{ el.value }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="filter-name">
            <Input type="text" placeholder="箱子关键词" v-model="searchForm.boxName" size="large"/>
          </div>
        </div>
        <div class="box-info-hash">
          <div class='box-shell' style="background-size: 100% 100%"
               :style="{'background-image': 'url('+ imgHost(item.beasemap)+')'}"
               v-for="(item,idx) in limitBox"
               :key="idx" @click="addBox(item)">
            <p>HASH箱</p>
            <div class="hash-win-pro">
              <div>{{ item.probability }}<span>胜</span>
              </div>
            </div>
            <div class="box-shell-img">
              <img :src="imgHost(item.background)" style="height: 90%">
              <img :src="imgHost(item.image)" style="height:50%">
            </div>
            <p>{{ item.name }}</p>
            <div class="hide-hover-bat hide-hover" style="width: max-content">
              <span><i class="iconfont icon-icon_diamond1 diamond-two"></i> {{ item.price.toFixed(2) }}</span>
            </div>
            <img src="../../assets/image/upgrade/chose.png" alt="">
            <div class="view-del" @click.stop="viewBoxStuff(item)"><i class="iconfont icon-icon_view"></i></div>
          </div>
        </div>
      </div>
      <div class="added-box">
        <p>已添加 {{ count }} 个箱子(最多十个箱子)</p>
        <div class="add-box-info">
          <div class="added-box-type"
               @click="deleteBox(idx)"
               v-for="(el, idx) in addedBox" :key="idx" v-show="addedBox.length > 0">
            <div class="added-img">
              <img :src="imgHost(el.background)" style="height: 90%">
              <img :src="imgHost(el.image)" style="height:75%">
            </div>
            <p>{{ el.name }}</p>
            <div class="delete-box">
              <i class="iconfont iconicon-close"></i> 删除
            </div>
            <div class="box-price-bat"> <i class="iconfont icon-icon_diamond1 font-s"></i> {{ el.price }}</div>
          </div>
          <Empty info="还未选择箱子哦" v-show="addedBox.length == 0"></Empty>
        </div>
      </div>
      <div @click="goPay" class="default-btn creat-btn" style="width: max-content;margin: auto;display: flex">
        <div>创建</div>
        <div><i class="iconfont icon-icon_diamond1 diamond-two"></i> {{ roomPrice }}</div>
      </div>
    </hash-module>
    <!--            移动端选择浮动层-->
    <div class="pop-up-select-items  hide-p hide-ipad" :class="{'active': selectArticle}">
      <i class="iconfont iconicon-close" @click="selectArticle = false"></i>
      <div class="module-bg">
        <h3>创建{{ isReverse ? '反转' : '常规' }}对战</h3>
        <div class="battle-number">
          <div @click="peopleNum = 2" :class="{'active': peopleNum === 2}">
            <div class="number-circle">
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div>双人</div>
          </div>
          <div @click="peopleNum = 3" :class="{'active': peopleNum === 3}">
            <div class="number-circle">
              <div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
            <div>三人</div>
          </div>
          <div @click="peopleNum = 4" :class="{'active': peopleNum === 4}">
            <div class="number-circle">
              <div>
                <div></div>
                <div></div>
              </div>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div>四人</div>
          </div>
        </div>
      </div>

      <div class="screening-box-m">
        <div class="flex-layout">
          <h2 class="hide-ipad">选择箱子</h2>
          <div class="fast-mode" @click="roomMode(1)" v-show="!isReverse  && !isInviteChose">
            <div class="all-chosed">
              <i class="iconfont iconicon-select" v-show="isRobot"></i>
            </div>
            <span class="chose-lable">人机模式</span>
          </div>
          <div class="fast-mode" @click="roomMode(2)" v-show="!isReverse  && !isInviteChose">
            <div class="all-chosed">
              <i class="iconfont iconicon-select" v-show="isInvite"></i>
            </div>
            <span class="chose-lable">邀请模式</span>
          </div>
        </div>
        <div class="screening-type">
          <div class="filter-item">
            <div class="item-label">箱子类别名称</div>
            <div>
              <Select label-in-value placeholder="全部"
                      size="small"
                      v-model="searchForm.name">
                <Option :key="el.value" v-for="el in filterTitle" :value="el.value">
                  {{ el.title }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="filter-item">
            <div class="item-label">箱子胜率区间</div>
            <div>
              <Select label-in-value placeholder="全部"
                      size="small"
                      v-model="searchForm.probability">
                <Option :key="el.condition" v-for="el in filterPro" :value="el.condition">
                  {{ el.value }}
                </Option>
              </Select>
            </div>
          </div>
        </div>
        <div class="screening-input">
          <div class="filter-item">
            <div class="item-label">箱子价格区间</div>
            <div>
              <Select label-in-value placeholder="全部"
                      size="small"
                      v-model="searchForm.price">
                <Option :key="el.value" v-for="el in filterPrice" :value="el.value">
                  {{ el.condition }}
                </Option>
              </Select>
            </div>
          </div>
          <div class="filter-name">
            <Input type="text" placeholder="箱子关键词" v-model="searchForm.boxName" size="large"/>
          </div>
        </div>
      </div>
      <div class="screening-box-m">
        <div class="box-info-hash">
          <div class='box-shell' v-for="(item,idx) in limitBox"
               :key="idx" @click="addBox(item)"
               :style="{'background-image': 'url('+ imgHost(item.beasemap)+')'}">
            <p>HASH箱</p>
            <div class="hash-win-pro">
              <div>{{ item.probability }}<span>胜</span>
              </div>
            </div>
            <div class="box-shell-img">
              <img :src="imgHost(item.background)" style="height: 90%">
              <img :src="imgHost(item.image)" style="height:50%">
            </div>
            <p>{{ item.name }}</p>
            <div class="hide-hover-bat hide-hover" style="width: max-content">
              <span><i class="iconfont icon-icon_diamond1 diamond-two"></i> {{ item.price }}</span>
            </div>
            <img src="../../assets/image/upgrade/chose.png" alt="">
            <div class="view-del" @click.stop="viewBoxStuff(item)"><i class="iconfont icon-icon_view"></i></div>
          </div>
        </div>
        <div class="added-box">
          <p>已添加 {{ count }} 个箱子(最多十个箱子)，单击删除已选箱子</p>
          <div class="add-box-info">
            <div v-show="addedBox.length > 0" class="added-box-type" v-for="(el, idx) in addedBox" :key="idx"
                 @click="deleteBox(idx)">
              <div class="added-img">
                <img :src="imgHost(el.background)" style="height: 90%">
                <img :src="imgHost(el.image)" style="height:50%">
              </div>
              <p>{{ el.name }}</p>
              <div class="delete-box">
                <i class="iconfont iconicon-close"></i> 删除
              </div>
              <div class="box-price-bat">
                <span><i class="iconfont icon-icon_diamond1 fdc-color"></i> {{ el.price }}</span>
              </div>
            </div>
            <Empty info="还未选择箱子哦" v-show="addedBox.length === 0"></Empty>
          </div>
        </div>
        <div @click="goPay" class="default-btn creat-btn"
             style="padding: 10px 10px;margin-bottom: .2rem;font-size: 15px">
          <div style="width: max-content;margin: auto;display: flex">
            <div>创建对战 <i class="iconfont icon-icon_diamond1 diamond-two"></i></div>
            <div>{{ roomPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pop-up-select-items  hide-p hide-ipad" :class="{'active': surePay}">
      <i class="iconfont iconicon-close" @click="surePay = false"></i>
      <div class="battle-module-m">
        <h3>确定支付</h3>
        <p style="margin-top: .4rem;padding: 0 10px">Hash算法保证游戏公平，我们会公示服务器种子，您也可以修改用户种子，以保证我们无法提前知道结果。</p>
      </div>
      <div style="padding: 0 .2rem;">
        <div class="battle-seed-change">
          <Row align="middle">
            <ColC span="6"><span>用户种子: </span></ColC>
          </Row>
          <Row align="middle">
            <ColC span="16"><Input :maxlength="16" v-model="battleSeed" placeholder="请输入16位英文字母"/>
            </ColC>
          </Row>
          <Row align="middle" style="margin-top: .2rem">
            <ColC span="8"><span>服务器种子Hash: </span></ColC>
            <ColC span="14">
              <div class="client-seed">
                <i class="iconfont iconicon-view2"></i><span @click="check = !check">查看</span>
              </div>
            </ColC>
          </Row>
          <Row>
            <div class="battle-hash" :class="{'active': check}">
              <div style="display: flex;align-items: center;" v-for="(el,idx) in hashData"
                   :key="idx">
                <ColC span="3">
                  <div class="seed-style">
                    <img :src="imgHost(el.background)" alt="">
                    <img :src="imgHost(el.image)" alt="">
                  </div>
                </ColC>
                <ColC span="2">
                  <div class="idot-split">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </ColC>
                <ColC span="13">
                  <div class="client-hash"><span :title="el.hash">{{ el.hash }}</span></div>
                </ColC>
                <ColC span="6">
                  <div class="default-btn" @click="copy(el.hash)" style="margin-left: 20%;margin-right: 10%">复制</div>
                </ColC>
              </div>
            </div>
          </Row>
        </div>
      </div>
      <div class="screening-box-m">
        <div class="payment">
          <p>确定支付即可创建或加入房间，房间若未成功开启，则退还全额，在等待中不能退出和取消房间。</p>
          <div class="default-btn creat-btn" @click="payHandle">确定支付</div>
        </div>
        <div class="game-tips-words"> 本站所有游戏道具，只能本人取回到游戏内使用，均不允许站内交易及互换</div>
      </div>
    </div>
    <hash-module v-model="payment" width="9" title="确定支付">
      <div>
        <div class="battle-seed">
          <p>Hash算法保证游戏公平，我们会公示服务器种子，您也可以修改用户种子，以保证我们无法提前知道结果。</p>
          <div class="battle-seed-change">
            <Row align="middle">
              <ColC span="6"><span>用户种子： </span></ColC>
              <ColC span="16"><Input :maxlength="16" v-model="battleSeed" placeholder="请输入16位英文字母"/>
              </ColC>
            </Row>
            <Row align="middle" style="margin-top: .2rem">
              <ColC span="6"><span>服务器种子Hash：</span></ColC>
              <ColC span="16">
                <div class="client-seed">
                  <i class="iconfont iconicon-view2"></i><span @click="check = !check"> 查看</span>
                </div>
              </ColC>
            </Row>
            <div class="battle-hash" :class="{'active': check}">
              <div style="display: flex;align-items: center" v-for="el in hashData"
              >
                <ColC span="3">
                  <div class="seed-style">
                    <img :src="imgHost(el.background)" alt="">
                    <img :src="imgHost(el.image)" alt="">
                  </div>
                </ColC>
                <ColC span="1">
                  <div class="idot-split">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </ColC>
                <ColC span="13">
                  <div class="client-hash"><span style="cursor: default" :title="el.hash">{{ el.hash }}</span></div>
                </ColC>
                <ColC span="6">
                  <div class="default-btn" @click="copy(el.hash)" style="margin-left: 40%">复制</div>
                </ColC>
              </div>
            </div>
          </div>
        </div>
        <div class="payment">
          <p>确定支付即可创建或加入房间，房间若未成功开启，则退还全额，在等待中不能退出和取消房间。</p>
          <p > 本站所有游戏道具，只能本人取回到游戏内使用，均不允许站内交易及互换</p>
          <div class="default-btn creat-btn" @click="payHandle">确定支付</div>
        </div>
      </div>
    </hash-module>
    <hash-module v-model="boxDel" :width="8" title="箱子物品">
      <div class="box-dels">
        <div align="center" :style="{'background-image': `url(${imgHost(boxStuff.box.background)})`}">
          <img :src="imgHost(boxStuff.box.image)" alt="">
        </div>
        <p>{{ boxStuff.box.name }}</p>
      </div>
      <div class="stuff-box">
        <div v-for="el in boxStuff.list" :key="el.id">
          <div :class="'drop-qua-' + conversionStyle(el.rarity,el.category)">
            <div style="display: flex;justify-content: space-between; padding: 3px 10px 0;">
              <p class="good-price"><span><i class="iconfont icon-icon_diamond1"></i></span> {{ el.price }}</p>
            </div>
            <!--            <p class="probabilitys" style=" padding-right: 10px;">-->
            <!--              {{ el.startProbability.toFixed(4) }}-{{ el.endProbability.toFixed(4) }}</p>-->
            <div class="drop-gun-img">
              <img :src="el.image" alt="skins">
            </div>
          </div>
          <div class="store-goods">
            <p> {{ el.name.split('|')[0] }} </p>
            <p>{{ el.name.split('|')[1] ? el.name.split('|')[1] : '' }}</p>
          </div>
        </div>
      </div>
    </hash-module>
  </div>
</template>

<script>
import {getAction, postAction} from "../../api/manage";
import Empty from '../Empty/Empty';
import {mapActions, mapState} from "vuex";
import HashModule from "../HashModule/HashModule";

export default {
  name: "battleModule",
  components: {HashModule, Empty},
  data() {
    return {
      selectArticle: false,
      surePay: false,
      limitBox: [],
      payment: false,
      boxDel: false,
      isReverse: 0, // 反转模式
      isInviteChose: false,
      isRobot: false, // 人机房
      isInvite: false, //  邀请模式
      choseBox: false,
      joinTime: 3, // 邀请时间
      searchForm: {
        price: '0-9999',
        name: 'all',
        probability: '0-999',
        boxName: '',
      },
      filterPrice: [
        {condition: '全部', value: '0-9999'},
        {condition: " 0-5", value: '0-5'},
        {condition: " 5-20", value: '5-20'},
        {condition: " 20-100", value: '20-100'},
        {condition: " 100+", value: '100-9999'}
      ],
      filterTitle: [{title: '全部', value: 'all'}],
      filterPro: [
        {value: '全部', condition: '0-999'},
        {value: '0-20', condition: '0-20'},
        {value: '20-40', condition: '20-40'},
        {value: '40-60', condition: '40-60'},
        {value: '60-80', condition: '60-80'},
        {value: '80-100', condition: '80-100'},
      ],
      battleSeed: '',
      peopleNum: 2,
      isFast: false,
      check: false,
      count: 0,
      filterBoxName: '',
      commonPool: [],
      addedBox: [],
      roomId: null,
      hashData: [],
      boxStuff: {
        box: {image: '', background: '', name: ''},
        list: []
      },
      url: {
        boxs: '/api/box/boxs',
        creat: '/api/battle/create',
        clientHash: '/api/battle/create/hash',
        pay: '/api/battle/join/battle/room',
        stuff: '/api/home/box/stuff',
        time: '/api/battle/invite/time'
      }
    }
  },
  created() {
    this.getBoxData()
    let seed = localStorage.getItem('userSeed')
    this.battleSeed = seed ? seed : ''
    this.$bus.$on('again', data => {
      if (this.$store.state.account.isPhone) {
        this.selectArticle = data
      }else {
        this.choseBox = data
      }
      let arr = JSON.parse(sessionStorage.getItem('playAgain'))
      this.addedBox = arr.data
      this.peopleNum = arr.state.number
      // roomType 0邀请模式 1普通模式 2.人机模式
      this.isRobot = arr.state.roomType === 2 ? true : false
      this.isReverse = arr.state.type
      this.isInvite = arr.state.roomType === 0 ? true : false
      this.isFast = arr.state.isFast === 0 ? false : true
    })
  },
  computed: {
    ...mapState('account', ['user']),
    roomPrice() {
      let value = 0
      this.addedBox.forEach(el => {
        value += el.price
      })
      this.count = this.addedBox.length
      return value.toFixed(2)
    }
  },
  watch: {
    payment(nv) {
      if (nv) {
        this.getHash()
      }
    },
    surePay(nv) {
      if (nv) {
        this.getHash()
      }
    },
    searchForm: {
      handler() {
        this.filterMoney()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('account', ['getUser']),
    copy(text) {
      this.$copyText(text).then((e) => {
        this.$Message.success('复制成功')
      });
    },
    /*
    * type 1 人机 2，邀请模式
    * */
    roomMode(type) {
      if (type === 1) {
        this.isInvite = false
        return this.isRobot = !this.isRobot
      }
      if (type === 2) {
        this.isRobot = false
        return this.isInvite = !this.isInvite
      }
    },
    viewBoxStuff(item) {
      let parmas = {boxId: item.id}
      getAction(this.url.stuff, parmas).then(res => {
        this.boxDel = true
        this.boxStuff.box = item
        this.boxStuff['list'] = res.data
      })
    },
    async getBoxData() {
      let parmas = {boxType: 1}
      try {
        let res = await getAction(this.url.boxs, parmas)
        let result = await getAction(this.url.time)
        this.joinTime = result.data / 60
        let arr = []
        res.data.forEach(el => {
          this.limitBox.push(...el.boxVoList)
          this.filterTitle.push({title: el.title, value: el.title})
          this.commonPool[el.title] = el.boxVoList
          arr.push(...el.boxVoList)
        })
        this.commonPool['all'] = arr
      } catch (e) {
        this.$Spin.hide()
      }
    },
    close(boolean) {
      if (!boolean) {
        this.choseBox = false
        this.payment = false
      }
    },
    payHandle() {
      if (!this.user.id) {
        this.payment = false
        return this.$login()
      }
      if (this.user.balance < this.roomPrice) {
        return this.$Message.error('您的余额不足,请先充值后创建对战房间')
      }
      localStorage.setItem('userSeed', this.battleSeed)
      let parmas = {'clientSeed': this.battleSeed, "roomId": this.roomId}
      postAction(this.url.pay, parmas).then(res => {
        this.payment = false
        this.surePay = false
        this.selectArticle = false
        let invite = JSON.parse(sessionStorage.getItem('hoster'))
        if (invite) {
          let inviteMsg = {createBy: invite.user, userId: invite.users, roomId: res.data, type: 1}
          this.$sendMsg(inviteMsg, 'drop')
          sessionStorage.setItem('hoster', null)
        }
        this.getUser()
        if (res.data === window.location.pathname.split('/')[3]) return
        this.$router.replace(`/page/battle/${res.data}`)
      }).catch(e => {
        this.$Message.error(e.response.data.errMsg)
      })
    },
    addBox(box) {
      if (this.addedBox.length >= 10) {
        return this.$Message.info('已达到箱子数量上限')
      }
      this.addedBox.unshift(box)
    },

    deleteBox(idx) {
      this.addedBox.splice(idx, 1)
    },
    filterMoney() {
      let arr = []
      arr = this.commonPool[this.searchForm.name]
      let min = this.searchForm.probability.split('-')[0]
      let max = this.searchForm.probability.split('-')[1]
      let priceMin = this.searchForm.price.split('-')[0]
      let priceMax = this.searchForm.price.split('-')[1]
      arr = arr.filter(item => {
        let number = +item.probability.split('%')[0]
        return number >= +min && number < +max
      })
      arr = arr.filter(item => {
        return item.price > +priceMin && item.price < +priceMax
      })
      if (!!this.searchForm.boxName) {
        arr = arr.filter(item => {
          return item.name.indexOf(this.searchForm.boxName) > -1
        })
      }
      this.limitBox = arr
    },
    getHash() {
      let parmas = {'roomId': this.roomId}
      postAction(this.url.clientHash, parmas).then(res => {
        this.hashData = res.data
      })
    },
    goPay() {
      let id = ''
      this.addedBox.forEach(el => {
        id += el.id + ','
      })
      id = id.substring(0, id.length - 1)
      // type 0 普通模式， 1 反转模式
      // roomType 0邀请模式 1普通模式 2.人机模式
      let params = {
        'boxIds': id,
        'isFast': this.peopleNum === 2 ? 0 : this.isFast ? 1 : 0,
        'number': this.peopleNum,
        type: this.isReverse,
        roomType: 0
      };
      params.roomType = this.isRobot ? 2 : this.isInvite ? 0 : 1
      sessionStorage.setItem('playAgain', JSON.stringify({data: this.addedBox, state: params}))
      postAction(this.url.creat, params).then(res => {
        this.choseBox = false
        this.roomId = res.data
        if (this.$store.state.account.isPhone) {
          return this.surePay = true
        }
        this.payment = true
      }).catch(e => {
        this.$Message.error(e.response.data.errMsg)
      })
    },

  }
}
</script>

<style scoped>
.empty-container {
  padding: .1rem;
  min-height: 1rem;
  width: 100%;
}

/deep/ .ivu-select-selection {
  border: none;
  background: transparent;
}

>>> .ivu-select-selected-value {
  background: transparent;
}

>>> .ivu-input {
  background: #0F111D !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-sizing: border-box;
}

>>> .hash-content {
  max-height: max-content;
}
</style>
