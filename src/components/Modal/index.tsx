import { Modal, Form, Select,  Input } from "antd"
import React from "react"

const { TextArea } = Input;

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

interface ModalWindowProps{
  day?:string;
  slot?:string;
  onClose:()=>void;
  subjects: string[];
  teachers:string[];
  type:string[];
  rooms:string[];
  onSave:(event: Omit<ScheduleEvent, "id">) => void;
}



const ModalWindow:React.FC<ModalWindowProps>=({day, slot, onClose,subjects, teachers, rooms, type, onSave})=>{
  
  const [form] = Form.useForm();
  const handleOk= async ()=>{
    const values= await form.validateFields();
    onSave({...values, day, slot})
    onClose();
  }

  return(
    <>
    <Modal 
      title={`Добавить занятие на ${day} ${slot}?`}
      onCancel={onClose}
      open={true}
      onOk={handleOk}
      >
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item>
          <Select
            placeholder="Дисциплина"
            options={subjects.map(sub=>({value:sub}))}
            >
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="Преподаватель"
            options={teachers.map(teach=>({value:teach}))}
            >
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="Аудитория"
            options={rooms.map(r=>({value:r}))}
            >
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="Тип занятия"
            options={type.map(t=>({value:t}))}
            >
          </Select>
        </Form.Item>
       
        <Form.Item>
          <TextArea placeholder="Комментарии" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
    </>
)
}


export default ModalWindow