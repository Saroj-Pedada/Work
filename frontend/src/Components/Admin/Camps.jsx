import React, { useState, useEffect } from 'react';
import HttpnInstance from '../Api/nodeapi';
import CampCard from '../Common/CampCard';
import LoadingAnim from '../Common/LoadingAnim';
import CommonCarousel from '../Common/Carousel';

function Camps() {
  const [camps, setCamps] = useState([]);
  const [newCamp, setNewCamp] = useState({
    name: '',
    venue: '',
    images: [],
    village: '',
    dateoforganization: ''
  });
  const [varAddOverlay, setVarAddOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState('');

  useEffect(() => {
    fetchVillages();
    fetchCamps(); // Initial fetch for all camps
  }, []);

  useEffect(() => {
    if (selectedVillage) {
      fetchCampsByVillage();
    } else {
      fetchCamps();
    }
  }, [selectedVillage]);

  const fetchVillages = async () => {
    try {
      const response = await HttpnInstance.post('/camp/getCampVillages');
      setVillages(response.data);
    } catch (error) {
      console.error('Error fetching villages:', error);
    }
  };

  const fetchCampsByVillage = async () => {
    try {
      const response = await HttpnInstance.post('/camp/getCampsByVillage', { villageId: selectedVillage });
      setCamps(response.data);
    } catch (error) {
      console.error('Error fetching camps by village:', error);
    }
  };

  const fetchCamps = async () => {
    try {
      const response = await HttpnInstance.post('/camp/getCamps');
      setCamps(response.data);
    } catch (error) {
      console.error('Error fetching camps:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await HttpnInstance.post(`/camp/deleteCamp`, { id });
      setCamps(camps.filter(camp => camp.id !== id));
    } catch (error) {
      console.error('Error deleting camp:', error);
    }
  };

  const handleChange = (e) => {
    setNewCamp({
      ...newCamp,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = async (e) => {
    setLoading(true);
    const files = e.target.files;
    let images = [];
    for (let i = 0; i < files.length; i++) {
      const newData = new FormData();
      newData.set("key", "bdfd1f7bf980b08f24312dbac7c26934");
      newData.append("image", files[i]);
      try {
        const res = await fetch(`https://api.imgbb.com/1/upload`, {
          method: "POST",
          body: newData,
        });
        const data = await res.json();
        images.push(data.data.display_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    setNewCamp({ ...newCamp, images: [...newCamp.images, ...images] });
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await HttpnInstance.post('/camp/createCamp', newCamp);
      fetchCamps();
      setNewCamp({
        name: '',
        venue: '',
        images: [],
        village: '',
        dateoforganization: ''
      });
      setVarAddOverlay(false);
    } catch (error) {
      console.error('Error creating camp:', error);
    }
  };

  return loading ? (
    <LoadingAnim />
  ) : (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Camps</h1>
      </div>

      {varAddOverlay ? (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={newCamp.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-900">
                Venue
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="venue"
                  id="venue"
                  placeholder="Venue"
                  value={newCamp.venue}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dateoforganization" className="block text-sm font-medium text-gray-900">
                Date of Organization
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="dateoforganization"
                  id="dateoforganization"
                  placeholder="Date of Organization"
                  value={newCamp.dateoforganization}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="village" className="block text-sm font-medium text-gray-900">
                Village
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="village"
                  id="village"
                  placeholder="Village"
                  value={newCamp.village}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-900">
                Images
              </label>
              <div className="mt-2">
                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full text-gray-900"
                />
              </div>
            </div>

            {newCamp.images.length > 0 && (
              <CommonCarousel images={newCamp.images} />
            )}

            <div className='flex justify-around'>
              <button
                type="submit"
                className="flex w-1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Camp
              </button>
              <button
                onClick={() => setVarAddOverlay(false)}
                className="flex w-1/4 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg flex lg:flex-row lg:gap-y-0 flex-col gap-y-3 items-center justify-around">
          <button
            onClick={() => setVarAddOverlay(true)}
                className="flex lg:w-1/4 w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Add Camp
          </button>
          <select
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="flex lg:w-1/4 w-1/2 justify-center rounded-md bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm border focus:ring-indigo-600"
          >
            <option value="">All Villages</option>
            {villages.map((village, index) => (
              <option key={index} value={village.village}>
                {village.village}
              </option>
            ))}
          </select>
        </div>
      )}

      {!varAddOverlay && (
        <div className="mt-10 mx-auto flex flex-col items-center">
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-5">
            {selectedVillage || 'All Villages'}
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {camps.map(camp => (
              <CampCard key={camp.id} camp={camp} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Camps;
