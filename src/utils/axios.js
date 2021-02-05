import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
import { localstorageKeys } from '@/utils/constants'

Vue.use(Toast)

axios.defaults.timeout = 60000 * 1 // 请求超时时间，默认5分钟
const API = 'http://localhost:7001/api'
// const API = 'https://mangoguang.cn/api'
// let baseLoadingConfig = {
//   lock: true,
//   fullscreen: true,
//   spinner: 'el-icon-loading',
//   background: 'rgba(255, 255, 255, 0.6)',
//   customClass: 'wms-loading'
// }

axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.url,
      method: config.method,
      header: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: wx.getStorageSync(localstorageKeys.TOKEN) || '' // 单独添加请求接口获取token操作，处理登录后再次提示登录问题
      },
      data: config.data,
      success: (res) => {
        return resolve(res)
      },
      fail: (err) => {
        return reject(err)
      }
    })
  })
}

// 添加响应拦截器
axios.interceptors.response.use(response => {
  if (response.data.result === false) Toast.fail(response.data.message)
  return response
}, error => {
  const status = error.response.status
  const data = error.response.data
  Toast.fail(data.message)
  switch (status) {
    case 401:
      Toast.fail(data.message)
      break
    case 404:
      Toast.fail(data.message)
      break
    default:
      break
  }
  setTimeout(() => {
    window.location.href = '/login'
  }, 600)
  return Promise.reject(error)
})

export default (
  type = 'get',
  url,
  params = {},
  options = {}
) => {
  return new Promise((resolve, reject) => {
    type = type.toLocaleLowerCase()
    // let loading = {
    //   show: false,
    //   // ...baseLoadingConfig,
    //   ...options.loading
    // }
    const baseUrl = options.baseUrl || API
    const config = {
      method: type,
      url: `${baseUrl}${url}`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: wx.getStorageSync(localstorageKeys.TOKEN) || '' // 单独添加请求接口获取token操作，处理登录后再次提示登录问题
      }
      // ...options.config
    }

    if (type === 'get') {
      config.params = params
    } else {
      config.data = params
    }
    // if (loading.show) {
    //   if (timer) clearTimeout(timer)
    //   loadingInstance && loadingInstance.close()
    //   loadingInstance = Loading.service(loading)
    // }
    axios(config).then(res => {
      // if (loading.show) {
      //   timer = setTimeout(() => {
      //     loadingInstance && loadingInstance.close()
      //   }, 300)
      // }
      // 如果返回是文件流，则把整个response信息返回进行处理
      if (options.resolveResponse) {
        resolve(res.data.data)
      }
      // 普通接口数据处理
      if (res.data.result === false) reject(res.data)
      else resolve(res.data.data)
    }).catch(error => {
      // if (loading.show) {
      //   timer = setTimeout(() => {
      //     loadingInstance && loadingInstance.close()
      //   }, 300)
      // }
      reject(error)
    })
  })
}

const wechatUpload = (url, filePath) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${API}${url}`,
      filePath: filePath,
      name: 'file',
      header: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: wx.getStorageSync(localstorageKeys.TOKEN) || '' // 单独添加请求接口获取token操作，处理登录后再次提示登录问题
      },
      success (res) {
        resolve(res)
      },
      fail (error) {
        reject(error)
      }
    })
  })
}

export { wechatUpload }
