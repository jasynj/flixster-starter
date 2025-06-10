import './SearchForm.css';

const SearchForm = () =>
    {
        return(
            <div className="search-form">
                <form className="search-container">
                    <input className='search-bar' type="text" placeholder="Search for movies" />
                    <button className="search-button" type="submit">Search</button>
                    <button className="clear-button" type="clear">Clear</button>
                </form>
            </div>
        )
    }

export default SearchForm;
