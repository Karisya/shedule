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
}

const DroppableCell: React.FC<DroppableCellProps> = ({ id, events, onClick, onEdit, onDelete }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`sheduleElement ${isOver ? "highlight" : ""}`}
    >
      {events.length === 0 && (
        <div
          onClick={onClick}
          className="sheduleElement__click"
        />
      )}
      {events.map((ev) => (
        <DraggableItem key={ev.id} event={ev} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default DroppableCell;
