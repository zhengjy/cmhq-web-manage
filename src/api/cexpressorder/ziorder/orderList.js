import request from '@/utils/request'

export function queryCourierTrack(id) {
  return request({
    url: `/courierOrder/queryCourierTrack?id=${id}`,
    method: 'get',
  })
}
export function updateState(id) {
  return request({
    url: `/courierOrder/updateState?id=${id}`,
    method: 'get',
  })
}


export default { queryCourierTrack, updateState }
