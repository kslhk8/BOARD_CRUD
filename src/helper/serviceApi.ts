import axios, { AxiosPromise, AxiosResponse, AxiosError } from "axios"
const serviceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {},
  timeout: 60000,
})

serviceApi.interceptors.request.use(
  (config) => {
    return config
  },
  (error: AxiosError) => {
    return error
  }
)

serviceApi.interceptors.response.use(

  async (response) => {
    return response
  },
  async (error: AxiosError) => {
    console.log('error', error)
    // response error
    // 404
    // go 404page
    // 500
    // go 500 page
    // if (error.message === "Network Error") {
    //   // router.push('/500')
    //   window.location.href = '/maintainance'
    // }
    // if (error?.response?.status === 404) {
    //   window.location.href = '/404'

    // }

    return error
  }
)

type serviceApiError = AxiosError

export default serviceApi
export type { AxiosPromise, AxiosResponse, serviceApiError }
