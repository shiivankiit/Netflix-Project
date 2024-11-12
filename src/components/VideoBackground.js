import {useSelector} from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

// we will make a api call to fetch the video bg and for this we need id of the movie. 
const VideoBackground = ({movieId}) => {
    //to get trailer from the store we will be using useSelector.
    const trailerVideo=useSelector((store)=>store.movies?.trailerVideo);
    useMovieTrailer(movieId);
   return (
    <div className="w-screen">
        <iframe 
         className="w-screen aspect-video" 
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?autoplay=1&mute=1"} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin"
        >
         </iframe>
    </div>
  )
};

export default VideoBackground; 

