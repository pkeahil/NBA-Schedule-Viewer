
# Changelog

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