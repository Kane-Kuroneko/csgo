<template>
    <Modal v-model="show"
           :styles="{top:'30%'}"
           width="22rem"
           :title="title"
           footer-hide>
        <Form ref="loginForm" class="form-box" :rules="rules" :model="formData">
            <FormItem prop="name" class="nick-input" v-if="changeType==='name'">
                <Input v-model.trim="formData.name" size="large" placeholder="请输入您的用户名"/>
            </FormItem>
            <FormItem prop="phone" v-if="changeType==='phone'">
                <Input v-model.trim="formData.phone" size="large" placeholder="请输入您的手机号"/>
            </FormItem>
            <FormItem prop="code" v-if="changeType==='phone'">
                <Input v-model="formData.code" size="large" :class="{'no-send':!canSend}"  placeholder="请输入验证码" enter_account search @on-search="getCodeFun" :enter-button="codeBtnTxt"/>
            </FormItem>
            <FormItem prop="tradeUrl" v-if="changeType==='tradeUrl'">
                <Input v-model.trim="formData.tradeUrl" size="large" placeholder="请输入您的Steam交易链接"/>
                <a v-if="formData.steamId" class="go-get-steam account-link-pos-w" @click="goHelp" >无法获取，点我获取帮助></a>
                <a v-if="formData.steamId" class="go-get-steam" :href="`https://steamcommunity.com/profiles/${formData.steamId}/tradeoffers/privacy#trade_offer_access_url`" target="_blank">获取交易链接</a>
                <div v-if="showLoginSteam" class="steam-error-tip">您还未绑定Steam账户，<a @click="loginSteam">去绑定</a></div>
            </FormItem>
            <FormItem>
                <div class="default-btn" @click="changeFunc">设置</div>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
