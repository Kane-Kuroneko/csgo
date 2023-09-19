<template>
  <div class="time-count" v-if="isNew">
    <div>
      <slot></slot>
    </div>
    <div>
      <p class="vr-name">{{ title }}</p>
      <P class="vr-time">{{ wealfareTime }}</P>
    </div>
  </div>
</template>

<script>
import {countDown} from "@/utils/utils";

export default {
  name: "TimeCount",
  props: {
    time: {
      type: String,
    },
    title: {
      default: '开箱折扣权益倒计时'
    }
  },
  data() {
    return {
      countDown,
      timer: null,
      wealfareTime: '',
      countTime: this.time,
      isNew: true

    }
  },
  mounted() {
    clearInterval(this.timer)
    this.timeCount()
  },
  watch: {
    isNew(newValue) {
      if (!newValue) clearInterval(this.timer)
    },
  },
  methods: {
    timeCount() {
      this.isNew = true
      if (!this.time) return this.isNew = false
      if (this.countTime === '') {
        this.isNew = false
        return clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.wealfareTime = countDown(this.countTime)
        if (this.wealfareTime === '00 : 00 : 00' || this.wealfareTime === '00 : 00 : 01' || this.wealfareTime.includes('-')) {
          this.countTime = ''
          this.isNew = false
          clearInterval(this.timer)
        }
      }, 1000)
    },
  }
}
</script>

<style scoped>
.time-count {
  display: flex;
  width: 210px;
  justify-content: space-between;

}

.time-count > div:nth-of-type(2) {
  flex: 1;
}

img {
  width: 38px;
  height: 47px;
}

.vr-name {
  font-size: 14px;
  color: #FFDDC6;
  line-height: 18px;
  font-weight: bold;
  text-align: center;
}

.vr-time {
  font-size: 16px;
  font-family: FZLanTingHei-H-GBK;
  color: #FF0000;
  font-weight: bold;
  line-height: 18px;
  text-align: center;
}
</style>
