import React, { useState, useEffect } from "react";
import HttpnInstance from "./Api/nodeapi";

function ViewRegistration() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    try {
      HttpnInstance.post("/registration/viewRegistrations").then((response) => {
        setRegistrations(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-full">
      <div>Registrations</div>
      <table className="w-full bg-white">
        <thead className="p-3">
          <tr>
            <th className="ring-1 ring-inset ring-blue-500">Name</th>
            <th className="ring-1 ring-inset ring-blue-500">Address</th>
            <th className="ring-1 ring-inset ring-blue-500">Taluka</th>
            <th className="ring-1 ring-inset ring-blue-500">District</th>
            <th className="ring-1 ring-inset ring-blue-500">Village</th>
            <th className="ring-1 ring-inset ring-blue-500">Aadhar Number</th>
            <th className="ring-1 ring-inset ring-blue-500">Gender</th>
            <th className="ring-1 ring-inset ring-blue-500">Age</th>
            <th className="ring-1 ring-inset ring-blue-500">Phone Number</th>
          </tr>
        </thead>
        <tbody className="p-3">
          {registrations?.map((registration) => {
            return (
              <tr>
                <td className="ring-1 ring-inset ring-blue-500">
                  {registration.FullName}
                </td>
                <td className="ring-1 ring-inset ring-blue-500">
                  {registration.Address}
                </td>
                <td className="ring-1 ring-inset ring-blue-500">
                  {registration.Taluka}
                </td>
                <td className="ring-1 ring-inset ring-blue-500">
                  {registration.District}
                </td>
                <td className="ring-1 ring-inset ring-blue-500">
                  {registration.Village}
                </td>
                <td className="ring-1 ring-inset ring-blue-500">
                  {registration.AadharNumber}
                </td>
                <td className="ring-1 ring-inset ring-blue-500">
                  {registration.Gender}
                </td>
                <td className="ring-1 ring-inset ring-blue-500">
                  {registration.Age}
                </td>
                <td className="ring-1 ring-inset ring-blue-500">
                  {registration.PhoneNumber}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewRegistration;
