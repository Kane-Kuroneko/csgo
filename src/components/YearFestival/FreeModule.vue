<template>
  <div class="hash-module " :class="{'show':isShow}">
    <div class="hash-box" :class="{origion, 'show': isShow}" :style="{'width':  width + 'px'}">
      <div class="hash-header">
        <img src="../../assets/image/festival/freetitle.png" alt="">
        <i class="iconfont iconicon-close" @click="closeModule"></i>
      </div>
      <div class="hash-content">
        <div class="btn-time">
          <div :class="{'active': kind===1}" @click="switchKind(1)"> {{ firstTime }} 免单用户</div>
          <div :class="{'active': kind===2}" @click="switchKind(2)">{{ secondTime }} 免单用户</div>
        </div>
        <div class="free-user">
          <template v-if="dayData.length > 0">
            <div class="free-item" v-for="item in dayData"
                 :class="{'active': item.userId === $store.state.account.user.id}">
              <img src="../../assets/image/festival/good.png" alt=""
                   v-show="item.userId === $store.state.account.user.id">
              <div align="center">
                <img :src="imgHost(item.headPortraitBox)" alt="" v-show="!!item.headPortraitBox">
                <div><img :src="imgHost(item.avatar)" alt=""></div>
              </div>
              <p class="over-flow-hide">{{ item.name }}</p>
              <p class="over-flow-hide">免单: <span>${{ item.money }}</span></p>
            </div>
          </template>
          <div v-else align="center" style="width: 100%">
            <img src="../../assets/image/festival/empty.png" alt="" style="width:60%">
          </div>
        </div>
</div>
</div>
</div>
</template>

<script>

export default {
  name: "FreeModule",
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean
    },
    origion: {
      default: '',
      type: String
    },
    width: {
      default: 920,
    },
    rankList: {
      type: Object
    }
  },
  watch: {
    value(nv) {
      this.isShow = nv
      this.dayData = this.kind === 1 ? this.rankList.oneFree : this.rankList.twoFree
    }
  },
  computed: {
    firstTime() {
      let a, b
      if (this.rankList.yesterdayDecrypt) {
        a = this.rankList.yesterdayDecrypt.firstStartTime.split(' ')[1].split(':')[0]
        b = this.rankList.yesterdayDecrypt.firstStartTime.split(' ')[1].split(':')[1]
      }
      return a + ':' + b
    },
    secondTime() {
      let a, b
      if (this.rankList.yesterdayDecrypt) {
        a = this.rankList.yesterdayDecrypt.secondStartTime.split(' ')[1].split(':')[0]
        b = this.rankList.yesterdayDecrypt.secondStartTime.split(' ')[1].split(':')[1]
      }
      return a + ':' + b
    }
  },
  data() {
    return {
      isShow: this.value,
      kind: 1,
      dayData: []
    }
  },
  methods: {
    closeModule() {
      this.$emit("input", false)
    },
    switchKind(type) {
      this.kind = type
      this.dayData = type === 1 ? this.rankList.oneFree : this.rankList.twoFree
    },
  }
}
</script>

<style scoped lang="less">
.hash-module {
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
  transition: all .4s ease-in-out .2s;

}

.hash-module.show {
  opacity: 1;
  visibility: visible;
  z-index: 999;
}

.hash-module.show .modal-box-bg {
  transform: scale(1);
}

.hash-box {
  box-shadow: 2px 3px 96px 0 #000000, 0 2px 19px 0px rgba(45, 23, 23, 0.79);
  background: url("../../assets/image/festival/tranlighy.png") no-repeat top left / 100%,
  url("../../assets/image/festival/light.png") #100707 no-repeat bottom left / 100%;
  font-size: .22rem;
  color: #fff;
  margin: 0 auto;
  background-size: contain;
  position: relative;
}

.hash-header {
  padding: 10px 15px 15px 0;
  position: relative;

  img {
    width: 60%;
    position: absolute;
    top: -550%;
    left: 50%;
    transform: translateX(-50%);
  }

  i {
    background: #721213;
    color: #FAC860;
    border-radius: 50%;
    position: absolute;
    right: 3%;
    top: 50%;
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
}

.hash-content {
  padding: 15px 10px;
  max-height: 700px;
  overflow-y: auto;
  margin-top: 50px;
}

.btn-time {
  display: flex;

  > div {
    background: url("../../assets/image/festival/unactive.png") no-repeat top left / 100%;
    padding: 4px 15px;
    cursor: pointer;

    &.active {
      background: url("../../assets/image/festival/active.png") no-repeat top left / 100%;
    }

    &:hover {
      background: url("../../assets/image/festival/active.png") no-repeat top left / 100%;
    }
  }

  > div:nth-of-type(1) {
    margin-left: auto;
    margin-right: 10px;
  }

  > div:nth-of-type(2) {
    margin-right: auto;
  }
}

.free-user {
  margin-top: 30px;
  min-height: 500px;

  .free-item {
    display: inline-block;
    width: 91px;
    height: 137px;
    background: rgba(33, 11, 11, 0.3);
    box-shadow: 0px 1px 4px 0px rgba(202, 101, 101, 0.29);
    margin-right: 7px;
    margin-bottom: 10px;
    position: relative;

    &.active {
      background: #4A1010;
      border: 1px solid #802020;
      box-shadow: 0px 1px 4px 0px rgba(202, 101, 101, 0.29);
    }

    > img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }

    > div {
      width: 52px;
      height: 52px;
      margin: 25px auto 15px;
      border-radius: 50%;

      > div {
        padding: 4px;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      > img {
        overflow: hidden;
        width: 100%;
        position: absolute;
        top: 0%;
        left: 0;
      }
    }

    p {
      font-size: 12px;
      text-align: center;
      font-weight: bold;

      span {
        color: #FFC76E;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .hash-box {
    width: 90% !important;
  }

  .hash-content {
    padding: 5px 10px;
    max-height: 450px;
    overflow: auto;
  }

  .hash-header img {
    top: -250%;
    width: 80%;
  }

  .free-user .free-item {
    width: 32%;
    margin-right: 1%;
  }
}
</style>
