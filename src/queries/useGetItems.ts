import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosHeaders } from "axios"
import { useCallback, useMemo } from "react"
import { API_CONST, PAGINATION_CONST } from "~/constants/apiConst"
import serviceApi, { serviceApiError } from "~/helper/serviceApi"
type BoardItemType = {
  id: number
  title: string
  content: string
  date: string
  userId: string
}
/** API 응답 타입 */
type ResponseType = { headers: AxiosHeaders } & { status: number } & {
  data: BoardItemType[]
}
/** API 응답 데이터 타입 */
type ResponseDataType = {
  totalPage: number
  data: BoardItemType[]
}
/** 게시판 목록 기초 데이터 */
const INIT_DATA = { totalPage: 0, data: <BoardItemType[]>[] }
/** 게시판 목록 조회용 호출기 */
const requestApi = async (page: number): Promise<ResponseType> =>
  serviceApi.get(
    `${API_CONST.BOARD}?_page=${page}&_limit=${PAGINATION_CONST.LIMIT}`
  )
/**
 * 게시판 목록 조회 후 데이터 반환기
 * @returns {BoardItemType[]} 조회된 게시판 목록 정보
 */
export const queryFn = async (page: number) => {
  const { headers, status, data } = await requestApi(page)
  const item = {
    totalPage:
      Math.ceil(
        Number(headers.get("X-Total-Count")) / PAGINATION_CONST.LIMIT
      ) || 0,
    data,
  }
  if (!data) {
    return INIT_DATA
  }
  if (status !== 200) {
    return INIT_DATA
  }
  return item
}

const useGetItems = (page: number) => {
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => [API_CONST.BOARD, page], [page])

  const onError = useCallback(
    (error: serviceApiError) => {
      queryClient.setQueryData([queryKey], INIT_DATA)
      return error
    },
    [queryClient, queryKey]
  )
  return useQuery<ResponseDataType, serviceApiError>(
    queryKey,
    () => queryFn(page),
    {
      enabled: !!queryKey,
      refetchOnWindowFocus: false,
      placeholderData: INIT_DATA,
      initialData: INIT_DATA,
      onError,
    }
  )
}

export default useGetItems
export type { BoardItemType }
export { INIT_DATA as BoardListInitData }
