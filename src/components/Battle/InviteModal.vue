<template>
  <div class="pony-notice">
    <transition-group tag="ul" name="invite">
      <li class="notice-item" v-for="item in inviteList" :key="item.time+''">
        <div class="who-invite">
          <div><img :src="imgHost(item.avatar)" alt=""></div>
        </div>
        <div class="invite-info">
          <div>
            <p><span class="over-flow-hide">{{ item.name }}</span> 向你发出对战邀请</p>
            <p>快加入TA的对战房间吧，就等你了</p>
          </div>
          <div class="price-btn">
            <div><i class="iconfont icon-icon_diamond1"></i> {{ item.roomPrice }}</div>
            <div @click="goBattle(item.roomId)" class="default-btn battle-btn">
              点击加入
            </div>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "InviteModal",
  props: {
    time: {
      default: 5,
      type: Number
    }
  },
  created() {
    this.$bus.$on('invite', data => {
      data.time = new Date()
      data.delete = setTimeout(() => {
        this.inviteList.splice(0, 1)
      }, this.time * 1000)
      this.inviteList.push(data)
    })
  },
  data() {
    return {
      inviteList: [],
    }
  },
  methods: {
    goBattle(roomInfo) {
      this.$router.push('/page/battle/' + roomInfo)
    },
  }
}
</script>

<style scoped lang="less">

.pony-notice {
  width: 280px;
  margin-right: 24px;
  top: 160px;
  right: 0;
  position: fixed;
  z-index: 1010;
  background: rgba(20, 23, 39, 0);
  overflow: hidden;
}

.notice-item {
  width: 100%;
  height: 100px;
  background: url("../../assets/image/battle/msgbg.png") no-repeat top left / contain;
  padding: 14px 23px;
  display: flex;
  margin-top: 15px;
  position: relative;
  top: auto;
  transition: top .5s ease-in-out;

  .who-invite {
    width: 50px;
    overflow: hidden;

    > div {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        object-fit: contain;
        border-radius: 50%;
      }
    }
  }

  .invite-info {
    p {
      font-size: 12px;
      color: #FFFFFE;
      font-weight: bold;

      > span {
        font-size: 12px;
        color: #FFFFFE;
        font-weight: bold;
        display: inline-block;
        width: 70px;
      }
    }

    .price-btn {
      display: flex;
      align-items: center;
      margin-top: 10px;

      > div:nth-of-type(1) {
        font-size: 17px;
        font-weight: 400;
        color: #FFCA6E;
      }

      > .battle-btn {
        margin-left: 10px;
      }
    }
  }
}

.invite-enter {
  transform: translateX(100%);
}

.invite-enter-active,
.invite-leave-active {
  transition: all 0.6s ease-in-out;
}

.invite-leave-to {
  transform: translateX(100%);
}

.invite-enter-active,
.invite-leave-active {
  transition: all .6s ease-in-out;
}

///* 下面的 .v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果 */
.name-move {
  transition: all .6s ease-in-out;
}

//.v-leave-active {
//  position: absolute;
//}

</style>
