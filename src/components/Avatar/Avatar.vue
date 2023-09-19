<template>
  <div id="avatar" :style="[{'width': wd}, {'height': ht}]"
       @click="handleFunc"
  >
    <div>
      <img :src="imgHost(img)" alt="">
    </div>
    <img v-if="headFrame" :src="imgHost(headFrame)" alt="">
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    img: {
      default: require('../../assets/image/battle/avator.png'),
      type: String
    },
    headFrame: String,
    wd: {
      default: ".5rem",
      type: String
    },
    ht: {
      default: ".5rem",
      type: String
    }
  },
  methods: {
    handleFunc(el) {
      this.$emit('handleFunc', el)
    },
  }
}
</script>

<style scoped lang="less">
#avatar {
  position: relative;

  > img {
    width: 120%;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    overflow: hidden;
    border-radius: 50%;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}


</style>
