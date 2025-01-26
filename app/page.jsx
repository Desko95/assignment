import {BlocksRenderer} from "@strapi/blocks-react-renderer"; // Import the BlocksRenderer component to render dynamic content blocks

// Function to fetch homepage content from the backend API
async function getContent() {
    const res = await fetch(`${process.env.BE_HOST}/api/homepage`);

    const home = await res.json();

    return home.data.content;
}

// Default function to render the homepage
export default async function Page() {
    // Fetch the dynamic content for the homepage
    const content = await getContent();

    return (
        <div className="prose max-w-none"> {/* Styling container with Tailwind CSS for typography */}
            {/* Render the content dynamically */}
            <BlocksRenderer content={content} />
        </div>
    );
}