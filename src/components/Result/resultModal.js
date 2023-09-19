import resultComponent from './result.vue';
import router from "../../router";
const Result = {};

Result.install = (Vue) => {
    const resultConstructor = Vue.extend(resultComponent);
    const instance = new resultConstructor();
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el);

    Vue.prototype.$result = (title,obj) => {
        instance.Title = title;
        instance.errMsg = obj.errMsg;
        instance.errCode = obj.errCode;
        instance.storeError = obj.storeError;
        instance.show = true;
    }
    instance.router = router;

}

export default Result;
