// NBA Team color mapping (primary and secondary colors)
export const teamColors = {
  'Atlanta Hawks': { primary: '#E03A3E', secondary: '#C1D32F', logo: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg' },
  'Boston Celtics': { primary: '#007A33', secondary: '#BA9653', logo: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg' },
  'Brooklyn Nets': { primary: '#000000', secondary: '#FFFFFF', logo: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg' },
  'Charlotte Hornets': { primary: '#1D1160', secondary: '#00788C', logo: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg' },
  'Chicago Bulls': { primary: '#CE1141', secondary: '#000000', logo: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg' },
  'Cleveland Cavaliers': { primary: '#860038', secondary: '#FDBB30', logo: 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg' },
  'Dallas Mavericks': { primary: '#00538C', secondary: '#002B5E', logo: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg' },
  'Denver Nuggets': { primary: '#0E2240', secondary: '#FEC524', logo: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg' },
  'Detroit Pistons': { primary: '#C8102E', secondary: '#1D42BA', logo: 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg' },
  'Golden State Warriors': { primary: '#1D428A', secondary: '#FFC72C', logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg' },
  'Houston Rockets': { primary: '#CE1141', secondary: '#000000', logo: 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg' },
  'Indiana Pacers': { primary: '#002D62', secondary: '#FDBB30', logo: 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg' },
  'LA Clippers': { primary: '#C8102E', secondary: '#1D428A', logo: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg' },
  'Los Angeles Clippers': { primary: '#C8102E', secondary: '#1D428A', logo: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg' },
  'Los Angeles Lakers': { primary: '#552583', secondary: '#FDB927', logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg' },
  'Memphis Grizzlies': { primary: '#5D76A9', secondary: '#12173F', logo: 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg' },
  'Miami Heat': { primary: '#98002E', secondary: '#F9A01B', logo: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg' },
  'Milwaukee Bucks': { primary: '#00471B', secondary: '#EEE1C6', logo: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg' },
  'Minnesota Timberwolves': { primary: '#0C2340', secondary: '#236192', logo: 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg' },
  'New Orleans Pelicans': { primary: '#0C2340', secondary: '#C8102E', logo: 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg' },
  'New York Knicks': { primary: '#006BB6', secondary: '#F58426', logo: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg' },
  'Oklahoma City Thunder': { primary: '#007AC1', secondary: '#EF3B24', logo: 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg' },
  'Orlando Magic': { primary: '#0077C0', secondary: '#C4CED4', logo: 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg' },
  'Philadelphia 76ers': { primary: '#006BB6', secondary: '#ED174C', logo: 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg' },
  'Phoenix Suns': { primary: '#1D1160', secondary: '#E56020', logo: 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg' },
  'Portland Trail Blazers': { primary: '#E03A3E', secondary: '#000000', logo: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg' },
  'Sacramento Kings': { primary: '#5A2D81', secondary: '#63727A', logo: 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg' },
  'San Antonio Spurs': { primary: '#C4CED4', secondary: '#000000', logo: 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg' },
  'Toronto Raptors': { primary: '#CE1141', secondary: '#000000', logo: 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg' },
  'Utah Jazz': { primary: '#002B5C', secondary: '#00471B', logo: 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg' },
  'Washington Wizards': { primary: '#002B5C', secondary: '#E31837', logo: 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg' },
};

export const getTeamColors = (teamName) => {
  return teamColors[teamName] || { primary: '#6B7280', secondary: '#9CA3AF', logo: null };
};

export const getMatchupGradient = (awayTeam, homeTeam) => {
  const away = getTeamColors(awayTeam);
  const home = getTeamColors(homeTeam);
  return `linear-gradient(to bottom, ${away.primary}, ${home.primary})`;
};
