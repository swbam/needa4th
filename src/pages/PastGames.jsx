import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format, parseISO, isPast } from 'date-fns';
import { useTeeTimes } from '../integrations/supabase/hooks/useTeeTimes';

const PastGames = () => {
  const { data: teeTimes, isLoading, error } = useTeeTimes();

  if (isLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8">Error: {error.message}</div>;

  const pastGames = teeTimes
    .filter(teeTime => isPast(parseISO(teeTime.date_time)))
    .sort((a, b) => parseISO(b.date_time) - parseISO(a.date_time));

  if (pastGames.length === 0) return <div className="container mx-auto px-4 py-8 text-center">No past tee times available.</div>;

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'EEE, MMM d');
  };

  const formatTime = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'h:mm a');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[#006747] mb-6" style={{ fontWeight: 500, fontSize: '18px' }}>Past Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastGames.map((game) => (
          <Card key={game.id} className="bg-white shadow-lg border-none">
            <CardContent className="p-6">
              <h2 className="text-[#006747] mb-2" style={{ fontWeight: 500, fontSize: '18px' }}>{game.course?.name || 'Location not specified'}</h2>
              <p className="text-gray-600 mb-4">
                {formatDate(game.date_time)} • {formatTime(game.date_time)}
              </p>
              <ul className="space-y-2 mb-4">
                {game.attendees && game.attendees.map((attendee, idx) => (
                  <li key={idx} className="font-medium">
                    {attendee.player.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PastGames;