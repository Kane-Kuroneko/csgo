<template>
    <div class="bg">
        <div class="center">
            <div
                    class="info"
                    v-for="(item, index) in list"
                    :key="index"
                    :id="'maodian' + index"
            >
                <div class="title-img" v-show="item.data.length > 0">
                    <img :src="item.titleImg" alt=""/>
                </div>
                <div class="title-tip" v-show="item.data.length > 0">
                    <div class="hide-m"></div>
                    <div>
                        {{ item.titleTip }}
                    </div>
                    <div class="hide-m"></div>
                </div>
                <div class="day-center">
                    <div v-for="(ite, indexs) in item.data"
                         :key="indexs"
                         @click="goOpen(ite)"
                         :style="{background: 'url(' + ite.radomImg + ') no-repeat',backgroundSize: '100% 100%',}">
                        <div class="background">
                            <img v-lazy="imgHost(ite.background)" alt="">
                            <img v-lazy="imgHost(ite.image)">
                        </div>
                        <div class="right">
                            <div>{{ ite.name }}</div>
                            <!-- 动态绑定value -->
                            <div class="right-middle">
                                <div class="right-middle-left">
                                    <div>开启条件</div>
                                    <div>{{ taskType(ite.taskName) }}：{{ ite.codeMap }}</div>
                                    <div v-if="Math.floor((ite.amount / ite.codeMap) * 100)< 100">
                                        您{{ taskType(ite.taskName) }}：{{ ite.amount }}
                                    </div>
                                    <div v-else
                                         style="color:#2AFC01;border: 1px solid #2AFC01;text-align: center;width: 70%">
                                        点击开启
                                    </div>
                                </div>
                                <img src="../assets/image/Welfare/flag.png" alt="" v-if="ite.flag"/>
                            </div>
                            <div class="progress-div">
                                <div class="unfinished">
                                    <div :style="{ width: (Math.floor((ite.amount / ite.codeMap) * 100)) + '%',
                                          background: (Math.floor((ite.amount / ite.codeMap) * 100) ) >= 100 ? 'rgba(42, 252, 1, 1)' : '#fff', }"></div>
                                    <div :style="{ width:'calc(' + (100% -( Math.floor((ite.amount / ite.codeMap) * 100) + '%')) +')',}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 左侧图片 -->
        <img src="../assets/image/Welfare/left.png" alt="" class="left-position hide-m"/>
        <!-- 固定icon -->
        <div class="right-position hide-m">
            <a @click.prevent="Md('maodian0')" v-show="list[0].data.length > 0">
                <img src="../assets/image/Welfare/day-icon.png" alt=""/>
            </a>
            <a @click.prevent="Md('maodian1')" v-show="list[1].data.length > 0">
                <img src="../assets/image/Welfare/week-icon.png" alt=""/>
            </a>
            <a @click.prevent="Md('maodian2')" v-show="list[2].data.length > 0">
                <img src="../assets/image/Welfare/month-icon.png" alt=""/>
            </a>
        </div>
    </div>
</template>
<script>
    import {getAction} from "../api/manage";

    export default {
        name: "Welfare",

        data() {
            return {
                list: [
                    {
                        titleImg: require("../assets/image/Welfare/day.png"),
                        titleTip:
                            "当日00:00至次日00:00期间数据满足开箱条件时开启，每日00:00重置",
                        data: [],
                    },
                    {
                        titleImg: require("../assets/image/Welfare/week.png"),
                        titleTip:
                            "周一00:00至次周周一00:00期间数据满足开箱条件时开启，每周一00:00重置",

                        data: [],
                    },
                    {
                        titleImg: require("../assets/image/Welfare/month.png"),
                        titleTip:
                            "当月1日00:00至次月1日00:00期间数据满足开箱条件时开启，每月1日00:00重置",

                        data: [],
                    },
                ],
                bgList: [{}],
            };
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                getAction("/api/task/query/progress").then((res) => {
                    for (let key in res.data) {
                        if (res.data[key]) {
                            switch (key) {
                                case "day":
                                    this.list[0].data = res.data.day;
                                    break;
                                case "week":
                                    this.list[1].data = res.data.week;
                                    break;
                                case "month":
                                    this.list[2].data = res.data.month;
                                    break;
                            }
                        }
                    }
                    for (let i = 0; i < this.list.length; i++) {
                        for (let k = 0; k < this.list[i].data.length; k++) {
                            let radom = Math.floor(Math.random() * 6 + 1);
                            this.list[i].data[k].radomImg = require(`../assets/image/Welfare/bg${radom}.png`);
                        }
                    }
                });
            },
            // 锚点
            goOpen(id) {
                const audio = document.getElementById('goBoxAudio')
                if (audio) audio.play();
                id.boxType += 2
                id.discountPrice = 0
                localStorage.setItem('box', JSON.stringify(id));
                this.$router.push('/steer/case');
            },
            Md(e) {
                const anchorElement = document.getElementById(e);
                // 如果对应id的锚点存在，就跳转到锚点
                if (anchorElement) {
                    anchorElement.scrollIntoView();
                }
            },
        },
    };
