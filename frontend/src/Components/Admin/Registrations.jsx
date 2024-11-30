import React, { useState, useEffect } from 'react';
import HttpnInstance from '../Api/nodeapi';

function Registrations() {
  const [user, setuser] = useState([]);
  const [varNoData, setVarNoData] = useState(false);
  const [varAddOverlay, setVarAddOverlay] = useState(false);
  const [newuser, setNewuser] = useState({
    emp_id: "",
    name: "",
    email: "",
    phone: "",
    designation: "",
    village: "",
  });

  useEffect(() => {
    fetchuser();
  }, []);

  const fetchuser = async () => {
    try {
      const response = await HttpnInstance.post('/user/getUsers');
      if (response.data.length === 0) {
        setVarNoData(true);
        setuser(null);
      } else {
        setVarNoData(false);
        setuser(response.data);
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      alert('Error fetching user');
    }
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


  const handleAdduser = async (e) => {
    e.preventDefault();

    for (const key in newuser) {
      if (!newuser[key]) {
        alert(`Please enter ${key}`);
        return;
      }
    }

    try {
      HttpnInstance.post('/user/createEmployee', newuser).then(() => {
        console.log('employee added successfully');
        alert('employee added successfully');
        setVarAddOverlay(false);
      }).catch((error) => {
        alert('Error adding employee');
        console.log('Error adding employee:', error);
      });
      fetchuser();
      setNewuser({
        emp_id: "",
        name: "",
        email: "",
        phone: "",
        designation: "",
        village: "",
      });
    } catch (error) {
      console.log('Error adding user:', error);
    }
  };

  const handleChange = (e) => {
    setNewuser({
      ...newuser,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Registrations</h1>
      </div>
      {varNoData && (<div className="text-center mt-10 text-2xl font-bold tracking-tight text-gray-900">No Data Found</div>)}
      {!varNoData && varAddOverlay && (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form onSubmit={handleAdduser} className="space-y-6">
            <div>
              <label htmlFor="emp_id" className="block text-sm font-medium text-gray-700">Employee ID</label>
              <div className="mt-1">
                <input
                  id="emp_id"
                  name="emp_id"
                  type="text"
                  value={newuser.emp_id}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={newuser.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={newuser.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  value={newuser.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
              <div className="mt-1">
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  value={newuser.designation}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <label htmlFor="village" className="block text-sm font-medium text-gray-700">Village</label>
              <div className="mt-1">
                <input
                  id="village"
                  name="village"
                  type="text"
                  value={newuser.village}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>


            <div className='flex flex-row items-center justify-evenly'>
              <button
                type="submit"
                className="flex w-1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add user
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
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Village</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Taluka</th>
                <th scope="col" className="px-6 py-3">District</th>
                <th scope="col" className="px-6 py-3">Aadhaar</th>
                <th scope="col" className="px-6 py-3">Gender</th>
                <th scope="col" className="px-6 py-3">Age</th>
                <th scope="col" className="px-6 py-3">Date of Registration</th>
              </tr>
            </thead>
            <tbody>
              {user?.map((user, index) => (
                <tr key={index} className="bg-white border-b notimes:bg-gray-800 notimes:border-gray-700 hover:bg-gray-50 notimes:hover:bg-gray-600">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.village}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">{user.taluka}</td>
                  <td className="px-6 py-4">{user.district}</td>
                  <td className="px-6 py-4">{user.aadhar}</td>
                  <td className="px-6 py-4">{user.gender}</td>
                  <td className="px-6 py-4">{user.age}</td>
                  <td className="px-6 py-4">{formatDate(user.dateofregistration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Registrations;