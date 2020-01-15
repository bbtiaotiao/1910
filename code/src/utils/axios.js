

import axios from "axios";
import {message} from "antd";
import {history} from "&"

 
let token = "";

const baseURL = 'http://101.200.87.1:2020/oa/'

axios.defaults.baseURL = baseURL;


// axios.defaults.headers.common['token'] = token;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function loadingToast(msg, time) {
    msg = msg || "请求中....";
    time = time || 1;
    // message.hide();
    // message.loading(msg, time, () => {
    //     console.log('Load complete !!!');
    // });
};

export function failToast(msg) {
    message.error(msg, 1);
}

export function offline(msg) {
    // Toast.hide();
    // Toast.offline(msg, 1);
}

export function success(msg) {
    // Toast.hide()
    message.success(msg, 1);
}


//axios 拦截器 Interceptors

//request 请求发送之前的拦截器
axios.interceptors.request.use(function (config) {

    // Do something before request is sent 配置动画
    loadingToast();
    token =  sessionStorage.token ? sessionStorage.token : "";
    config.headers['token'] = token;
    return config;
}, function (error) {
    // Do something with request error 请求失败的提示
    offline("请求失败，网络异常")
    return Promise.reject(error);
});

//response 响应完成的拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data 成功的响应
    console.log(response);

    if (response.data.code == "3000") {
        //跳转登录
        history.push("/login");

    }


    // type  不存在 success
    // type=0  fail
    // type=1 success
      if(!!response.data.type){
        success(response.data.msg);
      }else{
        if(response.data.type==0){
            failToast(response.data.msg)
        }else{
          success(response.data.msg);
        }
      }
    return response;
}, function (error) {
    // Do something with response error 失败的响应
    failToast("响应失败,服务器异常")
    return Promise.reject(error);
});

export { axios, baseURL }