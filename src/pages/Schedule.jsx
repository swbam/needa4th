import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { format, parseISO } from 'date-fns';
import { useTeeTimes, useJoinTeeTime } from '../integrations/supabase/hooks/useTeeTimes';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { toast } from "sonner";

const Schedule = () => {
  const { data: teeTimes, isLoading, error } = useTeeTimes();
  const joinTeeTimeMutation = useJoinTeeTime();
  const { user } = useSupabaseAuth();
  const [confirmJoinDialog, setConfirmJoinDialog] = useState({ isOpen: false, teeTime: null });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleJoinClick = (teeTime) => {
    setConfirmJoinDialog({ isOpen: true, teeTime });
  };

  const handleConfirmJoin = async () => {
    if (!user) {
      toast.error("Please sign in to join a tee time.");
      return;
    }
    try {
      await joinTeeTimeMutation.mutateAsync({ teeTimeId: confirmJoinDialog.teeTime.id, userId: user.id });
      setConfirmJoinDialog({ isOpen: false, teeTime: null });
    } catch (error) {
      console.error("Error joining tee time:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      return format(parseISO(dateString), 'M/d/yyyy');
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[#006747] mb-6" style={{ fontWeight: 500, fontSize: '18px' }}>Upcoming Tee Times</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teeTimes && teeTimes.map((teeTime) => (
          <Card key={teeTime.id} className="bg-white shadow-lg border-none">
            <CardContent className="p-6">
              <h2 className="text-[#006747] mb-2" style={{ fontWeight: 500, fontSize: '18px' }}>{teeTime.location || 'Location not specified'}</h2>
              <p className="text-gray-600 mb-4">
                {formatDate(teeTime.date)} at {teeTime.time || 'Time not specified'}
              </p>
              <ul className="space-y-2 mb-4">
                {Array.from({ length: teeTime.max_players || 4 }).map((_, idx) => (
                  <li key={idx} className="font-medium">
                    {teeTime.attendees && teeTime.attendees[idx] ? (
                      teeTime.attendees[idx].name
                    ) : (
                      <Button 
                        onClick={() => handleJoinClick(teeTime)} 
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
        ))}
      </div>

      <Dialog open={confirmJoinDialog.isOpen} onOpenChange={(isOpen) => setConfirmJoinDialog(prev => ({ ...prev, isOpen }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Tee Time</DialogTitle>
            <DialogDescription>
              Are you sure you want to join this tee time?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmJoinDialog({ isOpen: false, teeTime: null })}>
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