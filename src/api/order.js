import axios from '@/utils/axios'

// 新增订单
const fetchAddOrder = (params) => axios('post', '/v1/order', params)

// 删除订单
const fetchDelOrder = (id) => axios('delete', `/v1/order/${id}`)

// 更新订单
const fetchUpdateOrder = (id, params) => axios('put', `/v1/order/${id}`, params)

// 获取订单详情
const fetchOrderDetail = (id) => axios('get', `/v1/order/${id}`)

// 订单列表
const fetchOrderList = (params) => axios('post', '/v1/order/list', params)

export {
  fetchAddOrder,
  fetchDelOrder,
  fetchUpdateOrder,
  fetchOrderDetail,
  fetchOrderList
}
