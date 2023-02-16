import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const EditButton = (props) => {
  return (
    <Link to={`/updateemployee/${props.employeeId}`}>
      <button id="editBtn">Edit</button>
    </Link>
  );
};

export default EditButton;
