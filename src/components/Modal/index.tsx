import { Modal, Form, Select,  Input } from "antd"
import React, { useEffect } from "react"

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
  initialValues?:Partial<ScheduleEvent>;
}



const ModalWindow:React.FC<ModalWindowProps>=({day, slot, onClose,subjects, teachers, rooms, type, onSave, initialValues})=>{
  
  const [form] = Form.useForm();
  const handleOk= async ()=>{
    const values= await form.validateFields();
    console.log("djhsd", values)
    onSave({...values, day, slot})
    onClose();
  }

  useEffect(()=>{
    if(initialValues){
      form.setFieldValue("initial", initialValues)
    }else {
    form.resetFields();
  }
}, [initialValues, form]);

  return(
    <>
    <Modal 
      title={
        initialValues?
        `Редактировать занятие на ${day} ${slot}?`:
        `Добавить занятие на ${day} ${slot}?`}
      onCancel={onClose}
      open={true}
      onOk={handleOk}
      >
        <Form
        form={form}
        initialValues={initialValues}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item 
          name="subject"
          rules={[{ required: true, message: "Выберите дисциплину" }]}>
          <Select
            placeholder="Дисциплина"
            options={subjects.map(sub=>({value:sub}))}
            >
          </Select>
        </Form.Item>
        <Form.Item
          name="teacher"
          rules={[{ required: true, message: "Выберите преподавателя" }]}>
          <Select
            placeholder="Преподаватель"
            options={teachers.map(teach=>({value:teach}))}
            >
          </Select>
        </Form.Item>
        <Form.Item
          name="room"
          rules={[{ required: true, message: "Выберите аудиторию" }]}>
          <Select
            placeholder="Аудитория"
            options={rooms.map(r=>({value:r}))}
            >
          </Select>
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true, message: "Выберите тип занятия" }]}>
          <Select
            placeholder="Тип занятия"
            options={type.map(t=>({value:t}))}
            >
          </Select>
        </Form.Item>
       
        <Form.Item name="comment">
          <TextArea placeholder="Комментарии" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
    </>
)
}


export default ModalWindow