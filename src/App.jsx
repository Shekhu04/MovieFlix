import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import PersonDetails from "./components/PersonDetails";
import TvDetails from "./components/TvDetails";
import Trailer from "./components/partials/Trailer";

const App = () => {
  return (
    <div className="bg-[#1f1e24] min-h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />

        <Route path="/movies/details/:id" element={<MovieDetails />} >
           
           <Route path="/movies/details/:id/trailer" element={<Trailer/>}>
           </Route>
        </Route>

        <Route path="/movie/details/:id" element={<MovieDetails />} >
        <Route path="/movie/details/:id/trailer" element={<Trailer/>}></Route>
        </Route>
         
        <Route path="/tvshows" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path="/people" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
      </Routes>
    </div>
  );
};

export default App;
