import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import { useState } from 'react';
import axios from "../utils/axios"
import Loading from './Loading';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("all")
    const [duration , setDuration] = useState("day")
    const [trending,setTrending] = useState([])
    const [page,setPage] = useState(1)
    const [hasMore , setHasMore] = useState(true);

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
            if (data && data.results && data.results.length > 0) {  
                //setTrending(data.results);

                if(data.results.length > 0){
                    setTrending((prevState) => [...prevState, ...data.results]);
                    setPage(page+1);
                } else {
                    setHasMore(false);
                }
               
            } else {
                console.log("No results found in the response.");
            }
            console.log(data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const refreshHandler = () => {
        if(trending.length === 0){
            GetTrending();
        } else{
            setPage(1);
            setTrending([]);
            GetTrending();
        }
    }
   

    useEffect(() => {
       refreshHandler()
    }, [category,duration]);

    return trending.length > 0 ?(
    <div className="w-screen h-screen">

        <div className=" px-[5%] w-full flex items-center justify-between">
            <h1 className="w-[20%] text-2xl font-semibold text-zinc-400">
                <i onClick={() => navigate(-1)}
                className='hover:text-[#6556cd] ri-arrow-left-line mr-1'></i>
                Trending
            </h1>
            <div className="flex items-center w-[80%]">
            <Topnav/>
            <Dropdown title="Category" options={["movie","tv", "all"]}
            func={(e) => setCategory(e.target.value)}/>
             
             <div className="w-[2%]"></div>
            <Dropdown title="Duration" options={["week","day"]}
            func={(e) => setDuration(e.target.value)}/>  
            </div>
        </div>

        <InfiniteScroll
            dataLength={trending.length}
            next = {GetTrending}          
            hasMore = {true}
            loader = {<h1>Loading...</h1>}
            >
            <Cards data={trending} title={category}/> 
        </InfiniteScroll>
       

    </div>
  ) : <Loading/>
}

export default Trending