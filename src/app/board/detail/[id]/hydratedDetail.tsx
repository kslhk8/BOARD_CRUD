import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '~/getQueryClient'
import Detail from './detail'
import { getBoardById } from './api/getBoardById'
import { useParams } from 'next/navigation'
export default async function HydratedBoards() {
    const params = useParams();
    console.log(params)
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(["board"], () => getBoardById(params.id + ''))
    const dehydratedState = dehydrate(queryClient)
    return (
        <Hydrate state={dehydratedState}>
            {/* <Detail /> */}
        </Hydrate>
    )
}