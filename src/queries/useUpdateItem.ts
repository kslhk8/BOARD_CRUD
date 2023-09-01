import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { toastMessage } from "~/components/Toast"
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
                toastMessage('failure', '오류가 발생하여 실패하였습니다.');
            }, []),
        }
    )
}

export default useUpdateItem
export type { UpdateItemParamType }
