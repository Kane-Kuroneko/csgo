export default {
	install (Vue) {
		Vue.mixin({
			beforeCreate () {
				const reax_Initial = reaxel_initial() , {
					initialStore,
				} = reax_Initial;
				const reax_Device = reaxel_Device() , {
					deviceStore ,
				} = reax_Device;
				Object.assign(this , {
					$reax_Initial : reax_Initial ,
					$reax_Device : reax_Device ,
					$initialStore : initialStore ,
					$deviceStore : deviceStore ,
				});
			} ,
		});
	} ,
};
import { reaxel_initial } from './';
import { reaxel_Device } from '../devices';
