<template>
  <div>
    <Modal v-model="show"
           :title="title"
           :styles="{top:'15%'}"
           :closable="false"
           :mask-closable="false"
           footer-hide>
      <Form ref="emailForm" class="form-box" :rules="rules"
            :model="formData">
        <FormItem label="" prop="steamId">
          <Input v-model="formData.steamId" size="large"
                 :disabled="true"/>
        </FormItem>
        <FormItem label="" prop="steamId">
          <Input v-model="formData.spreadCode" size="large" placeholder="请输入推广码"/>
        </FormItem>
        <FormItem label="" prop="phone">
          <Input v-model="formData.phone" size="large" placeholder="请输入需要绑定的手机号"/>
        </FormItem>
        <FormItem label="" prop="code">
          <div style="display: flex">
            <Input v-model="formData.code" size="large" placeholder="请输入手机验证码"/>
            <div class="default-btn  code-btn" @click="getCode">
              {{ codeBtnTxt }}{{ codeBtnTxt !== '发送验证码' ? '秒后重试' : '' }}
            </div>
          </div>
        </FormItem>
        <FormItem>
          <div @click="commit" style="padding: 0" class="default-btn" v-if="!loading">绑定</div>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="isPassword"
           title="系统随机密码"
           :styles="{top:'20%'}"
           footer-hide>
      <Form ref="passwordForm" class="form-box" :rules="rules"
            :model="fromPassword">
        <FormItem prop="steamId">
          <Input v-model="fromPassword.password" size="large"
                 :disabled="true"/>
        </FormItem>
      </Form>
      <p class="tips-words">提示: 请尽快前往 <span @click="goUser" class="important-tips">个人中心</span> 修改密码</p>
    </Modal>
  </div>

</template>
<script>

import store from '../../store/index'
import {getAction, postAction} from "../../api/manage";
import router from '../../router/index'

export default {
  store: store,
  props: {
    show: Boolean,
    type: String,
    isAnswerChang: {
      type: Boolean,
      default: false
    },
    steamId: String
  },
  data() {
    const validEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机'))
      } else {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!reg.test(this.formData.email)) {
          callback(new Error('手机号格式不正确'));
        } else {
          callback();
        }
      }
    };
    const validCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证不能为空'))
      } else {
        callback();
      }
    };
    return {
      router,
      formData: {
        phone: '',
        code: '',
        steamId: '',
        spreadCode: '',
      },
      isPassword: false,
      fromPassword: {
        password: '',
      },
      rules: {
        email: [{validator: validEmail, trigger: 'blur'}],
        code: [{validator: validCode, trigger: 'blur'}],
      },
      codeBtnTxt: '发送验证码',
      time: null,
      title: '绑定手机号',
      codeLoading: false,
      loading: false,
      url: {
        bind: '/api/user/steam/register',
        checkPhone: '/api/user/check/phone'
      }
    }
  },
  watch: {
    codeBtnTxt: function (newValue, oldValue) {
      if (newValue === 0) {
        clearInterval(this.time);
        this.time = null;
        this.codeBtnTxt = '发送验证码';
      } else if (newValue === 60) {
        this.codeBtnTxt = 60;
        this.time = setInterval(() => this.codeBtnTxt--, 1000);
      }
    },
    show: function (newValue, oldValue) {
      this.formData.steamId = this.steamId;
    },
    isPassword: function (newValue, oldValue) {
      if (newValue === false) {
        window.location.href = window.location.origin;
      }
    }
  },
  methods: {
    goUser() {
      window.location.href = window.location.origin + '/user/account';
      this.isPassword = false;
    },
    closeForm() {
      this.$refs.emailForm.resetFields();
      this.show = false;
    },
    getCode() {
      this.$refs.emailForm.validateField('phone', valid => {
        if (!valid) {
          this.codeLoading = true
          let params = {phone: this.formData.phone}
          getAction(this.url.checkPhone, params).then(res => {
                if (!res.data.checkStatus) return this.$Message.error('手机号码已存在')
                const captcha = new window.TencentCaptcha('2049235196', (check) => {
                  if (check.ret === 2) {
                    this.$Message.error('用户主动关闭人机验证');
                    this.codeLoading = false
                  } else if (check.ret === 0) {
                    this.$Spin.show();
                    let params = {
                      phone: this.formData.phone,
                      randStr: check.randstr,
                      ticket: check.ticket
                    }
                    postAction(`/api/personal/center/send/2/code`, params).then(res => {
                      this.$Message.success('验证码已发送');
                      this.codeLoading = false
                      this.codeBtnTxt = 60;
                      this.$Spin.hide();
                    }).catch(error => {
                      this.$Spin.hide();
                      this.$Message.error(error.response.data.errMsg)
                      this.codeLoading = false
                    })
                  }
                  captcha.destroy();
                });
                captcha.show();
              }
          )

        }
      })
    },
    commit() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          this.$Spin.show();
          this.loading = true
          postAction(this.url.bind, this.formData).then(res => {
            this.$Message.success('操作成功');
            this.fromPassword.password = res.data.password
            this.closeForm();
            if (res.data.password) {
              this.isPassword = true
            }
            localStorage.setItem('token', res.data.token)
            this.$store.commit('account/setToken', res.data.token);
            this.$store.dispatch('account/getUser');
            this.$Spin.hide();
            this.loading = false
            if (this.isAnswerChang) {
              this.$reset(this.formData.phone);
              this.$Message.info('手机号绑定成功，继续修改密码');
            }
          }).catch(error => {
            this.$Message.error(error.response.data.errMsg)
            this.$Spin.hide();
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
/deep/ .ivu-input[disabled] {
  background: #98A8B4;
  /*cursor: none;*/
}

/deep/ .ivu-input {
  border: none;
  box-shadow: none;
  color: #0A0A0A;
}

/deep/ .ivu-input:focus {
  color: #FFFFFE;
}

.tips-words {
  margin-top: .2rem;
  text-align: right;
  font-weight: 600;
  color: #0A0A0A;
}
</style>
