"use client";

import React from 'react';

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
            return (
            <div
              key={index}
              className="flex-shrink-0 bg-white dark:bg-zinc-800 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700 p-4 min-w-[280px]"
            >
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {game.time} ET
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-right flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {game.awayTeam}
                    </div>
                  </div>
                  
                  <div className="mx-3 text-gray-400 dark:text-gray-500 font-bold">
                    @
                  </div>
                  
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {game.homeTeam}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 justify-center">
                  {providers.map((provider, i) => (
                    <span key={i} className="text-xs text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 rounded-full px-3 py-1">
                      {provider}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}
