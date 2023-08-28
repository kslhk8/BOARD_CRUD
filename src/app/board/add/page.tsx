'use client'
import { useMemo, useState } from 'react'
import Modal from '~/components/Modal'
import { useRouter } from 'next/navigation';
import styles from './add.module.scss'
import { useMutation } from '@tanstack/react-query';
import { addBoard } from './api/addBoard';
export default function Add({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const { mutate: onSubmit, isLoading, error } = useMutation(addBoard, {
        onSuccess: (data) => {
            setShowModal(false);
            router.replace(`/board/detail/${data?.id}`)
        },
        onError: () => {

        }
    })
    // const onSubmit = () => {
    //     const options = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             title,
    //             content,
    //             date: new Date()
    //         })
    //     };
    //     fetch('http://localhost:9998/boards', options)
    //         .then(res => res.json())
    //         .then(result => {
    //             setShowModal(false);
    //             router.replace(`/board/detail/${result?.id}`)
    //         })
    // }
    const isDataReady = useMemo(() => !!title.length && !!content.length, [title.length, content.length])
    return (
        <div className={styles.container}>
            {/* width="664px" height="820px" */}
            <div className={styles.box}>
                <div className={styles.header}>
                    <h2 className={styles.title}>게시글 등록</h2>
                </div>
                <div>
                    <div className={styles.boardItem}>
                        <div className={styles.subTitle}>제목</div>
                        <input
                            type="text"
                            value={title}
                            placeholder="제목을 입력해주세요"
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                </div>
                <div>
                    <div className={`${styles.boardItem}${styles.contentItems}`}>본문</div>
                    <textarea
                        placeholder="음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질 수 있습니다."
                        onChange={(e) => { setContent(e.target.value) }}
                    ></textarea>
                </div>
                <button
                    className={isDataReady ? `${styles.submit} ${styles.active}` : styles.submit}
                    disabled={!isDataReady}
                    onClick={() => { setShowModal(true) }}
                >등록하기</button>
            </div>
            {showModal && (
                <Modal
                    title="게시글을 등록하시겠습니까?"
                    close="취소"
                    confirm="등록"
                    onClose={() => { setShowModal(false) }}
                    onConfirm={() => onSubmit({ title, content })}
                />
            )}
        </div>
    )
}   