export default function page({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>page</div>
            <div>{children}</div>
        </div>
    )
}