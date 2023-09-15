import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { toastMessage } from "~/components/Toast"
import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"
/** API 응답 데이터 타입 */
type ResponseDataType = {
  title: string
  content: string
  id: number
  date: string
  userId: string
}
/** API 응답 타입 */
type ResponseType = { status: number } & { data: ResponseDataType }

type PostItemParamType = {
  title: string
  content: string
  date: string
  userId: string
}
/** 게시글 등록 호출기 */
const requestApi = async (params: PostItemParamType): Promise<ResponseType> =>
  serviceApi.post(API_CONST.BOARD, params)

const usePostItem = () => {
  return useMutation(async (params: PostItemParamType) => requestApi(params), {
    onSuccess: useCallback(async ({ data }: ResponseType) => {
      if (!data) {
        return
      }
      return data
    }, []),
    onError: useCallback((error: serviceApiError) => {
      toastMessage("failure", "오류가 발생하여 실패하였습니다.")
      return error
    }, []),
  })
}

export default usePostItem
export type { PostItemParamType }
