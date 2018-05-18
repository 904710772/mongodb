import axios from 'axios';
import qs from 'qs';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = 'http://localhost:3000';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        // config.data = JSON.stringify(config.data);
        // config.data = qs.stringify(config.data);
        config.headers = {
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type' : 'application/json'
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.errCode == 2) {
            router.push({
                path: "/login",
                querry: {redirect: router.currentRoute.fullPath}//从哪个页面跳转
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    })

/**
 * 封装get请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function fetch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.get(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}
export default {
    getUser(params) {
        // return fetch('/getUser', params);
        return fetch(`/getUser/${params.id}`);
    },
    getUserLogList(params) { //获取用户信息列表
        // return fetch('/getUser', params);
        return fetch(`/getUserLogList`);
    },
    logSetting(params) { //log接口的基本设置
        return post('/logSetting', params);
    },
    saveUserLogs(params) {  //新增用户信息
        return post('/saveUserLogs', params)
    },
    delUserLogs(params) {  //删除用户信息
        return post('/delUserLogs', params)
    },

    editUserInfo(params) { //编辑修改用户信息
        return post('/editUserInfo', params)
    }
}
