import Link from "next/link";

async function getAllTeamMembers() {
    try {
        // Fetch team members from the API with media data populated
        const MembersPromise = await fetch(`${process.env.BE_HOST}/api/team-members?populate=*`);

        // Check for HTTP response errors
        if (!MembersPromise.ok) {
            throw new Error(`HTTP error! Status: ${MembersPromise.status}`);
        }

        const members = await MembersPromise.json();
        return members.data;
    } catch (error) {
        console.error("Error fetching team members:", error); // Log the error for debugging
        throw error; // Rethrow the error to be caught by the calling function
    }
}

// Default exported async function to render the "Our Team" page
export default async function Page() {
    try {
        // Fetch the list of all team members
        const members = await getAllTeamMembers();

        // Render the "Our Team" page with team member cards
        return (
            <div>
                <h1 className="text-4xl mb-6 font-bold text-black-800">Our Team</h1>
                {/* Display members in a responsive grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {members.map((member) => {
                        return (
                            <Link
                                className="group grid grid-cols-[140px_1fr] bg-white rounded-lg overflow-hidden relative hover:bg-gradient-to-r from-white to-amber-50"
                                key={member.id}
                                href={`/our-team/${member.slug}`}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        className="transition duration-300 absolute inset-0 h-full w-full object-cover group-hover:scale-125 group-hover:rotate-12"
                                        src={`${process.env.BE_HOST}${member.photo.formats.medium.url}`}
                                        alt={`${member.name} - ${member.description}`}
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-xl text-gray-900 font-bold group-hover:text-gray-700">{member.name}</p>
                                    <p className="text-sm text-gray-600 leading-6">{member.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    } catch (err) {
        // Display a generic user-friendly error while logging the details for developers
        console.error("Error rendering the page:", err);

        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold text-red-700 mb-4">Oops! Something went wrong.</h1>
                <p className="text-black-800">We couldn't load the team member list. Please try again later.</p>

                {/* Show error details in development  */}
                {process.env.NODE_ENV === 'development' && (
                    <pre className="bg-gray-100 p-4 mt-4 whitespace-pre-wrap rounded-md text-red-800">
                        {err.message}
                    </pre>
                )}
            </div>
        );
    }
}