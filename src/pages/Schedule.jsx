import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, parseISO } from 'date-fns';
import { useTeeTimes, useJoinTeeTime } from '../integrations/supabase/hooks/useTeeTimes';
import { usePlayers } from '../integrations/supabase/hooks/players';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { toast } from "sonner";
import { PlusCircle } from 'lucide-react';

const Schedule = () => {
  const { data: teeTimes, isLoading: teeTimesLoading, error: teeTimesError } = useTeeTimes();
  const { data: players, isLoading: playersLoading, error: playersError } = usePlayers();
  const joinTeeTimeMutation = useJoinTeeTime();
  const { user } = useSupabaseAuth();
  const [confirmJoinDialog, setConfirmJoinDialog] = useState({ isOpen: false, teeTime: null });
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  if (teeTimesLoading || playersLoading) return <div>Loading...</div>;
  if (teeTimesError || playersError) return <div>Error: {teeTimesError?.message || playersError?.message}</div>;

  const handleJoinClick = (teeTime) => {
    setConfirmJoinDialog({ isOpen: true, teeTime });
  };

  const handleConfirmJoin = async () => {
    if (!user) {
      toast.error("Please sign in to join a tee time.");
      return;
    }
    if (!selectedPlayer) {
      toast.error("Please select a player.");
      return;
    }
    try {
      await joinTeeTimeMutation.mutateAsync({ 
        teeTimeId: confirmJoinDialog.teeTime.id, 
        playerId: selectedPlayer 
      });
      setConfirmJoinDialog({ isOpen: false, teeTime: null });
      setSelectedPlayer(null);
      toast.success("Successfully joined the tee time!");
    } catch (error) {
      console.error("Error joining tee time:", error);
      toast.error("Failed to join the tee time. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      return format(parseISO(dateString), 'M/d/yyyy');
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Invalid date';
    }
  };

  console.log('Tee times:', teeTimes); // Add this line for debugging

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[#006747] mb-6" style={{ fontWeight: 500, fontSize: '18px' }}>Upcoming Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teeTimes && teeTimes.map((teeTime) => (
          <Card key={teeTime.id} className="bg-white shadow-lg border-none">
            <CardContent className="p-6">
              <h2 className="text-[#006747] mb-2" style={{ fontWeight: 500, fontSize: '18px' }}>
                {teeTime.course?.name || 'Location not specified'}
              </h2>
              <p className="text-gray-600 mb-4">
                {formatDate(teeTime.date)} at {teeTime.time || 'Time not specified'}
              </p>
              <ul className="space-y-2 mb-4">
                {Array.from({ length: teeTime.max_players || 4 }).map((_, idx) => (
                  <li key={idx} className="font-medium">
                    {teeTime.attendees && teeTime.attendees[idx] ? (
                      teeTime.attendees[idx].player.name
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
        ))}
      </div>

      <Dialog open={confirmJoinDialog.isOpen} onOpenChange={(isOpen) => setConfirmJoinDialog(prev => ({ ...prev, isOpen }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Tee Time</DialogTitle>
            <DialogDescription>
              Select a player to join this tee time.
            </DialogDescription>
          </DialogHeader>
          <Select onValueChange={setSelectedPlayer} value={selectedPlayer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a player" />
            </SelectTrigger>
            <SelectContent>
              {players && players.map((player) => (
                <SelectItem key={player.id} value={player.id}>{player.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setConfirmJoinDialog({ isOpen: false, teeTime: null });
              setSelectedPlayer(null);
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