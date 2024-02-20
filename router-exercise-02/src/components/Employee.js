import React from "react";
import { useNavigate } from "react-router-dom";

function Employee() {
  const employees = [
    {
      id: 1,
      name: "Hoa",
      age: 20,
    },
    {
      id: 2,
      name: "Khanh",
      age: 25,
    },
    {
      id: 3,
      name: "Tu",
      age: 22,
    },
  ];

  let navigate = useNavigate();
  const showDetail = (employee) => {
    navigate(`/employees/${employee.id}`, {state : {employee: employee}});
  }

  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>
                <button onClick={() => showDetail(employee)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
