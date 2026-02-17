import https from 'https';

async function getBoxScore(gameId) {
  const url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({
            gameId: json.game.gameId,
            gameDate: json.game.gameTimeUTC,
            arena: json.game.arena.arenaName,
            awayTeam: {
              name: json.game.awayTeam.teamName,
              score: json.game.awayTeam.score,
              players: json.game.awayTeam.players.filter(p => p.played === '1').map(p => ({
                name: p.name,
                position: p.position,
                starter: p.starter === '1',
                minutes: p.statistics.minutesCalculated,
                points: p.statistics.points,
                rebounds: p.statistics.reboundsTotal,
                assists: p.statistics.assists,
                steals: p.statistics.steals,
                blocks: p.statistics.blocks,
                turnovers: p.statistics.turnovers,
                fgm: p.statistics.fieldGoalsMade,
                fga: p.statistics.fieldGoalsAttempted,
                fg3m: p.statistics.threePointersMade,
                fg3a: p.statistics.threePointersAttempted,
                ftm: p.statistics.freeThrowsMade,
                fta: p.statistics.freeThrowsAttempted,
                plusMinus: p.statistics.plusMinusPoints
              }))
            },
            homeTeam: {
              name: json.game.homeTeam.teamName,
              score: json.game.homeTeam.score,
              players: json.game.homeTeam.players.filter(p => p.played === '1').map(p => ({
                name: p.name,
                position: p.position,
                starter: p.starter === '1',
                minutes: p.statistics.minutesCalculated,
                points: p.statistics.points,
                rebounds: p.statistics.reboundsTotal,
                assists: p.statistics.assists,
                steals: p.statistics.steals,
                blocks: p.statistics.blocks,
                turnovers: p.statistics.turnovers,
                fgm: p.statistics.fieldGoalsMade,
                fga: p.statistics.fieldGoalsAttempted,
                fg3m: p.statistics.threePointersMade,
                fg3a: p.statistics.threePointersAttempted,
                ftm: p.statistics.freeThrowsMade,
                fta: p.statistics.freeThrowsAttempted,
                plusMinus: p.statistics.plusMinusPoints
              }))
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

export default async function BoxScorePage({ params }) {
  const { gameId } = await params;
  const boxScore = await getBoxScore(gameId);
  
  const gameDate = new Date(boxScore.gameDate);
  const formattedDate = gameDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <a href="/" className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 mb-2 inline-block">← Back to Schedule</a>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Box Score</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Game Header */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              {boxScore.awayTeam.name} @ {boxScore.homeTeam.name}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              {formattedDate} • {boxScore.arena}
            </p>
            <div className="text-5xl font-bold text-zinc-900 dark:text-white">
              {boxScore.awayTeam.score} - {boxScore.homeTeam.score}
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className="mb-6">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow overflow-hidden">
            <div className="px-6 py-3 border-b border-zinc-200 dark:border-zinc-700">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">{boxScore.awayTeam.name}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100 dark:bg-zinc-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">Player</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">MIN</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">PTS</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">REB</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">AST</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">STL</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">BLK</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">TO</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">FG</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">3PT</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">FT</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">+/-</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {boxScore.awayTeam.players.map((player, i) => (
                    <tr key={i} className={`hover:bg-zinc-50 dark:hover:bg-zinc-700/50 ${player.starter ? 'font-semibold' : ''}`}>
                      <td className="px-4 py-3 text-zinc-900 dark:text-white">{player.name}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.minutes.replace('PT', '').replace('M', '')}</td>
                      <td className="px-2 py-3 text-center text-zinc-900 dark:text-white font-semibold">{player.points}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.rebounds}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.assists}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.steals}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.blocks}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.turnovers}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.fgm}-{player.fga}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.fg3m}-{player.fg3a}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.ftm}-{player.fta}</td>
                      <td className={`px-2 py-3 text-center font-semibold ${player.plusMinus >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {player.plusMinus > 0 ? '+' : ''}{player.plusMinus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Home Team */}
        <div>
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow overflow-hidden">
            <div className="px-6 py-3 border-b border-zinc-200 dark:border-zinc-700">
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">{boxScore.homeTeam.name}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100 dark:bg-zinc-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">Player</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">MIN</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">PTS</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">REB</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">AST</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">STL</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">BLK</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">TO</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">FG</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">3PT</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">FT</th>
                    <th className="px-2 py-3 text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase">+/-</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {boxScore.homeTeam.players.map((player, i) => (
                    <tr key={i} className={`hover:bg-zinc-50 dark:hover:bg-zinc-700/50 ${player.starter ? 'font-semibold' : ''}`}>
                      <td className="px-4 py-3 text-zinc-900 dark:text-white">{player.name}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.minutes.replace('PT', '').replace('M', '')}</td>
                      <td className="px-2 py-3 text-center text-zinc-900 dark:text-white font-semibold">{player.points}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.rebounds}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.assists}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.steals}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.blocks}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.turnovers}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.fgm}-{player.fga}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.fg3m}-{player.fg3a}</td>
                      <td className="px-2 py-3 text-center text-zinc-700 dark:text-zinc-300">{player.ftm}-{player.fta}</td>
                      <td className={`px-2 py-3 text-center font-semibold ${player.plusMinus >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {player.plusMinus > 0 ? '+' : ''}{player.plusMinus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
