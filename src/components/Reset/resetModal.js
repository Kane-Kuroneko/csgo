import RestetComponent from './reset.vue';
const Reset = {};

Reset.install = (Vue) => {
    const instance = new RestetComponent();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);

    Vue.prototype.$reset = (email,title) => {
		 const { setResetState } = reaxel_ResetPassword();
		 setResetState({
			 visible : true ,
		 });
    }
}
import { reaxel_ResetPassword } from '@/reaxels/user/reset-password';
export default Reset;
