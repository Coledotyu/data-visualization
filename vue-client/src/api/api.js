import axios from 'axios'
import config from '../config'

const instance = axios.create({
	baseURL: config.baseUrl
}) 

export const requestLogin = params => { return axios.post('/login', params).then(res => res.data) }

export const getWordListPage = params => { return instance.get('filterword/fetchAll', { params: params }) }

export const removefilterWord = params => { return instance.delete('filterword/remove', { data: params }) }

export const createfilterWord = params => { return instance.put('filterword/create', params) }

export const getWordFreqList = params => { return instance.get('fetchAll/wordlist', { params: params }) }

export const getKeywordList = params => { return instance.get('search/keywordList', { params: params }) }

export const searchFilterWord = params => { return instance.get('filterword/searchOne', { params: params }) }

export const createResource = params => { return instance.put('resource/upload', params) }

export const getResourceList = params => { return instance.get('resource/fetchList', { params: params }) }
