import Taro from '@tarojs/taro'
import enumList from '@/utils/enumList'
import md5 from 'js-md5'
import store from '@/store'
import { API_ORIGIN } from './baseUrl'

// 添加拦截器
// Taro.addInterceptor(Taro.interceptors.logInterceptor)

function showErrorMsg(message = '活动太火爆，请稍后再试~~') {
  setTimeout(() => {
    Taro.showToast({
      title: message,
      icon: 'none',
      duration: 2500,
    })
  }, 32)
}

/**
 * http 请求
 * @param{String} method: http method
 * @param{String} path: 地址路径
 * @param{Object} data: 请求参数
 * @param{Object} options: 其它配置
 * @returns{Promise}
 */

const $fetch = (path, data = {}, options = { loadingOps: { loading: true, loadingText: '加载中...' } }) => {

  if (data.constructor !== Object) return showErrorMsg('参数非法')
  if (options.constructor !== Object) return showErrorMsg('配置非法')

  const ops = {
    url: API_ORIGIN + path,
    data,
    method: options.method ? options.method : 'POST',
    dataType: 'json',
    header: {
      timestamp: enumList.currTime,
      sId: enumList.sId,
      sign: md5(`timestamp=${enumList.currTime}&sId=${enumList.sId}&apiKey=${enumList.signKey}`).slice(3, 13),
      appType: enumList.appType,
      authentication: store.loginFlow.userId,
      userId: store.loginFlow.userId,
      ...options.header,
    },
  }
  return new Promise((resolve, reject) => {

    if (options.loadingOps.loading) Taro.showLoading({ title: options.loadingOps.loadingText, mask: true })

    Taro.request(ops)
      .then((res) => {
        Taro.hideLoading()
        if (process.env.CONFIG_ENV !== 'production') console.warn(ops, res)
        if (res.data.status !== 200) {
          showErrorMsg(res.data.msg)
          reject(res || {})
        }
        resolve(res.data || {})
      })
      .catch((err) => {
        Taro.hideLoading()
        showErrorMsg()
        reject(err || {})
      })
  })
}

export default $fetch
export { default as $api } from './api'




