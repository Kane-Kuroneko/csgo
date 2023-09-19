<template>
    <hash-module v-model="show" :title="title" width="7">
        <div class="i-color" style="width: auto"><i class="iconfont icon-a-icon-nodate2" v-if="balance == 0"></i></div>
        <p class="modal-content" v-html="context"></p>
        <div class="default-btn modal-btn creat-btn" @click="show = false" v-if="balance == 0">
            确定
        </div>
        <div class="default-btn modal-btn creat-btn" @click="goPay" v-else-if="balance == 1">
            前往充值
        </div>
        <div class="default-btn modal-btn creat-btn" @click="goStem" v-else-if="balance == 3">
            前往Steam
        </div>
        <div class="default-btn modal-btn creat-btn" @click="goUsrAccount" v-else>
            前往绑定
        </div>
    </hash-module>
</template>

<script>
    import router from '../../router/index'
    import HashModule from "../HashModule/HashModule";

    export default {
        name: "modal",
        components: {HashModule},
        props: {
            show: {
                type: Boolean
            },
            title: {
                type: String
            },
            context: {
                type: String
            },
            balance: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                router
            }
        },
        methods: {
            goPay() {
                this.show = false;
                this.router.push('/user/assets');
            },
            goStem() {
                this.show = false
                window.open('https://steamcommunity.com/')
            },
            goUsrAccount() {
                this.show = false
                this.router.push('/user/account')
            }
        },
        beforeDestroy() {
            this.balance = true
        }
    }
</script>

<style>
    .ivu-modal-header {
        background: #0A0A0A;
    }
    .i-color{
        text-align: center;
    }
    .i-color i{
        font-size: .7rem;
        color: #FCC601 ;
    }
</style>
