import React, { useEffect, useState } from "react";
import './style.css'
import ModalWindow from "../Modal";
import scheduleData from "../../data/shedule.json";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import DroppableCell from "../DndCell"; 

interface ScheduleEvent {
  id: string;
  title?: string;
  day: string;
  slot: string;
  teacher:string;
  room:string;
  type:string;
  subject:string;
  comment:string;
}

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница","Суббота"];
const slots = ["09:00-10:20", "10:30-11:50", "12:00-13:20", "13:50-15:10", "15:20-16:40","17:00-18:20" ];


const ScheduleGrid: React.FC = () => {
  const [isOpen, setIsOpen]=useState(false)
  const [selectedElement, setSelectedElement]=useState<{day:string, slot:string}|null>(null)
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
  const [events, setEvents] = useState<ScheduleEvent[]>(() => {
    const saved = localStorage.getItem("scheduleEvents");
    return saved ? JSON.parse(saved) : scheduleData.events;
  });

  useEffect(()=>{
    localStorage.setItem("scheduleEvents", JSON.stringify(events))
  },[events])


const handleClick = (day: string, slot: string) => {
  const exist = events.find((ev) => ev.day === day && ev.slot === slot);
  if (!exist) {
    setSelectedElement({ day, slot });
    setEditingEvent(null); 
    setIsOpen(true);
  } else {
    setSelectedElement({ day, slot });
    setEditingEvent(exist); 
    setIsOpen(true);
  }
};
const handleSave = (newEvent: Omit<ScheduleEvent, "id">) => {
  setEvents((prev) => {
    const existingIndex = prev.findIndex(
      (ev) => ev.day === newEvent.day && ev.slot === newEvent.slot
    );
    if (existingIndex !== -1) {
      const updated = [...prev];
      updated[existingIndex] = {
        ...updated[existingIndex],
        ...newEvent,
        comment: newEvent.comment !== undefined ? newEvent.comment : updated[existingIndex].comment
      };
      return updated;
    }
    return [...prev, { id: String(prev.length + 1), ...newEvent }];
  });
};

const handleDragEnd = (event: DragEndEvent) => {
  if (!event.over) return;
  const overId = String(event.over.id);
  const [newDay, newSlot] = overId.split("__");

  setEvents((prev) =>
    prev.map((ev) =>
      ev.id === event.active.id
        ? { ...ev, day: newDay, slot: newSlot }
        : ev
    )
  );
};

  return (
    <DndContext onDragEnd={handleDragEnd}>
    <div className="sheduleGrid">
      <div className="null"></div>
      {days.map((day) => (
        <div key={day} className="sheduleColumns">
          {day}
        </div>
      ))}
      {slots.map((slot) => (
        <React.Fragment key={slot}>
          <div className="sheduleRows">
            {slot}
          </div>
          {days.map((day) => (
            <DroppableCell
                key={`${day}__${slot}`}
                id={`${day}__${slot}`}
                day={day}
                slot={slot}
                onClick={()=>handleClick(day,slot)}
                events={events.filter((e) => e.day === day && e.slot === slot)}
                onEdit={(ev) => {
                  setSelectedElement({ day, slot });
                  setEditingEvent(ev);
                  setIsOpen(true);
                }}
                onDelete={(id) => setEvents((prev) => prev.filter((e) => e.id !== id))}
              />
          ))}
        </React.Fragment>
      ))}
     { isOpen && 
     <ModalWindow 
     day={selectedElement?.day}
     slot={selectedElement?.slot}
     onClose={() => setIsOpen(false)}
     subjects={scheduleData?.subjects}
     teachers={scheduleData.teachers}
     rooms={scheduleData.rooms}
     type={scheduleData.type}
     onSave={handleSave}
     initialValues={editingEvent || undefined}
     /> }
    </div>
    </DndContext>
  );
};

export default ScheduleGrid;
