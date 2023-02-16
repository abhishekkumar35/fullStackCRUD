import React from "react";
import { useNavigate } from "react-router-dom";
import { getEmployee, addEmployee } from "../utils/EmployeesDataService";
import { useState, useEffect } from "react";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    async function addNewEmployee(employee) {
      const msg = await addEmployee(employee);
      setMsg(msg);
    }
    addNewEmployee(employee);
  };
  const handleBackButton = () => {
    navigate(-1);
  };

  if (Object.keys(employee).length === 0) {
    return <div>loading...</div>;
  } else {
    return (
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>
            <div>
              <label>First Name</label>
              <input
                type="text"
                value={employee.firstName}
                onChange={(e) =>
                  setEmployee({ ...employee, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                value={employee.lastName}
                onChange={(e) =>
                  setEmployee({ ...employee, lastName: e.target.value })
                }
              />
            </div>
            <div>
              <label>Email Id</label>
              <input
                type="email"
                value={employee.emailId}
                onChange={(e) =>
                  setEmployee({ ...employee, emailId: e.target.value })
                }
              />
            </div>
            <div className="btnContainer">
              <div>
                <button type="button" onClick={handleBackButton}>
                  Back
                </button>
                <button type="submit">Add</button>
              </div>
            </div>
            {msg && <div>{msg}</div>}
          </div>
        </div>
      </form>
    );
  }
};

export default AddEmployee;
