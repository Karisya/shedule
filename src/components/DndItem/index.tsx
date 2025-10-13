import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { Popover, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import "./style.css"

interface ScheduleEvent {
  id: string;
  title?: string;
  day: string;
  slot: string;
  teacher: string;
  room: string;
  type: string;
  subject: string;
  comment: string;
}

interface DraggableItemProps {
  event: ScheduleEvent;
  onEdit: (ev: ScheduleEvent) => void;
  onDelete: (id: string) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ event, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: event.id });
  const [open, setOpen] = useState(false);

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  const menuContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <Button
        size="small"
        type="link"
        onClick={() => {
          onEdit(event);
          setOpen(false);
        }}
      >
        Редактировать
      </Button>
      <Button
        size="small"
        type="link"
        danger
        onClick={() => {
          onDelete(event.id);
          setOpen(false);
        }}
      >
        Удалить
      </Button>
    </div>
  );

  return (
    <div
      ref={setNodeRef}
      className={`scheduleElement__item ${
      event.type === "лекция"
      ? "event-lecture"
      : event.type === "лабораторные"
      ? "event-lab"
      : "event-practice"
      }`}
      style={style}>
      <div
        {...listeners}
        {...attributes}
        className="scheduleElement__content">
        <p>{event.subject}</p>
        <p>{event.teacher}</p>
        <p>{event.room}</p>
      </div>
      <Popover
        content={menuContent}
        trigger="click"
        open={open}
        onOpenChange={setOpen}
      >
        <span className="scheduleElement__button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}>
          <MoreOutlined />
        </span>
      </Popover>
    </div>
  );
};

export default DraggableItem;
