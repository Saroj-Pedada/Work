import React, { useState, useEffect } from "react";
import HttpnInstance from "../Api/nodeapi";
import { Carousel } from "@material-tailwind/react";
import LoadinAnim from "../Common/LoadinAnim";

function Camps(props) {
  const [campData, setCampData] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [loading, setLoading] = useState(true);

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
    setVillages([...new Set(campData.map((item) => item.Village))]);
    setLoading(false);
  }, [campData]);

  return loading ? (
    <LoadinAnim />
  ) : (
    <>
      <div className="h-full w-full">
        <div className="lg:my-1 flex flex-col">
          <select
            className="mx-auto lg:my-4 md:my-2 sm:my-1 w-fit"
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
          >
            <option value="">Select Village</option>
            {villages.map((village) => (
              <option key={village} value={village}>
                {village}
              </option>
            ))}
          </select>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {campData
              .filter((item) => item.Village === selectedVillage)
              .map((item) => (
                <div
                  className="bg-white m-4 p-4 h-fit rounded-xl flex flex-col gap-y-2"
                  key={item._id}
                >
                  <h2 className="text-xl font-semibold">{item.Name}</h2>
                  <Carousel className="rounded-xl h-64">
                    {item &&
                      item.Images &&
                      typeof item.Images === "string" &&
                      item.Images.split(",").map((image, index) => (
                        <img
                          key={index}
                          src={image.trim()}
                          alt={item.Name}
                          className="w-full h-full object-cover"
                        />
                      ))}
                  </Carousel>
                  <p className="text-sm">Location: {item.Venue}</p>
                  <p className="text-sm">
                    Date:{" "}
                    {new Date(
                      item.Date * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </p>
                  {/* <p>{item.Village}</p> */}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Camps;
