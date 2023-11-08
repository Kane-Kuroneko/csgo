export const reaxel_initial = reaxel((ret) => {
	
	const {
		store ,
		setState,
	} = orzMobx({
		dropPreciousData : null,
		//首页的精彩活动
		promotions : null ,
		/**@type {import('src/reaxels/initial/types').Initial.boxInfo[]}*/
		homeRecommandedBoxes : null,
		/**@type {import('src/reaxels/initial/types').Initial.baseInfo}*/
		baseInfo : null,
		
		/*是否是移动端设备*/
		wap: null,
		isPhone:true,
		dpr:window.devicePixelRatio,
		env : process.env.NODE_ENV,
	});
	/*检查设备UA*/
	if ( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) {
		setState({wap:true});
	}else {
		setState({wap:false});
	}
	
	/*进入页面时立刻获取一次设备宽度信息, 并对resize监听*/
	addEventListener('resize',utils.debounce(checkDevice(),300));
	
	obsReaction(() => {
		crayon.pink('store.isPhone: ' , store.isPhone);
		// window.confirm(`当前设备逻辑分辨率为${window.outerWidth}px\ndpr为${window.devicePixelRatio}`)
	},() => [store.isPhone]);
	
	function checkDevice() {
		if(
			store.dpr > 1.001 &&
			/ios|ipad|andriod|phone|mobile/i.test(navigator.userAgent)
		){
			setState({isPhone : true});
		}else {
			setState({isPhone : false});
		}
		return checkDevice;
	}
	
	const requestPromotions = async () => {
		
		return requester.get(`/api/home/home/activity`).then(( data) => {
			setState({
				promotions : data,
			});
		});
	};
	
	const requestBaseInfo = async () => {
		
		return requester.get(`/api/home/web/info`).then(( data ) => {
			setState({
				dropPreciousData : data.boxLuckyVOList.map(item => _.assign(item,{id:Math.random().toString()})),
				baseInfo : data.basicsDataVO ,
			});
			return data;
		})
	}
	
	/**
	 * @description 请求首页的推荐箱子
	 * @return {Promise<import('./types').Initial.boxInfo[]>}
	 */
	const requestHomeRecommandedBoxes = async () => {
		return requester.get(`/api/home/get/boxInfo`).
		then((data) => {
			setState({
				homeRecommandedBoxes : data?.[0]?.boxVoList || null
			});
			console.log(store.homeRecommandedBoxes)
			return data;
		});
	}
	return () => {
		
		return ret = {
			initialStore:store,
			setInitialState:setState,
			requestBaseInfo  ,
			requestPromotions ,
			requestHomeRecommandedBoxes,
			get isPhone(){return store.isPhone;},
			get promotions () {return store.promotions;} ,
			get dropPreciousData() {return store.dropPreciousData;} ,
			get baseInfo(){return store.baseInfo;},
			get homeRecommandedBoxes(){return store.homeRecommandedBoxes},
			$53Promise,
		};
	};
});

import { $53Promise } from './53kf';
