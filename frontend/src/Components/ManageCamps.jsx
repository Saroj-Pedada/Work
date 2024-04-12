import React, { useState } from "react";
import HttpnInstance from "./Api/nodeapi";

function ManageCamps() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    Name: "",
    Venue: "",
    Village: "",
    Images: [],
    Date: "",
  });

  const handleAddCamp = (e) => {
    e?.preventDefault();
    if (
      formData.Name.trim() === "" ||
      formData.Village.trim() === "" ||
      formData.Date.trim() === "" ||
      formData.Venue.trim() === ""
    ) {
      alert("Please fill out all required fields");
      return;
    }
    try {
      HttpnInstance.post("/camps/addCamp", formData).then(() => {
        alert("Camp Addition Successful");
        setFormData({
          Name: "",
          Venue: "",
          Village: "",
          Images: [],
          Date: "",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = String(reader.result);
        setFormData((prevFormData) => ({
          ...prevFormData,
          Images: [...prevFormData.Images, imageDataUrl],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? formData.Images.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === formData.Images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex items-center h-full py-5 w-full flex-col justify-evenly">
      <form className="bg-white h-fit shadow-2xl flex flex-col gap-y-4 lg:w-1/2 w-11/12 ring-2 ring-inset ring-[#007aff] p-5 rounded-xl">
        <div>Camp Name</div>
        <input
          type="text"
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          placeholder="Enter name of camp"
          required
          value={formData.Name}
          onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
        />
        <div>
          <div>Gallery</div>
          <input
            type="file"
            className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                  sm:text-sm sm:leading-6"
            required
            onChange={handleImageChange}
            multiple
          />
          {formData.Images.length ? <div id="gallery" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {formData.Images.map((image, index) => (
                <div
                  key={index}
                  className={`duration-700 ease-in-out ${index === currentImageIndex ? '' : 'hidden'
                    }`}
                  data-carousel-item
                >
                  <img
                    src={image}
                    className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
              onClick={showPreviousImage}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
              onClick={showNextImage}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
            : null}
        </div>
        <div>Venue</div>
        <input
          type="text"
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          placeholder="Enter venue of camp"
          required
          value={formData.Venue}
          onChange={(e) => setFormData({ ...formData, Venue: e.target.value })}
        />
        <div>Village</div>
        <input
          type="text"
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          placeholder="Enter camp village"
          required
          value={formData.Village}
          onChange={(e) =>
            setFormData({ ...formData, Village: e.target.value })
          }
        />
        <div>Date</div>
        <input
          type="date"
          className="block w-full h-10 rounded-md border-0 px-2 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-[#007aff]
                    sm:text-sm sm:leading-6"
          placeholder="Enter Date"
          required
          value={formData.Date}
          onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
        />
        <div>
          <button
            className="w-full rounded-lg h-10 px-2 bg-[#007aff] text-white font-semibold text-lg"
            onClick={handleAddCamp}
          >
            Add Camp
          </button>
        </div>
      </form>
      {/* <Dropdown /> */}
    </div>
  );
}

export default ManageCamps;
