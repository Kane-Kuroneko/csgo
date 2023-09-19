import nameAuth from './nameAuth.vue';

const nameAuths = {};

nameAuths.install = (Vue) => {
  const nameConstructor = Vue.extend(nameAuth);
  const instance = new nameConstructor();
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el);
  Vue.prototype.$nameAuth = (type,info) => {
    instance.show = true;
    instance.type = type;
    instance.info = info;
  }
}

export default nameAuths;
