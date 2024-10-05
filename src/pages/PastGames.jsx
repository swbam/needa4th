import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format, parse, isPast } from 'date-fns';
import { teeTimes } from '../utils/csvData';

const PastGames = () => {
  const pastGames = teeTimes
    .filter(teeTime => {
      const teeDateTime = parse(`${teeTime.Date} ${teeTime.Time}`, 'M/d/yyyy HHmm', new Date());
      return isPast(teeDateTime);
    })
    .sort((a, b) => {
      const dateA = parse(`${a.Date} ${a.Time}`, 'M/d/yyyy HHmm', new Date());
      const dateB = parse(`${b.Date} ${b.Time}`, 'M/d/yyyy HHmm', new Date());
      return dateB - dateA;
    });

  if (pastGames.length === 0) return <div className="text-center mt-8">No past tee times available.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#006747] mb-6">Past Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastGames.map((game, index) => {
          const teeDateTime = parse(`${game.Date} ${game.Time}`, 'M/d/yyyy HHmm', new Date());

          return (
            <Card key={index} className="bg-white shadow-lg border-none">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#006747] mb-2">{game.Location}</h2>
                <p className="text-gray-600 mb-4">
                  {format(teeDateTime, 'M/d/yyyy, h:mm:ss a')}
                </p>
                <ul className="space-y-2 mb-4">
                  {[game.Organizer, game.Attendee, '', ''].slice(0, parseInt(game['# of Players'])).map((player, idx) => (
                    <li key={idx} className="font-medium">
                      {player || 'Open Slot'}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600">
                  Walk/Ride: {game['Walk / Ride']} | Slot: {game['Slot #']}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PastGames;