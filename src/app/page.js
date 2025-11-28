"use client";

import React, { useEffect } from 'react';
import Navbar from "./components/navbar";

import games from './games.json';

export default function Home() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const parsedData = games.map(item => ({
      date: item.date,
      time: item.time,
      team1: item.away_team_name,
      team2: item.home_team_name,
      tvProvider: item.tv_providers,
    }));
    setData(parsedData);
  }, []);

  const [filter, setFilter] = React.useState("");

  const filteredData = data.filter(item => {
    return (
      item.date.includes(filter) ||
      item.time.includes(filter) ||
      item.team1.includes(filter) ||
      item.team2.includes(filter) ||
      item.tvProvider.includes(filter)
    );
  });

  function handleSearch(e) {
    setFilter(e.target.value);
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <div className="bg-zinc-700 p-5 my-5 rounded-lg w-1/3 text-center">
        <p className="text-xl mb-2">NBA Games by TV Providers</p>
        <input
          type="search"
          className="block py-2 pl-10 pr-4 w-full text-sm placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          id="search"
          value={filter}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>
      <div className="mx-10">
        <table className="border rounded-lg w-full table-fixed">
          <thead>
            <tr>
              <th className="p-3 border text-left">Date</th>
              <th className="p-3 border text-left">Time</th>
              <th className="p-3 border text-left">Team 1</th>
              <th className="p-3 border text-left">Team 2</th>
              <th className="p-3 border text-left">TV Provider</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="p-3 border">{item.date}</td>
                <td className="p-3 border">{item.time}</td>
                <td className="p-3 border">{item.team1}</td>
                <td className="p-3 border">{item.team2}</td>
                <td className="p-3 border">{item.tvProvider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
