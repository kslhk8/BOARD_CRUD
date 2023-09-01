import { dehydrate, Hydrate } from "@tanstack/react-query"
import getQueryClient from "~/helper/getQueryClient"
import Edit from "./edit"
import { API_CONST } from "~/constants/apiConst"
import { queryFn } from "~/queries/useGetItem"
import { BoardItemType } from "~/queries/useGetItems"
import { redirect } from "next/navigation"
import { BOARD_PATH_CONST } from "~/constants/pathConst"
export default async function HydratedEdit({ params }: { params: { id: number } }) {
  const id = Number(params.id)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery([API_CONST.BOARD_DETAIL(id)], () => queryFn(id))
  const getBoardItem = () => queryClient.getQueryData<BoardItemType>([API_CONST.BOARD_DETAIL(id)]);
  //id가 없을 경우 redirect
  if (!getBoardItem()?.id) {
    redirect(BOARD_PATH_CONST.BOARD_LIST)
  }
  const dehydratedState = dehydrate(queryClient)
  return (
    <Hydrate state={dehydratedState}>
      <Edit />
    </Hydrate>
  )
}
