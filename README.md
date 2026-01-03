# NBA National TV Schedule Viewer

Just wanted to create a one-stop shop for viewing the schedule of National TV NBA Games. Try it out! &rarr; https://nbaschd.vercel.app/

When looking through the schedule on nba.com, I noticed that there's no way to filter by TV provider, or even to easily filter by the date of games (for example, to view a game one month in the future, it requires 3 clicks, and on top of that, that only gives you one day's worth of games).

My solution aims to more easily filter the list of games by TV provider, so that people with specific subscriptions (Prime Video, ESPN, etc) can see which games they can watch easily.

On top of that, I wanted to provide a more seamless process for filtering games. Instead of several frustrating clicks to get to certain games, just type your favorite team's name, your TV provider, or even the month name (to see all the games in a month instead of just one day) into the search bar!

## About

I built this project to solve the problems mentioned above, but also to sharpen my skills with modern development practices, particularly with integrating AI with web development.

In particular, there are a lot of articles out there relating to nba schedules, for example https://www.nba.com/news/every-nba-game-on-prime-video-in-2025-26. I found as many articles as I could, fed them into an LLM, then took the more useful structured JSON output of games and used that to build this site.
