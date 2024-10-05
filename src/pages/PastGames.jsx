import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parse, isBefore, subDays } from 'date-fns';
import { teeTimes } from '../utils/csvData';

const PastGames = () => {
  const now = new Date();
  const threeDaysAgo = subDays(now, 3);
  
  // Filter tee times to get past games and add some dummy data
  const pastGames = [
    ...teeTimes.filter(teeTime => {
      const teeDateTime = parse(`${teeTime.Date} ${teeTime.Time}`, 'M/d/yyyy HHmm', new Date());
      return isBefore(teeDateTime, now);
    }),
    // Add dummy data
    {
      Date: format(subDays(now, 1), 'M/d/yyyy'),
      Time: '1400',
      Location: 'Dummy Course 1',
      Organizer: 'Seth Bambling',
      Attendee: 'John Doe',
      'Walk / Ride': 'Walk',
      '# of Players': '4',
      'Slot #': '1'
    },
    {
      Date: format(subDays(now, 2), 'M/d/yyyy'),
      Time: '0900',
      Location: 'Dummy Course 2',
      Organizer: 'Jane Smith',
      Attendee: 'Seth Bambling',
      'Walk / Ride': 'Ride',
      '# of Players': '3',
      'Slot #': '2'
    }
  ].sort((a, b) => {
    const dateA = parse(`${a.Date} ${a.Time}`, 'M/d/yyyy HHmm', new Date());
    const dateB = parse(`${b.Date} ${b.Time}`, 'M/d/yyyy HHmm', new Date());
    return dateB - dateA;
  });

  if (pastGames.length === 0) return <div className="text-center mt-8">No past games available.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Past Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastGames.map((game, index) => {
          const teeDateTime = parse(`${game.Date} ${game.Time}`, 'M/d/yyyy HHmm', new Date());

          return (
            <Card key={index} className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-green-800">
                  {game.Location}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {format(teeDateTime, 'MMMM d, yyyy h:mm a')}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Organizer: {game.Organizer}</li>
                  <li>Attendee: {game.Attendee}</li>
                  <li>Walk/Ride: {game['Walk / Ride']}</li>
                  <li>Players: {game['# of Players']}</li>
                  <li>Slot: {game['Slot #']}</li>
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PastGames;