import request from '@/utils/request'

export function add(data) {
  delete data.id;
  return request({
    url: '/company/edit',
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
    url: `/company/delete?id=${id}` ,
    method: 'get',
  })
}

export function edit(data) {
  return request({
    url: '/company/edit',
    method: 'post',
    data
  })
}

export function initData(data) {
  return request({
    url: '/company/list',
    method: 'get',
    data: {
      ...data,
      pageNo: data.page,
      pageSize: size
    }
  })
}

export function getFauserList(data) {
  return request({
    url: '/fauser/list',
    method: 'get',
    params:data
  })
}

export default { delAll, edit, del, add, getFauserList }
