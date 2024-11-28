import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateTeeTime } from '@/integrations/supabase/hooks/useTeeTimes';
import { useAddPlayer } from '@/integrations/supabase/hooks/players';
import { toast } from "sonner";

const JoinTeeTimeDialog = ({ isOpen, onClose, teeTime, players, user }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  
  const updateTeeMutation = useUpdateTeeTime();
  const addPlayerMutation = useAddPlayer();

  const handleConfirmJoin = async () => {
    console.log('Starting join process');
    
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
        console.log('Adding new player:', newPlayerName);
        const result = await addPlayerMutation.mutateAsync({ name: newPlayerName.trim() });
        playerToAdd = result;
      } else {
        console.log('Using existing player:', selectedPlayer);
        playerToAdd = players.find(p => p.id === parseInt(selectedPlayer));
      }

      if (!playerToAdd) {
        toast.error("Failed to find or create player.");
        return;
      }

      const isPlayerAlreadyInTeeTime = teeTime.attendees?.some(
        a => a.player.id === playerToAdd.id
      );

      if (isPlayerAlreadyInTeeTime) {
        toast.error("This player is already in the tee time.");
        onClose();
        setSelectedPlayer(null);
        setNewPlayerName('');
        return;
      }

      console.log('Current tee time attendees:', teeTime.attendees);
      const currentAttendees = teeTime.attendees || [];
      const updatedAttendees = [
        ...currentAttendees,
        { player: { id: playerToAdd.id, name: playerToAdd.name } }
      ];

      console.log('Updating tee time with new attendees:', updatedAttendees);
      await updateTeeMutation.mutateAsync({
        id: teeTime.id,
        attendees: updatedAttendees
      });

      toast.success("Successfully joined the tee time!");
      setSelectedPlayer(null);
      setNewPlayerName('');
      onClose();
    } catch (error) {
      console.error("Error joining tee time:", error);
      toast.error("Failed to join the tee time. Please try again.");
    }
  };

  const handleClose = () => {
    setSelectedPlayer(null);
    setNewPlayerName('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <Input
          type="text"
          placeholder="Add New Player"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleConfirmJoin} 
            className="bg-[#006747] hover:bg-[#005236]"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinTeeTimeDialog;