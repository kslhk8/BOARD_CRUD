'use client'
import { useState, useEffect, useCallback } from 'react'
import Modal from '~/components/Modal'
import { useRouter, useParams } from 'next/navigation';
import useGetItem from '~/queries/useGetItem';
import useDeleteItem from '~/queries/useDelteItem'
export default function Detail() {
    const params = useParams();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const { data: boardData } = useGetItem(Number(params.id));
    const [data, setData] = useState(boardData.title || '')
    const { mutateAsync: deleteItem } = useDeleteItem()

    // const onSubmit = () => {
    //     const options = {
    //         method: "DELETE",
    //     };
    //     fetch('http://localhost:9998/boards/' + params.id, options)
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log('result', result)
    //             setShowModal(false);
    //             router.replace(`/board/list`)
    //         })
    // }
    const onDeleteItem = useCallback(
        async (id: number) => {
            await deleteItem(id)
            // TODO:지역변수는 이 아래에서 만들기
            setShowModal(false);
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
                    <button onClick={() => setShowModal(true)}>삭제</button>
                </div>
            </div >
            {showModal && (
                <Modal
                    title="게시글을 삭제하시겠습니까?"
                    close="취소"
                    confirm="삭제"
                    onClose={() => { setShowModal(false) }}
                    onConfirm={() => onDeleteItem(Number(params.id))}
                />
            )}
        </ >
    )
}