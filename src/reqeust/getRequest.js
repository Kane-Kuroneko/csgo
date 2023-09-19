import axios from "./axios.js";

function myserver() {
    this.axios = axios;
    this.nowhandle = null;
}

myserver.prototype.v = function (vueObj) {
    this.nowhandle = vueObj;
}
myserver.prototype.parseRouter = function (name, urlObj) {
    this[name] = {};
    Object.keys(urlObj).forEach((apiName => {
        this[name][apiName] = this.sendMes.bind(this, name, apiName, urlObj[apiName]);
        this[name][apiName].state = 'ready'
    }))
}
myserver.prototype.sendMes = function (moduleName, apiName, url, config) {
    let config = config || {};
    let type = config.type || 'get';
    let data = config.data || {};
    let bindName = config.bindName || apiName
    let self = this
    let before = function (res) {
        self[moduleName][apiName].state = 'ready'
    }
    let defaultFn = function (res) {
        self.nowhandle[bindName] = res.data;
    }
    let success = config.success || defaultFn()
    if (this[moduleName][apiName].state === 'ready') {
        this.axios[type](url).then(before).then(success)
        this[moduleName][apiName].state = 'waiting'
    }
}

export default new myserver
