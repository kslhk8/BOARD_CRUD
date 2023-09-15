import axios, { AxiosPromise, AxiosResponse, AxiosError } from "axios"
import { HEADER_CONST } from "~/constants/apiConst"
import { PATH_CONST } from "~/constants/pathConst"
import { getCookie, deleteCookie } from "cookies-next"
const serviceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: { [HEADER_CONST.CONTENT_TYPE]: HEADER_CONST.APPLICATION_JSON },
  timeout: 60000,
})
serviceApi.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken")
    if (!config.headers.Authorization && token) {
      config.headers.Authorization = `Bearer ${token}`
    }
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
    if (error?.response?.status === 401) {
      if ((error?.response?.data + "").includes("expired")) {
        deleteCookie("accessToken", { path: "/" })
      }
      if (typeof window !== undefined) window.location.href = PATH_CONST.LOGIN
    }
    if (error.message === "Network Error") {
      if (typeof window !== undefined)
        window.location.href = PATH_CONST.MAINTAINANCE
    }
    if (error?.response?.status === 404) {
      if (typeof window !== undefined)
        window.location.href = PATH_CONST.NOT_FOUND
    }

    return error
  }
)

type serviceApiError = AxiosError

export default serviceApi
export type { AxiosPromise, AxiosResponse, serviceApiError }
