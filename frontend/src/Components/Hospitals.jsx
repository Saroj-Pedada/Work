import React, { useState, useEffect } from "react";
import HttpnInstance from "./Api/nodeapi";

function Hospitals(props) {
  const [Hospitals, setHospitals] = useState([]);

  useEffect(() => {
    try {
      HttpnInstance.post("/hospital/getHospitals").then((response) => {
        console.log(response.data);
        setHospitals(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <h1>Hospitals</h1>
      {Hospitals.map((hospital) => (
        <div key={hospital._id}>
          <h1>{hospital.Name}</h1>
          <img src={hospital.Images}/>
          <p>{hospital.Village}</p>
        </div>
      ))}
    </div>
  );
}

export default Hospitals;
