import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <h1>Not found – 404!</h1>
      <div>
        <Link href="/" style={{ color: "blue" }}>
          Go back to Home
        </Link>
      </div>
    </div>
  )
}
