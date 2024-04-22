import React, { useState, useEffect } from "react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function ViewDonation() {
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      HttpnInstance.post("/donation/viewDonations").then((response) => {
        setDonations(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [reload]);

  const handleDelete = (id) => {
    try {
      setLoading(true);
      HttpnInstance.post("/donation/deleteDonation", { Id: id }).then(
        () => {
          setLoading(false);
          setReload(!reload);
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
              <th className="ring-1 ring-inset ring-blue-500">Gender</th>
              <th className="ring-1 ring-inset ring-blue-500">Age</th>
              <th className="ring-1 ring-inset ring-blue-500">Phone Number</th>
              <th className="ring-1 ring-inset ring-blue-500">Amount</th>
              <th className="ring-1 ring-inset ring-blue-500">Reason</th>
              <th className="ring-1 ring-inset ring-blue-500">Date</th>
              <th className="ring-1 ring-inset ring-blue-500">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {donations?.map((donation) => {
              return (
                <tr>
                  <td className="p-5 ring-1 ring-inset ring-blue-500">
                    {donation.FullName}
                  </td>
                  <td className="ring-1 ring-inset ring-blue-500">
                    {donation.Address}
                  </td>
                  <td className="ring-1 ring-inset ring-blue-500">
                    {donation.Gender}
                  </td>
                  <td className="ring-1 ring-inset ring-blue-500">
                    {donation.Age}
                  </td>
                  <td className="ring-1 ring-inset ring-blue-500">
                    {donation.PhoneNumber}
                  </td>
                  <td className="ring-1 ring-inset ring-blue-500">
                    {donation.DonationAmount}
                  </td>
                  <td className="ring-1 ring-inset ring-blue-500">
                    {donation.ReasonForDonation}
                  </td>
                  <td className="ring-1 ring-inset ring-blue-500">
                    {donation.Date}
                  </td>
                  <td className="ring-1 ring-inset ring-blue-500">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(donation.Id)}
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

export default ViewDonation;
