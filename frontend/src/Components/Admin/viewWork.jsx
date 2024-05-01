import React, { useState, useEffect } from "react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function ViewWork() {
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      HttpnInstance.post("/workRegistration/viewRegistrations").then(
        (response) => {
          setRegistrations(response.data);
          setLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, [reload]);

  const handleDelete = (id) => {
    try {
      setLoading(true);
      HttpnInstance.post("/workRegistration/deleteRegistration", {
        Id: id,
      }).then(() => {
        setLoading(false);
        setReload(!reload);
      });
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
              <th className="p-4 ring-1 ring-inset ring-blue-500">ID</th>
              <th className="p-4 ring-1 ring-inset ring-blue-500">Name</th>
              <th className="p-4 ring-1 ring-inset ring-blue-500">Phone</th>
              <th className="p-4 ring-1 ring-inset ring-blue-500">Village</th>
              <th className="p-4 ring-1 ring-inset ring-blue-500">
                Gram Panchayat President Name
              </th>
              <th className="p-4 ring-1 ring-inset ring-blue-500">
                Gram Panchayat President Phone Number
              </th>
              <th className="p-4 ring-1 ring-inset ring-blue-500">
                Number of Cards in Village
              </th>
              <th className="p-4 ring-1 ring-inset ring-blue-500">Date</th>
              <th className="p-4 ring-1 ring-inset ring-blue-500">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {registrations?.map((workRegistration, idx) => {
              return (
                <tr>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    {workRegistration.EmpId}
                  </td>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    {workRegistration.EmpName}
                  </td>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    {workRegistration.EmpPhone}
                  </td>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    {workRegistration.Village}
                  </td>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    {workRegistration.PresidentName}
                  </td>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    {workRegistration.PresidentPhone}
                  </td>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    {workRegistration.Cards}
                  </td>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    {workRegistration.Date}
                  </td>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(workRegistration.Id)}
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

export default ViewWork;
