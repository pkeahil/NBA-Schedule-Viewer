export default function SearchNavbar({ filter, setFilter, resultCount, columnFilters, onClearFilters }) {
  const activeFilters = [];
  if (filter) activeFilters.push({ label: `Search: ${filter}`, key: 'global' });
  if (columnFilters?.date) activeFilters.push({ label: `Date: ${columnFilters.date}`, key: 'date' });
  if (columnFilters?.time) activeFilters.push({ label: `Time: ${columnFilters.time}`, key: 'time' });
  if (columnFilters?.awayTeam) activeFilters.push({ label: `Away: ${columnFilters.awayTeam}`, key: 'awayTeam' });
  if (columnFilters?.homeTeam) activeFilters.push({ label: `Home: ${columnFilters.homeTeam}`, key: 'homeTeam' });
  if (columnFilters?.tvProvider) activeFilters.push({ label: `TV: ${columnFilters.tvProvider}`, key: 'tvProvider' });

  const removeFilter = (key) => {
    if (key === 'global') {
      setFilter('');
    } else if (onClearFilters) {
      onClearFilters(key);
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-zinc-800 dark:text-white whitespace-nowrap">
            NBA Schedule
          </h1>
          
          <div className="flex-1 relative">
            <input
              type="search"
              className="w-full px-3 py-2 pl-9 text-sm text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search games..."
              aria-label="Search games"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {activeFilters.length > 0 && (
            <button
              onClick={() => {
                setFilter('');
                if (onClearFilters) onClearFilters('all');
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
            >
              Clear all
            </button>
          )}
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <span
                key={f.key}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full"
              >
                {f.label}
                <button
                  onClick={() => removeFilter(f.key)}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label={`Remove ${f.label} filter`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {resultCount > 0 && (
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            {resultCount} game{resultCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
