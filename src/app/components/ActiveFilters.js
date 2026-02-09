export default function ActiveFilters({ filter, columnFilters, onRemoveFilter, onClearAll }) {
  const activeFilters = [];
  if (filter) activeFilters.push({ label: `Search: ${filter}`, key: 'global' });
  if (columnFilters?.date) activeFilters.push({ label: `Date: ${columnFilters.date}`, key: 'date' });
  if (columnFilters?.time) activeFilters.push({ label: `Time: ${columnFilters.time}`, key: 'time' });
  if (columnFilters?.awayTeam) activeFilters.push({ label: `Away: ${columnFilters.awayTeam}`, key: 'awayTeam' });
  if (columnFilters?.homeTeam) activeFilters.push({ label: `Home: ${columnFilters.homeTeam}`, key: 'homeTeam' });
  if (columnFilters?.tvProvider) activeFilters.push({ label: `TV: ${columnFilters.tvProvider}`, key: 'tvProvider' });

  if (activeFilters.length === 0) return null;

  return (
    <>
      <button
        onClick={onClearAll}
        className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium whitespace-nowrap"
      >
        Clear all
      </button>
      <div className="mt-2 flex flex-wrap gap-2">
        {activeFilters.map((f) => (
          <span
            key={f.key}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded-full"
          >
            {f.label}
            <button
              onClick={() => onRemoveFilter(f.key)}
              className="hover:text-orange-600 dark:hover:text-orange-400"
              aria-label={`Remove ${f.label} filter`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </>
  );
}
