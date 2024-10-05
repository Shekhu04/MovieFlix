import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import { useState } from 'react';
import axios from "../utils/axios"
import Loading from './Loading';
import Cards from './partials/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState("popular")
    const [person,setPerson] = useState([])
    const [page,setPage] = useState(1)
    const [hasMore , setHasMore] = useState(true);
    document.title = "MovieFlix | TV Shows "

    const GetPerson = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            if (data && data.results && data.results.length > 0) {  

                if(data.results.length > 0){
                    setPerson((prevState) => [...prevState, ...data.results]);
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
        if(person.length === 0){
            GetPerson();
        } else{
            setPage(1);
            setPerson([]);
            GetPerson();
        }
    }
   

    useEffect(() => {
       refreshHandler()
    }, [category]);


   return (
        person.length > 0 ?(
            <div className="w-screen h-screen">
        
                <div className=" px-[5%] w-full flex items-center justify-between">
                    <h1 className="w-[20%] text-2xl font-semibold text-zinc-400">
                        <i onClick={() => navigate(-1)}
                        className='hover:text-[#6556cd] ri-arrow-left-line mr-1'></i>
                        People
                    </h1>
                    <div className="flex items-center w-[80%]">
                    <Topnav/>
                    </div>
                </div>
        
                <InfiniteScroll
                    dataLength={person.length}
                    next = {GetPerson}          
                    hasMore = {true}
                    loader = {<h1>Loading...</h1>}
                    >
                    <Cards data={person} title="person"/> 
                </InfiniteScroll>
               
        
            </div>
          ) : <Loading/>
      )
}

export default People