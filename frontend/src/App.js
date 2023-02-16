import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import { createBrowserRouter, Outlet } from "react-router-dom";

import AddEmployee from "./components/AddEmployee";
import ErrorElement from "./components/ErrorElement";
import UpdateEmployee from "./components/UpdateEmployee";

function App() {
  const [toggle, setToggle] = useState(true);
  const toggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <div className={toggle ? "dark" : "light"}>
      <div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button type="button" id="viewmode" onClick={toggleHandler}>
            toggle dark/light
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/addemployee",
        element: <AddEmployee />,
      },
      {
        path: "/updateemployee/:employeeId",
        element: <UpdateEmployee />,
      },
    ],
  },
]);
