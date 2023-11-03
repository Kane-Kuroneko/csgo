<template>
    <div class="help-center">
        <div class="layout mar-auto" style="overflow: hidden">
            <Title name="帮助中心"></Title>
            <div class="center-box hide-m">
                <div class="help-center-left">
                    <ul>
                        <li @click="choseActive(el)" v-for="el in title" :key="el.key"
                            :class="{'active':  el.key == key}">{{ el.title }}
                        </li>
                    </ul>
                </div>
                <div class="help-center-right">
                    <!--                    <h3>{{item.title}}</h3>-->
                    <div v-html="content"></div>
                </div>
            </div>
            <div class="center-box-m hide-ipad hide-p">
                <div class="help-center-m" :class="{'active': show}">
                    <ul>
                        <li @click="choseActive(el)" v-for="el in title" :key="el.key"
                            :class="{'active':  el.key == key}"><span>·  {{ el.title }}</span>
                            <Icon type="ios-arrow-forward"/>
                        </li>
                    </ul>
                </div>
                <div class="help-center-right-m" :class="{'active': show}">
                    <div>
                        <h3>{{ item.title }}</h3>
                        <span @click="backTitle">帮助中心 ></span>
                    </div>
                    <div v-html="content"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getAction} from "../api/manage";
    import Title from "../components/Title";

    export default {
        name: 'help-center',
        components: {Title},
        data() {
            return {
                url: {
                    title: '/api/main/help/title',
                    content: '/api/main/help/content'
                },
                title: '',
                content: '',
                item: [],
                show: false,
                key: '',
            }
        },
        watch: {
            '$route'() {
                this.getTitle()
                this.key = this.$route.params.key
                debugger
                if(this.key=='服务协议'||this.key=='隐私条款'){
                    this.show = true
                    this.item.title = this.key
                    //this.key = el.key
                }
                document.documentElement.scrollTop=0
                this.getContent(this.key)
            }
        },
        created() {
            this.getTitle()
        },
        methods: {
            getTitle() {
                getAction(this.url.title).then(res => {
                    if (this.hostHandle()) {
                        this.title = res.data.filter(item => item.key !== 'aboutus1' && item.key !== 'Contactus1' && item.key !== 'Privacypolicy1')
                    } else {
                        this.title = res.data.filter(item => item.key !== 'aboutus' && item.key !== 'Contactus' && item.key !== 'Privacypolicy')
                    }
                    this.key = this.$route.params.key === 'activity' ? this.title[0].key : this.$route.params.key
                    this.getContent(this.key)
                })
            },
            choseActive(el) {
                this.$router.push(`/page/helpcenter/${el.key}`)
                this.show = true
                this.item = el
                this.key = el.key
            },
            backTitle() {
                this.show = false
                this.content = {}
            },
            getContent(key) {
                // if (key === 'activity') return
                let params = {key: key}
                getAction(this.url.content, params).then(res => {
                    this.content = res.data
                })
            }
        }
    }
</script>
