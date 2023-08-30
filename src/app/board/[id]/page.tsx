import HydratedBoard from './hydratedBoard'
export default function Page({ params }: { params: { id: number } }) {
    return (
        <HydratedBoard params={params} />
    )
}