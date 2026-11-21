
import React from "react";

function Profile({ user }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 mt-8">

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-blue-500 object-cover"
        />

        <div className="flex-1 text-center sm:text-left min-w-0">

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {user.name || user.login}
          </h2>

          <p className="text-blue-400 mt-1">
            @{user.login}
          </p>

          <p className="text-slate-300 mt-4 leading-7">
            {user.bio || "No bio available"}
          </p>

          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            View GitHub Profile ↗
          </a>

        </div>
      </div>

      <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3 mt-8">

        <Stat title="Repositories" value={user.public_repos} />

        <Stat title="Followers" value={user.followers} />

        <Stat title="Following" value={user.following} />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-slate-300">

        <p>📍 {user.location || "Not available"}</p>

        <p>🏢 {user.company || "Not available"}</p>

        <p className="break-all">
          🌐 {user.blog ? (
            <a
              href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              {user.blog}
            </a>
          ) : "Not available"}
        </p>

        <p>✉ {user.email || "Not publicly available"}</p>

      </div>

    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-slate-900 rounded-xl p-5 text-center">
      <h3 className="text-slate-400 text-sm">{title}</h3>

      <p className="text-2xl font-bold text-white mt-2">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default Profile;
