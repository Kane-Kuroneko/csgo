<template>
  <div class="layout" style="margin: auto">
    <div class="common-bg ranking-bg" style="background-size: 100%">
      <div class="margin-auto" style="width: 96%">
        <div>
          <Title name="ROLL 福利"></Title>
        </div>
      </div>
      <div class="roll-room-box">
        <div class="roll-box-left">
          <!--                全部还是参与-->
          <div class="screening">
            <div @click="offcial" :class="{'active':rollListQuery.roomType===0}"
                 class=" type-btn">官方
            </div>
            <div @click="theHost" :class="{'active':rollListQuery.roomType===1}"
                 class=" type-btn center-type">主播
            </div>
            <div class=" type-btn" @click="participate"
                 :class="{'active':rollListQuery.roomType==2}">
              我参与的
            </div>
          </div>
          <!--                筛选房间-->
          <div class="screening-room hide-m">
            <div class="room-state">
              <ul v-if="rollListQuery.roomType === 0 || rollListQuery.roomType === 1">
                <li @click="rollListQuery.status = 1"
                    :class="{'active': rollListQuery.status === 1}">
                  进行中
                </li>
                <li @click="rollListQuery.status = 2"
                    :class="{'active': rollListQuery.status === 2}">
                  已开奖
                </li>
              </ul>
              <ul v-else>
                <li @click="rollListQuery.status = 1"
                    :class="{'active':rollListQuery.status === 1}">
                  进行中
                </li>
                <li @click="rollListQuery.status = 3"
                    :class="{'active':rollListQuery.status === 3}">
                  未中奖
                </li>
                <li @click="rollListQuery.status = 4"
                    :class="{'active':rollListQuery.status === 4}">
                  已中奖
                </li>
              </ul>
            </div>
            <div class="room-search">
              <Select v-model="rollListQuery.type" placeholder="参与方式" size="default"
                      style="width:1.5rem;margin-right: .3rem">
                <Option :value="''">全部</Option>
                <Option :value="'roll_join_open'">开放房</Option>
                <Option :value="'roll_join_password'">密码房</Option>
                <Option :value="'roll_join_once_password'">一次密码房</Option>
                <Option :value="'roll_join_task'">任务房</Option>
              </Select>
              <Input style="width:1.5rem;margin-right: .3rem" placeholder="输入房间号"
                     v-model="rollId" size="default"/>
              <div @click="searchRoom" class="default-btn search-btn">
                <!--                                    <i class="iconfont iconicon-search"></i> -->
                搜索
              </div>
            </div>
          </div>
          <div class="screen-room-m hide-p hide-ipad">
            <div class="filter-roll">
              <div class="room-state-m">
                <ul v-if="rollListQuery.roomType===0 || rollListQuery.roomType===1">
                  <li @click="rollListQuery.status = 1"
                      :class="{'active': rollListQuery.status === 1}">
                    进行中
                  </li>
                  <li @click="rollListQuery.status = 2"
                      :class="{'active': rollListQuery.status === 2}">
                    已开奖
                  </li>
                </ul>
                <ul v-else>
                  <li @click="rollListQuery.status = 1"
                      :class="{'active':rollListQuery.status === 1}">
                    进行中
                  </li>
                  <li @click="rollListQuery.status = 3"
                      :class="{'active':rollListQuery.status === 3}">
                    未中奖
                  </li>
                  <li @click="rollListQuery.status = 4"
                      :class="{'active':rollListQuery.status === 4}">
                    已中奖
                  </li>
                </ul>
              </div>
              <div class="filter-more" @click="show = !show">更多筛选
                <Icon type="md-arrow-dropdown"/>
              </div>
            </div>
            <div v-if="show" style="padding-top: .2rem;width: 90%;margin: auto">
              <div class="room-search">
                <Select v-model="rollListQuery.type" placeholder="参与方式" size="default">
                  <Option :value="''">全部</Option>
                  <Option :value="'roll_join_open'">开放房</Option>
                  <Option :value="'roll_join_password'">密码房</Option>
                  <Option :value="'roll_join_once_password'">一次密码房</Option>
                  <Option :value="'roll_join_task'">任务房</Option>
                </Select>
              </div>
              <div class="room-search">
                <Input style="width:75%;margin-right: .1rem" placeholder="输入房间号"
                       v-model="rollId" size="default"/>
                <div @click="searchRoom" class="default-btn search-btn"><i
                    class="iconfont iconicon-search"></i> 搜索
                </div>
              </div>
            </div>
          </div>
          <!--                房间具体信息-->
          <div class="det-room-box" v-if="roomData.length > 0">
            <div @click="joinRoom(el)" class="det-room" v-for="el in roomData" :key="el.id"
                 :class="{'newWealfare': el.id === newUser}">
              <!--                            头像-->
              <div class="roll-avator">
                <img v-lazy="imgHost(el.image)" alt="" style="height: 100%;"/>
              </div>
              <div class="roll-info">
                <div class="room-id">
                  <i class="iconfont iconicon-room"></i> {{ el.id }}
                </div>
                <div class="room-id">
                  <i class="iconfont iconicon-people3"></i> {{ el.totalPlayer }}
                </div>
              </div>
              <!--                            roll房名称-->
              <div class="det-room-name">
                <div>
                  {{ el.name }}
                </div>
              </div>
              <div class="roll-total">
                <div>
                  <i class="iconfont icon-icon_diamond1"></i>
                  <span class="font-bold"> {{el.totalPrice }}</span>
                </div>
                <div>
                  <p>共</p>
                  <span> {{ el.totalPrize }} </span>
                  <p>件</p>
                </div>
              </div>
              <div class="bg-quality">
                <div v-for="(item,idx) in el.prizeImg" :key="idx"
                     :class="'drop-qua-'+ conversionStyle(item.rarity,item.category)">
                  <img :src="item.image" alt="" style="width: 100%">
                </div>
              </div>

              <!--                            roll房信息-->
              <div class="det-room-info">
                <p>{{ el.openTime }} 开奖</p>
              </div>
            </div>
          </div>
          <empty v-else></empty>
          <div class="page-box">
            <Page class="mar-auto" :current="currPage" :total="currTotal"
                  :page-size="rollListQuery.size" @on-change="jumpPageFunc"
                  v-show="currTotal>0"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {getAction} from "../api/manage";
