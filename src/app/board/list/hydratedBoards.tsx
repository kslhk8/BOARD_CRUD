import { dehydrate, Hydrate } from "@tanstack/react-query"
import getQueryClient from "~/helper/getQueryClient"
import Boards from "./boards"
import { getBoards } from "~/api/board/getBoards"
import { API_CONST } from "~/constants/apiConst"
import { BoardItemType, queryFn } from "~/queries/useGetItems"
import { redirect } from "next/navigation"
import { PATH_CONST } from "~/constants/pathConst"
export default async function HydratedBoards() {
  const queryClient = getQueryClient()
  const queryKey = [API_CONST.BOARD]
  await queryClient.prefetchQuery({ queryKey: queryKey, queryFn: queryFn })
  const dehydratedState = dehydrate(queryClient)
  const getBoardDatas = () => queryClient.getQueryData<BoardItemType>(queryKey);
  if (!getBoardDatas()?.length) {
    // redirect(PATH_CONST.HOME)
  }
  return (
    <Hydrate state={dehydratedState}>
      <Boards />
    </Hydrate>
  )
}
