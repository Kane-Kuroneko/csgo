<template>
  <div class="barrages-drop">
    <vue-baberrage
        :isShow="barrageIsShow"
        :barrageList="barrageList"
        :maxWordCount="maxWordCount"
        :throttleGap="throttleGap"
        :loop="barrageLoop"
        :boxHeight="boxHeight"
        :messageHeight="messageHeight"
    >
      <template v-slot:default="slotProps">
        <div class="barrage-items">
          <div align="center">
            <div class="baberrage-avatar"><img
                :src="slotProps.item.avatar"
                width="30"
                height="30"
                style="border-radius:50%"
            /></div>
            <p class="baberrage-name">{{ slotProps.item.name }}</p>
          </div>
          <div class="baberrage-msg">
            <div>{{ slotProps.item.msg }}</div>
          </div>
        </div>
      </template>
    </vue-baberrage>
  </div>
</template>

<script>
import {MESSAGE_TYPE} from 'vue-baberrage'

export default {
  name: "Babrrage",
  data() {
    return {
      barrageIsShow: true,
      messageHeight: 100,
      messageWidth: 300,
      boxHeight: document.body.clientWidth < 767 ? 300 : 500,
      boxWidth: 800,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 6300,
      barrageList: [],
      leave_page: false,
    }
  },
  mounted() {
    if (this.$store.state.account.baberrageArr.length > 20) {
      this.$store.commit('account/clearBarberrafe', 10)
    }
    this.addToList(this.$store.state.account.baberrageArr)
    this.$bus.$on('wish', (e) => {
      e['id'] = Math.floor(Math.random() * (1000 - 1) + 1)
      this.$store.commit('account/setIBarberrage', e)
      this.addToList([e])
    })
  },
  methods: {
    addToList(msg) {
      msg.forEach(el => {
        this.barrageList.push({
          id: el.id,
          avatar: this.imgHost(el.avatar),
          msg: el.words,
          name: el.name,
          time: document.body.clientWidth < 767 ? Math.random() * (14 - 5) + 5 : Math.random() * (40 - 32) + 32,
          type: MESSAGE_TYPE.NORMAL,
        });
      })
    }
  }
}
</script>

<style lang="less">
.barrages-drop {
  /deep/ .baberrage-item .baberrage-msg {
    font-size: 15px;
    font-weight: 400;
    color: #05F0F8;
  }

  .barrage-items {
    display: flex;
    align-items: center;

    .baberrage-avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      border: 2px solid rgba(52, 144, 223, 0.43);
      box-shadow: 0px 1px 13px 2px rgba(36, 216, 255, 0.5);
      margin-bottom: 5px;
    }

    .baberrage-name {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      text-shadow: 0px 1px 5px rgba(0, 255, 252, 0.5);
    }

    .baberrage-msg {
      transform: translateX(-31px);

      > div {
        height: 60px;
        width: 250px;
        padding: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #05F0F8;
        white-space: normal;
        line-height: normal;
        background: linear-gradient(-90deg, rgba(26, 46, 74, 0), #244C9E);
        border: 0px solid #000000;
      }
    }

    > div:nth-of-type(1) {
      padding: 30px 40px;
      background: url("../assets/image/wish/avatarBg.png") no-repeat top left / 100%;
    }
  }
}
</style>