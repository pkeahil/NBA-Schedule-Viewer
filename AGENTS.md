# AGENTS.md

## Development Workflow

Before making any changes, verify the line endings in the file (Windows CRLF vs Linux LF)

## Commit Workflow

```bash
git add <files>
git commit -m "<type>: <summary>

- Bullet point details
- More details"
git push
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore

## Architecture

**Key Files:**
- `src/app/page.js` - Main component, manages state and filtering
- `src/app/components/GamesTable.js` - Table display with filters
- `src/app/utils/filterGames.js` - Filtering logic
- `src/app/games.json` - Game data (generated from scraper)

**State Management:**
- `timeFilter`: "all" | "future" | "past" - controls date filtering
- `columnFilters`: object with date/time/team/provider filters
- Games with missing/TBD teams are filtered out in `filteredData`

**Performance Notes:**
- Avoid `useTransition` - causes double renders and slowness
- Use stable keys for table rows (gameId preferred)
- Filter TBD/empty games early to avoid rendering issues

## Scraping Workflow

### 1. Scrape Games (`scrape-games.js`)
```bash
node scrape-games.js
```
Scrapes NBA.com schedule for national TV games (ESPN, ABC, Prime Video, NBC, Peacock). Outputs to `nba-games.json`.

### 2. Add Game IDs (`add-game-ids.js`)
```bash
node add-game-ids.js
```
Matches scraped games with NBA API to get canonical IDs. Updates `src/app/games.json`.

### 3. Get Box Scores (`scrape-boxscore.js`)
```bash
node scrape-boxscore.js <game-id> [output-file]
```
Fetches detailed stats from NBA CDN API.

## Key Info

**Selectors (may change):**
- Games: `.ScheduleGame_sg__RmD9I`
- Teams: `.ScheduleGame_sgTeam__TEPZa a`
- Date: `.ScheduleDay_sdDay__3s2Xt`
- Time: `.ScheduleStatusText_base__Jgvjb`
- TV: `.Broadcasters_icon__82MTV`

**APIs:**
- Schedule: `https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json`
- Box Score: `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`

**Tips:**
- Use `headless: false` to avoid bot detection
- NBA.com class names change frequently - verify selectors
- `compare_games.js` validates scraper output