<template>
    <div>
        <div v-if="user.tradeUrl" class="bag-des">
            <!--            <div class="upgrade-csgo-dota" style="margin: auto">-->
            <!--                <div class="default-btn active" @click="getSkins(730)">CSGO</div>-->
            <!--                <div class="default-btn" @click="getSkins(570)">DOTA2</div>-->
            <!--            </div>-->
            <!--            全部出售-->
            <div class="inventory-sell">
                <p>如果饰品已发出，而没有收到余额，请等待10分钟会自动到账，如有疑问，请联系QQ管理员。</p>
            </div>

            <!--            背包筛选-->
            <div class="inventory-search">
                <div class="search-screening-m hide-ipad hide-p" style="margin-top: .2rem">
                    <Input style="width: 4rem;margin-top: 0" class="search-input search-input-box"
                           v-model="queryName"
                           icon="ios-search"
                           placeholder="输入皮肤名称搜索" @on-enter="searchFunc">
                    </Input>
                    <div class="default-btn" style="padding: 5px 15px" @click="searchFunc($event)">搜索</div>
                </div>
                <div style="display: flex">
                    <p style="margin: 0 .2rem" @click="sortDataFn"><i class="iconfont iconicon-sort"></i> 价格</p>
                    <p style="margin: 0 .2rem" @click="refresh"><i class="iconfont iconicon-refresh"></i> 刷新</p>
                    <div style="display: flex;align-items: center">
                        <div class="all-chosed" @click="selectAll">
                            <i class="iconfont iconicon-select" v-show="isAll"></i>
                        </div>
                        <span class="chose-lable hide-m" @click="selectAll">全选</span>
                    </div>
                </div>
            </div>
            <div class="bag-all-chose-m hide-ipad hide-p">
                <div style="display: flex;align-items: center">
                    <div class="all-chosed" @click="selectAll" :class="{'all-chosed-true': isAll}">
                        <i class="iconfont iconicon-select"></i>
                    </div>
                    <span class="chose-lable-m" @click="selectAll" style="font-weight: bold">全选</span>
                </div>
                <div class="default-btn sell-btn-m" @click="determine">
                 出售 $ {{totalPrice}}
                </div>
            </div>
            <!--            背包物品-->
            <div class="bag-goods-box">
                <div class="item-drop">
                    <div class="drop-del">
                        <div v-show="data.length > 0" v-for="(el, idx) in data" @click.stop="choseItem(el)"
                             class="store-item">
                            <!--                            选择框-->
                            <div class="check-position" :class="{'check-position-ture': el.selected}">
                                <i class="iconfont iconicon-select"></i>
                            </div>
                            <div :class="'drop-qua-' + conversionStyle(el.rarity,el.category)">
                                <p class="good-price">$ {{(el.reward_price/rate).toFixed(2)}}</p>
                                <div class="drop-gun-img">
                                    <img :src="el.icon_url" alt="skins" :ref="'moveEle' + idx">
                                </div>
                            </div>
                            <div class="store-goods">
                                <p> {{el.name1}} </p>
                                <p>{{el.name2 ? el.name2 : ' '}}</p>
                            </div>
                        </div>
                    </div>
                    <Empty v-show="data.length == 0" style="min-height: 4rem"></Empty>
                </div>
            </div>
            <div class="inventory-sell hide-m">
                <div>
                    <span>共 <span>{{data.length}}</span>件饰品 </span>
                    <span> 已选择 <span class="important-tips">{{armSellIds.length}}</span>件饰品 </span>
                </div>
                <div><span> 总共 <span class="important-tips">$ {{(totalPrice/rate).toFixed(2)}}</span> </span></div>
                <div @click="determine" class="default-btn pay-now" style="margin-bottom: 40px">立即出售</div>
            </div>
        </div>

        <div v-else class="unbind-steam">
            <div>
                <p><i class="iconfont iconicon-box"></i></p>
                <p>您还未绑定SteamID或交易链接,请先绑定</p>
                <div @click="goBind" class="default-btn">去绑定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from "../store";
    import {mapState} from 'vuex'
    import {getAction} from "../api/manage";
    import {MathFunc} from "../utils/utils";
    import md5 from 'js-md5'
    import Empty from "./Empty/Empty";

    const merchant_app_id = '683f5aa745794915a90858733a630389'
    const public_key = 'gAAAAABgtJgrnmwuBU5_2bjNIEXkJt-CvVXM4U5I0n2PHrlOAsGMmBhXuWrFbC6gm6DVNYyLMA2VKas02RfJRqUFh2R8Kc0FwG1g1ol6A7XciKV7QyN6Gn8JdA20u9faqPalE8LjfvlJ'
    export default {
        name: "skinPay",
        components: {Empty},
        data() {
            return {
                currPage: 1,
                single: false,
                rate: 0,
                gameType: 730,
                armSellIds: [],
                skinsData: [],
                isAll: false,
                nonTradable: 0,
                totalPrice: 0,
                queryName: '',
                data: [],
                copyData: [],
                sortType: 'down',
                notSteam: false,
                notUrl: false,
                rata: '',
                searchForm: {
                    page: 1,
                    count: 20
                },
                filterCondition: {
                    sort: false, // false 降序
                    name: ''
                },
                url: {
                    getSteam: '/api/skins/steam/inventory',
                    getLog: '/api/skins/trade/log',
                    skinPay: '/api/inventory/skin_pay',
                    rate: '/api/skins/rate'
                }
            }
        },
        mounted() {
            console.log(this.data)
            this.getExchangeRate()
            this.getSkins(this.gameType)
        },
        computed: {
            ...mapState('account', {
                user: state => state.user,
                lastSkinsRechargeLogId: state => state.lastSkinsRechargeLogId
            })
        },
        methods: {
            goBind() {
                this.$router.push('/user/account')
            },
            async getExchangeRate() {
                let rate = await getAction(this.url.rate)
                this.rate = rate.data
            },
            refresh() {
                this.getSkins(this.gameType)
            },
            sortDataFn() {
                console.log(this.data)
                this.sortType = this.sortType === 'up' ? 'down' : 'up';
                this.data = this.sortData(this.data);
            },
            sortData(data) {
                const compare = function (property, sortType) {
                    return function (a, b) {
                        const value1 = a[property];
                        const value2 = b[property];
                        return sortType === 'up' ? (value1 - value2) : (value2 - value1);
                    }
                }
                return data.sort(compare('show_price', this.sortType))
            },
            searchFunc() {
                let data = Object.assign(this.data);
                let selectedItem = [];
                if (this.queryName.length === 0) return this.data = this.copyData
                if (data.length === 0) return false;
                const res = data.filter(item => item.name.indexOf(this.queryName) !== -1);
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i++) {
                        for (let j = 0; j < this.armSellIds.length; j++) {
                            if (res[i].assetid === this.armSellIds[j].assetid) {
                                res[i].selected = true;
                                selectedItem.push(this.armSellIds[j]);
                            }
                        }
                    }
                    this.data = this.sortData(res);
                } else {
                    this.data = [];
                }
                this.armSellIds = selectedItem;
                let price = 0;
                this.armSellIds.forEach(item => {
                    price = MathFunc.Add(price, item.reward_price, 2);
                })
                this.totalPrice = price;
                if (this.armSellIds.length > 0 && this.armSellIds.length === this.data.length) {
                    this.checkAll = true;
                }
            },
            jumpPageFunc(page) {
                console.log(page)
            },
            async getSkins(game) {
                // this.$Spin.show()
                this.filterCondition = {
                    sort: false,
                    name: ''
                }
                this.data = []
                this.notUrl = false
                this.notSteam = false
                const data = {
                    merchant_app_id,
                    public_key,
                    track_link: this.user.tradeUrl,
                }
                if (!this.user.tradeUrl) {
                    this.notUrl = true
                    this.$Spin.hide()
                    return
                }
                this.$axios({
                    method: 'get',
                    url: `inventory/get_steam_inventory/${game}`,
                    params: data,
                    baseURL: process.env.VUE_APP_THIRD_SKIN,
                    transformRequest: [function (data, headers) {
                        delete headers.token
                        return data
                    }],
                }).then(res => {
                    console.log(res.datas)
                    this.$Spin.hide()
                    const emptyArr = []
                    res.datas.forEach(item => {
                        if (!item.reward_price) {
                            this.nonTradable++;
                        }
                        const nameArr = item.name.split('|');
                        item.name1 = nameArr[0];
                        item.name2 = nameArr[1];
                        item.selected = false;
                        emptyArr.push(item)
                    })
                    console.log('emptyArr',emptyArr)
                    let arr = emptyArr.filter(item => item.reward_price >= 0.07)
                    console.log('arr',arr[0])
                    this.data = arr
                    console.log('good',this.data[0])
                    this.copyData = Object.assign(this.data)
                    console.log('goods',this.data[0])
                    this.getTradeLog()
                }).catch(e => {
                    this.isLoading = false
                })
            },
            async getTradeLog() {
                if (this.lastSkinsRechargeLogId) {
                    const data = {
                        merchant_app_id,
                        public_key,
                        log_id: this.lastSkinsRechargeLogId,
                    }
                    const res = await this.$axios({
                        method: 'get',
                        url: '/inventory/get_trade_log',
                        params: {
                            merchant_app_id,
                            public_key,
                            log_id: this.lastSkinsRechargeLogId
                        },
                        baseURL: process.env.VUE_APP_THIRD_SKIN,
                        transformRequest: [function (data, headers) {
                            delete headers.token
                            return data
                        }],
                    })
                    if (res.status) {
                        if (res.log.step === 1 || res.log.step === 2) {
                            this.timer = setTimeout(() => {
                                if (res.log.step === 1) {
                                    this.$axios({
                                        method: 'get',
                                        url: '/inventory/get_trade_log',
                                        params: data,
                                        baseURL: process.env.VUE_APP_THIRD_SKIN,
                                        transformRequest: [function (data, headers) {
                                            delete headers.token
                                            return data
                                        }]
                                    }).then(res_ref => {
                                        if (res_ref.status) {
                                            this.$Modale('交易已发出', `<p>机器人SteamID:${res_ref.log.bots_steam_uid}</p>,  <p>机器人注册时间:${res_ref.log.bot_register_time}</p>,  <p>验证码:${res_ref.log.verify_code}</p>,
                                            请前往steam接受报价`, 3)
                                        } else {
                                            this.$Message.error(res_ref.message)
                                        }
                                    }).catch(() => {
                                        this.$Message.error('server error')
                                    })
                                } else {
                                    clearTimeout(this.timer)
                                }
                            }, 5000)
                        } else {
                            this.$Message.error(res.log.message)
                            this.$store.commit('account/setLastSkinsRechargeLogId', null)
                        }
                    }
                }
            },
            choseItem(el) {
                console.log(el)
                if (!el.selected) {
                    let obj = {
                        "id": el.app_id + el.steam_pid,
                        "appid": el.app_id,
                        "assetid": el.steam_pid,
                        "price": el.reward_price,
                        "name": el.name,
                        steam_pid: el.steam_pid,
                        app_id: el.app_id
                    }
                    let isSame = false;
                    this.armSellIds.forEach(item => {
                        if (item.id === obj.id) {
                            isSame = true;
                        }
                    })
                    if (!isSame) {
                        this.armSellIds.push(obj);
                    }
                    if (this.armSellIds.length === this.data.length) this.isAll = true
                } else {
                    let idx = '';
                    let id = el.app_id + el.steam_pid;
                    for (let i = 0; i < this.armSellIds.length; i++) {
                        if (this.armSellIds[i].id === id) {
                            idx = i;
                            break
                        }
                    }
                    this.armSellIds.splice(idx, 1);
                    this.isAll = false;
                }
                el.selected = !el.selected
                if (this.armSellIds.length > 0) {
                    let res = 0
                    for (let i = 0; i < this.armSellIds.length; i++) {
                        res = MathFunc.Add(res, this.armSellIds[i].price, 2);
                    }
                    this.totalPrice = res;
                } else {
                    this.totalPrice = 0;
                }
                console.log(this.data)
            },
            selectAll() {
                this.armSellIds = [];
                this.isAll = !this.isAll
                if (this.isAll) {
                    this.totalPrice = 0;
                    this.data.map((item) => {
                        this.totalPrice = MathFunc.Add(this.totalPrice, item.reward_price, 2);
                        let obj = {
                            "id": item.app_id + item.steam_pid,
                            "appid": item.app_id,
                            "assetid": item.steam_pid,
                            "price": item.reward_price,
                            "name": item.name,
                            steam_pid: item.steam_pid,
                            app_id: item.app_id
                        }
                        this.armSellIds.push(obj);
                        item.selected = true;
                    })
                } else {
                    this.data.map((item) => {
                        item.selected = false;
                    })
                    this.totalPrice = 0;
                }
            },
            // 立即出售
            determine() {
                if (this.lastSkinsRechargeLogId) {
                    this.$axios({
                        method: 'get',
                        url: '/inventory/get_trade_log',
                        params: {
                            merchant_app_id,
                            public_key,
                            log_id: this.lastSkinsRechargeLogId
                        },
                        baseURL: process.env.VUE_APP_THIRD_SKIN,
                        transformRequest: [function (data, headers) {
                            delete headers.token
                            return data
                        }],
                    }).then(res => {
                        if (res.data.status) {
                            if (res.data.log.step === 1 || res.data.log.step === 2) {
                                this.$Modale('交易已发出', `<p>机器人SteamID:${res.log.bots_steam_uid}</p>,  <p>机器人注册时间:${res.log.bot_register_time}</p>,  <p>验证码:${res.log.verify_code}</p>,
                                            请前往steam接受报价`, 3)
                                return false
                            } else {
                                this.$store.commit('account/setLastSkinsRechargeLogId', null)
                            }
                        } else if (res.data.log.step === 4) {
                            this.$Message.error(res.message)
                        }
                    })
                        .catch(() => {
                            this.$Message.info('网络异常')
                        })
                }
                // 未选择商品
                if (this.armSellIds.length === 0) {
                    this.$Message.info('未选择任何商品')
                    return false;
                }
                let userId = this.user.id,
                    cnyString = `${this.totalPrice}`,
                    skin = JSON.stringify(this.armSellIds),
                    secret = '这是一个密码',
                    str = `${userId}${cnyString}${skin}${secret}`,
                    hashStr = md5(str)
                const parmas = {
                    cny: this.totalPrice,
                    skins: skin,
                    hash: hashStr,
                }
                // 出售接口
                this.$axios({
                    method: 'post',
                    url: '/api/skins/skin/pay',
                    data: parmas
                }).then(res => {
                    const order_number = res.data
                    let skinPayData = {
                        merchant_app_id,
                        public_key,
                        order_number,
                        recharge_total: Number(this.totalPrice),
                        skin_list: JSON.stringify(this.armSellIds),
                        track_link: this.user.tradeUrl
                    }
                    this.$Spin.show()
                    this.$axios({
                        method: 'post',
                        url: '/inventory/skin_pay',
                        data: skinPayData,
                        baseURL: process.env.VUE_APP_THIRD_SKIN,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: [function (data, headers) {
                            delete headers.locales
                            delete headers.token
                            let ret = ''
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                    }).then(res => {
                        if (res.status) {
                            this.$Spin.hide()
                            this.totalPrice = 0
                            this.armSellIds = []
                            this.$Message.success('出售成功')
                            this.$store.commit('account/setLastSkinsRechargeLogId', res.log_id)
                            this.$Spin.hide()
                            this.getSkins(this.gameType)
                        } else {
                            this.$Spin.hide()
                            this.$Message.error(res.message)
                        }
                    }).catch(() => {
                        this.$Message.info('网络异常')
                    })
                }).catch(err => {
                    const error = err.response.data.errMsg || '网络异常'
                })
            }
        }
    }
</script>

<style scoped>
    /deep/ .ivu-input-group-append, .ivu-input-group-prepend {
        border: none;
        color: #0A0A0A;
    }
</style>
