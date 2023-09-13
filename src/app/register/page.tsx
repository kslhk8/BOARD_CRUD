"use client"
import { Button, TextField } from "@mui/material"
import useInput from "~/hooks/input/useInput"
import { API_CONST } from "~/constants/apiConst"
import serviceApi from "~/helper/serviceApi"
import { toastMessage } from "~/components/Toast"
import { useRouter } from "next/navigation"
import { BOARD_PATH_CONST, PATH_CONST } from "~/constants/pathConst"
const Register = () => {
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
    console.log(form.email, form.password)
    const registerData = {
      email: form.email,
      password: form.password,
    }
    const result: any = await serviceApi.post(API_CONST.REGISTER, registerData)
    if (result?.response?.status === 400) {
      toastMessage("failure", result?.response?.data)
    } else {
      console.log(result)
      router.push(PATH_CONST.LOGIN)
      // localStorage.setItem("token", result.item.token)
      // navigate("/user/user-list")
    }
  }
  return (
    <div className="root">
      <div className="title">BOARD_CRUD 회원가입</div>
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
          회원가입
        </Button>
      </form>
    </div>
  )
}

export default Register
