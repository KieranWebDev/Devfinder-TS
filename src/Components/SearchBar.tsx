import React from 'react';
import { useState } from 'react';

// styles
import './SearchBar.css';
import searchicon from '../images/icon-search.svg';

export default function SearchBar({ setSearchQuery, validUsername }) {
  const [tempVal, setTempVal] = useState('');

  function handleSubmit(e) {
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
          onChange={(e) => setTempVal(e.target.value)}
        />

        {!validUsername && <span className="no-results">No Results</span>}
        <button onClick={handleSubmit}>Search</button>
      </form>
    </div>
  );
}
