import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, parseISO } from 'date-fns';
import { PlusCircle, Users } from 'lucide-react';

const TeeTimeCard = ({ teeTime, onJoinClick }) => {
  console.log('TeeTimeCard rendered with teeTime:', teeTime);
  
  const uniqueAttendees = teeTime.attendees ? 
    [...new Set(teeTime.attendees.map(a => a.player.id))].map(id => 
      teeTime.attendees.find(a => a.player.id === id).player
    ) : [];

  const handleJoinClick = () => {
    console.log('Join button clicked for teeTime:', teeTime);
    onJoinClick(teeTime);
  };

  const remainingSlots = 4 - uniqueAttendees.length;

  return (
    <Card className="bg-white shadow-lg border-none hover:shadow-xl transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-[#006747] text-xl font-semibold mb-2">
              {teeTime.course?.name || 'Location not specified'}
            </h2>
            <p className="text-gray-600">
              {format(parseISO(teeTime.date_time), 'EEE, MMM d')} at {format(parseISO(teeTime.date_time), 'h:mm a')}
            </p>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="h-5 w-5 mr-1" />
            <span>{uniqueAttendees.length}/4</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {uniqueAttendees.map((player, idx) => (
            <div 
              key={player.id} 
              className="flex items-center p-2 bg-gray-50 rounded-md"
            >
              <div className="w-8 h-8 bg-[#006747] text-white rounded-full flex items-center justify-center mr-3">
                {player.name.charAt(0)}
              </div>
              <span className="font-medium">{player.name}</span>
              {idx === 0 && (
                <span className="ml-2 text-sm text-gray-500">(Organizer)</span>
              )}
            </div>
          ))}
        </div>

        {remainingSlots > 0 && (
          <Button 
            onClick={handleJoinClick} 
            variant="outline" 
            className="w-full text-[#006747] border-[#006747] hover:bg-[#006747] hover:text-white transition-colors"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {remainingSlots === 1 ? "Last Spot!" : `${remainingSlots} spots left`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TeeTimeCard;