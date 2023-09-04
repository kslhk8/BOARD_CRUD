import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { API_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"

type BoardItemType = {
  id: number
  title: string
  content: string
  date: string
}
/** API 응답 타입 */
type ResponseType = { status: number } & {
  data: BoardItemType[]
}
/** API 응답 데이터 타입 */
type ResponseDataType = BoardItemType[]
/** 게시판 목록 기초 데이터 */
const INIT_DATA = <BoardItemType[]>[]
/** 게시판 목록 조회용 호출기 */
const requestApi = async (): Promise<ResponseType> =>
  serviceApi.get(API_CONST.BOARD)
/**
 * 게시판 목록 조회 후 데이터 반환기
 * @returns {BoardItemType[]} 조회된 게시판 목록 정보
 */
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
  const queryKey = useMemo(() => [API_CONST.BOARD], [])

  const onError = useCallback(
    (error: serviceApiError) => {
      queryClient.setQueryData([queryKey], INIT_DATA)
      return error
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
export { INIT_DATA as BoardListInitData }
