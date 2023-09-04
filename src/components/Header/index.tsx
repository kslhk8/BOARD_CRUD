import Link from "next/link"
import React from "react"
import { BOARD_PATH_CONST } from "~/constants/pathConst"

export default function Header() {
  return (
    <header>
      <Link href={BOARD_PATH_CONST.BOARD_LIST}>Board CRUD</Link>
    </header>
  )
}
