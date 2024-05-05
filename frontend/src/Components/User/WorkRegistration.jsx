import React, { useState } from "react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function WorkRegistration(props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    EmpId: "",
    EmpName: "",
    EmpPhone: "",
    Village: "",
    PresidentName: "",
    PresidentPhone: "",
    Cards: "",
  });

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    if (
      formData.EmpId.trim() === "" ||
      formData.EmpName.trim() === "" ||
      formData.EmpPhone.trim() === "" ||
      formData.Village.trim() === "" ||
      formData.PresidentName.trim() === "" ||
      formData.PresidentPhone.trim() === "" ||
      formData.Cards.trim() === ""
    ) {
      alert("Please fill out all required fields");
      return;
    }
    if (formData.PresidentPhone.length !== 10) {
      alert("Please enter president's number correctly!");
      return;
    }
    if (formData.EmpPhone.length !== 10) {
      alert("Please enter your phone number correctly!");
      return;
    }
    try {
      setLoading(true);
      HttpnInstance.post("/workRegistration/addUserData", formData).then((res) => {
        if (res.data === "Employee not found in the database.") {
          setLoading(false);
          alert("Employee not found in the database!!");
          return;
        }
        if (res.data === "Phone doesnt match") {
          setLoading(false);
          alert("Phone number doesn't match!!");
          return;
        }
        if (res.data === "Employee has already registered work today.") {
          setLoading(false);
          alert("Employee has already registered work today.");
          return;
        }
        if (res.data === "Can't register at this moment") {
          setLoading(false);
          alert("Work registration can only be done between 5 PM and 10 PM.");
          return;
        }
        setLoading(false);
        alert("Work registration successful. Thanks for the entry.");
        setFormData({
          EmpId: "",
          EmpName: "",
          EmpPhone: "",
          Village: "",
          PresidentName: "",
          PresidentPhone: "",
          Cards: "",
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
          <div>Employee ID</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter your Employee ID"
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
            placeholder="Enter your Name"
            required
            value={formData.EmpName}
            onChange={(e) =>
              setFormData({ ...formData, EmpName: e.target.value })
            }
          />
          <div>Employee Phone Number</div>
          <input
            type="number"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter your Phone Number"
            required
            value={formData.EmpPhone}
            onChange={(e) =>
              setFormData({ ...formData, EmpPhone: e.target.value })
            }
          />
          <div>Village</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter the Village you are working at"
            required
            value={formData.Village}
            onChange={(e) =>
              setFormData({ ...formData, Village: e.target.value })
            }
          />
          <div>Gram Panchayat President Name</div>
          <input
            type="text"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter the village Gram Panchayat President's Name"
            required
            value={formData.PresidentName}
            onChange={(e) =>
              setFormData({ ...formData, PresidentName: e.target.value })
            }
          />
          <div>Gram Panchayat President Phone Number</div>
          <input
            type="number"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter the village Gram Panchayat President's Phone Number"
            required
            value={formData.PresidentPhone}
            onChange={(e) =>
              setFormData({ ...formData, PresidentPhone: e.target.value })
            }
          />
          <div>Cards</div>
          <input
            type="number"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
            placeholder="Enter number of cards distributed in the village"
            required
            value={formData.Cards}
            onChange={(e) =>
              setFormData({ ...formData, Cards: e.target.value })
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

export default WorkRegistration;
