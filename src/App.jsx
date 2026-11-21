
import { useState, useEffect } from "react";

import Search from "./Components/Search";
import Profile from "./Components/Profile";

function App() {

  const [username, setUsername] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search button
  const handleSearch = (e) => {
    e.preventDefault();

    const value = username.trim();

    if (!value) {
      setError("Please enter a GitHub username");
      setUser(null);
      setSearchUsername("");
      return;
    }

    setSearchUsername(value);
  };

  // Fetch GitHub user
  useEffect(() => {

    if (!searchUsername) return;

    const controller = new AbortController();

    const fetchUser = async () => {

      setLoading(true);
      setError("");
      setUser(null);

      try {

        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(searchUsername)}`,
          { signal: controller.signal }
        );

        if (response.status === 404) {
          throw new Error("User not found!");
        }

        if (!response.ok) {
          throw new Error("Something went wrong. Try again!");
        }

        const data = await response.json();

        setUser(data);

      } catch (err) {

        if (err.name === "AbortError") return;

        setError(err.message);

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false);
        }

      }

    };

    fetchUser();

    return () => controller.abort();

  }, [searchUsername]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 sm:py-20">

      <div className="max-w-3xl mx-auto">

        {/* Header */}

        <header className="text-center mb-10">

          <div className="text-5xl mb-5">🐙</div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white">
            GitHub <span className="text-blue-500">Finder</span>
          </h1>

          <p className="text-slate-400 mt-4">
            Discover GitHub profiles in seconds
          </p>

        </header>

        {/* Search */}

        <Search
          username={username}
          setUsername={setUsername}
          onSearch={handleSearch}
        />

        {/* Loading */}

        {loading && (
          <p className="text-center text-blue-400 mt-8">
            Searching for user...
          </p>
        )}

        {/* Error */}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mt-8 text-center">
            {error}
          </div>
        )}

        {/* Profile */}

        {user && !loading && (
          <Profile user={user} />
        )}

        {/* Footer */}

        <footer className="text-center text-slate-500 mt-12 text-sm">
          Built with React & Tailwind CSS
        </footer>

      </div>

    </div>
  );
}

export default App;
