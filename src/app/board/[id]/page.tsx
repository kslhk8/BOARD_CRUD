import { dehydrate, Hydrate } from "@tanstack/react-query"
import getQueryClient from "~/helper/getQueryClient"
import Board from "./board"
import { API_CONST } from "~/constants/apiConst"
import { queryFn } from "~/queries/useGetItem"
import { BoardItemType } from "~/queries/useGetItems"
import { redirect } from "next/navigation"
import { BOARD_PATH_CONST } from "~/constants/pathConst"

export default async function HydratedBoard({
  params,
}: {
  params: { id: number }
}) {
  const id = Number(params.id)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: [API_CONST.BOARD_DETAIL(id)],
    queryFn: () => queryFn(id),
    staleTime: 0,
  })
  const getBoardItem = () =>
    queryClient.getQueryData<BoardItemType>([API_CONST.BOARD_DETAIL(id)])
  console.log("getBoardItem", getBoardItem())
  if (!getBoardItem()?.id) {
    // redirect(BOARD_PATH_CONST.BOARD_LIST)
  }
  const dehydratedState = dehydrate(queryClient)
  return (
    <Hydrate state={dehydratedState}>
      <Board />
    </Hydrate>
  )
}
