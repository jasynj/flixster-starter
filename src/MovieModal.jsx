import { useEffect, useState } from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movie) return;

      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`;

      const response = await fetch(url);
      const data = await response.json();
      setMovieDetails(data);
    };

    fetchMovieDetails();
  }, [movie]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!movie || !movieDetails) return null;

  const movieModalComponent = () => {
    return(
        <div className="modal-content">
        <button className="modal-close" onClick={onClose}>x</button>

        <div
          className="modal-backdrop"
          style={{
            backgroundImage: movieDetails.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path})`
              : 'none'
          }}
        >
          <div className="modal-backdrop-overlay"></div>
        </div>

        <div className="modal-details">
          <h2 className="modal-title">{movieDetails.title}</h2>

          <div className="modal-info">
            <div className="modal-info-item">
              <span className="info-label">Release Date:</span>
              <span className="info-value">
                {new Date(movieDetails.release_date).toLocaleDateString()}
              </span>
            </div>

            <div className="modal-info-item">
              <span className="info-label">Runtime:</span>
              <span className="info-value">
                {movieDetails.runtime} minutes
              </span>
            </div>

            <div className="modal-info-item">
              <span className="info-label">Genres:</span>
              <span className="info-value">
                {movieDetails.genres.map(genre => genre.name).join(', ')}
              </span>
            </div>

            <div className="modal-info-item">
              <span className="info-label">Rating:</span>
              <span className="info-value">
                <span className="modal-vote">{movieDetails.vote_average.toFixed(1)}</span>
                <span className="modal-vote-count">({movieDetails.vote_count} votes)</span>
              </span>
            </div>
          </div>

          <div className="modal-overview">
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="modal-overlay">
        {movieModalComponent()}

    </div>
  );
};

export default MovieModal;
