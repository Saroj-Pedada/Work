import React, { useState, useEffect } from 'react';
import HttpnInstance from '../Api/nodeapi';

function WorkRegistration() {
  const [work, setWork] = useState([]);
  const [varNoData, setVarNoData] = useState(false);
  const [varAddOverlay, setVarAddOverlay] = useState(false);
  const [newWork, setNewWork] = useState({
    emp_id: '',
    name: '',
    phone: '',
    village: '',
    president_name: '',
    president_phone: '',
    cards: 0,
    dateofregistration: ''
  });

  useEffect(() => {
    fetchWork();
  }, []);

  const fetchWork = async () => {
    try {
      const response = await HttpnInstance.post('/work/getWorksById');
      if (response.data.length === 0) {
        setVarNoData(true);
        setWork(null);
      } else {
        setVarNoData(false);
        setWork(response.data);
      }
    } catch (error) {
      console.log('Error fetching work:', error);
      alert('Error fetching work');
    }
  };

  const handleAddWork = async (e) => {
    e.preventDefault();
    try {
      HttpnInstance.post('/work/registerWork', newWork).then(() => {
        console.log('Work added successfully');
        alert('Work added successfully');
        setVarAddOverlay(false);
      }).catch((error) => {
        alert('Error adding work');
        console.log('Error adding work:', error);
      });
      fetchWork();
      setNewWork({
        emp_id: '',
        name: '',
        phone: '',
        village: '',
        president_name: '',
        president_phone: '',
        cards: 0,
        dateofregistration: ''
      });
    } catch (error) {
      console.log('Error adding work:', error);
    }
  };

  const handleChange = (e) => {
    setNewWork({
      ...newWork,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (isoDateTime) => {
    const date = new Date(isoDateTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }).split("at")[0];
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Work Registration</h1>
      </div> */}
      {varNoData && !varAddOverlay && (
        <div className="text-center mt-10 text-2xl font-bold flex flex-col justify-center w-full items-center tracking-tight text-gray-900">No Work Data
          <div className="px-6 py-3 w-full flex justify-center">
            <button
              onClick={() => setVarAddOverlay(true)}
              className="flex w-1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Work
            </button>
          </div>
        </div>
      )}
      {varAddOverlay && (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form onSubmit={handleAddWork} className="space-y-6">
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
                  value={newWork.village}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="president_name" className="block text-sm font-medium text-gray-900">
                President Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="president_name"
                  id="president_name"
                  placeholder="President Name"
                  value={newWork.president_name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="president_phone" className="block text-sm font-medium text-gray-900">
                President Phone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="president_phone"
                  id="president_phone"
                  placeholder="President Phone"
                  value={newWork.president_phone}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cards" className="block text-sm font-medium text-gray-900">
                Cards
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="cards"
                  id="cards"
                  placeholder="Cards"
                  value={newWork.cards}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>


            <div className='flex flex-row items-center justify-evenly'>
              <button
                type="submit"
                className="flex w-1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Work
              </button>
              <button
                onClick={() => setVarAddOverlay(false)}
                className="flex w-1/4 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
      {!varNoData && !varAddOverlay && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <table className="w-full text-sm text-left text-gray-500 notimes:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 notimes:bg-gray-700 notimes:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Employee ID</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Village</th>
                <th scope="col" className="px-6 py-3">President Name</th>
                <th scope="col" className="px-6 py-3">President Phone</th>
                <th scope="col" className="px-6 py-3">Cards</th>
                <th scope="col" className="px-6 py-3">Incentive</th>
                <th scope="col" className="px-6 py-3">Date of Registration</th>
                <th scope="col" className="px-6 py-3"><button
                  onClick={() => setVarAddOverlay(true)}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Work
                </button></th>
              </tr>
            </thead>
            <tbody>
              {work?.map((work, index) => (
                <tr key={index} className="bg-white border-b notimes:bg-gray-800 notimes:border-gray-700 hover:bg-gray-50 notimes:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap notimes:text-white">
                    {work.emp_id}
                  </th>
                  <td className="px-6 py-4">{work.name}</td>
                  <td className="px-6 py-4">{work.phone}</td>
                  <td className="px-6 py-4">{work.village}</td>
                  <td className="px-6 py-4">{work.president_name}</td>
                  <td className="px-6 py-4">{work.president_phone}</td>
                  <td className="px-6 py-4">{work.cards <= 13 ? work.cards : 13}</td>
                  <td className="px-6 py-4">{work.cards >= 13 ? work.cards - 13 : 0}</td>
                  <td className="px-6 py-4">{formatDate(work.dateofregistration)}</td>
                  <td className="px-6 py-4 text-right">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WorkRegistration;