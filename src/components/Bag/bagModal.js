import bagComponent from './bag.vue';
const Bag = {};

Bag.install = (Vue) => {
    const BagConstructor = Vue.extend(bagComponent);
    const instance = new BagConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);

    Vue.prototype.$bag = () =>{
        instance.show = true;
    }
}

export default Bag;