import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  const handleClick = () => {
    onClick(movie);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={movie.poster_path ? `${posterBaseUrl}${movie.poster_path}` : '/placeholder-poster.svg'}
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
