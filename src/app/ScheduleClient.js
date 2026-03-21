"use client";

import { useState, useMemo } from 'react';
import SearchNavbar from "./components/SearchNavbar";
import GamesTable from "./components/GamesTable";
import TodaysBanner from "./components/TodaysBanner";
import { filterGames } from "./utils/filterGames";
import { parseGameDateTime } from "./utils/dateUtils";

export default function ScheduleClient({ games }) {
  const [filter, setFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState({
    date: "", time: "", awayTeam: "", homeTeam: "", tvProvider: ""
  });
  const [timeFilter, setTimeFilter] = useState("all");

  const data = useMemo(() =>
    games
      .map(item => ({
        date: item.date,
        time: item.time,
        gameDateTime: parseGameDateTime(item.game_time_et),
        awayTeam: item.away_team_name,
        homeTeam: item.home_team_name,
        tvProvider: item.tv_providers,
        gameId: item.game_id,
      }))
      .sort((a, b) => a.gameDateTime - b.gameDateTime),
    [games]
  );

  const filteredData = useMemo(() =>
    filterGames(data, filter, columnFilters, timeFilter).filter(game =>
      game.awayTeam && game.homeTeam && game.awayTeam !== 'TBD' && game.homeTeam !== 'TBD'
    ),
    [data, filter, columnFilters, timeFilter]
  );

  const handleClearFilters = (key) => {
    if (key === 'all') {
      setColumnFilters({ date: "", time: "", awayTeam: "", homeTeam: "", tvProvider: "" });
    } else {
      setColumnFilters(prev => ({ ...prev, [key]: "" }));
    }
  };

  return (
    <>
      <SearchNavbar
        filter={filter}
        setFilter={setFilter}
        resultCount={filteredData.length}
        columnFilters={columnFilters}
        onClearFilters={handleClearFilters}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodaysBanner games={data} />
        <GamesTable
          data={filteredData}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
        />
      </main>
    </>
  );
}
