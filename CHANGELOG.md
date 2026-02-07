
# Changelog

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