<template>
  <div>
    <HashModule v-model="show" title="对战结果" width="8">
      <div>
        <div class='winner-money'>
          <p>此游戏获得总数</p>
          <p class="total-win" :class="{'total-lose': result.result !== 1}"> <i class="iconfont icon-icon_diamond1"></i> {{
              result.result == 1 ?
                  result.resultAmount : result.resultMap[0].price
            }}</p>
        </div>
        <div class="winner-avator">
          <div class="winnier-avator"
               :class="[{'lose': winAvator.result !== 1},{'normal-color': winAvator.result == 1}]">
            <div>
              <img :src="imgHost(winAvator.userImg)" :class="{'normal-color': winAvator.result == 1}"
                   alt="">
            </div>
            <img src="../../assets/image/battle/crown.png" style="width: 50%;top:-18%" alt=""
                 v-show="result.result == 1">
          </div>
          <ul class="lose-avator">
            <li v-for="item in loseAvator" :key="item.userId">
              <div class="avator-img" style="border-radius: 50%;overflow: hidden">
                <img :src="imgHost(item.userImg)" alt="" :class="{'normal-color': item.result == 1}">
              </div>
              <div>
                <img src="../../assets/image/battle/crown.png" alt="" v-show="item.result == 1">
              </div>
            </li>
          </ul>
        </div>
        <!--            <div class="winner-btn">-->
        <!--                <div class="default-btn" @click="router.go(-1)" >-->
        <!--                    <i class="iconfont iconicon-back"></i>-->
        <!--                    返回房间列表-->
        <!--                </div>-->
        <!--                <div class="default-btn">-->
        <!--                    <i class="iconfont iconicon-add"></i>-->
        <!--                    创建对战 $ 123-->
        <!--                </div>-->
        <!--            </div>-->
        <div class="winner-goods">
          <h3>对战{{ result.result == 1 ? '获得' : '凉凉' }}物品</h3>
          <div class="battle-winner-good">
            <skins-item v-show="!isEmpty" :skins-data="result.resultMap"></skins-item>
            <Empty v-show="isEmpty"></Empty>
          </div>
          <div class="winner-btn">
            <div class="default-btn" v-show="creatBy === result.userId" @click="playAagin">再来一局</div>
          </div>
        </div>
      </div>
    </HashModule>
  </div>

</template>

<script>
import {postAction} from "../../api/manage";
import {mapActions, mapState} from "vuex";
import Empty from "../Empty/Empty";
import HashModule from "../HashModule/HashModule";

export default {
  name: "battleResult",
  components: {HashModule, Empty},
  data() {
    return {
      show: false,
      isEmpty: false,
      discount: {},
      creatBy: '',
      totalId: [], // 全部出售Id集合
      sellAllWeapon: false, // 是否全部出售
      result: {
        result: 1,
        resultAmount: 0,
        totalPrice: 0,
        resultMap: [
          {price: 0}
        ],
      },
      totaleWinner: [
        {
          result: 1,
          resultMap: [],
        }
      ],
      url: {
        sale: '/api/personal/center/sale' // 出售物品'
      }
    }
  },
  computed: {
    ...mapState('account', ['user']),
    totalPrice() {
      let money = 0
      this.result.resultMap.forEach(el => {
        if (el.id !== '99998') {
          money += el.salePrice
        }
      })
      return money.toFixed(2)
    },
    winAvator() {
      let avator
      this.totaleWinner.forEach((el) => {
        if (el.userId == this.user.id) {
          avator = el
        }
      })
      return avator
    },
    loseAvator() {
      let kong = []
      this.totaleWinner.forEach((el) => {
        if (el.userId !== this.user.id) {
          kong.push(el)
        }
      })
      return kong
    }
  },
  created() {
    // this.discount = this.$store.state.account.userDiscount.filter(item => item.type === 2)[0] ?
    //     this.$store.state.account.userDiscount.filter(item => item.type === 2)[0] : {discount: 1}
    this.result.resultMap.forEach(el => {
      el.isChose = false
    })
  },
  methods: {
    ...mapActions('account', ['getUser']),
    playAagin() {
      this.show = false
      this.$bus.$emit('again', true)
    },
    sell(id) {
      let params = {ids: id}
      postAction(this.url.sale, params).then(res => {
        this.$Message.success('出售成功')
        this.result.resultMap.forEach((el, idx) => {
          if (el.snapshotId == id && el.id !== '99998') {
            this.result.resultMap.splice(idx, 1)
          }
        })
        if (this.sellAllWeapon) this.isEmpty = true
        this.getUser()
        // this.totalPrice = 0
      }).catch(e => {
        this.$Message.error(e.response.data.errMsg)
      })
    },
    sellAll() {
      this.totalId = [];
      this.result.resultMap.map((item) => {
        // 可兑换物品不可出售
        if (item.id !== '99998') {
          this.totalId.push(item.snapshotId);
        }
      })
      this.sellAllWeapon = true
      this.sell(this.totalId + '')
    },
  }
}
</script>

<style scoped>
.empty-container {
  padding: 0;
  min-height: auto;
}

</style>
