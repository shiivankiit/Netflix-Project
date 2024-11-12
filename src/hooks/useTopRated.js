import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRated } from "../utils/moviesSlice";
import { useEffect } from "react";

// Creating a custom hook
const useTopRated = () => {
    const dispatch = useDispatch();
    
    const getTopRated = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", // Corrected URL
            API_OPTIONS
        );
        const json = await data.json();
       // console.log(json.results);
        dispatch(addTopRated(json.results));
    };
  
    useEffect(() => {
        getTopRated();
    }, []);
};

export default useTopRated;
