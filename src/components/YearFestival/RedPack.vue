<template>
  <div class="full-screen" v-if="redPackTime<36">
    <img v-show="redPackTime>30 && redPackTime < 36 && isOpenCount" src="../../assets/image/festival/closeenvlope.png"
         alt=""
         class="close-envalope" @click="isOpenCount = false">
    <img v-show="redPackTime >= 1 && redPackTime <= 30 && isOpenPack"
         @click="isOpenPack = false"
         src="../../assets/image/festival/closeenvlope.png" alt="" class="close-envalope">
    <div class="screen-count" v-if="isOpenCount && redPackTime>30">
      <img src="../../assets/image/festival/one.png" alt="" v-show="redPackTime === 31 ">
      <img src="../../assets/image/festival/two.png" alt="" v-show="redPackTime === 32 ">
      <img src="../../assets/image/festival/three.png" alt="" v-show="redPackTime === 33">
      <img src="../../assets/image/festival/four.png" alt="" v-show="redPackTime === 34 ">
      <img src="../../assets/image/festival/five.png" alt="" v-show="redPackTime === 35 ">
    </div>
    <ul class="ul-pack" v-if="isOpenPack && redPackTime<=30"></ul>
    <div class="result-pack" v-show=" 1 < redPackTime && redPackTime<=30 && isOpenPack">
      <div style="height: 100%">
        <div class="move-li" style="overflow: hidden">
          <div class="pack-item" v-for="(item,idx) in swiperData" :key="item.redPack+idx">
            <span>{{ item.userName }}</span>用户刚刚抢到了<span>
            <i class="iconfont icon-icon_diamond1"></i>
            {{ item.redPack }}</span>红包
          </div>
        </div>
      </div>
    </div>
    <div class="pack-pup" v-show="show">
      <div>
        <div class="pup-text">
          <div class="get-money" v-show="+redPack > 0 && !redEnvelope">
            <h3>恭喜获得</h3>
            <p>
              <img src="../../assets/image/festival/gold.png" alt="">
              <span> {{ redPack }}</span>
            </p>
            <p>已发放至余额</p>
          </div>
          <div class="empty-pack" v-show=" +redPack === 0 && !redEnvelope ">
            <p><img src="../../assets/image/festival/emptye.png" alt=""></p>
            <h3 style="margin-top: 5px">这个红包是空的</h3>
          </div>
          <div class="total-pack" v-show="totalPack > 0 && redEnvelope">
            <h3>本轮结束</h3>
            <p>
              本轮红包雨您抢到了红包共计
              <br/>
              <i class="iconfont icon-icon_diamond1"></i>
              <span>{{ totalPack }}</span>
            </p>
          </div>
          <div class="total-pack" v-show="totalPack === 0 && redEnvelope">
            <h3>本轮结束</h3>
            <p style="margin-top: 15px;">很遗憾，本轮您没有抢到红包，下一轮继续加油哦~</p>
          </div>
        </div>
        <div class="pack-time" v-if="redPackTime < 2 && packTimes">
          <p>今日下场红包雨时刻 <span>{{packTimes.getHours() + ':' + packTimes.getMinutes()}}</span></p>
        </div>
        <div class="close-pup cursor" align="center" @click="show=false">
          <img src="../../assets/image/festival/closepup.png" alt="" class="war-hover">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {getAction} from "@/api/manage";

  export default {
    name: "RedPack",
    data() {
      return {
        packRain: 50,
        timer: null,
        count: 0,
        redPack: 0,
        isOpenCount: true,
        isOpenPack: false,
        redPackTime: 36,
        redEnvelope: true,
        totalPack: 0,
        packTimes: null,
        option: {
          direction: 'vertical',
          loop: false,
          autoplay: true,
          centeredSlides: true,
          thumbs: {
            swiper: {
              slidesPerView: 4,
              slideToClickedSlide: true
            },
          },
        },
        show: false,
        url: {
          receive: '/api/activity/red/envelope',
          all: '/api/activity/red/amount',
          time: '/api/activity/next/time '
        },
        swiperData: [],
      }
    },
    created() {
      this.$bus.$on('redPack', (e) => {
         if (!this.user.id) return
         if (e.msgType === 3) {
           this.redPackTime = e.time
           if (this.redPackTime < 31) {
             if (this.redEnvelope) {
               this.isOpenPack = true
               this.addRedPack()
             }
             this.redEnvelope = false
             if (this.redPackTime < 1) {
               let domLi = document.querySelectorAll('.red-pack')
               domLi.forEach(item => {
                 item.remove()
               })
               this.packTime();
               let ulDom = document.getElementsByClassName('move-li');
               ulDom[0].style.cssText = `transform: translateY(0px);`
               this.allPack();
               this.swiperData = [];
               this.redPack = 0;
               this.redEnvelope = true;
               this.isOpenCount = true;
               this.isOpenPack = false;
               this.count = 0;
               this.show = false;
             }
           }
         }
         if (e.type === 1) {
           this.addData(e)
         }
       }
      )
    },
    computed: {
      ...mapState('account', ['user'])
    },
    methods: {
      packTime() {
        getAction(this.url.time).then(res => {
          this.packTimes = res.data ? new Date(res.data) : null;
        })
      },
      addRedPack() {
        if (!this.user.id) return
        this.$nextTick(() => {
          let li = document.createElement('li')
          let img = document.createElement('img')
          let ulDom = document.getElementsByClassName('ul-pack')
          img.src = require('../../assets/image/festival/redpack.png')
          let width = this.$store.state.account.isPhone ? Math.random() * 30 + 25 : Math.random() * 30 + 30
          li.style.cssText = `width: ${width}px;left: ${Math.random() * 97 + 1}%;transform: rotate(${Math.random() * 90 - 45}deg)`
          li.className = 'red-pack'
          li.addEventListener('click', () => {
            this.showResult()
          })
          li.appendChild(img)
          ulDom[0].appendChild(li)
          if (2 < this.redPackTime && this.redPackTime < 31 && this.isOpenPack) {
            this.timer = setTimeout(() => {
              this.addRedPack()
            }, this.$store.state.account.isPhone ? 500 : 200)
          }
          setTimeout(() => {
            li.remove()
          }, 6000)
        })
      },
      allPack() {
        getAction(this.url.all).then(res => {
          this.totalPack = res.data
          this.show = true
        })
      },
      showResult() {
        if (!this.user.id) return this.$login()
        getAction(this.url.receive).then(res => {
          this.redPack = res.data
          this.show = true
          if (+res.data > 0) {
            this.$store.dispatch('account/getUser')
          }
        })
      },
      addData(e) {
        this.swiperData.push({
          userName: e.name,
          redPack: e.amount
        })
        let ulDom = document.getElementsByClassName('move-li')
        if (this.swiperData.length > 4) {
          this.count++
          ulDom[0].style.cssText = `transform: translateY(-${30 * this.count}px);`
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .full-screen{
    position: fixed;
    top: -100px;
    left: 0;
    z-index: 1000;
  }

  .ul-pack{
    background: rgba(0, 0, 0, .5);
    outline: 999px solid rgba(0, 0, 0, .5);
    width: 100vw;
    height: calc(100vh + 100px);
  }

  .close-envalope{
    position: fixed;
    top: 10%;
    right: 5%;
    width: 100px;
    cursor: pointer;
    z-index: 1001;
  }

  .pup-text .get-money{
    h3{
      font-size: 18px;
      font-weight: bold;
      color: #FFD270;
      text-align: center;
    }

    > p:nth-of-type(2){
      font-size: 14px;
      font-weight: 400;
      color: #FFD270;
      margin-top: 16px;
    }

    > p:nth-of-type(1){
      font-size: 0;
      background: url('../../assets/image/festival/borderbox.png') no-repeat top left  / 100%;
      width: 172px;
      height: 120px;
      padding: 10px 10px;
      border-radius: 3px;
      margin: 15px auto 10px;
      box-shadow: 0px -1px 18px 2px rgba(0, 0, 0, 0.33), 0px 12px 36px 2px rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      span{
        font-size: 29px;
      }

      img{
        width: 40%;
        filter: drop-shadow(0 1px 17px rgba(0, 0, 0, 0.76));
      }
    }

  }

  .screen-count{
    background: rgba(0, 0, 0, .5);
    outline: 999px solid rgba(0, 0, 0, .5);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vh;
    height: 70vh;

    > img{
      width: 100%;
    }
  }

  .result-pack{
    position: fixed;
    bottom: 10%;
    right: 10%;
    width: 300px;
    height: 150px;
    padding: 10px 7px;
    overflow: hidden;
    box-sizing: border-box;
    background: #200C0C;
    box-shadow: 0px -1px 21px 3px rgba(0, 0, 0, 0.33), 0px 14px 42px 2px rgba(0, 0, 0, 0.75);
    z-index: 1000;
  }

  .pack-item{
    color: #C9AA6C;
    font-size: 14px;
    margin-bottom: 3px;
    text-align: center;
    height: 27px;

    i{
      font-size: 14px;
      color: #FCFF00;
    }
  }

  .pack-item span{
    color: #FCFF00;
  }

  .move-li{
    height: 100%;
    transition: all .5s;
  }

  .pack-pup{
    box-sizing: content-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 448px;
    height: 548px;
    z-index: 1002;
    border: 9999px solid rgba(0, 0, 0, .1);
    background: url("../../assets/image/festival/redpup.png") rgba(0, 0, 0, .7) no-repeat top left / 100%;

    > div{
      position: relative;
      height: 100%;

      > img{
        position: absolute;
        top: 16%;
        width: 25%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .pup-text{
    position: absolute;
    top: 31%;
    left: 50%;
    transform: translateX(-50%);
    width: 45%;
    height: 200px;

    h3{
      font-size: 18px;
      font-weight: bold;
      color: #FFD270;
      text-align: center;
    }

    p{
      text-align: center;
    }

    p:nth-of-type(1){
      font-size: 51px;
      font-weight: bold;
      color: #FFEA64;
      margin-top: 10px;

      i{
        font-size: 51px;
      }
    }

    p:nth-of-type(2){
      font-size: 21px;
      font-weight: bold;
      color: #FFEA64;
      margin-top: 20px;
    }
  }

  .pack-pup .pup-text .empty-pack{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    h3{
      font-size: 14px;
      font-weight: 400;
      color: #FFD270;
    }

    p{
      font-size: 0;
      background: url('../../assets/image/festival/borderbox.png') no-repeat top left  / 100%;
      width: 172px;
      height: 120px;
      padding: 10px 10px;
      border-radius: 3px;
      margin: 15px auto 10px;
      box-shadow: 0px -1px 18px 2px rgba(0, 0, 0, 0.33), 0px 12px 36px 2px rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;

      img{
        width: 55%;
        filter: drop-shadow(0 1px 17px rgba(0, 0, 0, 0.76));
      }
    }
  }

  .pack-pup .pup-text .total-pack{
    height: 100%;

    p{
      font-size: 14px;
      background: url('../../assets/image/festival/borderbox.png') no-repeat top left  / 100%;
      width: 172px;
      height: 120px;
      padding: 10px 10px;
      border-radius: 3px;
      margin: 15px auto 10px;
      box-shadow: 0px -1px 18px 2px rgba(0, 0, 0, 0.33), 0px 12px 36px 2px rgba(0, 0, 0, 0.75);

      span{
        display: inline-block;
        margin-top: 15px;
        font-size: 35px;
      }

      i{
        font-size: 35px;
      }
    }

    div{
      width: 217px;
      height: 45px;
      background: #931617;
      border: 0 solid #000000;
      text-align: center;
      font-size: 15px;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 25px;
      margin: 20px auto 0;

      span{
        display: inline-block;
        font-size: 33px;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 45px;
      }
    }
  }

  .close-pup{
    position: absolute;
    bottom: 21%;
    left: 50%;
    transform: translateX(-50%);

    > img{
      width: 70%;
    }
  }

  .pack-time{
    position: absolute;
    bottom: 26%;
    left: 50%;
    transform: translateX(-50%);

    > p{
      font-size: 12px;
      font-weight: 600;
      color: #C9AA6C;
      line-height: 27px;
      text-align: center;

      span{
        color: #FFD928;
      }
    }
  }


  @media screen and (max-width: 800px){

    .result-pack{
      bottom: 5%;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
    }

    .pack-pup{
      width: 98%;
      height: 500px;
    }

    .close-pup{
      bottom: 25%;
    }

    .pack-pup .pup-text .total-pack p{
      font-size: 15px;
      margin-top: 15px;
    }

    .pack-pup .pup-text i{
      font-size: 15px;
    }

    .pack-pup .pup-text .empty-pack{
      p{
        font-size: 14px;
      }
    }

    .pack-time{
      bottom: 33%;

      > div{
        width: 140px;

        > p{
          font-size: 12px;
        }
      }

    }

    .close-envalope{
      position: fixed;
      top: 5%;
      right: 5%;
      width: 70px;
      cursor: pointer;
      z-index: 1001;
    }

    .pup-text{
      top: 27%;
      height: 140px;

      h3{
        font-size: 18px;
        font-weight: bold;
        color: #FFCEA6;
        text-align: center;
      }

      p{
        text-align: center;
      }

      p:nth-of-type(1){
        font-size: 35px;
        font-weight: bold;
        color: #FFEA64;
        margin-top: 10px;
      }

      p:nth-of-type(2){
        font-size: 14px;
        font-weight: bold;
        color: #FFEA64;
        margin-top: 5px;
      }
    }

  }
</style>
