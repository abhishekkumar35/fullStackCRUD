import {
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  GET_EMPLOYEE,
  ADD_EMPLOYEE,
  GET_ALL_EMPLOYEE,
} from "./Constants";
import axios from "axios";

export const updateEmployee = async (employeeID, employee) => {
  const response = await axios.put(UPDATE_EMPLOYEE + employeeID, employee);
  const dataResponse = response.data;
  return dataResponse;
};

export const addEmployee = async (employee) => {
  const response = await axios.post(ADD_EMPLOYEE, employee);
  const dataResponse = response.data;
  return dataResponse;
};

export const deleteEmployee = async (employeeID) => {
  const response = await axios.delete(DELETE_EMPLOYEE + employeeID);
  const dataResponse = await response.data;
  return dataResponse;
};

export const getEmployee = async (employeeID) => {
  const response = await axios.get(GET_EMPLOYEE + employeeID);
  const dataResponse = response.data;
  return dataResponse;
};

export const getAllEmployee = async () => {
  const response = await axios.get(GET_ALL_EMPLOYEE);
  const dataResponse = response.data;
  console.log(dataResponse);
  return dataResponse;
};
