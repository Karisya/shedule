import React, { useState } from "react";
import { Button, Form, Input, Select, Card } from "antd";

const { Option } = Select;

const LoginPage: React.FC<{ onLogin: (role: string) => void }> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("userRole", values.role);
      onLogin(values.role);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Вход в систему" className="w-96">
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            label="Имя пользователя"
            rules={[{ required: true, message: "Введите имя пользователя" }]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Роль"
            rules={[{ required: true, message: "Выберите роль" }]}
          >
            <Select placeholder="Выберите роль">
              <Option value="admin">Администратор</Option>
              <Option value="teacher">Преподаватель</Option>
              <Option value="student">Студент</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
