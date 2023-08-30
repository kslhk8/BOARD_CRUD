import { useQuery, useQueryClient } from "@tanstack/react-query"
import { redirect } from "next/dist/server/api-utils"
import { useCallback } from "react"
import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"

/* TODO: required, optional check */
/*
 * BoardItemType
 * response data
 */
type BoardItemType = {
  id: number
  title?: string
  content?: string
  date: string
}

/*
 * ResponseType
 * status: 200, 또는 기타 코드
 *
 */

type ResponseType = { status: number } & {
  data: BoardItemType[]
}

type ResponseDataType = BoardItemType[]
const INIT_DATA = <BoardItemType[]>[]

const requestApi = async (): Promise<ResponseType> =>
  serviceApi.get(API_CONST.BOARD)

export const queryFn = async () => {
  const { data, status } = await requestApi()
  if (!data) {
    return INIT_DATA
  }
  if (status !== 200) {
    return INIT_DATA
  }
  return data
}

const useGetItems = () => {
  const queryClient = useQueryClient()
  const queryKey = [API_CONST.BOARD]

  const onError = useCallback(
    (error: serviceApiError) => {
      queryClient.setQueryData([queryKey], INIT_DATA)
    },
    [queryClient, queryKey]
  )
  return useQuery<ResponseDataType, serviceApiError>(queryKey, queryFn, {
    enabled: !!queryKey,
    refetchOnWindowFocus: false,
    placeholderData: INIT_DATA,
    initialData: INIT_DATA,
    onError,
  })
}

export default useGetItems
export type { BoardItemType }
