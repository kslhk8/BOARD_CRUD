import Link from "next/link";
import React from "react";
type Props = {};

function Header({ }: Props) {
    return (
        <nav className="nav">
            <Link href="/">
                Home
            </Link>
            <Link href="/board/add" >
                BoardAdd
            </Link>
            <Link href="/board/list" >
                BoardList
            </Link>
        </nav>
    );
}

export default Header;
