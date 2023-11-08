<template>
  <div class="replace-skins layout">
    <Title name="饰品汰换"></Title>
    <div class="replace-box">
      <div class="replace-top" style="margin-top: 15px">
        <img src="../assets/image/replace/lf.png" alt="">
        <img src="../assets/image/replace/mid.png" class="hide-m" alt="">
        <img src="../assets/image/replace/rt.png" class="hide-m" alt="">
      </div>
      <div class="replace-area">
        <div class="area-item">
          <div class="lf-area ">
            <div class="drop">
              <ul class="" style="width: max-content" v-show="willReplace.length>0" :style="style">
                <li v-for="item in willReplace" :key=" item.id">
                  <img :src="imgHost(item.image)" alt="">
                </li>
              </ul>
            </div>
            <ul v-show="willReplace.length===0">
              <li v-for="el in 5"></li>
            </ul>
            <div class="next-prev hide-m">
              <div class="prev item-giving" @click="paginationReplace('p')"><i class="iconfont iconicon-down2"></i>
              </div>
              <div class="next item-giving" @click="paginationReplace('n')"><i class="iconfont iconicon-down2"></i>
              </div>
            </div>
          </div>
          <div class="lf-area-info">
            <p>添加的合成材料共 <span>{{willReplace.length}}</span> 件饰品</p>
            <p>总价值：<span><i class="iconfont icon-icon_diamond1"></i>{{totalPrice}}</span></p>
            <span v-if="!isPhone" style="margin-left: auto" @click="seeAll" class="cursor">查看全部材料</span>
          </div>
          <div class="lf-area-info" v-if="isPhone">
            <span style="margin:0 auto 20px;" @click="seeAll" class="cursor">查看全部材料</span>
          </div>
          <!--          移动端-->
          <div class="replace-top" v-if="isPhone">
            <img src="../assets/image/replace/rt.png" alt="">
          </div>
          <div v-if="isPhone" class="rt-area area-item">
            <div align="center" @click="replaceSkins={name:'',salePrice:0}">
              <img v-if="replaceSkins.image" :src="imgHost(replaceSkins.image)" alt="">
              <p style="text-align: center">{{replaceSkins.name}}</p>
            </div>
            <p>汰换的物品价值: <span><i class="iconfont icon-icon_diamond1"></i>{{replaceSkins.salePrice}}</span></p>
          </div>
          <div v-if="isPhone" class="mid-area">
            <div class="btn-replace cursor war-hover" @click="beginReplace"></div>
          </div>
          <!--          pc-->
          <div class="replace-bag">
            <div class="replace-search">
              <p style="font-size: 15px;font-weight: bold" v-if="isPhone">选择合成材料</p>
              <div class="price-sort" @click="searchForm.sort = searchForm.sort == 1 ?  2 : 1">价格
                <i style="font-size: 13px" :class="{'sort-down': searchForm.sort === 2}"
                   class="iconfont icon-icon-arrow"></i>
              </div>
              <div class="cursor war-hover" @click="choseAllSkins">全选</div>
            </div>
            <ul class="replace-goods">
              <li :class="'border-top-'+conversionStyle(el.skinsRarity,el.category)"
                  class="cursor"
                  v-for="el in bagData" :key="el.id" @click="choseSkins(el)">
                <div class="check-position" :class="{'check-position-ture': el.choose}">
                  <i class="iconfont iconicon-select"></i>
                </div>
                <div align="center"><img :src="imgHost(el.image)" alt=""></div>
                <div><i class="iconfont icon-icon_diamond1"></i> {{el.price}}</div>
              </li>
            </ul>
          </div>
          <!--          移动端 商城-->
          <div v-if="isPhone" class="replace-bag">
            <div class="replace-search" style="display: flex;justify-content: space-between;">
              <p style="font-size: 15px;font-weight: bold">选择汰换饰品</p>
              <div class="ivu-icons" style="margin: 0 .1rem;width: 60%">
                <Input class="search-input search-input-box"
                       v-model="replaceSearch.name"
                       clearable
                       icon="iconfont icon-icon-icon-search "
                       placeholder="输入皮肤名称搜索"/>
                <i class="iconfont icon-icon-search" style="color: #ffffff"></i>
              </div>
            </div>
            <ul class="replace-goods" v-if="marketData.length > 0">
              <li :class="'border-top-'+conversionStyle(el.rarity,el.category)"
                  class="cursor" v-for="el in marketData" :key="el.id"
                  @click="replaceSkins = el"
              >
                <div align="center"><img :src="imgHost(el.image)" alt=""></div>
                <div><i class="iconfont icon-icon_diamond1"></i> {{el.salePrice}}</div>
              </li>
            </ul>
            <div v-else class="add-tips">请先添加合成材料</div>
          </div>
        </div>

        <div class="mid-area">
          <p v-if="!isPhone">左边选择添加2个及以上的合成材料</p>
          <p v-if="!isPhone">右边选择汰换饰品</p>
          <p v-if="!isPhone">点击下方按钮即可进行汰换,100%成功率</p>
          <div v-if="!isPhone" class="btn-replace cursor war-hover" @click="beginReplace"></div>
          <div class="store-filter">
            <p>添加钻石</p>
            <div class="slider-container">
              <div><i class="iconfont icon-icon_diamond1"></i>{{replaceSearch.amount}}</div>
              <div>
                <Slider :key="1" v-model="replaceSearch.amount" :max="user.balance || 0"
                        :show-tip="'never'"
                        :min="0"
                        :disabled="marketData.length === 0"
                        :step="0.01"
                        style="flex: 1">
                </Slider>
              </div>
            </div>
            <p>汰换饰品筛选</p>
            <div class="wear-box">
              <div>外观</div>
              <ul class="wear-item">
                <li v-for="el in storeSearch.csgo.exterior"
                    :key="el.value"
                    :class="{'active': replaceSearch.exterior === el.value}"
                    @click="replaceSearch.exterior = el.value">
                  {{el.labelZH}}
                </li>
              </ul>
            </div>
            <div class="wear-box">
              <div>宝石</div>
              <ul class="wear-item">
                <li v-for="el in storeSearch.csgo.gemstone"
                    :key="el.value"
                    :class="{'active': replaceSearch.levelName === el.value}"
                    @click="replaceSearch.levelName = el.value">
                  {{el.labelZH}}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="rt-area area-item">
          <div align="center" class="cursor" v-if="!isPhone" @click="replaceSkins={name:'',salePrice:0}">
            <img :src="imgHost(replaceSkins.image)" alt="" v-if="replaceSkins.image">
            <p style="text-align: center;margin: 10px 0 ">{{replaceSkins.name}}</p>
          </div>
          <p v-if="!isPhone"> 汰换的物品价值: <span><i
              class="iconfont icon-icon_diamond1"></i>{{replaceSkins.salePrice}}</span></p>
          <div v-if="!isPhone" class="replace-bag">
            <div class="replace-search">
              <div class="ivu-icons" style="margin: 0 .1rem;width: 100%">
                <Input class="search-input search-input-box"
                       v-model="replaceSearch.name"
                       clearable
                       icon="iconfont icon-icon-icon-search "
                       placeholder="输入皮肤名称搜索"/>
                <i class="iconfont icon-icon-search" style="color: #ffffff"></i>
              </div>
            </div>
            <ul class="replace-goods" v-if="marketData.length > 0">
              <li :class="'border-top-'+conversionStyle(el.rarity,el.category)"
                  class="cursor" v-for="el in marketData" :key="el.id"
                  @click="replaceSkins = el"
              >
                <div align="center"><img :src="imgHost(el.image)" alt=""></div>
                <div><i class="iconfont icon-icon_diamond1"></i> {{el.salePrice}}</div>
              </li>
            </ul>
            <div v-else class="add-tips">请先添加合成材料或筛选条件无饰品</div>
          </div>
        </div>
      </div>
    </div>


    <hash-module v-model="allSkins" :width="9" title="合成材料">
      <div class="lf-area-info">
        <p>添加的合成材料共 <span>{{willReplace.length}}</span> 件饰品</p>
        <p>总价值：<span><i class="iconfont icon-icon_diamond1"></i>{{totalPrice}}</span></p>
        <span class="hide-m" style="margin-left: auto;color: #FFFFFE">点击单个饰品可移出合成列表</span>
      </div>
      <div><span style="margin-left: auto;color: #FFFFFE" class="hide-p hide-ipad">点击单个饰品可移出合成列表</span></div>
      <div class="replace-bag bag-m">
        <ul class="replace-goods" style="max-height: 6rem;overflow: auto;">
          <li class="cursor pup-bg"
              v-for="(item,idx) in willReplace" :key="item.id"
              style="margin-bottom: 10px;padding: 5% 10px 20px;box-sizing: border-box"
              @click="deleteSkins(idx,item.id)">
            <div align="center"><img :src="item.image" alt=""></div>
            <div><i class="iconfont icon-icon_diamond1"></i> {{item.price}}</div>
          </li>
        </ul>

      </div>
    </hash-module>
    <hash-module v-model="replaceRes" :width="8" title="汰换成功">
      <div class="result-pup" align="center">
        <img :src="imgHost(replaceSkins.image)" alt="">
        <p>{{replaceSkins.name.split('|')[0]? replaceSkins.name.split('|')[0] : ''}}</p>
        <p>{{replaceSkins.name.split('|')[1]? replaceSkins.name.split('|')[1] : ''}}</p>
      </div>
      <div class="replace-price"><i class="iconfont icon-icon_diamond1"></i> {{replaceSkins.salePrice}}</div>
      <div class="put-in" @click="replaceRes= false">放入背包</div>
    </hash-module>
  </div>
