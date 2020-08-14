/* 构建相关 */
// 开发环境 'development' 
// 测试环境 'testing' 
// 生产环境 'production' 
export const ENV = process.env.CONFIG_ENV // 当前环境

let URL = {
  development: 'https://api-hszy-test.91kuiayigou.cn',
  testing: 'https://test.com',
  production: 'https://prod.com'
}

export const API_ORIGIN = URL[ENV]