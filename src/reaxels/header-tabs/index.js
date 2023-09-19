


export const reaxel_header_tabs = reaxel(() => {
	
	const {
		store ,
		setState ,
	} = orzMobx({
		leftTabs ,
		rightTabs ,
		/*控制移动端的侧栏菜单*/
		siderWapMenuShow : false,
	});
	
	function toggleWapSiderMenu(value = !store.siderWapMenuShow){
		setState({siderWapMenuShow : value });
	}
	
	
	return () => {
		
		
		return {
			toggleWapSiderMenu,
			get leftTabs () {
				return store.leftTabs;
			} ,
			get rightTabs () {
				return store.rightTabs;
			} ,
			get siderWapMenuShow(){
				const {isPhone} = reaxel_initial().initialStore;
				if(isPhone){
					return store.siderWapMenuShow;
				}else {
					return false;
				}
			},
		};
	};
	
});


import {
	leftTabs ,
	rightTabs ,
} from './tabs.data';
import { reaxel_initial } from '../initial';
