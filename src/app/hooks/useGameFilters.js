export function useGameFilters(data, filter, columnFilters, showOnlyFuture) {
  const filteredData = data.filter(item => {
    const matchesGlobal = !filter || (() => {
      const searchTerms = filter.toLowerCase().split(' or ').map(term => term.trim()).filter(term => term);
      return searchTerms.some(term =>
        item.date.toLowerCase().includes(term) ||
        item.time.toLowerCase().includes(term) ||
        item.awayTeam.toLowerCase().includes(term) ||
        item.homeTeam.toLowerCase().includes(term) ||
        item.tvProvider.toLowerCase().includes(term)
      );
    })();
    
    const matchesColumns = 
      (!columnFilters.date || (() => {
        const terms = columnFilters.date.toLowerCase().split(' or ').map(term => term.trim()).filter(term => term);
        return terms.some(term => item.date.toLowerCase().includes(term));
      })()) &&
      (!columnFilters.time || (() => {
        const terms = columnFilters.time.toLowerCase().split(' or ').map(term => term.trim()).filter(term => term);
        return terms.some(term => item.time.toLowerCase().includes(term));
      })()) &&
      (!columnFilters.awayTeam || (() => {
        const terms = columnFilters.awayTeam.toLowerCase().split(' or ').map(term => term.trim()).filter(term => term);
        return terms.some(term => item.awayTeam.toLowerCase().includes(term));
      })()) &&
      (!columnFilters.homeTeam || (() => {
        const terms = columnFilters.homeTeam.toLowerCase().split(' or ').map(term => term.trim()).filter(term => term);
        return terms.some(term => item.homeTeam.toLowerCase().includes(term));
      })()) &&
      (!columnFilters.tvProvider || (() => {
        const terms = columnFilters.tvProvider.toLowerCase().split(' or ').map(term => term.trim()).filter(term => term);
        return terms.some(term => item.tvProvider.toLowerCase().includes(term));
      })());
    
    const matchesFuture = !showOnlyFuture || (() => {
      const getYear = (dateStr) => {
        const month = dateStr.split(' ')[1];
        return ['January', 'February', 'March', 'April', 'May', 'June'].includes(month) ? 2026 : 2025;
      };
      const gameDate = new Date(item.date + ", " + getYear(item.date));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return gameDate >= today;
    })();
    
    return matchesGlobal && matchesColumns && matchesFuture;
  });

  return filteredData;
}
