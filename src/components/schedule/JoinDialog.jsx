import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const JoinDialog = ({ 
  isOpen, 
  onClose, 
  players, 
  selectedPlayer, 
  onPlayerSelect, 
  newPlayerName, 
  onNewPlayerNameChange, 
  onConfirm 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Tee Time</DialogTitle>
          <DialogDescription>
            Select an existing player or add a new one to join this tee time.
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={onPlayerSelect} value={selectedPlayer}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Your Name" />
          </SelectTrigger>
          <SelectContent>
            {players && players.sort((a, b) => a.name.localeCompare(b.name)).map((player) => (
              <SelectItem key={player.id} value={player.id}>{player.name}</SelectItem>
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
          onChange={(e) => onNewPlayerNameChange(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-[#006747] hover:bg-[#005236]">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinDialog;