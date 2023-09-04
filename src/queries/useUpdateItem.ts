import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { toastMessage } from "~/components/Toast"
import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"
/** API 응답 데이터 타입 */
type ResponseDataType = {
  title: string
  content: string
  date: string
  id: number
}
/** API 응답 타입 */
type ResponseType = { status: number } & { data: ResponseDataType }

type UpdateItemParamType = {
  title: string
  content: string
  date: string
  id: number
}

/** 게시글 업데이트 호출기 */
const requestApi = async (params: UpdateItemParamType): Promise<ResponseType> =>
  serviceApi.patch(API_CONST.BOARD_UPDATE(params.id), params)

const useUpdateItem = () => {
  return useMutation(
    async (params: UpdateItemParamType) => requestApi(params),
    {
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
    }
  )
}

export default useUpdateItem
export type { UpdateItemParamType }
