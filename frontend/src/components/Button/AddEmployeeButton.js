import React from "react";
import { Link } from "react-router-dom";

const AddEmployeeButton = () => {
  return (
    <Link to="/addemployee">
      <button id="addEmployeeButton">Add Employee</button>
    </Link>
  );
};

export default AddEmployeeButton;
