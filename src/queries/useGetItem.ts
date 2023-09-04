import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"
import { BoardItemType } from "./useGetItems"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"

/** API 응답 타입 */
type ResponseType = { status: number } & {
  data: BoardItemType
}
/** 게시글 기초 데이터 */
const INIT_DATA = <BoardItemType>{}
/** 게시글 조회용 호출기 */
const requestApi = async (id: number): Promise<ResponseType> =>
  serviceApi.get(API_CONST.BOARD_DETAIL(id))
/**
 * 게시글 조회 후 데이터 반환기
 * @returns {BoardItemType} 조회된 게시글 정보
 */
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
  const queryKey = useMemo(() => [API_CONST.BOARD_DETAIL(id)], [id])

  const onError = useCallback(
    (error: serviceApiError) => {
      queryClient.setQueryData([queryKey], INIT_DATA)
      return error
    },
    [queryClient, queryKey]
  )
  return useQuery<BoardItemType, serviceApiError>(queryKey, () => queryFn(id), {
    enabled: !!queryKey,
    refetchOnWindowFocus: false,
    placeholderData: INIT_DATA,
    initialData: INIT_DATA,
    onError,
    staleTime: 0,
  })
}

export default useGetItem