import empty from '../components/Empty/Empty'
import {mapState} from "vuex";
import Title from "../components/Title";

export default {
  name: 'roll',
  components: {empty, Title},
  data() {
    return {
      rollId: '',
      kind: 0,
      show: false,
      winState: [],
      roomData: [],
      luckyData: [],
      isPhone: false,
      currPage: 1,
      currTotal: 0,
      newUser: sessionStorage.getItem('newWealfare'),
      oldPage: 1,
      rollListQuery: {
        id: '',
        roomType: 0,
        type: '', // 开放房：1：开放房，2：密码房，3：一次性密码，4：任务房
        current: 1,
        size: 12,
        status: 1,
      },
      url: {
        rooms: '/api/roll/room/rooms',
        lucky: '/api/roll/room/lucky',
        state: '/api/roll/room/user/status'
      }
    }
  }
  ,
  watch: {
    rollListQuery: {
      handler: function (newValue, oldValue) {
        this.rollList = []
        if (newValue.current === this.oldPage) {
          this.rollListQuery.current = 1
        }
        this.getRoll();
      }
      ,
      deep: true
    }
    ,
  }
  ,
  computed: {
    ...
        mapState('account', {
          userInfo: state => state.user
        }),
  }
  ,
  mounted() {
    this.getUserState()
    this.getRoll()
    // this.getLuckData()
    this.isPhone = this.$store.state.account.isPhone
  }
  ,
  methods: {
    participate() {
      if (localStorage.getItem('token')) {
        this.rollListQuery.roomType = 2
        this.rollListQuery.status = 1
      } else {
        this.$login();
      }
    }
    ,
    jumpPageFunc(page) {
      this.rollListQuery.current = page
    }
    ,
    async getRoll() {
      this.oldPage = this.rollListQuery.current
      try {
        let res = await getAction(this.url.rooms, this.rollListQuery)
        this.roomData = res.data.records
        this.currPage = res.data.current
        this.currTotal = res.data.total
      } catch (e) {
        this.$Spin.hide()
      }
    }
    ,
    offcial() {
      this.rollListQuery.roomType = 0;
      this.rollListQuery.status = 1;
    }
    ,
    theHost() {
      this.rollListQuery.roomType = 1;
      this.rollListQuery.status = 1;
    }
    ,
    getUserState() {
      getAction(this.url.state).then(res => {
        this.winState = res.data
      })
    }
    ,
    async getLuckData() {
      let resLucky = await getAction(this.url.lucky)
      this.luckyData = resLucky.data
    }
    ,
    searchRoom() {
      this.rollListQuery.id = this.rollId
      this.getRoll()
    }
    ,
    joinRoom(roll) {
      this.$router.push(`/page/roll/${roll.id}`)
    }
    ,
    copywriting(kind, rollId) {
      if (!this.userInfo.id) {
        return {title: '立即参与', status: 1}
      }
      if (kind === 2) {
        kind = 1
      } else if (kind === 1) {
        kind = 0
      }
      if (kind === 0 && this.rollListQuery.status === 1) {
        if (this.winState.find(rolls => rolls.rollId === rollId) === undefined) {
          return {title: '立即参与', status: 1}
        } else {
          return {title: '已参与', status: 2}
        }
      } else if (kind === 0 && this.rollListQuery.status === 2) {
        return {title: '查看奖品', status: 3}
      } else if (kind === 1 && this.rollListQuery.status === 1) {
        return {title: '已参与', status: 2}
      } else if (kind === 1 && this.rollListQuery.status === 3) {
        return {title: '已结束,未中奖', status: 5}
      } else if (kind === 1 && this.rollListQuery.status === 4) {
        return {title: '中奖,查看奖品', status: 6}
      }
      return {title: '', button: ''}
    }
    ,
  }
}
</script>
<style scoped>
/deep/ .ivu-select-dropdown {
  background: #141727;
  border: 0px solid #030000;
  box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
  border-radius: 3px;
}
</style>
