<template>
    <Modal v-model="show"
           :styles="{top:'30%'}"
           width="20rem"
           footer-hide>
        <span class="error-icon" v-if="errCode"></span>
        <span class="success-icon" v-else></span>
        <p class="err-m-tit">{{Title}}</p>
        <p class="err-m-msg" v-html="errMsg"></p>
        <p class="err-m-msg err-store-buy" v-if="storeError && errCode !== 630 && errCode !== 6005">如有疑问，请联系在线客服</p>
      <p class="err-m-msg err-store-buy" v-if="storeError && errCode === 630 && errCode !== 6005">价格已更新 请刷新当前界面</p>
        <!-- 商城购买超出上限提示 -->
        <div class="store-buy-tip" v-if="errCode === 6005">
            <p class="err-m-msg">根据相关法律规定，您需向平台提供以下实名信息</p>
            <p class="err-m-msg">身份证正反面照片</p>
            <p class="err-m-msg">手持身份证正反面照片</p>
            <p class="err-m-msg">手机号码（需电话核实）</p>
            <p class="err-m-msg">充值时的支付信息</p>
            <p class="err-m-msg">请咨询在线客服 核实后获得继续购买的权限</p>
        </div>
        <p class="default-btn err-m-btn" style="width: 70%; margin: .1rem auto">
            <span v-if="errCode === 6002" @click="goPay">立即充值</span>
            <span v-else-if="errCode === 6004" @click="goMyBox">前往开箱</span>
            <span v-else-if="errCode === 5512" @click="goSecrecy">前往设置</span>
            <span v-else @click="closeResult">确定</span>
        </p>
    </Modal>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            Title: {
                type: String,
                default: ""
            },
            errMsg: {
                type: String,
                default: ''
            },
            errCode: {
                type: String,
                default: ''
            },
            storeError: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                storeQ: ""
            }
        },
        mounted() {
            this.storeQ = localStorage.getItem('storeQ');
        },
        methods: {
            goPay() {
                this.show = false;
                this.router.push('/user/assets');
            },
            goChange() {
                this.show = false;
                this.router.push('/user/account');
            },
            goSteam() {
                const user = JSON.parse(localStorage.getItem('user'))
                window.open(`https://steamcommunity.com/profiles/${user.steamId}/tradeoffers/`)
            },
            closeResult() {
                this.show = false;
            },
            goMyBox() {
                this.show = false;
                this.router.push('/case/csgo');
            },
            goSecrecy() {
                const user = JSON.parse(localStorage.getItem('neeko')).account.user
                window.open(`https://steamcommunity.com/profiles/${user.steamId}/edit/settings/`)
            }
        }
    }
</script>

