interface ModalProps {
  title?: string
  close?: string
  confirm?: string
  onClose: () => void
  onConfirm?: () => void
}
/**
 * @param {string} title modal 제목
 * @param {string} close modal 닫기 버튼 텍스트
 * @param {string} confirm modal 확인 버튼 텍스트
 * @param {function} onClose modal 닫기 버튼 눌렀을 때 작동하는 function
 * @param {function} onConfirm modal 확인 버튼 눌렀을 때 작동하는 function
 */
const Modal = ({ title, close, confirm, onClose, onConfirm }: ModalProps) => {
  return (
    <>
      <div className="modal-container">
        <div className="title">{title}</div>
        <div className="btn-wrapper">
          <div onClick={onClose} className="close">
            {close}
          </div>
          <div onClick={onConfirm} className="confirm">
            {confirm}
          </div>
        </div>
      </div>
      <div className="overlay" onClick={onClose} />
    </>
  )
}
export default Modal
