const { chromium } = require('playwright');

async function scrapeNBAGames(url) {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  const page = await browser.newPage();
  
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000); // Wait for dynamic content
  await page.waitForSelector('.ScheduleGame_sg__RmD9I', { timeout: 10000 });
  
  const games = await page.evaluate(() => {
    const gameElements = document.querySelectorAll('.ScheduleGame_sg__RmD9I');
    const targetNetworks = ['ESPN', 'ABC', 'Prime Video', 'NBC', 'Peacock'];
    
    return Array.from(gameElements).map(game => {
      // Get teams
      const teamLinks = game.querySelectorAll('.ScheduleGame_sgTeam__TEPZa a');
      const awayTeam = teamLinks[0]?.textContent?.trim();
      const homeTeam = teamLinks[1]?.textContent?.trim();
      
      // Get date from parent week structure
      const dayHeader = game.closest('.ScheduleDay_sd__GFE_w')?.querySelector('.ScheduleDay_sdDay__3s2Xt')?.textContent?.trim();
      
      // Get time
      const timeElement = game.querySelector('.ScheduleStatusText_base__Jgvjb');
      const time = timeElement?.textContent?.trim();
      
      // Get TV providers
      const broadcasterIcons = game.querySelectorAll('.Broadcasters_icon__82MTV');
      const tvProviders = Array.from(broadcasterIcons)
        .map(icon => icon.getAttribute('alt') || icon.getAttribute('title'))
        .filter(provider => targetNetworks.includes(provider))
        .join(', ');
      
      return {
        date: dayHeader,
        away_team_name: awayTeam,
        home_team_name: homeTeam,
        time: time,
        tv_providers: tvProviders
      };
    }).filter(game => game.tv_providers); // Only return games with target networks
  });
  
  await browser.close();
  return games;
}

// Usage
async function main() {
  const url = process.argv[2] || 'https://www.nba.com/schedule';
  
  try {
    const games = await scrapeNBAGames(url);
    console.log(JSON.stringify(games, null, 2));
  } catch (error) {
    console.error('Error scraping games:', error);
  }
}

if (require.main === module) {
  main();
}

module.exports = { scrapeNBAGames };
