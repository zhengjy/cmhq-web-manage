import request from '@/utils/request'

export function add(data) {
  delete data.id;
  return request({
    url: '/ziaddress/edit',
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
    url: `/ziaddress/delete?id=${id}` ,
    method: 'get',
  })
}

export function edit(data) {
  return request({
    url: '/ziaddress/edit',
    method: 'post',
    data
  })
}

export function initData(data) {
  return request({
    url: '/ziaddress/list',
    method: 'get',
    data: {
      ...data,
      pageNo: data.page,
      pageSize: size
    }
  })
}


export default { delAll, edit, del, add, }
