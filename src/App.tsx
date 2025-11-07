import React, { useState, useEffect } from "react";
import Schedule from "./components/Shedule";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setRole(savedRole);
  }, []);

  const handleLogin = (role: string) => {
    setRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setRole(null);
  };

  if (!role) return <LoginPage onLogin={handleLogin} />;

  return (
    <div>
      <div className="p-4 flex justify-between items-center bg-gray-200">
        <h2>Текущая роль: {role === "admin" ? "Администратор" : role === "teacher" ? "Преподаватель" : "Студент"}</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Выйти
        </button>
      </div>
      <Schedule role={role} />
    </div>
  );
};

export default App;
