import request from '@/utils/request'


export function toCancel(data) {
  return request({
    url: '/courierOrder/updateState',
    method: 'get',
    params: data
  })
}

export function del(id) {
  return request({
    url: `/courierOrder/delete?id=${id}` ,
    method: 'get',
  })
}

export function delAll(data) {
  return request({
    url: '/courierOrder/delete',
    method: 'post',
    data
  })
}

export default { toCancel, del, delAll}
