"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from "./components/navbar";
import games from './games.json';

export default function Home() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState({
    date: "",
    time: "",
    awayTeam: "",
    homeTeam: "",
    tvProvider: ""
  });

  useEffect(() => {
    const parsedData = games.map(item => ({
      date: item.date,
      time: item.time,
      awayTeam: item.away_team_name,
      homeTeam: item.home_team_name,
      tvProvider: item.tv_providers,
    })).sort((a, b) => {
      const getYear = (dateStr) => {
        const month = dateStr.split(' ')[1];
        return ['January', 'February', 'March', 'April', 'May', 'June'].includes(month) ? 2026 : 2025;
      };
      const dateA = new Date(a.date + ", " + getYear(a.date));
      const dateB = new Date(b.date + ", " + getYear(b.date));
      return dateA - dateB;
    });
    setData(parsedData);
  }, []);

  const filteredData = useMemo(() => {
    const searchTerm = filter.toLowerCase();
    return data.filter(item => {
      const matchesGlobal = !searchTerm || 
        item.date.toLowerCase().includes(searchTerm) ||
        item.time.toLowerCase().includes(searchTerm) ||
        item.awayTeam.toLowerCase().includes(searchTerm) ||
        item.homeTeam.toLowerCase().includes(searchTerm) ||
        item.tvProvider.toLowerCase().includes(searchTerm);
      
      const matchesColumns = 
        item.date.toLowerCase().includes(columnFilters.date.toLowerCase()) &&
        item.time.toLowerCase().includes(columnFilters.time.toLowerCase()) &&
        item.awayTeam.toLowerCase().includes(columnFilters.awayTeam.toLowerCase()) &&
        item.homeTeam.toLowerCase().includes(columnFilters.homeTeam.toLowerCase()) &&
        item.tvProvider.toLowerCase().includes(columnFilters.tvProvider.toLowerCase());
      
      return matchesGlobal && matchesColumns;
    });
  }, [data, filter, columnFilters]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-2">
            NBA National TV Schedule
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Search by team, date, or TV provider
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
          
          {filteredData.length > 0 && (
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Showing {filteredData.length} game{filteredData.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

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
                      placeholder="Filter..."
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
                    <input
                      type="text"
                      className="w-full px-2 py-1 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded"
                      placeholder="Filter..."
                      value={columnFilters.awayTeam}
                      onChange={(e) => setColumnFilters(prev => ({...prev, awayTeam: e.target.value}))}
                    />
                  </th>
                  <th className="px-6 pb-3">
                    <input
                      type="text"
                      className="w-full px-2 py-1 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded"
                      placeholder="Filter..."
                      value={columnFilters.homeTeam}
                      onChange={(e) => setColumnFilters(prev => ({...prev, homeTeam: e.target.value}))}
                    />
                  </th>
                  <th className="px-6 pb-3">
                    <input
                      type="text"
                      className="w-full px-2 py-1 text-xs bg-white dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-500 rounded"
                      placeholder="Filter..."
                      value={columnFilters.tvProvider}
                      onChange={(e) => setColumnFilters(prev => ({...prev, tvProvider: e.target.value}))}
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
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
      </main>
    </div>
  );
}
