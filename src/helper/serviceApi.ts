import axios, { AxiosPromise, AxiosResponse, AxiosError } from "axios"
import { redirect, useRouter } from "next/navigation"
import { HEADER_CONST } from "~/constants/apiConst"
import { PATH_CONST } from "~/constants/pathConst"
const serviceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: { [HEADER_CONST.CONTENT_TYPE]: HEADER_CONST.APPLICATION_JSON }
  , timeout: 60000,
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
    if (error.message === "Network Error") {
      if (typeof window !== undefined) window.location.href = PATH_CONST.MAINTAINANCE
    }
    // go 404page
    if (error?.response?.status === 404) {
      if (typeof window !== undefined) window.location.href = PATH_CONST.NOT_FOUND
    }

    return error
  }
)

type serviceApiError = AxiosError

export default serviceApi
export type { AxiosPromise, AxiosResponse, serviceApiError }
