import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import HttpnInstance from "./Api/nodeapi";

function Camps() {
  const [campData, setCampData] = useState([]);

  useEffect(() => {
    try {
      HttpnInstance.post("/camps/getCamps").then((response) => {
        setCampData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="text-3xl">Camps</div>
      <table>
        <thead>
          <th>Camp Name</th>
          <th>Description</th>
          <th>Venue</th>
          <th>Village</th>
          <th>Date of Camp</th>
          <th>Timing</th>
        </thead>
        <tbody>
          {campData?.map((item) => {
            return (
              <tr>
                <td>{item.Name}</td>
                <td>{item.Description}</td>
                <td>{item.Venue}</td>
                <td>{item.Village}</td>
                <td>{item.DateOriginal}</td>
                <td>{item.Timing}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Camps;
