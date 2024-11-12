import React, { useState } from 'react';
import { useTeeTimes } from '../integrations/supabase/hooks/useTeeTimes';
import { usePlayers, useAddPlayer } from '../integrations/supabase/hooks/players';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { toast } from "sonner";
import TeeTimeCard from '../components/schedule/TeeTimeCard';
import JoinDialog from '../components/schedule/JoinDialog';

const Schedule = () => {
  const { data: teeTimes, isLoading: teeTimesLoading, error: teeTimesError } = useTeeTimes();
  const { data: players, isLoading: playersLoading, error: playersError } = usePlayers();
  const { user } = useSupabaseAuth();
  const [confirmJoinDialog, setConfirmJoinDialog] = useState({ isOpen: false, teeTime: null });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const addPlayerMutation = useAddPlayer();

  if (teeTimesLoading || playersLoading) return <div className="pt-20">Loading...</div>;
  if (teeTimesError || playersError) return <div className="pt-20">Error: {teeTimesError?.message || playersError?.message}</div>;

  const handleJoinClick = (teeTime) => {
    if (!user) {
      toast.error("Please sign in to join a tee time.");
      return;
    }
    setConfirmJoinDialog({ isOpen: true, teeTime });
  };

  const handleConfirmJoin = async () => {
    if (!selectedPlayer && !newPlayerName.trim()) {
      toast.error("Please select a player or enter a new player name.");
      return;
    }

    try {
      let playerToAdd;
      if (newPlayerName.trim()) {
        const result = await addPlayerMutation.mutateAsync({ name: newPlayerName.trim() });
        playerToAdd = result;
      } else {
        playerToAdd = players.find(p => p.id === selectedPlayer);
      }

      if (!playerToAdd) {
        toast.error("Failed to add player. Please try again.");
        return;
      }

      const currentTeeTime = confirmJoinDialog.teeTime;
      const currentAttendees = currentTeeTime.attendees || [];
      
      const isPlayerAlreadyJoined = currentAttendees.some(
        attendee => attendee.player.id === playerToAdd.id
      );

      if (isPlayerAlreadyJoined) {
        toast.error("This player has already joined this tee time.");
        return;
      }

      const updatedAttendees = [
        ...currentAttendees,
        { player: { id: playerToAdd.id, name: playerToAdd.name } }
      ];

      await updateTeeMutation.mutateAsync({
        id: currentTeeTime.id,
        attendees: updatedAttendees
      });

      toast.success("Successfully joined the tee time!");
      handleCloseDialog();
    } catch (error) {
      console.error("Error joining tee time:", error);
      toast.error("Failed to join the tee time. Please try again.");
    }
  };

  const handleCloseDialog = () => {
    setConfirmJoinDialog({ isOpen: false, teeTime: null });
    setSelectedPlayer(null);
    setNewPlayerName('');
  };

  return (
    <div className="pt-14">
      <div className="bg-white w-full py-4 shadow-sm">
        <h1 className="text-[#006747] text-center font-semibold text-xl">Upcoming Tee Times</h1>
      </div>
      <div className="container mx-auto px-4 py-6">
        {(!teeTimes || teeTimes.length === 0) ? (
          <p className="text-center text-gray-500">No upcoming tee times available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teeTimes.map((teeTime) => (
              <TeeTimeCard
                key={teeTime.id}
                teeTime={teeTime}
                onJoinClick={handleJoinClick}
              />
            ))}
          </div>
        )}
      </div>

      <JoinDialog
        isOpen={confirmJoinDialog.isOpen}
        onClose={handleCloseDialog}
        players={players}
        selectedPlayer={selectedPlayer}
        onPlayerSelect={setSelectedPlayer}
        newPlayerName={newPlayerName}
        onNewPlayerNameChange={setNewPlayerName}
        onConfirm={handleConfirmJoin}
      />
    </div>
  );
};

export default Schedule;