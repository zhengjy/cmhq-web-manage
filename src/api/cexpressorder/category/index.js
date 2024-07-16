import request from '@/utils/request'

export function add(data) {
  delete data.id;
  return request({
    url: '/product/edit',
    method: 'post',
    data
  })
}
export function delAll(data) {
  return request({
    url: 'api/database',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/product/delete?id=${id}` ,
    method: 'get',
  })
}

export function edit(data) {
  return request({
    url: '/product/edit',
    method: 'post',
    data
  })
}



export default { delAll, edit, del, add, }
