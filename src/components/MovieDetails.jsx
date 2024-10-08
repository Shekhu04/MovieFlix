import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadmovie, removeMovie } from '../store/actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import HorizontalCards from './partials/HorizontalCards';
import Trailer from './partials/Trailer';
import { Outlet } from 'react-router-dom';


const MovieDetails = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    const {info} = useSelector((state => state.movie));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(asyncloadmovie(id));
        return () => {
            dispatch(removeMovie());
        };
    },[id]);
  return info ?(
    <div 
        style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.4),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${info.deatil.backdrop_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
       
        }}
        className="relative w-screen h-[140vh] px-[10%]"
    >
        {/* Part 1 Navigation */}
        <nav className='h-[10vh] w-full text-zinc-200 flex items-center gap-10 text-xl'>
            <Link onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line">
            </Link>
            <a target="_blank" href={info.deatil.homepage}><i className="ri-external-link-fill"></i></a>
            <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className='ri-earth-fill'></i></a>
            <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>imdb</a>
        </nav>

        {/* Part 2 Poster and details */}
        <div className="w-full flex"> 

        <img 
                   className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh]' 
                   src={`https://image.tmdb.org/t/p/original/${info.deatil.poster_path || info.deatil.backdrop_path}`} 
                   alt=""/>
         

         <div className='content ml-[5%] text-white'>

            <h1 className='text-5xl font-black '>
                {info.deatil.name || info.deatil.title || info.deatil.original_name || info.deatil.original_title}

                <small className="text-2xl font-bold text-zinc-300">({info.deatil.release_date.split("-")[0]})</small>
            </h1>

            <div className="flex mt-3 mb-5 items-center gap-x-3">
                    <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">{(info.deatil.vote_average * 10).toFixed()}
                    <sup>%</sup></span>
                    <h1 className="w-[60px] leading-6 font-semibold text-2xl">User Score</h1>
                    <h1>{info.deatil.release_date}</h1>
                    <h1>
                        {info.deatil.genres.map((g)=>g.name).join(",")}
                    </h1>
                    <h1>{info.deatil.runtime}min</h1>
             </div>

             <h1 className='text-xl font-semibold italic'>{info.deatil.tagline}</h1>

             <h1 className='text-2xl mb-3 mt-5'>Overview</h1>
             <p className="mb-10">{info.deatil.overview}</p>

             
             {/* <h1 className='text-2xl mb-3 mt-5'>Movie Translated</h1>
             <p>{info.translations.join(", ")}</p> */}

             <Link className="p-5 bg-[#6556cd] rounded-lg" to={`${pathname}/trailer`}>
             <i className="text-xl mr-3 ri-play-fill"></i>
             Play Trailer</Link>
         </div>


        </div>

         {/* Part 3 Available on platforms */}

        <div className="w-[80%] flex flex-col gap-y-5 mt-10"> 
                   {info.watchproviders && info.watchproviders.flatrate && (
                        <div className="flex gap-x-10 items-center text-white">
                          <h1>Available on Platforms</h1>
                          {info.watchproviders.flatrate.map((w,i) =>(
                        <img 
                           key={i}
                           title = {w.provider_name}
                           className='w-[5vh] h-[5vh] object-cover rounded-md'
                           src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                           alt=""
                        />
                        ))}
                        </div>
                    )}

                    {info.watchproviders && info.watchproviders.rent && (
                        <div className="flex gap-x-10 items-center text-white">
                          <h1>Available on Rent</h1>
                          {info.watchproviders.rent.map((w,i) =>(
                        <img 
                           key={i}
                           title = {w.provider_name}
                           className='w-[5vh] h-[5vh] object-cover rounded-md'
                           src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                           alt=""
                        />
                        ))}
                        </div>
                    )}
                        {info.watchproviders && info.watchproviders.buy && (
                        <div className="flex gap-x-10 items-center text-white">
                          <h1>Available to Buy</h1>
                          {info.watchproviders.buy.map((w,i) =>(
                        <img 
                           key={i}
                           title = {w.provider_name}
                           className='w-[5vh] h-[5vh] object-cover rounded-md'
                           src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                           alt=""
                        />
                        ))}
                        </div>
                    )}
        </div>

        {/* Part 4 Recommendations and similar stuff */}
        <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500"/>
        <h1 className="text-3xl font-bold text-white">Recommendations & Similar Stuff</h1>
        <HorizontalCards 
              data={
                  info.recommendations.length > 0
                     ? info.recommendations
                       : info.similar
              }
        />

        <Outlet/>
    </div>
  ) : <Loading/>
};

export default MovieDetails