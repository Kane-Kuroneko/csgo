import Modal from './Modal.vue';

const modal = {};

modal.install = (Vue) => {
    const BagConstructor = Vue.extend(Modal);
    const instance = new BagConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);

    Vue.prototype.$Modale = (title, context,balance) => {
        instance.show = true;
        instance.title = title;
        instance.context = context;
        instance.balance = balance;
    }
}

export default modal;
