import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"

const useDeleteItem = () => {
    // toast hook
    // 기타 전역변수 건드리는 hook
    return useMutation(
        async (id: number) =>
            serviceApi.delete(API_CONST.BOARD_DELETE(id)),
        {
            onSuccess: useCallback(async () => {
                return;
            }, []),
            onError: useCallback((error: serviceApiError) => {
                /* TODO: toast 예외처리 연결 */
                console.error(error)
            }, []),
        }
    )
}

export default useDeleteItem
