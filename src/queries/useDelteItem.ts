import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { toastMessage } from "~/components/Toast"
import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"
/** 게시글 삭제 호출기 */
const requestApi = (id: number) => serviceApi.delete(API_CONST.BOARD_DELETE(id))

const useDeleteItem = () => {
  return useMutation(async (id: number) => requestApi(id), {
    onSuccess: useCallback(async () => {
      return
    }, []),
    onError: useCallback((error: serviceApiError) => {
      toastMessage("failure", "오류가 발생하여 실패하였습니다.")
      return error
    }, []),
  })
}

export default useDeleteItem
