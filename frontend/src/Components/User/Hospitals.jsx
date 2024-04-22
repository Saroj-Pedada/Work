import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import HttpnInstance from "../Api/nodeapi";
import LoadingAnim from "../Common/LoadinAnim";

function Hospitals(props) {
  const [Hospitals, setHospitals] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const handleDelete = (id) => {
    try {
      setLoading(true);
      HttpnInstance.post("/hospital/deleteHospital", { Id: id }).then(
        () => {
          setLoading(false);
          setSelectedVillage("");
          setReload(!reload);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      HttpnInstance.post("/hospital/getHospitals").then((response) => {
        setHospitals(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [reload]);

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
            {Hospitals.filter((item) => item.Village === selectedVillage).map(
              (item) => (
                <div
                  className="bg-white m-4 p-4 h-fit rounded-xl flex flex-col gap-y-2"
                  key={item.Id}
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
                  {props?.isAdmin && (
                    <p>
                      <button
                        className="bg-red-500 text-white p-2 rounded-lg"
                        onClick={() => handleDelete(item.Id)}
                      >
                        Delete
                      </button>
                    </p>
                  )}
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
