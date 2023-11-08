/**
 * 这个文件将在style标签里根据reaxel-device来事实改变全局样式
 */




export const reaxel_ReactiveStyle = reaxel(() => {
	
	obsReaction(() => {
		const {deviceType} = reaxel_Device();
		document.documentElement.setAttribute('data-reaxel-reactive-device',deviceType);
	} , () => [reaxel_Device().deviceType]);
	
	return () => {
		
		return {
			
		}
	}
});

import { reaxel_Device } from './';
import './PC-min-1366.less';
import './mobile-full-screen.less';
import './mobile-non-full-screen.less';
import './hr-mobile.less';

