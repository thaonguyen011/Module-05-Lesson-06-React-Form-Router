import React from 'react'
import { useLocation } from 'react-router-dom'

function EmployeeDetail() {
    const { state } = useLocation();
  return (
    <div>
      <h1>Employee Detail</h1>
      <table>
        <tr>
          <th>No</th>
          <td>{state.employee.id}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{state.employee.name}</td>
        </tr>
        <tr>
          <th>Age</th>
          <td>{state.employee.age}</td>
        </tr>
      </table>
    </div>
  );
}

export default EmployeeDetail
