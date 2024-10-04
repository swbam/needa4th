import React, { useState } from 'react';
import { useTeeTimes, useUpdateTeeTime } from '@/integrations/supabase/hooks/useNeeda4th';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SetTeamsModal from '../components/SetTeamsModal';
import { toast } from "sonner";

const players = [
  'Alex York', 'Andrew Rocco', 'Bob Murray', 'Chris Baker', 'Connor Stanley', 
  'Derek Kozakiewicz', 'Dominic Nanni', 'Gilmore Connors', 'Guest', 'Heath Mansfield',
  'Jackson Smith', 'Jason Story', 'Jesus Rios', 'John Shrader', 'Josh Alcala', 
  'Josh Link', 'Kyle McFarland', 'Lane Hostettler', 'Martin Clayton', 'Mike Brooks', 
  'Nathan Bateman', 'Parker Smith', 'Richard Caruso', 'Salvador Guzman', 'Seth Bambling'
].sort();

const Schedule = () => {
  const [isSetTeamsModalOpen, setIsSetTeamsModalOpen] = useState(false);
  const [selectedTeeTime, setSelectedTeeTime] = useState(null);

  const { data: schedule, isLoading, error } = useTeeTimes();
  const updateTeeMutation = useUpdateTeeTime();

  const handleJoin = (teeTimeId, playerName) => {
    const teeTime = schedule.find(tt => tt.id === teeTimeId);
    const updatedPlayers = [...(teeTime.players || []), playerName];
    updateTeeMutation.mutate({ id: teeTimeId, players: updatedPlayers });
  };

  const handleSetTeams = (teeTime) => {
    setSelectedTeeTime(teeTime);
    setIsSetTeamsModalOpen(true);
  };

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) {
    toast.error("Failed to load tee times. Please try again later.");
    return <div className="text-center mt-8 text-red-500">Error loading schedule. Please try again later.</div>;
  }

  if (!schedule || schedule.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Tee Times</h1>
        <p className="text-center">No tee times available. Please add some tee times or check back later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule.map((teeTime) => (
          <Card key={teeTime.id} className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-800">{teeTime.location}</CardTitle>
              <p className="text-sm text-gray-600">{new Date(teeTime.tee_date + 'T' + teeTime.tee_time).toLocaleString()}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {teeTime.players && teeTime.players.map((player, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{player}</span>
                  </li>
                ))}
                {(!teeTime.players || teeTime.players.length < 4) && (
                  <li>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800">Join</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Tee Time</AlertDialogTitle>
                          <AlertDialogDescription>
                            This is for {teeTime.tee_time} on {new Date(teeTime.tee_date).toLocaleDateString()} at {teeTime.location}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Select onValueChange={(value) => handleJoin(teeTime.id, value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your name" />
                          </SelectTrigger>
                          <SelectContent>
                            {players.map((player) => (
                              <SelectItem key={player} value={player}>{player}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </li>
                )}
              </ul>
              {teeTime.players && teeTime.players.length === 4 && (
                <Button 
                  onClick={() => handleSetTeams(teeTime)} 
                  className="w-full mt-4 bg-green-800 text-white hover:bg-green-700"
                >
                  Set Teams
                </Button>
              )}
              {teeTime.team1 && teeTime.team2 && (
                <div className="mt-4">
                  <p className="font-bold">Teams:</p>
                  <p>{teeTime.team1.join(', ')} vs {teeTime.team2.join(', ')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedTeeTime && (
        <SetTeamsModal
          isOpen={isSetTeamsModalOpen}
          onClose={() => setIsSetTeamsModalOpen(false)}
          teeTime={selectedTeeTime}
        />
      )}
    </div>
  );
};

export default Schedule;