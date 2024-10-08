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
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
               
            }}
            className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%]"
        >
            {/* Movie Name or Title */}
            <h1 className="text-5xl font-black text-white">
                {data.name || data.title || data.original_name || data.original_title || "No Title Available"}
            </h1>

            {/* Movie Overview or Description */}
            <p className="w-[70%] mt-5 text-white">
                {data.overview ? data.overview.slice(0, 200) : "No description available"}...
                <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link> {/* Link for more info */}
            </p>

            {/* Release Date and Media Type */}
            <p className="text-white mt-3">
                <i className="text-yellow-500 ri-megaphone-fill"></i> {data.release_date || "No release date"}
                <i className="ml-5 text-yellow-500 ri-album-fill"></i> {data.media_type ? data.media_type.toUpperCase() : "Unknown media type"}
            </p>

            {/* Watch Trailer Button */}
            <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="mt-3 bg-[#6556cd] p-4 rounded text-white">
                Watch Trailer
            </Link>
        </div>
    );
};

export default Header;
