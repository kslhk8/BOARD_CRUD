import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"

type ResponseDataType = { title: string, content: string, id: number, date: string }
type ResponseType = { status: number } & { data: ResponseDataType }
type PostItemParamType = {
  title: string
  content: string,
  date: string
}

const usePostItem = () => {
  // toast hook
  // 기타 전역변수 건드리는 hook
  return useMutation(
    async (params: PostItemParamType) =>
      serviceApi.post(API_CONST.BOARD, params),
    {
      onSuccess: useCallback(async ({ data }: ResponseType) => {
        if (!data) {
          return
        }
        return data
      }, []),
      onError: useCallback((error: serviceApiError) => {
        /* TODO: toast 예외처리 연결 */
        console.error(error)
      }, []),
    }
  )
}

export default usePostItem
export type { PostItemParamType }
