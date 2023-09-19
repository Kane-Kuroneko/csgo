<template>
  <div class="open-box-del">
    <div class="common-bg">
      <div class="layout" style="margin: auto">
        <Title name="个人中心"></Title>
      </div>
      <div style="margin: auto;" class="layout">
        <div class="router-nav nav-user">
          <div>
            <div class="user-nav" :class="{'active': isCase  }">
              <router-link active-class="active"  to="/user/case"><i class="iconfont iconicon-bag2"></i> {{ isPhone ? '背包' : '我的背包' }}
              </router-link>
            </div>
            <div class="user-nav" :class="{'active': isAssets  }">
              <router-link active-class="active" to="/user/assets"><i class="iconfont icon-icon_diamond2"></i> {{ isPhone ? '购买' : '获取钻石' }}
              </router-link>
            </div>
            <div class="user-nav" :class="{'active': isAccount  }">
              <router-link active-class="active" to="/user/account"><i class="iconfont iconicon-setting"></i> {{ isPhone ? '设置' : '账号设置' }}
              </router-link>
            </div>
            <div class="user-nav" :class="{'active': isPrompt  }">
              <router-link active-class="active" to="/page/promotion"><i class="iconfont icon-icon-invite"></i> {{ isPhone ? '邀请' : '我的邀请' }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="nav-user">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title";

export default {
  name: 'user',
  components: {Title},
  data() {
    return {
      isCase: false,
      isAssets: false,
      isAccount: false,
      isPrompt: false,
      isPhone: false,
    }
  },
  watch: {
    '$route'() {
      console.log(this.$route.path)
      this.isCase = this.$route.path === '/user/case';
      this.isAssets = this.$route.path === '/user/assets';
      this.isAccount = this.$route.path === '/user/account'
      this.isPrompt = this.$route.path === '/page/promotion'
    },
  },
  created() {
    this.isPhone = this.$store.state.account.isPhone
  }
}
</script>

<style>
.ivu-input {
  background: #98A8B4;
  border: 0px solid #030000;
  box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1);
  border-radius: 3px;
}

.ivu-input:focus {
  border: none;
}

.router-nav .active {
  color: #FFCA6E;
}
</style>
