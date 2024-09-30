import { Link } from "react-router-dom";

const Header = ({ data }) => {
    if (!data) {
        return <div>Loading...</div>; // Handle case where data is not yet loaded
    }

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
                    data.backdrop_path || data.profile_path || '' // Default to empty string if no image
                })`,
                backgroundPosition: "center", // Ensure image is centered
                backgroundSize: "cover", // Make sure the background image covers the container fully
                backgroundRepeat: "no-repeat", // Prevent the image from repeating
                height: "70vh", // Height of the container
                width: "100%", // Full width of the container
                display: "flex", // Flexbox layout
                flexDirection: "column", // Stack elements vertically
                justifyContent: "flex-end", // Align content to the bottom
                padding: "10%", // Padding for spacing around the text
                boxSizing: "border-box", // Ensure padding doesn't affect the container size
            }}
            className="relative w-full h-[30vh]"
        >
            {/* Movie Name or Title */}
            <h1 className="text-5xl font-black text-white  mb-4"> {/* Margin to push button down */}
                {data.name || data.title || data.original_name || data.original_title || "No Title Available"}
            </h1>

            {/* Movie Overview or Description */}
            <p className="w-[70%] text-white  mb-4"> {/* Margin for spacing */}
                {data.overview ? data.overview.slice(0, 200) : "No description available"}...
                <Link className="text-blue-400" to={`/more-info/${data.id}`}>more</Link>
            </p>

            {/* Release Date and Media Type */}
            <p className="text-white mb-4"> {/* Margin to space out content */}
                <i className="text-yellow-500 ri-megaphone-fill"></i> {data.release_date || "No release date"}
                <i className="ml-5 text-yellow-500 ri-album-fill"></i> {data.media_type ? data.media_type.toUpperCase() : "Unknown media type"}
            </p>

            {/* Watch Trailer Button */}
            <Link
                to={`/trailer/${data.id}`}
                className=" bg-[#6556cd] p-4 rounded text-white  hover:bg-blue-600 transition-all mt-1"
                style={{ alignSelf: 'flex-start' }} // Align button to the start
            >
                Watch Trailer
            </Link>
        </div>
    );
};

export default Header;
