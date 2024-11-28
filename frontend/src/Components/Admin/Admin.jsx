import React from 'react'
import Camps from './Camps'
import Donations from './Donations'
import Employees from './Employees'
import Hospitals from './Hospitals'
import Registrations from './Registrations'
import Work from './Work'
import Profile from '../Common/Profile'
import President from './President'

function Admin({ varAdminRoles }) {
  return (
    <>
      {varAdminRoles === 'registrations' && <Registrations />}
      {varAdminRoles === 'camps' && <Camps />}
      {varAdminRoles === 'hospitals' && <Hospitals />}
      {varAdminRoles === 'employees' && <Employees />}
      {varAdminRoles === 'donations' && <Donations />}
      {varAdminRoles === 'work' && <Work />}
      {varAdminRoles === 'president' && <President />}
      {varAdminRoles === 'profile' && <Profile />}
    </>
  )
}

export default Admin