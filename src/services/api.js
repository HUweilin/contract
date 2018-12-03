import axios from 'axios'
import userSer from './userService.js'
import notSignedSer from './notSignedService.js'
import contractSer from './contractService.js'
import contractRecordSer from './contractRecordService.js'
import brandSer from './brandService.js'
import regionSer from './regionService.js'

// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'http://192.168.1.4:11040/api'

// 登录模块
export const userService = userSer
// 客户模块
export const notSignedService = notSignedSer
// 合同模块
export const contractService = contractSer
// 合同记录模块
export const contractRecordService = contractRecordSer
// 品牌
export const brandService = brandSer
// 地区
export const regionService = regionSer
