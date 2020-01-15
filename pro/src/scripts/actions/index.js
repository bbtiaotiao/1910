import {axios} from "&";
import {history} from "&";

export async function register({url,params}){
    console.log(params);
    const res = await axios.post(url,params);
    console.log(res.data)
        if(res.data.type==1){
            history.push("/login");
        }
    return {
        type:"register",
        payload:res,
    }
}


export async function login({url,params}){
    const res=await axios.post(url,params);
    if(res.data.type==1){
        // sessionStorage.usertype = res.data.result.usertype;
        // history.push("/home");
    }
    return {
        type:"login",
        payload:res
    }
}


export async function userInfo({url,params}){
    const res=await axios.post(url,params);
    return {
        type:"userInfo",
        payload:res
    }
}


export async function getUserInfo({url,params}){
    const res=await axios.post(url,params); 
    return {
        type:"getUserInfo",
        payload:res.data.result
    }
}

export async function addMyDate({url,params}){
    const res=await axios.post(url,params); 
    return {
        type:"addMyDate",
        payload:res.data.result
    }
}

export async function updateMyDate({url,params}){
    const res=await axios.post(url,params); 
    return {
        type:"updateMyDate",
        payload:res.data.result
    }
}









