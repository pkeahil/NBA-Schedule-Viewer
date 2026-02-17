
# Changelog

## [1.3.0] - 2026-02-16
### Added
- Box score page at `/boxscore/[gameId]` showing detailed player statistics
- Clickable date links in games table for past games with available box scores
- Clickable game cards on mobile view for past games with box scores
- Script to fetch and match game IDs from NBA schedule API (add-game-ids.js)
- Script to scrape box score data from NBA CDN API (scrape-boxscore.js)
- Automatic game ID extraction from preview links in scraper

### Changed
- Games table now links to box scores for 212 completed games
- Game cards on mobile now become fully clickable for past games
- Added hover effect to clickable game cards
- Scraper now automatically extracts game IDs from schedule page
- Added game_id field to games.json for box score integration

### Fixed
- Theme persistence across all pages including box score page
- Hydration error by adding suppressHydrationWarning to html element
- Games table now properly sorted from October through April

## [1.2.0] - 2026-02-16
### Added
- Automatic timezone conversion for game times based on user's local timezone
- Timezone abbreviation display (e.g., CST, EST, PST) for clarity
- Updated schedule data through April 2026
- Web scraper (scrape-games.js) to extract NBA schedule data from articles

### Changed
- Merged new schedule data (Feb 15 - April 17) from nba-games.json
- Standardized all stored times to Eastern Time (ET) format
- Game times now display in user's browser timezone instead of fixed ET

### Fixed
- Fixed SearchableDropdown crash when options array contains undefined values

## [1.1.0] - 2026-02-07
### Added
- Compact sticky search navbar with integrated title
- Loading skeleton with animations
- Empty state message for days with no games
- Filter chips showing active filters with individual and bulk clear
- Timezone indicator (ET) for all game times
- ARIA labels and roles for screen readers
- Keyboard navigation for dropdowns
- Focus indicators for all interactive elements
- "Show only future games" filter in table header

### Changed
- Split TV providers into individual badges for better scannability
- Optimized filtering logic by removing IIFEs and memoizing calculations
- Memoized unique teams and providers to prevent unnecessary recalculations
- Memoized dropdown filtered options
- Mobile-responsive card layout for better mobile UX
- Stacked team names vertically in Today's Games cards for consistency
- Replaced gradient background with solid color for Firefox performance
- Reduced shadow complexity for better rendering performance
- Removed transition effects from table rows for Firefox performance

### Removed
- Navbar component (replaced with search navbar)
- Redundant "Column Filter" labels
- Virtual scrolling (not needed for dataset size)

### Performance
- Added CSS containment for table layout
- Optimized for Firefox rendering

## [1.0.0] - 2026-01-24
### Fixed
- Fixed "Show only future games" filter to include today's games

### Changed
- Refactored page.js into separate components for better maintainability
- Extracted SearchBar, GamesTable components and useGameFilters hook
- Reduced main page.js from 280+ lines to 45 lines

## Todo:
- Create a "Stats" page
  - Ability to filter out certain stat columns
  - Ability to set the column order of the stats