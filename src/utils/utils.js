// http请求参数处理
export function httpQueryString (queryParams) {
  let queryString = ''
  let val
  for (let key in queryParams) {
    val = queryParams[key]
    if (typeof val === 'object') {
      val = JSON.stringify(queryParams[key])
    }
    queryString += `&${key}=${val}`
  }
  return queryString.substr(1)
}
// 日期格式处理
export function processDateString (date) {
  if (!date) {
    return ''
  }
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  let min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  let second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hour}:${min}:${second}`
}
