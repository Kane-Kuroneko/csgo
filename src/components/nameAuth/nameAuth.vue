<template>
  <hash-module v-model="show" title="实名认证" :width="7">
    <p class="tips">为了保护您的账号安全，通过实名认证后才可使用商城购买。个人信息用于实名认证，一旦认证不能修改，请认真填写。实名成功将获得<span class="important-tips"
                                                                                      style="margin-right: 0">{{limit}}钻石</span>余额奖励。,
      <a href="https://opendocs.alipay.com/open/02qp09?pathHash=ae6ae451&ref=api" target="_blank"
         class="important-tips">点我查看支付宝官方实名验证接口说明。</a>
    </p>
    <p></p>
    <div>
      <div class="unbindOld">
        <Form ref="nameForm" class="form-box" :rules="rules"
              :model="nameForm">
          <FormItem label="" prop="name">
            <Input v-model="nameForm.name" :disabled="store.state.account.user.isRealName===1" size="large"
                   placeholder="请输入您的实际姓名"/>
          </FormItem>
          <FormItem label="" prop="idCard">
            <Input v-model="nameForm.card" :disabled="store.state.account.user.isRealName===1" size="large"
                   placeholder="请输入您的身份证号码"/>
          </FormItem>
          <div class="protocol" @click="isRead = !isRead" v-if="type === 2">
            <div class="all-chosed">
              <i class="iconfont iconicon-select" v-show="isRead"></i>
            </div>
            <span style="text-decoration:none "> 我已阅读，今日不再自动弹出提醒</span>
          </div>
          <div class="bag-btn" style="margin-top: 40px" v-if="store.state.account.user.isRealName===0">
            <div class="default-btn warehouse-btn" @click="show =false">暂时不用</div>
            <div class="default-btn flex-jus" style="justify-content: center" @click="authName">确认</div>
          </div>
        </Form>
      </div>
    </div>
  </hash-module>
</template>

<script>
  import {getAction, postAction} from "../../api/manage";
  import store from "../../store";

  export default {
    name: "nameAuth",
    props: {
      show: Boolean,
      type: {
        default: 1,
        type: Number
      },
      info: Object,
      default: {}
    },
    watch: {
      show(nv) {
        !nv || getAction('/api/user/card/config').then(res => this.limit = res.data.reward)
        if (!nv) {
          if (localStorage.getItem('nameState') !== new Date().getDate() && this.isRead) {
            localStorage.setItem('nameState', new Date().getDate())
          }
          this.nameForm = {
            name: '',
            card: ''
          }
        }
      },
      info(nv) {
        if (JSON.stringify(nv) !== '{}') {
          this.nameForm = nv;
        }
      }
    },
    data() {
      const validName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('姓名不能为空'))
        } else {
          callback();
        }
      };
      const validIdCard = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入正确的身份证号码'));
        } else {
          let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          if (!_IDRe18.test(this.nameForm.card)) {
            callback(new Error('身份证号码格式错误'));
          } else {
            callback();
          }
        }
      };
      return {
        store,
        isRead: false,
        limit: .1,
        nameForm: {
          name: '',
          card: '',
        },
        rules: {
          name: [{validator: validName, trigger: 'blur'}],
          idCard: [{validator: validIdCard, trigger: 'blur'}],
        },
      }
    },
    methods: {
      authName() {
        this.$refs['nameForm'].validate(valid => {
          if (valid) {
            postAction('/api/user/auth/card', this.nameForm).then(res => {
              this.show = false
              this.$Message.success('实名认证成功');
              store.dispatch('account/getUser');
            }).catch(e => {
              this.$Message.error(e.response.data.errMsg);
            })
          }
        })
      },
    }
  }
</script>

<style scoped>

  .tips{
    font-size: 12px;
    color: #FFFFFE;
    font-weight: bold;
  }

  .protocol{
    margin-top: 20px
  }
</style>
