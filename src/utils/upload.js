const beforeUpload = function (file, preName, vm) {
    return new Promise((resolve, reject) => {
        let imgArr = file.name.split('.');
        let imgName = preName + '/' + randomStr() + +Date.parse(new Date()) / 1000 + '.' + imgArr[imgArr.length - 1];
        vm.$axios({
            method: 'get',
            url: '/uploadUrl',
            params: {
                path: imgName,
                contentType: file.type
            },
        }).then((res) => {
            resolve({url: res.url, imgName: imgName});
        }).catch(err => {
            reject(err);
        })
    })
};

const uploadFunc = function (fileObj, vm) {
    return new Promise((resolve, reject) => {
        let _this = vm;
        vm.$Spin.show();
        var request = new XMLHttpRequest();
        request.open("PUT", fileObj.action, true);
        request.onreadystatechange = function () {
            vm.$Spin.hide();
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200 || this.status === 201) {
                resolve(true);
            } else {
                _this.$Message.error('上传失败');
                reject(false);
            }
        };
        request.send(fileObj);
    })
};
const createImgName = function (file, preName) {
    let imgArr = file.name.split('.');
    let imgName = preName + '/' + randomStr() + +Date.parse(new Date()) / 1000 + '.' + imgArr[imgArr.length - 1];
    return imgName;
}
const uploadQnFunc = function (fileObj, vm) {
    return new Promise((resolve, reject) => {
        let _this = vm;
        vm.$Spin.show();
        var request = new XMLHttpRequest();
        request.open("POST", 'https://upload-z0.qiniup.com', true);
        // request.open("POST", process.env.VUE_APP_QN_UPLOAD_URL, true);
        request.onreadystatechange = function () {
            vm.$Spin.hide();
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200 || this.status === 201) {
                resolve(true);
            } else {
                _this.$Message.error('上传失败');
                reject(false);
            }
        };
        request.send(fileObj);
    })
};

const randomStr = function () {
    var expect = 8;//期望的字符串长度
    var str = Math.random().toString(36).substring(2);
    while (str.length < expect) {
        str = Math.random().toString(36).substring(2)
    }
    return str.substring(0, expect);
};

export default {
    uploadFunc: uploadFunc,
    beforeUpload: beforeUpload,
    uploadQnFunc: uploadQnFunc,
    createImgName: createImgName
};
