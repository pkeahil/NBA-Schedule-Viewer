"use client";

import { useMemo } from 'react';
import SearchableDropdown from './SearchableDropdown';

export default function GamesTable({ data, columnFilters, setColumnFilters }) {
  // Memoize unique values - only recalculate when data changes
  const uniqueTeams = useMemo(() => 
    [...new Set([
      ...data.map(item => item.awayTeam),
      ...data.map(item => item.homeTeam)
    ])].sort(),
    [data]
  );

  const uniqueProviders = useMemo(() =>
    [...new Set(
      data.flatMap(item => 
        item.tvProvider.split(', ').map(provider => provider.trim())
      )
    )].sort(),
    [data]
  );

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-100 dark:bg-zinc-700">
            <tr>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Date</th>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Time</th>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Away Team</th>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Home Team</th>
              <th className="px-6 pt-4 pb-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">TV Provider</th>
            </tr>
            <tr className="bg-zinc-50 dark:bg-zinc-700 border-t-2 border-zinc-300 dark:border-zinc-600">
              <th className="px-6 pt-3 pb-3">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Column Filter</div>
                <input
                  type="text"
                  className="w-full px-2 py-1 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Filter... (use OR)"
                  value={columnFilters.date}
                  onChange={(e) => setColumnFilters(prev => ({...prev, date: e.target.value}))}
                  aria-label="Filter by date"
                />
              </th>
              <th className="px-6 pt-3 pb-3">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Column Filter</div>
                <input
                  type="text"
                  className="w-full px-2 py-1 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Filter..."
                  value={columnFilters.time}
                  onChange={(e) => setColumnFilters(prev => ({...prev, time: e.target.value}))}
                  aria-label="Filter by time"
                />
              </th>
              <th className="px-6 pt-3 pb-3">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Column Filter</div>
                <SearchableDropdown
                  options={uniqueTeams}
                  value={columnFilters.awayTeam}
                  onChange={(value) => setColumnFilters(prev => ({...prev, awayTeam: value}))}
                  placeholder="Filter..."
                  ariaLabel="Filter by away team"
                />
              </th>
              <th className="px-6 pt-3 pb-3">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Column Filter</div>
                <SearchableDropdown
                  options={uniqueTeams}
                  value={columnFilters.homeTeam}
                  onChange={(value) => setColumnFilters(prev => ({...prev, homeTeam: value}))}
                  placeholder="Filter..."
                  ariaLabel="Filter by home team"
                />
              </th>
              <th className="px-6 pt-3 pb-3">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Column Filter</div>
                <SearchableDropdown
                  options={uniqueProviders}
                  value={columnFilters.tvProvider}
                  onChange={(value) => setColumnFilters(prev => ({...prev, tvProvider: value}))}
                  placeholder="Filter..."
                  ariaLabel="Filter by TV provider"
                />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {data.length > 0 ? (
              data.map((item, index) => {
                const providers = item.tvProvider.split(', ').map(p => p.trim());
                return (
                  <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">{item.time} ET</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.awayTeam}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.homeTeam}</td>
                    <td className="px-6 py-4 text-sm text-zinc-900 dark:text-zinc-100">
                      <div className="flex flex-wrap gap-1">
                        {providers.map((provider, i) => (
                          <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {provider}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })
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

      {/* Mobile Cards */}
      <div className="md:hidden">
        {data.length > 0 ? (
          <div className="p-4 space-y-2">
            {data.map((item, index) => {
              const providers = item.tvProvider.split(', ').map(p => p.trim());
              return (
                <div key={index} className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.awayTeam} @ {item.homeTeam}</div>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                    <span>{item.date}</span>
                    <span>{item.time} ET</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {providers.map((provider, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {provider}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
            No games found matching your search
          </div>
        )}
      </div>
    </div>
  );
}
