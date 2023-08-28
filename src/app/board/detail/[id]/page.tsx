'use client'
import { useState, useEffect } from 'react'
import Modal from '~/components/Modal'
import styles from './detail.module.scss'
import { useRouter, useParams } from 'next/navigation';
export default function Detail() {
    const params = useParams();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<any>([]);
    const onSubmit = () => {
        const options = {
            method: "DELETE",
        };
        fetch('http://localhost:9998/boards/' + params.id, options)
            .then(res => res.json())
            .then(result => {
                setShowModal(false);
                router.replace(`/board/list`)
            })
    }
    useEffect(() => {
        fetch(`http://localhost:9998/boards/${params.id}`).then(res => res.json()).then(result => {
            setData(result)
        })
    }, [])
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.title}>제목</div>
                <div className={styles.titleItem}>{data?.title}</div>
                <div className={styles.content}>
                    본문
                </div>
                <div
                    className={styles.contentItem}>
                    {data?.content}
                </div >
                <div className={styles.btnWrapper}>
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
                    onConfirm={onSubmit}
                />
            )}

        </div >
    )
}