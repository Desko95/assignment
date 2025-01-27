import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import qs from "qs"; // Utility for generating query strings
import Spoiler from "@/components/Spoiler";
import Testimonial from "@/components/Testimonial";
import Link from "next/link";

// Function to fetch a specific team member's data based on their slug
async function fetchTeamMember(slug) {
    const ourQuery = qs.stringify({
        filters: {
            slug: slug, // Filter by the given slug
        },
        populate: {
            photo: {
                populate: "*", // Populate the photo data, including all formats
            },
            bodyContent: {
                on: {
                    "features.rich-text": {
                        populate: "*",
                    },
                    "features.spoiler": {
                        populate: "*",
                    },
                    "features.testimonial": {
                        populate: "*",
                    },
                },
            },
        },
    });

    const MembersPromise = await fetch(
        `${process.env.BE_HOST}/api/team-members?${ourQuery}`
    );
    const member = await MembersPromise.json();

    // Return the first team member found (or adjust as needed for data structure)
    return member.data[0]; //.content
}

// Function to dynamically render components based on their type
function OurRenderer(item, index) {
    if (item.__component === "features.testimonial") {
        return <Testimonial key={index} data={item} />;
    }
    if (item.__component === "features.spoiler") {
        return <Spoiler key={index} data={item} />;
    }
    if (item.__component === "features.rich-text") {
        return <BlocksRenderer key={index} content={item.content} />;
    }
}

export async function generateStaticParams() {
    const membersPromise = await fetch(`${process.env.BE_HOST}/api/team-members?populate=*`)
    const members = await membersPromise.json()
    return members.data.map(member => {
        return {
            slug: member.slug
        }
    })
}

// Default function for dynamically rendering the team member's page
export default async function Page({ params }) {
    const member = await fetchTeamMember(params.slug);

    return (
        <article>
            {/* Hero section with the team member's name and background image */}
            <header className="text-white relative bg-gray-700 px-14 py-16 -mx-8 -mt-7">
                <h1 className="text-6xl font-bold relative z-30">{member.name}</h1>
                <img
                    className="object-cover absolute top-0 bottom-0 left-1/2 right-0 block w-1/2 h-full opacity-50 filter grayscale"
                    src={`${process.env.BE_HOST}${member.photo.formats.medium.url}`}
                    alt={member.name} // Add descriptive alt text for accessibility
                />
                {/* Overlay gradient to enhance contrast */}
                <div className="absolute z-20 w-80 bg-gradient-to-r from-gray-700 to-transparent h-full top-0 bottom-0 left-1/2"></div>
            </header>

            {/* Back to all members link */}
            <nav className="transform -translate-y-1/2">
                <Link
                    href="/our-team"
                    className="text-sm bg-black-800 text-black-800 bg-gray-500 hover:text-gray-300 inline-block rounded-lg py-3 px-5"
                >
                    &laquo; Back to all team members
                </Link>
            </nav>

            {/* Main content section displaying dynamic body content */}
            <main className="prose max-w-none">
                <section>
                    {/* Render body content using the custom `OurRenderer` function */}
                    {member.bodyContent.map((item, index) => OurRenderer(item, index))}
                </section>
            </main>
        </article>
    );
}