import React, { useState, useEffect } from "react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function Employees(props) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [foundEmployee, setFoundEmployee] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");
  const [reload, setReload] = useState(false);

  const handleDelete = (id) => {
    try {
      setLoading(true);
      HttpnInstance.post("/employee/deleteEmployees", { Id: id }).then(
        () => {
          setLoading(false);
          setFoundEmployee(null);
          setSearchMessage("Employee ID not found");
          setReload(!reload);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

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
  }, [reload]);

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
          className="w-1/2 h-10 rounded-xl ring-1 ring-inset ring-blue-500 p-5 focus:ring-blue-500 focus:ring-2"
          placeholder="Enter Employee ID"
          value={searchEmployee}
          onChange={(e) => setSearchEmployee(e.target.value)}
        />
        <button
          className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {foundEmployee && (
        <div className="p-5 h-full w-full flex flex-col items-center">
          <div
            className="bg-white rounded-xl ring-2 ring-inset ring-blue-500 p-5"
            key={foundEmployee.Id}
          >
            <p>Name: {foundEmployee.Name}</p>
            <p>Employee ID: {foundEmployee.EmpNo}</p>
            <p>Designation: {foundEmployee.Designation}</p>
            <p>Phone: {foundEmployee.PhoneNumber}</p>
            <p>Location: {foundEmployee.Location}</p>
            {props?.isAdmin && (
              <p className="p-1 flex w-full h-full items-center justify-center">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(foundEmployee.Id)}
                >
                  Delete
                </button>
              </p>
            )}
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
