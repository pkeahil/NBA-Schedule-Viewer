"use client";

import React, { useState, useEffect, useMemo } from 'react';
import SearchNavbar from "./components/SearchNavbar";
import GamesTable from "./components/GamesTable";
import TodaysBanner from "./components/TodaysBanner";
import { useGameFilters } from "./hooks/useGameFilters";
import games from './games.json';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState({
    date: "",
    time: "",
    awayTeam: "",
    homeTeam: "",
    tvProvider: ""
  });
  const [showOnlyFuture, setShowOnlyFuture] = useState(false);

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
      
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA - dateB;
      }
      
      // Same date, sort by time
      const parseTime = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes = '0'] = time.split(':');
        let hour24 = parseInt(hours);
        if (period === 'p.m.' && hour24 !== 12) hour24 += 12;
        if (period === 'a.m.' && hour24 === 12) hour24 = 0;
        return hour24 * 60 + parseInt(minutes);
      };
      
      return parseTime(a.time) - parseTime(b.time);
    });
    setData(parsedData);
    setLoading(false);
  }, []);

  const filteredData = useMemo(() => 
    useGameFilters(data, filter, columnFilters, showOnlyFuture),
    [data, filter, columnFilters, showOnlyFuture]
  );

  const handleClearFilters = (key) => {
    if (key === 'all') {
      setColumnFilters({
        date: "",
        time: "",
        awayTeam: "",
        homeTeam: "",
        tvProvider: ""
      });
    } else {
      setColumnFilters(prev => ({ ...prev, [key]: "" }));
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NBA National TV Schedule Viewer",
    "description": "Find NBA games on your TV provider. Filter by ESPN, TNT, ABC, NBC, Prime Video and more.",
    "url": "https://nbaschd.vercel.app",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Web Browser"
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <SearchNavbar 
        filter={filter}
        setFilter={setFilter}
        resultCount={filteredData.length}
        columnFilters={columnFilters}
        onClearFilters={handleClearFilters}
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 animate-pulse">
              <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3 mb-6"></div>
              <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 animate-pulse">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <TodaysBanner games={data} />

            <GamesTable 
              data={filteredData}
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
              showOnlyFuture={showOnlyFuture}
              setShowOnlyFuture={setShowOnlyFuture}
            />
          </>
        )}
      </main>
    </div>
  );
}
