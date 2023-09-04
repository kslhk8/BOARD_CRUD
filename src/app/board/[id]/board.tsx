"use client"
import Modal from "~/components/Modal"
import useBoard from "~/hooks/board/useBoard"

const Board: React.FC = () => {
  const {
    showDeleteConfirmModal,
    boardData,
    onChangeModalState,
    onDeleteItem,
    onMoveEdit,
    onMoveList,
  } = useBoard()
  return (
    <>
      <div className="board-container">
        <div className="go-back" onClick={onMoveList}>
          리스트로 이동
        </div>
        <div className="board-box">
          <div className="title">제목</div>
          <div className="title-value">{boardData?.title}</div>
          <div className="content">본문</div>
          <div className="content-value">{boardData?.content}</div>
          <div className="btn-wrapper">
            <button onClick={onMoveEdit}>편집</button>
            <button onClick={onChangeModalState}>삭제</button>
          </div>
        </div>
      </div>
      {showDeleteConfirmModal && (
        <Modal
          title="게시글을 삭제하시겠습니까?"
          close="취소"
          confirm="삭제"
          onClose={onChangeModalState}
          onConfirm={() => onDeleteItem()}
        />
      )}
    </>
  )
}
export default Board
