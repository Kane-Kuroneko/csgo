import emailComponent from './bindPhone.vue';

const bindPhone = {};

bindPhone.install = (Vue) => {
    const EmailConstructor = Vue.extend(emailComponent);
    const instance = new EmailConstructor();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    Vue.prototype.$bindPhone = (type, isAnswerChang, steamId) => {
        instance.show = true;
        instance.isAnswerChang = isAnswerChang;
        instance.type = type;
        instance.steamId = steamId;
    }
}

export default bindPhone;
