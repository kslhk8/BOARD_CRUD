'use client'
import { useState, useEffect, useCallback } from 'react'
import Modal from '~/components/Modal'
import { useRouter, useParams } from 'next/navigation';
import useGetItem from '~/queries/useGetItem';
import useDeleteItem from '~/queries/useDelteItem'
import { toastMessage } from '~/components/Toast';
const Board: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const { data: boardData } = useGetItem(Number(params.id));
    const { mutateAsync: deleteItem } = useDeleteItem()

    const onDeleteItem = useCallback(
        async (id: number) => {
            await deleteItem(id)
            // TODO:지역변수는 이 아래에서 만들기
            toastMessage('success', '게시글이 삭제됐습니다.');

            setShowDeleteConfirmModal(false);
            router.replace(`/board/list`)
        },
        []
    )
    return (
        <>
            <div className="board-container">
                <div className="title">제목</div>
                <div className="title-value">{boardData?.title}</div>
                <div className="content">
                    본문
                </div>
                <div
                    className="content-value">
                    {boardData?.content}
                </div >
                <div className="btn-wrapper">
                    <button onClick={() => router.push(`/board/edit/${params.id}`)}>편집</button>
                    <button onClick={() => setShowDeleteConfirmModal(true)}>삭제</button>
                </div>
            </div >
            {showDeleteConfirmModal && (
                <Modal
                    title="게시글을 삭제하시겠습니까?"
                    close="취소"
                    confirm="삭제"
                    onClose={() => { setShowDeleteConfirmModal(false) }}
                    onConfirm={() => onDeleteItem(Number(params.id))}
                />
            )}
        </ >
    )
}
export default Board