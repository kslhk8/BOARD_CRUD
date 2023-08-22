'use client'
import styles from './add.module.scss'
import { db } from '~/app/_firebase/firebase'
export default function page({ children }: { children: React.ReactNode }) {
    console.log(db);
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
                            value='title'
                            placeholder="제목을 입력해주세요"
                            onChange={() => { }}
                        />
                    </div>
                </div>
                {/* <div className={styles.board_item, styles.content_items]}> */}
                <div className=''>
                    <div className={`${styles.boardItem}${styles.contentItems}`}>본문</div>
                    <textarea
                        placeholder="음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민, 형사상의 책임을 질 수 있습니다."
                        defaultValue={'content'}
                        onChange={() => { }}
                    ></textarea>
                </div>
                <button
                    className={true ? 'submit active' : 'submit'}
                    disabled={true}
                    onClick={() => { }}
                ></button>
            </div>
            {/* {true && (
                <Modal
                    title="게시글을 등록하시겠습니까?"
                    text={`등록된 게시글은\n [내 게시글]에서 편집이 가능합니다.`}
                    close="취소"
                    confirm="등록"
                    onClose={() => setModalShow(() => false)}
                    onConfirm={onSubmit}
                    first
                />
            )} */}
        </div>
    )
}   