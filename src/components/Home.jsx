
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import { useState, useEffect } from 'react';
import axios from "../utils/axios";
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';
import Loading from './Loading';

const Home = () => {
    document.title = "MovieFlix | Homepage";
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null)
    const [category, setCategory] = useState("all");

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
            const { data } = await axios.get(`/trending/${category}/day`);
            
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
       GetTrending();

       !wallpaper && GetHeaderWallpaper();
     
        }, [category]);

   

    return wallpaper && trending ?(
        <>  
            <Sidenav />
            <div className="w-[80%] h-full overflow-auto overflox-x-hidden">
                <Topnav />
                <Header data={wallpaper}/>

                <div className="flex justify-between p-5">
                <h1 className="text-3xl font-semibold text-zinc-400">
                 Trending
                 </h1>

                <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e) => setCategory(e.target.value)}/>


        </div>
                <HorizontalCards data={trending}/>
            </div>
        </>
    ):<Loading/>
};

export default Home;
