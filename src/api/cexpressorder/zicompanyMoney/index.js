import request from '@/utils/request'


export function del(id) {
  return request({
    url: `/companyMoney/list?id=${id}` ,
    method: 'get',
  })
}


export function initData(data) {
  return request({
    url: '/companyMoney/list',
    method: 'get',
    data: {
      ...data,
      pageNo: data.page,
      pageSize: data.size
    }
  })
}


export default { delAll, del }
