import React, { useState, useEffect } from 'react';
import HttpnInstance from '../Api/nodeapi';
import image from './donate.jpg';

function Donate() {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState({
    name: '',
    address: '',
    gender: '',
    age: '',
    phone: '',
    amount: '',
    reason: '',
    dateofdonation: '',
  });
  const [addOverlay, setAddOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await HttpnInstance.post('/donation/getDonations');
      if (response.data.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
        setDonations(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching donations:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await HttpnInstance.post('/donation/addDonation', newDonation);
      setNewDonation({
        name: '',
        address: '',
        gender: '',
        age: '',
        phone: '',
        amount: '',
        reason: '',
        dateofdonation: '',
      });
      fetchDonations();
      setAddOverlay(false);
    } catch (error) {
      console.error('Error adding donation:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await HttpnInstance.post('/donation/deleteDonation', { id });
      setDonations(donations.filter((donation) => donation.id !== id));
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return loading ? (
    <div className="text-center mt-10">Loading...</div>
  ) : (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Donations</h1>

      {addOverlay ? (
        <div className="max-w-lg mx-auto bg-white rounded p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={newDonation.name}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={newDonation.address}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={newDonation.gender}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium">
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                value={newDonation.age}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={newDonation.phone}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded"
              />
            </div>
            <div>
              <div htmlFor="paymentqr" className="block text-sm font-medium">
                Payment QR
              </div>
                <img
                  src={ image}
                className="block w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium">
                Donation Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={newDonation.amount}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium">
                Reason
              </label>
              <input
                type="text"
                name="reason"
                id="reason"
                value={newDonation.reason}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="dateofdonation" className="block text-sm font-medium">
                Date of Donation
              </label>
              <input
                type="date"
                name="dateofdonation"
                id="dateofdonation"
                value={newDonation.dateofdonation}
                onChange={handleChange}
                required
                className="block w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Donation
              </button>
              <button
                type="button"
                onClick={() => setAddOverlay(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          {noData ? (
            <></>
          ) : (
            <></>
          )}
          <div className="text-center my-4">
            <button
              onClick={() => setAddOverlay(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Donation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Donate;
