import SearchableDropdown from './SearchableDropdown';

export default function GamesTable({ data, columnFilters, setColumnFilters }) {
  // Extract unique values for dropdowns
  const uniqueTeams = [...new Set([
    ...data.map(item => item.awayTeam),
    ...data.map(item => item.homeTeam)
  ])].sort();

  const uniqueProviders = [...new Set(
    data.flatMap(item => 
      item.tvProvider.split(', ').map(provider => provider.trim())
    )
  )].sort();

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-100 dark:bg-zinc-700">
            <tr>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Date</th>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Time</th>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Away Team</th>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Home Team</th>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">TV Provider</th>
            </tr>
            <tr className="bg-zinc-50 dark:bg-zinc-700">
              <th className="px-6 pb-3">
                <input
                  type="text"
                  className="w-full px-2 py-1 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded"
                  placeholder="Filter... (use OR)"
                  value={columnFilters.date}
                  onChange={(e) => setColumnFilters(prev => ({...prev, date: e.target.value}))}
                />
              </th>
              <th className="px-6 pb-3">
                <input
                  type="text"
                  className="w-full px-2 py-1 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded"
                  placeholder="Filter..."
                  value={columnFilters.time}
                  onChange={(e) => setColumnFilters(prev => ({...prev, time: e.target.value}))}
                />
              </th>
              <th className="px-6 pb-3">
                <SearchableDropdown
                  options={uniqueTeams}
                  value={columnFilters.awayTeam}
                  onChange={(value) => setColumnFilters(prev => ({...prev, awayTeam: value}))}
                  placeholder="Filter..."
                />
              </th>
              <th className="px-6 pb-3">
                <SearchableDropdown
                  options={uniqueTeams}
                  value={columnFilters.homeTeam}
                  onChange={(value) => setColumnFilters(prev => ({...prev, homeTeam: value}))}
                  placeholder="Filter..."
                />
              </th>
              <th className="px-6 pb-3">
                <SearchableDropdown
                  options={uniqueProviders}
                  value={columnFilters.tvProvider}
                  onChange={(value) => setColumnFilters(prev => ({...prev, tvProvider: value}))}
                  placeholder="Filter..."
                />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">{item.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.awayTeam}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.homeTeam}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {item.tvProvider}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                  No games found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
