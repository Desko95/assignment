"use client"
import {useState} from "react";

export default function Footer() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(prev => prev + 1);
    }

    return(
        <footer>
            <p>&copy; {new Date().getFullYear()} Our Company.</p>
            <p>
                You have clicked the following button {count} times.
                <button onClick={handleClick}>Click Me</button>
            </p>
        </footer>
    )
}