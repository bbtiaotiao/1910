
// 路由懒加载 
import React from "react";
import Loadable from "react-loadable";
// import {Toast} from "antd-mobile";


//通用的loading组件

const loadingComponent=()=>{
    // Toast.loading("lkoading...",1,()=>{
    //     console.log("load complete")
    // })
    return (
        <div>
            loading
        </div>
    )
}

//loading 组件 通用的 如果传入loading 有动画
export default (loader,loading=loadingComponent)=>{
    return Loadable({
        loader,  //需要懒加载的组件
        loading
    })
}
