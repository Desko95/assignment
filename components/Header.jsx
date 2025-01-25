import Link from "next/link";

export default function Header() {
    return(
        <header> Header <Link href="/about-us">About Page </Link> | <Link href="/">Home </Link></header>
    )
}

