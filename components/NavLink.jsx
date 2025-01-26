"use client" // Enables client-side rendering mode in Next.js since this component relies on hooks.
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import hook for accessing the current path.

// Component for generating a navigation link with active state styling
export default function NavLink(props) {
    const pathname = usePathname(); // Get the current path from the Next.js router.

    // Compare the current path with the link's path to determine if it's active
    const active = pathname === props.path;

    return (
        // Render the <Link> component with dynamic classes based on the active state
        <Link
            className={active ? "opacity-100" : "opacity-50 hover:opacity-65"}
            href={props.path} // The target path for the link, passed in via props
        >
            {props.text} {/* Display the link text */}
        </Link>
    );
}