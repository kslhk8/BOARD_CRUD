import Header from "~/components/Header"
import Providers from "~/components/Provider"
import "./globals.scss"

export const metadata = {
  title: "POST_CRUD",
  description: "Generated by kslhk8",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}