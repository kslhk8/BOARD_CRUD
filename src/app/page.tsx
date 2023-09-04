import { redirect } from "next/navigation"
import { BOARD_PATH_CONST } from "~/constants/pathConst"

export default function Home() {
  redirect(BOARD_PATH_CONST.BOARD_LIST)
}
