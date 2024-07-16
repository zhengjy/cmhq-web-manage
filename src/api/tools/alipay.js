import request from '@/utils/request'

export function get() {
  return request({
    url: 'api/aliPay',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'api/aliPay',
    data,
    method: 'put'
  })
}

// 支付
export function toAliPay(url, data) {
  return request({
    url: 'api/' + url,
    data,
    method: 'post'
  })
}

export function getCurrentCompany() {
  return request({
    url: '/company/currentCompany',
    method: 'get'
  })
}



export function toAliPayPcNew(data) {
  return request({
    url: '/external/aliPay/toPayAsPC',
    data,
    method: 'post'
  })
}

