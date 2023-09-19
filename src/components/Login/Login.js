import loginComponent from "./login.vue";
import router from "../../router/index";
import { reaxel_user } from "@/reaxels/user";

const reax_User = reaxel_user();
const Login = {};

Login.install = (Vue) => {
	const LoginConstructor = Vue.extend(loginComponent);
	const instance = new LoginConstructor();
	// instance.$mount(document.createElement('div'))
	// document.body.appendChild(instance.$el);
	
	Vue.prototype.$login = (_this , notEmail , isRegister) => {
		reax_User.openLoginModal();
		instance.notEmail = notEmail ? true : false
		// instance.show = true;
		instance.context = _this
		instance.isRegister = isRegister
		instance.router = router
	};
	
	Login.show = () => {
		reax_User.openLoginModal();
		instance.context = null;
	};
};

export default Login;
