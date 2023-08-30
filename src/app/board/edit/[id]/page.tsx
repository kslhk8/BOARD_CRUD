import HydratedEdit from './hydratedEdit'
export default function Page({ params }: { params: { id: number } }) {
    return (
        <HydratedEdit params={params} />
    )
}