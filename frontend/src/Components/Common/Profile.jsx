import React, { useState, useEffect } from 'react';
import HttpnInstance from '../Api/nodeapi';

function Profile() {
  const [varProfile, setVarProfile] = useState(null);

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

  const fetchProfile = async () => {
    try {
      const response = await HttpnInstance.post('/user/getProfile');
      setVarProfile(response.data);
    } catch (error) {
      console.log('Error fetching profile:', error);
      alert('Error fetching profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow notime:bg-gray-800 notime:border-gray-700 notime:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 notime:text-white">{varProfile?.name}</h5>
        <p className="font-normal text-gray-700 notime:text-gray-400">Email: {varProfile?.email}</p>
        <p className="font-normal text-gray-700 notime:text-gray-400">Phone: {varProfile?.phone}</p>
        {varProfile?.access_level === 0 && <p className="font-normal text-gray-700 notime:text-gray-400">Role: Admin</p>}
        {varProfile?.access_level === 1 && (
          <>
            <p className="font-normal text-gray-700 notime:text-gray-400">Role: Employee</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">Employee ID: {varProfile?.emp_id}</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">Village: {varProfile?.village}</p>
          </>
        )}
        {varProfile?.access_level === 2 && (
          <>
            <p className="font-normal text-gray-700 notime:text-gray-400">Role: User</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">Village: {varProfile?.village}</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">Address: {varProfile?.address}</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">Taluka: {varProfile?.taluka}</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">District: {varProfile?.district}</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">Aadhar: {varProfile?.aadhar}</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">Gender: {varProfile?.gender}</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">Age: {varProfile?.age}</p>
            <p className="font-normal text-gray-700 notime:text-gray-400">Date of Registration: {formatDate(varProfile?.dateofregistration)}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;