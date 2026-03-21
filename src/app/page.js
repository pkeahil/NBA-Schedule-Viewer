import ScheduleClient from "./ScheduleClient";
import { fetchSchedule } from "./utils/fetchSchedule";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "NBA National TV Schedule Viewer",
  "description": "Find NBA games on your TV provider. Filter by ESPN, TNT, ABC, NBC, Prime Video and more.",
  "url": "https://nbaschd.vercel.app",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Web Browser"
};

export default async function Home() {
  const games = await fetchSchedule();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ScheduleClient games={games} />
    </div>
  );
}
