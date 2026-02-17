const fs = require('fs');

const nbaGames = JSON.parse(fs.readFileSync('nba-games.json', 'utf8'));
const srcGames = JSON.parse(fs.readFileSync('src/app/games.json', 'utf8'));

// Parse dates to compare
function parseDate(dateStr) {
  const months = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  const parts = dateStr.split(', ');
  const monthDay = parts[1].split(' ');
  const month = months[monthDay[0]];
  const day = parseInt(monthDay[1]);
  
  return { month, day, str: dateStr };
}

// Filter srcGames for Feb 15 - April 10 range
const filteredSrcGames = srcGames.filter(game => {
  const parsed = parseDate(game.date);
  return (parsed.month === 1 && parsed.day >= 15) || // Feb 15+
         (parsed.month === 2) || // All March
         (parsed.month === 3 && parsed.day <= 10); // April 1-10
});

console.log(`\n=== COMPARISON REPORT ===\n`);
console.log(`nba-games.json: ${nbaGames.length} games (Feb 15 - April 17)`);
console.log(`src/app/games.json (filtered Feb 15 - April 10): ${filteredSrcGames.length} games`);
console.log(`src/app/games.json (total): ${srcGames.length} games\n`);

// Create lookup keys
function createKey(game) {
  const date = game.date;
  const away = game.away_team_name || 'TBD';
  const home = game.home_team_name || 'TBD';
  return `${date}|${away}|${home}`;
}

const nbaKeys = new Set(nbaGames.map(createKey));
const srcKeys = new Set(filteredSrcGames.map(createKey));

// Find games only in nba-games.json
const onlyInNba = nbaGames.filter(game => !srcKeys.has(createKey(game)));
console.log(`\n=== GAMES IN nba-games.json NOT IN src/app/games.json (${onlyInNba.length}) ===`);
onlyInNba.forEach(game => {
  console.log(`${game.date}: ${game.away_team_name || 'TBD'} @ ${game.home_team_name || 'TBD'} - ${game.tv_providers}`);
});

// Find games only in src/app/games.json
const onlyInSrc = filteredSrcGames.filter(game => !nbaKeys.has(createKey(game)));
console.log(`\n=== GAMES IN src/app/games.json NOT IN nba-games.json (${onlyInSrc.length}) ===`);
onlyInSrc.forEach(game => {
  console.log(`${game.date}: ${game.away_team_name || 'TBD'} @ ${game.home_team_name || 'TBD'} - ${game.tv_providers}`);
});

// Compare matching games for differences
const matching = nbaGames.filter(game => srcKeys.has(createKey(game)));
console.log(`\n=== MATCHING GAMES (${matching.length}) - Checking for differences ===`);

let differencesFound = 0;
matching.forEach(nbaGame => {
  const key = createKey(nbaGame);
  const srcGame = filteredSrcGames.find(g => createKey(g) === key);
  
  if (srcGame) {
    const diffs = [];
    
    // Normalize times for comparison
    const nbaTime = nbaGame.time.replace(/\s+/g, ' ').trim();
    const srcTime = srcGame.time.replace(/\s+/g, ' ').trim();
    
    if (nbaTime !== srcTime && nbaTime !== 'TBD' && srcTime !== 'TBD') {
      diffs.push(`Time: "${nbaTime}" vs "${srcTime}"`);
    }
    
    // Normalize TV providers
    const nbaTv = nbaGame.tv_providers.replace(/\s+/g, ' ').trim();
    const srcTv = srcGame.tv_providers.replace(/\s+/g, ' ').trim();
    
    if (nbaTv !== srcTv) {
      diffs.push(`TV: "${nbaTv}" vs "${srcTv}"`);
    }
    
    if (diffs.length > 0) {
      differencesFound++;
      console.log(`\n${nbaGame.date}: ${nbaGame.away_team_name || 'TBD'} @ ${nbaGame.home_team_name || 'TBD'}`);
      diffs.forEach(d => console.log(`  - ${d}`));
    }
  }
});

if (differencesFound === 0) {
  console.log('No differences found in matching games.');
}

console.log(`\n=== SUMMARY ===`);
console.log(`Total matching games: ${matching.length}`);
console.log(`Games with differences: ${differencesFound}`);
console.log(`Only in nba-games.json: ${onlyInNba.length}`);
console.log(`Only in src/app/games.json: ${onlyInSrc.length}`);
