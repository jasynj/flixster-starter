import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import SearchForm from './SearchForm'
import SortForm from './SortForm'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('nowPlaying'); // 'nowPlaying' or 'search'
  const [sortBy, setSortBy] = useState('default');

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

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <SearchForm onSearch={handleSearch} onClear={handleClearSearch} />
        <SortForm onSortChange={handleSortChange} />
      </header>
      <sidebar className='App-sidebar'>

      </sidebar>
      <MovieList searchQuery={searchQuery}  view={view}   sortBy={sortBy}  onViewToggle={handleViewToggle}/>
      <footer className='App-footer'>
        <p>Copyright © 2025 Flixster</p>
      </footer>
    </div>
  )
}

export default App
