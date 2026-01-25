export default function SearchBar({ filter, setFilter, showOnlyFuture, setShowOnlyFuture, resultCount }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 mb-8">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-2">
        NBA National TV Schedule
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Search by team, date, or TV provider. Use "OR" to search multiple terms (e.g., "Rockets OR Thunder")
      </p>
      
      <div className="relative">
        <input
          type="search"
          className="w-full px-4 py-3 pl-11 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search games..."
          aria-label="Search games"
        />
        <svg className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <div className="mt-4 flex items-center">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyFuture}
            onChange={(e) => setShowOnlyFuture(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-zinc-100 border-zinc-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
          />
          <span className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">Show only future games</span>
        </label>
      </div>
      
      {resultCount > 0 && (
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Showing {resultCount} game{resultCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
