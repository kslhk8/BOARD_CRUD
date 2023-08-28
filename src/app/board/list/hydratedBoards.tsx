import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '~/getQueryClient'
import Boards from './boards'
import { getBoards } from '~/api/board/getBoards'
export default async function HydratedBoards() {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(["boards"], getBoards)
    const dehydratedState = dehydrate(queryClient)
    return (
        <Hydrate state={dehydratedState}>
            <Boards />
        </Hydrate>
    )
}