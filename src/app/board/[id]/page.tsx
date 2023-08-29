import HydratedDetail from './hydratedDetail'
export default function Page({ params }: { params: { id: number } }) {
    return (
        <HydratedDetail params={params} />
    )
}