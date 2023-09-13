import { redirect } from "next/navigation"
import { PATH_CONST } from "~/constants/pathConst"

export default function Home() {
  redirect(PATH_CONST.LOGIN)
}
