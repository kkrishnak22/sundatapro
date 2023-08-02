
import React from 'react';

const DataTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Street</th>
          <th>Address</th>
          <th>City</th>

          <th>Email</th>
          <th>Phone</th>
          <th>Edit</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.street}</td>
            <td>{item.address}</td>
            <td>{item.city}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td><button  >edit</button></td>
            <td><button>delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
