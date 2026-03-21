const parseTerms = (str) => str.toLowerCase().split(' or ').map(t => t.trim()).filter(Boolean);
const matchesTerms = (value, terms) => terms.some(term => value.toLowerCase().includes(term));

export function filterGames(data, filter, columnFilters, timeFilter) {
  const globalTerms = filter ? parseTerms(filter) : null;
  const dateTerms = columnFilters.date ? parseTerms(columnFilters.date) : null;
  const timeTerms = columnFilters.time ? parseTerms(columnFilters.time) : null;
  const awayTerms = columnFilters.awayTeam ? parseTerms(columnFilters.awayTeam) : null;
  const homeTerms = columnFilters.homeTeam ? parseTerms(columnFilters.homeTeam) : null;
  const providerTerms = columnFilters.tvProvider ? parseTerms(columnFilters.tvProvider) : null;

  const today = timeFilter !== "all" ? new Date(new Date().setHours(0, 0, 0, 0)) : null;

  const filtered = data.filter(item => {
    if (globalTerms && !matchesTerms(`${item.date} ${item.time} ${item.awayTeam} ${item.homeTeam} ${item.tvProvider}`, globalTerms)) return false;
    if (dateTerms && !matchesTerms(item.date, dateTerms)) return false;
    if (timeTerms && !matchesTerms(item.time, timeTerms)) return false;
    if (awayTerms && !matchesTerms(item.awayTeam, awayTerms)) return false;
    if (homeTerms && !matchesTerms(item.homeTeam, homeTerms)) return false;
    if (providerTerms && !matchesTerms(item.tvProvider, providerTerms)) return false;
    if (today) {
      if (timeFilter === "future" && item.gameDateTime < today) return false;
      if (timeFilter === "past" && item.gameDateTime >= today) return false;
    }
    return true;
  });

  return timeFilter === "past" ? filtered.toReversed() : filtered;
}
