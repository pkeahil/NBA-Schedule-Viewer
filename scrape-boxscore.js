const https = require('https');

async function scrapeBoxScore(gameId) {
  // Extract game ID from URL if full URL provided
  const id = gameId.includes('/') ? gameId.split('/')[3] : gameId;
  
  const url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${id}.json`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const boxScore = {
            gameId: json.game.gameId,
            gameDate: json.game.gameTimeUTC,
            arena: json.game.arenaName,
            awayTeam: {
              name: json.game.awayTeam.teamName,
              score: json.game.awayTeam.score,
              players: json.game.awayTeam.players.map(p => ({
                name: p.name,
                position: p.position,
                starter: p.starter === '1',
                minutes: p.statistics.minutes,
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
              players: json.game.homeTeam.players.map(p => ({
                name: p.name,
                position: p.position,
                starter: p.starter === '1',
                minutes: p.statistics.minutes,
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
          };
          resolve(boxScore);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

// Usage: node scrape-boxscore.js <game-url-or-id> [output-file]
const input = process.argv[2] || 'https://www.nba.com/game/sas-vs-gsw-0022500788/box-score';
const outputFile = process.argv[3];

scrapeBoxScore(input).then(data => {
  const output = JSON.stringify(data, null, 2);
  if (outputFile) {
    require('fs').writeFileSync(outputFile, output);
    console.log(`Saved to ${outputFile}`);
  } else {
    console.log(output);
  }
}).catch(err => console.error('Error:', err.message));

