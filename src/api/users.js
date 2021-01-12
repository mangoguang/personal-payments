import axios from '@/utils/axios'

// 检测用户是否存在
const fetchUserCheck = (userName) => axios('get', `/v1/users/check/${userName}`)

// 获取用户信息
const fetchUserInfo = (id) => axios('get', `/v1/users/${id}`)

// 获取用户收支信息
const fetchPayInfo = () => axios('post', '/v1/users/payInfo')

// 根据jsCode获取用户信息
const fetchGetUserInfoByCode = (params) => axios('post', '/v1/users/getUserInfoByCode', params)

// 创建用户
const fetchCreateUserByCode = (params) => axios('post', '/v1/users/createUserByCode', params)

export {
  fetchUserInfo,
  fetchUserCheck,
  fetchPayInfo,
  fetchGetUserInfoByCode,
  fetchCreateUserByCode
}
