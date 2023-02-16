import React from "react";
import { deleteEmployee } from "../../utils/EmployeesDataService";
import "../../App.css";

const DeleteButton = (props) => {
  const { employeeId, setMessage, setDeletedEmployee } = props;
  const deleteHandler = () => {
    async function deleteOne(employeeId) {
      const responseMessage = await deleteEmployee(employeeId);
      setMessage(responseMessage);
      setDeletedEmployee(employeeId);
    }
    deleteOne(employeeId);
  };
  return (
    <button id="deleteBtn" onClick={deleteHandler}>
      Delete
    </button>
  );
};

export default DeleteButton;
