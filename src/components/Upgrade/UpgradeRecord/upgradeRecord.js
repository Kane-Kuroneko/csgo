import upgradeRecordComponent from './upgradeRecord.vue';
const UpgradeRecord = {};

UpgradeRecord.install = (Vue) => {
    const upgradeRecordConstructor = Vue.extend(upgradeRecordComponent);
    const instance = new upgradeRecordConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);
    Vue.prototype.$upgradeRecord = (isMobile) => {
        instance.show = true
        instance.isMobile = isMobile
    }
}

export default UpgradeRecord;
