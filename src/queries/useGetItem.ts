import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"
import { BoardItemType } from "./useGetItems"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

type ResponseType = { status: number } & {
    data: BoardItemType
}
const INIT_DATA = <BoardItemType>{}

const requestApi = async (id: number): Promise<ResponseType> =>
    serviceApi.get(API_CONST.BOARD_DETAIL(id))


export const queryFn = async (id: number) => {
    const { data, status } = await requestApi(id)

    if (!data) {
        return INIT_DATA
    }

    if (status !== 200) {
        return INIT_DATA
    }
    return data
}
const useGetItem = (id: number) => {
    const queryClient = useQueryClient()
    const queryKey = [API_CONST.BOARD_DETAIL(id)]

    const onError = useCallback(
        (error: serviceApiError) => {
            console.log('erorr', error)
            // 요기 예외처리
            queryClient.setQueryData([queryKey], INIT_DATA)
        },
        [queryClient, queryKey]
    )
    return useQuery<BoardItemType, serviceApiError>(queryKey, () => queryFn(id), {
        enabled: !!queryKey,
        refetchOnWindowFocus: false,
        placeholderData: INIT_DATA,
        initialData: INIT_DATA,
        onError,
    })
}

export default useGetItem
