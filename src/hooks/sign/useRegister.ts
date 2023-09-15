import { useRouter } from "next/navigation"
import { useCookies } from "react-cookie"
import { BOARD_PATH_CONST, PATH_CONST } from "~/constants/pathConst"
import useInput from "../input/useInput"
import serviceApi from "~/helper/serviceApi"
import { API_CONST } from "~/constants/apiConst"
import { toastMessage } from "~/components/Toast"
import { useMemo } from "react"
/**
 *
 * @property form form 데이터
 * @property isDataReady 아이디와 비밀번호가 모두 입력돼있는지 확인
 * @property onChange input값 변화에 따른 handler
 * @property onSubmit 회원가입 function
 */
function useRegister() {
  const router = useRouter()
  const [cookies] = useCookies()
  if (cookies?.accessToken) router.replace(BOARD_PATH_CONST.BOARD_LIST)
  const [form, onChange] = useInput({ email: "", password: "" })
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const registerData = {
      email: form.email,
      password: form.password,
    }
    const result: any = await serviceApi.post(API_CONST.REGISTER, registerData)
    if (result?.response?.status === 400) {
      toastMessage("failure", result?.response?.data)
    } else {
      toastMessage("success", "회원가입에 성공하였습니다.")
      router.push(PATH_CONST.LOGIN)
    }
  }
  const isDataReady = useMemo(
    () => !!form.email && !!form.password,
    [form.email, form.password]
  )
  return {
    form,
    isDataReady,
    onChange,
    onSubmit,
  }
}
export default useRegister
