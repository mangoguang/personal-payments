/**
 * 传给后端日期格式化
 * @param {*} date 传入日期
 * @param {*} fmt 显示格式
 * reutrn fmt时间格式
 */
export const sendDateTime = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!date) return
  // if (fmt === 'yyyy-MM-dd') {
  //   date = `${dateFormat(date)} 23:59:59`
  // } else {
  //   date = dateFormat(date, 'yyyy-MM-dd hh:mm:ss')
  // }
  date = dateFormat(date, 'yyyy-MM-dd hh:mm:ss')
  const timestamp = new Date(date).getTime()
  const zone = 8
  const timeDiff = (8 - zone) * 3600 * 1000
  console.log('初始化数据')
  return dateFormat(timestamp + timeDiff, fmt)
}

/**
 * 时间格式化函数
 * @param {*} date 传入日期
 * @param {*} fmt 显示格式
 */
export const dateFormat = (date, fmt = 'yyyy-MM-dd') => {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = date.split('+')[0]
    date = date.replace(/T/g, ' ').replace(/-/g, '/')
    date = new Date(date)
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  var week = { // 星期
    0: '\u65e5',
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
