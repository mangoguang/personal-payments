import axios from '@/utils/axios'

// 新增订单
const fetchAddOrder = (params) => axios('post', '/v1/order', params)

// 新增订单
const fetchDelOrder = (id) => axios('delete', `/v1/order/${id}`)

// 订单列表
const fetchOrderList = (params) => axios('post', '/v1/order/list', params)

export {
  fetchAddOrder,
  fetchDelOrder,
  fetchOrderList
}
