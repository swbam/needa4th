import React, { useState } from 'react';
import { useTeeTimes } from '@/integrations/supabase/hooks/useTeeTimes';
import { usePlayers } from '@/integrations/supabase/hooks/players';
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { isFuture, parseISO } from 'date-fns';
import JoinTeeTimeDialog from '@/components/JoinTeeTimeDialog';
import TeeTimeCard from '@/components/TeeTimeCard';
import { Loader2 } from 'lucide-react';

const Schedule = () => {
  const { data: teeTimes, isLoading: teeTimesLoading, error: teeTimesError } = useTeeTimes();
  const { data: players, isLoading: playersLoading, error: playersError } = usePlayers();
  const { user } = useSupabaseAuth();
  const [confirmJoinDialog, setConfirmJoinDialog] = useState({ isOpen: false, teeTime: null });

  console.log('Schedule rendered with teeTimes:', teeTimes);
  console.log('Current players:', players);

  if (teeTimesLoading || playersLoading) {
    return (
      <div className="pt-20 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#006747]" />
        <p className="mt-4 text-gray-600">Loading tee times...</p>
      </div>
    );
  }

  if (teeTimesError || playersError) {
    return (
      <div className="pt-20 text-center text-red-600">
        <p>Error: {teeTimesError?.message || playersError?.message}</p>
        <p className="mt-2 text-sm text-gray-600">Please try refreshing the page.</p>
      </div>
    );
  }

  const upcomingTeeTimes = teeTimes
    ?.filter(teeTime => isFuture(parseISO(teeTime.date_time)))
    .sort((a, b) => parseISO(a.date_time) - parseISO(b.date_time)) || [];

  const handleJoinClick = (teeTime) => {
    console.log('Opening join dialog for teeTime:', teeTime);
    setConfirmJoinDialog({ isOpen: true, teeTime });
  };

  return (
    <div className="pt-14">
      <div className="bg-white w-full py-4 shadow-sm">
        <h1 className="text-[#006747] text-center font-semibold text-2xl">Upcoming Tee Times</h1>
      </div>
      <div className="container mx-auto px-4 py-6">
        {upcomingTeeTimes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No upcoming tee times available.</p>
            <p className="text-gray-500 mt-2">Check back later or create a new tee time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTeeTimes.map((teeTime) => (
              <TeeTimeCard 
                key={teeTime.id} 
                teeTime={teeTime} 
                onJoinClick={handleJoinClick}
              />
            ))}
          </div>
        )}
      </div>

      <JoinTeeTimeDialog
        isOpen={confirmJoinDialog.isOpen}
        onClose={() => setConfirmJoinDialog({ isOpen: false, teeTime: null })}
        teeTime={confirmJoinDialog.teeTime}
        players={players}
        user={user}
      />
    </div>
  );
};

export default Schedule;