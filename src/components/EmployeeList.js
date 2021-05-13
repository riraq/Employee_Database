import React from "react";

function EmployeeList(props) {

  console.log("employee list props", props)

  return (

        <tr>
          <td><img alt={props.first} src={props.picture}/></td>
          <td>{`${props.first} ${props.last}`}</td>
          <td>{props.phone}</td>
          <td>{props.email}</td>
        </tr>

  );
}

export default EmployeeList;
