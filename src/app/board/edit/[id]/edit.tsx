"use client"
import Modal from "~/components/Modal"
import useBoardEdit from "~/hooks/board/useBoardEdit"
const Edit: React.FC = () => {
  const {
    showEditConfirmModal,
    isDataReady,
    form,
    onChange,
    onChangeModalState,
    onUpdateItem,
    onMoveBack,
  } = useBoardEdit()
  return (
    <div className="board-edit-container">
      <div className="go-back" onClick={onMoveBack}>
        뒤로 가기
      </div>
      <div className="box">
        <div className="header">
          <h2 className="title">게시글 편집</h2>
        </div>
        <div className="content-wrapper">
          <div className="sub-title">제목</div>
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="제목을 입력해주세요"
            onChange={onChange}
          />
        </div>
        <div className="content-wrapper">
          <div className="content-title">본문</div>
          <textarea
            name="content"
            placeholder="음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질 수 있습니다."
            defaultValue={form.content}
            onChange={onChange}
          ></textarea>
        </div>
        <button disabled={!isDataReady} onClick={onChangeModalState}>
          편집하기
        </button>
      </div>
      {showEditConfirmModal && (
        <Modal
          title="게시글을 편집하시겠습니까?"
          close="취소"
          confirm="편집"
          onClose={onChangeModalState}
          onConfirm={() => onUpdateItem()}
        />
      )}
    </div>
  )
}
export default Edit
