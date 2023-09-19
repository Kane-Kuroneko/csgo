import ExDrop from "./ExDrop.vue";

const ExDrops = {};

ExDrops.install = (Vue) => {
    const upgradeRecordConstructor = Vue.extend(ExDrop);
    const instance = new upgradeRecordConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    Vue.prototype.$drop = (res) => {
        instance.show = true
        instance.resultData = res
    }
}

export default ExDrops;
