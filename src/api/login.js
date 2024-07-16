import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid,
      platform: window.location.href.includes('b.ahjttd') ? 'admin' : 'company'
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'auth/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}
