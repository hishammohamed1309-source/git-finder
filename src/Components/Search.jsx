
import React from "react";

function Search({ username, setUsername, onSearch }) {
  return (
    <form
      onSubmit={onSearch}
      className="flex flex-col sm:flex-row gap-3 w-full"
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username..."
        className="flex-1 min-w-0 bg-slate-800 text-white border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
