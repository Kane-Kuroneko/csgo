<template>
  <!-- 通知弹窗 -->
  <div class="modal-bg-box special-up" :class="{'show':show, 'special-up-m': isPhone}">
    <div class="modal-box-bg-up" :class="{'show':show}">
      <div class="modal-box-box">
        <div class="box-result-shell-up" :class="{'result-shell-up':isPhone}">
          <div class="box-result-up skins-con" :class="'boders-'+ conversionStyle(result.rarity)">
            <img v-if="result.levelName" :src="require(`../../../assets/image/stone${result.levelName}.png`)" alt=""
                 class="stone-upgrade">
            <div align="center" style="border: none"
                 :class="'drop-qua-'+ conversionStyle(result.rarity,result.category)">
              <img :src="result.image " style="width: 60%;" alt="">
            </div>
            <div class="special-prize-up">
              <p>{{ result.name1 }}
              </p>
              <p>{{ result.name2 }}</p>
            </div>
            <p><i class="iconfont icon-icon_diamond1"></i>
              <span>{{ result.value.toFixed(2) }}</span>
            </p>
          </div>
        </div>
        <div class="btn-box-up">
          <div class="default-btn all-btn" style="margin: auto;width: max-content;" @click="show = false">
            放入仓库
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      result: {
        type: Object,
        default: function () {
          return {}
        }
      },
      isPhone: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      show(nv) {
        if (!nv) this.$parent.startRecord();
      },
    },
    data() {
      return {
        show: false
      }
    },
  }
</script>
