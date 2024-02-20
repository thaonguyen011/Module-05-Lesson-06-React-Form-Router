import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Employee from "./components/Employee";
import EmployeeDetail from "./components/EmployeeDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/employees/list" element={<Employee />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
