import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type ResultOptions = "success" | "failure" | "axiosError"

export default function Toast() {
  return (
    <ToastContainer
      className="toast-container"
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      limit={1}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

/**
 * @param {ResultOptions} result 결과
 * @param {string} message 결과 값에 따른 알림 메시지
 * @returns {method} toast.success | toast.error
 */
export const toastMessage = (result: ResultOptions, message?: string) => {
  if (result === "success") {
    return toast.success(`${message}`)
  }
  if (result === "failure") {
    return toast.error(`${message}`)
  }
  if (result === "axiosError") {
    return toast.error("오류가 발생하여 실패하였습니다.")
  }
}
