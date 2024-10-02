
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import { useState, useEffect } from 'react';
import axios from "../utils/axios";
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';

const Home = () => {
    document.title = "MovieFlix | Homepage";
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null)

    const GetHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            
            // Check if data.results exists and is not empty
            if (data && data.results && data.results.length > 0) {
                let randomdata = data.results[Math.floor(Math.random() * data.results.length)];
                setWallpaper(randomdata); // Set the wallpaper with the random result
            } else {
                console.log("No results found in the response.");
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            
            // Check if data.results exists and is not empty
            if (data && data.results && data.results.length > 0) {
               
                setTrending(data.results); // Set the wallpaper with the random result
            } else {
                console.log("No results found in the response.");
            }

        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        if (!wallpaper) {
            GetHeaderWallpaper(); // Call the function on component mount
        }
        if(!trending){
            GetTrending();
        }
    }, [wallpaper]);

    console.log(trending)

    return wallpaper && trending ?(
        <>  
            <Sidenav />
            <div className="w-[80%] h-full overflow-auto overflox-x-hidden">
                <Topnav />
                <Header data={wallpaper}/>
                <HorizontalCards data={trending}/>
            </div>
        </>
    ):<h1>Loading</h1>
};

export default Home;
