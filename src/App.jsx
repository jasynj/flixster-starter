import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import SearchForm from './SearchForm'
import SortForm from './SortForm'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('nowPlaying'); // 'nowPlaying' or 'search'

  const handleSearch = (query) => {
    setSearchQuery(query);
    setView('search');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setView('nowPlaying');
  };

  const handleViewToggle = (selectedView) => {
    setView(selectedView);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <SearchForm onSearch={handleSearch} onClear={handleClearSearch} />
        <SortForm />
      </header>
      <MovieList
        searchQuery={searchQuery}
        view={view}
        onViewToggle={handleViewToggle}
      />
    </div>
  )
}

export default App
