import axios, { wechatUpload } from '@/utils/axios'

// 登录
const fetchLogin = (params) => axios('get', `/login/${params.userName}?password=${params.password}&uuid=${params.uuid}`)

// 获取数据字典列表
const fetchDictList = (dictType) => axios('get', `/v1/dict/list/${dictType}`)

// 新增数据字典
const fetchAddDict = (params) => axios('post', '/v1/dict', params)

// 删除数据字典
const fetchDelDict = (dictCode) => axios('delete', `/v1/dict/${dictCode}`)

// 文件上传
// const fetchFileUpload = (params) => axios('post', '/v1/file', params)
const fetchFileUpload = (filePath) => wechatUpload('/v1/file', filePath)

export {
  fetchLogin,
  fetchDictList,
  fetchAddDict,
  fetchDelDict,
  fetchFileUpload
}
