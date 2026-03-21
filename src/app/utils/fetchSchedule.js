const CDN_URL = 'https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json';

function formatDate(utcString) {
  return new Date(utcString).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/New_York'
  });
}

function formatTime(utcString) {
  return new Date(utcString).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York'
  }).replace('AM', 'a.m.').replace('PM', 'p.m.');
}

export async function fetchSchedule() {
  const res = await fetch(CDN_URL, { next: { revalidate: 3600 } }); // revalidate every hour
  const data = await res.json();

  const games = [];
  for (const gameDate of data.leagueSchedule.gameDates) {
    for (const g of gameDate.games) {
      if (g.gameLabel === 'Preseason') continue;

      const natl = g.broadcasters?.nationalTvBroadcasters ?? [];
      const providers = natl.map(b => b.broadcasterDisplay);

      if (providers.length === 0) continue;

      games.push({
        date: formatDate(g.gameDateTimeUTC),
        time: formatTime(g.gameDateTimeUTC),
        game_time_et: g.gameDateTimeUTC, // true UTC timestamp
        away_team_name: `${g.awayTeam.teamCity} ${g.awayTeam.teamName}`,
        home_team_name: `${g.homeTeam.teamCity} ${g.homeTeam.teamName}`,
        tv_providers: providers.join(', '),
        game_id: g.gameId,
      });
    }
  }

  return games;
}
