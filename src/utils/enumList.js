import dayjs from 'dayjs'
import utils from '@/utils/index'

const enumList = {
  signKey: 'dhTnzZjrmI8bGPG3',//签名key
  phoneLoginSignKey: '6Xn_w]e4uf',//手机验证码签名key
  currTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),//当前时间
  sId: utils.randomString(8),//
  appType: 1,//应用类型
  regexpList: {
    mobilePhoneReg: /^\d{11}$/,
    mobileCodeReg: /^\d{6}$/
  }
}

export default enumList