</script>
<style lang='less' scoped>


    .bg {
        background: url("../assets/image/Welfare/bg.png") no-repeat;
        background-size: 100%;
        padding-top: 32%;
        padding-bottom: 60px;
        min-height: 1000px;

        & > div:nth-child(1) {
            width: 65%;
            margin: 0 auto;
        }
    }

    .left-position {
        position: absolute;
        left: 0;
        top: 25%;
        width: 20%;
    }

    .right-position {
        position: fixed;
        right: 10%;
        top: 50%;
        display: flex;
        flex-direction: column;

        img {
            width: 50px;
        }

        img:not(:first-child) {
            margin-top: 30px;
        }

        img:hover {
            cursor: pointer;
        }
    }

    .info {
        .title-img {
            text-align: center;

            img {
                width: 215px;
            }
        }

        .title-tip {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 18px;

            & > div:nth-child(2n) {
                font-size: 14px;
                font-family: 'PingFang SC';
                font-weight: bold;
                color: #ffffff;
                opacity: 0.7;
            }

            & > div:nth-child(1) {
                width: 243px;
                height: 2px;
                opacity: 0.3;
                background: linear-gradient(to right,
                rgba(145, 104, 104, 0),
                rgba(204, 204, 204, 0.5));
            }

            & > div:nth-child(3) {
                width: 243px;
                height: 2px;
                opacity: 0.3;
                background: linear-gradient(to left,
                rgba(145, 104, 104, 0),
                rgba(204, 204, 204, 0.5));
            }
        }

        .day-center {
            cursor: pointer;
            margin-top: 47px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            & > div {
                width: calc(50% - 10px);
                // height: 246px;
                box-sizing: border-box;
                padding: 23px 17px;
                // border: 1px solid;
                margin-bottom: 18px;
                display: flex;
            }

            & > div:nth-child(2n + 1) {
                margin-right: 20px;
            }

            .background {
                width: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                img:nth-of-type(1) {
                    height: 115%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    transition: all 1s ease;
                    cursor: pointer;
                    z-index: 1;
                }

                img:nth-of-type(2) {
                    height: 75%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    transition: all 1s ease;
                    cursor: pointer;
                    z-index: 2;
                }
            }

            .right {
                margin-left: 30px;
                width: calc(50% - 30px);

                & > div:nth-child(1) {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 15px;
                    font-family: 'PingFang SC';
                    font-weight: bold;
                    color: #87ecfe;
                }

                .right-middle {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 15px;
                    width: 100%;
                    // height: 108px;
                    background: linear-gradient(-24deg, #032248, #072a55, #0c111d);
                    opacity: 0.7;
                    padding: 15px;

                    img {
                        width: 60px;
                        height: 60px;
                    }
                }

                .right-middle-left {
                    width: 100%;

                    & > div:nth-child(1) {
                        font-size: 14px;
                        font-family: '' PingFang SC '';
                        font-weight: bold;
                        color: #528cad;
                    }

                    & > div {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 14px;
                        width: 100%;
                        font-family: 'PingFang SC';
                        font-weight: bold;
                        color: #ffffff;
                    }
                }

                .progress-div {
                    background: linear-gradient(0deg, #1a213a, #0e1324);
                    width: 100%;
                    height: 30px;
                    display: flex;
                    align-items: center;

                    .unfinished {
                        display: flex;
                        height: 6px;
                        width: 100%;

                        // & > div:nth-child(1) {
                        //   background: #fff;
                        // }
                        & > div:nth-child(2) {
                            background: #253c5c;
                        }
                    }
                }
            }
        }
    }

    .info:not(:first-child) {
        margin-top: 56px;
    }

    @media screen and (max-width: 767px) {
        .bg {
            & > div:nth-child(1) {
                width: 95%;
                margin: 0 auto;
            }
        }

        .info .day-center > div {
            width: 100%;
        }

        .background {
            width: 40%;
        }

        .info .day-center .right {
            width: 50%;
        }

        .info .day-center > div:nth-child(2n + 1) {
            margin-right: 0;
        }

        .bg {
            background: url("../assets/image/Welfare/bgm.png") no-repeat top left / 100%;
        }

        .title-img img {
            width: 50%;
        }

        .info .day-center > div {
            padding: 5px;

        }
    }
</style>
