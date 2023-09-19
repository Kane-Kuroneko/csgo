<template>
  <div class="modal-bg-box special" :class="{'show':show, 'special-m' : isMobile}">
    <div class="modal-box-bg-box" :class="{'show':show,'modal-box-bg-box-m':isMobile}">
      <div class="modal-box-box" :class="{'modal-box-box-m':isMobile}">
        <img src="../../assets/image/close.png" alt="" @click="show =false">
        <div class="box-result-shell" :class="{'box-result-shell-m' : isMobile}">
          <div class="box-result"
               :class="{'box-result-m' : isMobile}"
               v-for="(el,idx) in resultData"
               :key="idx">
            <div align="center" class="result-img" style="border: none;height: 1.8rem">
              <img src="../../assets/image/wssdrop.png" alt="">
              <img :src="imgHost(el.stuffImage)" style="height: 70%" alt="">
            </div>
            <div class="sell-name">
              <p>
                {{ el.stuffName.split('|')[0] ? el.stuffName.split('|')[0] : el.stuffName }}</p>
              <p>{{ el.stuffName.split('|')[1] ? el.stuffName.split('|')[1] : '' }}</p>
            </div>
            <p v-if="resultData.price"><i v-show="el.price" class="iconfont icon-icon_diamond1"></i> {{ el.price ?   el.price.toFixed(2) : ' ' }}</p>
            <div v-if="resultData.price" class="sell-single-skin">
              <p><i v-show="el.price" class="iconfont icon-icon_diamond1"></i> {{ el.price ?   el.price.toFixed(2) : ' ' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {postAction} from "../../api/manage";
import {mapActions} from "vuex";

export default {
  props: {
    show: {
      default: false,
      type: Boolean
    },
    resultData: {
      type: Array,
    }
  },
  name: "ExDrop",
  data() {
    return {
      count: 7,
      isShow: false,
      isMobile: false,
    }
  },
  mounted() {
    this.isMobile = document.body.clientWidth > 764 ? false : true
  },
  methods: {
    imgHost(url) {
      if (!url) return url
      if (url.charAt(0) !== '/') {
        return url
      } else {
        return `https://picture.hzqinyun.com${url}`
      }
    },
    conversionStyle(rarity, type) {
      if (type === 'Type_Hands' || type === 'CSGO_Type_Knife' || type === 'type_hands' || type === 'csgo_type_knife') {
        switch (rarity) {
          case 'Rarity_Ancient_Weapon':
          case 'rarity_ancient_weapon':
          case 'Rarity_Ancient':
          case 'rarity_ancient':
          case 'Rarity_Contraband':
          case 'rarity_contraband':
            return 'gold';
        }
        return
      }
      switch (rarity) {
        case 'Rarity_Contraband':
        case 'rarity_contraband':
          return 'gold';
        case 'Rarity_Ancient':
        case 'rarity_ancient':
        case 'Rarity_Ancient_Weapon':
        case 'rarity_ancient_weapon':
          return 'red'
        case 'Rarity_Legendary_Weapon':
        case 'rarity_legendary_weapon':
        case 'Rarity_Legendary':
        case 'rarity_legendary':
        case 'Rarity_Legendary_Character':
        case 'rarity_legendary_character':
          return 'pink'
        case 'Rarity_Mythical_Weapon':
        case 'rarity_mythical_weapon':
        case 'Rarity_Mythical':
        case 'rarity_mythical':
          return 'purple'
        case 'Rarity_Rare_Weapon':
        case 'rarity_rare_weapon':
        case 'Rarity_Rare':
        case 'rarity_rare':
          return 'blues'
        case 'Rarity_Uncommon_Weapon':
        case 'rarity_uncommon_weapon':
          return 'blue'
        case 'Rarity_Common_Weapon':
        case 'rarity_common_weapon':
        case 'Rarity_Common':
        case 'rarity_common':
          return 'white'
      }
      return 'white'
    },
  }
}
</script>

<style scoped>
.result-img {
  position: relative;
}

.modal-box-box > img:nth-child(1) {
  position: absolute;
  right: 10%;
  top: -8%;
  width: 40px;
}

@media screen and (max-width: 767px) {
  .modal-box-box > img:nth-child(1) {
    position: absolute;
    right: 10%;
    top: -2%;
    /* cursor: pointer; */
  }
}

.result-img > img:nth-of-type(1) {
  width: 55%;
  top: -1%;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
}

.box-result {
  box-shadow: none;
  background: url("../../assets/image/droppup.png") no-repeat top left / 100% 100%;
  padding: .3rem;
}

.box-result > div:nth-child(2) {
  padding: 0;
}

.box-result > P {
  background: url("../../assets/image/pupprice.png") no-repeat top left / 100% 100%;
}

.box-result > div:nth-child(3) p {
  background: url("../../assets/image/pupprice.png") no-repeat top left / 100% 100%;
  padding: 5px 0;
}

.sell-name {
  height: auto;
}

.sell-name p:nth-of-type(1) {
  font-size: .21rem;
  font-family: PingFang SC;
  font-weight: 600;
  color: #835644;
}

.sell-name p:nth-of-type(2) {
  font-size: .21rem;
  font-weight: 600;
  color: #835644;
}
</style>
