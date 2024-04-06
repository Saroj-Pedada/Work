import React, { useState, useEffect } from "react";
import HttpnInstance from "./Api/nodeapi";
import Dropdown from "./Dropdown";

function Registration() {
  const [campData, setCampData] = useState([]);
  const [filteredCampData, setFilteredCampData] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedCamp, setSelectedCamp] = useState(0);
  const [formData, setFormData] = useState({
    FullName: "",
    Address: "",
    Village: "Nandurbar",
    AadharNumber: "",
    Gender: "Male",
    Age: "",
    CampId: 1,
  });

  useEffect(() => {
    try {
      HttpnInstance.post("/camps/getCamps").then((response) => {
        setCampData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const uniqueVillages = new Set();
    campData.forEach((item) => {
      uniqueVillages.add(item.Village);
    });
    setVillages(Array.from(uniqueVillages));
    setSelectedVillage(uniqueVillages.values().next().value);
  }, [campData]);

  useEffect(() => {
    const filterData = campData.filter(
      (item) => item.Village === selectedVillage
    );
    setFilteredCampData(filterData);
    setSelectedCamp(filterData[0]?.Id);
    setFormData({
      ...formData,
      Village: selectedVillage,
    });
  }, [selectedVillage]);

  useEffect(() => {
    setFormData({
      ...formData,
      CampId: selectedCamp,
    });
  }, [selectedCamp]);

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    console.log("Form Data --> ", formData);
    try {
      HttpnInstance.post("/registration/addUserData", formData).then(() => {
        alert("Registration Successful");
        setFormData({
          FullName: "",
          Address: "",
          Village: "Nandurbar",
          AadharNumber: "",
          Gender: "Male",
          Age: "",
          CampId: 1,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center h-screen w-full flex-col justify-evenly">
      <form className="bg-white shadow-2xl flex flex-col gap-y-4 lg:w-1/3 w-11/12 ring-2 ring-inset ring-[#007aff] p-5 rounded-xl">
        <div>Full Name</div>
        <textarea
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          placeholder="Enter you full name"
          required="true"
          value={formData.FullName}
          onChange={(e) =>
            setFormData({ ...formData, FullName: e.target.value })
          }
        ></textarea>
        <div>Address</div>
        <textarea
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          placeholder="Enter your address"
          value={formData.Address}
          required
          onChange={(e) =>
            setFormData({ ...formData, Address: e.target.value })
          }
        ></textarea>
        <div>Village</div>
        <select
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          value={selectedVillage}
          onChange={(e) => setSelectedVillage(e.target.value)}
        >
          {villages?.map((village) => {
            return (
              <option key={village} value={village}>
                {village}
              </option>
            );
          })}
        </select>
        <div>Camps Available</div>
        <select
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          value={selectedCamp}
          onChange={(e) => setSelectedCamp(parseInt(e.target.value, 10))}
        >
          {filteredCampData.map((camp) => {
            return (
              <option key={camp.Id} value={camp.Id}>
                {camp.Name}
              </option>
            );
          })}
        </select>
        <div>Aadhar Number</div>
        <textarea
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          placeholder="Enter your Aadhar Card Number"
          required
          value={formData.AadharNumber}
          onChange={(e) =>
            setFormData({ ...formData, AadharNumber: e.target.value })
          }
        ></textarea>
        <div>Gender</div>
        <select
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          value={formData.Gender}
          onChange={(e) => setFormData({ ...formData, Gender: e.target.value })}
        >
          <option>Male</option>
          <option>Female</option>
        </select>
        <div>Age</div>
        <textarea
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          required
          placeholder="Age in years"
          value={formData.Age}
          onChange={(e) => setFormData({ ...formData, Age: e.target.value })}
        ></textarea>
        <div>
          <button
            className="w-full rounded-lg h-10 px-2 bg-[#007aff] text-white font-semibold text-lg"
            onClick={handleFormSubmit}
          >
            Register
          </button>
        </div>
      </form>
      {/* <Dropdown /> */}
    </div>
  );
}

export default Registration;
