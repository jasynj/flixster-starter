import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import './MovieList.css';

const MovieList = ({ searchQuery, view, onViewToggle }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const fetchMovies = async (pageNum = 1) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNum}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
      }

      // this is for checking if there are more pages to load
      setHasMore(data.page < data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies. Please try again later.");
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  // search for more movies when the search query changes
  useEffect(() => {
    const searchMovies = async () => {
      if (!searchQuery.trim()) return;

      setLoading(true);

      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSearchResults(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error searching movies:", error);
        setError("Failed to search movies. Please try again later.");
        setLoading(false);
      }
    };

    if (view === 'search') {
      searchMovies();
    }
  }, [searchQuery, view]);

  const handleViewToggle = (selectedView) => {
    onViewToggle(selectedView);
    if (selectedView === 'nowPlaying' && movies.length === 0) {
      fetchMovies(1);
    }
  };

  // initial fetch of
  useEffect(() => {
    if (view === 'nowPlaying') {
      fetchMovies(1);
    }
  }, [view]);

  if (loading && page === 1) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const displayedMovies = view === 'nowPlaying' ? movies : searchResults;
  const title = view === 'nowPlaying' ? 'Now Playing' : `Search Results for "${searchQuery}"`;

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <main className="movie-list-container">
      <div className="view-toggle">
        <button
          className={`toggle-button ${view === 'nowPlaying' ? 'active' : ''}`}
          onClick={() => handleViewToggle('nowPlaying')}
        >
          Now Playing
        </button>
        <button
          className={`toggle-button ${view === 'search' ? 'active' : ''}`}
          onClick={() => handleViewToggle('search')}
          disabled={searchResults.length === 0}
        >
          Search Results
        </button>
      </div>

      <h2 className="section-title">{title}</h2>

      {displayedMovies.length === 0 && !loading ? (
        <div className="no-results">No movies found</div>
      ) : (
        <section className="movie-list">
          {displayedMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleMovieClick}
            />
          ))}
        </section>
      )}

      {view === 'nowPlaying' && hasMore && !loading && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default MovieList;
