import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies = [] }) => { // Default to an empty array
    //console.log(movies); // Debug to see what movies contains
    return (
        <div className="px-6">  
            <h1 className="text-md md:text-2xl font-semibold p-2 md:p-2 text-white">{title}</h1>
            <div className="flex overflow-x-scroll overflow" style={{ scrollbarWidth: 'thin', scrollbarColor: 'black transparent' }}>
                {movies && movies.length > 0 ? (
                    <div className="flex">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} posterPath={movie.poster_path} />
                        ))}
                    </div>
                ) : (
                    <p className="text-white">Loading movies...</p> // Loading fallback
                )}
            </div>
        </div>
    );
};

export default MovieList;
