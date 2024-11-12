import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const TeeTimeCard = ({ teeTime, onJoinClick }) => {
  const { course, date_time, organizer, attendees = [] } = teeTime;
  const uniqueAttendees = [...new Set(attendees.map(a => a.player.id))]
    .map(id => attendees.find(a => a.player.id === id).player);

  return (
    <div className="bg-white shadow-lg border-none p-6 rounded-lg">
      <h2 className="text-[#006747] mb-2 text-lg font-medium">
        {course?.name || 'Location not specified'}
      </h2>
      <p className="text-gray-600 mb-4">
        {format(parseISO(date_time), 'EEE, MMM d')} at {format(parseISO(date_time), 'h:mm a')}
      </p>
      <p className="font-medium mb-2">
        {organizer ? `${organizer.name} - Organizer` : 'Organizer'}
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
    </div>
  );
};

export default TeeTimeCard;