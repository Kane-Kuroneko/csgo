import axios from "axios";
import { Message } from "view-design";
import store from "../store";
import router from "../router";

const reax_user = reaxel_user();
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : "";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.put["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.withCredentials = true;

axios.defaultSource = axios.CancelToken.source();

//  添加请求拦截器
axios.interceptors.request.use((config) => {
	// 默认给请求加上 cancelToken (不包含 null)
	if ( config.cancelToken === undefined ) {
		config.cancelToken = axios.defaultSource.token;
	}
	if ( reax_user.userStore.token ) {
		config.headers["token"] = reax_user.userStore.token;
	}
	return config;
} , (error) => {
	//请求错误时做些事globe l
	return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) => {
	return res.data;
} , (err) => {
	if ( err.response.status === 502 ) {
		return (window.location.href = `/siteMaintain.html?timer=${ err.response.data.data }`);
	}
	if ( err.response.status === 900 ) {
		return (window.location.host = "www.google.com");
	}
	switch ( err.response.data.errCode ) {
		case 403:
			Message.error({
				message : "系统提示" ,
				description : "Token失效，请重新登录!" ,
				duration : 4 ,
			});
			localStorage.removeItem("userinfo");
			reax_user.clearUserInfo();
			reax_user.openLoginModal();
			store.commit("account/clearUser");
			break;
		case 104:
			err.response.data.errMsg = "登录失效，请重新登录";
			localStorage.removeItem("userinfo");
			reax_user.clearUserInfo();
			store.commit("account/clearUser");
			Message.error("请重新登录");
			break;
		case 1000:
			window.location.href = `/siteMaintain.html?timer=${ err.response.data.data }`;
			break;
		case 404:
			window.location.href = `/siteMaintain.html?timer=${ err.response.data.data }`;
			break;
	}
	if ( err.response === undefined ) {
		return Promise.reject(err);
	}
	return Promise.reject(err);
});

import { reaxel_user } from "@/reaxels/user";

export default axios;
