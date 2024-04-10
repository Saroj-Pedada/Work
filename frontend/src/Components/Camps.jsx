import React, { useState, useEffect } from "react";
import HttpnInstance from "./Api/nodeapi";

function Camps(props) {
  const [campData, setCampData] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    try {
      HttpnInstance.post("/camps/getCamps").then((response) => {
        console.log(response.data)
        setCampData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setVillages([...new Set(campData.map(item => item.Village))]);
  }, [campData])

  return (
    <div className="h-full w-full">
    {villages.map((village) => (
      <div key={village}>
        <h1>{village}</h1>
        {campData
          .filter((item) => item.Village === village)
          .map((item) => (
            <div key={item._id}>
              <h2>{item.Name}</h2>
              <p>{item.Description}</p>
            </div>
          ))
        }
      </div>
    ))}
    </div>
  );
}

export default Camps;
