import { dehydrate, Hydrate } from "@tanstack/react-query"
import getQueryClient from "~/helper/getQueryClient"
import Detail from "./detail"
import { API_CONST } from "~/constants/apiConst"
import { queryFn } from "~/queries/useGetItem"
export default async function HydratedDetail({ params }: { params: { id: number } }) {
  const id = Number(params.id)
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery([API_CONST.BOARD_DETAIL(id)], () => queryFn(id))
  const dehydratedState = dehydrate(queryClient)
  return (
    <Hydrate state={dehydratedState}>
      <Detail />
    </Hydrate>
  )
}
