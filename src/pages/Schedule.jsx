import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, parse, isValid, isFuture } from 'date-fns';
import { teeTimes, users } from '../utils/csvData';
import { toast } from "sonner";

const Schedule = () => {
  const [confirmJoinDialog, setConfirmJoinDialog] = useState({ isOpen: false, teeTime: null, slotIndex: null });
  const [selectedName, setSelectedName] = useState('');

  const sortedTeeTimes = teeTimes
    .filter(teeTime => {
      const teeDateTime = parse(`${teeTime.Date} ${teeTime.Time}`, 'M/d/yyyy HHmm', new Date());
      return isValid(teeDateTime) && isFuture(teeDateTime);
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
    if (!selectedName) {
      toast.error("Please select a name before joining.");
      return;
    }
    toast.success(`${selectedName} successfully joined the tee time!`);
    setConfirmJoinDialog({ isOpen: false, teeTime: null, slotIndex: null });
    setSelectedName('');
  };

  const playerNames = users.map(user => user.name).sort((a, b) => a.localeCompare(b));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[#006747] mb-6" style={{ fontWeight: 500, fontSize: '18px' }}>Upcoming Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTeeTimes.map((teeTime, index) => {
          const teeDateTime = parse(`${teeTime.Date} ${teeTime.Time}`, 'M/d/yyyy HHmm', new Date());

          return (
            <Card key={index} className="bg-white shadow-lg border-none">
              <CardContent className="p-6">
                <h2 className="text-[#006747] mb-2" style={{ fontWeight: 500, fontSize: '18px' }}>{teeTime.Location}</h2>
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
            <DialogTitle>Join Tee Time</DialogTitle>
            <DialogDescription>
              Select your name to join this tee time.
            </DialogDescription>
          </DialogHeader>
          <Select onValueChange={setSelectedName} value={selectedName}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your name" />
            </SelectTrigger>
            <SelectContent>
              {playerNames.map((name) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setConfirmJoinDialog({ isOpen: false, teeTime: null, slotIndex: null });
              setSelectedName('');
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
