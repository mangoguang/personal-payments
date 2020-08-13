import axios from '@/utils/axios'

// 检测用户是否存在
const fetchUserCheck = (userName) => axios('get', `/v1/users/check/${userName}`)

// 获取用户信息
const fetchUserInfo = (id) => axios('get', `/v1/users/${id}`)

// 获取用户收支信息
const fetchPayInfo = () => axios('post', '/v1/users/payInfo')

export {
  fetchUserInfo,
  fetchUserCheck,
  fetchPayInfo
}
