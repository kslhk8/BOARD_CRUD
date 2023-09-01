'use client'
import Modal from '~/components/Modal'
import useBoardDelete from '~/hooks/board/useBoardDelete';
const Board: React.FC = () => {
    const { showDeleteConfirmModal,
        form,
        onChangeModalState,
        onDeleteItem, onMoveEdit } = useBoardDelete();
    return (
        <>
            <div className="board-container">
                <div className="title">제목</div>
                <div className="title-value">{form?.title}</div>
                <div className="content">
                    본문
                </div>
                <div
                    className="content-value">
                    {form?.content}
                </div >
                <div className="btn-wrapper">
                    <button onClick={onMoveEdit}>편집</button>
                    <button onClick={onChangeModalState}>삭제</button>
                </div>
            </div >
            {showDeleteConfirmModal && (
                <Modal
                    title="게시글을 삭제하시겠습니까?"
                    close="취소"
                    confirm="삭제"
                    onClose={onChangeModalState}
                    onConfirm={() => onDeleteItem()}
                />
            )}
        </ >
    )
}
export default Board