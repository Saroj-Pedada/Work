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
          <div className="mx-auto lg:my-4 md:my-2 sm:my-1 relative">
            <select
              className="w-full py-3 px-4 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
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
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
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
