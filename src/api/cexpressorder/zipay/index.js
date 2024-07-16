import request from '@/utils/request'


export function del(id) {
  return request({
    url: ` /fcRecharge/delete?id=${id}` ,
    method: 'get',
  })
}

export function initData(data) {
  return request({
    url: '/fcRecharge/list',
    method: 'get',
    data: {
      ...data,
      pageNo: data.page,
      pageSize: data.size
    }
  })
}


export default { del, initData }
