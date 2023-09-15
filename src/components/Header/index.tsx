"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { PATH_CONST, BOARD_PATH_CONST } from "~/constants/pathConst"
import { useCookies } from "react-cookie"
import { useRouter } from "next/navigation"
export default function Header() {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const token = cookies.accessToken
  const onClickLogout = () => {
    router.replace(PATH_CONST.LOGIN)
    removeCookie("accessToken", { path: "/" })
  }
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <header>
      <Link href={BOARD_PATH_CONST.BOARD_LIST}>Board CRUD</Link>
      {mounted && token && (
        <div className="logout" onClick={onClickLogout}>
          로그아웃
        </div>
      )}
    </header>
  )
}