import {MathFunc} from'../utils/utils';
import { mapActions, mapState } from 'vuex'
import Uint64 from '../utils/Uint64';
import {putAction} from "../api/manage";
let timer = null;
export default {
    props:{
        show:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default: ''
        },
        changeType:{        //修改类型  nickname,pwd,phone,tradeUrl
            type:String
        },
    },
    watch:{
        show:function(newVal,oldVal){
            if(!newVal){
                this.$refs['loginForm'].resetFields();
                clearInterval(timer);
                this.codeBtnTxt = '发送验证码';
                this.canSend = true;
                this.$parent.setTradeUrlModal.show = false
            }
        }
    },
    data(){
        const validName = (rule, value, callback) => {
            if(value.length>20){
               callback(new Error('请输入至多20位字符的用户名'));
            }
            callback();
        };
        const validEmail = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请输入手机号'))
            }else{
                let reg = /^([A-Za-z0-9_.])+@([A-Za-z0-9_.])+.([A-Za-z]{2,4})$/i;
                if(!reg.test(this.user.phone)){
                    callback(new Error('手机号格式不正确'));
                }else{
                    callback();
                }
            }
        };
        const validCode = (rule, value, callback) => {
            if(value === ''){callback(new Error('验证不能为空'))}else{callback();}
        };
        const validTradeUrl =   (rule, value, callback) => {
            if(!this.user.steamId){
                this.showLoginSteam = true
            }else{
                if(value === ''){
                    callback(new Error('请输入您的Steam交易链接'));
                }else{
                    let num = new Uint64(`${this.user.steamId}`,10);
                    let flag =  (num.toNumber() & 0xFFFFFFFF) >>> 0;
                    let partner = this.getQueryString('partner',value);
                    if(String(partner) !== String(flag)){
                        callback(new Error('交易链接与您的steamID不匹配'));
                    }else{
                        this.formData.tradeUrl = value;
                        callback();
                    }
                }
            }
        };
        return {
            showLoginSteam: false,
            loginType:true,    //true账号登录  false邮箱登录
            formData:{
                name:'',
                phone:'',
                code:'',
                tradeUrl:''
            },
            rules:{
                name:[{validator:validName,trigger:'blur'}],
                phone:[{validator:validEmail,trigger:'blur'}],
                code:[{validator:validCode,trigger:'blur'}],
                tradeUrl:[{validator:validTradeUrl,trigger:'blur'}]
            },
            codeBtnTxt: '发送验证码',
            canSend:true
        }
    },
    created() {
        Object.assign(this.formData, this.user)
    },
    computed: {
        ...mapState('account', ['user'])
    },
    methods:{
        ...mapActions('account', ['getUser']),
        startTiming(){		//计时
            let time = 30;
            let _this = this;
            _this.canSend = false;
            timer = setInterval(function(){
                _this.codeBtnTxt =  `${time}秒后重新发送`;
                time--;
                if(time < 0 ){
                    clearInterval(timer);
                    _this.codeBtnTxt ='发送验证码';
                    _this.canSend = true;
                }
            },1000)
        },
        sendCode(data) {
            this.$axios.post('api/phone/send',data)
                .then(res => {
                    this.$Message.success('验证码已发送，请注意查收');
                }).catch(err=>{
                this.$Message.error(err.response.data.errMsg);
            });
            this.getRefreshToken()
        },
        getCodeFun(){       //获取验证码
            if(!this.canSend){return false;}
            this.$refs.loginForm.validateField('phone',(err)=>{
                if(err === ''){
                    let _this = this;
                    if (localStorage.getItem('lang') === 'ZH') {
                        const captcha = new window.TencentCaptcha('2049235196',function(check){
                            if(check.ret !== 0){
                                return false;
                            }
                            // 计时
                            _this.startTiming();
                            // 发送验证码
                            const data = {phone:_this.formData.phone,ticket:check.ticket,randStr:check.randstr}
                            _this.sendCode(data)
                            captcha.destroy();
                        });
                        captcha.show();
                    } else {
                        _this.startTiming();
                        // 发送验证码
                        const data = {phone:_this.formData.phone,ticket:'',randstr:'', recaptchaToken: window.recaptchaToken}
                        _this.sendCode(data)
                    }
                }
            })
        },
        closeForm(){
            this.$refs['loginForm'].resetFields();
            this.show =false;
        },
        changeFunc(){
            this.$refs.loginForm.validate((res)=>{
                if(!res){return false;}
                if(this.changeType == 'phone'){
                    this.$axios({
                        method:'post',
                        url:'api/user/phone/bind',
                        data:this.formData
                    }).then(res=>{
                        this.$bus.$emit('changeOk',JSON.stringify(this.formData));
                        this.$Message.success('设置成功');
                        this.getUser();
                        this.$emit('showChange', false)
                    }).catch(err=>{
                        this.$Message.error(err.response.data.errMsg);
                    })
                }else{
                    putAction('/api/user/info', this.formData).then(res=>{
                        this.$bus.$emit('changeOk',JSON.stringify(this.formData));
                        this.$Message.success('设置成功');
                        this.getUser();
                        this.showLoginSteam = false;
                        this.$emit('showChange', false)
                    }).catch(err=>{
                        this.$Message.error(err.response.data.errMsg);
                    })
                }
            })
        },
        getQueryString(name,str) {
            let arr = str.split('?');
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r =('?'+arr[1]).substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        loginSteam(){
            localStorage.setItem('steamType','1');      //0登录，1绑定
            // 移动端当前页面打开steam绑定
            if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
                window.location.href = `https://steambrige.site/out/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.return_to=${window.location.href}&openid.mode=checkid_setup`
            } else {
                window.open('/login.html','_blank','height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
            }
        },

        goHelp() {
            this.$emit('showChange', false)
            this.$router.push('/page/helpcenter')
        }
    },
    components:{
    //    Captcha
    }
}
</script>

<style scoped>
    .ivu-input-group {
        width: 30%;
    }

    .ivu-select-selected-value {
        background: #98A8B4;
        border: 0px solid #030000;
        box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
        border-radius: 3px;
    }

    .ivu-select-selection {
        background: #98A8B4;
        border: none;
    }

    .ivu-input-group-append {
        background: linear-gradient(0deg, #E59827, #EFA435);
        border: 0px solid #030000;
        box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.25);
        border-radius: 3px;
        color: #0A0A0A;
    }

    .ivu-input-number-input {
        background: #98A8B4;
        border: 0px solid #030000;
        box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1);
        border-radius: 3px;
    }

    .ivu-input-number-handler-wrap {
        display: none;
    }

    .ivu-modal-content {
        border-radius: 0;
    }

    .ivu-modal-header {
        background: linear-gradient(45deg, #313131, #010101);
        text-align: center;
        padding: .15rem;
    }

    .ivu-modal-header-inner {
        color: #FFFFFE;
    }

    .ivu-modal-body {
        background: linear-gradient(92deg, #DDDDDD, rgba(170, 178, 182, 0));
        border: 0px solid #030000;
        box-shadow: 0px 1px 50px 0px rgba(0, 0, 0, 0.9);
    }

    .ivu-input:focus {
        border: none;
    }
</style>
