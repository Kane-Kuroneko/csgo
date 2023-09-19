import takeComponent from './take.vue';
const Take = {};

Take.install = (Vue) => {
    const takeConstructor = Vue.extend(takeComponent);
    const instance = new takeConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    Vue.prototype.$openTake = (res) => {
        instance.show = true
        instance.res = res
    }
}

export default Take;
