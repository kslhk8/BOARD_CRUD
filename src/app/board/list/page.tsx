import { dehydrate, Hydrate } from "@tanstack/react-query"
import getQueryClient from "~/helper/getQueryClient"
import Boards from "./boards"
import { API_CONST } from "~/constants/apiConst"
import { queryFn } from "~/queries/useGetItems"

export default async function HydratedBoards() {
  const queryClient = getQueryClient()
  const queryKey = [API_CONST.BOARD]
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <Boards />
    </Hydrate>
  )
}
