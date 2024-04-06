import React, { useState, useEffect } from "react";
import HttpnInstance from "./Api/nodeapi";

function Camps(props) {
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
    <div className="mt-5 h-full w-full">
      {/* <div className="w-full text-3xl">Camps</div> */}
      <div class="flex flex-col items-center justify-center w-full py-2 sm:px-6 lg:px-8 md:overflow-x-scroll sm:overflow-x-scroll lg:overflow-x-hidden overflow-y-hidden">
        <table class="text-center text-lg text-surface text-slate-900">
          <thead class="w-full border-b border-neutral-200 bg-neutral-50 font-medium border-white/10 text-neutral-800">
            <tr className="text-2xl font-black">
              <th scope="col" class="px-6 py-4">
                Camp Name
              </th>
              <th scope="col" class="px-6 py-4">
                Description
              </th>
              <th scope="col" class="px-6 py-4">
                Venue
              </th>
              <th scope="col" class="px-6 py-4">
                Village
              </th>
              <th scope="col" class="px-6 py-4">
                Date of Camp
              </th>
              <th scope="col" class="px-6 py-4">
                Timing
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {campData?.map((item) => {
              return (
                <tr className="border-b border-neutral-200 border-white/10">
                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                    {item.Name}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                    {item.Description}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                    {item.Venue}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                    {item.Village}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                    {item.DateOriginal}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                    {item.Timing}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Camps;
