import Link from "next/link"
import React from "react"
import { BOARD_PATH_CONST } from "~/constants/pathConst"
export default function Header() {
  // let token
  // if (typeof window !== "undefined") {
  //   token = localStorage.getItem("token")
  //   console.log("token", token)
  // }
  return (
    <header>
      <Link href={BOARD_PATH_CONST.BOARD_LIST}>Board CRUD</Link>
    </header>
  )
}
