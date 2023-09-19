import emailComponent from './email.vue';
const Email = {};

Email.install = (Vue) => {
    const EmailConstructor = Vue.extend(emailComponent);
    const instance = new EmailConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);

    Vue.prototype.$email = (type,isAnswerChang,email) => {
        instance.show = true;
        instance.isAnswerChang =isAnswerChang
        instance.type = type
        instance.email= email
    }
}

export default Email;
