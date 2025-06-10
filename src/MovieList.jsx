import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <main className="movie-list-container">
      <h2 className="section-title">Now Playing</h2>
      <section className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  );
};

export default MovieList;
