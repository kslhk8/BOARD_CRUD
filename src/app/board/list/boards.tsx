"use client";
import Link from "next/link"
import { useQuery } from "@tanstack/react-query";
import styles from './list.module.scss'
import { timeFromToday } from '~/helper/dateFormat'
import { getBoards } from "~/api/board/getBoards";
import { useGetItem } from "~/queries/useGetItem";
export default function Boards() {
    // const { data } = useQuery({ queryKey: ["boards"], queryFn: getBoards, });
    const { data } = useGetItem(["boards"], getBoards);
    return (
        <div className=''>
            <div className={styles.item} key={1}>
                <ul>
                    {data?.map((v: any, idx: number) => (
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