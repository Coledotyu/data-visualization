import {stringify} from 'qs'
import config from '../config'
const {baseUrl, timeout} = config
const request = (url, method = 'GET', params = {}) => {
  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: timeout,
    // credentials: 'include',
    body: JSON.stringify(params)
  }
  let querystring = ''
  if (method.toUpperCase() === 'GET') {
    delete options.body
    // delete params._csrf
    if (Object.keys(params).length > 0) {
      querystring = `?${stringify(params)}`
    }
  }
  const requestUrl = `${url}${querystring}`
  return fetch(requestUrl, options)
    .then(res => {
      return res.json()
    })
}
const get = (url, query) => {
  return request(url, 'GET', query)
}
const post = (url, body) => {
  return request(url, 'POST', body)
}
const put = (url, body) => {
  return request(url, 'PUT', body)
}
const destroy = (url, body) => {
  return request(url, 'DELETE', body)
}
export {
  get,
  post,
  put,
  destroy
}
export default request
