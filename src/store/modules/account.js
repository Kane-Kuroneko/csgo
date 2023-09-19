import {Notice} from 'view-design'
import {getAction} from "../../api/manage";

const state = {
    user: {},
    token: '',
    webInfo: {},
    videoState: 1,
    homeInfo: {
        boxLuckyVOList: [],
        basicsDataVO: {}
    },
    bagNum: 0,
    ids: [],
    opening: 0,
    preViewStatus: [],
    trigger: false,
    isMsg: false,
    isNotice: [],
    userDiscount: {},
    isPhone: false,
    activityRechargeAmount: 0,
    lastSkinsRechargeLogId: null,
    baberrageArr: [],
    isFestival: false,
    noticControner: 1 // 首页公告 弹窗控制
};

const getters = {};
import { reaxel_user } from '@/reaxels/user';
const actions = {
    // 获取用户信息
    getUser(ctx) {
		 
		 const promise = reaxel_user().request_profile();
		 
		 promise.then(data => {
			 ctx.commit('setUser', Object.assign({}, ctx.state.user, data))
			 setTimeout(() => {
				 localStorage.setItem('userinfo', JSON.stringify(data))
			 }, 100)
		 }).catch(e => {
			 ctx.commit('clearUser');
		 })
		 
		 return promise;
    },
    getDiscount(ctx) {
        getAction('/api/activity/time').then(res => {
            ctx.commit('setDiscount',res.data)
        })
    },
    getHome(ctx) {
        getAction('/api/home/web/info').then(res => {
            ctx.commit('setHome', res.data)
        })
    },
    getInfo(ctx) {
        getAction('/api/main/web/info').then(res => {
            ctx.commit('setInfo', res);
            ctx.commit('setOpening', res.opening);
        });
    },
    getStatus(ctx) {
        if (ctx.state.ids.length === 0 || !localStorage.getItem('token')) {
            clearInterval(window.statusPollling);
            return false;
        }
        getAction(`/finance/assets/status?ids=${ctx.state.ids.join(',')}`).then(res => {
            const [...ids] = ctx.state.ids;
            res.forEach((item, index) => {
                for (let i = 0; i < ctx.state.preViewStatus.length; i++) {
                    if (item.id === ctx.state.preViewStatus[i].id && item.status === 2 && ctx.state.preViewStatus[i].status === 1) {
                        Notice.success({
                            title: '发货成功',
                            desc: `物品 【${item.name}】 已经发货，请您到steam接受报价！`,
                            duration: 0
                        });
                        ctx.commit('setTrigger');
                        break;
                    }
                }
                if ((item.status === 0 || item.status === 6)) {
                    ids.splice(index, 1);
                    ctx.commit('setWithdrawIds', ids);
                    ctx.commit('setTrigger');
                    Notice.error({
                        title: '取回失败',
                        desc: `物品 【${item.name}】 取回失败，请您稍后重试！`,
                        duration: 0
                    });
                }
            })
            ctx.commit('setPreviwStatus', res);
        });
    }
};

const mutations = {
    setIsMsg(state, val) {
        state.isMsg = val
    },
    setDiscount(state, val) {
        state.userDiscount = val
    },
    setIBarberrage(state, val) {
        state.baberrageArr.push(val)
    },
    setVideo(state, val) {
        state.videoState = val
    },
    clearBarberrafe(state, val) {
        state.baberrageArr.splice(0, val)
    },
    setFes(state, val) {
        state.isFestival = val
    },
    setequipment(state, val) {
        state.isPhone = val
    },
    setNotice(state, val) {
        state.isNotice = val
    },
    setHomeLucky(state, val) {
        state.homeInfo.boxLuckyVOList = val
    },
    setHomeNumber(state, val) {
        state.homeInfo.basicsDataVO = val
    },
    // 首页公告 弹窗控制
    changeState(state, payload) {
        state.noticControner = payload
    },
    setTrigger(state) {
        state.trigger = !state.trigger;
    },
    setPreviwStatus(state, status) {
        state.preViewStatus = status
    },
    setWithdrawIds(state, ids) {
        state.ids = ids
    },
    setUser(state, user) {
        state.user = user;
    },
    setActivityRechargeAmount(state, value) {
        state.activityRechargeAmount = value
    },
    clearUser(state) {
        state.activityRechargeAmount = 0
        localStorage.removeItem('token');
        state.bagNum = 0
        state.user = {};
    },
    setOpening(state, opening) {
        state.opening = opening
    },
    setInfo(state, info) {
        state.webInfo = info;
    },
    setToken(state, token) {
        state.token = token;
    },
    clearToken(state) {
        localStorage.removeItem('token')
        state.token = ''
    },
    updateBagNum(state) {
        state.bagNum += 1
    },
    clearBagNum(state) {
        state.bagNum = 0
    },
    setLastSkinsRechargeLogId(state, id) {
        state.lastSkinsRechargeLogId = id
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
