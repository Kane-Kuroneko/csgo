<template>
  <div class="box-list">
    <div class="casebattle-bg">
      <div class="layout" style="margin: auto">
        <Title name="福利活动"></Title>
        <div class="acitve-list">
          <div @click="goSummer('/page/Welfare')" class="item-list cursor">
            <div>
              <img src="../assets/image/activeone.png" alt="">
            </div>
            <div>
              <span>任务宝箱</span>
              <span>长期活动</span>
            </div>
            <div class="hide-float">
              <h3>任务宝箱</h3>
              <p>网站新老用户，只要满足任务条件即可获得免费开启任务宝箱的资格，享受福利！</p>
              <p>长期活动</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title";
import {mapState} from "vuex";

export default {
  name: 'active',
  components: {Title},
  data() {
    return {}
  },
  computed: {
    ...mapState('account', {
      userInfo: state => state.user,
    })
  },
  methods: {
    goSummer(router) {
      if (!this.userInfo.id) return this.$login()
      this.$router.push(router)
    }
  }
}
</script>
<style lang="less">
.hide-float {
  position: absolute;
  left: 0;
  bottom: -100%;
  background: rgba(0, 0, 0, .85);
  border: 0px solid #000000;
  padding: 20px;
  width: 100%;
  transition: all .4s ease-in-out;

  > h3 {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFCA6E;
    text-align: center;
  }

  p:nth-of-type(1) {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    text-align: left;
    margin-top: 20px;
  }

  p:nth-of-type(2) {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    opacity: .5;
    text-align: center;
    margin-top: 20px;
  }
}

.acitve-list {
  display: flex;
  width: 60%;
  justify-content: space-around;
  margin: auto;
  padding-top: 80px;
}

.item-list {
  width: 50%;
  position: relative;
  margin-right: 40px;
  overflow: hidden;
  box-shadow: -5px -12px 20px 0px #000000;
  transition: all .2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  &:hover .hide-float {
    bottom: 0;
  }
}

.item-list img {
  width: 100%;
}

.item-list > div:nth-of-type(2) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.item-list > div:nth-of-type(2) > span:nth-of-type(1) {
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: bolder;
  color: #FFFFFF;
}

.item-list > div:nth-of-type(2) > span:nth-of-type(2) {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bolder;
  color: #FFCA6E;
}

@media screen and (max-width: 767px) {
  .acitve-list {
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
  }

  .item-list {
    width: 90%;
    margin: 0 auto 30px;
  }
}
</style>
