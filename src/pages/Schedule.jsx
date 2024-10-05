import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parse, isValid } from 'date-fns';
import { teeTimes } from '../utils/csvData';

const Schedule = () => {
  const sortedTeeTimes = teeTimes
    .filter(teeTime => {
      const teeDateTime = parse(`${teeTime.Date} ${teeTime.Time}`, 'M/d/yyyy HHmm', new Date());
      return isValid(teeDateTime);
    })
    .sort((a, b) => {
      const dateA = parse(`${a.Date} ${a.Time}`, 'M/d/yyyy HHmm', new Date());
      const dateB = parse(`${b.Date} ${b.Time}`, 'M/d/yyyy HHmm', new Date());
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Upcoming Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTeeTimes.map((teeTime, index) => {
          const teeDateTime = parse(`${teeTime.Date} ${teeTime.Time}`, 'M/d/yyyy HHmm', new Date());

          return (
            <Card key={index} className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-green-800">
                  {teeTime.Location}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {isValid(teeDateTime) 
                    ? format(teeDateTime, 'MMMM d, yyyy h:mm a')
                    : 'Invalid Date'}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Organizer: {teeTime.Organizer}</li>
                  <li>Attendee: {teeTime.Attendee}</li>
                  <li>Walk/Ride: {teeTime['Walk / Ride']}</li>
                  <li>Players: {teeTime['# of Players']}</li>
                  <li>Slot: {teeTime['Slot #']}</li>
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;