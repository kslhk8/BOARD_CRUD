"use client"
import { Button, TextField } from "@mui/material"
import useRegister from "~/hooks/sign/useRegister"
const Register = () => {
  const { form, isDataReady, onChange, onSubmit } = useRegister()
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
        <button disabled={!isDataReady} type="submit">
          회원가입
        </button>
      </form>
    </div>
  )
}

export default Register
