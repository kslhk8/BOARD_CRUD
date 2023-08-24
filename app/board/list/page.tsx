import Link from "next/link"
import styles from './list.module.scss'
import { timeFromToday } from '~/app/_utils/dateFormat'
export default async function List({ children }: { children: React.ReactNode }) {
    const data = await fetch('http://localhost:9999/boards', { cache: 'no-store' }).then(res => res.json())
    return (
        <div className=''>
            <div className={styles.hello}>hello</div>
            <div className={styles.item} key={1}>
                <ul>
                    {data.map((v: any, idx: number) => (
                        <Link
                            href={
                                `/board/detail/${v.id}`
                            }
                            key={v.id}
                            className={styles.contentWrapper}
                        >
                            <li className={styles.post}>
                                {v.title}
                                <div className={styles.name}>
                                    {timeFromToday(v.date)}
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