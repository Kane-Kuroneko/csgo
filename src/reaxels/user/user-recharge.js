/**
 * @typedef {import('./user-asserts').Asserts.PaymentChannel} PaymentChannel
 * @typedef {import('./user-asserts').Asserts.GoodsWithGiving} GoodsWithGiving
 * @typedef {import('./user-asserts').Asserts.PaymentChannelWithGiving} PaymentChannelWithGiving
 */

export const reaxel_Recharge = reaxel((ret) => {

	const {
		store:rechargeStore,
		setState:setRechargeState,
		mutate:mutateRecharge,
	} = orzMobx({
		rate : null,
		/** @type {PaymentChannelWithGiving[]}*/
		paymentChannels : null,
		channelIds: null,
		goodsId : null,
		qrcode : null,
		channel:null,
	});
	
	const { initialStore } = reaxel_initial();
	
	/**
	 * @description 根据设备动态筛选获取支付渠道
	 * @type {PaymentChannelWithGiving[]}
	 */
	let devicePaymentChannels = obsReaction((first) => {
		if(first || !rechargeStore.paymentChannels){
			return null;
		}else {
			return devicePaymentChannels = rechargeStore.paymentChannels.filter(({type}) => {
				return initialStore.isPhone ? (type !== 4) : (type !== 3);
			});
		}
	} , () => [
		initialStore.isPhone,
		rechargeStore.paymentChannels,
	]);
	
	/**
	 * @description 动态得出的选中的支付渠道
	 * @type {PaymentChannelWithGiving}
	 */
	let channelObject = obsReaction((first) => {
		if(first){
			return null;
		}else if (!devicePaymentChannels || typeof rechargeStore.channelIds !== 'number'){
			return channelObject = null;
		}else {
			return channelObject = devicePaymentChannels.find(channel => channel.ids === rechargeStore.channelIds);
		}
	},() => [
		rechargeStore.channelIds,
	
		rechargeStore.paymentChannels,
	]);
	
	/**
	 * @description 动态拿到当前选中的饰品
	 * @type {GoodsWithGiving}
	 */
	let itemObject = obsReaction((first) => {
		const {channelIds,paymentChannels,goodsId} = rechargeStore;
		if(first){
			return null;
		}else if (!paymentChannels || !channelIds || !goodsId || !channelObject || !channelObject.goodsList){
			return itemObject = null;
		}else {
			return itemObject = channelObject.goodsList.find(goods => goods.id === goodsId);
		}
	},() => [
		rechargeStore.goodsId,
		rechargeStore.channelIds,
		rechargeStore.paymentChannels,
	]);
	
	obsReaction(() => {
		if(initialStore.isPhone){
			console.log(logProxy(devicePaymentChannels));
		}
		if(!devicePaymentChannels){
			return 
		}else {
			setRechargeState({channelIds : devicePaymentChannels[0].ids});
			if(channelObject?.goodsList){
				setRechargeState({goodsId : channelObject.goodsList[0].id});
			}
		}
	}, () => [initialStore.isPhone] );
	
	obsReaction(() => {
		if(rechargeStore.qrcode){
			setRechargeState({ qrcode : null });
		}
	},() => [
		rechargeStore.channelIds,
		rechargeStore.goodsId,
	]);
	/**
	 * @description 获取支付渠道
	 * @return { Promise<PaymentChannelWithGiving[]>}
	 */
	async function requestGetPaymentChannels() {
		
		return requester.get(`/api/pay/way`).then(/**@param data {PaymentChannel[]}*/(data) => {
			const paymentChannels = data.map((channel) => {
				/**@type{{key:string;val:number;ratio:number;}[]}*/
				const rechargeConfig = JSON.parse(channel.rechargeConfig || "null");
				const goodsList = channel.goodsList?.map((goods,index) => {
					const giving = rechargeConfig ? function () {
						if(goods.goodsPrice >= + rechargeConfig[index].key){
							if(+ rechargeConfig[index].ratio === 1){
								return + rechargeConfig[index].val * 100 + "%";
							}else {
								return rechargeConfig[index].val;
							}
						}else {
							return 0;
						}
					}() : 0 ;
					return Object.assign({},goods,{giving});
				});
				return { ...channel, goodsList };
			});
			
			setRechargeState({
				paymentChannels
			});
			/*分开写是因为需要等待reaction执行完*/
			setRechargeState({
				channelIds:devicePaymentChannels[1].ids,
			});
			setRechargeState({
				goodsId:channelObject.goodsList?.[0]?.id,
			});
			
			setRechargeState({
				channel:channelObject.channel,
			});
			
			return paymentChannels;
		});
	}
	
	/**
	 * @description获取汇率
	 * @return {Promise<void>}
	 */
	async function requestGetRate() {
		return requester.get(`/api/skins/rate`).then((data) => {
			setRechargeState({rate:data});
		});
	}
	
	/**
	 * @description 立即支付,获取支付码
	 * @return 
	 */
	async function requestGetRechargeQrcode(ref) {
		
		return requester.post(`/api/pay/${channelObject.ids}`,{
			body:JSON.stringify({
				amount:itemObject.goodsPrice,
				goodsId:itemObject.id,
			})
		}).then((data) => {
			switch ( data.action ){
				case "open": {
					window.open(data.url,"_self");break;
				};
				case "checkout":{
					localStorage.setItem("callbackHTML" , data.data);
					if ( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) {
						window.location.href = "/checkstand.html";
					}else {
						window.open("/checkstand.html" , "_self" , "height=600,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
					}
					break;
				};
				case "cashier" : {
					const win = window.open('','');
					win.document.write(data.url);
					return;
					// const container = document.querySelector('#ali-cashier');
					// container.innerHTML = data.url;
					/*@ts-expect-error*/
					// container.firstChild.submit();
					break;
				}
				case "qr_code": {
					setRechargeState({qrcode : data.url ?? `${location.origin}/api/pay/creat/code/${data.data}`});
					break;
				};
				default : throw {message:`支付失败,${data.errMsg}`}
			}
			return data;
		});
	}
	
	/**
	 * @description 用户点击支付完成按钮
	 * @return 
	 */
	async function finishRecharge() {
		const { request_profile , userStore, } = reaxel_user();
		const originalBalance = userStore.profile.balance;
		return request_profile().then((profile) => {
			setRechargeState({qrcode : null});
			if(profile.balance === originalBalance){
				throw {message : "充值可能失败或暂未到账，如付款成功请在1分钟后刷新页面"};
			}else {
				return {message : "充值成功!"};
			}
		})
	}
	
	return () => {
		return ret = {
			rechargeStore,
			setRechargeState,
			mutateRecharge,
			requestGetPaymentChannels,
			requestGetRate,
			requestGetRechargeQrcode,
			finishRecharge,
			cancelRecharge(){
				setRechargeState({qrcode : null,});
			},
			/**@param channelIds {number}*/
			chooseChannel(channelIds){
				
				if(channelIds === rechargeStore.channelIds){
					return;
				}
	
				const { type,url ,channel} = devicePaymentChannels.find(({ids}) => ids === channelIds);
				if(type === 2){
					return window.open(url);
				}else {
					setRechargeState({channelIds});
					if(channelObject.goodsList){
						setRechargeState({
							goodsId : channelObject.goodsList[0].id,
							channel:channel
						});
					}
				}
			},
			chooseItem(/**@type {number}*/itemId){
				setRechargeState({ goodsId : itemId });
			},
			get devicePaymentChannels(){
				return [
					initialStore.isPhone,
					rechargeStore.paymentChannels,
				],devicePaymentChannels;
			},
			get itemObject(){
				return [
					rechargeStore.goodsId,
					rechargeStore.channelIds,
					rechargeStore.paymentChannels,
					initialStore.isPhone
				],itemObject;
			},
			get channelObject(){
				return [
					rechargeStore.channelIds ,
					rechargeStore.paymentChannels,
					initialStore.isPhone
				], channelObject;
			},
		}
	}
});


import { reaxel_user } from '@/reaxels/user';
import { reaxel_initial } from '@/reaxels/initial';
