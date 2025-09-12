import React, { useState } from "react";
import { Card } from "antd";
import './style.css'
import ModalWindow from "../Modal";
import scheduleData from "../../data/shedule.json";

interface ScheduleEvent {
  id: string;
  title: string;
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
 const [events, setEvents] = useState<ScheduleEvent[]>(scheduleData.events);

  const handleClick=(day:string, slot:string)=>{
    setSelectedElement({day, slot})
    setIsOpen(true)
  }

   const handleSave = (newEvent: Omit<ScheduleEvent, "id">) => {
    setEvents((prev) => [
      ...prev,
      { id: String(prev.length + 1), ...newEvent }
    ]);
  };



  return (
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
            <div className='sheduleElement' onClick={()=>{handleClick(day,slot)}}>
              {events
                .filter((e) => e.day === day && e.slot === slot)
                .map((ev) => (
                  <Card key={ev.id} size="small" >
                    {ev.title}
                  </Card>
                ))}
            </div>
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
     /> }
    </div>
  );
};

export default ScheduleGrid;
