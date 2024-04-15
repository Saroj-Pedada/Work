import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function Hospitals(props) {
  const [Hospitals, setHospitals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      HttpnInstance.post("/hospital/getHospitals").then((response) => {
        console.log(response.data);
        setHospitals(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setVillages([...new Set(Hospitals.map((item) => item.Village))]);
    setLoading(false);
  }, [Hospitals]);

  return loading ? (
    <LoadingAnim />
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
            {Hospitals.filter((item) => item.Village === selectedVillage).map(
              (item) => (
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
                          src={image.trim()} // trim() removes any leading or trailing whitespace
                          alt={item.Name}
                          className="w-full h-full object-cover"
                        />
                      ))}
                  </Carousel>
                  <p className="text-sm">Location: {item.Location}</p>
                  {/* <p>{item.Village}</p> */}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hospitals;
