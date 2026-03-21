export const parseGameDateTime = (utcString) => new Date(utcString);

export const formatTimeInLocalTZ = (gameDateTime) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
  }).format(gameDateTime);

export const parseProviders = (providerString) =>
  providerString.split(', ').map(p => p.trim());
