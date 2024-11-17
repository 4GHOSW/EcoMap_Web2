import axios, { AxiosRequestConfig } from 'axios'

export interface IResponse<T = {}> {
  code: number
  message: string
  data: T
}

const TIMEOUT = 10 * 30 * 1000

const tmapAPI = async (method: string, url: string, params: object, options: any = {}) => {
  const instance = axios.create()

  // 옵션 기본 값은 *로 강조
  instance.defaults.baseURL = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_CLIENT_API_SERVER : process.env.NEXT_PUBLIC_SERVER_API_SERVER
  instance.defaults.timeout = TIMEOUT
  instance.defaults.headers.common['Content-Type'] = 'application/json'
  instance.defaults.headers.common['Accept'] = 'application/json'

  let configs: AxiosRequestConfig = { method: method, url: url, data: params }
  if (options.hasOwnProperty('timeout')) instance.defaults.timeout = options['timeout']
  if (options.hasOwnProperty('Content-Type')) instance.defaults.headers.common['Content-Type'] = options['Content-Type']
  if (options.hasOwnProperty('Accept')) instance.defaults.headers.common['Accept'] = options['Accept']
  if (options.hasOwnProperty('abortController')) configs['signal'] = options.abortController.signal
  if (options.hasOwnProperty('cancelToken')) configs['cancelToken'] = options.cancelToken
  if (options.hasOwnProperty('onUploadProgress')) configs['onUploadProgress'] = options.onUploadProgress
  if (options.hasOwnProperty('onDownloadProgress')) configs['onDownloadProgress'] = options.onDownloadProgress
  if (options.hasOwnProperty('responseType')) configs['responseType'] = options.responseType

  instance.defaults.headers.common['appKey'] = process.env.NEXT_PUBLIC_TMAP_API_KEY

  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.message === 'canceled') return Promise.reject(error)
      return Promise.reject(error)
    },
  )

  return await instance(configs)
}

export default tmapAPI
