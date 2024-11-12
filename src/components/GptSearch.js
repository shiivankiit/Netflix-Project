import React from 'react';
import GptMovieSuggestions from './GptMovieSuggestions';
import GptSearchBar from './GptSearchBar';
import { BG_URL } from '../utils/constants';

const GptSearch = () => {
  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="absolute -z-10 inset-0">
        <img
          className="object-cover w-full h-full"
          src={BG_URL}
          alt="background"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
