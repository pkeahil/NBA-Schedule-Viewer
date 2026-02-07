"use client";

import React from 'react';
import { getProviderColor } from '../utils/providerColors';
import { getMatchupGradient, getTeamColors } from '../utils/teamColors';

export default function TodaysBanner({ games }) {
  const todaysGames = games.filter(game => {
    const getYear = (dateStr) => {
      const month = dateStr.split(' ')[1];
      return ['January', 'February', 'March', 'April', 'May', 'June'].includes(month) ? 2026 : 2025;
    };
    
    const gameDate = new Date(game.date + ", " + getYear(game.date));
    const today = new Date();
    
    return gameDate.toDateString() === today.toDateString();
  }).sort((a, b) => {
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

  if (todaysGames.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Today's Games
        </h2>
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700 p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No games scheduled for today</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Today's Games ({todaysGames.length})
      </h2>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
          {todaysGames.map((game, index) => {
            const providers = game.tvProvider.split(', ').map(p => p.trim());
            const gradient = getMatchupGradient(game.awayTeam, game.homeTeam);
            const awayTeam = getTeamColors(game.awayTeam);
            const homeTeam = getTeamColors(game.homeTeam);
            return (
            <div
              key={index}
              className="flex-shrink-0 rounded-lg shadow border border-gray-200 dark:border-zinc-700 overflow-hidden min-w-[240px] relative"
              style={{ background: gradient }}
            >
              <div className="relative bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm p-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {game.time} ET
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-center gap-2">
                      {awayTeam.logo && (
                        <img src={awayTeam.logo} alt={game.awayTeam} className="w-8 h-8" />
                      )}
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {game.awayTeam}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">@</div>
                    <div className="flex items-center justify-center gap-2">
                      {homeTeam.logo && (
                        <img src={homeTeam.logo} alt={game.homeTeam} className="w-8 h-8" />
                      )}
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {game.homeTeam}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 justify-center">
                    {providers.map((provider, i) => {
                      const colors = getProviderColor(provider);
                      return (
                        <span key={i} className={`text-xs font-medium rounded-full px-3 py-1 ${colors.bg} ${colors.text}`}>
                          {provider}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}
