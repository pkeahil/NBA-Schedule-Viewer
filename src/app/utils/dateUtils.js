export const getGameYear = (dateStr) => {
  const month = dateStr.split(' ')[1];
  return ['January', 'February', 'March', 'April', 'May', 'June'].includes(month) ? 2026 : 2025;
};

export const parseGameDate = (dateStr) => {
  return new Date(dateStr + ", " + getGameYear(dateStr));
};

export const parseGameTime = (timeStr) => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes = '0'] = time.split(':');
  let hour24 = parseInt(hours);
  if (period === 'p.m.' && hour24 !== 12) hour24 += 12;
  if (period === 'a.m.' && hour24 === 12) hour24 = 0;
  return hour24 * 60 + parseInt(minutes);
};

export const parseProviders = (providerString) => 
  providerString.split(', ').map(p => p.trim());
