import React, { useState, useEffect } from "react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmployee, setSearchEmployee] = useState("");

  useEffect(() => {
    try {
      setLoading(true);
      HttpnInstance.post("/employee/getEmployees").then((response) => {
        console.log(response.data);
        setEmployees(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Filtering employees based on search query
  const filteredEmployees = searchEmployee
    ? employees.filter((employee) =>
        employee.Name.toLowerCase().includes(searchEmployee.toLowerCase())
      )
    : employees;

  return loading ? (
    <LoadingAnim />
  ) : (
    <>
      <div className="p-5 h-full w-full flex items-center justify-center">
        <input
          type="text"
          className="w-1/2 h-10 rounded-xl ring-1 ring-inset ring-black p-5"
          placeholder="Search Employee"
          value={searchEmployee}
          onChange={(e) => setSearchEmployee(e.target.value)}
        />
      </div>
      <div className="p-5 h-full w-full flex flex-col items-center">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-5 h-64 justify-between">
          {filteredEmployees.map((employee) => (
            <div
              className="bg-white rounded-xl ring-2 ring-inset ring-[#3940ff] p-5"
              key={employee._id}
            >
              <p>Name: {employee.Name}</p>
              <p>Designation: {employee.Designation}</p>
              <p>Phone: {employee.PhoneNumber}</p>
              <p>Location: {employee.Location}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Employees;