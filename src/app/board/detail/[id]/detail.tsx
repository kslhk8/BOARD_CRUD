"use client";
import Link from "next/link"
import { useQuery } from "@tanstack/react-query";
import styles from './list.module.scss'
import { timeFromToday } from '~/helper/dateFormat'
import { getBoardById } from "./api/getBoardById";

export default function Boards({ params }: { params: any }) {
    const { data } = useQuery(["boardId"], () => getBoardById(params.id));
    return (
        <div className=''>
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
        </div>
    );
}