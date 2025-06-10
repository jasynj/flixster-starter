// import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {

  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-card">
      <img
        src={`${posterBaseUrl}${movie.poster_path}`}
        alt={`${movie.title} poster`}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-vote">
          <span className="vote-average">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
