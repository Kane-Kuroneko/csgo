<template>
  <div class="empty-container">
    <div style="width: auto"><i class="iconfont icon-a-icon-nodate2"></i></div>
    <p style="text-align:center;">{{ info }}</p>
    <div class="default-btn " v-if="box" @click="goHome">前往开箱</div>
  </div>
</template>

<script>
import router from '../../router/index'

export default {
  name: "Empty",
  props: {
    box: {
      type: Boolean,
      default: false
    },
    info: {
      type: String,
      default: '没有相关数据哦'
    }
  },
  data() {
    return {
      router
    }
  },
  methods: {
    goHome() {
      if (!this.$store.state.account.user.id) return  this.$login()
      this.router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
.empty-container {
  /*opacity: 0.49;*/
  min-height: 4rem;
  margin: .2rem auto;
  padding: 1rem;
  width: 100%;

  div:nth-child(1) {
    text-align: center;
  }

  .default-btn {
    background: rgba(177, 142, 13, 0.25);
    border: 2px solid #F4C002;
    color: #FCC601;
  }

  div:nth-child(3) {
    width: 40%;
    margin: .3rem auto;
  }

  i {
    font-size: .7rem;
    color: #FCC601;
  }

  > p {
    font-size: .18rem;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 19px;
  }

}
</style>
