import fairGame from "./fairGame.vue";

const fair = {};

fair.install = (Vue) => {
    const upgradeRecordConstructor = Vue.extend(fairGame);
    const instance = new upgradeRecordConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    Vue.prototype.$fair = (res, seed, fair) => {
        instance.show = seed
        instance.showFair = fair
        instance.res = res
    }
}

export default fair;
