import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const players = [
  'Alex York', 'Andrew Rocco', 'Bob Murray', 'Chris Baker', 'Connor Stanley', 
  'Derek Kozakiewicz', 'Dominic Nanni', 'Gilmore Connors', 'Guest', 'Heath Mansfield',
  'Jackson Smith', 'Jason Story', 'Jesus Rios', 'John Shrader', 'Josh Alcala', 
  'Josh Link', 'Kyle McFarland', 'Lane Hostettler', 'Martin Clayton', 'Mike Brooks', 
  'Nathan Bateman', 'Parker Smith', 'Richard Caruso', 'Salvador Guzman', 'Seth Bambling'
].sort();

const fetchSchedule = async () => {
  // This is a mock API call. Replace with your actual API endpoint.
  return [
    { id: 1, date: '2024-02-29', location: 'Towhee', time: '15:45', players: ['Parker Smith', 'Dominic Nanni', 'Connor Stanley', null] },
    { id: 2, date: '2024-03-02', location: 'Henry Horton', time: '14:00', players: ['Jesus Rios', 'Derek Kozakiewicz', null, null] },
    // Add more mock data as needed
  ];
};

const Schedule = () => {
  const { data: schedule, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule,
  });

  const [selectedPlayer, setSelectedPlayer] = useState('');

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error loading schedule</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule.map((teeTime) => (
          <Card key={teeTime.id} className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-800">{teeTime.location}</CardTitle>
              <p className="text-sm text-gray-600">{new Date(teeTime.date + 'T' + teeTime.time).toLocaleString()}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {teeTime.players.map((player, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {player ? (
                      <span>{player}</span>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="w-full bg-black text-white hover:bg-gray-800">Join</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Tee Time</AlertDialogTitle>
                            <AlertDialogDescription>
                              This is for {teeTime.time} on {new Date(teeTime.date).toLocaleDateString()} at {teeTime.location}.
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
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={!selectedPlayer}>Confirm</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schedule;