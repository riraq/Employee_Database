import React from "react";

function TableHead(props) {
  return (
    <thead>
      <tr className="text-center align-middle">
        <th>Image</th>
        <th className="order-by-desc" onClick={props.onClick}>Name</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
    </thead>
  );
}

export default TableHead;