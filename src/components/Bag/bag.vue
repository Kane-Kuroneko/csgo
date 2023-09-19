<template>
  <HashModule v-model="show"
              title="我的背包"
              width="8">
    <div class="user-bag-tips" style="">
      <p>共 {{ total }} 件</p>
    </div>
    <div class="bag-goods-box">
      <Spin fix v-if="loading">
        <Icon type="ios-loading" size="30" class="demo-spin-icon-load"/>
      </Spin>
      <div style="margin: auto">
        <div class="bag-goods-modal" v-if="bagData.length > 0">
          <SkinsItem :skins-data="bagData" ></SkinsItem>
        </div>
        <Empty v-else></Empty>
      </div>
    </div>
    <!--            翻页器-->
    <div class="bag-page-box">
      <Page style="margin:auto" :current="currPage" :total="currTotal" :page-size="8"
            @on-change="jumpPageFunc" v-show="currTotal>0"/>
    </div>
    <div class="bag-btn">
      <div class="default-btn warehouse-btn" @click="intoWarehous">去背包取回</div>
      <div class="default-btn flex-jus" style="justify-content: center" @click="sell">前往汰换</div>
    </div>
  </HashModule>


</template>
<script>
  import store from '../../store/index'
  import {getAction, postAction} from "../../api/manage";
  import {MathFunc} from "../../utils/utils";
  import Empty from "../Empty/Empty";
  import {mapActions, mapState} from "vuex";
  import router from '../../router/index'
  import HashModule from "../HashModule/HashModule";
  import {debounce, conversionStyle} from '../../utils/utils'

  export default {
    store: store,
    props: {
      show: {
        type: Boolean
      }
    },
    components: {HashModule, Empty},
    data() {
      return {
        router,
        debounce,
        bagData: [],
        currPage: 1,
        conversionStyle,
        currTotal: 0,
        isRetrieve: true,
        loading: false,
        triggerTime: 0,
        ariticleId: [],
        total: 0,
        checkAll: false,
        totalPrice: 0,
        secondTime: 0,
        url: {
          pack: '/api/personal/center/back/pack', // 背包
          sale: '/api/personal/center/sale' // 出售物品'
        }
      }
    },
    watch: {
      show: async function () {
        if (this.show) {
          this.checkAll = false;
          this.$nextTick(() => {
            this.getMyBag();
          })
          this.ariticleId = [];
          this.totalPrice = 0;
        } else {  //数据初始
          this.checkAll = true;
          this.ariticleId = [];
          this.totalPrice = 0;
        }
      }
    },

    methods: {
      ...mapActions('account', ['getUser']),
      intoWarehous() {
        this.router.push({path: '/user/case'})
        this.show = false
      },
      sell() {
        router.push('/page/replaceSkins');
        this.show = false;
      },
      chooseAll() {
        this.checkAll = !this.checkAll
        if (this.checkAll) {
          this.ariticleId = [];
          this.totalPrice = 0;
          let sale = [0, 3, 4, 5, 6, 7]
          this.bagData.map((item) => {
            // 可兑换物品不可出售
            if (sale.includes(item.status)) {
              this.totalPrice = MathFunc.Add(this.totalPrice, item.salePrice, 2);
              this.ariticleId.push(item.id);
              item.choose = true;
            }
          })
        } else {
          this.bagData.map((item) => {
            item.choose = false;
          })
          this.totalPrice = 0;
          this.ariticleId = [];
        }
      },
      getMyBag(page = 1) {
        let params = {current: page, size: document.body.clientWidth < 760 ? 6 : 8, type: 1}
        getAction(this.url.pack, params).then(res => {
          this.loading = false
          let unSale = [1, 2, 9, 10, 11, 12, 13, 14]
          res.data.records.forEach(el => {
            let name = el.name.split('|');
            el.name1 = name[0];
            el.name2 = name.splice(1, name.length).join('');
            el.random = this.conversionStyle(el.skinsRarity, el.category)
            el.choose = false
            el.rarity = el.skinsRarity
            if (unSale.includes(el.status)) el.disable = true
          })
          console.log(res.data)
          this.bagData = res.data.records
          this.total = res.data.total
          this.currPage = res.data.current
          this.currTotal = res.data.total
        }).catch(e => {
          this.loading = false
        })
      },
      jumpPageFunc(page) {
        this.checkAll = false;
        this.ariticleId = [];
        this.totalPrice = 0;
        this.getMyBag(page);
        this.currPage = page;
      },

    }
  }
</script>

<style scoped>
  /deep/ .ivu-input[disabled]{
    background: rgba(191, 197, 201, .1);
    /*cursor: none;*/
  }

  /deep/ .ivu-input{
    border: none;
    box-shadow: none;
    color: #0A0A0A;
  }

  /deep/ .ivu-input:focus{
    color: #FFFFFE;
  }

  @media screen and (max-width: 800px){
    /deep/ .check-position{
      padding: 5px;
      top: 5%;
      right: 3%;
    }

    /deep/ .check-position i{
      transform: scale(.5);
    }

    /deep/ .good-price{
      font-size: 12px;
    }
  }
</style>
