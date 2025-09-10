import React from "react";
import { Card } from "antd";
import './style.css'

interface ScheduleEvent {
  id: string;
  title: string;
  day: string;
  slot: string;
}

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница","Суббота"];
const slots = ["09:00-10:20", "10:30-11:50", "12:00-13:20", "13:50-15:10", "15:20-16:40","17:00-18:20" ];

const events: ScheduleEvent[] = [
  { id: "1", title: "Механика", day: "Понедельник", slot: "09:00-10:00" },
];

const ScheduleGrid: React.FC = () => {
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
            <div className='sheduleElement'>
              {events
                .filter((e) => e.day === day && e.slot === slot)
                .map((ev) => (
                  <Card key={ev.id} size="small">
                    {ev.title}
                  </Card>
                ))}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ScheduleGrid;
