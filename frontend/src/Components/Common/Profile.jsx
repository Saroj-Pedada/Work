import React, { useState, useEffect } from 'react';
import HttpnInstance from '../Api/nodeapi';
import Cookies from 'js-cookie'

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

  const changePassword = async () => {
    const newPWD = prompt('Please enter new password');
    const confirmPWD = prompt('Please confirm new password');
    if (newPWD !== confirmPWD) {
      alert('Passwords do not match');
      return;
    }
    try {
      await HttpnInstance.post('/user/changePassword', { id: varProfile?.id, new_password: newPWD });
      alert('Password changed successfully');
      Cookies.remove('user');
      window.location.href = '/';
    } catch (error) {
      console.log('Error fetching profile:', error);
      alert('Error fetching profile');
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await HttpnInstance.post('/user/getProfile', { cookies: Cookies.get('user') });
      console.log('Profile:', response.data);
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
        <button className="mt-4 w-1/2 px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-md shadow-sm notime:bg-blue-600 notime:border-blue-600 notime:hover:bg-blue-600" onClick={() => changePassword()}>Change Password</button>
      </div>
    </div>
  );
}

export default Profile;