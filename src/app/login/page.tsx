"use client"
import { Button, TextField } from "@mui/material"
import useInput from "~/hooks/input/useInput"
import { useRouter } from "next/navigation"
import { BOARD_PATH_CONST } from "~/constants/pathConst"
import { API_CONST } from "~/constants/apiConst"
import serviceApi from "~/helper/serviceApi"
import { toastMessage } from "~/components/Toast"
const Login = () => {
  const router = useRouter()
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      router.replace(BOARD_PATH_CONST.BOARD_LIST)
    }
  }

  const [form, onChange] = useInput({ email: "", password: "" })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const loginData = {
      email: form.email,
      password: form.password,
    }
    const result: any = await serviceApi.post(API_CONST.LOGIN, loginData)
    console.log(result)
    if (result?.response?.status === 400) {
      toastMessage("failure", result?.response?.data)
    } else {
      localStorage.setItem("token", result?.data?.accessToken)
      router.push(BOARD_PATH_CONST.BOARD_LIST)
    }
  }
  return (
    <div className="root">
      <div className="title">BOARD_CRUD 로그인</div>
      <form onSubmit={onSubmit}>
        <TextField
          className="text-field"
          id="outlined-basic-email"
          name="email"
          label="아이디"
          variant="outlined"
          fullWidth
          value={form.email}
          onChange={onChange}
        />
        <TextField
          className="text-field"
          id="outlined-basic-password"
          name="password"
          type="password"
          label="비밀번호"
          variant="outlined"
          fullWidth
          value={form.password}
          onChange={onChange}
        />
        <Button variant="contained" type="submit">
          로그인
        </Button>
      </form>
    </div>
  )
}

export default Login
