import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, parseISO } from 'date-fns';
import { PlusCircle } from 'lucide-react';

const TeeTimeCard = ({ teeTime, onJoinClick }) => {
  const uniqueAttendees = teeTime.attendees ? 
    [...new Set(teeTime.attendees.map(a => a.player.id))].map(id => 
      teeTime.attendees.find(a => a.player.id === id).player
    ) : [];

  return (
    <Card className="bg-white shadow-lg border-none">
      <CardContent className="p-6">
        <h2 className="text-[#006747] mb-2" style={{ fontWeight: 500, fontSize: '18px' }}>
          {teeTime.course?.name || 'Location not specified'}
        </h2>
        <p className="text-gray-600 mb-4">
          {format(parseISO(teeTime.date_time), 'EEE, MMM d')} at {format(parseISO(teeTime.date_time), 'h:mm a')}
        </p>
        <p className="font-medium mb-2">
          {teeTime.organizer ? `${teeTime.organizer.name} - Organizer` : 'Organizer'}
        </p>
        <ul className="space-y-2 mb-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <li key={idx} className="font-medium">
              {uniqueAttendees[idx] ? (
                uniqueAttendees[idx].name
              ) : (
                <Button 
                  onClick={() => onJoinClick(teeTime)} 
                  variant="outline" 
                  size="sm"
                  className="w-full text-[#006747] border-[#006747] hover:bg-[#006747] hover:text-white"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Player
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TeeTimeCard;