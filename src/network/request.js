import axios from 'axios'

export function request(config) {
    // 创建实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000/api/h8',
        timeout: 3000
    })

    // axios的请求拦截器
    // 为什么要请求拦截器？拦截器的作用：
    // 1.config中的的一些信息不符合服务器的要求 
    // 2.每次发送网络请求时，都希望在界面中显示一个请求的图标
    // 3.某些网络请求(登录(token))，必须携带一些特殊信息
    instance.interceptors.request.use(config => {
        // console.log(config)
        return config
    }, err => {
        console.log(err)
    })

    // 响应拦截器
    instance.interceptors.response.use(res => {
        // console.log(res)
        return res.data
    }, err => {
        console.log(err)
    })

    // 发送网络请求,返回的就是一个promise
    return instance(config)
}