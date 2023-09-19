import joinPwdComponent from './joinPwd.vue';
const JoinPwd = {};

JoinPwd.install = (Vue) => {
    const joinPwdConstructor = Vue.extend(joinPwdComponent);
    const instance = new joinPwdConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    Vue.prototype.$openPwd = (enter) => {
        instance.enter = enter
        instance.show = true
    }
    Vue.prototype.$closedPwd = () => {
        instance.show = false
    }
}

export default JoinPwd;
