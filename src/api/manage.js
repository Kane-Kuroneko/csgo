import  axios  from '../reqeust/axios'


//post
export function postAction(url,parameter,timeout) {
    return axios({
        url: url,
        method:'post' ,
        data: parameter,
        timeout: timeout
    })
}

//post method= {post | put}
export function httpAction(url,parameter,method) {
    return axios({
        url: url,
        method:method ,
        data: parameter
    })
}

//put
export function putAction(url,parameter, timeout) {
    return axios({
        url: url,
        method:'put',
        data: parameter,
        timeout: timeout
    })
}

//get
export function getAction(url,parameter, timeout, baseUrl) {
    return axios({
        url: url,
        method: 'get',
        params: parameter,
        timeout: timeout,
        baseURL: serverPath
    })
}

//deleteAction
export function deleteAction(url,parameter) {
    return axios({
        url: url,
        method: 'delete',
        params: parameter
    })
}


import { serverPath } from '../requester/index';
