const parseTerms = (str) => str.toLowerCase().split(' or ').map(term => term.trim()).filter(Boolean);

const matchesTerms = (value, terms) => terms.some(term => value.toLowerCase().includes(term));

const getGameYear = (dateStr) => {
  const month = dateStr.split(' ')[1];
  return ['January', 'February', 'March', 'April', 'May', 'June'].includes(month) ? 2026 : 2025;
};

export function useGameFilters(data, filter, columnFilters, showOnlyFuture) {
  const globalTerms = filter ? parseTerms(filter) : null;
  const dateTerms = columnFilters.date ? parseTerms(columnFilters.date) : null;
  const timeTerms = columnFilters.time ? parseTerms(columnFilters.time) : null;
  const awayTerms = columnFilters.awayTeam ? parseTerms(columnFilters.awayTeam) : null;
  const homeTerms = columnFilters.homeTeam ? parseTerms(columnFilters.homeTeam) : null;
  const providerTerms = columnFilters.tvProvider ? parseTerms(columnFilters.tvProvider) : null;
  
  const today = showOnlyFuture ? (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  })() : null;

  return data.filter(item => {
    if (globalTerms && !matchesTerms(`${item.date} ${item.time} ${item.awayTeam} ${item.homeTeam} ${item.tvProvider}`, globalTerms)) {
      return false;
    }
    
    if (dateTerms && !matchesTerms(item.date, dateTerms)) return false;
    if (timeTerms && !matchesTerms(item.time, timeTerms)) return false;
    if (awayTerms && !matchesTerms(item.awayTeam, awayTerms)) return false;
    if (homeTerms && !matchesTerms(item.homeTeam, homeTerms)) return false;
    if (providerTerms && !matchesTerms(item.tvProvider, providerTerms)) return false;
    
    if (today) {
      const gameDate = new Date(item.date + ", " + getGameYear(item.date));
      if (gameDate < today) return false;
    }
    
    return true;
  });
}
