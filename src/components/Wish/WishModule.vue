<template>
  <div class="wish-module " :class="{'show': isShow}">
    <div class="wish-content">
      <div class="close" @click="isShow = false">
        <i class="iconfont icon-icon-close"></i>
      </div>
      <div>
        <div class="wish-title">
          <div>
            买功能获赠心愿卡
          </div>
        </div>
        <div class="wish-contanier">
          <div class="wish-contanier-inside">
            <div>
              每天购买1张面额数量为1的功能券，即可享受仅当日1天的升级自选区间功能。若当日 要延长此功能的使用期限，每10个面额数量可多兑
              1天的使用权限，上限累计七天
            </div>
            <div class="one-ten">
              <div @click="cardNum=1" :class="{'active': cardNum === 1}"><img src="../../assets/image/wish/one.png"
                                                                              alt=""></div>
              <div @click="cardNum=10" :class="{'active': cardNum === 10}"><img src="../../assets/image/wish/ten.png"
                                                                                alt=""></div>
            </div>
            <div class="buy-card">
              <InputNumber v-model="cardNum" :precision="0" :min="1" number :max="1000" size="large"
                           placeholder="请输入升级自选区间功能券自定义面额数量"/>
            </div>
            <div class="skins-tips" > 本站所有游戏道具，只能本人取回到游戏内使用，均不允许站内交易及互换</div>
            <div class="total-money">
              <div>共计： <span><i class="iconfont icon-icon_diamond1" style="font-size: 21px"></i> {{ cardNum }}</span>
              </div>
              <div style="margin-left: 30px;display: flex;align-items: center">
                <img src="../../assets/image/wish/card.png" style="width: 15%;margin-right: 5px" alt="">
                <div>赠送<span> {{ cardNum }} </span>张心愿卡</div>
              </div>
            </div>
            <div class="buy-upgrade">
              <div class="hope-btn">
                <div @click="buyCard">立即购买</div>
              </div>
              <div @click="isShow=false" class="hope-btn">
                <div>取消购买</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {postAction} from "@/api/manage";
  import {mapActions, mapState} from "vuex";
  import {debounce} from "@/utils/utils";

  export default {
    data() {
      return {
        isShow: false,
        cardNum: 1,
      }
    },
    computed: {
      ...mapState('account', ['user'])
    },
    methods: {
      ...mapActions('account', ['getUser']),
      buyCard: debounce(function () {
        if (!this.user.id) return this.$login()
        if (this.user.balance < this.cardNum) {
          return this.$Message.info('余额不足')
        }
        postAction('/api/desire/buy', {num: this.cardNum}).then(res => {
          this.$Message.success('购买成功')
          this.$parent.getCardNum()
          this.isShow = false
          this.getUser()
        }).catch(e => {
          this.$Message.error('购买失败')
        })
      }, 500)
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

  /deep/ .ivu-input-number-input{
    background: #030F43 !important;
    border: 1px solid !important;
    border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 1 1;
    box-shadow: 0px 1px 18px 2px rgba(37, 227, 255, 0.5);
    border-radius: 5px;
    color: #89CCFF !important;
    font-size: 16px;
  }

  .wish-module{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    overflow-y: auto;
    transition: all .3s ease-in-out .2s;
  }


  .wish-content{
    width: 585px;
    height: 400px;
    position: relative;

    .close{
      height: 28px;
      width: 28px;
      border: 2px solid;
      border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 2 2;
      box-shadow: 0px 1px 18px 2px rgba(37, 227, 255, 0.5), 0px 18px 58px 2px rgba(18, 43, 108, 0.7);
      position: absolute;
      top: 5%;
      transform: rotate(45deg) translate(-1px,1px);
      right: -6%;
      text-align: center;
      cursor: pointer;

      i{
        display: inline-block;
        color: #FFFFFE;
        font-size: 13px;
        line-height: 20px;
        transform: rotate(-45deg);
      }
    }
  }

  .wish-module.show{
    opacity: 1;
    visibility: visible;
    z-index: 999;
  }

  .wish-title{
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-around;

    div{
      display: inline-block;
      font-size: 26px;
      font-weight: 500;
      color: #FFF9F9;
      text-align: center;
      padding: 10px 50px;
      background: url("../../assets/image/wish/wishtitle.png") no-repeat center center / 100%;
    }

  }

  .wish-contanier{
    width: 585px;
    border: 2px solid;
    padding: 2px;
    background: linear-gradient(180deg, #4CB7E4, #2A83E3);
    box-shadow: 0px 1px 18px 2px rgba(37, 227, 255, 0.9), 0px 18px 58px 2px rgba(18, 43, 108, 0.7);
    -webkit-clip-path: polygon(2% 0%, 97% 0%, 99% 4%, 99% 94%, 97% 99%, 3% 98%, 0% 94%, 0% 6%);
    clip-path: polygon(2% 0%, 97% 0%, 99% 4%, 99% 94%, 97% 99%, 3% 98%, 0% 94%, 0% 6%);
    margin-top: -20px;

    .wish-contanier-inside{
      padding: 30px 28px 28px 28px;
      height: 100%;
      width: 100%;
      background: black;
      -webkit-clip-path: polygon(2% 0%, 97% 0%, 99% 4%, 99% 94%, 97% 99%, 3% 98%, 0% 94%, 0% 6%);
      clip-path: polygon(2% 0%, 97% 0%, 99% 4%, 99% 94%, 97% 99%, 3% 98%, 0% 94%, 0% 6%);

      > div:nth-of-type(1){
        font-size: 15px;
        font-weight: 500;
        color: #FFFFFF;
      }

      .one-ten{
        display: flex;
        margin: 21px 0;
        justify-content: space-between;
        font-size: 0;

        > div{
          width: 45%;
          cursor: pointer;

          &.active{
            border: 2px solid;
            border-radius: 5px;
            border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 2 2;
            box-shadow: 0px 1px 18px 2px rgba(37, 227, 255, 0.5), 0px 18px 58px 2px rgba(18, 43, 108, 0.7);
          }

          img{
            width: 100%;
          }
        }
      }

      .buy-card{
        width: 100%;
        background: #030F43;
        border: 1px solid;
        border-image: linear-gradient(180deg, #4CB7E4, #2A83E3) 1 1;
        box-shadow: 0px 1px 18px 2px rgba(37, 227, 255, 0.5);
        border-radius: 5px;

        .ivu-input{
          border-radius: 5px;
        }
      }

      .total-money{
        display: flex;
        margin:0 0 16px ;

        > div{
          font-size: 14px;
          color: #FFFFFE;

          span{
            font-size: 21px;
            color: #F82226;
          }
        }
      }

      .buy-upgrade{
        display: flex;

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
    }
  }

  @media screen and (max-width: 767px){
    .wish-content{
      width: 85%;

      .close{
        width: 20px;
        height: 20px;
        right: -4%;
        top: 4%;
        transform: rotate(54deg) translate(-1px,1px);

        i{
          font-size: 12px;
          line-height: normal;
          transform: scale(.7) rotate(-54deg);
        }
      }
    }

    .wish-contanier{
      width: 100%;
      padding: 1px 0 0 2px;

      .wish-contanier-inside{
        padding: 30px 10px 20px 10px;

        > div:nth-of-type(1){
          font-size: 12px;
        }

        .total-money{
          margin: 8px 0;
          justify-content: space-between;

          > div{
            font-size: 12px;

            > span{
              font-size: 15px;

              i{
                font-size: 15px !important;
              }
            }
          }
        }
      }
    }


    .hope-btn{
      width: 110px !important;
    }

    .wish-contanier .wish-contanier-inside .buy-upgrade > div > div{
      padding: 5px 10px;
    }

    .hope-btn > div{
      text-align: center;
      padding: 4px 20px;
      font-size: 14px;
    }

    .wish-title div{
      font-size: 16px;
      font-weight: bolder;
    }

  }

</style>
