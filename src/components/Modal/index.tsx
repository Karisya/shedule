import { Modal, Form, Select,  Input } from "antd"
import React from "react"

const { TextArea } = Input;

const ModalWindow:React.FC=()=>{


    return(
    <>
    <Modal>
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