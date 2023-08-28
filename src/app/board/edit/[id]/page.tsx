'use client'
import { useEffect, useMemo, useState } from 'react'
import Modal from '~/components/Modal'
import styles from './edit.module.scss'
import { useRouter } from 'next/navigation'
export default function Edit({ params }: { params: any }) {
    const router = useRouter();
    console.log(params)
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const onSubmit = () => {
        const options = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                content,
                date: new Date()
            })
        };
        fetch('http://localhost:9999/boards/' + params.id, options)
            .then(res => res.json())
            .then(result => {
                setShowModal(false);
                router.replace(`/board/detail/${result?.id}`)
            })
    }
    const isReadyUpdate = useMemo(() => !!title.length && !!content.length, [title, content])
    useEffect(() => {
        fetch(`http://localhost:9999/boards/${params.id}`).then(res => res.json()).then(result => {
            setTitle(result.title)
            setContent(result.content)
        })
    }, [])
    return (
        <div className={styles.container}>
            {/* width="664px" height="820px" */}
            <div className={styles.box}>
                <div className={styles.header}>
                    <h2 className={styles.title}>게시글 편집</h2>
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
                <div className=''>
                    <div className={`${styles.boardItem}${styles.contentItems}`}>본문</div>
                    <textarea
                        placeholder="음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질 수 있습니다."
                        defaultValue={content}
                        onChange={(e) => { setContent(e.target.value) }}
                    ></textarea>
                </div>
                <button
                    className={isReadyUpdate ? `${styles.submit} ${styles.active}` : styles.submit}
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
                    onConfirm={onSubmit}
                />
            )}
        </div>
    )
}   