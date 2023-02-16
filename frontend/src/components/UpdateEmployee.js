import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee, updateEmployee } from "../utils/EmployeesDataService";
import { useState, useEffect } from "react";
import "../App.css";

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [msg, setMsg] = useState();
  const { employeeId } = useParams();

  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    async function update(employeeId, employee) {
      const messageRes = await updateEmployee(employeeId, employee);
      setMsg(messageRes.message);
    }
    update(employeeId, employee);
  };
  const handleBackButton = () => {
    navigate(-1);
  };
  useEffect(() => {
    async function fetchEmployee(employeeId) {
      const data = await getEmployee(employeeId);
      setEmployee(data);
    }
    fetchEmployee(employeeId);
  }, []);

  if (Object.keys(employee).length === 0) {
    return <div>loading...</div>;
  } else {
    console.log(msg);
    return (
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>
            <div className="">
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
                type="text"
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
                <button type="submit">Update</button>
              </div>
              {msg && <p>{msg}</p>}
            </div>
          </div>
        </div>
      </form>
    );
  }
};

export default UpdateEmployee;
