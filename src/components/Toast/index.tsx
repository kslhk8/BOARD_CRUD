import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type ResultOptions = 'success' | 'failure' | 'axiosError';
export default function Toast() {
  return (
    <ToastContainer
      className="toast-container"
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      limit={1}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export const toastMessage = (result: ResultOptions, message?: string) => {
  if (result === 'success') {
    return toast.success(`${message}`);
  }
  if (result === 'failure') {
    return toast.error(`${message}`);
  }
  if (result === 'axiosError') {
    return toast.error('오류가 발생하여 실패하였습니다.');
  }
};
