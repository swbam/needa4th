import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
    toast.success("Successfully joined the tee time!");
    setConfirmJoinDialog({ isOpen: false, teeTime: null, slotIndex: null });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#006747] mb-6">Upcoming Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTeeTimes.map((teeTime, index) => {
          const teeDateTime = parse(`${teeTime.Date} ${teeTime.Time}`, 'M/d/yyyy HHmm', new Date());

          return (
            <Card key={index} className="bg-white shadow-lg border-none">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-[#006747] mb-2">{teeTime.Location}</h2>
                <p className="text-gray-600 mb-4">
                  {isValid(teeDateTime) 
                    ? format(teeDateTime, 'M/d/yyyy, h:mm:ss a')
                    : 'Invalid Date'}
                </p>
                <ul className="space-y-2 mb-4">
                  {[teeTime.Organizer, teeTime.Attendee, '', ''].slice(0, parseInt(teeTime['# of Players'])).map((player, idx) => (
                    <li key={idx} className="font-medium">
                      {player || (
                        <Button 
                          onClick={() => handleJoinClick(teeTime, idx)} 
                          variant="outline" 
                          size="sm"
                          className="w-full text-[#006747] border-[#006747] hover:bg-[#006747] hover:text-white"
                        >
                          Join
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