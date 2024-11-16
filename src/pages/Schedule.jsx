import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format, parseISO, isFuture } from 'date-fns';
import { useTeeTimes, useUpdateTeeTime } from '../integrations/supabase/hooks/useTeeTimes';
import { usePlayers, useAddPlayer } from '../integrations/supabase/hooks/players';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { toast } from "sonner";
import { PlusCircle } from 'lucide-react';

const Schedule = () => {
  const { data: teeTimes, isLoading: teeTimesLoading, error: teeTimesError } = useTeeTimes();
  const { data: players, isLoading: playersLoading, error: playersError } = usePlayers();
  const { user } = useSupabaseAuth();
  const [confirmJoinDialog, setConfirmJoinDialog] = useState({ isOpen: false, teeTime: null });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const updateTeeMutation = useUpdateTeeTime();
  const addPlayerMutation = useAddPlayer();

  if (teeTimesLoading || playersLoading) return <div className="pt-20">Loading...</div>;
  if (teeTimesError || playersError) return <div className="pt-20">Error: {teeTimesError?.message || playersError?.message}</div>;

  const handleJoinClick = (teeTime) => {
    setConfirmJoinDialog({ isOpen: true, teeTime });
  };

  const handleConfirmJoin = async () => {
    if (!user) {
      toast.error("Please sign in to join a tee time.");
      return;
    }

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
        playerToAdd = players.find(p => p.id === parseInt(selectedPlayer));
      }

      if (!playerToAdd) {
        toast.error("Failed to find or create player.");
        return;
      }

      const isPlayerAlreadyInTeeTime = confirmJoinDialog.teeTime.attendees.some(
        a => a.player.id === playerToAdd.id
      );

      if (isPlayerAlreadyInTeeTime) {
        toast.error("This player is already in the tee time.");
        setConfirmJoinDialog({ isOpen: false, teeTime: null });
        setSelectedPlayer(null);
        setNewPlayerName('');
        return;
      }

      const updatedAttendees = [
        ...confirmJoinDialog.teeTime.attendees,
        { player: { id: playerToAdd.id, name: playerToAdd.name } }
      ];

      await updateTeeMutation.mutateAsync({
        id: confirmJoinDialog.teeTime.id,
        attendees: updatedAttendees
      });

      setConfirmJoinDialog({ isOpen: false, teeTime: null });
      setSelectedPlayer(null);
      setNewPlayerName('');
    } catch (error) {
      console.error("Error joining tee time:", error);
      toast.error("Failed to join the tee time. Please try again.");
    }
  };

  const upcomingTeeTimes = teeTimes?.filter(teeTime => isFuture(parseISO(teeTime.date_time))) || [];

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
            {upcomingTeeTimes.map((teeTime) => {
              const organizer = players?.find(p => p.id === teeTime.organizer_id);
              const uniqueAttendees = teeTime.attendees ? 
                [...new Set(teeTime.attendees.map(a => a.player.id))].map(id => 
                  teeTime.attendees.find(a => a.player.id === id).player
                ) : [];

              return (
                <Card key={teeTime.id} className="bg-white shadow-lg border-none">
                  <CardContent className="p-6">
                    <h2 className="text-[#006747] mb-2" style={{ fontWeight: 500, fontSize: '18px' }}>
                      {teeTime.course?.name || 'Location not specified'}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {format(parseISO(teeTime.date_time), 'EEE, MMM d')} at {format(parseISO(teeTime.date_time), 'h:mm a')}
                    </p>
                    <p className="font-medium mb-2">
                      {organizer ? `${organizer.name} - Organizer` : 'Organizer'}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <li key={idx} className="font-medium">
                          {uniqueAttendees[idx] ? (
                            uniqueAttendees[idx].name
                          ) : (
                            <Button 
                              onClick={() => handleJoinClick(teeTime)} 
                              variant="outline" 
                              size="sm"
                              className="w-full text-[#006747] border-[#006747] hover:bg-[#006747] hover:text-white"
                            >
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Player
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={confirmJoinDialog.isOpen} onOpenChange={(isOpen) => setConfirmJoinDialog(prev => ({ ...prev, isOpen }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Tee Time</DialogTitle>
            <DialogDescription>
              Select an existing player or add a new one to join this tee time.
            </DialogDescription>
          </DialogHeader>
          <Select onValueChange={setSelectedPlayer} value={selectedPlayer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Your Name" />
            </SelectTrigger>
            <SelectContent>
              {players && players.sort((a, b) => a.name.localeCompare(b.name)).map((player) => (
                <SelectItem key={player.id} value={player.id.toString()}>{player.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Input
            type="text"
            placeholder="Add New Player"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setConfirmJoinDialog({ isOpen: false, teeTime: null });
              setSelectedPlayer(null);
              setNewPlayerName('');
            }}>
              Cancel
            </Button>
            <Button onClick={handleConfirmJoin} className="bg-[#006747] hover:bg-[#005236]">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;
