<template>
    <div class="open-box-immeility">
        <div class="animation-bg layout mar-auto">
            <div class="home-title title-bg">
                <div>
                    <img src="../assets/image/titleLine.png" alt="">
                </div>
                <span> {{box.name}} </span>
                <div class="rotate-img">
                    <img src="../assets/image/titleLine.png" alt="">
                </div>
            </div>
            <div class="welfare-pro">
            </div>
            <template v-if="isOpen">
                <div class="welf-open">
                    <div align="center" class="box-img">
                        <img :src='imgHost(box.background)' style="width: 40%">
                        <img :src="imgHost(box.image)" style="width: 40%" alt="">
                    </div>
                    <div class="box-price">
                        <div class="default-btn" @click="openBox">
                            <div class="open-right-now">立即开箱</div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div>
                    <div class="prize-pool" :class="{'prize-pool-m': isMobile}">
                        <div v-for="(lottery,index) in openBoxData" :key="`lottery-${index}`">
                            <div class="pool-shadow" ref="pool">
                                <ul :style="lottery.style">
                                    <li v-for="(prize,index1) in lottery.prizePool" :key="index1"
                                        :class="'qua-box-' + conversionStyle(prize.rarity)"
                                        :id="`item-${index}-${index1}`"
                                        :ref="`item-${index}-${index1}`">
                                        <img :src="prize.image" alt="" style="width: 100%">
                                        <div class="open-name-item"
                                             :class="'wepeon-qua-' + conversionStyle(prize.rarity)">
                                            <p>{{prize.name1}}</p>
                                            <p>{{prize.name2}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="index === freeBoxIndex  && !isHsahBox" class="free-box-tag">
                                <img src="../assets/image/free.png" alt="">
                            </div>
                            <div class="the-pointer"></div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="skins-container ">
            <div class="home-title">
                <div>
                    <div class="rotate-img">
                        <img src="../assets/image/Welfare/titleLine.png" alt="">
                    </div>
                </div>
                <span> 箱内饰品 </span>
                <img src="../assets/image/Welfare/titleLine.png" alt="">
            </div>
            <div class="skins-detaile layout">
                <div v-for="el in artical.stuffVOList" :key="el.id" :class="'border-top-' + el.random">
                    <div class="skins-img" :class="'drop-qua-' + el.random" align="center">
                        <div>
                            <p>${{el.price}}</p>
                            <p>{{el.probability}}%</p>
                        </div>
                        <img :src="imgHost(el.image)" alt="">
                    </div>
                    <div class="skins-name">
                        <p>{{el.name1}}</p>
                        <p>{{el.name2}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 通知弹窗 -->
        <div class="modal-bg-box special" :class="{'show':show, 'special-m' : isMobile}">
            <div class="modal-box-bg-box" :class="{'show':show,'modal-box-bg-box-m':isMobile}">
                <div class="modal-box-box" :class="{'modal-box-box-m':isMobile}">
                    <i class="iconfont iconicon-close" @click="sellAllOrInstorage('storage')"
                       :class="{'length-one': resultData.prizes.length === 1 }"
                    >关闭</i>
                    <div class="box-result-shell" :class="{'box-result-shell-m' : isMobile}">
                        <div class="box-result" @click="choseGoods(el)"
                             :class="{'box-result-m' : isMobile}"
                             v-for="(el,idx) in resultData.prizes"
                             :key="idx">
                            <div align="center">
                                <img :src="el.stuffImage" style="width: 60%;" alt="">
                            </div>
                            <div class="sell-name" :class="{'special-prize': box.discountPrice.toFixed(2) < el.price}">
                                <p><i class="iconfont iconicon-bg"
                                      :class="'drop-gun-' + conversionStyle(el.skinsRarity)"></i>{{el.stuffName.split('|')[0]}}
                                </p>
                                <p>{{el.stuffName.split('|')[1] ? el.stuffName.split('|')[1] : ''}}</p>
                            </div>
                            <p v-if="resultData.length === 1">$ {{el.price.toFixed(2)}}</p>
                            <div v-else class="sell-single-skin">
                                <p :class="{'text-align' : isFree}">$ {{el.price.toFixed(2)}}</p>
                                <div class="bag-chosed" v-if="!isFree" :class="{'check-position-ture': el.chosed}">
                                    <i class="iconfont iconicon-select"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="btn-box" :class="{'btn-box-m': isMobile}" v-if="!isFree">
                        <div>
                            <div class="default-btn into-btn" @click="sellAllOrInstorage('storage')">全部放入仓库</div>
                            <div class="default-btn all-btn" @click="sellAllOrInstorage('all')">全部出售
                                ${{totalPrice.toFixed(2)}}
                            </div>
                        </div>
                    </div>
                    <div class="btn-box-free" v-else>
                        <div>
                            <div class="default-btn all-btn" style="width: max-content" @click="show = false">确定</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <audio preload="auto" src="../assets/audio/slice3.wav" ref="scrollWav2"/>
        <audio preload="auto" src="../assets/audio/open.wav" ref="openBox"/>
        <audio preload="auto" src="../assets/audio/prize.mp3" ref="audioPrize"/>
        <audio preload="auto" src="../assets/audio/prizeB.mp3" ref="audioPrizeB"/>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import {getAction, postAction} from "../api/manage";

    const prizePoolCount = 80
    const minIndex = 50
    const maxIndex = 60
    const slice3 = require("../assets/audio/slice3.wav")
    export default {
        name: 'openBox',
        props: {
            boxId: String,
            openBoxRatio: {
                type: Number
            }
        },
        data() {
            return {
                isOpen: true,
                closeVoice:false,
                isFree: false,
                openBoxData: [],
                artical: [],
                resultData: {
                    no: '',
                    prizes: []
                },
                openLoading: false,
                hasOpen: 0,
                saleNums: 0,
                lastBoxCount: 0,
                totalPrice: 0,
                show: false,
                count: 7, // 倒计时
                box: {},
                isMobile: false,
                freeBoxIndex: null,
                isHsahBox: true,
                openRatio: 0, // 开箱次数
                url: {
                    open: '/api/task/open',
                    result: '/api/home/box/result',
                    detail: '/api/task/details',
                    free: '/api/home/box/free/count',
                    sale: '/api/boxGame/opertion', // 出售物品
                    info: '/api/home/skin/info',
                }
            }
        },
        computed: {
            ...mapState('account', ['activityRechargeAmount']),
            ...mapState('account', {
                user: state => state.user,
            })
        },
        watch: {
            show(nv, ov) {
                if (!nv) {
                    this.isOpen = true
                }
            }
        },
        mounted() {
            this.getBoxStuff()
            this.box = JSON.parse(localStorage.getItem('box'));
        },
        methods: {
            ...mapActions('account', ['getUser']),
            async getBoxStuff() {
                this.$Spin.show();
                let params = {'boxId': this.boxId}
                try {
                    let res = await getAction(this.url.detail, params)
                    this.artical = res.data
                    this.artical.stuffVOList = this.handleData(res.data.stuffVOList)
                    console.log(this.artical)
                    this.$Spin.hide();
                } catch (e) {
                    this.$Spin.hide();
                }
            },
            handleData(data) {
                data.map((item) => {
                    let name = item.name.split('|');
                    item.name1 = name[0];
                    item.name2 = name.splice(1, name.length).join('｜');
                    item.random = this.conversionStyle(item.rarity);
                });
                return data;
            },
            openBox() {
                this.openLoading = true
                this.$emit('boxstatus', this.openLoading)
                this.isFree = false
                this.checkOpen().then(async () => {
                    this.resultData = {
                        no: '',
                        prizes: []
                    }
                    this.openBoxData = await this.initOpen(1)
                    this.isOpen = false
                    if (this.$parent.closeVoice) this.$refs.openBox.play()
                    await this.$nextTick()
                    await setTimeout(() => {
                        this.openBoxData.forEach((openBox, index) => {
                            openBox.prizeIndex = this.randomStyle(openBox.style)
                            let minArtical = this.$parent.artical[0]
                            this.$parent.artical.forEach(it => {
                                if (minArtical.price > it.price) minArtical = it
                            })
                            this.$refs[`item-${index}-${openBox.prizeIndex}`][0].childNodes[0].setAttribute('src', minArtical.image);
                            this.$refs[`item-${index}-${openBox.prizeIndex}`][0].setAttribute('class', `qua-box-${this.conversionStyle(minArtical.rarity)} w`);
                            this.$refs[`item-${index}-${openBox.prizeIndex}`][0].childNodes[1].setAttribute('class', `wepeon-qua-${this.conversionStyle(minArtical.rarity)}  open-name-item `);
                            this.$refs[`item-${index}-${openBox.prizeIndex}`][0].childNodes[1].childNodes[0].innerText = minArtical.name1;
                            this.$refs[`item-${index}-${openBox.prizeIndex}`][0].childNodes[1].childNodes[1].innerText = minArtical.name2 ? minArtical.name2 : '';
                        })
                    }, 100)
                    await setTimeout(() => {
                        this.getOpenResult().then(res => {
                            this.setPrize(res)
                        }).catch((e) => {
                            if (awaitResult !== null) clearTimeout(awaitResult)
                            setTimeout(() => {
                                this.$result('网络超时', {
                                    errMsg: "开箱超时,请稍后前往背包查看",
                                    errCode: 1,
                                    storeError: 0
                                });  // 请求开箱结果没有成(用户网络问题)
                                this.isOpen = true
                                this.openLoading = false
                                this.$emit('boxstatus', this.openLoading)
                                this.$parent.getUser();
                                if (localStorage.getItem('token')) this.$parent.getBoxCount()
                                this.$Message.error(e.msg)
                            }, 1000)
                        })
                    }, 100)
                    if (this.$parent.closeVoice) this.music()
                    let awaitResult = null
                    let maxOpenTime = 0
                    this.openBoxData.forEach(item => {
                        if (item.openTime > maxOpenTime) {
                            maxOpenTime = item.openTime
                        }
                    })
                    awaitResult = setTimeout(async () => {
                        await this.handleResult(false)
                    }, maxOpenTime * 1000 + 1000)
                }).catch(e => {
                    if (e.type === 1) this.$Message.info(e.msg)
                    else if (e.type === 2) this.$login();
                    else if (e.type === 3) this.$Modale('余额不足', '<p>立即充值</p>', 1);
                    this.openLoading = false
                    this.$emit('boxstatus', this.openLoading)
                })
            },
            checkOpen() {
                return new Promise((resolve, reject) => {
                    if (this.artical.stuffVOList.length === 0) reject({msg: '空箱,勿点', type: 1})
                    if (!localStorage.getItem('token')) reject({msg: '未登录', type: 2})
                    resolve()
                })
            },
            sellAllOrInstorage(type) {
                if (this.isFree) return this.show = false
                let params
                let id = []
                let msg = false
                if (type === "storage") {
                    params = {ids: [], no: this.resultData.no}
                } else {
                    this.resultData.prizes.forEach(el => {
                        if (el.chosed) {
                            id.push(el.id)
                        }
                    })
                    msg = true
                    params = {ids: id, no: this.resultData.no}
                }
                postAction(this.url.sale, params).then(res => {
                    if (msg) this.$Message.success('出售成功')
                    if (type === 'all' && this.$parent.closeVoice) {
                        this.$refs.audioPrize.play()
                    }
                    this.show = false
                    this.getUser()
                }).catch(e => {
                    this.$Message.error(e.response.data.errMsg)
                })
            },
            initOpen(count) {
                return new Promise(resolve => {
                    const openBoxData = []
                    while (openBoxData.length < count) {
                        let time = parseFloat((Math.random() * (9 - 8) + 8).toFixed(2))
                        const opeItem = {
                            prizePool: [],  //奖池
                            prize: null,
                            style: {
                                transform: 'translateX(0)',
                                transition: `transform ${time}s cubic-bezier(.54,.91,.63,.99) 0s`,
                                willChange: 'transform'
                            },
                            prizeIndex: null,
                            openTime: time
                        }
                        opeItem.prizePool.push(...this.artical.stuffVOList)
                        for (let supplement = 0; supplement < prizePoolCount - this.artical.stuffVOList.length; supplement++) { //补充奖池
                            opeItem.prizePool.push(this.artical.stuffVOList[supplement % this.artical.stuffVOList.length])  //直接前面取物品补充使得奖池看上去好东西很多
                        }
                        opeItem.prizePool.sort(() => 0.5 - Math.random())
                        openBoxData.push(opeItem)
                    }
                    resolve(openBoxData)
                })
            },
            choseGoods(el) {
                let value = 0
                el.chosed = !el.chosed
                this.resultData.prizes.forEach(item => {
                    if (item.chosed) {
                        value += item.salePrice
                    }
                })
                this.totalPrice = +value
            },
            // 开箱订单
            getOpenResult() {
                return new Promise((resolve, reject) => {
                    let params = {
                        boxId: this.$parent.box.id,
                        count: this.$parent.openBoxRatio,
                        isTest: false,
                        type: this.$parent.box.boxType === 0 ? 0 : 1,
                        ck: localStorage.getItem('userSeed')
                    }
                    postAction(this.url.open, params, 6000).then(res => {
                        this.getUser()
                        this.resultData = res.data
                        this.resultData.prizes.forEach(el => {
                            el.random = this.conversionStyle(el.skinsRarity,el.category)
                            el.chosed = true
                        })
                        let value = 0
                        this.resultData.prizes.forEach(el => {
                            value += el.salePrice
                        })
                        this.totalPrice = value
                        resolve(res.data.prizes)
                    }).catch(e => {
                        reject(e)
                    })
                })
            },
            setPrize(prizes) {
                this.openBoxData.forEach((item, index) => {
                    if (prizes[index] !== null && prizes[index] !== undefined) {
                        this.$refs[`item-${index}-${item.prizeIndex}`][0].childNodes[0].setAttribute('src', prizes[index].stuffImage);
                        this.$refs[`item-${index}-${item.prizeIndex}`][0].setAttribute('class', `qua-box-${this.conversionStyle(prizes[index].skinsRarity,prizes[index].category)} w`);
                        this.$refs[`item-${index}-${item.prizeIndex}`][0].childNodes[1].setAttribute('class', `wepeon-qua-${this.conversionStyle(prizes[index].skinsRarity,prizes[index].category)}  open-name-item `);
                        this.$refs[`item-${index}-${item.prizeIndex}`][0].childNodes[1].childNodes[0].innerText = prizes[index].stuffName.split('|')[0];
                        this.$refs[`item-${index}-${item.prizeIndex}`][0].childNodes[1].childNodes[1].innerText = prizes[index].stuffName.split('|')[1] ? prizes[index].stuffName.split('|')[1] : '';
                        item.prize = prizes[index];
                    }
                })
            },
            handleResult(isFree) {
                this.openLoading = false
                this.$emit('boxstatus', this.openLoading)
                if (this.resultData.length !== 0) {
                    this.show = true
                    // 五分钟之后关闭窗口自动入库
                    let time = setInterval(() => {
                        this.count = --this.count
                        if (this.count < -1) {
                            clearInterval(time)
                            this.count = 7
                        }
                    }, 1000)
                    setTimeout(() => {
                        this.show = false
                    }, 7 * 1000)
                }
                for (const key in this.openBoxData) {
                    if (this.openBoxData[key].prize.price > this.$parent.box.price) {
                        if (this.$parent.closeVoice) this.$refs.audioPrizeB.play()
                        break
                    }
                }
            },
            music() {
                let lastTime = 0
                let maxOpenTimeIndex = 0
                let maxOpenTime = 0
                this.openBoxData.forEach((item, index) => {
                    if (item.openTime > maxOpenTime) {
                        maxOpenTime = item.openTime
                        maxOpenTimeIndex = index
                    }
                })
                let spark = setInterval(() => {
                        try {
                            let val = parseInt(this.$refs.pool[maxOpenTimeIndex].scrollWidth / 170)
                            if (val !== lastTime) {
                                lastTime = val
                                let audio = new Audio()
                                audio.src = slice3
                                audio.play();
                            }
                        } catch (e) {
                            clearInterval(spark)
                        }
                    }
                )
                setTimeout(() => {
                    clearInterval(spark)
                }, maxOpenTime * 1000)
            },
            equipment() {
                if (navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i)
                ) {
                    this.isMobile = true
                }
            },
            randomStyle(style) {
                let itemWidth = this.$refs['item-0-0'][0].clientWidth;
                let contentWidth = this.$refs.pool[0].offsetWidth / 2;
                let index = Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex;
                let distance = -(itemWidth * index);
                let marginWidth = index * 4;
                // let maxPosition = itemWidth * 0.1
                // let minPostion = itemWidth * 0.9
                // let randomPositopm = Math.floor(Math.random() * (maxPosition - minPostion)) + minPostion
                let totaleDistance = distance + contentWidth - marginWidth - (itemWidth / 2)
                style.transform = `translateX(${totaleDistance}px) translateZ(0)`;
                return index
            },
        }
    }
</script>
