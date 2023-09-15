import { useRouter } from "next/navigation"
import { BOARD_PATH_CONST, PATH_CONST } from "~/constants/pathConst"
import useInput from "../input/useInput"
import serviceApi from "~/helper/serviceApi"
import { API_CONST } from "~/constants/apiConst"
import { toastMessage } from "~/components/Toast"
import { getCookie, setCookie } from "cookies-next"
import { useCookies } from "react-cookie"
/**
 *
 * @property form form 데이터
 * @property onChange input값 변화에 따른 handler
 * @property onSubmit 로그인
 * @property onClickRegister 회원가입페이지로 이동
 */
function useLogin() {
  const router = useRouter()
  const [cookies, setCookies] = useCookies()
  const token = cookies.accessToken
  if (token) router.replace(BOARD_PATH_CONST.BOARD_LIST)

  const [form, onChange] = useInput({ email: "", password: "" })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const loginData = {
      email: form.email,
      password: form.password,
    }
    const result: any = await serviceApi.post(API_CONST.LOGIN, loginData)
    if (result?.response?.status === 400) {
      toastMessage("failure", result?.response?.data)
    } else {
      setCookies("accessToken", result?.data?.accessToken, { path: "/" })
      router.push(BOARD_PATH_CONST.BOARD_LIST)
    }
  }
  const onClickRegister = () => router.push(PATH_CONST.REGISTER)
  return {
    form,
    onChange,
    onSubmit,
    onClickRegister,
  }
}
export default useLogin
