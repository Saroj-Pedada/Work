import React, { useState, useEffect } from 'react';
import HttpnInstance from '../Api/nodeapi';
import LoadingAnim from '../Common/LoadingAnim';

function Donation() {
  const [varDonations, setVarDonations] = useState([]);
  const [varAddOverlay, setVarAddOverlay] = useState(false);
  const [varNoData, setVarNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [varNewDonation, setVarNewDonation] = useState({
    name: '',
    address: '',
    gender: '',
    age: '',
    phone: '',
    amount: '',
    reason: '',
    dateofdonation: ''
  });

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await HttpnInstance.post('/donation/getDonations');
      if (response.data.length === 0) {
        setVarNoData(true);
      } else {
        setVarNoData(false);
      }
      setVarDonations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching donations:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await HttpnInstance.post('/donation/deleteDonation', { id });
      setVarDonations(varDonations.filter(donation => donation.id !== id));
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  const handleChange = (e) => {
    setVarNewDonation({
      ...varNewDonation,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await HttpnInstance.post('/donation/addDonation', varNewDonation);
      fetchDonations();
      setVarNewDonation({
        name: '',
        address: '',
        gender: '',
        age: '',
        phone: '',
        amount: '',
        reason: '',
        dateofdonation: ''
      });
      setVarAddOverlay(false);
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return loading ? (
    <LoadingAnim />
  ) : (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {varNoData ? "No Donations Found" : "Donations"}
        </h1>
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
                  value={varNewDonation.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  value={varNewDonation.address}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-900">
                Gender
              </label>
              <div className="mt-2">
                <select
                  name="gender"
                  id="gender"
                  value={varNewDonation.gender}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Age"
                  value={varNewDonation.age}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={varNewDonation.phone}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                Donation Amount
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Donation Amount"
                  value={varNewDonation.amount}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-900">
                Reason for Donation
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="reason"
                  id="reason"
                  placeholder="Reason"
                  value={varNewDonation.reason}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dateofdonation" className="block text-sm font-medium text-gray-900">
                Date of Donation
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="dateofdonation"
                  id="dateofdonation"
                  value={varNewDonation.dateofdonation}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div className='flex justify-around'>
              <button
                type="submit"
                className="flex w-1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Donation
              </button>
              <button
                type="button"
                onClick={() => setVarAddOverlay(false)}
                className="flex w-1/4 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}

      {!varAddOverlay && !varNoData && (
        <div className="relative overflow-hidden sm:rounded-lg mt-10">
          <div className="max-h-96 overflow-auto">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {varDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.reason}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{donation.dateofdonation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(donation.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Donation;