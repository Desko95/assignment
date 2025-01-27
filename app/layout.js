import "../assets/main.css"; // Import global styles
import Footer from "../components/Footer"; // Import the Footer component
import NavLink from "../components/NavLink"; // Component for creating navigation links

// Metadata object for the page
export const metadata = {
    title: "Next.js", // The title of the webpage
    description: "Generated by Next.js", // The description used for SEO
};

async function getBackgroundImage() {
    try {
        // Fetch team members from the API with media data populated
        const MembersPromise = await fetch(`${process.env.BE_HOST}/api/team-members?populate=*`);

        // Check for HTTP response errors
        if (!MembersPromise.ok) {
            throw new Error(`HTTP error! Status: ${MembersPromise.status}`);
        }

        const members = await MembersPromise.json();
        const index = Math.floor(Math.random() * members.data.length);
        return members.data[index].image.url;
    } catch (error) {
        console.error("Error fetching team members:", error); // Log the error for debugging
        return `${process.env.BE_HOST}/uploads/catstronaut_4ddfb2a4c3.webp`; // Rethrow the error to be caught by the calling function
    }
}

// The RootLayout component wraps the entire application and serves as the base structure
export default async function RootLayout({ children }) {
    const backgroundImage = await getBackgroundImage();
    //console.log(backgroundImage);

    return (
        <html lang="en"> {/* Sets the language of the document */}
        <body>
        <div
            className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Set the background image dynamically
                backgroundSize: "cover", // Ensure the image covers the entire background
                backgroundPosition: "center", // Center the image
                backgroundRepeat: "no-repeat", // Prevent repeating the image
            }}
        >
            {/* Header: contains the site title and navigation menu */}
            <header className="bg-white/50 backdrop-blur z-10">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl text-black-800 py-6">Assignment</h1>
                    <nav>
                        <ul className="flex gap-x-7 text-black-800 text-sm">
                            {/* NavLink component creates reusable navigation links */}
                            <li>
                                <NavLink text="Home" path="/" />
                            </li>
                            <li>
                                <NavLink text="Our Team" path="/our-team" />
                            </li>
                            <li>
                                <NavLink text="About Us" path="/about-us" />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main content area, dynamically renders child components */}
            <main
                className="backdrop-blur z-10 max-w-4xl mx-auto bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden"
                role="main" // Defines the main content area for accessibility
            >
                {children} {/* Content passed through the `children` prop is rendered here */}
            </main>

            {/* Footer: Re-uses the imported Footer component */}
            <footer>
                <Footer />
            </footer>
        </div>
        </body>
        </html>
    );
}