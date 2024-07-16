import request from '@/utils/request'

export function getCourierFreightCharge(data) {
  return request({
    url: '/courierOrder/getCourierFreightCharge',
    method: 'post',
    data
  })
}

export function addressAnalysis(data) {
  return request({
    url: '/courierOrder/addressAnalysis',
    method: 'get',
    params: data
  })
}

export function getShareUrlAdd(data) {
  return request({
    url: '/courierOrder/getOrderNoCompanyIdUserId',
    method: 'get',
    params: data
  })
}

export function getAddressList(data) {
  return request({
    url: '/ziaddress/list',
    method: 'get',
    params: data
  })
}


export function createCourierOrder(data) {
  return request({
    url: '/courierOrder/create',
    method: 'post',
    data
  })
}

export function batchCreateCourierOrder(data) {
  return request({
    url: '/courierOrder/batchCreate',
    method: 'post',
    data
  })
}


// 分享新增
export function createShareCourierOrder(data) {
  return request({
    url: '/courierOrder/shareCreate',
    method: 'post',
    data
  })
}


export function checkSharelist(data) {
  return request({
    url: '/courierOrder/sharelist',
    method: 'get',
    params: data
  })
}
// export function upload(api, file) {
//   var data = new FormData()
//   data.append('file', file)
//   const config = {
//     headers: { 'Authorization': getToken() }
//   }
//   return axios.post(api, data, config)
// }

export function getCurrentCompany() {
  return request({
    url: '/company/currentCompany',
    method: 'get'
  })
}

export function getCategoryList(data) {
  return request({
    url: '/product/list',
    method: 'get',
    params: data
  })
}


//  根据订单号查询订单是否已付款
export function getSelectOrderPayByOrderNot(data) {
  return request({
    url: '/courierOrder/selectOrderPayByOrderNo',
    method: 'get',
    params: data
  })
}

// 更新收货时间
export function updateGoodTime(data) {
  return request({
    url: '/courierOrder/updateGoodTime',
    method: 'post',
    params:data
  })
}

// 根据id号查询订单
export function selectOrderByOrderNo(data) {
  return request({
    url: '/courierOrder/selectOrderByOrderNo',
    method: 'get',
    params: data
  })
}

// 付款
export function toAliPayPcNew(data) {
  return request({
    url: '/external/aliPay/toPayAsPC2',
    data,
    method: 'post'
  })
}
