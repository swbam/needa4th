import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTeeTimes } from '@/integrations/supabase/hooks/useTeeTimes';
import { format, parseISO } from 'date-fns';

const Schedule = () => {
  const { data: teeTimes, isLoading, error } = useTeeTimes();

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error loading schedule: {error.message}</div>;
  if (!teeTimes || teeTimes.length === 0) return <div className="text-center mt-8">No tee times available.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Last 5 Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teeTimes.map((teeTime) => {
          const teeDateTime = parseISO(`${teeTime.tee_date}T${teeTime.tee_time}`);

          return (
            <Card key={teeTime.id} className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-green-800">
                  {teeTime.course?.name || 'Unknown Course'}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {format(teeDateTime, 'MMMM d, yyyy h:mm a')}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {teeTime.players && teeTime.players.map((player, index) => (
                    <li key={index}>{player}</li>
                  ))}
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