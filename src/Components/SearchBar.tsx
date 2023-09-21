import { useState } from 'react';

// styles
import './SearchBar.css';
import searchicon from '../images/icon-search.svg';

interface SearchBarProps {
  setSearchQuery: (searchQuery: string) => void;
  validUsername: boolean;
}

export default function SearchBar({
  setSearchQuery,
  validUsername,
}: SearchBarProps) {
  const [tempVal, setTempVal] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTempVal(e.target.value);
    console.log(tempVal);
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setSearchQuery(tempVal);
  }

  return (
    <div className="search-bar-container">
      <form className="form-container">
        <img src={searchicon} alt="searchicon" />
        <input
          type="text"
          placeholder="Search GitHub username..."
          onChange={handleChange}
        />

        {!validUsername && <span className="no-results">No Results</span>}
        <button onClick={(e) => handleSubmit(e)}>Search</button>
      </form>
    </div>
  );
}
