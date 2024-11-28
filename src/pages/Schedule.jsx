import React, { useState } from 'react';
import { useTeeTimes } from '@/integrations/supabase/hooks/useTeeTimes';
import { usePlayers } from '@/integrations/supabase/hooks/players';
import { useSupabaseAuth } from '@/integrations/supabase/auth';
import { isFuture, parseISO } from 'date-fns';
import JoinTeeTimeDialog from '@/components/JoinTeeTimeDialog';
import TeeTimeCard from '@/components/TeeTimeCard';

const Schedule = () => {
  const { data: teeTimes, isLoading: teeTimesLoading, error: teeTimesError } = useTeeTimes();
  const { data: players, isLoading: playersLoading, error: playersError } = usePlayers();
  const { user } = useSupabaseAuth();
  const [confirmJoinDialog, setConfirmJoinDialog] = useState({ isOpen: false, teeTime: null });

  console.log('Current tee times:', teeTimes);
  console.log('Current players:', players);

  if (teeTimesLoading || playersLoading) return <div className="pt-20">Loading...</div>;
  if (teeTimesError || playersError) return <div className="pt-20">Error: {teeTimesError?.message || playersError?.message}</div>;

  const upcomingTeeTimes = teeTimes?.filter(teeTime => isFuture(parseISO(teeTime.date_time))) || [];

  const handleJoinClick = (teeTime) => {
    console.log('Opening join dialog for tee time:', teeTime);
    setConfirmJoinDialog({ isOpen: true, teeTime });
  };

  return (
    <div className="pt-14">
      <div className="bg-white w-full py-4 shadow-sm">
        <h1 className="text-[#006747] text-center font-semibold text-xl">Upcoming Tee Times</h1>
      </div>
      <div className="container mx-auto px-4 py-6">
        {upcomingTeeTimes.length === 0 ? (
          <p className="text-center text-gray-500">No upcoming tee times available.</p>
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