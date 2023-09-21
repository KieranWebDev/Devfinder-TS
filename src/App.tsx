import { useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';

// styles
import './App.css';
// components
import NavBar from './Components/NavBar';
import SearchBar from './Components/SearchBar';
import ErrorMessages from './Components/SearchResults/ErrorMessages';
import SearchResults from './Components/SearchResults/SearchResults';

export interface userData {
  name: string;
  avatar_url: string;
  html_url: string;
  login: string;
  created_at: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
  [key: string]: unknown;
}

function App() {
  const [userData, setUserData] = useState<userData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('octocat');
  const [validUsername, setValidUsername] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // dark mode
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage<string>(
    'theme',
    defaultDark ? 'dark' : 'light'
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setValidUsername(true);
        const response = await fetch(
          `https://api.github.com/users/${searchQuery}`
        );
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setUserData(data);
          setLoading(false);
        } else if (data.message) {
          setValidUsername(false);
          setLoading(false);
          setError(data.message);
          console.log(error);
        }
      } catch (err) {
        if (typeof error === 'object') {
          setError(error);
        }
        // console.log(error);
      }
    }
    fetchData();
  }, [searchQuery, error]);

  return (
    <div className="body" data-theme={theme}>
      <div className="app-container">
        <NavBar theme={theme} setTheme={setTheme} />
        <SearchBar
          setSearchQuery={setSearchQuery}
          validUsername={validUsername}
        />
        {loading && <h1>Loading...</h1>}

        {validUsername && !loading && <SearchResults userData={userData} />}
        <ErrorMessages
          validUsername={validUsername}
          searchQuery={searchQuery}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
