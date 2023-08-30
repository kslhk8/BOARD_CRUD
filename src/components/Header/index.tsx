import Link from "next/link";
import React, { useState } from "react";
import { BOARD_PATH_CONST, PATH_CONST } from "~/constants/pathConst";
export default function Header() {
    return (
        <nav className="nav">
            <Link href={PATH_CONST.HOME}>
                Home
            </Link>
            <Link href={BOARD_PATH_CONST.BOARD_ADD} >
                BoardAdd
            </Link>
            <Link href={BOARD_PATH_CONST.BOARD_LIST} >
                BoardList
            </Link>
        </nav>
    );
}