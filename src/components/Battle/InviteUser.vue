<template>
  <HashModule title="邀请玩家" v-model="isShow" :width="7.5">
    <div class="invite-tap">
      <div @click="tapBtn(1)" :class="{'active':type=== 1}">最强对手</div>
      <div @click="tapBtn(2)" :class="{'active': type=== 2}">十拿九稳</div>
    </div>
    <ul>
      <li v-for="el in activePage.list" v-show="activePage.list.length> 0" :key="el.id">
        <div class="invite-avatar">
          <img :src="imgHost(el.avatar)" alt="">
        </div>
        <div class="invite-name over-flow-hide hide-m">
          <i class="iconfont iconicon-people3"></i>
          {{ el.name }}
        </div>
        <div class="invite-round" v-show="type === 2">
          <div class="invite-name over-flow-hide hide-p hide-ipad">
            <i class="iconfont iconicon-people3"></i>
            {{ el.name }}
          </div>
          连胜他
          <span>{{ el.num }}局</span>
        </div>
        <div class="invite-round-win" v-show="type=== 1">
          <div class="invite-name over-flow-hide hide-p hide-ipad">
            <i class="iconfont iconicon-people3"></i>
            {{ el.name }}
          </div>
          连胜我
          <span>{{ el.num }}局</span>
        </div>
        <div class="invite-money" :style="{'color': type === 1 ? '#DA2863' : '#50FFA4'}">
          {{ type === 2 ? '+' : '-' }} {{ el.amount }}
        </div>
        <div class="invite-btn" @click.stop=inviteUser(el,1) v-show="!el.isInvite">
          <div class="default-btn battle-btn"
               :style="{'filter': el.flag ? 'grayscale(0)' : 'grayscale(1)', 'cursor': el.flag ? 'pointer' : 'no-drop'}">
            <i class="iconfont iconicon-add"></i>
            邀请加入
          </div>
        </div>
        <div class="invite-btn" style="font-size: 12px;color: #FFFFFE;text-align: center" v-show="el.isInvite">
          {{ el.inviteTime }}s后可再邀请
        </div>
      </li>
      <Empty info="暂无对战数据" v-show="activePage.list.length === 0"></Empty>
    </ul>
    <p>1分钟内只可邀请一次全站玩家</p>
    <div class="default-btn upgrade-btn" v-show="!activePage.time" @click="inviteUser(null,0);">邀请全站玩家</div>
    <div class="default-btn upgrade-btn" v-show="activePage.time" style="opacity: .6">
      {{ countTime(activePage.time) }}已邀请全站玩家
    </div>
  </HashModule>
</template>

<script>
import HashModule from "@/components/HashModule/HashModule";
import {getAction} from "@/api/manage";
import Empty from "@/components/Empty/Empty";
import {debounce, countTime} from "@/utils/utils";

export default {
  name: "InviteUser",
  components: {HashModule, Empty},
  data() {
    return {
      isShow: false,
      countTime,
      activePage: {list: [],},
      type: 1,
      hoster: 0,
      timer: null,
      inviteTimer: null,
      url: {
        list: '/api/battle/enemy/list'
      }
    }
  },
  watch: {
    isShow(newValue) {
      if (newValue) {
        this.personalEnemy(this.type) //  1连败列表 2.连胜列表
        if (this.activePage.time) {
          this.timer = setInterval(() => {
            this.activePage.time--
            if (this.activePage.time < 1) return clearInterval(this.timer)
          }, 1000)
        }
      }
      if (!newValue) clearInterval(this.timer)
    }
  },

  methods: {
    tapBtn(type) {
      this.personalEnemy(type) //  1连败列表 2.连胜列表
    },
    personalEnemy(type) {
      let parmas = {type: type}
      getAction(this.url.list, parmas).then(res => {
        this.type = type
        res.data.list.forEach(el => {
          if (el.inviteTime > 0) {
            el.timer = setInterval(() => {
              el.inviteTime--
              if (el.inviteTime < 1) {
                el.isInvite = !el.isInvite
                clearInterval(el.timer)
              }
            }, 1000)
          }
          el.inviteTime > 0 ? el.isInvite = true : el.isInvite = false
        })
        this.activePage = res.data
      })
    },
    inviteUser: debounce(function (el, type) {
      // type:1个人/ 0全部, msgType: 1为邀请，0为许愿
      let inviteMsg = {
        createBy: this.$parent.roomData.createBy,
        roomId: window.location.pathname.split('/')[3],
        type: type
      }
      if (el) {
        if (!el.flag) return
        inviteMsg.userId = el.id
        el.isInvite = !el.isInvite
        this.personalEnemy(this.type)
        return this.$sendMsg(inviteMsg, 'drop', e => {
          console.log(JSON.parse(e))
        })
      }
      if (this.activePage.time) return;
      setTimeout(() => {
        this.isShow = false
      }, 1000)
      this.$sendMsg(inviteMsg, 'drop', (e) => {
        if (JSON.parse(e.data).msgType !== 0) {
          // this.$Message.success('已向全站玩家发送对战邀请')
        }
        this.personalEnemy(this.type)
      })
    }, 500)
  }
}
</script>

<style scoped lang="less">
.invite-tap {
  display: flex;

  > div {
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 15px;
    width: 101px;
    text-align: center;
    padding: 10px 22px;
    margin: 0 5px;
    cursor: pointer;

    &.active {
      border-bottom: 2px solid #FFC852;
    }
  }

  > div:nth-of-type(1) {
    margin-left: auto;
  }

  > div:nth-of-type(2) {
    margin-right: auto;
  }
}

ul {
  min-height: 200px;
  max-height: 350px;
  overflow: auto;

  li {
    width: 100%;
    height: 67px;
    background: linear-gradient(-90deg, #22232F, #1D1E28);
    border: 0px solid #000000;
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px 10px 32px;

    .invite-avatar {
      height: 47px;
      width: 47px;
      background: url("../../assets/image/battle/avatarbg.png") no-repeat top left / 100%;
      padding: 6px;

      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .invite-name {
      font-size: 12px;
      width: 18%;
      overflow: hidden;
    }

    .invite-round-win {
      font-size: 12px;
      font-family: PingFang SC;
      color: #FFFFFF;
      line-height: 15px;
      font-weight: bold;
      width: 70px;

      > span {
        color: #DA2863;
      }
    }

    .invite-round {
      font-size: 12px;
      font-family: PingFang SC;
      color: #FFFFFF;
      line-height: 15px;
      font-weight: bold;

      > span {
        color: #50FFA4;
      }
    }

    .invite-money {
      font-size: 12px;
      color: #DA2863;
      font-weight: bold;
      min-width: 30px;
    }

    .invite-btn {
      width: 122px;
      height: 30px;
      line-height: 30px;
      > div {
        height: 100%;
        width: 100%;
        padding: 0 10px;
        font-size: 12px;
        line-height: 200%;

        i {
          font-size: 12px;
        }
      }
    }
  }
}

p {
  font-size: 14px;
  text-align: center;
  margin: 20px 0 0 0;
}

.upgrade-btn {
  width: 50%;
}

@media screen and (max-width: 767px) {
  ul li {
    padding: 10px;

    .invite-name {
      width: 80px;
    }
  }


  ul li .invite-btn {
    width: 100px;
  }

  .upgrade-btn {
    margin: 10px auto;
    height: auto;
    line-height: normal;
    width: 70%;
  }

}

</style>