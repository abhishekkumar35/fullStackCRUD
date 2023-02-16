import React from "react";
import AddEmployeeButton from "./Button/AddEmployeeButton";
import EmployeeTable from "./EmployeeTable";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <div>
        <AddEmployeeButton />
        <EmployeeTable />
      </div>
    </div>
  );
};

export default Home;
