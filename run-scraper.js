#!/usr/bin/env node
const fs = require('fs');
const { scrapeNBAGames } = require('./scrape-games');

async function main() {
  // Get URL from command line argument or use default
  const url = process.argv[2];
  
  if (!url) {
    console.log('Usage: node run-scraper.js <URL>');
    console.log('Example: node run-scraper.js https://www.nba.com/schedule');
    process.exit(1);
  }
  
  console.log(`Scraping NBA games from: ${url}`);
  console.log('Looking for games on: ESPN, ABC, Prime Video, NBC, Peacock\n');
  
  try {
    const games = await scrapeNBAGames(url);
    
    if (games.length === 0) {
      console.log('No games found with the specified TV networks.');
    } else {
      console.log(`Found ${games.length} games:\n`);
      console.log(JSON.stringify(games, null, 2));
      fs.writeFileSync('output.json', JSON.stringify(games, null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
