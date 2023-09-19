<template>
  <hash-module v-model="show" width="7" title="参与活动">
    <p class="takePrompt">这是任务房哦，完成任务就可以参与啦，赶快去完成吧！</p>
    <ul class="take-list">
      <li class="take-item" v-for="(item,index) in res"
          :class="{'moblie-take-item':item.taskName==='冠名','the-last-one':theLastOne(index),'opening':res.length===1}">
        <div class="roll-task">
          <div class="task-name">
            {{item.taskName}}
          </div>
          <div class="task-requirment">
            <span v-show="item.amount !== null"> {{item.amount + '/'}}</span>{{item.code}}
          </div>
        </div>
        <div class="task-finished">{{'未完成'}}</div>
      </li>
    </ul>
    <div @click="copyLink()" v-if="isLink" class="copy-link"><i class="iconfont icon-icon_link"></i> 点击分享链接</div>
    <div class="default-btn sure-btn" @click="close">确定</div>
  </hash-module>
</template>
<script>
  import HashModule from "../HashModule/HashModule";

  export default {
    components: {HashModule},
    props: {
      show: {
        type: Boolean,
        default: false
      },
      res: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {
      isLink() {
        let bol = false
        this.res.forEach(el => {
          bol =  false
          if (el.taskName === '助力次数') {
            bol =  true
          }
        })
        return bol
      }
    },
    methods: {
      close() {
        this.show = false;
      },
      copyLink() {
        let txt = "拜托帮我助力一下吧，助力后我能获得豪华箱子和100%必中饰品roll房~:"+ window.location.origin + `/page/source?poster=${JSON.parse(localStorage.getItem('userinfo')).spreadCode}`
        this.$copyText(txt).then(res => {
          this.$Message.success('复制成功,快去前往邀请好友吧')
        })
      },
      theLastOne(index) {
        if (this.res.find(item => item.id === 4) === undefined) {
          return this.res.length % 2 !== 0 && index === this.res.length - 1;
        } else {
          return this.res.length % 2 === 0 && index === this.res.length - 2;
        }
      }
    }
  }
</script>
<style scoped>
  .sure-btn{
    width: 35%;
    margin: auto;
    font-size: .17rem;
    -webkit-clip-path: polygon(4% 0, 100% 0, 100% 61%, 95% 100%, 0 100%, 0 44%);
    clip-path: polygon(4% 0, 100% 0, 100% 61%, 95% 100%, 0 100%, 0 44%);
  }

  .copy-link{
    font-size: .17rem;
    font-weight: bold;
    text-align: center;
    margin: 10px;
    color: #F0C7A8;
    cursor: pointer;
  }

  .copy-link i{
    font-size: 22px;
  }
</style>

