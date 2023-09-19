<template>
    <hash-module v-model="show" width="7"
                 title="参与活动">
        <div style="padding: .5rem .2rem 0 .2rem;">
            <Input v-model="pwd" placeholder="输入房间密码参与活动" size="large" class="joinPwd"/>
            <div class="default-btn psw-btn" @click="enter({password:pwd})">立即参与</div>
        </div>
    </hash-module>
</template>
<script>
    import HashModule from "../HashModule/HashModule";

    export default {
        components: {HashModule},
        props: {
            enter: Object,
            show: Boolean,
        },
        data() {
            return {
                pwd: ''
            }
        },
        mounted() {
        },
        methods: {
            close() {
                this.show = false;
            },
        },
        watch: {
            show() {
                this.pwd = ''
            }
        }
    }
</script>

<style scoped>
    .ivu-switch {
        border: 0px solid #030000;
        height: .24rem;
        width: .6rem;
    }

    .psw-btn {
        width: 40%;
        margin: .6rem auto .4rem;
        -webkit-clip-path: polygon(4% 0, 100% 0, 100% 61%, 95% 100%, 0 100%, 0 44%);
        clip-path: polygon(4% 0, 100% 0, 100% 61%, 95% 100%, 0 100%, 0 44%);
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
        background: #98A8B4;
        border: 0px solid #030000;
        box-shadow: 0px 2px 8px 0px rgba(11, 11, 11, 0.1) inset;
        border-radius: 3px;
    }

    /deep/ .ivu-input[disabled] {
        color: #FFFFFE;
    }

</style>
