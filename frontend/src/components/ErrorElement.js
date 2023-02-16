import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  return (
    <div>
      <h2>{error.message}</h2>
      <h3>{error.statusCode}</h3>
    </div>
  );
};

export default ErrorElement;
