import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"
type ResponseDataType = {
    title: string
    content: string
    date: string
    id: number
}

type ResponseType = { status: number } & { data: ResponseDataType }

type UpdateItemParamType = {
    title: string
    content: string
    date: string
    id: number
}
const useUpdateItem = () => {
    // toast hook
    // 기타 전역변수 건드리는 hook
    return useMutation(
        async (params: UpdateItemParamType) =>
            serviceApi.patch(API_CONST.BOARD_UPDATE(params.id), params),
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

export default useUpdateItem
export type { UpdateItemParamType }