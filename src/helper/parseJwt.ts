export const parseJwt = (token: string) => {
  if (!token) {
    return { email: "", sub: "" }
  }
  const base64Payload = token?.split(".")[1] //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
  const payload = Buffer.from(base64Payload, "base64")
  const data = JSON.parse(payload.toString())
  const { email, sub } = data
  return { email, sub }
}
