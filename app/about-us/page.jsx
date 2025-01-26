import {BlocksRenderer} from "@strapi/blocks-react-renderer"; // Import the BlocksRenderer for rendering dynamic content blocks


async function getContent() {
    const res = await fetch(`${process.env.BE_HOST}/api/aboutpage`);

    const home = await res.json();

    return home.data.content;
}

//  page component for rendering the About page
export default async function Page() {
    const content = await getContent();
    return (
        <div className="prose max-w-none">
            {/*
            The container is styled using Tailwind's typography class `prose`
            and `max-w-none` ensures the content spans full width instead of being constrained.
            */}

            <BlocksRenderer content={content} /> {/* Renders the fetched content dynamically */}
        </div>
    );
}