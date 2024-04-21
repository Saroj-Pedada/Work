import React, { useState, useEffect } from "react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function ViewRegistration() {
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      HttpnInstance.post("/registration/viewRegistrations").then((response) => {
        setRegistrations(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDelete = (id) => {
    try {
      setLoading(true);
      HttpnInstance.post("/registration/deleteRegistration", { Id: id }).then(
        () => {
          setLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <LoadingAnim />
  ) : (
    <>
      <div className="rounded-2xl overflow-x-scroll p-5 lg:mt-5 md:mt-3 sm:mt-1 mt-1 w-screen">
        <table className="rounded-2xl w-full bg-white">
          <thead>
            <tr>
              <th className="p-4 ring-1 ring-inset ring-blue-500">Name</th>
              <th className="ring-1 ring-inset ring-blue-500">Address</th>
              <th className="ring-1 ring-inset ring-blue-500">Taluka</th>
              <th className="ring-1 ring-inset ring-blue-500">District</th>
              <th className="ring-1 ring-inset ring-blue-500">Village</th>
              <th className="ring-1 ring-inset ring-blue-500">Aadhar Number</th>
              <th className="ring-1 ring-inset ring-blue-500">Gender</th>
              <th className="ring-1 ring-inset ring-blue-500">Age</th>
              <th className="ring-1 ring-inset ring-blue-500">Phone Number</th>
              <th className="ring-1 ring-inset ring-blue-500">Date</th>
              <th className="ring-1 ring-inset ring-blue-500">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {registrations?.map((registration, idx) => {
              return (
                <tr>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
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
                  <td className="ring-1 ring-inset ring-blue-500">
                    {registration.Date}
                  </td>
                  <td className="ring-1 ring-inset ring-blue-500">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(registration.Id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewRegistration;
