// TV Provider color mapping
export const providerColors = {
  'ESPN': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-200', border: 'border-red-200 dark:border-red-800' },
  'ABC': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-200', border: 'border-yellow-200 dark:border-yellow-800' },
  'TNT': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-200', border: 'border-green-200 dark:border-green-800' },
  'NBC': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-200', border: 'border-purple-200 dark:border-purple-800' },
  'Peacock': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-200', border: 'border-purple-200 dark:border-purple-800' },
  'Prime Video': { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-800 dark:text-sky-200', border: 'border-sky-200 dark:border-sky-800' },
  'NBA TV': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-200', border: 'border-blue-200 dark:border-blue-800' },
};

export const getProviderColor = (provider) => {
  return providerColors[provider] || { 
    bg: 'bg-gray-100 dark:bg-gray-900/30', 
    text: 'text-gray-800 dark:text-gray-200',
    border: 'border-gray-200 dark:border-gray-800'
  };
};
