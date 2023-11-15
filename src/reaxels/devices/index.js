/**
 * @description 这个reaxel用于处理用户使用不同设备产生的业务逻辑和GUI差异
 * @desc 适配最窄屏为iphone4:resolution:320*480,DPR:2,PAR:
 * 
 */
export const reaxel_Device = reaxel((ret) => {
	const {
		store:deviceStore,
		setState:setDeviceStore ,
		mutate : mutateDevice,
	} = orzMobx({
		/**@type {number} 屏幕缩放比率*/
		DPR : null,
		/**@type {number} pixel aspect ratio (PAR)像素宽高比*/
		PAR : null,
		/**@type {string} userAgent*/
		UA : null,
		/**@type {number}*/
		outerWidth:null,
		/**@type {number}*/
		outerHeight:null,
	});
	
	/**
	 * @desc
	 * @type {DeviceTypes[]}
	 */
	const orderedDeviceTypesList = [
		/*非全面屏的短屏幕手机*/
		"mobile-non-full-screen",
		/*全面屏的长屏手机*/
		"mobile-full-screen",
		/*各种pad*/
		"mobile-pad",
		/*横屏手机*/
		"hr-mobile",
		/*宽度至少为1366的台式机*/
		"PC-min-1366",
	];
	
	const estimateDevices = {
		get "mobile-non-full-screen" (){
			return utils.assertTrue([
				deviceStore.DPR > 1.001,
				deviceStore.PAR > 0.63,
				deviceStore.PAR < 0.75,
				/android|linux|ios|mobile/i.test(deviceStore.UA),
			]);
		},
		get "mobile-full-screen" (){
			return utils.assertTrue([
				deviceStore.DPR > 1.001,
				deviceStore.PAR < 0.64,
				/android|linux|ios|mobile/i.test(deviceStore.UA),
			]);
		},
		get "mobile-pad" (){
			return utils.assertTrue([
				deviceStore.DPR > 1.001,
				deviceStore.PAR > 0.74,
				deviceStore.PAR < 1.26,
				/ipad|android|linux|mobile/i.test(deviceStore.UA),
				/pad/i.test(deviceStore.UA),
			]);
		},
		/*移动设备横屏状态*/
		get "hr-mobile" (){
			return utils.assertTrue([
				deviceStore.DPR > 1.001,
				deviceStore.PAR > 1.15,
				/ipad|android|linux|mobile/i.test(deviceStore.UA),
			]);
		},
		get "PC-min-1366" (){
			return utils.assertTrue([
				/windows|win64|win32/i.test(deviceStore.UA),
			]);
		},
	}
	console.log(estimateDevices['mobile-non-full-screen']);

	function detectDeviceInfo(){
		const {devicePixelRatio,outerWidth,outerHeight} = window;
		setDeviceStore({
			DPR : window.devicePixelRatio,
			/**@desc pixel aspect ratio (PAR)像素长宽比*/
			PAR : window.outerWidth/window.outerHeight,
			UA : navigator.userAgent,
			outerWidth,
			outerHeight,
		});
		return detectDeviceInfo; 
	}
	addEventListener('resize',utils.debounce(detectDeviceInfo(),300))
	/*dev-test*/addEventListener('resize' , (e) => {
		crayon['rgba(130,206,255,0.36)']('PAR : ' , outerWidth / outerHeight);
	});
	
	
	return () => {
		
		return ret = {
			deviceStore,
			get isPhone(){
				return utils.assertTrue([
					estimateDevices["mobile-non-full-screen"],
					estimateDevices['mobile-full-screen'],
					estimateDevices['mobile-pad'],
				]);
			},
			/**@type {DeviceTypes}*/
			get deviceType (){
				for(const deviceType of orderedDeviceTypesList){
					if(estimateDevices[deviceType]){
						return deviceType;
					}
				}
				//if(process.env.NODE_ENV === "development") window.alert(`此设备未成功识别为任何类型,请检查reaxel::device.estimateDevices!`);
				ret.printDeviceInfo('');
			},
			printDeviceInfo(additionalText = ret.deviceType){
				if(process.env.NODE_ENV === "production") return;
				//开发环境注释设备信息
				return
				const info = `DPR : ${deviceStore.DPR}
				PAR : ${deviceStore.PAR}
				UA : ${deviceStore.UA}
				outerWidth : ${deviceStore.outerWidth} 
				outerHeight : ${deviceStore.outerHeight}
				${additionalText}`.replaceAll(/\t/g,'');
				const res = window.confirm(info);
				if(!res) throw '';
			}
		}
	}
});

const DPR_PC = 1.001;
/**
 * @typedef {(
 * "mobile-non-full-screen" |
 * "mobile-full-screen" |
 * "mobile-pad"|
 * "PC-min-1366" | 
 * "hr-mobile"
 * )} DeviceTypes
 */
