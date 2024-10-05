import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { format, parse, isValid } from 'date-fns';
import { teeTimes } from '../utils/csvData';
import { toast } from "sonner";

const Schedule = () => {
  const [confirmJoinDialog, setConfirmJoinDialog] = useState({ isOpen: false, teeTime: null, slotIndex: null });

  const sortedTeeTimes = teeTimes
    .filter(teeTime => {
      const teeDateTime = parse(`${teeTime.Date} ${teeTime.Time}`, 'M/d/yyyy HHmm', new Date());
      return isValid(teeDateTime);
    })
    .sort((a, b) => {
      const dateA = parse(`${a.Date} ${a.Time}`, 'M/d/yyyy HHmm', new Date());
      const dateB = parse(`${b.Date} ${b.Time}`, 'M/d/yyyy HHmm', new Date());
      return dateA.getTime() - dateB.getTime();
    });

  const handleJoinClick = (teeTime, slotIndex) => {
    setConfirmJoinDialog({ isOpen: true, teeTime, slotIndex });
  };

  const handleConfirmJoin = () => {
    // Here you would typically update the tee time with the joined player
    // For now, we'll just show a success message
    toast.success("Successfully joined the tee time!");
    setConfirmJoinDialog({ isOpen: false, teeTime: null, slotIndex: null });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Upcoming Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTeeTimes.map((teeTime, index) => {
          const teeDateTime = parse(`${teeTime.Date} ${teeTime.Time}`, 'M/d/yyyy HHmm', new Date());

          return (
            <Card key={index} className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-green-800">
                  {teeTime.Location}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {isValid(teeDateTime) 
                    ? format(teeDateTime, 'MMMM d, yyyy h:mm a')
                    : 'Invalid Date'}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Organizer: {teeTime.Organizer}</li>
                  <li>Walk/Ride: {teeTime['Walk / Ride']}</li>
                  <li>Players:</li>
                  <ul className="list-disc list-inside pl-4">
                    {[teeTime.Organizer, teeTime.Attendee, '', ''].slice(0, parseInt(teeTime['# of Players'])).map((player, idx) => (
                      <li key={idx}>
                        {player ? player : (
                          <Button 
                            onClick={() => handleJoinClick(teeTime, idx)} 
                            variant="outline" 
                            size="sm"
                          >
                            Join
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={confirmJoinDialog.isOpen} onOpenChange={(isOpen) => setConfirmJoinDialog(prev => ({ ...prev, isOpen }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Join</DialogTitle>
            <DialogDescription>
              Are you sure you want to join this tee time?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmJoinDialog({ isOpen: false, teeTime: null, slotIndex: null })}>
              Cancel
            </Button>
            <Button onClick={handleConfirmJoin}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;