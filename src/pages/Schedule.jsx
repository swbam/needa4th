import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
    { id: 1, date: '2024-02-29', location: 'Towhee', time: '15:45', players: 4, organizer: 'Parker Smith' },
    { id: 2, date: '2024-03-02', location: 'Henry Horton', time: '14:00', players: 4, organizer: 'Parker Smith' },
    // Add more mock data as needed
  ];
};

const Schedule = () => {
  const { data: schedule, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading schedule</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">Golf Schedule</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Players</TableHead>
            <TableHead>Organizer</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((teeTime) => (
            <TableRow key={teeTime.id}>
              <TableCell>{teeTime.date}</TableCell>
              <TableCell>{teeTime.location}</TableCell>
              <TableCell>{teeTime.time}</TableCell>
              <TableCell>{teeTime.players}</TableCell>
              <TableCell>{teeTime.organizer}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Join</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Schedule;