</template>

<script>
  import Title from "../components/Title";
  import storeSearch from "../utils/storeSearch.json";
  import {getAction, postAction} from "../api/manage";
  import {relaceUrl} from "../api/replace";
  import {mapState} from "vuex";
  import {debounce} from "../utils/utils";

  export default {
    name: "ReplaceSkins",
    components: {Title},
    data() {
      return {
        relaceUrl,
        style: {},
        storeSearch,
        debounce,
        replaceRes: false, // 弹窗
        allSkins: false, // 弹窗
        bagData: [],
        marketData: [], // 汰换物品
        replaceSkins: {
          salePrice: 0,
          name: ''
        }, // 右边汰换物品
        willReplace: [],  // 左边替换物品
        searchForm: {
          sort: 2
        },
        isPhone: this.$store.state.account.isPhone,
        replaceSearch: {
          name: '',
          exterior: '',
          levelName: 0,
          amount: 0,
          ids: '',
          size: 32
        },
      }
    },
    watch: {
      replaceRes(nv) {
        if (!nv) {
          setTimeout(() => {
            this.replaceSkins = {name: '', salePrice: 0};
            this.replaceSearch = {
              name: '',
              exterior: '',
              levelName: 0,
              amount: 0,
              ids: '',
              size: 32
            };
          }, 1000)
        }
      },
      searchForm: {
        handler() {
          this.getMyBag();
        },
        deep: true
      },
      replaceSearch: {
        handler: debounce(function () {
          this.replaceSkins = {
            salePrice: 0,
            name: ''
          };
          this.getMarket();
        }, 500),
        deep: true,
      }
    },
    computed: {
      ...mapState('account', ['user']),
      totalPrice() {
        let value = 0
        this.willReplace.forEach(el => {
          value += el.price;
        })
        return value.toFixed(2)
      },
    },

    created() {
      this.getMyBag();
    },
    methods: {
      seeAll() {
        if (this.willReplace.length === 0) return this.$Message.error('暂未选择合成材料');
        this.allSkins = true;
      },
      paginationReplace(type) {
        let dom = document.querySelector('.drop');
        type === 'n' ? dom.scrollLeft += 120 : dom.scrollLeft -= 120;
      },
      beginReplace() {
        if (this.willReplace.length === 0 || this.replaceSkins.salePrice === 0) return this.$Message.error('未选择合成材料或汰换饰品');
        let params = {
          amount: this.replaceSearch.amount,
          ids: this.replaceSearch.ids,
          targetSkinsId: this.replaceSkins.skinsId
        };
        postAction(relaceUrl.skins, params).then(() => {
          this.replaceRes = true;
          this.getMyBag();
          this.willReplace = [];

        }).catch(e => {
          this.$Message.error(e.response.data.errMsg);
        })
      },
      choseAllSkins() {
        if (this.willReplace.length === this.bagData.length) {
          this.willReplace = [];
          this.marketData = [];
          this.replaceSkins = {
            name: '',
            salePrice: 0
          };
          return this.bagData.forEach(el => {
            el.choose = !el.choose;
          })
        }
        this.willReplace = [...this.bagData];
        this.bagData.forEach(el => {
          el.choose = true;
        })
        let ids = '';
        this.willReplace.forEach(el => {
          ids += el.id + ','
        });
        this.replaceSearch.ids = ids.substring(0, ids.length - 1);
        this.getMarket();
      },
      choseSkins(item) {
        item.choose = !item.choose;
        if (item.choose) {
          if (this.willReplace.length === 0) return this.willReplace.push(item);
          this.willReplace.push(item);
        }
        if (this.willReplace.includes(item) && !item.choose) {
          this.willReplace.forEach((el, index) => {
            if (el.id === item.id) {
              this.willReplace.splice(index, 1)
            }
          })
        }
        let ids = '';
        this.willReplace.forEach(el => {
          ids += el.id + ','
        });
        this.replaceSearch.ids = ids.substring(0, ids.length - 1);
      },
      deleteSkins(idx, id) {
        this.willReplace.splice(idx, 1);
        if (this.willReplace.length === 0) this.allSkins = false;
        this.bagData.forEach(el => {
          if (id === el.id) el.choose = false;
        });
        this.replaceSkins = {
          name: '',
          salePrice: 0
        };
      },
      async getMyBag() {
        if (localStorage.getItem('token')) {
          let params = {type: 3, sort: this.searchForm.sort};
          getAction(relaceUrl.pack, params).then(res => {
            res.data.records.forEach(el => {
              el.choose = false;
            })
            this.bagData = res.data.records;
          })
        }
      },
      getMarket() {
        if (this.willReplace.length < 2) return this.marketData = [];
        getAction(relaceUrl.market, this.replaceSearch).then(res => {
          this.marketData = res.data.records;
        })
      }
    }

  }
