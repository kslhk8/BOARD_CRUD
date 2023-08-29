'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Modal from '~/components/Modal'
import { useRouter } from 'next/navigation'
import useUpdateItem, { UpdateItemParamType } from '~/queries/useUpdateItem'
import useGetItem from '~/queries/useGetItem'
export default function Edit({ params }: { params: any }) {
    //TODO prefetching Edit 초기데이터
    const { data: boardData } = useGetItem(Number(params.id));
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(boardData.title || '');
    const [content, setContent] = useState(boardData.content || '');
    const { mutateAsync: updateItem } = useUpdateItem();
    const onUpdateItem = useCallback(async ({ title, content, date, id }: UpdateItemParamType) => {
        const { data } = await updateItem({ title, content, date, id });
        setShowModal(false);
        router.replace(`/board/${data.id}`)
    }, [])
    // const onSubmit = () => {
    //     const options = {
    //         method: "PATCH",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             title,
    //             content,
    //             date: new Date()
    //         })
    //     };
    //     fetch('http://localhost:9998/boards/' + params.id, options)
    //         .then(res => res.json())
    //         .then(result => {
    //             console.log('result', result)
    //             setShowModal(false);
    //             router.replace(`/board/${result?.id}`)
    //         })
    // }
    const isReadyUpdate = useMemo(() => !!title.length && !!content.length, [title, content])
    // useEffect(() => {
    //     fetch(`http://localhost:9998/boards/${params.id}`).then(res => res.json()).then(result => {
    //         setTitle(result.title)
    //         setContent(result.content)
    //     })
    // }, [])
    return (
        <div className="board-edit-container">
            {/* width="664px" height="820px" */}
            <div className="box">
                <div className="header">
                    <h2 className="title">게시글 편집</h2>
                </div>
                <div className="content-wrapper">
                    <div className="sub-title">제목</div>
                    <input
                        type="text"
                        value={title}
                        placeholder="제목을 입력해주세요"
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="content-wrapper">
                    <div className="content-title">본문</div>
                    <textarea
                        placeholder="음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질 수 있습니다."
                        defaultValue={content}
                        onChange={(e) => { setContent(e.target.value) }}
                    ></textarea>
                </div>
                <button
                    disabled={!isReadyUpdate}
                    onClick={() => { setShowModal(true) }}
                >편집하기</button>
            </div>
            {showModal && (
                <Modal
                    title="게시글을 편집하시겠습니까?"
                    close="취소"
                    confirm="편집"
                    onClose={() => { setShowModal(false) }}
                    onConfirm={() => onUpdateItem({ id: params.id, title, content, date: new Date() + '' })}
                />
            )}
        </div>
    )
}   