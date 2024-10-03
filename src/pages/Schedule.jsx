import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const courses = [
  'Henry Horton', 'Mccabe', 'Harpeth Hills', 'Ted Rhodes', 'Towhee', 'Franklin Bridge',
  'Little Course', 'Nashboro', 'Old Fort', 'Cheekwood', 'Hermitage (Presidents)',
  'Shelby', 'Two Rivers', 'Percy Warner', 'Gaylord', 'Hermitage (Generals)',
  'Montgomery Bell', 'Greystone'
];

const players = [
  'Parker Smith', 'Dominic Nanni', 'Connor Stanley', 'Jesus Rios', 'Derek Kozakiewicz',
  'Jackson Smith', 'Bob Murray', 'Mike Brooks', 'Andrew Rocco', 'Heath Mansfield',
  'Lane Hostettler', 'Josh Alcala', 'Richard Caruso', 'Martin Clayton', 'Salvador Guzman',
  'Jason Story', 'Nathan Bateman', 'Seth Bambling', 'Josh Link', 'Chris Baker',
  'Kyle McFarland', 'Gilmore Connors', 'Alex York', 'Guest', 'John Shrader'
];

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
                          <Button variant="outline" className="w-full">Join</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Tee Time</AlertDialogTitle>
                            <AlertDialogDescription>
                              This is for {teeTime.time} on {new Date(teeTime.date).toLocaleDateString()} at {teeTime.location}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Confirm</AlertDialogAction>
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