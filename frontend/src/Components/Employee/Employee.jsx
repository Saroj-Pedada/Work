import React from 'react';
import WorkRegistration from './WorkRegistration';
import Profile from '../Common/Profile';

function Employee({ varEmployeeRoles }) {
  // const employeeRoles = ["work", "profile"];

  return (
    varEmployeeRoles === "work" ? <WorkRegistration /> : <Profile />
  )
}

export default Employee