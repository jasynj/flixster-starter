import './App.css'
import MovieList from './MovieList'
import SearchForm from './SearchForm'
import SortForm from './SortForm'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixster</h1>
        <SearchForm/>
        <SortForm/>
      </header>
      <MovieList />
    </div>
  )
}

export default App
