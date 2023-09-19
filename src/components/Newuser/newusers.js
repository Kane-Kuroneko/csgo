import NewUser from "./newUser.vue";

export default {
	install(Vue){
		const instance = new NewUser();
		instance.$mount(document.createElement('div'))
		document.body.appendChild(instance.$el);
		Vue.prototype.$wealfare = (show,isLogin) => {
			instance.show = show
			instance.isLogin = isLogin
		}
	}
};
