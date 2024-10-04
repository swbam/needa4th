import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTeeTimes, useUpdateTeeTime } from '@/integrations/supabase/hooks/useTeeTimes';
import { toast } from "sonner";
import { format, isPast } from 'date-fns';

const players = [
  'Alex York', 'Andrew Rocco', 'Bob Murray', 'Chris Baker', 'Connor Stanley', 
  'Derek Kozakiewicz', 'Dominic Nanni', 'Gilmore Connors', 'Guest', 'Heath Mansfield',
  'Jackson Smith', 'Jason Story', 'Jesus Rios', 'John Shrader', 'Josh Alcala', 
  'Josh Link', 'Kyle McFarland', 'Lane Hostettler', 'Martin Clayton', 'Mike Brooks', 
  'Nathan Bateman', 'Parker Smith', 'Richard Caruso', 'Salvador Guzman', 'Seth Bambling'
].sort();

const Schedule = () => {
  const { data: schedule, isLoading, error } = useTeeTimes();
  const updateTeeMutation = useUpdateTeeTime();
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedTeeTime, setSelectedTeeTime] = useState(null);

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error loading schedule: {error.message}</div>;

  const handleJoin = (teeTime) => {
    setSelectedTeeTime(teeTime);
  };

  const handleConfirm = () => {
    if (!selectedPlayer || !selectedTeeTime) return;

    const updatedPlayers = [...selectedTeeTime.players, selectedPlayer].filter(Boolean);
    
    updateTeeMutation.mutate(
      { 
        id: selectedTeeTime.id, 
        players: updatedPlayers 
      },
      {
        onSuccess: () => {
          toast.success(`${selectedPlayer} added to tee time successfully!`);
          setSelectedPlayer('');
          setSelectedTeeTime(null);
        },
        onError: (error) => {
          toast.error(`Failed to add player: ${error.message}`);
        }
      }
    );
  };

  const sortedSchedule = schedule?.sort((a, b) => {
    const dateA = new Date(a.tee_date + 'T' + a.tee_time);
    const dateB = new Date(b.tee_date + 'T' + b.tee_time);
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Tee Times</h1>
      {sortedSchedule && sortedSchedule.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSchedule.map((teeTime) => {
            const teeDateTime = new Date(teeTime.tee_date + 'T' + teeTime.tee_time);
            const isPastTeeTime = isPast(teeDateTime);

            return (
              <Card key={teeTime.id} className={`bg-white shadow-lg ${isPastTeeTime ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-green-800">{teeTime.location}</CardTitle>
                  <p className="text-sm text-gray-600">
                    {format(teeDateTime, 'MMMM d, yyyy h:mm a')}
                    {isPastTeeTime && ' (Past)'}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {teeTime.players && teeTime.players.map((player, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>{player}</span>
                      </li>
                    ))}
                    {!isPastTeeTime && (!teeTime.players || teeTime.players.length < 4) && (
                      <li>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button onClick={() => handleJoin(teeTime)} variant="outline" className="w-full bg-black text-white hover:bg-gray-800">Join</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Tee Time</AlertDialogTitle>
                              <AlertDialogDescription>
                                This is for {format(teeDateTime, 'h:mm a')} on {format(teeDateTime, 'MMMM d, yyyy')} at {teeTime.location}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <Select onValueChange={setSelectedPlayer}>
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
                              <AlertDialogCancel onClick={() => setSelectedPlayer('')}>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleConfirm} disabled={!selectedPlayer}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-8">No tee times available.</div>
      )}
    </div>
  );
};

export default Schedule;