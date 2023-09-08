import { dehydrate, Hydrate } from "@tanstack/react-query"
import getQueryClient from "~/helper/getQueryClient"
import Boards from "./boards"
import { API_CONST } from "~/constants/apiConst"
import { queryFn } from "~/queries/useGetItems"

export default async function HydratedBoards({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const queryClient = getQueryClient()
  const queryKey = [API_CONST.BOARD, Number(searchParams.page) || 1]
  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => queryFn(Number(searchParams.page) || 1),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <Boards />
    </Hydrate>
  )
}
