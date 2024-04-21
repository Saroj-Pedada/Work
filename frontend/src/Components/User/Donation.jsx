import React, { useState } from "react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function Donation() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    FullName: "",
    Address: "",
    Gender: "Male",
    Age: "",
    PhoneNumber: "",
    DonationAmount: "",
    ReasonForDonation: "",
  });

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    if (
      formData.FullName.trim() === "" ||
      formData.Address.trim() === "" ||
      formData.Age.trim() === "" ||
      formData.PhoneNumber.trim() === "" ||
      formData.DonationAmount.trim() === "" ||
      formData.ReasonForDonation.trim() === ""
    ) {
      alert("Please fill out all required fields");
      return;
    }
    if (formData.PhoneNumber.length !== 10) {
      alert("Please enter a valid phone number");
      return;
    }
    try {
      setLoading(true);
      HttpnInstance.post("/donation/addUserData", formData).then(() => {
        setLoading(false);
        alert("Donation registration successful. We will contact you soon.");
        setFormData({
          FullName: "",
          Address: "",
          Gender: "Male",
          Age: "",
          PhoneNumber: "",
          DonationAmount: "",
          ReasonForDonation: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center h-full py-5 w-full flex-col justify-evenly">
      {loading ? (
        <LoadingAnim />
      ) : (
        <form className="bg-white h-fit shadow-2xl flex flex-col gap-y-4 lg:w-1/2 w-11/12 ring-2 ring-inset ring-[#007aff] p-5 rounded-xl">
          <div>Full Name</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter your full name"
            required
            value={formData.FullName}
            onChange={(e) =>
              setFormData({ ...formData, FullName: e.target.value })
            }
          />
          <div>Address</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter your address"
            required
            value={formData.Address}
            onChange={(e) =>
              setFormData({ ...formData, Address: e.target.value })
            }
          />
          <div>Gender</div>
          <select
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            value={formData.Gender}
            onChange={(e) =>
              setFormData({ ...formData, Gender: e.target.value })
            }
          >
            <option>Male</option>
            <option>Female</option>
          </select>
          <div>Age</div>
          <input
            type="number"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            required
            placeholder="Enter your age"
            value={formData.Age}
            onChange={(e) => setFormData({ ...formData, Age: e.target.value })}
          />
          <div>Phone Number</div>
          <input
            type="number"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            required
            placeholder="Enter your phone number"
            value={formData.PhoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, PhoneNumber: e.target.value })
            }
          />
          <div>Donation Amount</div>
          <input
            type="number"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            required
            placeholder="Enter your donation amount"
            value={formData.DonationAmount}
            onChange={(e) =>
              setFormData({ ...formData, DonationAmount: e.target.value })
            }
          />
          <div>Reason For Donation</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            required
            placeholder="Enter your reason for donation"
            value={formData.ReasonForDonation}
            onChange={(e) =>
              setFormData({ ...formData, ReasonForDonation: e.target.value })
            }
          />
          <div>
            <button
              className="w-full rounded-lg h-10 px-2 bg-[#007aff] text-white font-semibold text-lg"
              onClick={handleFormSubmit}
            >
              Register
            </button>
          </div>
        </form>
      )}
      {/* <Dropdown /> */}
    </div>
  );
}

export default Donation;
