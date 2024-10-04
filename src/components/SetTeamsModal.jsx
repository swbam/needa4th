import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateTeeTime } from '@/integrations/supabase/hooks/useTeeTimes';

const SetTeamsModal = ({ isOpen, onClose, teeTime }) => {
  const [team1, setTeam1] = useState(teeTime.team1 || []);
  const [team2, setTeam2] = useState(teeTime.team2 || []);
  const [unassigned, setUnassigned] = useState(teeTime.players.filter(player => !team1.includes(player) && !team2.includes(player)));

  const updateTeeMutation = useUpdateTeeTime();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = source.droppableId === 'team1' ? team1 :
                       source.droppableId === 'team2' ? team2 : unassigned;
    const destList = destination.droppableId === 'team1' ? team1 :
                     destination.droppableId === 'team2' ? team2 : unassigned;

    const [removed] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, removed);

    setTeam1([...team1]);
    setTeam2([...team2]);
    setUnassigned([...unassigned]);
  };

  const handleSaveTeams = () => {
    updateTeeMutation.mutate({ 
      id: teeTime.id, 
      team1, 
      team2 
    }, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Teams</DialogTitle>
        </DialogHeader>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex justify-between">
            <Droppable droppableId="team1">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="bg-green-100 p-2 rounded w-1/3">
                  <h3 className="font-bold mb-2">Team 1</h3>
                  {team1.map((player, index) => (
                    <Draggable key={player} draggableId={player} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 mb-2 rounded"
                        >
                          {player}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="unassigned">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="bg-gray-100 p-2 rounded w-1/3">
                  <h3 className="font-bold mb-2">Unassigned</h3>
                  {unassigned.map((player, index) => (
                    <Draggable key={player} draggableId={player} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 mb-2 rounded"
                        >
                          {player}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="team2">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="bg-blue-100 p-2 rounded w-1/3">
                  <h3 className="font-bold mb-2">Team 2</h3>
                  {team2.map((player, index) => (
                    <Draggable key={player} draggableId={player} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 mb-2 rounded"
                        >
                          {player}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <Button onClick={handleSaveTeams} className="mt-4 w-full bg-green-800 text-white hover:bg-green-700">
          Save Teams
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SetTeamsModal;