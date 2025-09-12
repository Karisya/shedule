import { Modal, Form, Select,  Input } from "antd"
import React from "react"

const { TextArea } = Input;

interface ModalWindowProps{
  day?:string;
  slot?:string;
  onClose:()=>void
}

const ModalWindow:React.FC<ModalWindowProps>=({day, slot, onClose})=>{

    return(
    <>
    <Modal 
      title={`Добавить занятие на ${day} ${slot}?`}
      onCancel={onClose}
      open={true}
      >
      <p></p>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
       
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
    </>
)
}


export default ModalWindow