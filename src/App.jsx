import {Route,Routes} from "react-router-dom"
import Home from "./components/Home";
import Loading from "./components/Loading";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";

const App = () => {
  return(
  <div className=" bg-[#1f1e24] w-screen h-screen flex">

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/trending" element={<Trending/>} />
      <Route path="/popular" element={<Popular/>} />
      <Route path="/movies" element={<Movie/>} />
      <Route path="/tvshows" element={<Tvshows/>} />
      <Route path="/people" element={<People/>} />
    </Routes>

  </div>
  );
}

export default App
