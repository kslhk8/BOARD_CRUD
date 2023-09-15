"use client"
import { TextField } from "@mui/material"
import useLogin from "~/hooks/sign/useLogin"
const Login = () => {
  const { form, onChange, onSubmit, onClickRegister } = useLogin()
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
        <button type="submit">로그인</button>
      </form>
      <button onClick={onClickRegister}>회원가입</button>
    </div>
  )
}

export default Login
