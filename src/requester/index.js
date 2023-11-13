export const requester = (function () {

	return {
		/**
		 * @param url {string}
		 * @param requestInit {Partial<RequestInit>}
		 */
		get (url , requestInit= {}) {
	      let target = url.startsWith('http') ? url : `${serverPath}${ url }` ;
			const {
				userStore ,
				openLoginModal,
			} = reaxel_user();
			return fetch(target , {
				method : "GET",
				credentials : "include" ,
				...requestInit,
				headers : {
					"Content-Type" : "application/json" ,
					"Token" : userStore.token ,
					...(requestInit?.headers || {}),
				} ,
			}).then(res => res.json()).
			then((json) => {
				if ( json.code === 200 && !json.errMsg ) {
					return json.data;
				} else if ( json.errCode === 104 ) {
					openLoginModal();
					throw json.errMsg;
				}
			});
		} ,
		/**
		 * @param url {string}
		 * @param requestInit {Partial<RequestInit>}
		 */
		post (url , requestInit= {}) {
			let target = url.startsWith('http') ? url : `${serverPath}${ url }` ;
			const {
				userStore ,
				openLoginModal,
			} = reaxel_user();
			
			return fetch(target , {
				method : "POST",
				credentials : "include" ,
				...requestInit,
				headers : {
					"Content-Type" : "application/json" ,
					"Token" : userStore.token ,
					...(requestInit?.headers || {}),
				} ,
			}).then(res => res.json()).
			then((json) => {
				if ( json.code === 200 && !json.errMsg ) {
					return json.data;
				} else if ( json.errCode === 104 ) {
					openLoginModal();
					throw {message:json.errMsg};
				}else {
					throw {message:json.errMsg};
				}
			});
		} ,
		/**
		 * @param url {string}
		 * @param requestInit {Partial<RequestInit>}
		 */
		put (url , requestInit= {}) {
			let target = url.startsWith('http') ? url : `${serverPath}${ url }` ;
			const {
				userStore ,
				openLoginModal,
			} = reaxel_user();
			return fetch(target , {
				method : "put",
				credentials : "include" ,
				...requestInit,
				headers : {
					"Content-Type" : "application/json" ,
					"Token" : userStore.token ,
					...(requestInit?.headers || {}),
				} ,
			}).then(res => res.json()).
			then((json) => {
				
				if ( json.code === 200 && !json.errMsg ) {
					return json.data;
				} else if ( json.errCode === 104 ) {
					openLoginModal();
					throw {message:json.errMsg};
				}else {
					throw {message:json.errMsg};
				}
			});
		} ,
	};
})();

export const serverPath = {
	"development" : `/api`,
	"production" : ``,
}[process.env.NODE_ENV];
import { reaxel_user } from "@/reaxels/user/index";
