export default function Testimonial(props) {
    return (
        <div className="bg-gray-200 rounded-lg p-6 px-16 pb-20 not-prose mb-24 text-center relative">
            {/* Display the testimonial quote in italic text */}
            <p className="text-2xl italic text-gray-600">
                &ldquo;{props.data.quote}&rdquo; {/* Render the quote from props */}
            </p>

            {/* Section for rendering author photo and name */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                {/* Render author's photo (with fallback if no photo is provided) */}
                <img
                    className="w-32 h-32 rounded-full border-4 border-gray-200"
                    src={`${process.env.BE_HOST}${props.data.photo?.formats?.thumbnail?.url || ""}`} // Use optional chaining and fallback if the photo URL is missing
                    alt={props.data.authorname || "Unknown Author"} // Use fallback text for alt attribute if the author's name is missing
                />

                {/* Render author's name (fallback to "Unknown Author" if name is not provided) */}
                <h4 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-200 shadow px-3 py-2 text-sm font-bold rounded-full text-gray-800">
                    {props.data.authorname || "Unknown Author"}
                </h4>
            </div>
        </div>
    );
}