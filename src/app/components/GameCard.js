import { getProviderColor } from '../utils/providerColors';
import { getTeamColors } from '../utils/teamColors';
import { parseProviders } from '../utils/dateUtils';

export default function GameCard({ game }) {
  const providers = parseProviders(game.tvProvider);
  const awayTeam = getTeamColors(game.awayTeam);
  const homeTeam = getTeamColors(game.homeTeam);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center mb-2">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 justify-end text-right">
          <span className="flex-1">{game.awayTeam}</span>
          {awayTeam.logo && (
            <img src={awayTeam.logo} alt={game.awayTeam} className="w-6 h-6 flex-shrink-0" />
          )}
        </div>
        <span className="text-xs text-zinc-500 flex-shrink-0">@</span>
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {homeTeam.logo && (
            <img src={homeTeam.logo} alt={game.homeTeam} className="w-6 h-6 flex-shrink-0" />
          )}
          <span>{game.homeTeam}</span>
        </div>
      </div>
      <div className="text-center text-xs text-zinc-600 dark:text-zinc-400 mb-2">
        {game.date} • {game.time} ET
      </div>
      <div className="flex flex-wrap gap-1 justify-center">
        {providers.map((provider, i) => {
          const colors = getProviderColor(provider);
          return (
            <span key={i} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
              {provider}
            </span>
          );
        })}
      </div>
    </div>
  );
}
