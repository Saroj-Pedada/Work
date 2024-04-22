import React, { useState, useEffect } from "react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function Employees(props) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [foundEmployee, setFoundEmployee] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    try {
      setLoading(true);
      HttpnInstance.post("/employee/getEmployees").then((response) => {
        setEmployees(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSearch = () => {
    const found = employees.find(
      (employee) => String(employee.EmpNo) === String(searchEmployee)
    );
    if (found) {
      setFoundEmployee(found);
      setSearchMessage("");
    } else {
      setFoundEmployee(null);
      setSearchMessage("Employee ID not found");
    }
  };

  return loading ? (
    <LoadingAnim />
  ) : (
    <>
      <div className="p-5 h-full w-full flex items-center justify-center">
        <input
          type="text"
          className="w-1/2 h-10 rounded-xl ring-1 ring-inset ring-black p-5"
          placeholder="Enter Employee ID"
          value={searchEmployee}
          onChange={(e) => setSearchEmployee(e.target.value)}
        />
        <button
          className="ml-3 px-4 py-2 bg-blue-700 text-white rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {foundEmployee && (
        <div className="p-5 h-full w-full flex flex-col items-center">
          <div
            className="bg-white rounded-xl ring-2 ring-inset ring-[#3940ff] p-5"
            key={foundEmployee._id}
          >
            <p>Name: {foundEmployee.Name}</p>
            <p>Employee ID: {foundEmployee.EmpNo}</p>
            <p>Designation: {foundEmployee.Designation}</p>
            <p>Phone: {foundEmployee.PhoneNumber}</p>
            <p>Location: {foundEmployee.Location}</p>
            {props?.role
              ? props.role === "admin" && <p>Role: {foundEmployee.Role}</p>
              : null}
          </div>
        </div>
      )}
      {searchMessage && (
        <div className="p-5 h-full w-full flex items-center justify-center">
          <p className="text-red-500">{searchMessage}</p>
        </div>
      )}
    </>
  );
}

export default Employees;
