import { Modal, Form, Select,  Input } from "antd"
import React, { useEffect, useState } from "react"
import { ScheduleEvent } from "../../info";
import scheduleData from "../../data/schedule_clean_data.json";
type ScheduleData = {
  subjectTeachers: Record<string, string[]>;
};
const subjectTeachers = (scheduleData as unknown as ScheduleData).subjectTeachers;

const { TextArea } = Input;


interface ModalWindowProps{
  day?:string;
  slot?:string;
  onClose:()=>void;
  subjects: string[];
  teachers:string[];
  type:string[];
  rooms:string[];
  specialties:string[];
  departments:string[];
  onSave:(event: Omit<ScheduleEvent, "id">) => void;
  initialValues?:Partial<ScheduleEvent>;
}



const ModalWindow:React.FC<ModalWindowProps>=({day, slot, onClose,subjects, teachers, rooms, type,specialties, departments,  onSave, initialValues})=>{
  
  const [form] = Form.useForm();
  const [filteredTeachers, setFilteredTeachers] = useState<string[]>(teachers);

const handleSubjectChange = (subject: string) => {
  const map = (scheduleData as any).subjectTeachers;
  if (map && map[subject]) {
    setFilteredTeachers(map[subject]);
  } else {
    setFilteredTeachers(teachers);
  }

  form.setFieldValue("teacher", undefined);
};



  const handleOk= async ()=>{
    const values= await form.validateFields();
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
          name="specialties"
          rules={[{ required: true, message: "Выберите специальность" }]}>
          <Select
            placeholder="Специальность"
            options={specialties.map(s=>({value:s}))}
            >
          </Select>
        </Form.Item>
        <Form.Item 
          name="departments"
          rules={[{ required: true, message: "Выберите группу" }]}>
          <Select
            placeholder="Группа"
            options={departments.map(d=>({value:d}))}
            >
          </Select>
        </Form.Item>
        <Form.Item 
          name="subject"
          rules={[{ required: true, message: "Выберите дисциплину" }]}>
          <Select
            placeholder="Дисциплина"
            options={subjects.map(sub=>({value:sub}))}
            onChange={handleSubjectChange}
            >
          </Select>
        </Form.Item>
        <Form.Item
          name="teacher"
          rules={[{ required: true, message: "Выберите преподавателя" }]}>
          <Select
            placeholder="Преподаватель"
            options={filteredTeachers.map(teach=>({value:teach}))}
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