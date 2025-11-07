import React from "react";
import { useDroppable } from "@dnd-kit/core";
import DraggableItem from "../DndItem"
import "./style.css"
import { ScheduleEvent } from "../../info";

interface DroppableCellProps {
  id: string;            
  day: string;
  slot: string;
  events: ScheduleEvent[];
  onClick: () => void;                
  onEdit: (ev: ScheduleEvent) => void; 
  onDelete: (id: string) => void;
  canEdit:boolean;
}

const DroppableCell: React.FC<DroppableCellProps> = ({ id, events, onClick, onEdit, onDelete , canEdit}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`sheduleElement ${isOver ? "highlight" : ""}`}
    >
      {events.length === 0 && (
        <div
          onClick={onClick}
          className={`sheduleElement__click ${canEdit?"edit":"read"}`}
        />
      )}
      {events.map((ev) => (
        <DraggableItem canEdit={canEdit}
        key={ev.id} event={ev} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default DroppableCell;
