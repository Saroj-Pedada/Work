import React, { useState } from "react";
import HttpnInstance from "../Api/nodeapi";
import Employees from "../User/Employees";
import LoadingAnim from "../Common/LoadinAnim";

function ManageEmployees() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    EmpId: "",
    Name: "",
    PhoneNumber: "",
    Designation: "",
    Location: "",
  });

  const handleAddEmployee = (e) => {
    setLoading(true);
    e?.preventDefault();
    if (
      formData.Name.trim() === "" ||
      formData.EmpId.trim() === "" ||
      formData.Location.trim() === "" ||
      formData.Designation.trim() === "" ||
      formData.PhoneNumber.trim() === ""
    ) {
      alert("Please fill out all required fields");
      return;
    }
    try {
      HttpnInstance.post("/employee/addEmployee", formData).then((res) => {
        if (res.data === "Employee already exists") {
          setLoading(false);
          alert("Employee already exists!!");
          return;
        }
        setLoading(false);
        alert("Employee addition Successful");
        setFormData({
          EmpId: "",
          Name: "",
          PhoneNumber: "",
          Designation: "",
          Location: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <LoadingAnim />
  ) : (
    <>
      <div className="flex items-center h-full py-5 w-full flex-col justify-evenly">
        <form className="bg-white h-fit shadow-2xl flex flex-col gap-y-4 lg:w-1/2 w-11/12 ring-2 ring-inset ring-[#007aff] p-5 rounded-xl">
          <div>Employee ID</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter employee id"
            required
            value={formData.EmpId}
            onChange={(e) =>
              setFormData({ ...formData, EmpId: e.target.value })
            }
          />
          <div>Employee Name</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter name of employee"
            required
            value={formData.Name}
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          />
          <div>Phone</div>
          <input
            type="number"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter phone number"
            required
            value={formData.PhoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, PhoneNumber: e.target.value })
            }
          />
          <div>Designation</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter designation"
            required
            value={formData.Designation}
            onChange={(e) =>
              setFormData({ ...formData, Designation: e.target.value })
            }
          />
          <div>Location</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter location"
            required
            value={formData.Location}
            onChange={(e) =>
              setFormData({ ...formData, Location: e.target.value })
            }
          />
          <div>
            <button
              className="w-full rounded-lg h-10 px-2 bg-[#007aff] text-white font-semibold text-lg"
              onClick={handleAddEmployee}
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
      <Employees isAdmin={true} />
    </>
  );
}

export default ManageEmployees;
