import Link from "next/link"
import styles from './list.module.scss'
export default function page({ children }: { children: React.ReactNode }) {
    return (
        <div className=''>
            <div className={styles.item} key={1}>
                <ul>
                    {[1, 2, 3].map((v, idx) => (
                        <Link
                            href={
                                ''
                            }
                            key={1}
                            className={styles.contentWrapper}
                        >
                            <li className={styles.post}>
                                타이틀
                                <div className={styles.name}>
                                    닉네임
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div>{children}</div>
        </div>
    )
}