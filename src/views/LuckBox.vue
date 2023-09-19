<template>
  <div class="luck-box-content">
    <div class="tap-lucky" v-if="false">
      <div @click="getHomeData('lucky')" class="drop-rank" :class="{'active': type === 'lucky'}">
        <div>
          <i class="iconfont iconicon-all"></i>
        </div>
        <div>所有游戏</div>
      </div>
      <div @click="getHomeData('drop')" class="drop-rank" :class="{'active': type === 'drop'}">
        <div><i class="iconfont icon-icon-gift"></i></div>
        <div>额外掉落</div>
      </div>
    </div>
    <div>
      <swiper :options="swiperOptionM" ref="notice" style="height: 100%" v-if="luckyData.length> 0">
        <swiper-slide v-for="(el,idx) in luckyData" :key="idx" class="luck-width">
          <div class="winning-box" :class="'luck-' + conversionStyle(el.rarity,el.category)">
            <p class="luck-name">{{ el.userName }}</p>
            <div class="lucky-name hide-m">
              <!-- <p>{{'$ ' + el.price}}</p>-->
              <div>
                <p>{{ el.stuffName.split('|')[0] }}</p>
                <p>{{ el.stuffName.split('|')[1] }}</p>
              </div>
            </div>
            <div class="luck-gun-img" align="center">
              <img class="lucky-gun" :src="imgHost(el.stuffImage)">
            </div>
            <div class="success-rate">
              <div v-show="el.successRate">
                <img v-show="el.successRate" src="../assets/image/upicon.png" alt=""
                     style="width: 10%;margin-left: 5px">
                {{ (+el.successRate).toFixed(3) }}
              </div>
              <div v-show="el.type == 1">
                <img src="../assets/image/vsicon.png" alt="" style="width: 10%">
              </div>
            </div>
            <div class="luck-user-info">
              <div align="center" class="luck-portait">
                <SkinsAvatar
                    wd="40px"
                    ht="40px"
                    :img="el.avatar"
                    :head-frame="el.headPortraitBox"
                >
                </SkinsAvatar>
              </div>
              <p>{{ el.userName }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper';
import 'swiper/css/swiper.css'
import {debounce} from "@/utils/utils";
import {getAction} from "@/api/manage";

export default {
  name: 'luck',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOptionM: {
        slidesPerView: "auto",
        spaceBetween: 0,
        // slidesPerGroup: 'auto',
        loopFillGroupWithBlank: false,
        loop: true,
        autoplay: {
          reverseDirection: true,
          delay: 2000,
          disableOnInteraction: true,
        },
        speed: 2000,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
      },
      luckyData: [],
      type: ''
    }
  },
  mounted() {
    this.getHomeData('lucky')
    setInterval(() => {
      this.getHomeData('lucky')
    }, 180 * 1000)
  },
  methods: {
    getHomeData: debounce(function (type) {
      let url = type === 'lucky' ? '/api/home/web/info' : '/api/drop/dropInfo'
      getAction(url).then(res => {
        if (type === 'drop' && res.data.length < 7) {
          return this.$Message.info('暂无掉落榜单数据')
        }
        this.type = type
        let data = type === 'lucky' ? res.data.boxLuckyVOList : res.data
        this.luckyData = data
        this.$store.commit('account/setHomeLucky', data)
        if (type === 'lucky') {
          return this.$store.commit('account/setHomeNumber', res.data.basicsDataVO)
        }

      })
    }, 0),
  },
}
</script>

<style scoped>
/*/deep/ .swiper-slide{*/
/*    height: 100px !important;*/
/*}*/
</style>
