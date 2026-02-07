"use client";

import { useMemo } from 'react';
import SearchableDropdown from './SearchableDropdown';
import { getProviderColor } from '../utils/providerColors';
import { getTeamColors } from '../utils/teamColors';

export default function GamesTable({ data, columnFilters, setColumnFilters, showOnlyFuture, setShowOnlyFuture }) {
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
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow overflow-hidden">
      <div className="px-6 py-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">All Games</h2>
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={showOnlyFuture}
            onChange={(e) => setShowOnlyFuture(e.target.checked)}
            className="w-4 h-4 text-orange-600 bg-zinc-100 border-zinc-300 rounded focus:ring-orange-500 dark:bg-zinc-700 dark:border-zinc-600"
          />
          <span className="ml-2 text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Show only future games</span>
        </label>
      </div>
      
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
            <tr className="bg-zinc-50 dark:bg-zinc-700">
              <th className="px-6 pb-3">
                <input
                  type="text"
                  className="w-full px-2 py-1 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Filter... (use OR)"
                  value={columnFilters.date}
                  onChange={(e) => setColumnFilters(prev => ({...prev, date: e.target.value}))}
                  aria-label="Filter by date"
                />
              </th>
              <th className="px-6 pb-3">
                <input
                  type="text"
                  className="w-full px-2 py-1 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Filter..."
                  value={columnFilters.time}
                  onChange={(e) => setColumnFilters(prev => ({...prev, time: e.target.value}))}
                  aria-label="Filter by time"
                />
              </th>
              <th className="px-6 pb-3">
                <SearchableDropdown
                  options={uniqueTeams}
                  value={columnFilters.awayTeam}
                  onChange={(value) => setColumnFilters(prev => ({...prev, awayTeam: value}))}
                  placeholder="Filter..."
                  ariaLabel="Filter by away team"
                />
              </th>
              <th className="px-6 pb-3">
                <SearchableDropdown
                  options={uniqueTeams}
                  value={columnFilters.homeTeam}
                  onChange={(value) => setColumnFilters(prev => ({...prev, homeTeam: value}))}
                  placeholder="Filter..."
                  ariaLabel="Filter by home team"
                />
              </th>
              <th className="px-6 pb-3">
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
                const awayTeam = getTeamColors(item.awayTeam);
                const homeTeam = getTeamColors(item.homeTeam);
                return (
                  <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">{item.time} ET</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-2">
                        {awayTeam.logo && (
                          <img src={awayTeam.logo} alt={item.awayTeam} className="w-6 h-6" />
                        )}
                        {item.awayTeam}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-2">
                        {homeTeam.logo && (
                          <img src={homeTeam.logo} alt={item.homeTeam} className="w-6 h-6" />
                        )}
                        {item.homeTeam}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-900 dark:text-zinc-100">
                      <div className="flex flex-wrap gap-1">
                        {providers.map((provider, i) => {
                          const colors = getProviderColor(provider);
                          return (
                            <span key={i} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                              {provider}
                            </span>
                          );
                        })}
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
              const awayTeam = getTeamColors(item.awayTeam);
              const homeTeam = getTeamColors(item.homeTeam);
              return (
                <div key={index} className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-4">
                  <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center mb-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 justify-end text-right">
                      <span className="flex-1">{item.awayTeam}</span>
                      {awayTeam.logo && (
                        <img src={awayTeam.logo} alt={item.awayTeam} className="w-6 h-6 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 flex-shrink-0">@</span>
                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {homeTeam.logo && (
                        <img src={homeTeam.logo} alt={item.homeTeam} className="w-6 h-6 flex-shrink-0" />
                      )}
                      <span>{item.homeTeam}</span>
                    </div>
                  </div>
                  <div className="text-center text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                    {item.date} • {item.time} ET
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {providers.map((provider, i) => {
                      const colors = getProviderColor(provider);
                      return (
                        <span key={i} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                          {provider}
                        </span>
                      );
                    })}
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
