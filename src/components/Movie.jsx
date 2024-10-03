import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import { useState } from 'react';
import axios from "../utils/axios"
import Loading from './Loading';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Movie = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing")
    const [movie,setMovie] = useState([])
    const [page,setPage] = useState(1)
    const [hasMore , setHasMore] = useState(true);
    document.title = "MovieFlix | Movies " + category.toLocaleUpperCase();

    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            if (data && data.results && data.results.length > 0) {  

                if(data.results.length > 0){
                    setMovie((prevState) => [...prevState, ...data.results]);
                    setPage(page+1);
                } else {
                    setHasMore(false);
                }
               
            } else {
                console.log("No results found in the response.");
            }
            
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const refreshHandler = () => {
        if(movie.length === 0){
            GetMovie();
        } else{
            setPage(1);
            setMovie([]);
            GetMovie();
        }
    }
   

    useEffect(() => {
       refreshHandler()
    }, [category]);

    return (
        movie.length > 0 ?(
            <div className="w-screen h-screen">
        
                <div className=" px-[5%] w-full flex items-center justify-between">
                    <h1 className="w-[20%] text-2xl font-semibold text-zinc-400">
                        <i onClick={() => navigate(-1)}
                        className='hover:text-[#6556cd] ri-arrow-left-line mr-1'></i>
                        Movies <small className="ml-2 text-sm text-zinc-600">({category})</small>
                    </h1>
                    <div className="flex items-center w-[80%]">
                    <Topnav/>
                    <Dropdown title="Category" options={["popular","top_rated","upcoming","now_playing"]}
                    func={(e) => setCategory(e.target.value)}/>
                     
                    </div>
                </div>
        
                <InfiniteScroll
                    dataLength={movie.length}
                    next = {GetMovie}          
                    hasMore = {true}
                    loader = {<h1>Loading...</h1>}
                    >
                    <Cards data={movie} title={category}/> 
                </InfiniteScroll>
               
        
            </div>
          ) : <Loading/>
      )
}

export default Movie