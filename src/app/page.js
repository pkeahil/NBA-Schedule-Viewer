"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from "./components/navbar";
import SearchBar from "./components/SearchBar";
import GamesTable from "./components/GamesTable";
import TodaysBanner from "./components/TodaysBanner";
import { useGameFilters } from "./hooks/useGameFilters";
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
  }, []);

  const filteredData = useMemo(() => 
    useGameFilters(data, filter, columnFilters, showOnlyFuture),
    [data, filter, columnFilters, showOnlyFuture]
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodaysBanner games={data} />
        
        <SearchBar 
          filter={filter}
          setFilter={setFilter}
          showOnlyFuture={showOnlyFuture}
          setShowOnlyFuture={setShowOnlyFuture}
          resultCount={filteredData.length}
        />

        <GamesTable 
          data={filteredData}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </main>
    </div>
  );
}