</script>

<style scoped lang="less">

  /deep/ .ivu-slider-button-wrap{
    top: -7px
  }

  /dep/ .slider-container{
    background: #5A5F80;
  }

  /deep/ .ivu-tooltip-rel{
    width: 18px;
    height: 18px;
    background: #141727;
    border: 2px solid #FCC601;
    border-radius: 50%;
    transition: all .2s linear;
    position: relative;
    outline: none;
  }

  /deep/ .ivu-slider-bar{
    height: 6px;
    background: #FCC601;
  }

  /deep/ .ivu-slider-button{
    width: 5px;
    height: 5px;
    border: none;
    background: #FCC601;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .replace-top{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;

    > img:nth-of-type(2n){
      width: 212px;
    }

    > img:nth-of-type(2n+1){
      width: 212px;
    }
  }

  .add-tips{
    font-size: 20px;
    color: white;
    font-weight: bold;
    height: calc(100% - 66px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .replace-area{
    display: flex;
    justify-content: space-between;
  }

  .area-item{
    width: 38.5%;

    .replace-bag{
      height: 683px;
      background: linear-gradient(0deg, #121423, #141727, #111422, #141727);
    }

    > div:nth-of-type(1){
      /*height: 130px;*/
      padding-bottom: 15px;
      box-sizing: content-box;
      background: url('../assets/image/replace/bg.png') no-repeat bottom left / 100%;
    }

    > div:nth-of-type(2){
      margin: 20px 0;
    }
  }

  .lf-area{
    > div{
      width: 100%;
      overflow: auto;
      transition: all .2s linear;

      &::-webkit-scrollbar-track{
        display: none;
      }

      &::-webkit-scrollbar-thumb{
        display: none;
      }
    }
  }

  .lf-area ul{
    display: flex;
    margin-bottom: 30px;

    li{
      width: 120px;
      display: flex;
      min-height: 80px;
      align-items: center;
      justify-content: center;
      background: url('../assets/image/replace/reskins.png') no-repeat center center / contain;
    }


    li img{
      width: 60%;
    }
  }

  .pup-bg{
    background: url('../assets/image/replace/pupbg.png') no-repeat top left / 100% 100% !important;
  }

  .next-prev{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .mid-area{
    width: 20%;

    > p{
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      font-family: Adobe Heiti Std;
      color: #FFFFFE;
      line-height: 25px;
    }

    .btn-replace{
      width: 100%;
      height: 55px;
      background: url('../assets/image/replace/btn.png') no-repeat center center / contain;
      margin-top: 15px;
    }
  }

  .store-filter{
    margin-top: 66px;
    height: 683px;
    background: linear-gradient(0deg, #121423, #141727, #111422, #141727);
    padding: 0 5%;

    p{
      text-align: left;
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFE;
      line-height: 25px;
      margin-bottom: 20px;
    }
  }

  .slider-container{
    font-size: 15px;
    font-weight: 600;
    color: #FFCA6E;
    text-align: right;
    margin-bottom: 30px;

    i{
      font-weight: 400;
    }

    > div:nth-of-type(2){
      height: 50px;
      background: #222744;
      box-shadow: 0px 1px 13px 2px rgba(18, 21, 37, 0.59);
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding: 20px;
    }
  }

  .wear-box{
    border-radius: 4px;
    background: linear-gradient(0deg, #121423, #1B1F36, #202541);
    font-size: 12px;
    font-weight: 600;
    color: #FFFFFF;
    padding: 7px 7px 20px;
    margin-bottom: 15px;

    ul{
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px;

      &::after{
        content: '';
        width: 30%;
      }
    }

    li{
      width: 30%;
      line-height: 26px;
      text-align: center;
      color: #FFFFFF;
      background: #1B1F38;
      border: 1px solid #3C4373;
      border-radius: 4px;
      cursor: pointer;

      &.active{
        background: #0A3CFF;
      }

      &:hover{
        background: #0A3CFF;
      }
    }
  }

  .lf-area-info{
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: #FFFFFF;
    opacity: 0.8;
    display: flex;
    align-items: center;

    > p:nth-of-type(1){
      margin-right: 20px;
    }

    > p:nth-of-type(2){
      span{
        font-size: 18px;

        i{
          font-weight: 400;
        }
      }
    }

    span{
      color: #FFCA6E;

      &:last-of-type{
        display: inline-block;
      }
    }
  }

  .rt-area{
    > div:nth-of-type(1){
      height: 130px;
      background: url('../assets/image/replace/rtopbg.png') no-repeat left bottom / 100% !important;
    }

    img{
      width: 130px;
      aspect-ratio: 1.3;
    }

    p{
      margin: 20px 0;
      text-align: right;
      font-size: 14px;
      color: #ffffff;
      font-weight: bold;

      span{
        font-size: 18px;
        color: #FFCA6E;
      }

      i{
        font-weight: 400;
      }
    }
  }

  .replace-bag{
    padding: 23px 15px;
  }

  .replace-search{
    display: flex;
    align-items: center;

    > div:last-of-type{
      width: 68px;
      background: #5B1CF2;
      line-height: 30px;
      margin-left: auto;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
    }
  }

  .replace-goods{
    display: flex;
    margin-top: 30px;
    flex-wrap: wrap;
    gap: 1%;
    max-height: calc(100% - 60px);
    overflow: auto;

    li{
      width: 24%;
      font-size: 12px;
      margin-bottom: 10px;
      font-weight: 600;
      color: #FFCA6E;
      background: url('../assets/image/replace/skinsbg.png') no-repeat top left / cover;
      padding: 5% 0 15px;
      text-align: center;
      box-sizing: content-box;
      position: relative;

      .check-position{
        position: absolute;
        right: 10px;
        top: 10px;
      }

      i{
        font-weight: 400;
        font-size: 17px;
      }

      img{
        width: 80%;
        aspect-ratio: 1.3
      }
    }
  }

  .result-pup{
    background: url('../assets/image/replace/resbg.png') no-repeat center center / contain;

    img{
      width: 263px;
    }

    p{
      text-align: center;
      color: #FFFFFE;
      font-size: 15px;
      font-weight: bold;
    }

    p:nth-of-type(2){
      font-size: 14px;
    }
  }

  .replace-price{
    text-align: center;
    font-size: 23px;
    font-weight: 500;
    color: #FFCA6E;

    i{
      font-size: 25px;
    }
  }

  .put-in{
    width: 242px;
    line-height: 33px;
    font-size: 18px;
    font-weight: bold;
    margin: 20px auto;
    color: #000000;
    text-align: center;
    background: #FCC601;
    cursor: pointer;
    border-radius: 3px;
  }

  @media screen and (max-width: 800px){
    .replace-area{
      display: block;
    }

    .area-item{
      width: 98%;
      margin: auto;
    }

    .mid-area{
      width: 98%;
      margin: auto;
    }

    .store-filter{
      height: auto;
      padding-bottom: 30px;
      margin-top: 10px;

      p{
        margin-bottom: 10px
      }
    }

    .area-item .replace-bag{
      height: 300px;
    }

    .area-item > div:nth-of-type(1){
      height: auto;
      overflow: auto;
      padding-bottom: 0;
    }

    .wear-box{
      background: linear-gradient(0deg, #121423, #1B1F36, #202541);

      ul{
        justify-content: unset;
      }
    }

    .wear-box li{
      width: 22%;
    }

    .lf-area{
      overflow: auto;
      margin-bottom: 20px;

      &::-webkit-scrollbar-thumb{
        display: none;
      }

      &::-webkit-scrollbar-track{
        display: none;
      }

      ul{
        width: max-content;

        li{
          width: 120px;
        }
      }
    }

    .rt-area img{
      width: 35%;
    }

    .replace-goods li .check-position{
      right: 0;
      top: 0;
      transform: scale(.5);
    }

    .rt-area{
      > div:nth-of-type(1){
        background: url('../assets/image/replace/rtopbg.png') no-repeat left bottom / 100% ,
        url('../assets/image/replace/rtbg.png') no-repeat top center / auto 60% !important;
        min-height: 100px;
      }
    }

    .replace-goods{
      margin-top: 0;

      li img{
        height: 50px;
      }
    }

    .bag-m{
      padding: 0;

      li{
        width: 33%;
      }
    }
  }
</style>
