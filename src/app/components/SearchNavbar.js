import ThemeToggle from './ThemeToggle';

export default function SearchNavbar({ filter, setFilter, resultCount, columnFilters, onClearFilters }) {
  const removeFilter = (key) => {
    if (key === 'global') {
      setFilter('');
    } else if (onClearFilters) {
      onClearFilters(key);
    }
  };

  const clearAll = () => {
    setFilter('');
    if (onClearFilters) onClearFilters('all');
  };

  const hasActiveFilters = filter || Object.values(columnFilters || {}).some(v => v);

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Main row - responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent whitespace-nowrap">
            NBA Schedule
          </h1>
          
          <div className="flex-1 relative">
            <input
              type="search"
              className="w-full px-3 py-2 pl-9 text-sm text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search games..."
              aria-label="Search games"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium whitespace-nowrap"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Active filters row */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filter && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">
                Search: {filter}
                <button
                  onClick={() => removeFilter('global')}
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                  aria-label="Remove search filter"
                >
                  ×
                </button>
              </span>
            )}
            {columnFilters?.date && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">
                Date: {columnFilters.date}
                <button
                  onClick={() => removeFilter('date')}
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                  aria-label="Remove date filter"
                >
                  ×
                </button>
              </span>
            )}
            {columnFilters?.time && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">
                Time: {columnFilters.time}
                <button
                  onClick={() => removeFilter('time')}
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                  aria-label="Remove time filter"
                >
                  ×
                </button>
              </span>
            )}
            {columnFilters?.awayTeam && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">
                Away: {columnFilters.awayTeam}
                <button
                  onClick={() => removeFilter('awayTeam')}
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                  aria-label="Remove away team filter"
                >
                  ×
                </button>
              </span>
            )}
            {columnFilters?.homeTeam && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">
                Home: {columnFilters.homeTeam}
                <button
                  onClick={() => removeFilter('homeTeam')}
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                  aria-label="Remove home team filter"
                >
                  ×
                </button>
              </span>
            )}
            {columnFilters?.tvProvider && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full">
                TV: {columnFilters.tvProvider}
                <button
                  onClick={() => removeFilter('tvProvider')}
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                  aria-label="Remove TV provider filter"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Result count */}
        {resultCount > 0 && (
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            {resultCount} game{resultCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
