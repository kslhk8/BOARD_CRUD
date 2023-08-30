"use client"
import Modal from "~/components/Modal"
import useBoardAdd from "~/hooks/board/useBoardAdd"

const Add: React.FC = () => {
  const {
    title,
    content,
    isDataReady,
    showAddConfirmModal,
    onChangeTitle,
    onChangeContent,
    onChangeModalState,
    onPostItem,
  } = useBoardAdd()
  return (
    <div className="board-add-container">
      {/* width="664px" height="820px" */}
      <div className="box">
        <div className="header">
          <h2 className="title">게시글 등록</h2>
        </div>
        <div className="content-wrapper">
          <div className="sub-title">제목</div>
          <input
            type="text"
            value={title}
            placeholder="제목을 입력해주세요"
            onChange={onChangeTitle}
          />
        </div>
        <div className="content-wrapper">
          <div className="content-title">
            본문
          </div>
          <textarea
            placeholder="음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질 수 있습니다."
            onChange={onChangeContent}
          ></textarea>
        </div>
        <button
          disabled={!isDataReady}
          onClick={onChangeModalState}
        >
          등록하기
        </button>
      </div>
      {showAddConfirmModal && (
        <Modal
          title="게시글을 등록하시겠습니까?"
          close="취소"
          confirm="등록"
          onClose={onChangeModalState}
          onConfirm={() => onPostItem({ title, content, date: new Date() + '' })}
        />
      )}
    </div>
  )
}

export default Add
