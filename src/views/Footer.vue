<template>
  <div id="menu-footer">
    <div class="layout mar-auto">
      <div class="web-info">
        <div class="web-info-box">
          <div align="center">
            <img src="../assets/image/key.png" alt="">
          </div>
          <div>
            <p>{{ home.opening }}</p>
            <p>已开箱</p>
          </div>
        </div>
        <div class="web-info-box">
          <div align="center">
            <img src="../assets/image/home.png" alt="">
          </div>
          <div>
            <p>{{ home.buy }}</p>
            <p>商城兑换数</p>
          </div>
        </div>
        <div class="web-info-box">
          <div align="center">
            <img src="../assets/image/people.png" alt="">
          </div>
          <div>
            <p>{{ home.user }}</p>
            <p>用户数</p>
          </div>
        </div>
      </div>
      <div class="foot-company-info">
        <article>温馨提示：适度娱乐 切勿沉迷 注意账号保护 谨防上当受骗</article>
        <br/>
        <article class="cursor">
          <a href="" target="_blank">
            金华碧辉网络科技有限公司 | 浙ICP备2023019170号
          </a>
        </article>
      </div>
      <div class="about-company">
        <div class="footer-nav">
          <div class="bot-img-info">
            <img @click="++count" src="../assets/image/botWechat.png">
            <img src="../assets/image/botZfb.png">
            <img src="../assets/image/G2A.png">
          </div>
          <div>
            <router-link to="/page/helpcenter/aboutus" v-if="!isHash">关于我们</router-link>
            <router-link to="/page/helpcenter/aboutus1" v-else>关于我们</router-link>
            <span>/</span>
            <router-link to="/page/helpcenter/activity" v-if="!isHash">常见问题</router-link>
            <router-link to="/page/helpcenter/activity1" v-else>常见问题</router-link>
            <span>/</span>
            <router-link to="/page/helpcenter/Termsofuse">使用条款</router-link>
            <span>/</span>
            <router-link to="/page/helpcenter/Privacypolicy" v-if="!isHash">隐私政策</router-link>
            <router-link to="/page/helpcenter/Privacypolicy1" v-else>隐私政策</router-link>
            <span>/</span>
            <router-link to="/page/helpcenter/shouldknow">纠纷处理引导</router-link>
            <a v-show="count > 5" href="/doclist.html">博客</a>
          </div>
        </div>
        <div class="hide-m" style="display: flex;justify-content: space-between">
          <div></div>
          <img src="../assets/image/logo.png" alt="" style="width: 65%;object-fit: contain">
        </div>
      </div>
      <div class="hide-p hide-ipad" align="right" style="padding: 10px 20px 0 0">
        <img src="../assets/image/logo.png" alt="" width="40%">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'menuFooter',
    computed: {
      ...mapState('account', {
        home: state => state.homeInfo.basicsDataVO,
      }),
    },
    data() {
      return {
        isHash: true,
        count: 1,
      }
    },
    mounted() {
      let name = ['www.97hash.com', '97hash.com']
      if (name.includes(window.location.hostname)) {
        this.isHash = false
      }
    },
    methods: {
      authentication() {
        window.open('https://v.yunaq.com/certificate?domain=www.97hash.com&from=label&code=90020')
      },
      hostHandle() {
        let name = ['www.97hash.com', '97hash.com']
        if (name.includes(window.location.hostname)) {
          return this.isHash = true
        }
        return this.isHash = false
      },
    }
  }
</script>

