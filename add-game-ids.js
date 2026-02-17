const https = require('https');
const fs = require('fs');

async function fetchSchedule() {
  return new Promise((resolve, reject) => {
    https.get('https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function addGameIds() {
  const schedule = await fetchSchedule();
  const games = JSON.parse(fs.readFileSync('src/app/games.json', 'utf8'));
  
  // Build lookup map
  const gameMap = new Map();
  const allApiGames = [];
  
  schedule.leagueSchedule.gameDates.forEach(dateObj => {
    dateObj.games.forEach(game => {
      // Skip preseason and all-star events
      if (game.gameLabel === 'Preseason' || 
          game.gameLabel?.includes('All-Star') || 
          game.gameLabel?.includes('Rising Stars')) return;
      
      const natl = game.broadcasters.nationalTvBroadcasters || [];
      const ott = game.broadcasters.nationalOttBroadcasters || [];
      if (natl.length === 0 && ott.length === 0) return;
      
      const date = new Date(game.gameDateTimeEst);
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      
      // Use full team names
      const awayFull = `${game.awayTeam.teamCity} ${game.awayTeam.teamName}`;
      const homeFull = `${game.homeTeam.teamCity} ${game.homeTeam.teamName}`;
      const key = `${awayFull}@${homeFull}@${dateStr}`;
      gameMap.set(key, game.gameId);
      
      allApiGames.push({
        away: awayFull,
        home: homeFull,
        date: dateStr,
        id: game.gameId
      });
    });
  });
  
  // Match games
  let matched = 0;
  let unmatched = [];
  
  games.forEach(game => {
    const key = `${game.away_team_name}@${game.home_team_name}@${game.date}`;
    let gameId = gameMap.get(key);
    
    // Try fuzzy match if exact match fails
    if (!gameId && game.away_team_name && game.home_team_name) {
      const match = allApiGames.find(api => 
        api.date === game.date &&
        api.away && api.home &&
        (api.away.includes(game.away_team_name) || game.away_team_name.includes(api.away)) &&
        (api.home.includes(game.home_team_name) || game.home_team_name.includes(api.home))
      );
      if (match) gameId = match.id;
    }
    
    if (gameId) {
      game.game_id = gameId;
      matched++;
    } else {
      unmatched.push(`${game.date}: ${game.away_team_name} @ ${game.home_team_name}`);
    }
  });
  
  fs.writeFileSync('src/app/games.json', JSON.stringify(games, null, 4));
  console.log(`Matched ${matched} of ${games.length} games with game IDs`);
  if (unmatched.length > 0) {
    console.log(`\nUnmatched games (${unmatched.length}):`);
    unmatched.slice(0, 10).forEach(g => console.log('  -', g));
    if (unmatched.length > 10) console.log(`  ... and ${unmatched.length - 10} more`);
  }
}

addGameIds().catch(console.error);
