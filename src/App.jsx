import { useState } from 'react'
import './App.css'
import MovieCard from './MovieCard'
import data from './data/data'

const App = () => {
  // Get the movies from the data
  const movies = data.results;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
      </header>
      <div className="movie-container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default App
