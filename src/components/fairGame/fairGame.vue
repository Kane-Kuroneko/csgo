<template>
  <div>
    <hash-module v-model="show"
                 width="8"
                 title="公平游戏">
      <div>
        <div class="hash">
          <div class="hash-top">
            <div class="seed-title">
              <div></div>
              <p>种子信息</p>
              <div></div>
            </div>
            <div style="margin-bottom: .2rem">
              <div class="fair-item">
                <Row>
                  <ColC span="6" class="hide-m"><span>服务器种子hash：</span></ColC>
                  <span style="text-align: left" class="hide-p hide-ipad">服务器种子hash：</span>
                  <ColC :xs="20" :md="14">
                    <Input v-model="res.hash" style="opacity: .5" size="large" placeholder="登录后查看" disabled/>
                  </ColC>
                  <ColC span="4">
                    <div @click="copy(res.hash)" class="default-btn user-btn">复制</div>
                  </ColC>
                </Row>
              </div>
              <div class="fair-item">
                <Row>
                  <ColC span="6" class="hide-m"><span>用户种子：</span></ColC>
                  <span style="text-align: left" class="hide-p hide-ipad">用户种子：</span>
                  <ColC :xs="12" :md="10">
                    <Input size="large" :maxlength="16"  v-model="userSeed" placeholder="登录后查看"/></ColC>
                  <ColC :md="4" :xs="6">
                    <div style="display: flex">
                      <div class="default-btn user-btn" @click="changeSeed()">修改</div>
                    </div>
                  </ColC>
                  <ColC :md="4" :xs="6">
                    <div style="display: flex">
                      <div class="default-btn user-btn" @click="randomSeed()">随机</div>
                    </div>
                  </ColC>
                </Row>
              </div>
            </div>
            <div class="seed-title">
              <div></div>
              <p>种子说明</p>
              <div></div>
            </div>
            <p style="line-height: 30px">*在您开始游戏前，您可以任意修改您的用户种子，以保证该局游戏的公平性；<br/>
              *为了方便您管理自己的种子，您设置的种子将用于所有需要Hash算法的游戏；<br/>
              *如需在游戏后对该局游戏进行验证，请提前复制服务器种子Hash值并保存，以验证并确保游戏前后服务器所给出的种子一致；<br/>
              *游戏公平Hash算法详细规则请参考网页顶部《公平性游戏》；</p>
          </div>
        </div>
      </div>
    </hash-module>
    <hash-module v-model="showFair"
                 width="8"
                 title="公平性游戏">
      <div>
        <div class="fair-price">
          <div class="hash-price-left" style="margin-bottom: 20px">
            <h3>- 升级结果 -</h3>
            <div>
              <div class="box-single">
                <p>开箱结果由Hash算法之后的结果Number决定，升级成功率由您提供的饰品和金币共同决定，您可以自定义选择您期望的升级成功率；</p>
              </div>
              <div class="box-single">
                <p>我们会最高抽成8%（低于25%成功率时保底收取2%）；</p>
              </div>
              <div class="box-single">
                <p>当结果Number在您选择的升级成功率范围内时，既为升级成功！</p>
              </div>
              <div class="box-single">
                <span>当 Number ≤ 成功率时，判定升级成功；</span>
              </div>
              <div class="box-single">
                <span>当 Number > 成功率时，判定升级失败。</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </hash-module>
  </div>
</template>

<script>
import {sha256_digest} from "../../utils/sha256";
import HashModule from "../HashModule/HashModule";

export default {
  components: {HashModule},
  data() {
    return {
      sha256_digest,
      severSeed: true,
      userSeed: '',
    }
  },
  props: {
    show: {
      type: Boolean
    },
    showFair: {
      type: Boolean
    },
    res: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    show(nv) {
      if (nv === true) {
        this.userSeed = localStorage.getItem('userSeed')
      }
    }
  },
  mounted() {
    this.userSeed = localStorage.getItem('userSeed')
  },
  methods: {
    changeSeed() {
      let req = /^[0-9a-zA-Z]{1,16}$/;
      if (req.test(this.userSeed)) {
        localStorage.setItem('userSeed', this.userSeed)
        this.userSeed = localStorage.getItem('userSeed')
        this.$Message.success('修改用户种子成功')
      } else {
        this.$Message.error('种子不能为空且最大长度为16位的英文字母和数字组合')
      }
    },
    randomSeed() {
      this.userSeed = this.randomStr(true, 1, 16)
      console.log(this.seed)
      localStorage.setItem('userSeed', this.userSeed)
    },
    // 种子
    randomStr(flag, min, max) {
      var str = "";
      var index = "";
      var range = min;
      var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      //min,max范围内随机的一个数
      if (flag) {
        range = Math.floor(Math.random() * (max - min + 1) + min);
      }
      for (var i = 0; i < range; i++) {
        index = Math.round(Math.random() * (arr.length - 1));
        str += arr[index];
      }
      return str;
    },
    copy(str) {
      this.$copyText(str).then((e) => {
        this.$Message.success('复制成功')
      });
    },
    sha256(clientSeed, serverSeed) {
      if (!!clientSeed && !!serverSeed) {
        return this.sha256_digest(clientSeed + serverSeed)
      }
      return '暂无'
    },
  }
}
</script>

<style scoped>
.ivu-switch {
  border: 0px solid #030000;
  height: .24rem;
  width: .6rem;
}

.ivu-switch:after {
  position: absolute;
  top: 0;
  transform: translateX(-1px);
  height: .25rem;
  width: .25rem;
  background: #D89532;
  border: 0px solid #030000;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.25);
}

/deep/ .ivu-input {
  background: rgba(20, 23, 39, 0);
  opacity: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
  border-radius: 3px;
  color: #FFFFFE;
}

/deep/ .ivu-input[disabled] {
  color: #FFFFFE;
}

/deep/ .ivu-modal-body {
  padding: 0;
}

.user-btn {
  height: 35px;
  line-height: 200%;
  font-size: 15px;
}
</style>
